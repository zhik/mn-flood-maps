import { writable } from 'svelte/store';
import type ArcGISMap from '@arcgis/core/Map';
import type MapView from "@arcgis/core/views/MapView";

export const mapStore = writable<ArcGISMap>();
export const viewStore = writable<MapView>();