import{r as N,b8 as D,fk as B,dg as Z,aH as a,aI as p,fl as H,di as z,ek as q,bt as W,fm as K,aJ as j,e3 as J,fn as X,et as G,fo as Y,dc as ee,fp as te,fb as re,fq as ie,fr as se,fs as ae,q as oe,eA as ne,k as _,c as pe,j as le,ft as ue,e4 as me,eF as ye,s as de,eZ as he,J as ce,aw as V}from"./index.d0d680cc.js";import{t as fe}from"./BitmapContainer.98ad1b6d.js";import{f as ge,u as we}from"./LayerView.7dd901b7.js";import{a as ve}from"./BaseGraphicContainer.9bd3de6d.js";import{n as be}from"./HighlightGraphicContainer.654f767d.js";import{S as xe}from"./ExportStrategy.ca4c29db.js";import{c as $e}from"./ExportImageParameters.d632e4c3.js";import{n as U}from"./floorFilterUtils.69500d62.js";import{s as A,a as Ie}from"./drapedUtils.a96c26bb.js";import{i as Pe}from"./sublayerUtils.1bd2b95e.js";import{d as Se,s as Ee}from"./popupUtils.0365c3a1.js";import{i as Ne}from"./RefreshableLayerView.4e40d6dd.js";import"./WGLContainer.89287e6d.js";import"./pixelUtils.b9d87369.js";import"./utils.d804b968.js";import"./Utils.7e1a367f.js";import"./Texture.76980db5.js";import"./MaterialKey.74118aa0.js";import"./VertexArrayObject.5f0a4213.js";import"./ProgramTemplate.dc35262b.js";import"./config.40d47db8.js";import"./GeometryUtils.8166011b.js";import"./earcut.d30cbec0.js";import"./CIMSymbolHelper.ff7ab4cd.js";import"./BidiEngine.ec67919b.js";import"./normalizeUtilsSync.28304ef6.js";import"./projectionSupport.8920ec1d.js";import"./json.d1a0fa35.js";import"./FeatureContainer.d127b3e8.js";import"./TileContainer.fa263ca3.js";import"./visualVariablesUtils.8a5bfbb0.js";import"./visualVariablesUtils.1b1486ea.js";import"./Matcher.0b8e29a1.js";import"./tileUtils.898e6388.js";import"./TileClipper.3ed66c51.js";import"./ExpandedCIM.40bd8128.js";import"./quantizationUtils.20d61d2b.js";import"./devEnvironmentUtils.8c6e6b72.js";import"./schemaUtils.8942f02f.js";import"./createSymbolSchema.a81d0ae8.js";import"./MD5.97b39efc.js";import"./util.026704c2.js";import"./ComputedAttributeStorage.1aafcf51.js";import"./centroid.ecf46765.js";import"./vec3f32.8d37ecf5.js";import"./Bitmap.afd1c346.js";const M=t=>t.spatialReference.wkid||JSON.stringify(t.spatialReference);function Oe(t,e){const{dpi:r,gdbVersion:s,geometry:i,geometryPrecision:n,height:m,layerOption:l,mapExtent:o,maxAllowableOffset:h,returnFieldName:y,returnGeometry:c,returnUnformattedValues:g,returnZ:P,spatialReference:$,timeExtent:I,tolerance:u,width:x}=t.toJSON(),{dynamicLayers:w,layerDefs:f,layerIds:v}=je(t),F=e&&N(e.geometry)?e.geometry:null,b={geometryPrecision:n,maxAllowableOffset:h,returnFieldName:y,returnGeometry:c,returnUnformattedValues:g,returnZ:P,tolerance:u},E=F&&F.toJSON()||i;if(b.imageDisplay=`${x},${m},${r}`,s&&(b.gdbVersion=s),E&&(delete E.spatialReference,b.geometry=JSON.stringify(E),b.geometryType=D(E)),$?b.sr=$.wkid||JSON.stringify($):E&&E.spatialReference?b.sr=M(E):o&&o.spatialReference&&(b.sr=M(o)),b.time=I?[I.start,I.end].join(","):null,o){const{xmin:L,ymin:k,xmax:Q,ymax:T}=o;b.mapExtent=`${L},${k},${Q},${T}`}return f&&(b.layerDefs=f),w&&!f&&(b.dynamicLayers=w),b.layers=l==="popup"?"visible":l,v&&!w&&(b.layers+=`:${v.join(",")}`),b}function je(t){var $,I;const{mapExtent:e,floors:r,width:s,sublayers:i,layerIds:n,layerOption:m,gdbVersion:l}=t,o=(I=($=i==null?void 0:i.find(u=>u.layer!=null))==null?void 0:$.layer)==null?void 0:I.serviceSublayers,h=m==="popup",y={},c=B({extent:e,width:s,spatialReference:e==null?void 0:e.spatialReference}),g=[],P=u=>{const x=c===0,w=u.minScale===0||c<=u.minScale,f=u.maxScale===0||c>=u.maxScale;if(u.visible&&(x||w&&f))if(u.sublayers)u.sublayers.forEach(P);else{if((n==null?void 0:n.includes(u.id))===!1||h&&(!u.popupTemplate||!u.popupEnabled))return;g.unshift(u)}};if(i==null||i.forEach(P),i&&!g.length)y.layerIds=[];else{const u=Pe(g,o,l),x=g.map(w=>{const f=U(r,w);return w.toExportImageJSON(f)});if(u)y.dynamicLayers=JSON.stringify(x);else{if(i){let f=g.map(({id:v})=>v);n&&(f=f.filter(v=>n.includes(v))),y.layerIds=f}else n!=null&&n.length&&(y.layerIds=n);const w=Fe(r,g);if(N(w)&&w.length){const f={};for(const v of w)v.definitionExpression&&(f[v.id]=v.definitionExpression);Object.keys(f).length&&(y.layerDefs=JSON.stringify(f))}}}return y}function Fe(t,e){const r=!!(t!=null&&t.length),s=e.filter(i=>i.definitionExpression!=null||r&&i.floorInfo!=null);return s.length?s.map(i=>{const n=U(t,i),m=Z(n,i.definitionExpression);return{id:i.id,definitionExpression:m}}):null}var R;let d=R=class extends J{constructor(t){super(t),this.dpi=96,this.floors=null,this.gdbVersion=null,this.geometry=null,this.geometryPrecision=null,this.height=400,this.layerIds=null,this.layerOption="top",this.mapExtent=null,this.maxAllowableOffset=null,this.returnFieldName=!0,this.returnGeometry=!1,this.returnM=!1,this.returnUnformattedValues=!0,this.returnZ=!1,this.spatialReference=null,this.sublayers=null,this.timeExtent=null,this.tolerance=null,this.width=400}static from(t){return X(R,t)}};a([p({type:Number,json:{write:!0}})],d.prototype,"dpi",void 0),a([p()],d.prototype,"floors",void 0),a([p({type:String,json:{write:!0}})],d.prototype,"gdbVersion",void 0),a([p({types:H,json:{read:z,write:!0}})],d.prototype,"geometry",void 0),a([p({type:Number,json:{write:!0}})],d.prototype,"geometryPrecision",void 0),a([p({type:Number,json:{write:!0}})],d.prototype,"height",void 0),a([p({type:[Number],json:{write:!0}})],d.prototype,"layerIds",void 0),a([p({type:["top","visible","all","popup"],json:{write:!0}})],d.prototype,"layerOption",void 0),a([p({type:q,json:{write:!0}})],d.prototype,"mapExtent",void 0),a([p({type:Number,json:{write:!0}})],d.prototype,"maxAllowableOffset",void 0),a([p({type:Boolean,json:{write:!0}})],d.prototype,"returnFieldName",void 0),a([p({type:Boolean,json:{write:!0}})],d.prototype,"returnGeometry",void 0),a([p({type:Boolean,json:{write:!0}})],d.prototype,"returnM",void 0),a([p({type:Boolean,json:{write:!0}})],d.prototype,"returnUnformattedValues",void 0),a([p({type:Boolean,json:{write:!0}})],d.prototype,"returnZ",void 0),a([p({type:W,json:{write:!0}})],d.prototype,"spatialReference",void 0),a([p()],d.prototype,"sublayers",void 0),a([p({type:K,json:{write:!0}})],d.prototype,"timeExtent",void 0),a([p({type:Number,json:{write:!0}})],d.prototype,"tolerance",void 0),a([p({type:Number,json:{write:!0}})],d.prototype,"width",void 0),d=R=a([j("esri.rest.support.IdentifyParameters")],d);const C=d;let S=class extends J{constructor(t){super(t),this.displayFieldName=null,this.feature=null,this.layerId=null,this.layerName=null}readFeature(t,e){return G.fromJSON({attributes:{...e.attributes},geometry:{...e.geometry}})}writeFeature(t,e){if(!t)return;const{attributes:r,geometry:s}=t;r&&(e.attributes={...r}),N(s)&&(e.geometry=s.toJSON(),e.geometryType=te.toJSON(s.type))}};a([p({type:String,json:{write:!0}})],S.prototype,"displayFieldName",void 0),a([p({type:G})],S.prototype,"feature",void 0),a([Y("feature",["attributes","geometry"])],S.prototype,"readFeature",null),a([ee("feature")],S.prototype,"writeFeature",null),a([p({type:Number,json:{write:!0}})],S.prototype,"layerId",void 0),a([p({type:String,json:{write:!0}})],S.prototype,"layerName",void 0),S=a([j("esri.rest.support.IdentifyResult")],S);const Re=S;async function Ue(t,e,r){const s=(e=Ve(e)).geometry?[e.geometry]:[],i=re(t);return i.path+="/identify",ie(s).then(n=>{const m=Oe(e,{geometry:n&&n[0]}),l=se({...i.query,f:"json",...m}),o=ae(l,r);return oe(i.path,o).then(_e).then(h=>Ae(h,e.sublayers))})}function _e(t){const e=t.data;e.results=e.results||[];const r={results:[]};return r.results=e.results.map(s=>Re.fromJSON(s)),r}function Ve(t){return t=C.from(t)}function Ae(t,e){if(!(e!=null&&e.length))return t;const r=new Map;function s(i){r.set(i.id,i),i.sublayers&&i.sublayers.forEach(s)}e.forEach(s);for(const i of t.results)i.feature.sourceLayer=r.get(i.layerId);return t}const Me=t=>{let e=class extends t{initialize(){this.exportImageParameters=new $e({layer:this.layer})}destroy(){this.exportImageParameters.destroy(),this.exportImageParameters=null}get exportImageVersion(){var r;return(r=this.exportImageParameters)==null||r.commitProperty("version"),this.commitProperty("timeExtent"),(this._get("exportImageVersion")||0)+1}async fetchPopupFeatures(r,s){var m,l,o,h,y,c;const{layer:i}=this;if(!r)throw new _("mapimagelayer:fetchPopupFeatures","Nothing to fetch without area",{layer:i});const n=(o=(l=(m=this.layer.capabilities)==null?void 0:m.operations)==null?void 0:l.supportsQuery)!=null?o:!0;if(!(((c=(y=(h=this.layer.capabilities)==null?void 0:h.operations)==null?void 0:y.supportsIdentify)!=null?c:!0)&&this.layer.version>=10.5)&&!n)throw new _("mapimagelayer:fetchPopupFeatures-not-supported","query operation is disabled for this service",{layer:i});return n?this._fetchPopupFeaturesUsingQueries(r,s):this._fetchPopupFeaturesUsingIdentify(r,s)}canResume(){var r;return!!super.canResume()&&!((r=this.timeExtent)!=null&&r.isEmpty)}async _fetchPopupFeaturesUsingIdentify(r,s){const i=await this._createIdentifyParameters(r,s);if(pe(i))return[];const{results:n}=await Ue(this.layer.parsedUrl,i);return n.map(m=>m.feature)}async _createIdentifyParameters(r,s){var I,u;const{floors:i,spatialReference:n,scale:m}=this.view,l=N(s)?s.event:null,o=await this._collectPopupProviders(this.layer.sublayers,m,s);if(!o.length)return null;await Promise.all(o.map(({sublayer:x})=>x.load().catch(()=>{})));const h=Math.min(le("mapimagelayer-popup-identify-max-tolerance"),this.layer.allSublayers.reduce((x,w)=>w.renderer?A({renderer:w.renderer,event:l}):x,2)),y=this.createFetchPopupFeaturesQueryGeometry(r,h),c=ue(m,n),g=Math.round(y.width/c),P=new q({xmin:y.center.x-c*g,ymin:y.center.y-c*g,xmax:y.center.x+c*g,ymax:y.center.y+c*g,spatialReference:y.spatialReference}),$=((u=(I=this.layer.capabilities)==null?void 0:I.operations)==null?void 0:u.supportsQuery)===!1||await new Promise(x=>{let w=!1;Promise.all(o.map(async({popupTemplate:f})=>{if(f){const v=await this._loadArcadeModules(f);if(w)return;(v==null?void 0:v.arcadeUtils.hasGeometryOperations(f))&&(w=!0,x(!0))}})).finally(()=>x(!1))});return new C({floors:i,gdbVersion:this.layer.gdbVersion,geometry:r,height:g,layerOption:"popup",mapExtent:P,maxAllowableOffset:$?0:c,returnGeometry:!0,spatialReference:n,sublayers:this.layer.sublayers,timeExtent:this.timeExtent,tolerance:h,width:g})}async _fetchPopupFeaturesUsingQueries(r,s){const i=await this._collectPopupProviders(this.layer.sublayers,this.view.scale,s),n=N(s)?s.event:null,m=i.map(async({sublayer:l,popupTemplate:o})=>{var P,$;await l.load().catch(()=>{});const h=l.createQuery(),y=A({renderer:l.renderer,event:n}),c=this.createFetchPopupFeaturesQueryGeometry(r,y);if(h.geometry=c,h.outFields=await Se(l,o),"floors"in this.view){const I=($=(P=this.view)==null?void 0:P.floors)==null?void 0:$.clone(),u=U(I,l);N(u)&&(h.where=h.where?`(${h.where}) AND (${u})`:u)}const g=await this._loadArcadeModules(o);return g&&g.arcadeUtils.hasGeometryOperations(o)||(h.maxAllowableOffset=c.width/y),(await l.queryFeatures(h)).features});return(await me(m)).reduce((l,o)=>o.value?[...l,...o.value]:l,[]).filter(l=>l!=null)}async _collectPopupProviders(r,s,i){const n=[],m=async o=>{const h=o.minScale===0||s<=o.minScale,y=o.maxScale===0||s>=o.maxScale;if(o.visible&&h&&y){if(o.sublayers)o.sublayers.forEach(m);else if(o.popupEnabled){const c=Ee(o,{...i,defaultPopupTemplateEnabled:!1});N(c)&&n.unshift({sublayer:o,popupTemplate:c})}}},l=r.toArray().reverse().map(m);return await Promise.all(l),n}_loadArcadeModules(r){var s;if(((s=r.expressionInfos)==null?void 0:s.length)||Array.isArray(r.content)&&r.content.some(i=>i.type==="expression"))return ye()}};return a([p()],e.prototype,"exportImageParameters",void 0),a([p({readOnly:!0})],e.prototype,"exportImageVersion",null),a([p()],e.prototype,"layer",void 0),a([p()],e.prototype,"suspended",void 0),a([p(ne)],e.prototype,"timeExtent",void 0),e=a([j("esri.views.layers.MapImageLayerView")],e),e},qe=de.getLogger("esri.views.2d.layers.MapImageLayerView2D");let O=class extends Me(Ne(ge(we))){constructor(){super(...arguments),this._highlightGraphics=new he}update(t){this.strategy.update(t).catch(e=>{ce(e)||qe.error(e)})}attach(){const{imageMaxWidth:t,imageMaxHeight:e,version:r}=this.layer,s=r>=10.3,i=r>=10;this._bitmapContainer=new fe,this.container.addChild(this._bitmapContainer);const n=new ve({view:this.view,graphics:this._highlightGraphics,requestUpdateCallback:()=>this.requestUpdate(),container:new be(this.view.featuresTilingScheme)});this.container.addChild(n.container),this.strategy=new xe({container:this._bitmapContainer,fetchSource:this.fetchImage.bind(this),requestUpdate:this.requestUpdate.bind(this),imageMaxWidth:t,imageMaxHeight:e,imageRotationSupported:s,imageNormalizationSupported:i,hidpi:!0}),this.handles.add(V(()=>this.exportImageVersion,()=>this.requestUpdate()),"exportImageVersion"),this.handles.add(V(()=>{var m;return(m=this.view)==null?void 0:m.floors},()=>this.requestUpdate()),"view.floors"),this.requestUpdate()}detach(){this.handles.remove("exportImageVersion"),this.handles.remove("view.floors"),this.strategy.destroy(),this.container.removeAllChildren(),this._bitmapContainer.removeAllChildren()}moveStart(){}viewChange(){}moveEnd(){this.requestUpdate()}highlight(t,e){return this._highlightGraphics.add(t),{remove:()=>{this._highlightGraphics.remove(t)}}}supportsSpatialReference(t){return this.layer.serviceSupportsSpatialReference(t)}createFetchPopupFeaturesQueryGeometry(t,e){return Ie(t,e,this.view)}async doRefresh(){this.requestUpdate()}isUpdating(){return this.strategy.updating||this.updateRequested}fetchImage(t,e,r,s){return this.layer.fetchImage(t,e,r,{timeExtent:this.timeExtent,floors:this.view.floors,...s})}};a([p()],O.prototype,"strategy",void 0),a([p()],O.prototype,"updating",void 0),O=a([j("esri.views.2d.layers.MapImageLayerView2D")],O);const Ft=O;export{Ft as default};