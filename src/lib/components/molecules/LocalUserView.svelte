<script lang="ts">
    import { UserMedia } from "$lib/stores";
    import StreamPlayer from "$lib/components/molecules/StreamPlayer.svelte";
</script>
<div>
{#if $UserMedia.video}
    <StreamPlayer stream={$UserMedia.stream} volume={0} />
{/if}
</div>
<style lang="postcss">
    div {
        @apply max-h-full max-w-full col-span-1 h-full bg-gray-100 row-span-2;
    }
</style>