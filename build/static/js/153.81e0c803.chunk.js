"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[153],{6091:function(e,t,n){n.r(t),n.d(t,{default:function(){return h}});n(2791);var r=n(4554),a=n(4663),o=n(266),c=n(1889),i=n(705),s=n.p+"static/media/dashboard.2e886257e4ebbfac1e95.png",l=(n(3666),n(2077),n(8234),n(8559)),u=n.n(l),p=n(184);new(u().Icon)({iconUrl:n(9229),iconSize:[40,40],iconAnchor:[17,46],popupAnchor:[0,-46]}),new(u().Icon)({iconUrl:n(9229),iconSize:[40,40],iconAnchor:[17,46],popupAnchor:[0,-46]});n(4134);var h=function(){return(0,p.jsxs)(r.Z,{component:"main",sx:{backgroundColor:function(e){return"light"===e.palette.mode?e.palette.grey[100]:e.palette.grey[900]},flexGrow:1,height:"100vh",overflow:"auto"},children:[(0,p.jsx)(a.Z,{}),(0,p.jsxs)(o.Z,{maxWidth:"lg",sx:{mt:4,mb:4},children:[(0,p.jsx)(c.ZP,{container:!0,spacing:3,sx:{backgroundImage:"url(".concat(s,")"),backgroundRepeat:"no-repeat",height:"80vh"}}),(0,p.jsx)(i.Z,{sx:{pt:4}})]})]})}},4134:function(e,t,n){n.r(t),n.d(t,{default:function(){return b}});var r=n(4165),a=n(5861),o=n(885),c=n(2791),i=n(9961),s=n(3407),l=n(3209),u=(n(3666),n(2077),n(4554)),p=n(4663),h=n(1889),d=n(5527),f=n(8096),x=n(4925),m=n(8406),g=n(3786),v=n(2388),Z=n(6598),j=n(184);function b(){var e=(0,c.useState)({lat:40.2974883,lng:-82.2067383}),t=(0,o.Z)(e,2),n=t[0],b=t[1],k=(0,c.useState)(null),w=(0,o.Z)(k,2),y=w[0],S=w[1],I=localStorage.getItem("token"),C=localStorage.getItem("user"),_=(0,c.useState)([]),z=(0,o.Z)(_,2),A=z[0],D=z[1],P=(0,c.useState)(""),T=(0,o.Z)(P,2),G=T[0],U=T[1],W=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){var t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,v.Z)({method:"post",url:"http://54.226.199.64:8001/infinite/get_devices",headers:{"Content-Type":"application/octet-stream","x-token":I,"x-user":C}});case 2:t=e.sent,D(t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(0,c.useEffect)((function(){W();var e=setInterval((function(){var e=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){var t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,v.Z)({method:"post",url:"http://54.226.199.64:8001/infinite/get_gps",headers:{"Content-Type":"application/octet-stream","x-token":I,"x-user":C},params:{device_id:G,count:1}});case 2:t=e.sent,b({lat:t.data[0].lat,lng:t.data[0].long});case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),t=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){var t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,v.Z)({method:"post",url:"http://54.226.199.64:8001/infinite/get_geofence_breach",headers:{"Content-Type":"application/octet-stream","x-token":I,"x-user":C},params:{device_id:G,count:1}});case 2:t=e.sent,S(t.data[0]);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e(),t(),console.log(y)}),5e3);return function(){clearInterval(e)}}),[G]);return(0,j.jsx)(j.Fragment,{children:(0,j.jsxs)(u.Z,{component:"main",sx:{backgroundColor:function(e){return"light"===e.palette.mode?e.palette.grey[100]:e.palette.grey[900]},flexGrow:1,height:"100vh",overflow:"auto"},children:[(0,j.jsx)(p.Z,{}),(0,j.jsx)(Z.Z,{maxWidth:"lg",sx:{mt:4,mb:4},children:(0,j.jsx)(h.ZP,{container:!0,spacing:3,children:(0,j.jsx)(h.ZP,{item:!0,xs:12,children:(0,j.jsxs)(d.Z,{sx:{p:2,display:"flex",flexDirection:"column",height:"350"},children:[(0,j.jsxs)(f.Z,{sx:{m:1,width:200},size:"small",children:[(0,j.jsx)(x.Z,{id:"demo-select-small",children:"Select Device"}),(0,j.jsx)(m.Z,{labelId:"demo-select-small",id:"demo-select-small",value:G,label:"Select Device",size:"small",onChange:function(e){e.preventDefault(),U(e.target.value)},children:A.map((function(e){var t=e.device_id;e.status;return(0,j.jsx)(g.Z,{value:t,children:t},t)}))})]}),(0,j.jsxs)(i.h,{style:{height:"calc(100vh - 52px)"},center:[40.2974883,-82.2067383],zoom:17,minZoom:5,children:[(0,j.jsx)(s.I,{attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),(0,j.jsx)(l.Z,{data:null!==n&&void 0!==n?n:{}})]})]})})})})]})})}},6598:function(e,t,n){var r=(0,n(7184).Z)();t.Z=r}}]);
//# sourceMappingURL=153.81e0c803.chunk.js.map