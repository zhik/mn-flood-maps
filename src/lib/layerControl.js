import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import PopupTemplate from '@arcgis/core/PopupTemplate'

import basemapStyle from "./lightgreybase.json";
import basemapLabelStyle from "./lightgreybaselabels.json";
import stormwaterStyle from "./stormwatermod.json";
import subwayStyle from "./subwaybase.json";
import idaSr from "./ida.geo.json";
import events from "./events.geo.json"

import thumb_ida_311_heatmap from '../assets/ida_311_heatmap.png'
import thumb_mod_stormwater from '../assets/mod_stormwater.png'
import thumb_sandy_inundation from '../assets/sandy_inundation.png'

import { csvParse } from 'd3-dsv'
import proj4 from 'proj4'

import subwayLines from './subwaylines.geo.json'
import subwayStations from './subwaystations.geo.json'

const wkid4326 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';
const wkid2263 = '+proj=lcc +lat_1=41.03333333333333 +lat_2=40.66666666666666 +lat_0=40.16666666666666 +lon_0=-74 +x_0=300000.0000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs'

let baseMapTileLayer = null
let baseLabelsMapTileLayer = null
let stormwaterTileLayer = null
let idaHeatMapLayer = null
let idaPointLayer = null
let hurricaneEvacCenterLayer = null
let floodHazardLayer = null

function getUniqueValueSymbol(name, color) {
    return {
        type: "picture-marker",
        url: name,
        width: "30px",
        height: "30px"
    };
}

function initEvents(map) {
    const blob = new Blob([JSON.stringify(events)], {
        type: "application/json",
    })

    const popup = new PopupTemplate()
    popup.title = '{name} on {date}'
    popup.content = [
        {
            type: 'text',
            text: "<a href='{source}' target='_blank'>{source}</a>"
        },
        {
            type: 'media',
            mediaInfos: [{
                caption: "{alt}",
                type: 'image',
                value: {
                    sourceURL: "{url}"
                }
            }]
        }
    ]



    const eventsLayer = new GeoJSONLayer({
        url: URL.createObjectURL(blob),
        renderer: {
            type: "unique-value",
            field: "type",
            uniqueValueInfos: [
                {
                    value: "Subway",
                    symbol: getUniqueValueSymbol(
                        "http://static.arcgis.com/images/Symbols/Basic/RedStickpin.png",
                        "#D13470"
                    )
                }
            ]
        },
        popupTemplate: popup,
        spatialReference: {
            wkid: 4326
        },
        title: "Events"
    });

    map.add(eventsLayer)
}

