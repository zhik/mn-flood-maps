import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";

import basemapStyle from "./lightgreybase.json";
import stormwaterStyle from "./stormwatermod.json";
import subwayStyle from "./subwaybase.json";
import idaSr from "./ida.geo.json";

import thumb_ida_311_heatmap from '../assets/ida_311_heatmap.png'
import thumb_mod_stormwater from '../assets/mod_stormwater.png'
import thumb_sandy_inundation from '../assets/sandy_inundation.png'

let baseMapTileLayer = null
let stormwaterTileLayer = null
let subwayTileLayer = null
let idaHeatMapLayer = null

export function initLayers(map) {
    baseMapTileLayer = new VectorTileLayer({
        style: basemapStyle,
    });

    stormwaterTileLayer = new VectorTileLayer({
        style: stormwaterStyle,
    });

    subwayTileLayer = new VectorTileLayer({
        style: subwayStyle,
    });

    const blob = new Blob([JSON.stringify(idaSr)], {
        type: "application/json",
    });

    idaHeatMapLayer = new GeoJSONLayer({
        url: URL.createObjectURL(blob),
        renderer: {
            type: "heatmap",
            colorStops: [
                { color: "rgba(241,238,246, 0)", ratio: 0 },
                { color: "rgba(251,106,74, 0.4)", ratio: 0.1 },
                { color: "rgba(222,45,38, 0.5)", ratio: 0.3 },
                { color: "rgba(165,15,21, 0.7)", ratio: 0.6 },
            ],
            maxDensity: 0.01,
            minDensity: 0,
        },
        title: "Hurricane Ida - 311 DEP Flooding Related Requests",
    });


    map.add(subwayTileLayer);
    map.add(baseMapTileLayer);
    map.add(stormwaterTileLayer);
    map.add(idaHeatMapLayer)

    const modStormWaterToggleLayers = [
        'Area not included in analysis:1',
        'Area under analysis',
        'Area not included in analysis:2',
        'National Wetlands Inventory/1',
        'Nuisance Flooding (greater or equal to 4 in and less than 1ft)/1',
        'Deep and Contiguous Flooding (1ft and greater)/1',
        'Future High Tides 2050']

    return [
        {
            name: 'Moderate Stormwater Flood with 2050 Sea Levels',
            src: thumb_mod_stormwater,
            on: (map) => {
                modStormWaterToggleLayers.forEach(layerId => {
                    stormwaterTileLayer.setStyleLayerVisibility(layerId, 'visible')
                })
            },
            off: (map) => {
                modStormWaterToggleLayers.forEach(layerId => {
                    stormwaterTileLayer.setStyleLayerVisibility(layerId, 'none')
                })
            }
        },
        {
            name: '311 DEP Flood Service Requests (Hur. Ida: Sept 1-2 2021)',
            src: thumb_ida_311_heatmap,
            on: (map) => {
                idaHeatMapLayer.visible = true
            },
            off: (map) => {
                idaHeatMapLayer.visible = false
            }
        },
        {
            name: 'Sandy Inundation Zone',
            src: thumb_sandy_inundation,
            on: (map) => {
                    stormwaterTileLayer.setStyleLayerVisibility('Sandy Inundation Zone', 'visible')
            },
            off: (map) => {
                    stormwaterTileLayer.setStyleLayerVisibility('Sandy Inundation Zone', 'none')
            }
        },
    ]
}