<script lang="ts">
    import { layers } from "../stores";
    let collapsed = false;

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
        class="
        w-32 md:w-52 lg:w-52 
        bg-white p-2 drop-shadow-sm flex flex-col h-fit leading-5 
        custom-height
        mb-2 md:mb-0 lg:mb-0
        md:ml-2 lg:ml-2
        overflow-y-scroll pointer-events-auto"
    >
        <button
            class="text-lg font-medium pointer-events-auto"
            on:click={() => (collapsed = !collapsed)}
        >
            <div class="flex flex-row justify-between items-center">
                Legend
                {#if collapsed}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                        />
                    </svg>
                {:else}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    </svg>
                {/if}
            </div>
        </button>
        {#if !collapsed}
            {#each elements as element}
                {@html element}
            {/each}
        {/if}
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

    .custom-height {
        max-height: 13rem;
    }

    @media (min-width: 768px) {
        .custom-height {
            max-height: 95vh;
        }
    }
</style>
