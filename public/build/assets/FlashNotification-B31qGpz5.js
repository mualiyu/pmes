import{a,X as d,r as g,j as t,W as f,B as h}from"./app-CQeDVQuS.js";import{u as y}from"./use-disclosure-CHrwo5eQ.js";import{A as _,I as x}from"./IconInfoCircle-BGpsp2Nq.js";import{I as C}from"./IconCircleX-D9_CrJfg.js";import{c as l}from"./createReactComponent-Z0-s2Pq0.js";/**
 * @license @tabler/icons-react v3.34.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var I=l("outline","alert-circle","IconAlertCircle",[["path",{d:"M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0",key:"svg-0"}],["path",{d:"M12 8v4",key:"svg-1"}],["path",{d:"M12 16h.01",key:"svg-2"}]]);/**
 * @license @tabler/icons-react v3.34.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var j=l("outline","circle-check","IconCircleCheck",[["path",{d:"M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0",key:"svg-0"}],["path",{d:"M9 12l2 2l4 -4",key:"svg-1"}]]);const k="_container_1uds7_1",v="_icon_1uds7_10",b="_title_1uds7_17",w="_label_1uds7_21",M="_message_1uds7_26",o={container:k,icon:v,title:b,label:w,message:M},s={style:{width:a(50),height:a(50)},stroke:2},i={info:{color:"blue",timeout:8e3,icon:t.jsx(x,{...s})},success:{color:"green",timeout:4e3,icon:t.jsx(j,{...s})},warning:{color:"yellow",timeout:1e4,icon:t.jsx(I,{...s})},error:{color:"red",timeout:1e4,icon:t.jsx(C,{...s})}};function N(){const[m,{open:u,close:r}]=y(!1),{flash:e}=d().props;g.useEffect(()=>{var c;u();const n=setTimeout(()=>r(),(c=i[e==null?void 0:e.type])==null?void 0:c.timeout);return()=>clearTimeout(n)},[e]);const p={in:{opacity:1,transform:"translate(-50%, 0)"},out:{opacity:0,transform:"translate(-50%, -100%)"},common:{transformOrigin:"top"},transitionProperty:"transform, opacity"};return t.jsx(f,{mounted:m,transition:p,duration:300,exitDuration:600,timingFunction:"easeOut",children:n=>t.jsx(h,{mb:"lg",style:n,className:o.container,children:e&&t.jsx(_,{variant:"filled",color:i[e.type].color,title:e.title,icon:i[e.type].icon,classNames:{icon:o.icon,title:o.title,label:o.label,message:o.message},radius:"md",withCloseButton:!0,onClose:r,children:e.message})})})}export{N as F};
