<script lang="ts">
    export let stream: MediaStream;
    import VerticalSlider from "$lib/components/atoms/VerticalSlider.svelte";
    import { srcObject } from "$lib/actions/useSrcObject";
    export let volume = 0;
    let muted = true;
    $: muted = volume === 0;

    let width;
    let height;
    // $: height = (width / 16) * 9;
</script>

<section bind:clientWidth={width} style="height: {height}px">
    {#if stream.active}
        <video use:srcObject={stream} bind:volume bind:muted />
        <div>
            <span class="slider-container">
                <VerticalSlider bind:value={volume} />
            </span>
        </div>
    {:else}
        <div class="camera-off">
            <h1>Camera Off</h1>
        </div>
    {/if}
</section>

<style lang="postcss">
    section {
        @apply relative max-h-full h-full;
    }
    video {
        @apply max-w-full max-h-full h-full mx-auto;
    }
    div {
        @apply absolute h-full w-full top-0 left-0;
    }
    span.slider-container {
        @apply absolute right-2 h-full;
    }
    input {
        @apply absolute right-0 h-1/2 w-1/12 top-1/4;

        writing-mode: bt-lr; /* IE */
        -webkit-appearance: slider-vertical; /* WebKit */
    }
    div.camera-off {
        @apply bg-gray-400;
    }

    h1 {
        @apply top-1/2 -translate-y-1/2 absolute left-1/2 -translate-x-1/2 font-bold text-xl;
    }
</style>
