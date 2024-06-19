"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.RealTimeMonaco=void 0;var e=require("tslib"),o=require("react/jsx-runtime"),n=require("react"),r=e.__importDefault(require("@monaco-editor/react")),t=e.__importStar(require("yjs")),a=require("y-websocket"),l=require("y-monaco"),s=require("react"),u=e.__importStar(require("monaco-editor"));require("./styles.css");exports.RealTimeMonaco=function(i){var c=e.__rest(i,[]),d=(0,n.useState)([]),v=d[0],m=d[1],f=(0,n.useState)(),_=f[0],g=f[1],p=(0,n.useState)(),y=p[0],h=p[1],S=(0,s.useRef)(),C=(0,n.useState)({name:c.name,color:c.color}),b=C[0];C[1];var N=(0,n.useState)(!1),q=N[0],w=N[1],x=(0,n.useState)([]),T=x[0],A=x[1],k=[],M=(0,n.useState)([]),E=M[0],L=M[1],I={name:c.name,color:c.color,collaborateId:c.roomId},j=I.name,D=I.color,R=I.collaborateId;(0,n.useEffect)((function(){if(q&&j){var e=document.getElementsByClassName("applyColorToThis"),o=document.getElementsByClassName("my-cursor"),n="backgroundC-";t(e,n,!1),t(o,n,!0);var r=setInterval((function(){t(e,n,!1),t(o,n,!0)}),1);return function(){return clearInterval(r)}}function t(e,o,n){for(var r=function(r){e[r].className.split(" ").forEach((function(t){var a,l,s;if(-1!==t.indexOf(o)){var u=t.replace(o,"");if((null==b?void 0:b.color)!=="#".concat(u))if(n&&!e[r].textContent){var i=v.findIndex((function(e){var o;return(null===(o=e.user)||void 0===o?void 0:o.color)==="#".concat(u)}));e[r].innerHTML="",function(e,o,n){var r=document.createElement("div");r.style.background="#".concat(o),r.textContent=n,r.setAttribute("class","cursor-hover"),e.appendChild(r)}(e[r],u,null!==(s=null===(l=null===(a=v[i])||void 0===a?void 0:a.user)||void 0===l?void 0:l.name)&&void 0!==s?s:"#".concat(u))}else!function(e,o){e.style.background="#".concat(o)}(e[r],u)}}))},t=0;t<e.length;t++)r(t)}}),[v,j]);var O=function(o){var n=o.position,r=null==y?void 0:y.getLocalState();null==y||y.setLocalState(e.__assign(e.__assign({},r),{user:{name:j,color:D},cursor:n}))},B=function(o){var n=o.selection,r=null==y?void 0:y.getLocalState();r=e.__assign(e.__assign({},r),{user:{name:j,color:D}}),null==y||y.setLocalState(e.__assign(e.__assign({},r),{user:{name:j,color:D},selection:n}))};function P(o){var n;w(!0),S.current=o;var r=new t.Doc,s=R,i=new a.WebsocketProvider("wss://demos.yjs.dev/ws",s,r),c=r.getText("monaco"),d=i.awareness;h(d),d.on("change",(function(){for(var n,r,t=Array.from(d.getStates().values()),a=[],l=[],s=[],i=0;i<t.length;i++){var c=t[i].cursor,v=t[i].selection,m=null===(n=t[i].user)||void 0===n?void 0:n.color,f=null===(r=t[i].user)||void 0===r?void 0:r.name;c&&a.push(c),v&&l.push(v),s.push(m),L(e.__spreadArray(e.__spreadArray([],E,!0),[f],!1))}(function(e,o,n,r){for(var t,a,l=[],s=0;s<o.length;s++){var i=o[s];l.push({range:new u.Range(i.lineNumber,i.column,i.lineNumber,i.column),options:{className:" applyColorToThis ".concat((null==b?void 0:b.color)===n[s]?"":"my-cursor"," backgroundC-").concat(null===(t=n[s])||void 0===t?void 0:t.slice(1))}})}for(s=0;s<(null==e?void 0:e.length);s++)null!==(i=e[s])&&l.push({range:new u.Range(i.startLineNumber,i.startColumn,i.endLineNumber,i.endColumn),options:{className:"".concat((null==b?void 0:b.color)===n[s]?"":"applyColorToThis"," backgroundC-").concat(null===(a=n[s])||void 0===a?void 0:a.slice(1))}});k=null==r?void 0:r.deltaDecorations(k,l)})(l,a,s=e.__spreadArray(e.__spreadArray([],s,!0),s,!0),o),A(e.__spreadArray(e.__spreadArray([],T,!0),s,!0))}));var v=null===(n=S.current)||void 0===n?void 0:n.getModel();v&&new l.MonacoBinding(c,v,new Set([S.current]))}return(0,n.useEffect)((function(){_&&q&&(j&&(null==_||_.onDidChangeCursorPosition(O),null==_||_.onDidChangeCursorSelection(B)),y&&y.on("update",(function(){var e=Array.from(y.getStates().values());JSON.stringify(e)!==JSON.stringify(v)&&m(e)})))}),[_,q,j]),(0,n.useEffect)((function(){_&&R&&j&&P(_)}),[_,R,j]),(0,o.jsx)(r.default,e.__assign({theme:"vs-dark",onMount:function(e,o){var n;g(e),null===(n=c.onMount)||void 0===n||n.call(c,e,o)},className:"monaco-editor"},c||{}))};
