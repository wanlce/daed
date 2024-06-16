import{C as f}from"./codemirror.es-52e8b92d.js";import{s as L}from"./forEachState.es-b2033c2b.js";import"./codemirror.es2-5884f31a.js";import{o as h,Z as b,_ as T,a5 as d,I as j,Y as D}from"./index-5482a1c3.js";var N=Object.defineProperty,p=(i,n)=>N(i,"name",{value:n,configurable:!0});function u(i,n,t){const r=x(t,m(n.string));if(!r)return;const e=n.type!==null&&/"|\w/.test(n.string[0])?n.start:n.end;return{list:r,from:{line:i.line,ch:e},to:{line:i.line,ch:n.end}}}p(u,"hintList");function x(i,n){if(!n)return y(i,r=>!r.isDeprecated);const t=i.map(r=>({proximity:V(m(r.text),n),entry:r}));return y(y(t,r=>r.proximity<=2),r=>!r.entry.isDeprecated).sort((r,e)=>(r.entry.isDeprecated?1:0)-(e.entry.isDeprecated?1:0)||r.proximity-e.proximity||r.entry.text.length-e.entry.text.length).map(r=>r.entry)}p(x,"filterAndSortList");function y(i,n){const t=i.filter(n);return t.length===0?i:t}p(y,"filterNonEmpty");function m(i){return i.toLowerCase().replaceAll(/\W/g,"")}p(m,"normalizeText");function V(i,n){let t=v(n,i);return i.length>n.length&&(t-=i.length-n.length-1,t+=i.indexOf(n)===0?0:.5),t}p(V,"getProximity");function v(i,n){let t,r;const e=[],a=i.length,s=n.length;for(t=0;t<=a;t++)e[t]=[t];for(r=1;r<=s;r++)e[0][r]=r;for(t=1;t<=a;t++)for(r=1;r<=s;r++){const c=i[t-1]===n[r-1]?0:1;e[t][r]=Math.min(e[t-1][r]+1,e[t][r-1]+1,e[t-1][r-1]+c),t>1&&r>1&&i[t-1]===n[r-2]&&i[t-2]===n[r-1]&&(e[t][r]=Math.min(e[t][r],e[t-2][r-2]+c))}return e[a][s]}p(v,"lexicalDistance");f.registerHelper("hint","graphql-variables",(i,n)=>{const t=i.getCursor(),r=i.getTokenAt(t),e=O(t,r,n);return e!=null&&e.list&&e.list.length>0&&(e.from=f.Pos(e.from.line,e.from.ch),e.to=f.Pos(e.to.line,e.to.ch),f.signal(i,"hasCompletion",i,e,r)),e});function O(i,n,t){const r=n.state.kind==="Invalid"?n.state.prevState:n.state,{kind:e,step:a}=r;if(e==="Document"&&a===0)return u(i,n,[{text:"{"}]);const{variableToType:s}=t;if(!s)return;const c=k(s,n.state);if(e==="Document"||e==="Variable"&&a===0){const l=Object.keys(s);return u(i,n,l.map(o=>({text:`"${o}": `,type:s[o]})))}if((e==="ObjectValue"||e==="ObjectField"&&a===0)&&c.fields){const l=Object.keys(c.fields).map(o=>c.fields[o]);return u(i,n,l.map(o=>({text:`"${o.name}": `,type:o.type,description:o.description})))}if(e==="StringValue"||e==="NumberValue"||e==="BooleanValue"||e==="NullValue"||e==="ListValue"&&a===1||e==="ObjectField"&&a===2||e==="Variable"&&a===2){const l=c.type?h(c.type):void 0;if(l instanceof b)return u(i,n,[{text:"{"}]);if(l instanceof T){const o=l.getValues();return u(i,n,o.map(g=>({text:`"${g.name}"`,type:l,description:g.description})))}if(l===d)return u(i,n,[{text:"true",type:d,description:"Not false."},{text:"false",type:d,description:"Not true."}])}}p(O,"getVariablesHint");function k(i,n){const t={type:null,fields:null};return L(n,r=>{switch(r.kind){case"Variable":{t.type=i[r.name];break}case"ListValue":{const e=t.type?j(t.type):void 0;t.type=e instanceof D?e.ofType:null;break}case"ObjectValue":{const e=t.type?h(t.type):void 0;t.fields=e instanceof b?e.getFields():null;break}case"ObjectField":{const e=r.name&&t.fields?t.fields[r.name]:null;t.type=e==null?void 0:e.type;break}}}),t}p(k,"getTypeInfo");