function initSubwayBasemap(map) {
    const blob1 = new Blob([JSON.stringify(subwayStations)], {
        type: "application/json",
    });

    const labelClass = {
        // autocasts as new LabelClass()
        symbol: {
            type: "text",
            color: "rgb(40,40,40)",
            haloColor: "rgba(255,255,255,0.8)",
            haloSize: 2,
            "text-letter-spacing": 0.08,
            "text-max-width": 4,
            "symbol-avoid-edges": true,
            font: {
                family: "Ubuntu Regular",
                size: 10
            }
        },
        labelPlacement: "below-center",
        labelExpressionInfo: {
            expression: "$feature.name"
        },
        minScale: 20000,
        maxScale: 0
    };

    const stations = new GeoJSONLayer({
        url: URL.createObjectURL(blob1),
        renderer: {
            type: "simple",
            symbol: {
                type: "simple-marker",
                color: "rgba(255,255,255,0.6)",
                size: 4.5,
                outline: {
                    width: 1,
                    color: "rgba(0,0,0,0.6)",
                }
            },
            visualVariables: [
                {
                    type: 'size',
                    valueExpression: "$view.scale",
                    stops: [
                        { size: 7, value: 1000 },
                        { size: 3, value: 20000 },
                        { size: 0, value: 40000 }
                    ]
                }
            ],
        },
        labelingInfo: [labelClass],
        spatialReference: {
            wkid: 4326
        },
        title: "Subway Stations"
    });


    const blob2 = new Blob([JSON.stringify(subwayLines)], {
        type: "application/json",
    });

    const lineColors = subwayLines.features.reduce((colors, { properties: prop }) => {
        //check if color in array
        const { color } = prop
        if (!colors.find(item => item.value === color)) {
            colors.push({
                value: color,
                symbol: {
                    type: "simple-line",
                    color,
                    width: "1.4px",
                    style: "solid"
                }
            })
        }

        return colors
    }, [])

    const lines = new GeoJSONLayer({
        url: URL.createObjectURL(blob2),
        renderer: {
            type: "unique-value",
            field: "color",
            uniqueValueInfos: lineColors
        },
        spatialReference: {
            wkid: 4326
        },
        title: "Subway Lines",
        opacity: 0.2,
    });

    map.add(lines)
    map.add(stations)

}

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
            title: "Hurricane Evacuation Center: {OEM_LABEL}",
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

    baseLabelsMapTileLayer = new VectorTileLayer({
        style: basemapLabelStyle,
    });

    stormwaterTileLayer = new VectorTileLayer({
        style: stormwaterStyle,
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
                { color: "rgba(251,106,74, 0.2)", ratio: 0.1 },
                { color: "rgba(222,45,38, 0.5)", ratio: 0.3 },
                { color: "rgba(165,15,21, 0.7)", ratio: 0.6 },
            ],
            maxDensity: 0.025,
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

    //floodHazardLayer
    floodHazardLayer = new FeatureLayer({
        url: "https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/ArcGIS/rest/services/S_FLD_HAZ_AR/FeatureServer/0",
        opacity: 0.6
    });

    initHurrShelters(map)
    map.add(baseMapTileLayer);
    map.add(floodHazardLayer)
    map.add(stormwaterTileLayer);
    initSubwayBasemap(map)
    map.add(idaHeatMapLayer)
    map.add(idaPointLayer)
    map.add(baseLabelsMapTileLayer)
    initEvents(map)

    idaHeatMapLayer.visible = false
    idaPointLayer.visible = false

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

    // map.add(mask)

    const modStormWaterToggleLayers = [
        'Area not included in analysis:1',
        'Area under analysis',
        'Area not included in analysis:2',
        'National Wetlands Inventory/1',
        'Nuisance Flooding (greater or equal to 4 in and less than 1ft)/1',
        'Deep and Contiguous Flooding (1ft and greater)/1',
        'Future High Tides 2050']

    return [
        // {
        //     name: 'Placeholder - ❗Active 311 DEP Flood Service Requests (36 hours)',
        //     description: '',
        //     visible: false,
        //     on: (map) => {
        //     },
        //     off: (map) => {
        //     }
        // },
        {
            name: 'Moderate Stormwater Flood',
            description: 'Heavy rain events that overwhelm our stormwater management system.',
            legendElements: [
                `<div><span class="fill" style="background-color: #a69fe4;"></span>Nuisance Flooding (greater or equal to 4in and less than 1ft)</div>`,
                `<div><span class="fill" style="background-color: #4e44b4;"></span>Deep and Contiguous Flooding (1ft and greater)</div>`,
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
                `<div><span class="circle" style="background-color: rgba(255,0,0,0.8);outline: 1px solid rgba(200,200,200,0.7);"></span>311 DEP Flood Service Requests During Ida</div>`
            ],
            visible: false,
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
            name: 'Coastal Flood Hazard with Sandy Inundation',
            description: 'FEMA\'s Preliminary Flood Insurance Rate Maps released in 2015',
            legendElements: [
                `<div><span class="fill" style="background-color: #52acc4;"></span>Coastal Flood Zone with wave action</div>`,
                `<div><span class="fill" style="background-color: #52c5ee;"></span>Areas with 1% annual flood risk</div>`,
                `<div><span class="fill" style="background-color: #52ffd8;"></span>Areas with 0.2% annual flood risk; 1% with avg depts of 1 ft</div>`,
                `<div><span class="fill" style="background-color: rgba(255,0,0,0.1); outline: #FF0000 solid 1px; outline-style: dotted;"></span>Inundation Zone - Areas that were flooded as a result of Hurricane Sandy.</div>`
            ],
            visible: true,
            src: thumb_sandy_inundation,
            on: (map) => {
                floodHazardLayer.visible = true
                stormwaterTileLayer.setStyleLayerVisibility('Sandy Inundation Zone Line', 'visible')
                stormwaterTileLayer.setStyleLayerVisibility('Sandy Inundation Zone Fill', 'visible')
            },
            off: (map) => {
                floodHazardLayer.visible = false
                stormwaterTileLayer.setStyleLayerVisibility('Sandy Inundation Zone Line', 'none')
                stormwaterTileLayer.setStyleLayerVisibility('Sandy Inundation Zone Fill', 'none')
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