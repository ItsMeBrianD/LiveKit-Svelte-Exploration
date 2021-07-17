<script lang="ts">
    import { browser } from "$app/env";
    import { getContext } from "svelte";
    import { goto } from "$app/navigation";
    import type { Toast } from "$lib/stores";
    import type { Writable } from "svelte/store";

    const toasts = getContext<Writable<Toast[]>>("toast");

    if (browser) {
        if (!localStorage.getItem("token") || !localStorage.getItem("url")) {
            
            $toasts = [
                ...$toasts,
                {
                    title: "Must Sign In",
                    content: "You must sign in before joining a call",
                    status: "danger",
                },
            ];

            goto("/");
        }
    }

    

</script>

<slot />
