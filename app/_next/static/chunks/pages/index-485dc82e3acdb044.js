(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{65015:function(e,t,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return i(45077)}])},45077:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return K}});var r=i(11527),n=i(9491),a=i(19249),l=i(51126),o=i(51029),s=i(442),c=i(9401),d=i(66418),u=i(47569),x=i(37992),m=i(59496),h=i(46770),p=i(5026),j=i(80852),g=i(32443),Z=i(84449),y=i(50959),b=i(42884);let f=e=>{var t,i,f;let{openModal:v,setOpenModal:z}=e,[w,C]=(0,y.useState)(""),[k,q]=(0,y.useState)(!1),[T,S]=(0,y.useState)(""),[B,P]=(0,y.useState)(""),W=(0,b.v9)(e=>e.quizCards.ongoingQuizzes),D=(0,Z.useRouter)(),I=e=>{P(e.target.value)},Q=e=>{C(e)},E=()=>{C(""),q(!1)},L=(0,g.Z)(),M=()=>{navigator.clipboard.writeText(T),q(!0)},N=()=>{q(!1)},R=()=>{q(!1),z(!1),C("")},_=()=>{D.push("/startquiz/".concat(w))};return(0,y.useEffect)(()=>{let e="".concat(window.location.origin,"/startquiz/").concat(w);S(e)},[w]),(0,r.jsx)(l.Z,{open:v,onClose:R,"aria-labelledby":"create-quiz-modal-title","aria-describedby":"create-quiz-modal-description",disableScrollLock:!0,children:(0,r.jsxs)(o.Z,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",borderRadius:"4px",p:4,py:2,zIndex:9999,transition:"height 0.5s ease-in-out"},children:[(0,r.jsx)(o.Z,{sx:{display:"flex",justifyContent:"flex-end",mt:0},children:(0,r.jsx)(s.Z,{onClick:R,color:"primary",children:(0,r.jsx)(n.Z,{})})}),w?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(c.Z,{id:"create-quiz-modal-title",variant:"h6",align:"center",gutterBottom:!0,fontWeight:"bold",children:"Test Your Understanding"}),(0,r.jsxs)(c.Z,{id:"create-quiz-modal-title",variant:"body1",align:"center",gutterBottom:!0,color:"red",fontWeight:"bold",children:["open link"," ",(0,r.jsx)(o.Z,{component:"span",sx:{color:L.palette.primary.dark},children:"or"})," ","copy link to share"," "]}),(0,r.jsx)(d.Z,{sx:{mt:1,mb:2},fullWidth:!0,value:"".concat(window.location.origin,"/startquiz/").concat(null===(t=W.find(e=>e.id===w))||void 0===t?void 0:t.id),InputProps:{endAdornment:(0,r.jsx)(s.Z,{onClick:M,children:(0,r.jsx)(a.Z,{})})}}),(0,r.jsx)(u.Z,{sx:{backgroundColor:L.palette.primary.main,color:L.palette.secondary.main,display:"flex",justifyContent:"center",alignItems:"center","&:hover":{backgroundColor:L.palette.primary.main,color:L.palette.secondary.main}},onClick:_,children:"Open Link"}),(0,r.jsxs)(o.Z,{sx:{mt:2},children:[(0,r.jsxs)(c.Z,{variant:"body1",children:[(0,r.jsx)("span",{style:{fontWeight:"bold"},children:"quiz title:"})," ",null===(i=W.find(e=>e.id===w))||void 0===i?void 0:i.title]}),(0,r.jsxs)(c.Z,{variant:"body1",sx:{mb:2},children:[(0,r.jsx)("span",{style:{fontWeight:"bold"},children:"quiz description:"})," ",null===(f=W.find(e=>e.id===w))||void 0===f?void 0:f.description]})]}),(0,r.jsx)(u.Z,{sx:{mt:2},onClick:E,children:"back"}),(0,r.jsx)(x.Z,{open:k,autoHideDuration:1e3,onClose:N,message:"Link copied to clipboard!",anchorOrigin:{vertical:"bottom",horizontal:"right"}})]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(c.Z,{id:"create-quiz-modal-title",variant:"h6",align:"center",gutterBottom:!0,fontWeight:"bold",children:"Take Quiz"}),(0,r.jsx)(o.Z,{sx:{mt:2},children:(0,r.jsx)(d.Z,{variant:"outlined",placeholder:"Enter quiz ID",fullWidth:!0,onChange:I})}),(0,r.jsxs)(o.Z,{sx:{display:"flex",justifyContent:"flex-end",mt:2},children:[(0,r.jsx)(u.Z,{onClick:()=>z(!1),color:"primary",variant:"contained",sx:{ml:1},children:(0,r.jsx)(c.Z,{variant:"button",children:"Cancel"})}),(0,r.jsx)(u.Z,{color:"primary",variant:"contained",sx:{ml:1},onClick:()=>C(B),children:(0,r.jsx)(c.Z,{variant:"button",children:"Take"})})]}),(0,r.jsx)(c.Z,{id:"create-quiz-modal-title",variant:"body1",align:"center",gutterBottom:!0,children:"\xa0"}),(0,r.jsx)(c.Z,{id:"create-quiz-modal-title",variant:"body1",align:"center",gutterBottom:!0,children:"Select the public quiz you wish to take"}),(0,r.jsx)(m.Z,{}),(0,r.jsx)(h.Z,{sx:{maxHeight:"50vh",overflow:"auto"},children:(0,r.jsx)(h.Z,{children:W.map((e,t)=>(0,r.jsxs)(y.Fragment,{children:[(0,r.jsx)(p.Z,{onClick:()=>Q(e.id),children:(0,r.jsx)(j.Z,{primary:"#".concat(t+1," ").concat(e.title)})}),t!==W.length-1&&(0,r.jsx)(m.Z,{})]},e.id))})})]})]})})};var v=i(9532),z=i(13436);let w=e=>{let{openModal:t,setOpenModal:i}=e,[n,a]=(0,y.useState)(""),[s,x]=(0,y.useState)(!1),[m,h]=(0,y.useState)(!1),[p,j]=(0,y.useState)(null),g=(0,z.m)().address;g||(g="0x0");let b=(0,Z.useRouter)(),f=e=>{a(e.target.value)},w=async()=>{try{h(!0);let{data:e}=await v.Z.post("/api/add-quiz",{title:n,owner:g});x(!0),h(!1),setTimeout(()=>{x(!1),i(!1),b.push("/editquiz/".concat(e.id))},1e3)}catch(e){console.error("Error adding quiz: ",e),j(e),h(!1)}},C=n.trim().length<1;return(0,r.jsx)(l.Z,{open:t,onClose:()=>i(!1),"aria-labelledby":"create-quiz-modal-title","aria-describedby":"create-quiz-modal-description",disableScrollLock:!0,children:(0,r.jsxs)(o.Z,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",borderRadius:"4px",p:4,zIndex:9999},children:[(0,r.jsx)(c.Z,{id:"create-quiz-modal-title",variant:"h6",component:"h2",align:"center",gutterBottom:!0,fontWeight:"bold",children:"Create Quiz"}),(0,r.jsx)(o.Z,{sx:{mt:2},children:(0,r.jsx)(d.Z,{variant:"outlined",placeholder:"Enter Quiz Title",fullWidth:!0,value:n,onChange:f})}),(0,r.jsxs)(o.Z,{sx:{display:"flex",justifyContent:"flex-end",mt:2},children:[(0,r.jsx)(u.Z,{onClick:()=>i(!1),color:"primary",variant:"contained",sx:{ml:1},children:(0,r.jsx)(c.Z,{variant:"button",children:" Cancel"})}),(0,r.jsx)(u.Z,{onClick:w,color:"primary",variant:"contained",disabled:C,sx:{ml:1},children:(0,r.jsx)(c.Z,{variant:"button",children:"Create"})})]}),m&&(0,r.jsx)(o.Z,{sx:{mt:2},children:(0,r.jsx)(c.Z,{color:"black",children:"Creating Quiz..."})}),s&&(0,r.jsx)(o.Z,{sx:{mt:2},children:(0,r.jsx)(c.Z,{color:"green",children:"Quiz successfully created!"})})]})})},C=e=>{let{openModal:t,setOpenModal:i}=e,[n,a]=(0,y.useState)(!1),[s,d]=(0,y.useState)(!1),[x,m]=(0,y.useState)(null),h=(0,z.m)().address;h||(h="0x0"),(0,Z.useRouter)();let p=async()=>{try{d(!0);let{data:e}=await v.Z.post("/api/request-withdrawal",{owner:h});a(!0),d(!1),setTimeout(()=>{a(!1),i(!1)},1e3)}catch(e){console.error("Error requesting withdrawal: ",e),m(e),d(!1)}};return(0,r.jsx)(l.Z,{open:t,onClose:()=>i(!1),"aria-labelledby":"create-quiz-modal-title","aria-describedby":"create-quiz-modal-description",disableScrollLock:!0,children:(0,r.jsxs)(o.Z,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",borderRadius:"4px",p:4,zIndex:9999},children:[(0,r.jsx)(c.Z,{id:"create-quiz-modal-title",variant:"h6",component:"h2",align:"center",gutterBottom:!0,fontWeight:"bold",children:"Withdraw Prize"}),(0,r.jsx)(o.Z,{sx:{mt:2},children:(0,r.jsx)(c.Z,{children:"You can request withdrawal of your balance to your wallet. Network fee is dudected from the amount you receive."})}),(0,r.jsxs)(o.Z,{sx:{display:"flex",justifyContent:"flex-end",mt:2},children:[(0,r.jsx)(u.Z,{onClick:()=>i(!1),color:"primary",variant:"contained",sx:{ml:1},children:(0,r.jsx)(c.Z,{variant:"button",children:"Cancel"})}),(0,r.jsx)(u.Z,{onClick:p,color:"primary",variant:"contained",sx:{ml:1},children:(0,r.jsx)(c.Z,{variant:"button",children:"Withdraw"})})]}),s&&(0,r.jsx)(o.Z,{sx:{mt:2},children:(0,r.jsx)(c.Z,{color:"black",children:"Requesting withdrawal..."})}),n&&(0,r.jsx)(o.Z,{sx:{mt:2},children:(0,r.jsx)(c.Z,{color:"green",children:"Withdrawal request sent! You will receive your prize in less than 24 hours."})}),x&&(0,r.jsx)(o.Z,{sx:{mt:2},children:(0,r.jsx)(c.Z,{color:"red",children:"You don't have enough balance to withdraw."})})]})})},k=e=>{let{children:t,openModal:i}=e;return y.useEffect(()=>{let e=document.body;return i?e.classList.add("no-scroll"):e.classList.remove("no-scroll"),()=>{e.classList.remove("no-scroll")}},[i]),(0,r.jsx)(r.Fragment,{children:t})};var q=i(98137),T=i(94479),S=i(46485),B=i(53003),P=i(80482),W=i(48309),D=i(55628),I=i(20057),Q=i(65569),E=i(42983),L=i(80052),M=i.n(L),N=i(62133),R=i(1825),_=function(e){let{quiz:t,index:i}=e,n=(0,g.Z)(),a=(0,b.I0)(),[l,d]=(0,y.useState)(null),u=(0,Z.useRouter)(),{address:x}=(0,z.m)(),h=e=>{d(e.currentTarget)},p=()=>{d(null)},j=async()=>{try{a((0,q.wN)({type:"info",message:"Deleting quiz..."})),await v.Z.get("/api/delete-quiz-by-id?id=".concat(t.id)),a((0,q.wN)({type:"success",message:"Quiz deleted successfully"})),a((0,T.Xu)(t.id))}catch(e){console.error(e),a((0,q.wN)({type:"error",message:"An error occurred while deleting the quiz"}))}},f=()=>{u.push("/editquiz/".concat(t.id))};return(0,r.jsxs)(I.Z,{className:"quiz-card-parent",sx:{borderRadius:"4px",position:"relative",overflow:"hidden",border:"2px solid transparent"},children:[(0,r.jsxs)(o.Z,{sx:{position:"absolute",right:"0",top:"0",zIndex:"99"},children:[(0,r.jsx)(s.Z,{sx:{color:"white"},onClick:h,children:(0,r.jsx)(D.Z,{})}),(0,r.jsxs)(Q.Z,{anchorEl:l,open:Boolean(l),disableScrollLock:!0,onClose:p,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},PaperProps:{sx:{boxShadow:"0px 4px 8px rgba(0, 0, 0, 0.3)",backgroundColor:"white"}},children:[t.startTime&&t.timelimit&&x==t.owner&&Math.floor((new Date(t.startTime).getTime()-new Date().getTime())/1e3)>0&&(0,r.jsxs)(E.Z,{onClick:f,children:[(0,r.jsx)(s.Z,{size:"small",sx:{mr:1,color:n.palette.primary.dark},children:(0,r.jsx)(S.Z,{})}),(0,r.jsx)(c.Z,{variant:"body1",children:"Edit"})]}),t.startTime&&t.timelimit&&x==t.owner&&Math.floor((new Date(t.startTime).getTime()-new Date().getTime())/1e3)>0&&(0,r.jsxs)(E.Z,{onClick:j,children:[(0,r.jsx)(s.Z,{size:"small",sx:{mr:1,color:n.palette.primary.dark},children:(0,r.jsx)(B.Z,{})}),(0,r.jsx)(c.Z,{variant:"body1",children:"Delete"})]}),t.startTime&&t.timelimit&&Math.floor((new Date(new Date(t.startTime).getTime()+6e4*t.timelimit).getTime()-new Date().getTime())/1e3)>0&&(0,r.jsxs)(E.Z,{onClick:()=>u.push("/startquiz/".concat(t.id)),children:[(0,r.jsx)(s.Z,{size:"small",sx:{mr:1,color:n.palette.primary.dark},children:(0,r.jsx)(P.Z,{})}),(0,r.jsx)(c.Z,{variant:"body1",children:"Take Quiz"})]}),t.startTime&&t.timelimit&&-30>Math.floor((new Date(new Date(t.startTime).getTime()+6e4*t.timelimit).getTime()-new Date().getTime())/1e3)&&(0,r.jsxs)(E.Z,{onClick:()=>u.push("/resultquiz/".concat(t.id)),children:[(0,r.jsx)(s.Z,{size:"small",sx:{mr:1,color:n.palette.primary.dark},children:(0,r.jsx)(P.Z,{})}),(0,r.jsx)(c.Z,{variant:"body1",children:"View Results"})]}),x==t.owner&&(0,r.jsxs)(E.Z,{onClick:()=>u.push("/statquiz/".concat(t.id)),children:[(0,r.jsx)(s.Z,{size:"small",sx:{mr:1,color:n.palette.primary.dark},children:(0,r.jsx)(W.Z,{})}),(0,r.jsx)(c.Z,{variant:"body1",children:"Statistics"})]})]})]}),(0,r.jsxs)(M(),{href:x==t.owner?"/editquiz/".concat(t.id):"/startquiz/".concat(t.id),children:[(0,r.jsx)(o.Z,{className:"quiz-card-top",sx:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0.4rem 1rem",backgroundColor:n.palette.primary.main},children:(0,r.jsxs)(c.Z,{mr:3,textAlign:"left",variant:"body1",color:n.palette.secondary.main,children:["#",i+1," ",t.title]})}),(0,r.jsxs)(o.Z,{sx:{padding:"0.4rem 1rem",backgroundColor:n.palette.secondary.main},children:[(0,r.jsxs)(R.Z,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[(0,r.jsx)(c.Z,{gutterBottom:!0,variant:"h5",component:"div",children:"Prize"}),(0,r.jsxs)(c.Z,{gutterBottom:!0,variant:"h6",component:"div",children:[t.prizeAmount," EDU"]})]}),(0,r.jsx)(c.Z,{color:"text.secondary",variant:"body2",children:t.description}),(0,r.jsx)(m.Z,{sx:{marginTop:1,marginBottom:1}}),(0,r.jsx)(c.Z,{align:"left",variant:"body2",children:t.startTime&&(0,r.jsxs)(r.Fragment,{children:["Starts at"," ",new Date(t.startTime).toLocaleString("en-US")]})}),(0,r.jsx)(m.Z,{sx:{marginTop:1,marginBottom:1}}),x==t.owner&&(0,r.jsx)(c.Z,{align:"left",variant:"body2",children:t.updatedAt&&(0,r.jsxs)(r.Fragment,{children:["Updated at"," ",new Date(t.updatedAt).toLocaleString("en-US")]})}),x==t.owner&&(0,r.jsx)(m.Z,{sx:{marginTop:1,marginBottom:1}}),(0,r.jsx)(R.Z,{direction:"row",spacing:1,children:(0,r.jsx)(N.Z,{label:t.status,size:"small"})})]})]})]})};let O=(e,t)=>{let[i,r]=(0,y.useState)(!1),n=(0,b.I0)();return(0,y.useEffect)(()=>{let t=async()=>{r(!0);try{let t="/api/get-all-quizzes?",i=await v.Z.get(t);n((0,T.OK)(i.data));let r=await v.Z.get(t+"ongoing=true&status=public");n((0,T.oq)(r.data));let a=await v.Z.get(t+"upcoming=true&status=public");n((0,T.a9)(a.data));let l=await v.Z.get(t+"finished=true&status=public");if(n((0,T.jI)(l.data)),void 0!==e){t+="owner="+e+"&";let i=await v.Z.get(t);n((0,T.c3)(i.data))}}catch(e){n((0,q.wN)({type:"error",message:"An error occurred while fetching quizzes"})),console.error(e)}finally{r(!1)}};return t(),()=>{n((0,T.vu)())}},[n]),i};var A=i(38547),F=i(50703),U=i(38418),Y=i(71819),X=i(72708),H=i(36178);let V=()=>{let[e,t]=(0,y.useState)(!1),[i,n]=(0,y.useState)(!1),[a,l]=(0,y.useState)(!1),[s,d]=(0,y.useState)(0),x=(0,g.Z)(),{address:m,isConnecting:h,isConnected:p}=(0,z.m)(),j=(0,b.v9)(e=>e.quizCards.userQuizzes),q=(0,b.v9)(e=>e.quizCards.ongoingQuizzes),T=(0,b.v9)(e=>e.quizCards.upcomingQuizzes),S=(0,b.v9)(e=>e.quizCards.finishedQuizzes),B=O(m,0),P=(0,Z.useRouter)();return(0,y.useEffect)(()=>{async function e(){try{let e=await v.Z.get("/api/get-balance?id=".concat(m)),t=e.data;d(t.balance)}catch(e){}}m?e():d(0)},[p,P]),(0,r.jsxs)(o.Z,{sx:{my:4,width:"100%"},children:[(0,r.jsxs)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"2rem"},children:[(0,r.jsx)(u.Z,{variant:"contained",startIcon:(0,r.jsx)(A.Z,{style:{color:x.palette.primary.main}}),sx:{mr:1},style:{backgroundColor:x.palette.secondary.main,color:x.palette.primary.main},onClick:()=>t(!0),children:"Create Quiz"}),(0,r.jsx)(k,{openModal:e,children:(0,r.jsx)(w,{openModal:e,setOpenModal:t})}),(0,r.jsx)(u.Z,{variant:"contained",startIcon:(0,r.jsx)(F.Z,{style:{color:x.palette.primary.main}}),style:{backgroundColor:x.palette.secondary.main,color:x.palette.primary.main},onClick:()=>n(!0),children:"Take Quiz"}),(0,r.jsx)(k,{openModal:i,children:(0,r.jsx)(f,{openModal:i,setOpenModal:n})}),p&&(0,r.jsx)(u.Z,{variant:"contained",startIcon:(0,r.jsx)(U.Z,{style:{color:x.palette.primary.main}}),style:{backgroundColor:x.palette.secondary.main,color:x.palette.primary.main,marginLeft:10},onClick:()=>P.push("/myresults"),children:"View Results"})]}),p&&(0,r.jsxs)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"2rem"},children:[(0,r.jsxs)(c.Z,{variant:"h6",component:"h6",align:"left",gutterBottom:!0,fontWeight:"bold",mt:1,children:["Your Prize: ",s," EDU"]}),(0,r.jsx)(u.Z,{variant:"contained",startIcon:(0,r.jsx)(Y.Z,{style:{color:x.palette.primary.main}}),style:{backgroundColor:x.palette.secondary.main,color:x.palette.primary.main,marginLeft:10},onClick:()=>l(!0),children:"Withdraw"}),(0,r.jsx)(k,{openModal:a,children:(0,r.jsx)(C,{openModal:a,setOpenModal:l})})]}),p&&(0,r.jsxs)("div",{style:{marginTop:"4rem"},children:[(0,r.jsxs)(c.Z,{variant:"h6",component:"h6",align:"left",gutterBottom:!0,fontWeight:"bold",mb:2,children:["Your Created Quizzes (",j.length,")"]}),B||h?(0,r.jsx)("div",{style:{display:"flex",justifyContent:"center"},children:(0,r.jsx)(X.Z,{color:"primary"})}):(0,r.jsx)(H.ZP,{container:!0,spacing:2,sx:{justifyContent:"start"},children:j.map((e,t)=>(0,r.jsx)(H.ZP,{item:!0,children:(0,r.jsx)(_,{quiz:e,index:t})},e.id))})]}),(0,r.jsxs)("div",{style:{marginTop:"4rem"},children:[(0,r.jsxs)(c.Z,{variant:"h6",component:"h6",align:"left",gutterBottom:!0,fontWeight:"bold",mb:2,children:["Ongoing Public Quizzes (",q.length,")"]}),B?(0,r.jsx)("div",{style:{display:"flex",justifyContent:"center"},children:(0,r.jsx)(X.Z,{color:"primary"})}):(0,r.jsx)(H.ZP,{container:!0,spacing:2,sx:{justifyContent:"start"},children:q.map((e,t)=>(0,r.jsx)(H.ZP,{item:!0,children:(0,r.jsx)(_,{quiz:e,index:t})},e.id))})]}),(0,r.jsxs)("div",{style:{marginTop:"4rem"},children:[(0,r.jsxs)(c.Z,{variant:"h6",component:"h6",align:"left",gutterBottom:!0,fontWeight:"bold",mb:2,children:["Upcoming Public Quizzes (",T.length,")"]}),B?(0,r.jsx)("div",{style:{display:"flex",justifyContent:"center"},children:(0,r.jsx)(X.Z,{color:"primary"})}):(0,r.jsx)(H.ZP,{container:!0,spacing:2,sx:{justifyContent:"start"},children:T.map((e,t)=>(0,r.jsx)(H.ZP,{item:!0,children:(0,r.jsx)(_,{quiz:e,index:t})},e.id))})]}),(0,r.jsxs)("div",{style:{marginTop:"4rem"},children:[(0,r.jsxs)(c.Z,{variant:"h6",component:"h6",align:"left",gutterBottom:!0,fontWeight:"bold",mb:2,children:["Finished Public Quizzes (",S.length,")"]}),B?(0,r.jsx)("div",{style:{display:"flex",justifyContent:"center"},children:(0,r.jsx)(X.Z,{color:"primary"})}):(0,r.jsx)(H.ZP,{container:!0,spacing:2,sx:{justifyContent:"start"},children:S.map((e,t)=>(0,r.jsx)(H.ZP,{item:!0,children:(0,r.jsx)(_,{quiz:e,index:t})},e.id))})]})]})};var K=V}},function(e){e.O(0,[786,650,807,774,888,179],function(){return e(e.s=65015)}),_N_E=e.O()}]);