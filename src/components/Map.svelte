<script lang="ts">
  import "@arcgis/core/assets/esri/themes/light/main.css";
  import ArcGISMap from "@arcgis/core/Map";

  import MapView from "@arcgis/core/views/MapView";
  import Zoom from "@arcgis/core/widgets/Zoom";
  import Search from "@arcgis/core/widgets/Search";

  import { initLayers } from "../lib/layerControl";

  import { mapStore, layers } from "../stores";

  function initMap(container: HTMLDivElement) {
    const map = new ArcGISMap();

    const view = new MapView({
      map,
      container,
      center: [-73.98255, 40.75925],
      zoom: 12,
    });

    view.constraints.minZoom = 10;
    view.constraints.maxZoom = 18;

    view.ui.components = ["attribution"];

    const searchWidget = new Search({ view });
    view.ui.add(searchWidget, "top-right");

    const zoomWidget = new Zoom({ view });
    view.ui.add(zoomWidget, "bottom-right");

    layers.set(initLayers(map));
    mapStore.set(map);

    view.when(() => {
      console.log("Map is loaded");
    });

    return {
      destroy: () => {
        map.destroy();
      },
    };
  }
</script>

<div id="map" class="flex-1 h-full" use:initMap />

<style>
</style>
