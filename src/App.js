const LOGO_URI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB4AAAATzCAYAAACT/C80AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAP+lSURBVHhe7P3neyTZdSd+fr/3hsmMjMhEZsJWdXnbl";

import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";

const NAV_LINKS = ["Work", "Studio", "Services", "Plans", "Contact"];

const PROJECTS = [
  { id:1,  title:"Forest Cabin Residence",   area:"2,200 sq.ft", floors:"G+1",    rooms:"3 BHK", price:4999,  gradient:"linear-gradient(135deg,#4a6741,#8B7355)", includes:"Floor Plan · Elevation · Section · 3D View", imgData:null },
  { id:2,  title:"Q Arch Signature Home",    area:"2,800 sq.ft", floors:"G+1",    rooms:"4 BHK", price:5999,  gradient:"linear-gradient(135deg,#7a6a5a,#C4A882)", includes:"Floor Plan · Elevation · Section · 3D View", imgData:null },
  { id:3,  title:"Stone Manor Villa",        area:"3,500 sq.ft", floors:"G+2",    rooms:"5 BHK", price:7999,  gradient:"linear-gradient(135deg,#5a4e44,#9E8B7A)", includes:"Full Architectural + Structural Drawings", imgData:null },
  { id:4,  title:"Grand Heritage House",     area:"4,000 sq.ft", floors:"G+2",    rooms:"5 BHK", price:8999,  gradient:"linear-gradient(135deg,#3d3528,#8B7355)", includes:"Full Architectural + Structural Drawings", imgData:null },
  { id:5,  title:"Countryside Craftsman",    area:"1,800 sq.ft", floors:"Ground", rooms:"3 BHK", price:4499,  gradient:"linear-gradient(135deg,#5c6b4a,#A89070)", includes:"Floor Plan · Elevation · Section", imgData:null },
  { id:6,  title:"Contemporary Farmhouse",   area:"2,500 sq.ft", floors:"G+1",    rooms:"4 BHK", price:5499,  gradient:"linear-gradient(135deg,#6b5e4e,#C0A882)", includes:"Floor Plan · Elevation · Section · 3D View", imgData:null },
  { id:7,  title:"Classic Brick Elevation",  area:"3,000 sq.ft", floors:"G+1",    rooms:"4 BHK", price:6499,  gradient:"linear-gradient(135deg,#7a4a38,#B87858)", includes:"Full Architectural Set + Interior Layout", imgData:null },
  { id:8,  title:"Luxury Estate Front",      area:"4,500 sq.ft", floors:"B+G+2",  rooms:"6 BHK", price:9999,  gradient:"linear-gradient(135deg,#2a2a3a,#5a6a8a)", includes:"Complete Working Drawing Set", imgData:null },
  { id:9,  title:"Modern Villa at Dusk",     area:"3,200 sq.ft", floors:"G+2",    rooms:"4 BHK", price:6999,  gradient:"linear-gradient(135deg,#3a3a4a,#7a7a9a)", includes:"Floor Plan · Elevation · Section · 3D View", imgData:null },
  { id:10, title:"Stone & Timber Residence", area:"3,400 sq.ft", floors:"G+2",    rooms:"5 BHK", price:7499,  gradient:"linear-gradient(135deg,#4a3828,#8a6848)", includes:"Full Architectural + Structural Drawings", imgData:null },
  { id:11, title:"White Colonial Manor",     area:"3,800 sq.ft", floors:"G+2",    rooms:"5 BHK", price:8499,  gradient:"linear-gradient(135deg,#6a6a5a,#BCBCAC)", includes:"Full Architectural + Interior Design", imgData:null },
  { id:12, title:"Tudor Night Render",       area:"2,600 sq.ft", floors:"G+1",    rooms:"4 BHK", price:5999,  gradient:"linear-gradient(135deg,#2a1e16,#6a4e3e)", includes:"Floor Plan · Elevation · Section · 3D View", imgData:null },
  { id:13, title:"Brick Gabled Home",        area:"2,200 sq.ft", floors:"G+1",    rooms:"3 BHK", price:4999,  gradient:"linear-gradient(135deg,#5a3a28,#9A6A4A)", includes:"Floor Plan · Elevation · Section · 3D View", imgData:null },
  { id:14, title:"Tudor Countryside Villa",  area:"3,100 sq.ft", floors:"G+1",    rooms:"4 BHK", price:6999,  gradient:"linear-gradient(135deg,#3e3028,#7E6048)", includes:"Full Architectural Set + Structural Design", imgData:null },
  { id:15, title:"Night Illuminated Estate", area:"5,000 sq.ft", floors:"B+G+2",  rooms:"6 BHK", price:11999, gradient:"linear-gradient(135deg,#1a1a2a,#4a4a6a)", includes:"Premium Complete Working Drawings", imgData:null },
];

const SERVICES = [
  { num:"01", title:"Architectural Design & Drawing",  desc:"From concept sketches to full construction documents — we translate your vision into precise, buildable drawings." },
  { num:"02", title:"Interior Modelling",              desc:"Thoughtful 3D interior modelling balancing aesthetics, functionality, and the way your family lives." },
  { num:"03", title:"Exterior Modelling",              desc:"Photorealistic exterior visualisations that capture character and setting of every building." },
  { num:"04", title:"Structural Design & Detailing",   desc:"Precise structural drawings ensuring safety and compliance — especially vital for J&K snow-load conditions." },
];

const STATS = [
  { value:"15+", label:"Projects" },
  { value:"5+",  label:"Years" },
  { value:"100%",label:"Satisfaction" },
  { value:"J&K", label:"Based In" },
];

const ADMIN_PASSWORD = "qarch2026";
const EMPTY_PROJECT = {
  id: Date.now(), title:"", area:"", floors:"G+1", rooms:"3 BHK",
  price:"", gradient:"linear-gradient(135deg,#7a6a5a,#C4A882)",
  includes:"Floor Plan · Elevation · Section · 3D View", imgData:null,
};
const GRADIENTS = [
  { label:"Warm Brown",   value:"linear-gradient(135deg,#7a6a5a,#C4A882)" },
  { label:"Forest Green", value:"linear-gradient(135deg,#4a6741,#8B7355)" },
  { label:"Stone Grey",   value:"linear-gradient(135deg,#5a4e44,#9E8B7A)" },
  { label:"Dark Slate",   value:"linear-gradient(135deg,#2a2a3a,#5a6a8a)" },
  { label:"Brick Red",    value:"linear-gradient(135deg,#7a4a38,#B87858)" },
  { label:"Night Blue",   value:"linear-gradient(135deg,#1a1a2a,#4a4a6a)" },
];

