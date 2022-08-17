<script lang='ts'>
import LayerSwitch from "./LayerSwitch.svelte";
import {layers} from '../stores'

</script>

<div class="absolute top-3 left-3 z-10">
    {#each $layers as layer (layer.name)}
        <LayerSwitch {layer}/>
    {/each}
</div>