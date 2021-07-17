<script lang="ts">
    import Button from "$lib/components/atoms/Button.svelte";
    import { goto } from "$app/navigation";
    import { getContext } from "svelte";
    import type { Room } from "livekit-client";
    import type { Writable } from "svelte/store";
    import MediaDeviceSelect from "../molecules/MediaDeviceSelect.svelte";
    const room = getContext<Writable<Room>>("room");
    function leave() {
        localStorage.removeItem("token");
        localStorage.removeItem("url");
        if ($room) $room.disconnect();
        goto("/");
    }
</script>

<div class="controls">
    <p>{$room?.localParticipant.identity}</p>
    <Button class="danger" on:click={leave}>Leave Room</Button>
    <MediaDeviceSelect deviceKind="videoinput" />
    <MediaDeviceSelect deviceKind="audioinput" />
    <MediaDeviceSelect deviceKind="audiooutput" />
</div>

<style lang="postcss">
    div.controls {
        @apply p-10 col-span-5 row-span-1 bg-gray-100 flex items-center gap-x-4;
    }
</style>
