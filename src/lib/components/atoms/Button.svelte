<button {...$$restProps} on:click><slot /></button>

<style lang="postcss">
    button {
        @apply py-2 px-4 bg-blue-200 rounded-md;
    }
    button.danger {
        @apply bg-red-200;
    }
    button[disabled] {
        @apply bg-gray-200 text-gray-500 cursor-default;
    }
    button.success {
        @apply bg-green-200;
    }
    button.floating {
        @apply m-auto block mt-3;
    }
</style>
