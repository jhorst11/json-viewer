function e(e=""){return document.createTextNode(e)}function t(e,t){const[r,o]=[].concat(t);r.parentNode&&(o&&r.nextSibling!==o&&n(r.nextSibling,o),r.parentNode.replaceChild(e,r))}function n(e,t=null,n=e.parentNode){if(n)for(;e!==t;){const t=e.nextSibling;n.removeChild(e),e=t}}function r(e){let t=0;for(;e=e.previousSibling;)t++;return t}function o(e){const t=[];for(;e.parentNode;)t.unshift(r(e)),e=e.parentNode;return t}const s=Symbol();function i(e,t){return a(e)&&a(t)&&e.strings===t.strings}function a(e){return e&&e[s]}const l=/__(\d+)__/,c=/^(?:style|textarea)$/i;function d(e){const t=e.match(l);return Number(t?t[1]:-1)}const u={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};const p=[],h=[];let f=!1,b=0,g=!0;function m(e,t){let n=0;for(;t-performance.now()>0&&n<e.length;){const t=e[n++];t.task(...t.args),t.args=void 0,t.pending=!1}e.splice(0,n)}function v(e,t){e.pending=!0,1===t?p.push(e):0===t&&h.push(e),f||function e(){f=!0,requestAnimationFrame(()=>{b++;const t=performance.now()+10*Math.ceil(.02*b);m(p,t),m(h,t),p.length>0&&(h.push(...p),p.length=0),h.length>0?e():(f=!1,b=0)})}()}function y(e,t=1){const n={task:e,args:[],pending:!1,firstRun:!0};return(...r)=>{n.firstRun||!g?(n.firstRun=!1,e(...r)):(n.args=r,n.pending||v(n,t))}}class k{constructor(e,t){this.update=y(e=>{if(this.value===e)return;const{name:t,element:n}=this;"ownerSVGElement"in n?n.setAttributeNS(function(e){return u[e.split(":")[0]]}(t),t,e):t in n?n[t]=e:void 0!==e?n.setAttribute(t,e):n.hasAttribute(t)&&n.removeAttribute(t),this.value=e}),this.name=t,this.element=e}}class x{constructor(e){this.update=y(e=>{if(e===this.value)return;const{element:t,placeholder:n}=this;"object"!=typeof e&&t.nodeType===Node.TEXT_NODE?t.textContent=e:i(e,t)?t.update(e.values):Array.isArray(e)?(this.value instanceof Map||t.nodeType===Node.COMMENT_NODE||this.replaceWith(n),e=this.updateArray(e)):this.replaceWith(null==e?n:e),this.value=e}),this.element=this.placeholder=e}updateArray(e){const n=this.value instanceof Map?this.value:new Map,{element:r}=this;let o=r;const s=e.reduce((e,r,s)=>{const a=String(r.key||s);let l=n.get(a);if(l)i(l,r)?l.update(r.values):(t(r.create(),l.range),n.set(a,l=r));else{const e=r.create();o.parentNode.insertBefore(e,o.nextSibling),n.set(a,l=r)}return o.nextSibling!==l.range[0]&&function(e,t,n=t.parentNode){const[r,o]=e.range,s=t.nextSibling;let i=r;do{const e=i.nextSibling;n.insertBefore(i,s),i=e}while(i!==o);n.insertBefore(o,s)}(l,o),o=l.range[1],e.push(a),e},[]);return n.forEach((e,t,n)=>{-1===s.indexOf(t)&&(e.delete(),n.delete(t))}),n}replaceWith(n){const{element:r,value:o}=this;var s;o instanceof Map&&(o.forEach(e=>e.delete()),o.clear()),r!==n&&(this.element=n=a(n)?n:(s=n)&&s.nodeType?n:e(n),t(a(n)?n.create():n,a(r)?r.range:r))}}function C(){return NodeFilter.FILTER_ACCEPT}function j(e,t){const n=e.attributes;let r=n.length;for(;r--;){const{name:s,value:i}=n.item(r),a=d(i);-1!==a&&(e.removeAttribute(s),t[a]={type:k,name:s,nodePath:o(e)})}}function w(e,t){const n=d(e.data);-1!==n&&(t[n]={type:x,nodePath:o(e)},e.nodeValue="")}function N(t,n){(function(e){return e.match(new RegExp(l,"g"))||[]})(t.data).forEach(r=>{const s=e();(t=t.splitText(t.data.indexOf(r))).deleteData(0,r.length),t.parentNode.insertBefore(s,t),n[d(r)]={type:x,nodePath:o(s)}})}function _(e){const t=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_COMMENT,C,!1),n=[];for(;t.nextNode();){const e=t.currentNode;e.nodeType===Node.ELEMENT_NODE?(j(e,n),c.test(e.tagName)&&[].forEach.call(e.childNodes,e=>N(e,n))):w(e,n)}return n}C.acceptNode=C;const $=new WeakMap;function E(e,t){let n=$.get(e);n||$.set(e,n=function(e,t){const n=document.createElement("template");n.innerHTML=t?`<${t}>${e}</${t}>`:e;let r=n.content;if(t){const e=document.createRange();e.selectNodeContents(r.firstChild),r=e.extractContents()}return{content:r,expressions:_(r)}}(function(e){const t=new RegExp("^[^]*<([0-9a-zA-Z]+)(?:\\s*[^<\\s\\0\"'>\\/=]+(?:\\s*=\\s*(?:\"[^\"]*\"?|'[^']*'?|[^\\s'\">]*))?)*\\s*(>?)|[^]*(>)[^]*|[^]*$","i");let n,r=!1,o=e[0];for(let s=0,i=e.length;s<i-1;s++){const i=`__${s}__`,a=e[s].match(t);a[1]&&(n=a[1],r=!a[2]),(a[2]||a[3])&&(r=c.test(n)),o+=(r?i:`\x3c!--${i}--\x3e`)+e[s+1]}return o}(e),t));const r=document.importNode(n.content,!0);return{fragment:r,expressions:function(e,t){return t.map(t=>new t.type(function(e,t){for(let n=0,r=t.length;n<r;n++)e=e.childNodes[t[n]];return e}(e,t.nodePath),t.name))}(r,n.expressions)}}var S;class O{constructor(e,t,n){this[S]=!0,this.values=t,this.strings=e,this.context=n}withKey(e){return this.key=e,this}update(e){for(let t=0;t<e.length;t++)void 0!==this.expressions[t]&&this.expressions[t].update(e[t])}delete(){n(this.range[0],this.range[1].nextSibling),this.range=void 0,this.expressions=void 0}create(){const{fragment:t,expressions:n}=E(this.strings,this.context);return this.expressions=n,this.range=[t.insertBefore(e(),t.firstChild),t.appendChild(e())],this.update(this.values),t}}function A(e,t){A.instances.has(t)?A.instances.get(t).update(e.values):(A.instances.set(t,e),n(t.firstChild,null,t),t.appendChild(e.create()))}function M(e,...t){return new O(e,t)}S=s,A.instances=new WeakMap;const T=function(e){return class extends e{constructor(){super(...arguments),this.__props=Object.create(null)}static get observedAttributes(){return function(e){if(!e.__attrsMap){const t=e.properties,n=Object.create(null);if(t)for(const r in t)n[r.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()]=r,Object.defineProperty(e.prototype,r,{get(){return this.__props[r]},set(e){const t=this.__props[r];this.__props[r]=e,this.rendered&&t!==e&&this.update()}});e.__attrsMap=n,e.__observedProps=Object.keys(n)}return e.__observedProps}(this)}attributeChangedCallback(e,t,n){const{__attrsMap:r,properties:o}=this.constructor;this[r[e]]=o[e](n)}}}((L=HTMLElement,class extends L{constructor(){super(...arguments),this.state={},this.rendered=!1,this.renderCallbacks=[],this.renderRoot=this}attachShadow(e){return this.renderRoot=super.attachShadow.call(this,e)}connectedCallback(){this.update()}setState(e,t){const n=this.state;this.state=Object.assign({},n,"function"==typeof e?e(n,this):e),t&&this.renderCallbacks.push(t),this.update()}render(){return null}update(){this.rendered=!0;const e=this.render();for(e&&A(e,this.renderRoot);this.renderCallbacks.length;)this.renderCallbacks.shift()()}}));var L;function P(e){return null===e?"null":Array.isArray(e)?"array":typeof e}function R(e){return e!==Object(e)}function B(e){return!!e&&(!!e.nodeType||a(e))}function W(e){try{if("string"==typeof e)return JSON.parse(e)}catch(e){console.error(e)}return e}let D,F,z,H,K,V,J,X,Z,q,G=e=>e;const I=({isCollapsable:e,collapsed:t,onClick:n,key:r})=>M(D||(D=G`<span class=${0} onClick=${0}>${0}:</span>`),function(...e){return e.filter(Boolean).join(" ")}(r&&"key",e&&"collapsable",t&&"collapsableCollapsed"),n,r);class Q extends T{constructor(...e){super(...e),this.data=null,this.collapsed=!0,this.handleKeyClick=e=>{e.preventDefault(),this.collapsed=!this.collapsed},this.handleLinkClick=e=>{this.link&&(e.preventDefault(),this.dispatchEvent(new CustomEvent("linkClick",{detail:this.data,bubbles:!0,composed:!0})))}}static get properties(){return{data:W,collapsed:Boolean,key:String,link:Boolean}}static get is(){return"json-nested-object-node"}renderValue(e){return B(e)?M(F||(F=G`<div>${0}</div>`),e):M(z||(z=G`<span class=${0}><span class=${0} onClick=${0}>${0}</span></span>`),P(e),this.link?"link":"",this.handleLinkClick,JSON.stringify(e))}renderChild(e){return this.collapsed?M(H||(H=G`<span class=preview>${0}</span>`),function(e,t){const{nodeCount:n,maxLength:r}={nodeCount:3,maxLength:15,...t},o=Array.isArray(e),s=Object.keys(e),i=s.slice(0,n),a=[o?"[ ":"{ "];return a.push(i.reduce((t,n)=>{const s=[],i=e[n],a=P(i);return o||s.push(`${n}: `),"object"===a?s.push("{ ... }"):"array"===a?s.push("[ ... ]"):"string"===a?s.push(`"${i.substring(0,r)}${i.length>r?"...":""}"`):s.push(String(i)),t.concat(s.join(""))},[]).join(", ")),s.length>n&&a.push(", ..."),a.push(o?" ]":" }"),a.join("")}(e)):M(K||(K=G`<json-object-node data=${0}></json-object-node>`),e)}render(){const{data:e,key:t}=this,n=R(e)||B(e);return M(V||(V=G`${0} ${0}`),I({isCollapsable:!n,collapsed:this.collapsed,key:t,onClick:!n&&this.handleKeyClick}),n?this.renderValue(e):this.renderChild(e))}}class U extends T{constructor(...e){super(...e),this.data=null,this.collapsed=!0}static get is(){return"json-object-node"}static get properties(){return{data:W,collapsed:Boolean}}renderObject(e){return Object.keys(e).map(t=>M(J||(J=G`<li><json-nested-object-node key=${0} link=${0} data=${0}></json-nested-object-node></li>`),t,"__ref"===t,e[t]).withKey(t))}renderPrimitive(e){return void 0!==e?M(X||(X=G`<li>${0}</li>`),e):null}render(){const{data:e}=this;return M(Z||(Z=G`<ul>${0}</ul>`),R(e)?this.renderPrimitive(e):this.renderObject(e))}}class Y extends T{constructor(...e){super(...e),this.data=null}static get is(){return"json-viewer"}static get properties(){return{data:W}}connectedCallback(){if(!this.hasAttribute("data")){const e=this.innerText.trim();e&&(this.data=JSON.parse(e))}this.attachShadow({mode:"open"}),super.connectedCallback()}render(){return M(q||(q=G`<style>:host{--color:#f8f8f2;--color-link:#006dcc;--color-link-hover:#005fb2;--string-color:#a3eea0;--number-color:#d19a66;--boolean-color:#4ba7ef;--null-color:#df9cf3;--property-color:#6fb3d2;--font-family:monaco,Consolas,'Lucida Console',monospace;--preview-color:rgba(222, 175, 143, 0.9);display:block;background-color:var(--background-color);color:var(--color);font-family:var(--font-family);font-size:1rem}.preview{color:var(--preview-color)}.null{color:var(--null-color,#df9cf3)}.key{color:var(--property-color,#f9857b);display:inline-block}.collapsable:before{display:inline-block;color:var(--color);padding-right:5px;padding-left:5px;font-size:.7rem;content:'▶';transition:transform 195ms ease-in;transform:rotate(90deg);color:var(--property-color)}.collapsable.collapsableCollapsed:before{transform:rotate(0)}.collapsable{cursor:pointer;user-select:none}.link{color:var(--color-link);cursor:pointer}.link:hover{color:var(--color-link-hover)}.string{color:var(--string-color)}.number{color:var(--number-color)}.boolean{color:var(--boolean-color)}ul{padding:0;clear:both}li,ul{list-style:none;position:relative}li ul>li{position:relative;padding-top:.25rem;margin-left:1.5rem;padding-left:0}json-nested-object-node ul:before{content:'';border-left:1px solid #333;position:absolute;left:.5rem;top:.5rem;bottom:.5rem}json-nested-object-node ul:hover:before{border-left:1px solid #666}</style><json-object-node data=${0}></json-object-node>`),this.data)}}customElements.define(U.is,U),customElements.define(Q.is,Q),customElements.define(Y.is,Y);
//# sourceMappingURL=index.js.map
