<script lang="ts">
    import { layers } from "../stores";
    $: elements = $layers
        .filter(({ visible }) => visible)
        .reduce((elements, layer) => {
            if (!layer.legendElements) return elements;
            return [...elements, ...layer.legendElements];
        }, []);
</script>

{#if elements.length}
    <div
        id="legend"
        class="w-52 bg-white p-2 drop-shadow-sm flex flex-col h-fit leading-5"
    >
        <h3 class="text-lg font-medium mb-2">Legend</h3>
        {#each elements as element}
            {@html element}
        {/each}
    </div>
{/if}

<style>
    :global(#legend div:not(:last-child)) {
        padding-bottom: 0.25rem;
        margin-bottom: 0.5rem;
        border-bottom: 2px solid rgba(155, 155, 155, 0.1);
    }

    :global(.fill) {
        width: 2em;
        height: 0.8em;
        display: inline-block;
        margin-right: 4px;
    }
    :global(.diamond) {
        width: 0.8em;
        height: 0.8em;
        outline: 2px solid white;
        display: inline-block;
        transform: rotate(135deg);
        margin-left: 0.4em;
        margin-right: 8px;
    }
    :global(.circle) {
        width: 0.8em;
        height: 0.8em;
        margin-left: 0.4em;
        border-radius: 2em;
        display: inline-block;
        margin-right: 4px;
    }
</style>
