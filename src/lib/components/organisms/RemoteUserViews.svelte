<script lang="ts">
    import RemoteUserView from "$lib/components/molecules/RemoteUserView.svelte";
    import type { Participant } from "livekit-client";
    import { getContext } from "svelte";
    import type { Readable } from "svelte/store";

    const participants = getContext<Readable<Participant[]>>("participants");
    let numParticipants;
    $: numParticipants = $participants.length;
    let unit, innerContainer: HTMLElement;
    let vidWidth = 0,
        vidHeight = 0;
    $: {
        if (unit) {
            const newWidth = Math.max(unit / (numParticipants || 1), unit / 4);
            const newHeight = (newWidth / 16) * 9;

            const heightBound = innerContainer?.clientHeight;
            if (heightBound && newHeight > heightBound) {
                vidHeight = heightBound;
                vidWidth = (heightBound / 9) * 16;
            } else {
                vidWidth = newWidth;
                vidHeight = newHeight;
            }
        }
    }
</script>

<section>
    <div class="inner" bind:clientWidth={unit} bind:this={innerContainer}>
        {#each $participants as participant (participant.identity)}
            <div style="width: {vidWidth}px; height: {vidHeight}px">
                <RemoteUserView {participant} />
            </div>
        {:else}
            You are alone
        {/each}
    </div>
    {#if numParticipants > 8}
        <span class="alert"
            >More than 8 participants may cause display jank!</span
        >
    {/if}
</section>

<style lang="postcss">
    section {
        grid-row: span 9;
        @apply w-full col-span-5 flex-wrap bg-blue-100 bg-opacity-60 shadow-inner max-h-full p-10 relative;
    }
    div.inner {
        @apply justify-center items-center w-full h-full flex-wrap flex;
    }
    section div {
        @apply max-w-full max-h-full;
    }
    span.alert {
        @apply absolute top-20 -translate-x-1/2 left-1/2 bg-red-200 p-4 rounded-md bg-opacity-60;
    }
</style>
