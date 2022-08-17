import{g9 as g,k as _,hK as O,g6 as k,dx as $,ga as C,hL as D,g7 as Q,b3 as P,J as G,s as M,cz as Z,r as E,cH as v,dh as A,q as z,b8 as q,dj as N,dl as L,hM as B}from"./index.b82fad90.js";import{u as J}from"./FeatureStore.24e92b93.js";import{f as F,g as b}from"./projectionSupport.179b2c07.js";import{Y as U}from"./QueryEngine.e70470ff.js";import{T as W,L as H,O as V}from"./geojson.8cfcff4a.js";import{w as Y,m as w,f as T,a as I,g as x}from"./sourceUtils.c6b115be.js";import"./PooledRBush.b1e7ac60.js";import"./centroid.7e9e1950.js";import"./json.d1a0fa35.js";import"./QueryEngineResult.9118bf1e.js";import"./quantizationUtils.504677c0.js";import"./WhereClause.443cc7a7.js";import"./utils.b988e9ba.js";import"./ClassBreaksDefinition.7a4f2265.js";import"./utils.685193b6.js";import"./timeSupport.4e1e9033.js";const K={hasAttachments:!1,capabilities:"query, editing, create, delete, update",useStandardizedQueries:!0,supportsCoordinatesQuantization:!0,supportsReturningQueryGeometry:!0,advancedQueryCapabilities:{supportsQueryAttachments:!1,supportsStatistics:!0,supportsPercentileStatistics:!0,supportsReturningGeometryCentroid:!0,supportsQueryWithDistance:!0,supportsDistinct:!0,supportsReturningQueryExtent:!0,supportsReturningGeometryProperties:!1,supportsHavingClause:!0,supportsOrderBy:!0,supportsPagination:!0,supportsQueryWithResultType:!1,supportsSqlExpression:!0,supportsDisjointSpatialRel:!0}};class fe{constructor(){this._queryEngine=null,this._snapshotFeatures=async e=>{const t=await this._fetch(e);return this._createFeatures(t)}}destroy(){var e;(e=this._queryEngine)==null||e.destroy(),this._queryEngine=this._fieldsIndex=this._createDefaultAttributes=null}async load(e,t={}){this.loadOptions={url:e.url,customParameters:e.customParameters};const i=[];await this._checkProjection(e.spatialReference);let n=null;e.url&&(n=await this._fetch(t==null?void 0:t.signal));const a=W(n,{geometryType:e.geometryType}),o=e.fields||a.fields||[],u=e.hasZ!=null?e.hasZ:a.hasZ,d=a.geometryType,p=e.objectIdField||a.objectIdFieldName||"__OBJECTID",c=e.spatialReference||g;let s=e.timeInfo;o===a.fields&&a.unknownFields.length>0&&i.push({name:"geojson-layer:unknown-field-types",message:"Some fields types couldn't be inferred from the features and were dropped",details:{unknownFields:a.unknownFields}});let l=o.find(r=>r.name===p);l?(l.type!=="esriFieldTypeString"&&(l.type="esriFieldTypeOID"),l.editable=!1,l.nullable=!1):(l={alias:p,name:p,type:a.objectIdFieldType==="string"?"esriFieldTypeString":"esriFieldTypeOID",editable:!1,nullable:!1},o.unshift(l));const h={};for(const r of o){if(r.name==null&&(r.name=r.alias),r.alias==null&&(r.alias=r.name),!r.name)throw new _("geojson-layer:invalid-field-name","field name is missing",{field:r});if(!O.jsonValues.includes(r.type))throw new _("geojson-layer:invalid-field-type",`invalid type for field "${r.name}"`,{field:r});if(r.name!==l.name){const f=k(r);f!==void 0&&(h[r.name]=f)}}this._fieldsIndex=new $(o);const y=this._fieldsIndex.requiredFields.indexOf(l);if(y>-1&&this._fieldsIndex.requiredFields.splice(y,1),s){if(s.startTimeField){const r=this._fieldsIndex.get(s.startTimeField);r?(s.startTimeField=r.name,r.type="esriFieldTypeDate"):s.startTimeField=null}if(s.endTimeField){const r=this._fieldsIndex.get(s.endTimeField);r?(s.endTimeField=r.name,r.type="esriFieldTypeDate"):s.endTimeField=null}if(s.trackIdField){const r=this._fieldsIndex.get(s.trackIdField);r?s.trackIdField=r.name:(s.trackIdField=null,i.push({name:"geojson-layer:invalid-timeInfo-trackIdField",message:"trackIdField is missing",details:{timeInfo:s}}))}s.startTimeField||s.endTimeField||(i.push({name:"geojson-layer:invalid-timeInfo",message:"startTimeField and endTimeField are missing",details:{timeInfo:s}}),s=null)}const S=d?C(d):null,m={warnings:i,featureErrors:[],layerDefinition:{...K,drawingInfo:S,templates:D(h),extent:null,geometryType:d,objectIdField:p,fields:o,hasZ:!!u,timeInfo:s}};this._queryEngine=new U({fields:o,geometryType:d,hasM:!1,hasZ:u,objectIdField:p,spatialReference:c,timeInfo:s,featureStore:new J({geometryType:d,hasM:!1,hasZ:u}),cacheSpatialQueries:!0}),this._createDefaultAttributes=Q(h,p);const j=await this._createFeatures(n);this._objectIdGenerator=this._createObjectIdGenerator(this._queryEngine,j);const R=this._normalizeFeatures(j,m.warnings,m.featureErrors);if(this._queryEngine.featureStore.addMany(R),m.layerDefinition.extent=this._queryEngine.fullExtent,m.layerDefinition.timeInfo){const{start:r,end:f}=this._queryEngine.timeExtent;m.layerDefinition.timeInfo.timeExtent=[r,f]}return m}async applyEdits(e){const{spatialReference:t,geometryType:i}=this._queryEngine;return await Promise.all([Y(t,i),F(e.adds,t),F(e.updates,t)]),await this._waitSnapshotComplete(),this._applyEdits(e)}async queryFeatures(e={},t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQuery(e,t.signal)}async queryFeatureCount(e={},t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForCount(e,t.signal)}async queryObjectIds(e={},t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForIds(e,t.signal)}async queryExtent(e={},t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForExtent(e,t.signal)}async querySnapping(e,t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForSnapping(e,t.signal)}async refresh(e){var t;return this.loadOptions.customParameters=e,(t=this._snapshotTask)==null||t.abort(),this._snapshotTask=P(this._snapshotFeatures),this._snapshotTask.promise.then(i=>{this._queryEngine.featureStore.clear(),this._objectIdGenerator=this._createObjectIdGenerator(this._queryEngine,i);const n=this._normalizeFeatures(i);n&&this._queryEngine.featureStore.addMany(n)},i=>{this._queryEngine.featureStore.clear(),G(i)||M.getLogger("esri.layers.GeoJSONLayer").error(new _("geojson-layer:refresh","An error occurred during refresh",{error:i}))}),await this._waitSnapshotComplete(),{extent:this._queryEngine.fullExtent,timeExtent:this._queryEngine.timeExtent}}async _createFeatures(e){const{geometryType:t,hasZ:i,objectIdField:n}=this._queryEngine,a=H(e,{geometryType:t,hasZ:i,objectIdField:n});if(!Z(this._queryEngine.spatialReference,g))for(const o of a)E(o.geometry)&&(o.geometry=v(b(A(o.geometry,this._queryEngine.geometryType,this._queryEngine.hasZ,!1),g,this._queryEngine.spatialReference)));return a}async _waitSnapshotComplete(){if(this._snapshotTask&&!this._snapshotTask.finished){try{await this._snapshotTask.promise}catch{}return this._waitSnapshotComplete()}}async _fetch(e){const{url:t,customParameters:i}=this.loadOptions,n=(await z(t,{responseType:"json",query:{...i},signal:e})).data;return await V(n),n}_normalizeFeatures(e,t,i){const{objectIdField:n}=this._queryEngine,a=[];for(const o of e){const u=this._createDefaultAttributes(),d=w(this._fieldsIndex,u,o.attributes,!0,t);d?i==null||i.push(d):(this._assignObjectId(u,o.attributes,!0),o.attributes=u,o.objectId=u[n],a.push(o))}return a}_applyEdits(e){const{adds:t,updates:i,deletes:n}=e,a={addResults:[],deleteResults:[],updateResults:[],uidToObjectId:{}};if(t&&t.length&&this._applyAddEdits(a,t),i&&i.length&&this._applyUpdateEdits(a,i),n&&n.length){for(const o of n)a.deleteResults.push(T(o));this._queryEngine.featureStore.removeManyById(n)}return{extent:this._queryEngine.fullExtent,timeExtent:this._queryEngine.timeExtent,featureEditResults:a}}_applyAddEdits(e,t){const{addResults:i}=e,{geometryType:n,hasM:a,hasZ:o,objectIdField:u,spatialReference:d,featureStore:p}=this._queryEngine,c=[];for(const s of t){if(s.geometry&&n!==q(s.geometry)){i.push(I("Incorrect geometry type."));continue}const l=this._createDefaultAttributes(),h=w(this._fieldsIndex,l,s.attributes);if(h)i.push(h);else{if(this._assignObjectId(l,s.attributes),s.attributes=l,s.uid!=null){const y=s.attributes[u];e.uidToObjectId[s.uid]=y}E(s.geometry)&&(s.geometry=b(x(s.geometry,d),s.geometry.spatialReference,d)),c.push(s),i.push(T(s.attributes[u]))}}p.addMany(N([],c,n,o,a,u))}_applyUpdateEdits({updateResults:e},t){const{geometryType:i,hasM:n,hasZ:a,objectIdField:o,spatialReference:u,featureStore:d}=this._queryEngine;for(const p of t){const{attributes:c,geometry:s}=p,l=c&&c[o];if(l==null){e.push(I(`Identifier field ${o} missing`));continue}if(!d.has(l)){e.push(I(`Feature with object id ${l} missing`));continue}const h=L(d.getFeature(l),i,a,n);if(E(s)){if(i!==q(s)){e.push(I("Incorrect geometry type."));continue}h.geometry=b(x(s,u),s.spatialReference,u)}if(c){const y=w(this._fieldsIndex,h.attributes,c);if(y){e.push(y);continue}}d.add(B(h,i,a,n,o)),e.push(T(l))}}_createObjectIdGenerator(e,t){const i=e.fieldsIndex.get(e.objectIdField);if(i.type==="esriFieldTypeString")return()=>i.name+"-"+Date.now().toString(16);let n=Number.NEGATIVE_INFINITY;for(const a of t)a.objectId&&(n=Math.max(n,a.objectId));return n=Math.max(0,n)+1,()=>n++}_assignObjectId(e,t,i=!1){const n=this._queryEngine.objectIdField;e[n]=i&&n in t?t[n]:this._objectIdGenerator()}async _checkProjection(e){try{await F(g,e)}catch{throw new _("geojson-layer","Projection not supported")}}}export{fe as default};
