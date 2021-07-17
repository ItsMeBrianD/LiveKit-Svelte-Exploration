<script lang="ts">
    import { browser } from "$app/env";
    import Button from "../lib/components/atoms/Button.svelte";
    import { goto } from "$app/navigation";
    import faker from "faker";
import { onMount } from "svelte";
    onMount(() => {
        name = faker.name.firstName(Math.round(Math.random()));
    })
    let name = "";
    let room = "";

    async function joinRoom() {
        if (!browser) return;
        const {token, url} = await fetch(`/join/${room}?user=${encodeURI(name)}`).then(
            (r) => r.json()
        );
        localStorage.setItem("token", token);
        localStorage.setItem("url", url);
        goto(`/call/${room}`);
    }
</script>

<main>
    <div>
        <h2>Please Enter your Information</h2>
        <label>
            <span>Display Name</span>
            <input type="text" bind:value={name} />
        </label>
        <label>
            <span>Room</span>
            <select bind:value={room}>
                <option value="" />
                <option value="test">Test Room</option>
            </select>
        </label>
        <Button class="floating {name && room && "success"}" disabled={!name || !room} on:click={joinRoom}>Join Room</Button>
    </div>
</main>

<style lang="postcss">
    h2 {
        @apply text-xl font-bold mb-10;
    }
    div {
        @apply bg-gray-700 bg-opacity-10 p-10;
    }
    label > * {
        @apply block w-full;
    }
    main {
        @apply w-screen h-screen flex justify-center items-center flex-col;
    }
    /* button {
        @apply m-auto block mt-3 bg-green-200 px-4 py-2 rounded-md;
    }
    button[disabled] {
        @apply cursor-default bg-red-50;
    } */
</style>
