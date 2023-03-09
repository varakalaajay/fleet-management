"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[372],{5372:function(e,t,n){n.r(t);var r=n(4165),i=n(5861),a=n(885),s=n(2791),c=n(4554),o=n(4663),l=n(266),d=n(1889),u=n(5527),h=n(890),p=n(7391),f=n(6151),x=n(7689),m=n(2062),v=n.n(m),g=n(2388),Z=n(4910),y=n(184);t.default=function(){var e=(0,s.useState)(""),t=(0,a.Z)(e,2),n=t[0],m=t[1],j=(0,s.useState)(""),w=(0,a.Z)(j,2),k=w[0],b=w[1],C=(0,x.s0)(),S=localStorage.getItem("token"),D=localStorage.getItem("user"),_=(0,s.useState)([]),V=(0,a.Z)(_,2),N=V[0],P=V[1],A=function(){var e=(0,i.Z)((0,r.Z)().mark((function e(){var t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,g.Z)({method:"post",url:"http://54.226.199.64:8001/infinite/get_devices",headers:{"Content-Type":"application/octet-stream","x-token":S,"x-user":D},params:{device_id:"Device03"}});case 3:t=e.sent,P(t.data),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),e.t0&&v()({text:e.t0,icon:"error",type:"error"});case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();return(0,s.useEffect)((function(){A()}),[]),(0,y.jsxs)(c.Z,{component:"main",sx:{backgroundColor:function(e){return"light"===e.palette.mode?e.palette.grey[100]:e.palette.grey[900]},flexGrow:1,height:"100vh",overflow:"auto"},children:[(0,y.jsx)(o.Z,{}),(0,y.jsx)(l.Z,{maxWidth:"lg",sx:{mt:4,mb:4},children:(0,y.jsxs)(d.ZP,{container:!0,spacing:3,children:[(0,y.jsx)(d.ZP,{item:!0,xs:5,children:(0,y.jsxs)(u.Z,{sx:{p:2,display:"flex",flexDirection:"column",height:"350"},children:[(0,y.jsx)(h.Z,{component:"h1",variant:"h5",children:"Add Vehicle"}),(0,y.jsxs)(c.Z,{component:"form",noValidate:!0,onSubmit:function(e){e.preventDefault();var t=function(){var e=(0,i.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=1,e.next=4,g.Z.post("http://54.226.199.64:8001/infinite/create_device",{device_id:n,type:k,status:"ENABLED"},{headers:{"Content-Type":"application/json","x-token":S,"x-user":D}});case 4:e.sent,v()({text:"Vehicle Registered Success",icon:"success",type:"success"}),m(""),b(""),A(),C("/add-device"),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(1),e.t0.response&&e.t0.response.data&&v()({text:e.t0.response.data,icon:"error",type:"error"});case 15:case"end":return e.stop()}}),e,null,[[1,12]])})));return function(){return e.apply(this,arguments)}}();t()},sx:{mt:1},children:[(0,y.jsx)(p.Z,{margin:"normal",required:!0,fullWidth:!0,label:"Vehicle ID",type:"text",id:"device_id",name:"deviceid",value:n,onChange:function(e){return m(e.target.value)},autoComplete:"off",autoFocus:!0}),(0,y.jsx)(p.Z,{margin:"normal",required:!0,fullWidth:!0,name:"type",value:k,onChange:function(e){return b(e.target.value)},label:"Type",type:"text",id:"type",autoComplete:"off"}),(0,y.jsx)(f.Z,{type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},children:"Register Vehicle"})]})]})}),(0,y.jsx)(d.ZP,{item:!0,xs:7,children:(0,y.jsxs)(u.Z,{sx:{p:2,display:"flex",flexDirection:"column",height:"350"},children:[(0,y.jsx)(h.Z,{component:"h1",variant:"h5",children:"List of Vehicles"}),(0,y.jsx)("div",{style:{height:400,width:"100%"},children:(0,y.jsx)(Z._,{rows:N,columns:[{field:"device_id",headerName:"Device ID",width:150},{field:"type",headerName:"Type",width:130},{field:"status",headerName:"Status",width:130},{field:"createdAt",headerName:"Created At",width:160}],pageSize:5,rowsPerPageOptions:[5]})})]})})]})})]})}}}]);
//# sourceMappingURL=372.1534fdc1.chunk.js.map