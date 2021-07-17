<script lang="ts">
    import { UserDevices } from "$lib/stores";
    export let deviceKind: MediaDeviceKind = "videoinput";
    let devices = [];
    $: devices = $UserDevices?.devices.filter((d) => d.kind === deviceKind);
    let selected = $UserDevices?.preferredDevices?.[deviceKind];
    $: UserDevices.setPreferred(deviceKind, selected);

    let label = "";
    $: switch(deviceKind) {
        case "videoinput": label = "Video Input"; break;
        case "audioinput": label = "Audio Input"; break;
        case "audiooutput": label = "Audio Output"; break;
    }
</script>

<label>
    {label}
    <select bind:value={selected}>
        {#each devices as device}
            <option value={device.deviceId}>{device.label}</option>
        {/each}
    </select>
</label>

<style lang="postcss">
    label {
        @apply inline-flex flex-col;
    }
    select {
        width: 20ch;
        text-overflow: ellipsis;
    }
</style>