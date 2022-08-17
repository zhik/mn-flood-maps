<script lang="ts">
  import Map from "./components/Map.svelte";
  import Sidebar from "./components/Sidebar.svelte";
</script>

<main class="flex flex-col md:flex-row h-full absolute bottom-0 left-0 right-0">
  <Sidebar />
  <Map />
</main>

<style>
</style>
