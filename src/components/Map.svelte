<script lang="ts">
  import "@arcgis/core/assets/esri/themes/light/main.css";
  import ArcGISMap from "@arcgis/core/Map";
  import MapView from "@arcgis/core/views/MapView";

  function initMap(container: HTMLDivElement) {
    const map = new ArcGISMap({
      basemap: "streets-vector",
    });

    const view = new MapView({
      map: map,
      container,
      center: [-118.244, 34.052],
      zoom: 12,
    });

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
