import { writable } from 'svelte/store';
import type ArcGISMap from '@arcgis/core/Map';

export const mapStore = writable<ArcGISMap>();
export const layers = writable([]);