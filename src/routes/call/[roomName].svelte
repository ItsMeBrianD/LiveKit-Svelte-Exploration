<script lang="ts">
    import { connect, Room } from "livekit-client";
    import { getContext, onMount, setContext } from "svelte";
    import LocalUserView from "$lib/components/molecules/LocalUserView.svelte";
    import { writable } from "svelte/store";
    import type { Writable } from "svelte/store";
    import RoomHandler from "$lib/components/abstract/RoomHandler.svelte";
    import CallControls from "$lib/components/organisms/CallControls.svelte";
    import RemoteUserViews from "$lib/components/organisms/RemoteUserViews.svelte";
    import type { ToastStore } from "../../lib/stores";
    import { log, tag } from 'missionlog';


    let connected = false;
    let room: Writable<Room> = writable<Room>(undefined);
    setContext("room", room);
    const toast = getContext<ToastStore>("toast");

    onMount(async () => {
        // This is checked in __layout.svelte, so we know it exists
        const token = localStorage.getItem("token");
        const url = localStorage.getItem("url");
        // Connect to the room
        try {
            $room = await connect(url, token);
            connected = true;
        } catch (e) {
            toast.add(
                {
                    title: "Error encountered joining room",
                    content: e.message,
                    status: "danger",
                },
                10000
            );
            log.error(tag.sfu, e);
        }
    });
</script>

<main>
    <LocalUserView />
    <CallControls />

    {#if connected}
        <RoomHandler>
            <RemoteUserViews />
        </RoomHandler>
    {/if}
</main>

<style lang="postcss">
    main {
        @apply h-screen w-screen min-h-screen max-h-screen 
        grid grid-cols-6;
        grid-template-rows: repeat(12, 1fr);
    }
</style>
