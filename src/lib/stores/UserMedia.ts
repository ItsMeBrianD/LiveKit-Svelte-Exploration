import {browser} from "$app/env";
import { log, tag } from 'missionlog';
import type { Readable } from "svelte/store";
export type Media = {video: MediaStreamTrack | undefined, audio: MediaStreamTrack | undefined, stream: MediaStream | undefined};
const defaultMedia = () => ({
    video: undefined, audio: undefined, stream: undefined
});
export type MediaHook = (Media) => unknown;

class UserMediaStore implements Readable<Media> {
    private subscribers = new Set<MediaHook>();
    private value: Media = defaultMedia();
    private dispatch(newStream: MediaStream) {
        const videos = newStream.getVideoTracks();
        const audios = newStream.getAudioTracks();
        const output = defaultMedia();


        if(videos.length)  {
            output.video = videos[0];
        }
        if(audios.length) {
            output.audio = audios[0];
        }
        output.stream = newStream;
        this.value = output;
        log.info(tag.userMedia, output);

        this.subscribers.forEach(v => v(output))
    }

    request(constraints: MediaStreamConstraints) {
        if(!browser) return;
        log.info(tag.userMedia, constraints);
        new Promise((resolve, reject) => navigator.getUserMedia(constraints, resolve, reject)).then((media: MediaStream) => {
            log.info(tag.userMedia, media);
            this.dispatch(media);
        }).catch(
            e => log.error(tag.userMedia, e)
        )
    }
    subscribe(hook: MediaHook) {
        this.subscribers.add(hook);
        hook(this.value);
        return () => this.subscribers.delete(hook);
    }
}

export const UserMedia = new UserMediaStore();