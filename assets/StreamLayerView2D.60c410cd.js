import{aH as a,aI as o,aJ as h,aw as l,k as p,eP as f,c,r as d}from"./index.13375249.js";import v from"./FeatureLayerView2D.bd60ca10.js";import{e as O}from"./util.3738f994.js";import"./utils.5547bb95.js";import"./Utils.c545520e.js";import"./Texture.cbe42c09.js";import"./MaterialKey.40c8cf0d.js";import"./LayerView.9226b744.js";import"./schemaUtils.3945fef4.js";import"./visualVariablesUtils.6b3b0e76.js";import"./createSymbolSchema.b0611ecb.js";import"./CIMSymbolHelper.2581653a.js";import"./BidiEngine.ec67919b.js";import"./ExpandedCIM.25ecb4b1.js";import"./quantizationUtils.3e30225a.js";import"./MD5.97b39efc.js";import"./floorFilterUtils.69500d62.js";import"./popupUtils.b4db03f4.js";import"./RefreshableLayerView.179a9c75.js";function m(e,t){if(c(e)&&c(t))return null;const r={};return d(t)&&(r.geometry=t.toJSON()),d(e)&&(r.where=e),r}let s=class extends v{constructor(){super(...arguments),this._enabledDataReceived=!1,this.errorString=null,this.connectionStatus="disconnected"}initialize(){this.handles.add([l(()=>{var e;return(e=this.layer)==null?void 0:e.purgeOptions},()=>this._update()),l(()=>this.suspended,e=>{e?this._proxy.pauseStream():this._proxy.resumeStream()})])}get connectionError(){if(this.errorString)return new p("stream-controller",this.errorString)}on(e,t){e==="data-received"&&(this._enabledDataReceived=!0,this._proxy.enableEvent("data-received",!0));const r=super.on(e,t),i=this;return{remove(){r.remove(),e==="data-received"&&(i._proxy.closed||i.hasEventListener("data-received")||i._proxy.enableEvent("data-received",!1))}}}queryLatestObservations(e,t){if(!(this.layer.timeInfo.endField||this.layer.timeInfo.startField))throw new p("streamlayer-no-timeField","queryLatestObservation can only be used with services that define a TrackIdField");return this._proxy.queryLatestObservations(this._cleanUpQuery(e),t).then(r=>{const i=f.fromJSON(r);return i.features.forEach(n=>{n.layer=this.layer,n.sourceLayer=this.layer}),i})}detach(){super.detach(),this.connectionStatus="disconnected"}_createClientOptions(){return{...super._createClientOptions(),setProperty:e=>{this.set(e.propertyName,e.value)}}}_createTileRendererHash(e){const t=`${JSON.stringify(this.layer.purgeOptions)}.${JSON.stringify(m(this.layer.definitionExpression,this.layer.geometryDefinition))})`;return super._createTileRendererHash(e)+t}async _createServiceOptions(){const e=this.layer,{objectIdField:t}=e,r=e.fields.map(u=>u.toJSON()),i=O(e.geometryType),n=e.timeInfo&&e.timeInfo.toJSON()||null,y=e.spatialReference?e.spatialReference.toJSON():null;return{type:"stream",fields:r,geometryType:i,objectIdField:t,timeInfo:n,source:this.layer.parsedUrl,serviceFilter:m(this.layer.definitionExpression,this.layer.geometryDefinition),purgeOptions:this.layer.purgeOptions.toJSON(),enableDataReceived:this._enabledDataReceived,spatialReference:y,maxReconnectionAttempts:this.layer.maxReconnectionAttempts,maxReconnectionInterval:this.layer.maxReconnectionInterval,updateInterval:this.layer.updateInterval,customParameters:e.customParameters}}};a([o()],s.prototype,"errorString",void 0),a([o({readOnly:!0})],s.prototype,"connectionError",null),a([o()],s.prototype,"connectionStatus",void 0),s=a([h("esri.views.2d.layers.StreamLayerView2D")],s);const j=s;export{j as default};