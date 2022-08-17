<script lang="ts">
    import {mapStore} from '../stores'

    export let layer = {
        name: "Layer Name",
        src: "http://graphics8.nytimes.com/newsgraphics/2012/1120-sandy/_assets/city_thumb.png",
        on: (map) => {

        },
        off: (map) => {
            
        }
    };
    let outline = true;

    function toggle() {
        outline ? layer.off($mapStore) :  layer.on($mapStore)
        outline = !outline;
    }
</script>

<div
    on:click={toggle}
    class="w-32 min-h-24 bg-white pointer-events-auto drop-shadow-md cursor-pointer text-center {outline
        ? 'outline outline-2 outline-blue-500'
        : ''}
        flex flex-col items-center
        p-2
        mb-3
        text-xs"
>
    <img
        src={layer.src}
        alt={layer.name + ' Thumbnail for Toggle'}
    />
    <div>{layer.name}</div>
</div>

<style>
</style>
