import{cZ as k,k as $,r as N,d1 as S,d2 as c,d3 as d,d4 as q,jq as w,c$ as j,d0 as U,jr as D,js as v,jt as f,ju as g,c_ as x}from"./index.d0d680cc.js";import{c as B,a as h}from"./devEnvironmentUtils.8c6e6b72.js";function W(e,t,a,l){return e.name?e.styleName&&e.styleName==="Esri2DPointSymbolsStyle"?M(e,t,l):k(e,t,l).then(o=>F(o,e.name,t,a,l)):Promise.reject(new $("symbolstyleutils:style-symbol-reference-name-missing","Missing name in style symbol reference"))}function F(e,t,a,l,o){const y=e.data,m=a&&N(a.portal)?a.portal:S.getDefault(),p={portal:m,url:c(e.baseUrl),origin:"portal-item"},n=y.items.find(r=>r.name===t);if(!n){const r=`The symbol name '${t}' could not be found`;return Promise.reject(new $("symbolstyleutils:symbol-name-not-found",r,{symbolName:t}))}let i=d(q(n,l),p),u=n.thumbnail&&n.thumbnail.href;const b=n.thumbnail&&n.thumbnail.imageData;B()&&(i=h(i),u=h(u));const O={portal:m,url:c(w(i)),origin:"portal-item"};return j(i,o).then(r=>{const P=l==="cimRef"?U(r.data):r.data,s=D(P,O);if(s&&v(s)){if(u){const E=d(u,p);s.thumbnail=new f({url:E})}else b&&(s.thumbnail=new f({url:`data:image/png;base64,${b}`}));e.styleUrl?s.styleOrigin=new g({portal:a.portal,styleUrl:e.styleUrl,name:t}):e.styleName&&(s.styleOrigin=new g({portal:a.portal,styleName:e.styleName,name:t}))}return s})}function M(e,t,a){const l=x.replace(/\{SymbolName\}/gi,e.name),o=N(t.portal)?t.portal:S.getDefault();return j(l,a).then(y=>{const m=U(y.data);return D(m,{portal:o,url:c(w(l)),origin:"portal-item"})})}export{F as fetchSymbolFromStyle,W as resolveWebStyleSymbol};
