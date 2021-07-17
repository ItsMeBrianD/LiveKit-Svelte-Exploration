<script lang="ts">
    export let min = 0;
    export let max = 1;
    export let step = 0.05;
    export let value = 1;

    let enabled = false;
    let container: HTMLElement;
    function updateValue(y: number) {
        if(!container) return;
        const box = container.getBoundingClientRect();
        const relY = (box.height) - (y) + box.y;
        const ratio = (relY / box.height);
        const rawValue = ratio * max + min;
        if(rawValue < min) value = min;
        else if (rawValue > max) value = max;
        else value = rawValue - (rawValue % step);
    }
    function mouseDown(e: MouseEvent) {
        enabled = true;
        updateValue(e.y);
        const _mouseUp = () => {
            enabled = false;
            document.removeEventListener('mouseup', _mouseUp);
            document.removeEventListener('mousemove', _mouseMove);
        }
        
        const _mouseMove = (_e: MouseEvent) => {
            updateValue(_e.y);   
        }
        document.addEventListener('mouseup', _mouseUp)
        document.addEventListener('mousemove', _mouseMove)

    }
</script>

<div on:mousedown={mouseDown} bind:this={container}>
    <span style="height: {(value / max) * 100}%"/>
</div>

<style lang="postcss">
    div {
        @apply bg-gray-600 bg-opacity-50 h-full w-5;
    }
    span {
        @apply bg-blue-500 block w-full absolute bottom-0 bg-opacity-50;
    }
</style>
