<script lang="ts">
    import LayerSwitch from "./LayerSwitch.svelte";
    import Legend from "./Legend.svelte";
    import { layers } from "../stores";
</script>

<div class="absolute top-3 left-3 z-10 flex flex-row">
    <div class="mr-4">
        {#each $layers as layer (layer.name)}
            <LayerSwitch {layer} />
        {/each}
    </div>
    <Legend />
</div>