// Shared tiny styles
const ov  = { position:"fixed",inset:0,background:"rgba(0,0,0,0.82)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:16,overflowY:"auto" };
const md  = { background:"#fff",width:"100%",maxWidth:440,padding:"28px 22px",position:"relative",maxHeight:"92vh",overflowY:"auto",margin:"auto" };
const cls = { position:"absolute",top:12,right:12,background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#888" };
const fld = { display:"flex",flexDirection:"column",gap:6 };
const lbl = { fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase",color:"#888",fontWeight:500 };
const inp = { border:"1px solid #ddd",padding:"11px 13px",fontSize:14,outline:"none",width:"100%",color:"#1A1A18",fontFamily:"inherit",borderRadius:0 };
const cinp= { background:"transparent",border:"1px solid rgba(255,255,255,0.15)",padding:"11px 13px",fontSize:14,outline:"none",width:"100%",color:"#F5F3EF",fontFamily:"inherit" };
const csel= { background:"#111",border:"1px solid rgba(255,255,255,0.15)",padding:"11px 13px",fontSize:14,outline:"none",width:"100%",color:"#F5F3EF",fontFamily:"inherit" };

// useWindowWidth hook
function useWW() {
  const [w,setW] = useState(typeof window!=="undefined"?window.innerWidth:1200);
  useEffect(()=>{ const h=()=>setW(window.innerWidth); window.addEventListener("resize",h); return()=>window.removeEventListener("resize",h); },[]);
  return w;
}

// AUTH MODAL
const userStore = {};
function AuthModal({ onClose, onSuccess, pendingProject }) {
  const [mode,setMode]=useState("login");
  const [name,setName]=useState(""); 
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState(""); 
  const [conf,setConf]=useState("");
  const [err,setErr]=useState("");
  
  const submit=()=>{
    setErr("");
    if(mode==="register"){
      if(!name||!email||!pass) return setErr("Please fill all fields.");
      if(pass!==conf)          return setErr("Passwords do not match.");
      if(userStore[email])     return setErr("Email already registered.");
      userStore[email]={name,password:pass,purchases:[]};
      onSuccess({email,name});
    } else {
      if(!email||!pass) return setErr("Enter email and password.");
      const u=userStore[email];
      if(!u||u.password!==pass) return setErr("Incorrect email or password.");
      onSuccess({email,name:u.name});
    }
  };
  
  return (
    <div style={ov} onClick={onClose}>
      <div style={md} onClick={e=>e.stopPropagation()}>
        <button style={cls} onClick={onClose}>✕</button>
        <div style={{fontWeight:500,fontSize:13,letterSpacing:"0.2em",color:"#8B6F47",marginBottom:14}}>◐ Q ARCH</div>
        {pendingProject&&<div style={{background:"#FFF8F0",border:"1px solid #EED8B0",padding:"9px 12px",fontSize:13,color:"#555",marginBottom:16,lineHeight:1.5}}>
          To purchase <strong>"{pendingProject.title}"</strong> please log in or register.
        </div>}
        <div style={{display:"flex",borderBottom:"2px solid #eee",marginBottom:20}}>
          {["login","register"].map(m=>(
            <button key={m} onClick={()=>{setMode(m);setErr("");}}
              style={{flex:1,background:"none",border:"none",padding:"9px 0",fontSize:14,cursor:"pointer",
                fontWeight:mode===m?600:400,color:mode===m?"#1A1A18":"#888",
                borderBottom:mode===m?"2px solid #8B6F47":"none",marginBottom:mode===m?-2:0}}>
              {m==="login"?"Log In":"Register"}
            </button>
          ))}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:13}}>
          {mode==="register"&&<div style={fld}><label style={lbl}>Full Name</label><input style={inp} placeholder="Mohammad Aamir" value={name} onChange={e=>setName(e.target.value)}/></div>}
          <div style={fld}><label style={lbl}>Email</label><input style={inp} placeholder="you@email.com" value={email} onChange={e=>setEmail(e.target.value)}/></div>
          <div style={fld}><label style={lbl}>Password</label><input style={inp} type="password" placeholder="••••••••" value={pass} onChange={e=>setPass(e.target.value)}/></div>
          {mode==="register"&&<div style={fld}><label style={lbl}>Confirm Password</label><input style={inp} type="password" placeholder="••••••••" value={conf} onChange={e=>setConf(e.target.value)}/></div>}
          {err&&<p style={{color:"#c62828",fontSize:13,background:"#FFEBEE",padding:"8px 11px"}}>{err}</p>}
          <button onClick={submit} style={{background:"#1A1A18",color:"#fff",border:"none",padding:"13px",fontSize:14,fontWeight:500,cursor:"pointer"}}>
            {mode==="register"?"Create Account →":"Log In →"}
          </button>
          <p style={{fontSize:13,color:"#888",textAlign:"center"}}>
            {mode==="login"?"New? ":"Have account? "}
            <span style={{color:"#8B6F47",cursor:"pointer",fontWeight:500,textDecoration:"underline"}} onClick={()=>{setMode(mode==="login"?"register":"login");setErr("");}}>
              {mode==="login"?"Create account":"Log in"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

// PAYMENT MODAL
function PaymentModal({ project, user, onClose, onSuccess }) {
  const [step,setStep]=useState("form");
  const [method,setMethod]=useState("upi");
  const [upiId,setUpiId]=useState(""); 
  const [card,setCard]=useState("");
  const [expiry,setExpiry]=useState(""); 
  const [cvv,setCvv]=useState("");
  const [err,setErr]=useState("");
  
  const fmt=n=>"₹"+n.toLocaleString("en-IN");
  
  const pay=()=>{
    setErr("");
    if(method==="upi"&&!upiId.includes("@")) return setErr("Enter valid UPI ID e.g. name@upi");
    if(method==="card"&&card.replace(/\s/g,"").length<16) return setErr("Enter valid 16-digit card number.");
    setStep("processing");
    setTimeout(()=>{if(userStore[user.email])userStore[user.email].purchases.push(project.id);setStep("done");},2000);
  };
  
  return (
    <div style={ov} onClick={onClose}>
      <div style={{...md,maxWidth:460}} onClick={e=>e.stopPropagation()}>
        <button style={cls} onClick={onClose}>✕</button>
        {step==="form"&&<>
          <div style={{display:"flex",gap:13,alignItems:"flex-start",marginBottom:16}}>
            <div style={{width:80,height:64,flexShrink:0,background:project.imgData?`url(${project.imgData})`:project.gradient,backgroundSize:"cover"}}/>
            <div>
              <p style={{fontSize:15,fontWeight:500,color:"#1A1A18",marginBottom:3}}>{project.title}</p>
              <p style={{fontSize:11,color:"#888",lineHeight:1.5,marginBottom:5}}>📄 {project.includes}</p>
              <p style={{fontSize:20,fontWeight:700,color:"#8B6F47"}}>{fmt(project.price)}</p>
            </div>
          </div>
          <div style={{height:1,background:"#eee",marginBottom:16}}/>
          <p style={{fontSize:12,fontWeight:600,color:"#555",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:9}}>Payment Method</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:9,marginBottom:16}}>
            {[["upi","📱 UPI"],["card","💳 Card"],["netbanking","🏦 Net Banking"]].map(([m,label])=>(
              <div key={m} onClick={()=>setMethod(m)} style={{border:method===m?"2px solid #8B6F47":"1px solid #ddd",padding:"9px 5px",textAlign:"center",fontSize:12,cursor:"pointer",color:method===m?"#1A1A18":"#888"}}>
                {label}
              </div>
            ))}
          </div>
          {method==="upi"&&<div style={fld}><label style={lbl}>UPI ID</label><input style={inp} placeholder="name@ybl" value={upiId} onChange={e=>setUpiId(e.target.value)}/></div>}
          {method==="card"&&<div style={{display:"flex",flexDirection:"column",gap:11}}>
            <div style={fld}><label style={lbl}>Card Number</label><input style={inp} placeholder="1234 5678 9012 3456" maxLength={19} value={card} onChange={e=>setCard(e.target.value)}/></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
              <div style={fld}><label style={lbl}>Expiry</label><input style={inp} placeholder="08/27" maxLength={5} value={expiry} onChange={e=>setExpiry(e.target.value)}/></div>
              <div style={fld}><label style={lbl}>CVV</label><input style={inp} type="password" placeholder="•••" maxLength={3} value={cvv} onChange={e=>setCvv(e.target.value)}/></div>
            </div>
          </div>}
          {method==="netbanking"&&<p style={{background:"#F8F9FA",border:"1px solid #eee",padding:"13px",fontSize:13,color:"#555"}}>You will be redirected to your bank's secure page.</p>}
          {err&&<p style={{color:"#c62828",fontSize:13,background:"#FFEBEE",padding:"8px 11px",marginTop:11}}>{err}</p>}
          <p style={{fontSize:11,color:"#aaa",textAlign:"center",margin:"14px 0 10px"}}>🔒 Secure Payment · Files delivered instantly</p>
          <button onClick={pay} style={{background:"#2E7D32",color:"#fff",border:"none",padding:"14px",width:"100%",fontSize:15,fontWeight:700,cursor:"pointer"}}>Pay {fmt(project.price)}</button>
          <p style={{fontSize:12,color:"#aaa",textAlign:"center",marginTop:11}}>Need help? <a href="https://wa.me/919541840665" target="_blank" rel="noopener noreferrer" style={{color:"#25D366"}}>WhatsApp</a></p>
        </>}
        {step==="processing"&&<div style={{textAlign:"center",padding:"50px 20px",display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
          <div style={{width:50,height:50,border:"4px solid #eee",borderTop:"4px solid #8B6F47",borderRadius:"50%",animation:"spin 0.9s linear infinite"}}/>
          <p style={{fontSize:15,color:"#444",fontWeight:500}}>Processing payment…</p>
          <p style={{fontSize:13,color:"#aaa"}}>Please do not close this window.</p>
        </div>}
        {step==="done"&&<div style={{textAlign:"center",padding:"36px 16px",display:"flex",flexDirection:"column",alignItems:"center",gap:14}}>
          <div style={{width:64,height:64,borderRadius:"50%",background:"#4CAF50",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>✓</div>
          <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:300,color:"#1A1A18"}}>Payment Successful!</h3>
          <p style={{color:"#555",fontSize:14,lineHeight:1.7,maxWidth:300}}>Thank you, <strong>{user.name}</strong>! Your files for <strong>"{project.title}"</strong> are ready.</p>
          <button onClick={()=>onSuccess(project)} style={{background:"#1A1A18",color:"#fff",border:"none",padding:"13px 32px",fontSize:14,fontWeight:500,cursor:"pointer"}}>⬇ Download Files</button>
        </div>}
      </div>
    </div>
  );
}

// ADMIN PANEL
function AdminPanel({ projects, onUpdate, onClose }) {
  const ww = useWW(); 
  const mob = ww<=768;
  const [authed,setAuthed]=useState(false); 
  const [pw,setPw]=useState(""); 
  const [pwErr,setPwErr]=useState("");
  const [view,setView]=useState("list"); 
  const [form,setForm]=useState({...EMPTY_PROJECT});
  const [saved,setSaved]=useState(false); 
  const [delConf,setDelConf]=useState(null);
  
  const up=(k,v)=>setForm(f=>({...f,[k]:v}));
  
  const handleImg=e=>{
    const file=e.target.files[0];
    if(!file)return;
    const r=new FileReader();
    r.onload=ev=>up("imgData",ev.target.result);
    r.readAsDataURL(file);
  };
  
  const openEdit=p=>{setForm({...p});setView("edit");setSaved(false);};
  const openAdd=()=>{setForm({...EMPTY_PROJECT,id:Date.now()});setView("add");setSaved(false);};
  
  const save=()=>{
    if(!form.title||!form.price) return alert("Title and Price required.");
    const updated = view==="add" ? [...projects,{...form,price:Number(form.price)}]
      : projects.map(p=>p.id===form.id?{...form,price:Number(form.price)}:p);
    onUpdate(updated); 
    setSaved(true); 
    setTimeout(()=>{setSaved(false);setView("list");},1000);
  };
  
  const del=id=>{onUpdate(projects.filter(p=>p.id!==id));setDelConf(null);};
  const move=(idx,dir)=>{const a=[...projects];const t=idx+dir;if(t<0||t>=a.length)return;[a[idx],a[t]]=[a[t],a[idx]];onUpdate(a);};

  if(!authed) return(
    <div style={{...ov,zIndex:600}}>
      <div style={{background:"#1A1A18",padding:"36px 28px",width:"100%",maxWidth:380,position:"relative",border:"1px solid rgba(255,255,255,0.08)"}}>
        <button style={{...cls,color:"#888"}} onClick={onClose}>✕</button>
        <div style={{color:"#8B6F47",fontWeight:500,fontSize:13,letterSpacing:"0.2em",marginBottom:14}}>◐ Q ARCH</div>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:300,color:"#F5F3EF",marginBottom:8}}>Admin Panel</h2>
        <p style={{color:"#888",fontSize:13,marginBottom:22}}>Enter admin password to manage projects.</p>
        <input style={{...cinp,marginBottom:12}} type="password" placeholder="Admin password" value={pw}
          onChange={e=>setPw(e.target.value)}
          onKeyDown={e=>{if(e.key==="Enter"){if(pw===ADMIN_PASSWORD){setAuthed(true);setPwErr("");}else setPwErr("Incorrect password.");}}}/>
        {pwErr&&<p style={{color:"#ef5350",fontSize:13,marginBottom:10}}>{pwErr}</p>}
        <button onClick={()=>{if(pw===ADMIN_PASSWORD){setAuthed(true);setPwErr("");}else setPwErr("Incorrect password. Default: qarch2026");}}
          style={{background:"#8B6F47",color:"#fff",border:"none",padding:"13px",width:"100%",fontSize:14,fontWeight:500,cursor:"pointer"}}>
          Login to Admin Panel
        </button>
      </div>
    </div>
  );

  const toggleIncludes=item=>{
    const parts=(form.includes||"").split(" · ").filter(Boolean);
    const next=parts.includes(item)?parts.filter(p=>p!==item):[...parts,item];
    up("includes",next.join(" · "));
  };

  return(
    <div style={{...ov,zIndex:600,alignItems:"flex-start",paddingTop:0}}>
      <div style={{background:"#111",width:"100%",maxWidth:820,maxHeight:"100vh",display:"flex",flexDirection:"column",border:"1px solid rgba(255,255,255,0.08)",margin:"auto",overflowY:"hidden"}}>
        
        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 22px",borderBottom:"1px solid rgba(255,255,255,0.08)",flexShrink:0,flexWrap:"wrap",gap:10}}>
          <div>
            <div style={{color:"#8B6F47",fontWeight:500,fontSize:13,letterSpacing:"0.18em"}}>◐ Q ARCH Admin</div>
            <p style={{color:"#888",fontSize:12,marginTop:3}}>{projects.length} projects</p>
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {view==="list"&&<>
              <button onClick={openAdd} style={{background:"#8B6F47",color:"#fff",border:"none",padding:"9px 16px",fontSize:12,fontWeight:500,cursor:"pointer"}}>➕ Add Project</button>
              <button onClick={()=>{if(window.confirm("Reset all projects to defaults?"))onUpdate(null);}}
                style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.15)",color:"#888",padding:"9px 14px",fontSize:12,cursor:"pointer"}}>↺ Reset</button>
            </>}
            <button onClick={onClose} style={{background:"transparent",border:"1px solid rgba(255,255,255,0.15)",color:"#aaa",padding:"9px 16px",fontSize:12,cursor:"pointer"}}>✕ Close</button>
          </div>
        </div>

        {/* Body */}
        <div style={{overflowY:"auto",flex:1,padding:"20px 22px"}}>
          {view==="list"&&<>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:10}}>
              <p style={{color:"#888",fontSize:12}}>Edit, reorder or delete projects.</p>
            </div>
            {delConf&&<div style={{background:"rgba(239,83,80,0.08)",border:"1px solid rgba(239,83,80,0.2)",padding:"16px",marginBottom:16}}>
              <p style={{color:"#F5F3EF",fontSize:13,marginBottom:12}}>Delete <strong>"{projects.find(p=>p.id===delConf)?.title}"</strong>?</p>
              <div style={{display:"flex",gap:10}}>
                <button onClick={()=>del(delConf)} style={{background:"#c62828",color:"#fff",border:"none",padding:"9px 20px",fontSize:12,cursor:"pointer"}}>Yes, Delete</button>
                <button onClick={()=>setDelConf(null)} style={{background:"transparent",border:"1px solid rgba(255,255,255,0.15)",color:"#aaa",padding:"9px 16px",fontSize:12,cursor:"pointer"}}>Cancel</button>
              </div>
            </div>}
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {projects.map((p,idx)=>(
                <div key={p.id} style={{display:"flex",gap:12,alignItems:"center",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",padding:12}}>
                  <div style={{width:72,height:54,flexShrink:0,background:p.gradient,backgroundSize:"cover"}}/>
                  <div style={{flex:1,minWidth:0}}>
                    <p style={{color:"#F5F3EF",fontWeight:500,fontSize:14,marginBottom:2}}>{p.title}</p>
                    <p style={{color:"#888",fontSize:11}}>₹{Number(p.price).toLocaleString("en-IN")}</p>
                  </div>
                  <button onClick={()=>openEdit(p)} style={{background:"rgba(139,111,71,0.2)",border:"1px solid rgba(139,111,71,0.4)",color:"#C4A882",padding:"7px 12px",fontSize:11,cursor:"pointer"}}>Edit</button>
                  <button onClick={()=>setDelConf(p.id)} style={{background:"rgba(239,83,80,0.1)",border:"1px solid rgba(239,83,80,0.3)",color:"#ef9a9a",padding:"7px 12px",fontSize:11,cursor:"pointer"}}>Delete</button>
                </div>
              ))}
            </div>
          </>}

          {(view==="add"||view==="edit")&&<div style={{display:"flex",flexDirection:"column",gap:20}}>
            <h3 style={{color:"#F5F3EF",fontSize:16,fontWeight:500}}>{view==="add"?"➕ Add New Project":"✏️ Edit Project"}</h3>
            <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:12}}>
              {[["title","Title *"],["area","Area"],["floors","Floors"],["rooms","Rooms"]].map(([k,label])=>(
                <div key={k} style={fld}>
                  <label style={lbl}>{label}</label>
                  <input style={cinp} value={form[k]||""} onChange={e=>up(k,e.target.value)}/>
                </div>
              ))}
            </div>
            <div style={fld}>
              <label style={lbl}>Price (₹) *</label>
              <input style={{...cinp,maxWidth:200,fontSize:18,fontWeight:600,color:"#8B6F47"}} type="number" placeholder="7999" value={form.price||""} onChange={e=>up("price",e.target.value)}/>
            </div>
            <div style={{display:"flex",gap:12,paddingBottom:20}}>
              <button onClick={save} style={{background:saved?"#4CAF50":"#8B6F47",color:"#fff",border:"none",padding:"12px 28px",fontSize:14,fontWeight:500,cursor:"pointer"}}>
                {saved?"✓ Saved!":view==="add"?"➕ Add Project":"💾 Save Changes"}
              </button>
              <button onClick={()=>setView("list")} style={{background:"transparent",border:"1px solid rgba(255,255,255,0.15)",color:"#aaa",padding:"12px 20px",fontSize:14,cursor:"pointer"}}>Cancel</button>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
}

// CLIENT BRIEF FORM
function ClientBriefForm() {
  const ww=useWW(); 
  const mob=ww<=768;
  const [step,setStep]=useState(1);
  const [submitted,setSubmitted]=useState(false);
  const [form,setForm]=useState({fullName:"",phone:"",email:"",location:"",projectType:"",plotOwned:"",plotLocation:"",plotArea:"",plotDimensions:"",floors:"",bedrooms:"",bathrooms:"",parking:"",specialRooms:[],style:"",budget:"",timeline:"",description:"",vastu:"",snowLoad:"",accessibility:"",notes:""});
  
  const up=(k,v)=>setForm(f=>({...f,[k]:v}));
  const titles=["Personal Info","Project & Site","Space Requirements","Style & Budget","Special Requirements"];

  if(submitted) return(
    <div style={{textAlign:"center",padding:"40px 16px",display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
      <div style={{width:64,height:64,borderRadius:"50%",background:"#4CAF50",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>✓</div>
      <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:300,color:"#F5F3EF"}}>Brief Submitted!</h3>
      <p style={{color:"#888",fontSize:14,lineHeight:1.8,maxWidth:380}}>Thank you <strong style={{color:"#F5F3EF"}}>{form.fullName}</strong>. We'll contact you within 24 hours.</p>
      <a href="https://wa.me/919541840665" target="_blank" rel="noopener noreferrer" style={{background:"#25D366",color:"#fff",padding:"12px 28px",textDecoration:"none",fontSize:14,fontWeight:500}}>💬 Chat on WhatsApp</a>
    </div>
  );

  const F=({label,children})=>(<div style={{display:"flex",flexDirection:"column",gap:7}}><label style={lbl}>{label}</label>{children}</div>);

  return(
    <div style={{marginTop:30}}>
      <p style={{color:"#888",fontSize:12,marginBottom:24}}>Step {step} of 5: <strong style={{color:"#ccc"}}>{titles[step-1]}</strong></p>

      {step===1&&<div style={{display:"flex",flexDirection:"column",gap:18}}>
        <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:14}}>
          <F label="Full Name *"><input style={cinp} placeholder="Mohammad Aamir" value={form.fullName} onChange={e=>up("fullName",e.target.value)}/></F>
          <F label="Phone *"><input style={cinp} placeholder="+91 9XXXXXXXXX" value={form.phone} onChange={e=>up("phone",e.target.value)}/></F>
          <F label="Email"><input style={cinp} placeholder="you@email.com" value={form.email} onChange={e=>up("email",e.target.value)}/></F>
          <F label="Location"><input style={cinp} placeholder="Pulwama, J&K" value={form.location} onChange={e=>up("location",e.target.value)}/></F>
        </div>
      </div>}

      {step===2&&<div style={{display:"flex",flexDirection:"column",gap:18}}>
        <F label="Project Type *">
          <div style={{display:"grid",gridTemplateColumns:mob?"1fr 1fr":"repeat(3,1fr)",gap:9}}>
            {["Residential House","Commercial Building","Renovation"].map(v=>(
              <div key={v} onClick={()=>up("projectType",v)} style={{border:form.projectType===v?"1px solid #8B6F47":"1px solid rgba(255,255,255,0.12)",padding:"10px 12px",fontSize:13,cursor:"pointer",textAlign:"center",color:"#F5F3EF"}}>
                {v}
              </div>
            ))}
          </div>
        </F>
      </div>}

      {step===3&&<div style={{display:"flex",flexDirection:"column",gap:18}}>
        <div style={{display:"grid",gridTemplateColumns:mob?"1fr 1fr":"1fr 1fr 1fr",gap:14}}>
          <F label="Bedrooms *"><select style={csel} value={form.bedrooms} onChange={e=>up("bedrooms",e.target.value)}><option value="">Select</option>{["1","2","3","4","5","6+"].map(o=><option key={o} value={o}>{o}</option>)}</select></F>
          <F label="Bathrooms *"><select style={csel} value={form.bathrooms} onChange={e=>up("bathrooms",e.target.value)}><option value="">Select</option>{["1","2","3","4","5+"].map(o=><option key={o} value={o}>{o}</option>)}</select></F>
          <F label="Floors *"><select style={csel} value={form.floors} onChange={e=>up("floors",e.target.value)}><option value="">Select</option>{["Ground Only","G+1","G+2","G+3"].map(o=><option key={o} value={o}>{o}</option>)}</select></F>
        </div>
      </div>}

      {step===4&&<div style={{display:"flex",flexDirection:"column",gap:18}}>
        <F label="Preferred Style *">
          <div style={{display:"grid",gridTemplateColumns:mob?"1fr 1fr":"repeat(2,1fr)",gap:9}}>
            {["Modern / Contemporary","Traditional Kashmiri","Colonial / Classic"].map(v=>(
              <div key={v} onClick={()=>up("style",v)} style={{border:form.style===v?"1px solid #8B6F47":"1px solid rgba(255,255,255,0.12)",padding:"10px 12px",fontSize:13,cursor:"pointer",textAlign:"center",color:"#F5F3EF"}}>
                {v}
              </div>
            ))}
          </div>
        </F>
        <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:14}}>
          <F label="Budget *"><select style={csel} value={form.budget} onChange={e=>up("budget",e.target.value)}><option value="">Select</option>{["Under ₹20 Lakhs","₹20–40 Lakhs","₹40+ Lakhs"].map(o=><option key={o} value={o}>{o}</option>)}</select></F>
          <F label="Timeline"><select style={csel} value={form.timeline} onChange={e=>up("timeline",e.target.value)}><option value="">Select</option>{["Within 1 month","1–3 months","3+ months"].map(o=><option key={o} value={o}>{o}</option>)}</select></F>
        </div>
      </div>}

      {step===5&&<div style={{display:"flex",flexDirection:"column",gap:18}}>
        <p style={{color:"#888",fontSize:13,lineHeight:1.7}}>Any additional details we should know?</p>
        <F label="Additional Notes"><textarea style={{...cinp,resize:"vertical",minHeight:90}} rows={3} placeholder="Existing structure, soil conditions, phased construction plan…" value={form.notes} onChange={e=>up("notes",e.target.value)}/></F>
      </div>}

      <div style={{display:"flex",justifyContent:"space-between",marginTop:30,paddingTop:20,borderTop:"1px solid rgba(255,255,255,0.08)"}}>
        {step>1?<button onClick={()=>setStep(s=>s-1)} style={{background:"transparent",border:"1px solid rgba(255,255,255,0.2)",color:"#aaa",padding:"11px 24px",fontSize:14,cursor:"pointer"}}>← Back</button>:<div/>}
        {step<5
          ?<button onClick={()=>setStep(s=>s+1)} style={{background:"#8B6F47",color:"#fff",border:"none",padding:"11px 28px",fontSize:14,fontWeight:500,cursor:"pointer",marginLeft:"auto"}}>Next →</button>
          :<button onClick={()=>setSubmitted(true)} style={{background:"#4CAF50",color:"#fff",border:"none",padding:"11px 28px",fontSize:14,fontWeight:500,cursor:"pointer",marginLeft:"auto"}}>Submit</button>
        }
      </div>
    </div>
  );
}

