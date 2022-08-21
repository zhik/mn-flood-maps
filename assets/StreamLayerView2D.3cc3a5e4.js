import{aH as a,aI as o,aJ as h,aw as l,k as p,eP as f,c,r as d}from"./index.d0d680cc.js";import v from"./FeatureLayerView2D.a68ec4a7.js";import{e as O}from"./util.026704c2.js";import"./utils.d804b968.js";import"./Utils.7e1a367f.js";import"./Texture.76980db5.js";import"./MaterialKey.74118aa0.js";import"./LayerView.7dd901b7.js";import"./schemaUtils.8942f02f.js";import"./visualVariablesUtils.1b1486ea.js";import"./createSymbolSchema.a81d0ae8.js";import"./CIMSymbolHelper.ff7ab4cd.js";import"./BidiEngine.ec67919b.js";import"./ExpandedCIM.40bd8128.js";import"./quantizationUtils.20d61d2b.js";import"./MD5.97b39efc.js";import"./floorFilterUtils.69500d62.js";import"./popupUtils.0365c3a1.js";import"./RefreshableLayerView.4e40d6dd.js";function m(e,t){if(c(e)&&c(t))return null;const r={};return d(t)&&(r.geometry=t.toJSON()),d(e)&&(r.where=e),r}let s=class extends v{constructor(){super(...arguments),this._enabledDataReceived=!1,this.errorString=null,this.connectionStatus="disconnected"}initialize(){this.handles.add([l(()=>{var e;return(e=this.layer)==null?void 0:e.purgeOptions},()=>this._update()),l(()=>this.suspended,e=>{e?this._proxy.pauseStream():this._proxy.resumeStream()})])}get connectionError(){if(this.errorString)return new p("stream-controller",this.errorString)}on(e,t){e==="data-received"&&(this._enabledDataReceived=!0,this._proxy.enableEvent("data-received",!0));const r=super.on(e,t),i=this;return{remove(){r.remove(),e==="data-received"&&(i._proxy.closed||i.hasEventListener("data-received")||i._proxy.enableEvent("data-received",!1))}}}queryLatestObservations(e,t){if(!(this.layer.timeInfo.endField||this.layer.timeInfo.startField))throw new p("streamlayer-no-timeField","queryLatestObservation can only be used with services that define a TrackIdField");return this._proxy.queryLatestObservations(this._cleanUpQuery(e),t).then(r=>{const i=f.fromJSON(r);return i.features.forEach(n=>{n.layer=this.layer,n.sourceLayer=this.layer}),i})}detach(){super.detach(),this.connectionStatus="disconnected"}_createClientOptions(){return{...super._createClientOptions(),setProperty:e=>{this.set(e.propertyName,e.value)}}}_createTileRendererHash(e){const t=`${JSON.stringify(this.layer.purgeOptions)}.${JSON.stringify(m(this.layer.definitionExpression,this.layer.geometryDefinition))})`;return super._createTileRendererHash(e)+t}async _createServiceOptions(){const e=this.layer,{objectIdField:t}=e,r=e.fields.map(u=>u.toJSON()),i=O(e.geometryType),n=e.timeInfo&&e.timeInfo.toJSON()||null,y=e.spatialReference?e.spatialReference.toJSON():null;return{type:"stream",fields:r,geometryType:i,objectIdField:t,timeInfo:n,source:this.layer.parsedUrl,serviceFilter:m(this.layer.definitionExpression,this.layer.geometryDefinition),purgeOptions:this.layer.purgeOptions.toJSON(),enableDataReceived:this._enabledDataReceived,spatialReference:y,maxReconnectionAttempts:this.layer.maxReconnectionAttempts,maxReconnectionInterval:this.layer.maxReconnectionInterval,updateInterval:this.layer.updateInterval,customParameters:e.customParameters}}};a([o()],s.prototype,"errorString",void 0),a([o({readOnly:!0})],s.prototype,"connectionError",null),a([o()],s.prototype,"connectionStatus",void 0),s=a([h("esri.views.2d.layers.StreamLayerView2D")],s);const j=s;export{j as default};