import{gn as B,k as b,c as te,cy as re,cz as H,r as Y,go as U,b1 as oe,gp as le,gq as X,bb as ue,gr as ce,eF as de}from"./index.b82fad90.js";import{s as k}from"./quantizationUtils.504677c0.js";import{WhereClause as he}from"./WhereClause.443cc7a7.js";import{T as me,s as fe,m as J,c as W,V as ge,g as pe,h as ye,y as xe,D as Fe,z as Ie,f as _e,d as Ve}from"./utils.b988e9ba.js";import{g as K}from"./projectionSupport.179b2c07.js";import{x as $,J as G,O as ee}from"./utils.685193b6.js";class Te{constructor(t,e){this._cache=new B(t),this._invalidCache=new B(e)}get(t,e){const s=`${e.uid}:${t}`,n=this._cache.get(s);if(n)return n;if(this._invalidCache.get(s)!==void 0)return null;try{const i=he.create(t,e);return this._cache.put(s,i),i}catch{return this._invalidCache.put(s,null),null}}}const O=new Te(50,500),A="feature-store:unsupported-query",se=" as ",ve=new Set(["esriFieldTypeOID","esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble","esriFieldTypeLong","esriFieldTypeDate"]);function Ne(c,t){if(!t)return!0;const e=O.get(t,c);if(!e)throw new b(A,"invalid SQL expression",{where:t});if(!e.isStandardized)throw new b(A,"where clause is not standard",{where:t});return j(c,e.fieldNames,"where clause contains missing fields"),!0}function qe(c,t,e){if(!t)return!0;const s=O.get(t,c);if(!s)throw new b(A,"invalid SQL expression",{having:t});if(!s.isAggregate)throw new b(A,"having does not contain a valid aggregate function",{having:t});const n=s.fieldNames;if(j(c,n,"having contains missing fields"),!s.getExpressions().every(i=>{const{aggregateType:a,field:r}=i,o=c.has(r)&&c.get(r).name;return e.some(l=>{const{onStatisticField:u,statisticType:m}=l;return(c.has(u)&&c.get(u).name)===o&&m.toLowerCase().trim()===a})}))throw new b(A,"expressions in having should also exist in outStatistics",{having:t});return!0}function R(c,t){return c?O.get(c,t):null}function j(c,t,e,s=!0){const n=[];for(const i of t)if(i!=="*"&&!c.has(i))if(s){const a=ie(i);try{const r=R(a,c);if(!r)throw new b(A,"invalid SQL expression",{where:a});if(!r.isStandardized)throw new b(A,"expression is not standard",{clause:r});j(c,r.fieldNames,"expression contains missing fields")}catch(r){const o=r&&r.details;if(o&&(o.clause||o.where))throw r;o&&o.missingFields?n.push(...o.missingFields):n.push(i)}}else n.push(i);if(n.length)throw new b(A,e,{missingFields:n})}function ie(c){return c.split(se)[0]}function ze(c){return c.split(se)[1]}function Me(c,t){const e=t.get(c);return!!e&&!ve.has(e.type)}class M{constructor(t,e,s){this._fieldDataCache=new Map,this._returnDistinctMap=new Map,this.returnDistinctValues=t.returnDistinctValues,this.fieldsIndex=s,this.featureAdapter=e;const n=t.outFields;if(n&&!n.includes("*")){this.outFields=n;let i=0;for(const a of n){const r=ie(a),o=this.fieldsIndex.get(r),l=o?null:R(r,s),u=o?o.name:ze(a)||"FIELD_EXP_"+i++;this._fieldDataCache.set(a,{alias:u,clause:l})}}}countDistinctValues(t){return this.returnDistinctValues?(t.forEach(e=>this.getAttributes(e)),this._returnDistinctMap.size):t.length}getAttributes(t){const e=this._processAttributesForOutFields(t);return this._processAttributesForDistinctValues(e)}getFieldValue(t,e,s){const n=s?s.name:e;let i=null;return this._fieldDataCache.has(n)?i=this._fieldDataCache.get(n).clause:s||(i=R(e,this.fieldsIndex),this._fieldDataCache.set(n,{alias:n,clause:i})),s?this.featureAdapter.getAttribute(t,n):i.calculateValue(t,this.featureAdapter)}getNormalizedValue(t,e){const s=e.normalizationType,n=e.normalizationTotal;let i=this.getFieldValue(t,e.field,e.fieldInfo);if(s&&Number.isFinite(i)){const a=this.getFieldValue(t,e.normalizationField,e.normalizationFieldInfo);i=me(i,s,a,n)}return i}getExpressionValue(t,e,s,n){const i={attributes:this.featureAdapter.getAttributes(t),layer:{fields:this.fieldsIndex.fields}},a=n.createExecContext(i,s);return n.executeFunction(e,a)}getExpressionValues(t,e,s,n){const i={fields:this.fieldsIndex.fields};return t.map(a=>{const r={attributes:this.featureAdapter.getAttributes(a),layer:i},o=n.createExecContext(r,s);return n.executeFunction(e,o)})}validateItem(t,e){return this._fieldDataCache.has(e)||this._fieldDataCache.set(e,{alias:e,clause:R(e,this.fieldsIndex)}),this._fieldDataCache.get(e).clause.testFeature(t,this.featureAdapter)}validateItems(t,e){return this._fieldDataCache.has(e)||this._fieldDataCache.set(e,{alias:e,clause:R(e,this.fieldsIndex)}),this._fieldDataCache.get(e).clause.testSet(t,this.featureAdapter)}_processAttributesForOutFields(t){const e=this.outFields;if(!e||!e.length)return this.featureAdapter.getAttributes(t);const s={};for(const n of e){const{alias:i,clause:a}=this._fieldDataCache.get(n);s[i]=a?a.calculateValue(t,this.featureAdapter):this.featureAdapter.getAttribute(t,i)}return s}_processAttributesForDistinctValues(t){if(te(t)||!this.returnDistinctValues)return t;const e=this.outFields,s=[];if(e)for(const a of e){const{alias:r}=this._fieldDataCache.get(a);s.push(t[r])}else for(const a in t)s.push(t[a]);const n=`${(e||["*"]).join(",")}=${s.join(",")}`;let i=this._returnDistinctMap.get(n)||0;return this._returnDistinctMap.set(n,++i),i>1?null:t}}class Pe{constructor(t,e,s){this.items=t,this.query=e,this.geometryType=s.geometryType,this.hasM=s.hasM,this.hasZ=s.hasZ,this.fieldsIndex=s.fieldsIndex,this.objectIdField=s.objectIdField,this.spatialReference=s.spatialReference,this.featureAdapter=s.featureAdapter}get size(){return this.items.length}createQueryResponseForCount(){const t=new M(this.query,this.featureAdapter,this.fieldsIndex);if(!this.query.outStatistics)return t.countDistinctValues(this.items);const{groupByFieldsForStatistics:e,having:s,outStatistics:n}=this.query;if(!(e==null?void 0:e.length))return 1;const a=new Map,r=new Map,o=new Set;for(const l of n){const{statisticType:u}=l,m=u!=="exceedslimit"?l.onStatisticField:void 0;if(!r.has(m)){const d=[];for(const h of e){const F=this._getAttributeValues(t,h,a);d.push(F)}r.set(m,this._calculateUniqueValues(d,t.returnDistinctValues))}const f=r.get(m);for(const d in f){const{data:h,items:F}=f[d],I=h.join(",");s&&!t.validateItems(F,s)||o.add(I)}}return o.size}async createQueryResponse(){let t;return this.query.outStatistics?t=this.query.outStatistics.some(e=>e.statisticType==="exceedslimit")?this._createExceedsLimitQueryResponse(this.query):await this._createStatisticsQueryResponse(this.query):t=this._createFeatureQueryResponse(this.query),this.query.returnQueryGeometry&&(re(this.query.outSR)&&!H(this.query.geometry.spatialReference,this.query.outSR)?t.queryGeometry=$({spatialReference:this.query.outSR,...K(this.query.geometry,this.query.geometry.spatialReference,this.query.outSR)}):t.queryGeometry=$({spatialReference:this.query.outSR,...this.query.geometry})),t}createSnappingResponse(t,e){const s=this.featureAdapter,n=Ae(this.hasZ,this.hasM),{x:i,y:a}=t.point,r=typeof t.distance=="number"?t.distance:t.distance.x,o=typeof t.distance=="number"?t.distance:t.distance.y,l={candidates:[]},u=this.geometryType==="esriGeometryPolygon",m=this._getPointCreator(t.point,this.spatialReference,e);for(const f of this.items){const d=s.getGeometry(f);if(te(d))continue;const{coords:h,lengths:F}=d;if(t.types&P.EDGE){let I=0;for(let y=0;y<F.length;y++){const _=F[y];for(let x=0;x<_;x++,I+=n){const V=h[I],p=h[I+1];if(x!==_-1){const g=h[I+n],S=h[I+n+1],{x:C,y:N}=be(i,a,V,p,g,S),T=(i-C)/r,v=(a-N)/o,w=T*T+v*v;w<=1&&l.candidates.push({type:"edge",objectId:s.getObjectId(f),distance:Math.sqrt(w),target:m(C,N),start:m(V,p),end:m(g,S)})}}}}if(t.types&P.VERTEX){const I=u?h.length-n:h.length;for(let y=0;y<I;y+=n){const _=h[y],x=h[y+1],V=(i-_)/r,p=(a-x)/o,g=V*V+p*p;g<=1&&l.candidates.push({type:"vertex",objectId:s.getObjectId(f),distance:Math.sqrt(g),target:m(_,x)})}}}return l.candidates.sort((f,d)=>f.distance-d.distance),l}_getPointCreator(t,e,s){const n=Y(s)&&!H(e,s)?i=>K(i,e,s):i=>i;return t.z!=null&&t.m!=null?(i,a)=>n({x:i,y:a,z:t.z,m:t.m}):t.z!=null?(i,a)=>n({x:i,y:a,z:t.z}):t.m!=null?(i,a)=>n({x:i,y:a,m:t.m}):(i,a)=>n({x:i,y:a})}async createSummaryStatisticsResponse(t){const{field:e,valueExpression:s,normalizationField:n,normalizationType:i,normalizationTotal:a,minValue:r,maxValue:o,scale:l}=t,u=this.fieldsIndex.isDateField(e),m=await this._getDataValues({field:e,valueExpression:s,normalizationField:n,normalizationType:i,normalizationTotal:a,scale:l}),f=fe({normalizationType:i,normalizationField:n,minValue:r,maxValue:o}),d=this.fieldsIndex.get(e),h={value:.5,fieldType:d==null?void 0:d.type},F=U(d)?J({values:m,supportsNullCount:f,percentileParams:h}):W({values:m,minValue:r,maxValue:o,useSampleStdDev:!i,supportsNullCount:f,percentileParams:h});return ge(F,u)}async createUniqueValuesResponse(t){const{field:e,valueExpression:s,domain:n,returnAllCodedValues:i,scale:a}=t,r=await this._getDataValues({field:e,valueExpression:s,scale:a}),o=pe(r);return ye(o,n,i)}async createClassBreaksResponse(t){const{field:e,valueExpression:s,normalizationField:n,normalizationType:i,normalizationTotal:a,classificationMethod:r,standardDeviationInterval:o,minValue:l,maxValue:u,numClasses:m,scale:f}=t,d=await this._getDataValues({field:e,valueExpression:s,normalizationField:n,normalizationType:i,normalizationTotal:a,scale:f}),h=xe(d,{field:e,normalizationField:n,normalizationType:i,normalizationTotal:a,classificationMethod:r,standardDeviationInterval:o,minValue:l,maxValue:u,numClasses:m});return Fe(h,r)}async createHistogramResponse(t){const{field:e,valueExpression:s,normalizationField:n,normalizationType:i,normalizationTotal:a,classificationMethod:r,standardDeviationInterval:o,minValue:l,maxValue:u,numBins:m,scale:f}=t,d=await this._getDataValues({field:e,valueExpression:s,normalizationField:n,normalizationType:i,normalizationTotal:a,scale:f});return Ie(d,{field:e,normalizationField:n,normalizationType:i,normalizationTotal:a,classificationMethod:r,standardDeviationInterval:o,minValue:l,maxValue:u,numBins:m})}_sortFeatures(t,e,s){if(t.length>1&&e&&e.length)for(const n of e.reverse()){const i=n.split(" "),a=i[0],r=this.fieldsIndex.get(a),o=i[1]&&i[1].toLowerCase()==="desc",l=_e(r==null?void 0:r.type,o);t.sort((u,m)=>{const f=s(u,a,r),d=s(m,a,r);return l(f,d)})}}_createFeatureQueryResponse(t){const e=this.items,{geometryType:s,hasM:n,hasZ:i,objectIdField:a,spatialReference:r}=this,{outFields:o,outSR:l,quantizationParameters:u,resultRecordCount:m,resultOffset:f,returnZ:d,returnM:h}=t,F=m!=null&&e.length>(f||0)+m,I=o&&(o.includes("*")?[...this.fieldsIndex.fields]:o.map(y=>this.fieldsIndex.get(y)));return{exceededTransferLimit:F,features:this._createFeatures(t,e),fields:I,geometryType:s,hasM:n&&h,hasZ:i&&d,objectIdFieldName:a,spatialReference:$(l||r),transform:u&&k(u)||null}}_createFeatures(t,e){const s=new M(t,this.featureAdapter,this.fieldsIndex),{hasM:n,hasZ:i}=this,{orderByFields:a,quantizationParameters:r,returnGeometry:o,returnCentroid:l,maxAllowableOffset:u,resultOffset:m,resultRecordCount:f,returnZ:d=!1,returnM:h=!1}=t,F=i&&d,I=n&&h;let y=[],_=0;const x=[...e];if(this._sortFeatures(x,a,(p,g,S)=>s.getFieldValue(p,g,S)),o||l){const p=k(r);if(o&&!l)for(const g of x)y[_++]={attributes:s.getAttributes(g),geometry:G(this.geometryType,this.hasZ,this.hasM,this.featureAdapter.getGeometry(g),u,p,F,I)};else if(!o&&l)for(const g of x)y[_++]={attributes:s.getAttributes(g),centroid:ee(this,this.featureAdapter.getCentroid(g,this),p)};else for(const g of x)y[_++]={attributes:s.getAttributes(g),centroid:ee(this,this.featureAdapter.getCentroid(g,this),p),geometry:G(this.geometryType,this.hasZ,this.hasM,this.featureAdapter.getGeometry(g),u,p,F,I)}}else for(const p of x){const g=s.getAttributes(p);g&&(y[_++]={attributes:g})}const V=m||0;if(f!=null){const p=V+f;y=y.slice(V,Math.min(y.length,p))}return y}_createExceedsLimitQueryResponse(t){let e=!1,s=Number.POSITIVE_INFINITY,n=Number.POSITIVE_INFINITY,i=Number.POSITIVE_INFINITY;for(const a of t.outStatistics)if(a.statisticType==="exceedslimit"){s=a.maxPointCount!=null?a.maxPointCount:Number.POSITIVE_INFINITY,n=a.maxRecordCount!=null?a.maxRecordCount:Number.POSITIVE_INFINITY,i=a.maxVertexCount!=null?a.maxVertexCount:Number.POSITIVE_INFINITY;break}if(this.geometryType==="esriGeometryPoint")e=this.items.length>s;else if(this.items.length>n)e=!0;else{const a=this.hasZ?this.hasM?4:3:this.hasM?3:2,r=this.featureAdapter;e=this.items.reduce((o,l)=>{const u=r.getGeometry(l);return o+(Y(u)&&u.coords.length||0)},0)/a>i}return{fields:[{name:"exceedslimit",type:"esriFieldTypeInteger",alias:"exceedslimit",sqlType:"sqlTypeInteger",domain:null,defaultValue:null}],features:[{attributes:{exceedslimit:Number(e)}}]}}async _createStatisticsQueryResponse(t){const e={attributes:{}},s=[],n=new Map,i=new Map,a=new Map,r=new Map,o=new M(t,this.featureAdapter,this.fieldsIndex),l=t.outStatistics,{groupByFieldsForStatistics:u,having:m,orderByFields:f}=t,d=u&&u.length,h=!!d,F=h&&u[0],I=h&&!this.fieldsIndex.get(F);for(const _ of l){const{outStatisticFieldName:x,statisticType:V}=_,p=_,g=V!=="exceedslimit"?_.onStatisticField:void 0,S=V==="percentile_disc"||V==="percentile_cont",C=V==="EnvelopeAggregate"||V==="CentroidAggregate"||V==="ConvexHullAggregate",N=h&&d===1&&(g===F||I)&&V==="count";if(h){if(!a.has(g)){const v=[];for(const w of u){const q=this._getAttributeValues(o,w,n);v.push(q)}a.set(g,this._calculateUniqueValues(v,o.returnDistinctValues))}const T=a.get(g);for(const v in T){const{count:w,data:q,items:Q,itemPositions:ae}=T[v],Z=q.join(",");if(!m||o.validateItems(Q,m)){const D=r.get(Z)||{attributes:{}};if(C){D.aggregateGeometries||(D.aggregateGeometries={});const{aggregateGeometries:z,outStatisticFieldName:E}=await this._getAggregateGeometry(p,Q);D.aggregateGeometries[E]=z}else{let z=null;if(N)z=w;else{const E=this._getAttributeValues(o,g,n),L=ae.map(ne=>E[ne]);z=S&&"statisticParameters"in p?this._getPercentileValue(p,L):this._getStatisticValue(p,L,null,o.returnDistinctValues)}D.attributes[x]=z}u.forEach((z,E)=>D.attributes[this.fieldsIndex.get(z)?z:`EXPR_${E+1}`]=q[E]),r.set(Z,D)}}}else if(C){e.aggregateGeometries||(e.aggregateGeometries={});const{aggregateGeometries:T,outStatisticFieldName:v}=await this._getAggregateGeometry(p,this.items);e.aggregateGeometries[v]=T}else{const T=this._getAttributeValues(o,g,n);e.attributes[x]=S&&"statisticParameters"in p?this._getPercentileValue(p,T):this._getStatisticValue(p,T,i,o.returnDistinctValues)}s.push({name:x,alias:x,type:"esriFieldTypeDouble"})}const y=h?Array.from(r.values()):[e];return this._sortFeatures(y,f,(_,x)=>_.attributes[x]),{fields:s,features:y}}async _getAggregateGeometry(t,e){const s=await oe(()=>import("./geometryEngineJSON.588858d2.js"),["geometryEngineJSON.588858d2.js","geometryEngineBase.cf4f989f.js","geometryEngineJSON.a34a7363.js","json.d1a0fa35.js"],import.meta.url),{statisticType:n,outStatisticFieldName:i}=t,{featureAdapter:a,spatialReference:r,geometryType:o,hasZ:l,hasM:u}=this,m=e.map(h=>G(o,l,u,a.getGeometry(h))),f=s.convexHull(r,m,!0)[0],d={aggregateGeometries:null,outStatisticFieldName:null};if(n==="EnvelopeAggregate"){const h=f?le(f):X(s.union(r,m));d.aggregateGeometries={...h,spatialReference:r},d.outStatisticFieldName=i||"extent"}else if(n==="CentroidAggregate"){const h=f?ue(f):ce(X(s.union(r,m)));d.aggregateGeometries={x:h[0],y:h[1],spatialReference:r},d.outStatisticFieldName=i||"centroid"}else n==="ConvexHullAggregate"&&(d.aggregateGeometries=f,d.outStatisticFieldName=i||"convexHull");return d}_getStatisticValue(t,e,s,n){const{onStatisticField:i,statisticType:a}=t;let r=null;return r=s!=null&&s.has(i)?s.get(i):U(this.fieldsIndex.get(i))?J({values:e,returnDistinct:n}):W({values:e,minValue:null,maxValue:null,useSampleStdDev:!0}),s&&s.set(i,r),r[a==="var"?"variance":a]}_getPercentileValue(t,e){const{onStatisticField:s,statisticParameters:n,statisticType:i}=t,{value:a,orderBy:r}=n,o=this.fieldsIndex.get(s);return Ve(e,{value:a,orderBy:r,fieldType:o==null?void 0:o.type,isDiscrete:i==="percentile_disc"})}_getAttributeValues(t,e,s){if(s.has(e))return s.get(e);const n=this.fieldsIndex.get(e),i=this.items.map(a=>t.getFieldValue(a,e,n));return s.set(e,i),i}_getAttributeNormalizedValues(t,e){return this.items.map(s=>t.getNormalizedValue(s,{field:e.field,fieldInfo:this.fieldsIndex.get(e.field),normalizationField:e.normalizationField,normalizationFieldInfo:this.fieldsIndex.get(e.normalizationField),normalizationType:e.normalizationType,normalizationTotal:e.normalizationTotal}))}async _getAttributeExpressionValues(t,e,s){const{arcadeUtils:n}=await de(),i=n.createFunction(e),a=s&&n.getViewInfo(s);return t.getExpressionValues(this.items,i,a,n)}_calculateUniqueValues(t,e){const s={},n=this.items,i=n.length;for(let a=0;a<i;a++){const r=n[a],o=[];for(const u of t)o.push(u[a]);const l=o.join(",");e?s[l]==null&&(s[l]={count:1,data:o,items:[r],itemPositions:[a]}):s[l]==null?s[l]={count:1,data:o,items:[r],itemPositions:[a]}:(s[l].count++,s[l].items.push(r),s[l].itemPositions.push(a))}return s}async _getDataValues(t){const e=new M(this.query,this.featureAdapter,this.fieldsIndex),{valueExpression:s,field:n,normalizationField:i,normalizationType:a,normalizationTotal:r,scale:o}=t,l=s?{viewingMode:"map",scale:o,spatialReference:this.query.outSR||this.spatialReference}:null;return s?this._getAttributeExpressionValues(e,s,l):this._getAttributeNormalizedValues(e,{field:n,normalizationField:i,normalizationType:a,normalizationTotal:r})}}function be(c,t,e,s,n,i){const a=n-e,r=i-s,o=a*a+r*r,l=(c-e)*a+(t-s)*r,u=Math.min(1,Math.max(0,l/o));return{x:e+a*u,y:s+r*u}}function Ae(c,t){return c?t?4:3:t?3:2}var P;(function(c){c[c.NONE=0]="NONE",c[c.EDGE=1]="EDGE",c[c.VERTEX=2]="VERTEX"})(P||(P={}));export{P as E,qe as a,j as c,Me as f,R as l,Ne as o,Pe as v};
