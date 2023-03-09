"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[701],{9647:function(e,n,t){t.r(n),t.d(n,{default:function(){return B}});var a=t(4165),o=t(5861),r=t(885),i=t(2791),s=t(9961),l=t(3407),c=t(5987),u=t(5362),p=t(9359),d=t(150),f=t(8559),h=t.n(f),x=["position"],m=(0,u.dW)((function(e,n){var t=e.position,a=(0,c.Z)(e,x),o=new f.Marker(t,a);return(0,p.O)(o,(0,d.sj)(n,{overlayContainer:o}))}),(function(e,n,t){n.position!==t.position&&e.setLatLng(n.position),null!=n.icon&&n.icon!==t.icon&&e.setIcon(n.icon),null!=n.zIndexOffset&&n.zIndexOffset!==t.zIndexOffset&&e.setZIndexOffset(n.zIndexOffset),null!=n.opacity&&n.opacity!==t.opacity&&e.setOpacity(n.opacity),null!=e.dragging&&n.draggable!==t.draggable&&(!0===n.draggable?e.dragging.enable():e.dragging.disable())})),g=(0,u.SO)((function(e,n){var t=new f.Popup(e,n.overlayContainer);return(0,p.O)(t,n)}),(function(e,n,t,a){var o=t.position;(0,i.useEffect)((function(){var t=e.instance;function r(e){e.popup===t&&(t.update(),a(!0))}function i(e){e.popup===t&&a(!1)}return n.map.on({popupopen:r,popupclose:i}),null==n.overlayContainer?(null!=o&&t.setLatLng(o),t.openOn(n.map)):n.overlayContainer.bindPopup(t),function(){var e;n.map.off({popupopen:r,popupclose:i}),null===(e=n.overlayContainer)||void 0===e||e.unbindPopup(),n.map.removeLayer(t)}}),[e,n,a,o])})),v=(t(2077),t(3666),t(4554)),Z=t(4663),y=t(266),j=t(1889),S=t(5527),C=t(705),b=t(8096),k=t(4925),w=t(8406),I=t(3786),A=t(6151),z=t(8234),O=JSON.parse('[{"city":"California","lat":"36.232792","lng":"-120.614686"},{"city":"Arizona","lat":"36.277440","lng":"-111.423660"},{"city":"Texas","lat":"32.672757","lng":"-98.689107"},{"city":"Colorado","lat":"40.611554","lng":"-102.675576"}]'),D=t(2388),L=t(2062),E=t.n(L),_=t(184);new(h().Icon)({iconUrl:t(9229),iconSize:[40,40],iconAnchor:[17,46],popupAnchor:[0,-46]});var P=t(3209),T=(new(h().Icon)({iconUrl:t(9229),iconSize:[40,40],iconAnchor:[17,46],popupAnchor:[0,-46]}),new(h().Icon)({iconUrl:t(9229),iconSize:[40,40],iconAnchor:[17,46],popupAnchor:[0,-46]}));var B=function(){var e=(0,i.useState)({lat:36.23,lng:-98.38}),n=(0,r.Z)(e,2),t=n[0],c=n[1],u=(0,i.useRef)(),p=localStorage.getItem("token"),d=localStorage.getItem("user"),f=(0,i.useState)([]),h=(0,r.Z)(f,2),x=h[0],L=h[1],B=(0,i.useState)({}),U=(0,r.Z)(B,2),W=U[0],N=U[1],F=(0,i.useState)(""),G=(0,r.Z)(F,2),J=G[0],M=G[1],R=(0,i.useState)("5"),V=(0,r.Z)(R,2),q=V[0],H=V[1],K=(0,i.useState)(!0),Q=(0,r.Z)(K,2),X=Q[0],Y=Q[1],$=(0,i.useState)(null),ee=(0,r.Z)($,2),ne=(ee[0],ee[1],function(){var e=(0,o.Z)((0,a.Z)().mark((function e(){var n;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,D.Z)({method:"post",url:"http://54.226.199.64:8001/infinite/get_devices",headers:{"Content-Type":"application/octet-stream","x-token":p,"x-user":d}});case 2:n=e.sent,L(n.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}());(0,i.useEffect)((function(){ne()}),[]);var te=(0,i.useState)(null),ae=(0,r.Z)(te,2),oe=ae[0],re=ae[1],ie=function(e){e.preventDefault();var n=function(){var e=(0,o.Z)((0,a.Z)().mark((function e(){var n,t;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=!0===X?"DISABLED":"ENABLED",e.next=3,D.Z.post("http://54.226.199.64:8001/infinite/set_device",{device_id:J,type:"TCU",status:n},{headers:{"Content-Type":"application/json","x-token":p,"x-user":d}});case 3:t=e.sent,Y(!X),E()({text:t.data,icon:"success",type:"success"});case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();n()},se=(0,i.useCallback)((function(e){e.preventDefault(),M(e.target.value),H("14");var n=function(){var n=(0,o.Z)((0,a.Z)().mark((function n(){var t;return(0,a.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,(0,D.Z)({method:"post",url:"http://54.226.199.64:8001/infinite/get_gps",headers:{"Content-Type":"application/octet-stream","x-token":p,"x-user":d},params:{device_id:e.target.value,count:1}});case 2:t=n.sent,c({lat:t.data[0].lat,lng:t.data[0].long}),re([t.data[0].lat,t.data[0].long]),N({lat:t.data[0].lat,lng:t.data[0].long});case 6:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();n()}),[]);return(0,_.jsxs)(v.Z,{component:"main",sx:{backgroundColor:function(e){return"light"===e.palette.mode?e.palette.grey[100]:e.palette.grey[900]},flexGrow:1,height:"100vh",overflow:"auto"},children:[(0,_.jsx)(Z.Z,{}),(0,_.jsxs)(y.Z,{maxWidth:"lg",sx:{mt:4,mb:4},children:[(0,_.jsx)(j.ZP,{container:!0,spacing:3,children:(0,_.jsx)(j.ZP,{item:!0,xs:12,children:(0,_.jsxs)(S.Z,{sx:{p:2,display:"flex",flexDirection:"column",height:"350"},children:[(0,_.jsxs)(v.Z,{component:"form",noValidate:!0,sx:{mt:1},children:[(0,_.jsxs)(b.Z,{sx:{m:1,minWidth:200},size:"small",children:[(0,_.jsx)(k.Z,{id:"demo-select-small",children:"Select Device"}),(0,_.jsx)(w.Z,{labelId:"demo-select-small",id:"demo-select-small",value:J,label:"Select Device",size:"small",onChange:se,children:x.map((function(e){var n=e.device_id;e.status;return(0,_.jsx)(I.Z,{value:n,children:n},n)}))})]}),null===oe?null:(0,_.jsxs)(_.Fragment,{children:[!0===X?(0,_.jsx)("span",{style:{margin:"10px"},children:" Status: Active"}):(0,_.jsx)("span",{style:{margin:"10px"},children:"Status: Deactive"}),!1===X?(0,_.jsx)(A.Z,{variant:"contained",color:"success",sx:{mt:1},onClick:ie,children:"ENABLE"}):(0,_.jsx)(A.Z,{variant:"contained",color:"error",sx:{mt:1},onClick:ie,children:"DISABLE"})]})]}),(0,_.jsxs)(s.h,{style:{width:"100%",height:"70vh"},center:t,zoom:q,ref:u,scrollWheelZoom:!0,fadeAnimation:!0,markerZoomAnimation:!0,children:[(0,_.jsx)(l.I,{url:z.Z.maptiler.url,attribution:z.Z.maptiler.attribution}),null===oe?O.map((function(e,n){return(0,_.jsx)(m,{position:[e.lat,e.lng],icon:T,children:(0,_.jsx)(g,{children:(0,_.jsx)("b",{children:e.city})})},n)})):(0,_.jsx)(P.Z,{data:null!==W&&void 0!==W?W:{}})]})]})})}),(0,_.jsx)(C.Z,{sx:{pt:4}})]})]})}}}]);
//# sourceMappingURL=701.a708f66c.chunk.js.map