// MAIN APP
export default function App() {
  const ww = useWW();
  const mob = ww <= 768;
  const sm  = ww <= 480;

  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [lightbox,  setLightbox]  = useState(null);
  const [visible,   setVisible]   = useState({});
  const [authOpen,  setAuthOpen]  = useState(false);
  const [payProject,setPayProject]= useState(null);
  const [session,   setSession]   = useState(null);
  const [purchased, setPurchased] = useState([]);
  const [userMenu,  setUserMenu]  = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [projects,  setProjects]  = useState(()=>{
    try{ const s=localStorage.getItem("qarch_projects"); if(s){const p=JSON.parse(s);if(Array.isArray(p)&&p.length>0)return p;} }catch(e){}
    return PROJECTS;
  });
  const refs = useRef({});

  useEffect(()=>{ const h=()=>setScrolled(window.scrollY>40); window.addEventListener("scroll",h); return()=>window.removeEventListener("scroll",h); },[]);

  useEffect(()=>{
    const io=new IntersectionObserver(entries=>{ entries.forEach(e=>{if(e.isIntersecting)setVisible(v=>({...v,[e.target.id]:true}));}); },{threshold:0.08});
    Object.values(refs.current).forEach(el=>el&&io.observe(el));
    return()=>io.disconnect();
  },[]);

  useEffect(()=>{ try{localStorage.setItem("qarch_projects",JSON.stringify(projects));}catch(e){} },[projects]);

  useEffect(()=>{
    const h=e=>{
      if(lightbox===null)return;
      if(e.key==="Escape")setLightbox(null);
      if(e.key==="ArrowLeft") setLightbox(i=>i>0?i-1:projects.length-1);
      if(e.key==="ArrowRight")setLightbox(i=>i<projects.length-1?i+1:0);
    };
    window.addEventListener("keydown",h); return()=>window.removeEventListener("keydown",h);
  },[lightbox,projects.length]);

  const reg=id=>el=>{refs.current[id]=el;};
  const vis=id=>visible[id];

  const onAuthSuccess=user=>{ setSession(user); setAuthOpen(false); };
  const onBuy=p=>{ if(purchased.includes(p.id))return; setPayProject(p); if(!session)setAuthOpen(true); };
  const onPaySuccess=p=>{ setPurchased(prev=>[...prev,p.id]); setPayProject(null); };
  const logout=()=>{ setSession(null); setPurchased([]); setUserMenu(false); };

  const navH = scrolled ? (mob?"56px":"60px") : (mob?"64px":"80px");

  return(
    <div style={{fontFamily:"'DM Sans',sans-serif",background:"#F5F3EF",color:"#1A1A18",overflowX:"hidden"}}>
      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,display:"flex",alignItems:"center",justifyContent:"space-between",padding: mob ? "0 16px" : "0 48px",height: navH,background:scrolled?"rgba(245,243,239,0.97)":"transparent",backdropFilter:scrolled?"blur(12px)":"none",boxShadow:scrolled?"0 1px 0 rgba(0,0,0,0.08)":"none",transition:"all 0.4s"}}>
        <div style={{height:mob?40:48,overflow:"hidden",position:"relative",width:mob?90:110}}>
          <img src={LOGO_URI} alt="Q Arch" style={{width:mob?180:220,position:"absolute",top:0,left:0}}/>
        </div>

        {!mob && (
          <div style={{display:"flex",alignItems:"center",gap:24}}>
            {NAV_LINKS.map(l=>(
              <a key={l} href={"#"+l.toLowerCase()} style={{textDecoration:"none",color:"#555",fontSize:14,letterSpacing:"0.04em"}}>{l}</a>
            ))}
            <a href="https://www.facebook.com/share/18zSdQfcyD/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",color:"#4267B2",fontSize:13,fontWeight:500}}>Facebook</a>
            <button onClick={()=>setAdminOpen(true)} style={{background:"rgba(139,111,71,0.15)",border:"1px solid rgba(139,111,71,0.4)",color:"#8B6F47",padding:"7px 13px",fontSize:12,cursor:"pointer"}}>🔐 Admin</button>
            {session?(
              <div style={{position:"relative"}}>
                <button onClick={()=>setUserMenu(!userMenu)} style={{background:"#1A1A18",color:"#F5F3EF",border:"none",padding:"8px 16px",fontSize:13,cursor:"pointer",fontWeight:500}}>
                  👤 {session.name.split(" ")[0]} ▾
                </button>
                {userMenu&&(
                  <div style={{position:"absolute",top:"calc(100% + 8px)",right:0,background:"#fff",boxShadow:"0 8px 28px rgba(0,0,0,0.12)",padding:"16px 18px",minWidth:200,zIndex:200}}>
                    <p style={{fontSize:13,fontWeight:500,marginBottom:12}}>📂 {purchased.length} plans purchased</p>
                    <button onClick={logout} style={{border:"1px solid #ddd",background:"none",padding:"7px 14px",fontSize:12,cursor:"pointer",color:"#666",width:"100%"}}>Logout</button>
                  </div>
                )}
              </div>
            ):(
              <button onClick={()=>{setPayProject(null);setAuthOpen(true);}} style={{background:"#1A1A18",color:"#F5F3EF",border:"none",padding:"8px 18px",fontSize:13,cursor:"pointer",fontWeight:500}}>Login</button>
            )}
          </div>
        )}

        {mob && (
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            {session&&<span style={{fontSize:12,color:"#8B6F47",fontWeight:500}}>👤 {session.name.split(" ")[0]}</span>}
            <button onClick={()=>setMenuOpen(!menuOpen)} style={{background:"none",border:"none",cursor:"pointer",padding:6}}>☰</button>
          </div>
        )}
      </nav>

      {mob && menuOpen && (
        <div style={{position:"fixed",inset:0,background:"#F5F3EF",zIndex:90,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:32,paddingTop:80}}>
          {NAV_LINKS.map(l=>(
            <a key={l} href={"#"+l.toLowerCase()} style={{textDecoration:"none",color:"#1A1A18",fontSize:28}} onClick={()=>setMenuOpen(false)}>{l}</a>
          ))}
          {!session && <button onClick={()=>{setAuthOpen(true);setMenuOpen(false);}} style={{background:"#1A1A18",color:"#fff",border:"none",padding:"12px 32px",fontSize:14}}>Login</button>}
        </div>
      )}

      {/* HERO */}
      <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",padding: mob ? "90px 20px 60px" : "120px 48px 80px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"relative",zIndex:2,maxWidth:900}}>
          <p style={{fontSize:11,letterSpacing:"0.18em",color:"#8B6F47",textTransform:"uppercase",marginBottom:24,fontWeight:500}}>Pulwama, J&K · Qamar Architects</p>
          <h1 style={{display:"flex",flexDirection:"column",marginBottom:24}}>
            <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:mob?"52px":"clamp(64px,9vw,140px)",fontWeight:300,lineHeight:1}}>We Build</span>
            <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:mob?"52px":"clamp(64px,9vw,140px)",fontWeight:300,lineHeight:1,paddingLeft:mob?"20px":"clamp(24px,4vw,80px)"}}>Your Vision</span>
            <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:mob?"52px":"clamp(64px,9vw,140px)",fontWeight:300,lineHeight:1,fontStyle:"italic",color:"#8B6F47"}}>Into Reality</span>
          </h1>
          <p style={{fontSize:mob?14:16,color:"#666",lineHeight:1.7,marginBottom:36,fontWeight:300}}>Architecture & Design Studio crafting spaces that shape culture, commerce, and community.</p>
          <div style={{display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"}}>
            <a href="#work" style={{background:"#1A1A18",color:"#F5F3EF",padding:mob?"12px 22px":"14px 32px",textDecoration:"none",fontSize:mob?13:14,fontWeight:500}}>Explore Work</a>
            <a href="#plans" style={{background:"#8B6F47",color:"#fff",padding:mob?"12px 22px":"14px 32px",textDecoration:"none",fontSize:mob?13:14,fontWeight:500}}>Buy Plans</a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="stats" ref={reg("stats")} style={{display:"grid",gridTemplateColumns:mob?"repeat(2,1fr)":"repeat(4,1fr)",padding:mob?"32px 20px":"64px 48px",borderTop:"1px solid rgba(0,0,0,0.08)",borderBottom:"1px solid rgba(0,0,0,0.08)",opacity:vis("stats")?1:0,transform:vis("stats")?"none":"translateY(20px)",transition:"all 0.7s"}}>
        {STATS.map((s,i)=>(
          <div key={s.label} style={{padding:mob?"14px":"0 24px",borderRight:(!mob&&i<3)?"1px solid rgba(0,0,0,0.08)":"none",borderBottom:(mob&&i<2)?"1px solid rgba(0,0,0,0.06)":"none"}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:mob?40:56,fontWeight:300,lineHeight:1}}>{s.value}</div>
            <div style={{fontSize:11,color:"#888",letterSpacing:"0.1em",textTransform:"uppercase",marginTop:6}}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* WORK */}
      <section id="work" ref={reg("work")} style={{padding:mob?"48px 16px":"100px 48px"}}>
        <div style={{marginBottom:mob?36:64}}>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:mob?"36px":"clamp(36px,4vw,60px)",fontWeight:300,lineHeight:1.15}}>Projects that define skylines</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(3,1fr)",gap:mob?24:28}}>
          {projects.map((p,i)=>(
            <div key={p.id} style={{opacity:vis("work")?1:0,transform:vis("work")?"none":"translateY(40px)",transition:`all 0.6s ${i*0.06}s`,cursor:"pointer"}}>
              <div onClick={()=>setLightbox(i)} style={{height:mob?220:240,background:p.gradient,backgroundSize:"cover",backgroundPosition:"center",position:"relative",marginBottom:12}}>
                <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <span style={{color:"rgba(255,255,255,0.12)",fontFamily:"'Cormorant Garamond',serif",fontSize:40,fontWeight:300}}>{String(i+1).padStart(2,"0")}</span>
                </div>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5}}>
                <div style={{flex:1}}>
                  <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:mob?16:18,fontWeight:400,marginBottom:2}}>{p.title}</h3>
                  <p style={{fontSize:11,color:"#888"}}>{p.area} · {p.floors} · {p.rooms}</p>
                </div>
                <span style={{fontSize:mob?16:18,fontWeight:700,color:"#8B6F47",whiteSpace:"nowrap"}}>₹{Number(p.price).toLocaleString("en-IN")}</span>
              </div>
              <button onClick={()=>onBuy(p)} style={{width:"100%",padding:"10px 0",border:"none",fontSize:13,fontWeight:500,cursor:purchased.includes(p.id)?"default":"pointer",letterSpacing:"0.05em",background:purchased.includes(p.id)?"#f0f0f0":"#1A1A18",color:purchased.includes(p.id)?"#888":"#F5F3EF"}}>
                {purchased.includes(p.id)?"✓ Purchased":"Get Project Plans"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* PLANS SECTION */}
      <section id="plans" ref={reg("plans")} style={{background:"#1A1A18",padding:mob?"48px 20px":"80px 48px",opacity:vis("plans")?1:0,transition:"opacity 0.8s"}}>
        <div style={{maxWidth:780,margin:"0 auto",textAlign:"center"}}>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:mob?"30px":"clamp(32px,4vw,56px)",fontWeight:300,lineHeight:1.2,color:"#F5F3EF",margin:"0 0 16px"}}>Download professional plans</h2>
          <p style={{color:"#888",fontSize:mob?13:15,lineHeight:1.8,marginBottom:36}}>Each plan set is professionally prepared by Er. Malik Rizwan. Register, choose your design, pay securely, and download instantly.</p>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
            <a href="#work" style={{background:"#8B6F47",color:"#fff",padding:"13px 32px",textDecoration:"none",fontSize:14,fontWeight:500}}>Browse All Plans</a>
            <a href="https://wa.me/919541840665" target="_blank" rel="noopener noreferrer" style={{background:"#25D366",color:"#fff",padding:"13px 32px",textDecoration:"none",fontSize:14,fontWeight:500}}>WhatsApp Us</a>
          </div>
        </div>
      </section>

      {/* STUDIO */}
      <section id="studio" ref={reg("studio")} style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:mob?36:80,padding:mob?"48px 20px":"100px 48px",background:"#EDEAE3",opacity:vis("studio")?1:0,transform:vis("studio")?"none":"translateY(24px)",transition:"all 0.8s"}}>
        <div style={{display:"flex",flexDirection:"column",gap:20,justifyContent:"center"}}>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:mob?"32px":"clamp(32px,4vw,56px)",fontWeight:300,lineHeight:1.2}}>Design is not decoration — it is intention.</h2>
          <p style={{fontSize:mob?13:15,color:"#555",lineHeight:1.8,fontWeight:300}}>Qamar Architects is a multidisciplinary studio based in Pulwama, Jammu & Kashmir. Led by Er. Malik Rizwan, we craft spaces rooted in local culture, climate, and craft.</p>
          <a href="#contact" style={{background:"#1A1A18",color:"#F5F3EF",padding:"13px 28px",textDecoration:"none",fontSize:14,fontWeight:500,alignSelf:"flex-start"}}>Work With Us</a>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" ref={reg("services")} style={{padding:mob?"48px 20px":"100px 48px"}}>
        <div style={{marginBottom:mob?36:64}}>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:mob?"32px":"clamp(36px,4vw,60px)",fontWeight:300,lineHeight:1.15}}>Our Services</h2>
        </div>
        {SERVICES.map((s,i)=>(
          <div key={s.num} style={{display:"flex",alignItems:"flex-start",gap:mob?14:32,padding:mob?"18px 0":"28px 0",borderBottom:"1px solid rgba(0,0,0,0.08)",opacity:vis("services")?1:0,transform:vis("services")?"none":"translateY(20px)",transition:`all 0.6s ${i*0.1}s`}}>
            <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:"#8B6F47",minWidth:28,paddingTop:2}}>{s.num}</span>
            <div style={{flex:1}}>
              <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:mob?17:20,fontWeight:400,marginBottom:5}}>{s.title}</h3>
              <p style={{fontSize:mob?12:14,color:"#777",lineHeight:1.6}}>{s.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* CONTACT */}
      <section id="contact" ref={reg("contact")} style={{background:"#1A1A18",padding:mob?"48px 20px":"100px 48px"}}>
        <div style={{maxWidth:800,margin:"0 auto",opacity:vis("contact")?1:0,transform:vis("contact")?"none":"translateY(24px)",transition:"all 0.8s"}}>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:mob?"32px":"clamp(36px,4vw,64px)",fontWeight:300,color:"#F5F3EF",lineHeight:1.15,marginBottom:12}}>Start Your Project</h2>
          <p style={{color:"#888",fontSize:mob?13:15,lineHeight:1.8}}>Fill out this professional brief so we can understand your vision.</p>
          <ClientBriefForm/>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:"#111",padding:mob?"36px 20px 24px":"64px 48px 32px"}}>
        <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr 1fr",gap:mob?28:40,marginBottom:36,paddingBottom:36,borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
          <div>
            <p style={{fontSize:13,color:"#666",lineHeight:1.7}}>Shaping the world, one space at a time.</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:11}}>
            <a href="https://www.facebook.com/share/18zSdQfcyD/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",color:"#4267B2",fontSize:13,fontWeight:500}}>Facebook</a>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <p style={{fontSize:13,color:"#888"}}>rizwan.bgsbu@gmail.com</p>
            <p style={{fontSize:13,color:"#888"}}>+91 7006613989</p>
            <a href="https://wa.me/919541840665" target="_blank" rel="noopener noreferrer" style={{fontSize:13,color:"#25D366",textDecoration:"none",fontWeight:500}}>💬 WhatsApp: +91 9541840665</a>
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
          <span style={{fontSize:11,color:"#555"}}>© 2026 Qamar Architects. All rights reserved.</span>
        </div>
      </footer>

      {/* LIGHTBOX */}
      {lightbox!==null&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.94)",zIndex:400,display:"flex",alignItems:"center",justifyContent:"center",padding:mob?8:20}} onClick={()=>setLightbox(null)}>
          <div style={{position:"relative",width:"100%",maxWidth:"88vw",display:"flex",flexDirection:"column",alignItems:"center"}} onClick={e=>e.stopPropagation()}>
            <button onClick={()=>setLightbox(null)} style={{position:"absolute",top:mob?-36:-44,right:0,background:"none",border:"none",color:"#fff",fontSize:22,cursor:"pointer"}}>✕</button>
            <div style={{width:"100%",maxWidth:"80vw",height:mob?"55vw":"52vh",background:projects[lightbox]?.gradient,backgroundSize:"cover",marginBottom:12}}/>
            <div style={{display:"flex",justifyContent:"space-between",width:"100%",marginTop:12,padding:"0 4px"}}>
              <span style={{color:"#F5F3EF",fontSize:mob?13:15}}>{projects[lightbox]?.title}</span>
              <span style={{color:"#888",fontSize:12}}>{lightbox+1} / {projects.length}</span>
            </div>
          </div>
        </div>
      )}

      {authOpen&&<AuthModal onClose={()=>setAuthOpen(false)} onSuccess={user=>{setSession(user);setAuthOpen(false);}} pendingProject={payProject}/>}
      {payProject&&session&&!authOpen&&<PaymentModal project={payProject} user={session} onClose={()=>setPayProject(null)} onSuccess={onPaySuccess}/>}
      {adminOpen&&<AdminPanel projects={projects} onUpdate={updated=>{ if(updated===null){try{localStorage.removeItem("qarch_projects");}catch(e){}setProjects(PROJECTS);}else setProjects(updated); }} onClose={()=>setAdminOpen(false)}/>}

      {/* FLOATING WHATSAPP */}
      <a href="https://wa.me/919541840665" target="_blank" rel="noopener noreferrer" style={{position:"fixed",bottom:mob?20:28,right:mob?16:28,width:mob?50:56,height:mob?50:56,borderRadius:"50%",background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300,textDecoration:"none"}}>
        <span style={{fontSize:28,color:"#fff"}}>💬</span>
      </a>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{overflow-x:hidden;-webkit-text-size-adjust:100%;}
        a,button{-webkit-tap-highlight-color:transparent;}
        input,textarea,select{font-size:16px !important;}
        @keyframes fadeIn   {from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
        @keyframes scrollLine{0%,100%{transform:scaleY(1);opacity:1}50%{transform:scaleY(0.4);opacity:0.4}}
        @keyframes spin     {to{transform:rotate(360deg)}}
        @keyframes pulse    {0%,100%{opacity:1}50%{opacity:0.3}}
        input::placeholder,textarea::placeholder{color:#999;}
      `}</style>
    </div>
  );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
