import{s as m}from"./CircularArray.0dc82e32.js";import{s as y,b1 as x,dr as f,c as l,fJ as b,j as A,da as C,ah as S,bk as F,r as D,m as v,gc as T}from"./index.b82fad90.js";import{A as g}from"./ComputedAttributeStorage.faa7f073.js";function E(n,e,t){n.referencesGeometry();const r=e.readArcadeFeature();try{return n.evaluate({...t,$feature:r})}catch(s){return y.getLogger("esri.views.2d.support.arcadeOnDemand").warn("Feature arcade evaluation failed:",s),null}}const j=x(()=>import("./labelFormatUtils.faeeddba.js"),["labelFormatUtils.faeeddba.js","index.b82fad90.js","index.4e1538ab.css"],import.meta.url);class w{constructor(e,t){this._canCacheExpressionValue=!1,this._sourceInfo=e,this._storage=t,this._bitsets={computed:t.getBitset(t.createBitset())}}get storage(){return this._storage}invalidate(){this._bitsets.computed.clear()}async updateSchema(e,t){const r=f(this._schema,t);if(this._schema=t,!t||l(r)||!b(r,"attributes"))return;A("esri-2d-update-debug")&&console.debug("Applying Update - Store:",r),this._bitsets.computed.clear(),e.targets[t.name]=!0;const s=t.attributes,a=[],i=[];for(const d in s){const o=s[d];switch(o.type){case"field":break;case"expression":a.push(this._createArcadeComputedField(o));break;case"label-expression":a.push(this._createLabelArcadeComputedField(o));break;case"statistic":i.push(o)}}this._computedFields=await Promise.all(a),this._canCacheExpressionValue=!this._computedFields.some(d=>d.type==="expression"&&d.expression.referencesScale()),this._statisticFields=i}setComputedAttributes(e,t,r,s){const a=this._bitsets.computed;if(!this._canCacheExpressionValue||!a.has(r)){a.set(r);for(const i of this._computedFields){const d=this._evaluateField(t,i,s);switch(i.resultType){case"numeric":e.setComputedNumericAtIndex(r,i.fieldIndex,d);break;case"string":e.setComputedStringAtIndex(r,i.fieldIndex,d)}}}}async _createArcadeComputedField(e){const t=this._sourceInfo.spatialReference,r=this._sourceInfo.fieldsIndex;return{...e,expression:await C(e.valueExpression,t,r)}}async _createLabelArcadeComputedField(e){const t=this._sourceInfo.spatialReference,r=this._sourceInfo.fieldsIndex,{createLabelFunction:s}=await j,a=await s(e.label,r,t);return{...e,builder:a}}_evaluateField(e,t,r){switch(t.type){case"label-expression":{const s=e.readArcadeFeature();return t.builder.evaluate(s)||""}case"expression":{const{expression:s}=t;return E(s,e,{$view:{scale:r}})}}}}class _ extends g{constructor(e,t){super(g.createInstance(),e.fullSchema()),this._currentIndex=-1,this._reader=e,this._indices=t}static from(e,t){return new _(e.copy(),t)}get hasNext(){return this._currentIndex+1<this._indices.length}getSize(){return this._indices.length}getCursor(){return this.copy()}copy(){const e=new _(this._reader.copy(),this._indices);return e._currentIndex=this._currentIndex,e}next(){for(;this._nextIndex()&&!this._reader._getExists(););return this._currentIndex<this._indices.length}_nextIndex(){return++this._currentIndex<this._indices.length&&(this._reader.setIndex(this._indices[this._currentIndex]),!0)}setArcadeSpatialReference(e){this._reader.setArcadeSpatialReference(e)}attachStorage(e){this._reader.attachStorage(e)}get geometryType(){return this._reader.geometryType}get hasFeatures(){return this._reader.hasFeatures}get exceededTransferLimit(){return this._reader.exceededTransferLimit}get hasZ(){return this._reader.hasZ}get hasM(){return this._reader.hasM}getStorage(){return this._reader.getStorage()}getComputedNumeric(e){return this._reader.getComputedNumericAtIndex(0)}setComputedNumeric(e,t){return this._reader.setComputedNumericAtIndex(t,0)}getComputedString(e){return this._reader.getComputedStringAtIndex(0)}setComputedString(e,t){return this._reader.setComputedStringAtIndex(0,t)}getComputedNumericAtIndex(e){return this._reader.getComputedNumericAtIndex(e)}setComputedNumericAtIndex(e,t){this._reader.setComputedNumericAtIndex(e,t)}getComputedStringAtIndex(e){return this._reader.getComputedStringAtIndex(e)}setComputedStringAtIndex(e,t){return this._reader.setComputedStringAtIndex(e,t)}transform(e,t,r,s){const a=this.copy();return a._reader=this._reader.transform(e,t,r,s),a}readAttribute(e,t=!1){return this._reader.readAttribute(e,t)}readAttributes(){return this._reader.readAttributes()}joinAttributes(e){return this._reader.joinAttributes(e)}readArcadeFeature(){return this._reader.readArcadeFeature()}geometry(){return this._reader.geometry()}field(e){return this.readAttribute(e,!0)}hasField(e){return this._reader.hasField(e)}setField(e,t){return this._reader.setField(e,t)}keys(){return this._reader.keys()}castToText(){return this._reader.castToText()}getQuantizationTransform(){return this._reader.getQuantizationTransform()}getFieldNames(){return this._reader.getFieldNames()}getAttributeHash(){return this._reader.getAttributeHash()}getObjectId(){return this._reader.getObjectId()}getDisplayId(){return this._reader.getDisplayId()}setDisplayId(e){return this._reader.setDisplayId(e)}getGroupId(){return this._reader.getGroupId()}setGroupId(e){return this._reader.setGroupId(e)}getXHydrated(){return this._reader.getXHydrated()}getYHydrated(){return this._reader.getYHydrated()}getX(){return this._reader.getX()}getY(){return this._reader.getY()}setIndex(e){return this._reader.setIndex(e)}getIndex(){return this._reader.getIndex()}readLegacyFeature(){return this._reader.readLegacyFeature()}readOptimizedFeature(){return this._reader.readOptimizedFeature()}readLegacyPointGeometry(){return this._reader.readLegacyPointGeometry()}readLegacyGeometry(){return this._reader.readLegacyGeometry()}readLegacyCentroid(){return this._reader.readLegacyCentroid()}readGeometryArea(){return this._reader.readGeometryArea()}readUnquantizedGeometry(){return this._reader.readUnquantizedGeometry()}readHydratedGeometry(){return this._reader.readHydratedGeometry()}readGeometry(){return this._reader.readGeometry()}readCentroid(){return this._reader.readCentroid()}_readAttribute(e,t){throw new Error("Error: Should not be called. Underlying _reader should be used instead")}_readAttributes(){throw new Error("Error: Should not be called. Underlying _reader should be used instead")}}function I(n,e){return n<<16|e}function c(n){return(4294901760&n)>>>16}function h(n){return 65535&n}const G={getObjectId:n=>n.getObjectId(),getAttributes:n=>n.readAttributes(),getAttribute:(n,e)=>n.readAttribute(e),cloneWithGeometry:(n,e)=>n,getGeometry:n=>n.readHydratedGeometry(),getCentroid:(n,e)=>n.readCentroid()};class L extends w{constructor(e,t,r){super(e,t),this.featureAdapter=G,this.events=new S,this._featureSetsByInstance=new Map,this._objectIdToDisplayId=new Map,this._spatialIndexInvalid=!0,this._indexSearchCache=new m(50),this._index=F(9,s=>({minX:this._storage.getXMin(s),minY:this._storage.getYMin(s),maxX:this._storage.getXMax(s),maxY:this._storage.getYMax(s)})),this.mode=r}get storeStatistics(){let e=0,t=0,r=0;return this.forEach(s=>{const a=s.readGeometry();a&&(t+=a.isPoint?1:a.lengths.reduce((i,d)=>i+d,0),r+=a.isPoint?1:a.lengths.length,e+=1)}),{featureCount:e,vertexCount:t,ringCount:r}}hasInstance(e){return this._featureSetsByInstance.has(e)}onTileData(e,t){if(l(t.addOrUpdate))return t;if(t.addOrUpdate.attachStorage(this._storage),this.mode==="snapshot"){const s=t.addOrUpdate.getCursor();for(;s.next();){const a=s.getDisplayId();this.setComputedAttributes(this._storage,s,a,e.scale)}return t}this._featureSetsByInstance.set(t.addOrUpdate.instance,t.addOrUpdate);const r=t.addOrUpdate.getCursor();for(;r.next();)this._insertFeature(r,e.scale);return this._spatialIndexInvalid=!0,this.events.emit("changed"),t}search(e){this._rebuildIndex();const t=e.id,r=this._indexSearchCache.find(d=>d.tileId===t);if(D(r))return r.readers;const s=new Map,a=this._searchIndex(e.bounds),i=[];for(const d of a){const o=this._storage.getInstanceId(d),u=c(o),p=h(o);s.has(u)||s.set(u,[]),s.get(u).push(p)}return s.forEach((d,o)=>{const u=this._featureSetsByInstance.get(o);i.push(_.from(u,d))}),this._indexSearchCache.enqueue({tileId:t,readers:i}),i}insert(e){var s;const t=e.getCursor(),r=this._storage;for(;t.next();){const a=I(t.instance,t.getIndex()),i=t.getObjectId(),d=(s=this._objectIdToDisplayId.get(i))!=null?s:this._storage.createDisplayId();t.setDisplayId(d),r.setInstanceId(d,a),this._objectIdToDisplayId.set(i,d)}this._featureSetsByInstance.set(e.instance,e),this._spatialIndexInvalid=!0}remove(e){const t=this._objectIdToDisplayId.get(e);if(!t)return;const r=this._storage.getInstanceId(t),s=h(r),a=c(r),i=this._featureSetsByInstance.get(a);this._objectIdToDisplayId.delete(e),this._storage.releaseDisplayId(t),i.removeAtIndex(s),i.isEmpty&&this._featureSetsByInstance.delete(a),this._spatialIndexInvalid=!0}toArray(){const e=new Array;return this.forEach(t=>e.push(t)),e}forEach(e){this._objectIdToDisplayId.forEach(t=>{const r=this._storage.getInstanceId(t),s=this._lookupFeature(r);e(s)})}forEachUnsafe(e){this._objectIdToDisplayId.forEach(t=>{const r=this._storage.getInstanceId(t),s=c(r),a=h(r),i=this._getFeatureSet(s);i.setIndex(a),e(i)})}forEachInBounds(e,t){const r=this._searchIndex(e);for(const s of r){const a=this.lookupFeatureByDisplayId(s,this._storage);t(v(a))}}forEachBounds(e,t,r){this._rebuildIndex();const s=[0,0,0,0];for(const a of e){if(!a.readGeometry())continue;const i=a.getDisplayId();s[0]=this._storage.getXMin(i),s[1]=this._storage.getYMin(i),s[2]=this._storage.getXMax(i),s[3]=this._storage.getYMax(i),t(T(r,s))}}sweepFeatures(e,t,r){this._spatialIndexInvalid=!0,this._objectIdToDisplayId.forEach((s,a)=>{e.has(s)||(t.releaseDisplayId(s),r&&r.unsetAttributeData(s),this._objectIdToDisplayId.delete(a))}),this.events.emit("changed")}sweepFeatureSets(e){this._spatialIndexInvalid=!0,this._featureSetsByInstance.forEach((t,r)=>{e.has(r)||this._featureSetsByInstance.delete(r)})}lookupObjectId(e,t){const r=this.lookupFeatureByDisplayId(e,t);return l(r)?null:r.getObjectId()}lookupDisplayId(e){return this._objectIdToDisplayId.get(e)}lookupFeatureByDisplayId(e,t){const r=t.getInstanceId(e);return this._lookupFeature(r)}lookupByDisplayIdUnsafe(e){const t=this._storage.getInstanceId(e),r=c(t),s=h(t),a=this._getFeatureSet(r);return a?(a.setIndex(s),a):null}_insertFeature(e,t){const r=this._storage,s=e.getObjectId(),a=I(e.instance,e.getIndex());r.getInstanceId(e.getDisplayId());let i=this._objectIdToDisplayId.get(s);i||(i=r.createDisplayId(),this._objectIdToDisplayId.set(s,i),this._spatialIndexInvalid=!0),e.setDisplayId(i),r.setInstanceId(i,a),this.setComputedAttributes(r,e,i,t)}_searchIndex(e){this._rebuildIndex();const t={minX:e[0],minY:e[1],maxX:e[2],maxY:e[3]};return this._index.search(t)}_rebuildIndex(){if(!this._spatialIndexInvalid)return;const e=[];this.mode==="snapshot"?this._featureSetsByInstance.forEach(t=>{const r=t.getCursor();for(;r.next();){const s=r.getDisplayId();this._storage.setBounds(s,r)&&e.push(s)}}):this._objectIdToDisplayId.forEach(t=>{const r=this._storage.getInstanceId(t);this._storage.setBounds(t,this._lookupFeature(r))&&e.push(t)}),this._index.clear(),this._index.load(e),this._indexSearchCache.clear(),this._spatialIndexInvalid=!1}_lookupFeature(e){const t=c(e),r=this._getFeatureSet(t);if(!r)return null;const s=r.getCursor(),a=h(e);return s.setIndex(a),s}_getFeatureSet(e){return this._featureSetsByInstance.get(e)}}export{w as c,L as l,_ as r,G as u};
