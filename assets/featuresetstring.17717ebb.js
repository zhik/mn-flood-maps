import{d as f}from"./arcadeUtils.bcaadecc.js";import{jA as i,k1 as d,k4 as w,ju as s,jw as m,k8 as c,mW as l,k3 as A,k6 as T,mX as b,k7 as h,mY as j,jq as g,jC as x,k2 as F,k5 as y}from"./index.b82fad90.js";function v(e){return e&&e.domain?e.domain.type==="coded-value"||e.domain.type==="codedValue"?f.convertObjectToArcadeDictionary({type:"codedValue",name:e.domain.name,dataType:y[e.field.type],codedValues:e.domain.codedValues.map(t=>({name:t.name,code:t.code}))}):f.convertObjectToArcadeDictionary({type:"range",name:e.domain.name,dataType:y[e.field.type],min:e.domain.min,max:e.domain.max}):null}function P(e){e.mode==="async"&&(e.functions.domain=function(t,r){return e.standardFunctionAsync(t,r,async function(o,u,n){if(i(n,2,3),d(n[0]))return v(w(n[0],m(n[1]),n[2]===void 0?void 0:s(n[2])));if(c(n[0]))return await n[0]._ensureLoaded(),v(l(m(n[1]),n[0],null,n[2]===void 0?void 0:s(n[2])));throw new Error("Invalid Parameter")})},e.functions.subtypes=function(t,r){return e.standardFunctionAsync(t,r,async function(o,u,n){if(i(n,1,1),d(n[0])){const a=A(n[0]);return a?f.convertObjectToArcadeDictionary(a):null}if(c(n[0])){await n[0]._ensureLoaded();const a=n[0].subtypes();return a?f.convertObjectToArcadeDictionary(a):null}throw new Error("Invalid Parameter")})},e.functions.domainname=function(t,r){return e.standardFunctionAsync(t,r,async function(o,u,n){if(i(n,2,4),d(n[0]))return T(n[0],m(n[1]),n[2],n[3]===void 0?void 0:s(n[3]));if(c(n[0])){await n[0]._ensureLoaded();const a=l(m(n[1]),n[0],null,n[3]===void 0?void 0:s(n[3]));return b(a,n[2])}throw new Error("Invalid Parameter")})},e.signatures.push({name:"domainname",min:"2",max:"4"}),e.functions.domaincode=function(t,r){return e.standardFunctionAsync(t,r,async function(o,u,n){if(i(n,2,4),d(n[0]))return h(n[0],m(n[1]),n[2],n[3]===void 0?void 0:s(n[3]));if(c(n[0])){await n[0]._ensureLoaded();const a=l(m(n[1]),n[0],null,n[3]===void 0?void 0:s(n[3]));return j(a,n[2])}throw new Error("Invalid Parameter")})},e.signatures.push({name:"domaincode",min:"2",max:"4"})),e.functions.text=function(t,r){return e.standardFunctionAsync(t,r,function(o,u,n){if(i(n,1,2),!c(n[0]))return g(n[0],n[1]);{const a=x(n[1],"");if(a==="")return n[0].castToText();if(a.toLowerCase()==="schema")return n[0].convertToText("schema",o.abortSignal);if(a.toLowerCase()==="featureset")return n[0].convertToText("featureset",o.abortSignal)}})},e.functions.gdbversion=function(t,r){return e.standardFunctionAsync(t,r,async function(o,u,n){if(i(n,1,1),d(n[0]))return n[0].gdbVersion();if(c(n[0]))return(await n[0].load()).gdbVersion;throw new Error("Invalid Parameter")})},e.functions.schema=function(t,r){return e.standardFunctionAsync(t,r,async function(o,u,n){if(i(n,1,1),c(n[0]))return await n[0].load(),f.convertObjectToArcadeDictionary(n[0].schema());if(d(n[0])){const a=F(n[0]);return a?f.convertObjectToArcadeDictionary(a):null}throw new Error("Invalid Parameter")})}}export{P as registerFunctions};