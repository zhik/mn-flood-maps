import{d$ as i}from"./index.b82fad90.js";const l=new i({esriGeometryPoint:"point",esriGeometryMultipoint:"multipoint",esriGeometryPolyline:"polyline",esriGeometryPolygon:"polygon",esriGeometryMultiPatch:"multipatch",mesh:"mesh"});function u(e){return l.toJSON(e)}function m(e){const{bandCount:t,attributeTable:n,colormap:r,pixelType:o}=e.rasterInfo;return t===1&&(n!=null||r!=null||o==="u8"||o==="s8")}export{u as e,m as r};
