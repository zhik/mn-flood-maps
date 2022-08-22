import{aH as s,aI as h,eA as F,aJ as S,k as x,s as V,J as E,aw as R,ek as b}from"./index.69e87a89.js";import{t as q}from"./BitmapContainer.c2de0c36.js";import{f as U,u as W}from"./LayerView.dfaa9a8b.js";import{S as $}from"./ExportStrategy.0ad96f85.js";import{i as L}from"./RefreshableLayerView.fc313b66.js";import{l as H}from"./ExportWMSImageParameters.a371a3d7.js";import"./WGLContainer.2da8b275.js";import"./pixelUtils.bc91c840.js";import"./utils.9935d283.js";import"./Utils.ed1865ad.js";import"./Texture.81d18d4f.js";import"./MaterialKey.5b405647.js";import"./VertexArrayObject.9606db33.js";import"./ProgramTemplate.9c4d59e3.js";import"./config.40d47db8.js";import"./GeometryUtils.8166011b.js";import"./earcut.d30cbec0.js";import"./Bitmap.ea2d5713.js";const j=t=>{let e=class extends t{initialize(){this.exportImageParameters=new H({layer:this.layer})}destroy(){this.exportImageParameters.destroy(),this.exportImageParameters=null}get exportImageVersion(){var r;return(r=this.exportImageParameters)==null||r.commitProperty("version"),this.commitProperty("timeExtent"),(this._get("exportImageVersion")||0)+1}fetchPopupFeatures(r){const{layer:i}=this;if(!r)return Promise.reject(new x("wmslayerview:fetchPopupFeatures","Nothing to fetch without area",{layer:i}));const{popupEnabled:n}=i;if(!n)return Promise.reject(new x("wmslayerview:fetchPopupFeatures","popupEnabled should be true",{popupEnabled:n}));const u=this.createFetchPopupFeaturesQuery(r);if(!u)return Promise.resolve([]);const{extent:a,width:o,height:p,x:d,y:l}=u;if(!(a&&o&&p))throw new x("wmslayerview:fetchPopupFeatures","WMSLayer does not support fetching features.",{extent:a,width:o,height:p});const c=i.fetchFeatureInfo(a,o,p,d,l);return Promise.resolve(c?[c]:[])}};return s([h()],e.prototype,"exportImageParameters",void 0),s([h({readOnly:!0})],e.prototype,"exportImageVersion",null),s([h()],e.prototype,"layer",void 0),s([h(F)],e.prototype,"timeExtent",void 0),e=s([S("esri.layers.mixins.WMSLayerView")],e),e},k=V.getLogger("esri.views.2d.layers.WMSLayerView2D");let m=class extends j(L(U(W))){constructor(){super(...arguments),this.container=new q}supportsSpatialReference(t){return this.layer.serviceSupportsSpatialReference(t)}update(t){this.strategy.update(t).catch(e=>{E(e)||k.error(e)})}attach(){const{layer:t,container:e}=this,{imageMaxHeight:r,imageMaxWidth:i}=t;this.strategy=new $({container:e,fetchSource:this.fetchImage.bind(this),requestUpdate:this.requestUpdate.bind(this),imageMaxHeight:r,imageMaxWidth:i,imageRotationSupported:!1,imageNormalizationSupported:!1,hidpi:!1}),this.handles.add(R(()=>this.exportImageVersion,()=>this.requestUpdate()),"exportImageVersion")}detach(){this.handles.remove("exportImageVersion"),this.strategy.destroy(),this.strategy=null,this.container.removeAllChildren()}moveStart(){}viewChange(){}moveEnd(){this.requestUpdate()}createFetchPopupFeaturesQuery(t){const{view:e,container:r}=this,{x:i,y:n}=t,{spatialReference:u}=e;let a=null,o=0,p=0;if(r.children.some(M=>{const{width:f,height:w,resolution:v,x:y,y:g}=M,P=y+v*f,I=g-v*w;return i>=y&&i<=P&&n<=g&&n>=I&&(a=new b({xmin:y,ymin:I,xmax:P,ymax:g,spatialReference:u}),o=f,p=w,!0)}),!a)return null;const d=a.width/o,l=Math.round((i-a.xmin)/d),c=Math.round((a.ymax-n)/d);return{extent:a,width:o,height:p,x:l,y:c}}async doRefresh(){this.requestUpdate()}isUpdating(){return this.strategy.updating||this.updateRequested}fetchImage(t,e,r,i){return this.layer.fetchImage(t,e,r,{timeExtent:this.timeExtent,...i})}};s([h()],m.prototype,"strategy",void 0),s([h()],m.prototype,"updating",void 0),m=s([S("esri.views.2d.layers.WMSLayerView2D")],m);const re=m;export{re as default};