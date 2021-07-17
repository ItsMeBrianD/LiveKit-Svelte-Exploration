<script lang="ts">
    import { getContext, onMount } from "svelte";

    import { fade } from "svelte/transition";
    import type { ToastStore } from "$lib/stores";
    
    const toasts = getContext<ToastStore>("toast");

    function remove(toast) {
        $toasts = $toasts.filter((t) => t !== toast);
    }
</script>

<ul>
    {#each $toasts as toast}
        <li on:click={() => remove(toast)} transition:fade class="{toast.status ?? ""}">
            <h3>
                {toast.title}
            </h3>
            <p>
                {toast.content}
            </p>
        </li>
        <hr />
    {/each}
</ul>

<style lang="postcss">
    ul {
        @apply absolute z-50 w-80 bottom-10 right-10;
    }
    li {
        @apply bg-blue-200 rounded-md p-4 mt-10 text-right cursor-pointer;
    }
    li.danger {
        @apply bg-red-200;
    }
    li.success {
        @apply bg-green-200;
    }
    li.warn {
        @apply bg-yellow-200;
    }
    h3 {
        @apply text-lg font-bold;
    }
</style>
