import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";

import basemapStyle from "./lightgreybase.json";
import stormwaterStyle from "./stormwatermod.json";
import subwayStyle from "./subwaybase.json";
import idaSr from "./ida.geo.json";

import thumb_ida_311_heatmap from '../assets/ida_311_heatmap.png'
import thumb_mod_stormwater from '../assets/mod_stormwater.png'
import thumb_sandy_inundation from '../assets/sandy_inundation.png'

import { csvParse } from 'd3-dsv'
import proj4 from 'proj4'

const wkid4326 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';
const wkid2263 = '+proj=lcc +lat_1=41.03333333333333 +lat_2=40.66666666666666 +lat_0=40.16666666666666 +lon_0=-74 +x_0=300000.0000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs'

let baseMapTileLayer = null
let stormwaterTileLayer = null
let subwayTileLayer = null
let idaHeatMapLayer = null
let idaPointLayer = null
let hurricaneEvacCenterLayer = null

async function initHurrShelters(map) {
    const url = 'https://corsproxy.io/?https://maps.nyc.gov/hurricane/data/center.csv'
    const data = csvParse(await (await fetch(url)).text())
    const features = data.map(properties => ({
        "type": "Feature",
        properties,
        "geometry": {
            "type": "Point",
            "coordinates": proj4(wkid2263, wkid4326, [
                +properties.X,
                +properties.Y
            ])
        }
    }))

    const blob = new Blob([JSON.stringify({
        type: 'FeatureCollection',
        features
    })], {
        type: "application/json",
    });

    const layer = new GeoJSONLayer({
        url: URL.createObjectURL(blob),
        popupTemplate: {
            title: "{OEM_LABEL}",
            content: "{BLDG_ADD} - {ACC_FEAT}",
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
                style: 'diamond',
                color: "lightblue",
                size: 13,
                outline: {
                    width: 2,
                    color: "red",

                }
            }
        },
        spatialReference: {
            wkid: 4326
        },
        title: "Hurricane Evacuation Center"
    });



    map.add(layer)
    layer.visible = false
    hurricaneEvacCenterLayer = layer
}

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

    initHurrShelters(map)
    map.add(subwayTileLayer);
    map.add(baseMapTileLayer);
    map.add(stormwaterTileLayer);
    map.add(idaHeatMapLayer)
    map.add(idaPointLayer)

    //cover areas not in Manhattan
    const mask = new VectorTileLayer({
        style: {
            "version": 8, "sources":
            {
                "Manhattan_Mask":
                {
                    "type": "vector",
                    "bounds": [-74.8524, 40.2471, -73.1779, 41.11],
                    "minzoom": 9,
                    "maxzoom": 23,
                    "scheme": "xyz",
                    "url": "https://vectortileservices6.arcgis.com/QBTLpj07hLeyQqJB/arcgis/rest/services/Manhattan_Mask/VectorTileServer/"
                }
            }, "layers": [{
                "id": "Manhattan_Mask", "type": "fill", "source": "Manhattan_Mask",
                "source-layer": "Manhattan_Mask", "minzoom": 10, "maxzoom": 23, "layout": {},
                "paint": { "fill-color": "rgba(207, 211, 212, 0.9)" }
            }]
        },
    });

    map.add(mask)

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
            legendElements: [
                `<div><span class="fill" style="background-color: #73B2FF;"></span>Nuisance Flooding (greater or equal to 4 in and less than 1ft)</div>`,
                `<div><span class="fill" style="background-color: #005CE6;"></span>Deep and Contiguous Flooding (1ft and greater)</div>`,
                `<div><span class="fill" style="background-color: rgba(255, 167, 29,1);"></span>Future High Tides in 2050</div>`,
                `<div><span class="fill" style="background-color: #CCCCCC;"></span>Area not included in analysis or National Wetlands Inventory</div>`,
            ],
            visible: true,
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
            legendElements: [
                `<div><span class="circle" style="background-color: rgba(255,0,0,0.8);outline: 1px solid rgba(200,200,200,0.7);"></span>311 DEP Flood Service Requests</div>`
            ],
            visible: true,
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
            legendElements: [
                `<div><span class="fill" style="background-color: #446589;"></span>Inundation Zone - Areas that were flooded as a result of Hurricane Sandy.</div>`
            ],
            visible: true,
            src: thumb_sandy_inundation,
            on: (map) => {
                stormwaterTileLayer.setStyleLayerVisibility('Sandy Inundation Zone', 'visible')
            },
            off: (map) => {
                stormwaterTileLayer.setStyleLayerVisibility('Sandy Inundation Zone', 'none')
            }
        },
        {
            name: 'Resources and Evacuation Centers',
            legendElements: [
                `<div><span class="diamond" style="background-color: lightblue; outline-color: red"></span>Hurricane Evacuation Centers</div>`
            ],
            visible: false,
            src: '',
            on: (map) => {
                hurricaneEvacCenterLayer.visible = true
            },
            off: (map) => {
                hurricaneEvacCenterLayer.visible = false
            }
        },
    ]
}