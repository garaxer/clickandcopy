(this.webpackJsonpclickcopy=this.webpackJsonpclickcopy||[]).push([[0],{109:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(10),c=n.n(o),i=n(73),l=n(13),u=n(74),s=function(e){return{visibility:"hidden",pointerEvents:"none",width:e}},d=function(e,t){return{visibility:e,position:"relative",backgroundImage:e?"url(".concat(t,")"):"none",backgroundSize:"contain"}},p={color:"tomato",position:"absolute",top:"200px",left:"0",width:"100%"},m=function(e){var t=Object(u.a)({textColour:"tomato",textVisible:!0,imageVisible:!0},e),n=t.width,o=t.text,c=t.imageUrl,i=t.textVisible,m=t.imageVisible,b=t.textColour,g=t.handleTextClick,f=Object(a.useState)(0),E=Object(l.a)(f,2),v=E[0],O=E[1],h=Object(a.useState)(0),j=Object(l.a)(h,2),S=j[0],x=j[1],y=r.a.useRef(null);Object(a.useEffect)((function(){C(y)}),[n]);var T=function(e){console.log(e.target.innerHTML),navigator.clipboard.writeText(e.target.innerHTML),g(e.target.innerHTML)},_=function(e,t){return{color:b,position:"absolute",top:t,left:e,margin:0,fontSize:"10px",fontStyle:"italic",WebkitTextStrokeWidth:"0.7px",WebkitTextStrokeColor:b,visibility:i?"visible":"hidden"}},C=function(e){e&&(console.log(e),console.log("handling image height"),O(e.current.naturalWidth),x(e.current.width))};return r.a.createElement("div",{style:d(m,c)},r.a.createElement("img",{style:s(n),src:c,alt:"plan",ref:y,onLoad:function(){return C(y)}}),v&&function(e){console.log("rendered text again");return Array.isArray(e)&&e.filter((function(e){return e.text.length>1||e.text.match(/[a-z0-9A-Z.]/i)})).map((function(e,t){var n=e.text,a=S/v,o=function(e){var t=e.x,n=e.y,a=e.scale;return{x:t*=a,y:n*=a}}({x:e.bounds[0].x,y:e.bounds[0].y,scale:a}),c=o.x,i=o.y;return r.a.createElement("span",{key:t,onClick:T,style:_(c,i)},n)}))}(o),r.a.createElement("h3",{style:p},"test"))},b=n(60),g=n(72),f=n(63),E=n(30),v=n.n(E),O=n(38),h=n(62),j=n.n(h),S=n(146),x=n(70),y=n.n(x);function T(){var e=Object(b.a)(["\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding-left: 20px;\n  padding-right: 20px;\n\n  border-width: 2px;\n  border-radius: 2px;\n  border-color: ",";\n  border-style: dashed;\n  \n  outline: none;\n  transition: border .24s ease-in-out;\n  :focus {\n    border-color: #2196f3;\n  }\n  :hover {\n    border-color:lightblue;\n  }\n"]);return T=function(){return e},e}var _=f.a.div(T(),(function(e){return function(e){return e.isDragAccept?"#00e676":e.isDragReject?"#ff1744":e.isDragActive?"#2196f3":"#eeeeee"}(e)})),C=function(e){var t=e.parentDispatch,n=Object(a.useState)(""),o=Object(l.a)(n,2),c=o[0],i=o[1],u=Object(a.useState)(!1),s=Object(l.a)(u,2),d=s[0],p=s[1],m=Object(a.useCallback)((function(e){e&&console.log(e[0].name),p(!0);var n;try{(n=e[0],function(){var e=Object(O.a)(v.a.mark((function e(t){var a,r;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(n),(a=new FormData).append("file",n),Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).API_URL?console.log(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).API_URL):console.log("no env"),e.next=6,j.a.post(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).API_URL?"".concat(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).API_URL):"http://127.0.0.1:5000/planUpload",a,{headers:{"Content-Type":"multipart/form-data"}}).catch((function(e){console.error("Error:",e),t({type:"PLAN_UPLOAD",payload:e})}));case 6:r=e.sent,t({type:"PLAN_UPLOAD",payload:r.data});case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())((function(e){console.log(e.payload),e.payload?e.payload.data?"error"in e.payload?i("Error uploading file."+e.payload.error):"data"in e.payload?(i("valid"),t({url:e.payload.url,data:e.payload.data}),p(!1)):i("Error receiving response from api"):i("Error receiving response from api, no data"):i("Error receiving response from api")}))}catch(a){i("Error receiving response from api")}}),[t]),b=Object(g.a)({onDrop:m,accept:"image/*"}),f=b.getRootProps,E=b.getInputProps,h=b.rejectedFiles,x=b.isDragActive,T=b.isDragAccept,C=b.isDragReject,D=h.map((function(e){return r.a.createElement("li",{key:e.path},e.path," - ",e.size," bytes")}));return r.a.createElement("div",{className:"container"},r.a.createElement(_,f({isDragActive:x,isDragAccept:T,isDragReject:C}),r.a.createElement("input",E()),r.a.createElement(S.a,{color:"inherit"},r.a.createElement(y.a,null),"Upload An Image")),c&&"valid"!==c?r.a.createElement("h3",null,"Warning: ".concat(c),"  "):r.a.createElement(r.a.Fragment,null),h.length?r.a.createElement("h4",null," Rejected Items"):"",r.a.createElement("ul",null,D),d?r.a.createElement("p",null,"Please Wait"):"")},D=function(){var e=Object(O.a)(v.a.mark((function e(t){var n,a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("testJson.json");case 2:return n=e.sent,e.next=5,n.json();case 5:a=e.sent,console.log(a),t(a);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k=n(151),P=n(5),A=n(150),L=n(44),w=n(152),W=n(154),R=n(153),U=n(110),I=n(155),N=n(71),K=n.n(N),H=Object(P.a)({root:{color:L.a[400],"&$checked":{color:L.a[600]}},checked:{}})((function(e){return r.a.createElement(W.a,Object.assign({color:"default"},e))})),V=Object(A.a)({root:{width:300,margin:"auto"}}),z=function(){var e=V(),t=Object(a.useState)(!0),n=Object(l.a)(t,2),o=n[0],c=n[1],u=Object(a.useState)(!0),s=Object(l.a)(u,2),d=s[0],p=s[1],b=Object(a.useState)("tomato"),g=Object(l.a)(b,2),f=g[0],E=g[1],v=Object(a.useState)("testImage.jpg"),O=Object(l.a)(v,2),h=O[0],j=O[1],S=Object(a.useState)(null),x=Object(l.a)(S,2),y=x[0],T=x[1],_=Object(a.useState)(""),P=Object(l.a)(_,2),A=P[0],L=P[1],W=Object(a.useState)(0),N=Object(l.a)(W,2),z=N[0],B=N[1];Object(a.useEffect)((function(){D(T)}),[T]);var M=Object(a.useState)(830),F=Object(l.a)(M,2),J=F[0],q=F[1];return r.a.createElement(k.a,{container:!0,direction:"column",justify:"center",alignItems:"center"},r.a.createElement("h1",null,"Text Extractor"),r.a.createElement("div",null,r.a.createElement(C,{parentDispatch:function(e){var t=e.url,n=e.data;console.log(t,n);var a=Object(i.a)(n).slice(1);console.log("data"),console.log(n),console.log(a),j(t),T(a)}}),r.a.createElement("p",null)),r.a.createElement("div",null,r.a.createElement(w.a,{control:r.a.createElement(H,{checked:o,onChange:function(){return c(!o)},name:"ImageCheck"}),label:"Show Image"}),r.a.createElement(w.a,{control:r.a.createElement(H,{checked:d,onChange:function(){return p(!d)},name:"TextCheck"}),label:"Show Text"}),r.a.createElement(R.a,{id:"TextColor",label:"Text Colour",variant:"outlined",onChange:function(e){E(e.target.value)},value:f,size:"small"}),r.a.createElement("div",{className:e.root},r.a.createElement(U.a,{id:"discrete-slider",gutterBottom:!0},"Image Width"),r.a.createElement(I.a,{"aria-labelledby":"discrete-slider",step:100,marks:!0,min:500,max:window.innerWidth,value:J,onChange:function(e,t){return q(t)},valueLabelDisplay:"auto"}))),r.a.createElement(m,{width:"".concat(J,"px"),imageUrl:h,textVisible:d,imageVisible:o,text:y,textColour:f,handleTextClick:function(e){L(A+e+[",",","][z]),B(1===z?0:z+1)}}),r.a.createElement("div",{style:{position:"absolute",top:"10%",left:0}},r.a.createElement(K.a,Object.assign({handle:"strong"},{onStart:function(){return""},onStop:function(){return""}}),r.a.createElement("div",{className:"box no-cursor"},r.a.createElement("strong",{className:"cursor"},r.a.createElement("div",null,"Microstation Text")),r.a.createElement("div",null,r.a.createElement(R.a,{id:"standard-multiline-static",label:"",multiline:!0,rows:30,variant:"outlined",value:A,onChange:function(e){return L(e.target.value)}}))))))};c.a.render(r.a.createElement(z,null),document.querySelector("#root"))},82:function(e,t,n){e.exports=n(109)}},[[82,1,2]]]);
//# sourceMappingURL=main.a296410d.chunk.js.map