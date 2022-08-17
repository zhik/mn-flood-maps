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
let idaPointLayer = null

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
        minScale: 300000,
        maxScale: 9000
    });

    idaPointLayer = new GeoJSONLayer({
        url: URL.createObjectURL(blob),
        popupTemplate: {
            title: "{Complaint Type} {Descriptor}",
            content: "Created {Created Date} at {Incident Address}. Resoluted with {Resolution Description}",
            fieldInfos: [
                {
                    fieldName: "Created Date",
                    format: {
                        dateFormat: "short-date-short-time"
                    }
                }
            ]
        },
        renderer: {
            type: "simple",
            symbol: {
                type: "simple-marker",
                color: "rgba(255,0,0, 0.8)",
                size: 13,
                outline: {
                    color: "white"
                }
            }
        },
        title: "Hurricane Ida - 311 DEP Flooding Related Requests",
        minScale: 9000,
        maxScale: 0
    });


    map.add(subwayTileLayer);
    map.add(baseMapTileLayer);
    map.add(stormwaterTileLayer);
    map.add(idaHeatMapLayer)
    map.add(idaPointLayer)

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
            description: 'Heavy rain events that overwhelm our stormwater management system.',
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
            description: 'Complaints of Sewer Backup, Catch Basin Clogged/Flooding, and Basement Flooding. These show us issues that happen in buildings and sidewalks that the stormwater layer can miss. Zoom in to view more details.',
            src: thumb_ida_311_heatmap,
            on: (map) => {
                idaHeatMapLayer.visible = true
                idaPointLayer.visible = true
            },
            off: (map) => {
                idaHeatMapLayer.visible = false
                idaPointLayer.visible = false
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