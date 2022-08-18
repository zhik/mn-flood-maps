<script lang="ts">
    import LayerSwitch from "./LayerSwitch.svelte";
    import Legend from "./Legend.svelte";
    import { layers } from "../stores";
</script>

<div
    class="absolute top-3 left-3 z-10 
        flex flex-col-reverse sm:flex-row 
        pointer-events-none
        max-h-95vh md:max-h-screen lg:max-h-screen
        ">
    <div class="pr-2 overflow-y-scroll pointer-events-auto">
        {#each $layers as layer (layer.name)}
            <LayerSwitch {layer} />
        {/each}
    </div>
    <Legend />
</div>

<style>
    :global(.max-h-95vh){
        max-height: 95vh;
    }
</style>
