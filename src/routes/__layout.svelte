<script lang="ts">
    import "../app.postcss";
    import { setContext } from "svelte";
    import { toastStore } from "$lib/stores";
    import ToastContainer from "$lib/components/molecules/ToastContainer.svelte";
    import { log, tag } from 'missionlog';

    import "$lib/logger";
    setContext("toast", toastStore);
    toastStore.subscribe((v) => log.info(tag.misc, v));
</script>

<slot />
<ToastContainer />

