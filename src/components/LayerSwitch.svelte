<script lang="ts">
    import { mapStore, layers } from "../stores";
    import InformationCircle from "./Information.svelte";

    export let layer = {
        name: "Layer Name",
        description: "Layer Description",
        visible: true,
        src: "http://graphics8.nytimes.com/newsgraphics/2012/1120-sandy/_assets/city_thumb.png",
        on: (map) => {},
        off: (map) => {},
    };

    function toggle() {
        layer.visible ? layer.off($mapStore) : layer.on($mapStore);
        layer.visible = !layer.visible
        layers.set($layers)
    }
</script>

<button
    on:click={toggle}
    class="w-32 min-h-24 bg-white pointer-events-auto drop-shadow-md cursor-pointer text-center {layer.visible
        ? 'outline outline-2 outline-blue-500'
        : ''}
        flex flex-col items-center
        p-2
        mb-3
        text-xs
        hover:bg-slate-100
        focus:bg-slate-100
        "
>
    <img src={layer.src} alt={layer.name + " Thumbnail for Toggle"} />
    <div>{layer.name}</div>
    {#if layer.description}
        <div class="absolute bottom-0 right-0" title={layer.description}>
            <InformationCircle />
        </div>
    {/if}
</button>

<style>
</style>
