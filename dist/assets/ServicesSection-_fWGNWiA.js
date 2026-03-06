import{j as e,m as l,b as o,U as p,G as m,A as h,S as u,M as g,W as b,P as f,a as w}from"./index-sYPm-Mna.js";import{b as i,M as v,T as j,R as N,C as S,c as k,d as y,P as C,u as T,L as n}from"./map-B1x1XpeD.js";import"./building-2-CKnac04M.js";import{N as I}from"./navigation-BbXyK8U3.js";/* empty css                */delete n.Icon.Default.prototype._getIconUrl;n.Icon.Default.mergeOptions({iconRetinaUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",iconUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",shadowUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"});const M=(t,r=!1)=>{const c=`
    <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
          <feOffset dx="0" dy="2" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path d="M20 0C11.716 0 5 6.716 5 15c0 8.284 15 35 15 35s15-26.716 15-35c0-8.284-6.716-15-15-15z" 
            fill="${t}" filter="url(#shadow)" stroke="white" stroke-width="${r?"3":"2"}"/>
      <circle cx="20" cy="15" r="6" fill="white" opacity="0.9"/>
      ${r?'<circle cx="20" cy="15" r="4" fill="white"><animate attributeName="r" values="4;6;4" dur="1.5s" repeatCount="indefinite"/></circle>':""}
    </svg>
  `;return n.divIcon({html:c,className:"custom-marker",iconSize:[40,50],iconAnchor:[20,50],popupAnchor:[0,-50]})},P=({selectedCity:t})=>{const r=T();return i.useEffect(()=>{t&&r.flyTo(t.coords,10,{duration:1.5,easeLinearity:.5})},[t,r]),null},z=()=>{const[t,r]=i.useState(null),[c,R]=i.useState(!1),d=[{id:"melbourne",name:"Melbourne",coords:[-37.8136,144.9631],response:"Prompt support",responseTime:"Same-day for most issues",description:"Helping small businesses across greater Melbourne with reliable IT support.",coverage:["CBD","Inner Suburbs","Eastern Suburbs","Western Suburbs","Northern Suburbs","Bayside"],color:"#3b82f6",clients:null,services:["Remote Support","Onsite Visits","Microsoft 365 Setup","Business Protection"],isHighlight:!0},{id:"geelong",name:"Geelong",coords:[-38.1499,144.3617],response:"Same/next-day",responseTime:"Varies by location",description:"Supporting local businesses along the surf coast with practical IT help.",coverage:["Geelong CBD","Bellarine Peninsula","Surf Coast","Golden Plains"],color:"#10b981",clients:null,services:["Remote Support","Onsite Visits","Cloud Setup"],isHighlight:!0},{id:"ballarat",name:"Ballarat",coords:[-37.5622,143.8503],response:"Scheduled visits",responseTime:"Planned onsite availability",description:"Reliable IT support for regional businesses in the goldfields.",coverage:["Ballarat","Daylesford","Creswick","Ararat","Skipton"],color:"#a855f7",clients:null,services:["Remote Support","Planned Onsite","Backup Setup"],isHighlight:!0},{id:"bendigo",name:"Bendigo",coords:[-36.757,144.2794],response:"Scheduled visits",responseTime:"Planned onsite availability",description:"Helping central Victorian businesses with practical IT solutions.",coverage:["Bendigo","Castlemaine","Echuca","Shepparton"],color:"#f59e0b",clients:null,services:["Remote Support","Planned Visits","Cloud Setup"],isHighlight:!0},{id:"warrnambool",name:"Warrnambool",coords:[-38.3815,142.486],response:"Remote-first",responseTime:"Remote support available",description:"Supporting south‑west Victoria with remote IT help and planned visits.",coverage:["Warrnambool","Port Fairy","Portland"],color:"#06b6d4",clients:null,services:["Remote Support","Planned Visits"],isHighlight:!1},{id:"mildura",name:"Mildura",coords:[-34.1889,142.1583],response:"Remote-first",responseTime:"Remote support available",description:"Helping northern Victorian businesses with cloud and remote IT support.",coverage:["Mildura","Swan Hill","Ouyen"],color:"#ec4899",clients:null,services:["Remote Support","Cloud Setup"],isHighlight:!1}];return e.jsxs("section",{id:"areas",className:"relative py-20 lg:py-32 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden",children:[e.jsx("div",{className:"absolute inset-0",children:e.jsx("div",{className:"absolute top-1/2 left-0 w-full h-1/2 bg-gradient-to-t from-blue-600/5 to-transparent"})}),e.jsxs("div",{className:"relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[e.jsxs(l.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},className:"text-center max-w-3xl mx-auto mb-16",children:[e.jsx("span",{className:"inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-4",children:"Interactive Service Coverage"}),e.jsxs("h2",{className:"text-4xl lg:text-5xl font-black text-white mb-6",id:"areas-heading",children:["Local IT Support for"," ",e.jsx("span",{className:"bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent",children:"All of Victoria"})]}),e.jsx("p",{className:"text-lg text-slate-400",children:"Click any location on the map to see detailed coverage, response times, and services available in that area."})]}),e.jsxs("div",{className:"grid lg:grid-cols-3 gap-8 items-start",children:[e.jsxs("div",{className:"space-y-3 lg:sticky lg:top-24 max-h-[600px] overflow-y-auto",children:[e.jsx("h3",{className:"text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2",children:"Select Location"}),d.map((s,a)=>e.jsxs(l.button,{initial:{opacity:0,x:-20},whileInView:{opacity:1,x:0},viewport:{once:!0},transition:{delay:a*.05},onClick:()=>r(s),className:`w-full text-left p-4 rounded-2xl transition-all duration-300 group ${(t==null?void 0:t.id)===s.id?"bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg":"bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20"}`,children:[e.jsxs("div",{className:"flex items-center gap-3 mb-2",children:[e.jsx("div",{className:"w-3 h-3 rounded-full",style:{backgroundColor:s.color}}),e.jsx("h3",{className:`font-bold ${(t==null?void 0:t.id)===s.id?"text-white":"text-slate-300 group-hover:text-white"}`,children:s.name}),s.isHighlight&&e.jsx("span",{className:"ml-auto text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full",children:"Priority"})]}),e.jsxs("p",{className:`text-xs ${(t==null?void 0:t.id)===s.id?"text-white/80":"text-slate-500 group-hover:text-slate-400"}`,children:[e.jsx(o,{className:"w-3 h-3 inline mr-1"}),s.response]}),e.jsxs("p",{className:`text-xs mt-1 ${(t==null?void 0:t.id)===s.id?"text-white/70":"text-slate-600 group-hover:text-slate-500"}`,children:[e.jsx(p,{className:"w-3 h-3 inline mr-1"}),s.clients," businesses protected"]})]},s.id))]}),e.jsx("div",{className:"lg:col-span-2",children:e.jsxs(m,{className:"overflow-hidden",gradient:!0,children:[e.jsxs("div",{className:"relative h-[500px] lg:h-[600px] w-full rounded-xl overflow-hidden",children:[e.jsx("style",{children:`
                  .leaflet-container {
                    height: 100%;
                    width: 100%;
                    background: rgba(15, 23, 42, 0.5) !important;
                    border-radius: 1rem;
                  }
                  .leaflet-tile-pane {
                    opacity: 0.7;
                  }
                  .leaflet-popup-content-wrapper {
                    background: rgba(15, 23, 42, 0.95);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 1rem;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
                  }
                  .leaflet-popup-content {
                    margin: 0;
                    padding: 1rem;
                    color: white;
                    min-width: 200px;
                  }
                  .leaflet-popup-tip {
                    background: rgba(15, 23, 42, 0.95);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                  }
                  .custom-marker {
                    background: none;
                    border: none;
                  }
                  .leaflet-tooltip {
                    background: rgba(15, 23, 42, 0.95);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: white;
                    border-radius: 0.5rem;
                    padding: 0.5rem 0.75rem;
                    font-weight: 600;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
                  }
                  .leaflet-tooltip::before {
                    border-top-color: rgba(15, 23, 42, 0.95);
                  }
                  /* Prevent map from overflowing during scroll */
                  .leaflet-container {
                    position: relative !important;
                  }
                  .leaflet-pane {
                    z-index: 1 !important;
                  }
                  .leaflet-control-container {
                    position: absolute !important;
                  }
                `}),e.jsxs(v,{center:[-37.4713,144.7852],zoom:7,scrollWheelZoom:!0,zoomControl:!0,style:{height:"100%",width:"100%",position:"relative",zIndex:1},maxBounds:[[-39.5,140.5],[-33.5,150.5]],minZoom:6,maxZoom:12,children:[e.jsx(j,{attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),e.jsx(P,{selectedCity:t}),d.map(s=>e.jsxs(N.Fragment,{children:[e.jsx(S,{center:s.coords,radius:s.isHighlight?35e3:25e3,pathOptions:{fillColor:s.color,fillOpacity:.15,color:s.color,weight:2,opacity:.6}}),e.jsxs(k,{position:s.coords,icon:M(s.color,(t==null?void 0:t.id)===s.id),eventHandlers:{click:()=>r(s)},children:[e.jsx(y,{direction:"top",offset:[0,-45],permanent:s.isHighlight,children:s.name}),e.jsx(C,{children:e.jsxs("div",{className:"p-2",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[e.jsx("div",{className:"w-3 h-3 rounded-full",style:{backgroundColor:s.color}}),e.jsx("h3",{className:"font-bold text-lg",children:s.name})]}),e.jsx("p",{className:"text-sm text-slate-300 mb-3",children:s.description}),e.jsxs("div",{className:"space-y-2 mb-3",children:[e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:[e.jsx(o,{className:"w-4 h-4 text-green-400"}),e.jsxs("span",{className:"text-slate-300",children:[e.jsx("span",{className:"text-green-400 font-semibold",children:s.responseTime})," response"]})]}),e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:[e.jsx(p,{className:"w-4 h-4 text-blue-400"}),e.jsxs("span",{className:"text-slate-300",children:[e.jsx("span",{className:"text-blue-400 font-semibold",children:s.clients})," businesses protected"]})]})]}),e.jsxs("div",{className:"pt-3 border-t border-white/10",children:[e.jsx("p",{className:"text-xs text-slate-400 mb-2",children:"Services Available:"}),e.jsx("div",{className:"flex flex-wrap gap-1",children:s.services.map((a,x)=>e.jsx("span",{className:"text-xs px-2 py-1 bg-white/10 rounded-full text-slate-300",children:a},x))})]})]})})]})]},s.id))]})]}),e.jsx(h,{children:t&&e.jsxs(l.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"p-6 border-t border-white/10",children:[e.jsxs("div",{className:"flex items-start justify-between mb-4",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center gap-3 mb-2",children:[e.jsx("div",{className:"w-4 h-4 rounded-full",style:{backgroundColor:t.color}}),e.jsx("h3",{className:"text-2xl font-bold text-white",children:t.name})]}),e.jsx("p",{className:"text-slate-400",children:t.description})]}),e.jsxs("div",{className:"flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full",children:[e.jsx(o,{className:"w-4 h-4 text-green-400"}),e.jsx("span",{className:"text-green-400 font-medium text-sm",children:t.response})]})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("h4",{className:"text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3",children:"Coverage Areas"}),e.jsx("div",{className:"flex flex-wrap gap-2",children:t.coverage.map((s,a)=>e.jsx("span",{className:"px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-slate-300 text-sm",children:s},a))})]}),e.jsx("div",{className:"grid grid-cols-2 gap-3",children:[{icon:u,text:t.services[0],color:"text-blue-400"},{icon:g,text:t.services[1],color:"text-green-400"},{icon:b,text:t.services[2],color:"text-purple-400"},{icon:I,text:t.services[3]||"Full Support",color:"text-amber-400"}].map((s,a)=>e.jsxs("div",{className:"flex items-center gap-3 p-3 bg-white/5 rounded-xl",children:[e.jsx(s.icon,{className:`w-5 h-5 ${s.color}`}),e.jsx("span",{className:"text-slate-300 font-medium text-sm",children:s.text})]},a))})]})})]})})]}),e.jsx(l.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},className:"mt-12",children:e.jsx(m,{className:"p-6 lg:p-8",children:e.jsxs("div",{className:"flex flex-col lg:flex-row items-center justify-between gap-6",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"p-3 rounded-xl bg-blue-500/10",children:e.jsx(f,{className:"w-6 h-6 text-blue-400"})}),e.jsxs("div",{children:[e.jsx("h4",{className:"text-lg font-bold text-white",children:"Remote Support Available Australia-Wide"}),e.jsx("p",{className:"text-slate-400",children:"Can't find your area? We provide full remote support to any location in Australia."})]})]}),e.jsxs("a",{href:"#contact",className:"inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all whitespace-nowrap group",children:["Check Your Area",e.jsx(w,{className:"w-5 h-5 group-hover:translate-x-1 transition-transform"})]})]})})})]})]})};export{z as default};
