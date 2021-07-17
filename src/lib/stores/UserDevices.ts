import {browser} from "$app/env";
import type { Readable, Subscriber, Unsubscriber } from "svelte/store";
import { log, tag } from 'missionlog';

export type PreferredDevices = Record<MediaDeviceKind, string>;

export type Devices = {
    devices: MediaDeviceInfo[],
    preferredDevices: PreferredDevices,
}
const defaultDevices = (): Devices => ({
    devices: [],
    preferredDevices: {
        audioinput: "",
        audiooutput: "",
        videoinput: ""
    }
})
class PreferredDevicesStore implements Readable<PreferredDevices> {
    private subscribers = new Set<Subscriber<PreferredDevices>>();
    private value: PreferredDevices = {audioinput: "", audiooutput: "", videoinput: ""};
    private notify = () => {
        this.subscribers.forEach(sub => sub(this.value));
    }
    private handleNewPreferredDevices = (v: PreferredDevices) => {
        
        if(this.value?.audioinput !== v.audioinput || this.value?.audiooutput !== v.audiooutput || this.value?.videoinput !== v.videoinput) {
            log.info(tag.userDevices, "CHANGE", v, this.value);
            this.value = {...v};
            this.notify();
        } else {
            log.info(tag.userDevices, "NO CHANGE", v, this.value);
        }
    }

    constructor(devices: UserDevicesStore) {
        devices.subscribe(v => {
            this.handleNewPreferredDevices(v.preferredDevices)
        });
    }

    subscribe(run: Subscriber<PreferredDevices>): Unsubscriber {
        this.subscribers.add(run);
        run(this.value);
        return () => this.subscribers.delete(run);
    }

}

class UserDevicesStore implements Readable<Devices> {
    private subscribers = new Set<Subscriber<Devices>>();
    private value: Devices = defaultDevices();
    preferredDevices: Readable<Record<MediaDeviceKind, string>>;
    
    constructor() {
        this.update()
        if(!browser) return;
        navigator.mediaDevices.addEventListener('devicechange', this.update.bind(this))
        this.preferredDevices = new PreferredDevicesStore(this);
    }

    private update() {
        if(!browser) return;
        navigator.mediaDevices.enumerateDevices().then(deviceInfo => {
            // this.dispatchNewDevices(deviceInfo);
            if(this.value.preferredDevices.audioinput && !deviceInfo.some(di => di.deviceId === this.value.preferredDevices.audioinput)) {
                log.warn(tag.userDevices, `Detected removal of preferred device ${this.value.preferredDevices.audioinput}`)
                this.value.preferredDevices.audioinput = "";
            }
            if(this.value.preferredDevices.videoinput && !deviceInfo.some(di => di.deviceId === this.value.preferredDevices.videoinput)) {
                log.warn(tag.userDevices, `Detected removal of preferred device ${this.value.preferredDevices.videoinput}`)
                this.value.preferredDevices.videoinput = "";
            }


            this.value = {...this.value, devices: deviceInfo};
            this.notify();
        });
    }

    private notify() {
        this.subscribers.forEach(s => s(this.value))
    }

    subscribe(run: Subscriber<Devices>): Unsubscriber {
        this.subscribers.add(run);
        run(this.value);
        return () => this.subscribers.delete(run);
    }

    setPreferred(kind: MediaDeviceKind, newId: string) {
        this.value = {
            ...this.value, 
            preferredDevices: {
                ...this.value.preferredDevices,
                [kind]: newId
            }
        }
        this.notify();
    }
}

export const UserDevices = new UserDevicesStore();