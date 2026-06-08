const LOGO_URI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB4AAAATzCAYAAACT/C80AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAP+lSURBVHhe7P3neyTZdSd+fr/3hsmMjMhEZsJWdXnbl";

const React = require('react');
const { useState, useEffect, useRef } = React;

const NAV_LINKS = ["Work", "Studio", "Services", "Plans", "Contact"];

const PROJECTS = [
  { id:1,  title:"Forest Cabin Residence",   area:"2,200 sq.ft", floors:"G+1",    rooms:"3 BHK", price:4999,  gradient:"linear-gradient(135deg,#4a6741,#8B7355)", includes:"Floor Plan · Elevation · Section · 3D View", imgData:null },
  { id:2,  title:"Q Arch Signature Home",    area:"2,800 sq.ft", floors:"G+1",    rooms:"4 BHK", price:5999,  gradient:"linear-gradient(135deg,#7a6a5a,#C4A882)", includes:"Floor Plan · Elevation · Section · 3D View", imgData:null },
  { id:3,  title:"Stone Manor Villa",        area:"3,500 sq.ft", floors:"G+2",    rooms:"5 BHK", price:7999,  gradient:"linear-gradient(135deg,#5a4e44,#9E8B7A)", includes:"Full Architectural + Structural Set", imgData:null },
  { id:4,  title:"Grand Heritage House",     area:"4,000 sq.ft", floors:"G+2",    rooms:"5 BHK", price:8999,  gradient:"linear-gradient(135deg,#3d3528,#8B7355)", includes:"Full Architectural + Structural Set", imgData:null },
  { id:5,  title:"Countryside Craftsman",    area:"1,800 sq.ft", floors:"Ground", rooms:"3 BHK", price:4499,  gradient:"linear-gradient(135deg,#5c6b4a,#A89070)", includes:"Floor Plan · Elevation · Section", imgData:null },
  { id:6,  title:"Contemporary Farmhouse",   area:"2,500 sq.ft", floors:"G+1",    rooms:"4 BHK", price:5499,  gradient:"linear-gradient(135deg,#6b5e4e,#C0A882)", includes:"Floor Plan · Elevation · Section · 3D View", imgData:null },
  { id:7,  title:"Classic Brick Elevation",  area:"3,000 sq.ft", floors:"G+1",    rooms:"4 BHK", price:6499,  gradient:"linear-gradient(135deg,#7a4a38,#B87858)", includes:"Full Architectural Set + 3D", imgData:null },
  { id:8,  title:"Luxury Estate Front",      area:"4,500 sq.ft", floors:"B+G+2",  rooms:"6 BHK", price:9999,  gradient:"linear-gradient(135deg,#2a2a3a,#5a6a8a)", includes:"Complete Working Drawings", imgData:null },
  { id:9,  title:"Modern Villa at Dusk",     area:"3,200 sq.ft", floors:"G+2",    rooms:"4 BHK", price:6999,  gradient:"linear-gradient(135deg,#3a3a4a,#7a7a9a)", includes:"Floor Plan · Elevation · Section · 3D", imgData:null },
  { id:10, title:"Stone & Timber Residence", area:"3,400 sq.ft", floors:"G+2",    rooms:"5 BHK", price:7499,  gradient:"linear-gradient(135deg,#4a3828,#8a6848)", includes:"Full Architectural + Structural", imgData:null },
  { id:11, title:"White Colonial Manor",     area:"3,800 sq.ft", floors:"G+2",    rooms:"5 BHK", price:8499,  gradient:"linear-gradient(135deg,#6a6a5a,#BCBCAC)", includes:"Full Architectural + Interior", imgData:null },
  { id:12, title:"Tudor Night Render",       area:"2,600 sq.ft", floors:"G+1",    rooms:"4 BHK", price:5999,  gradient:"linear-gradient(135deg,#2a1e16,#6a4e3e)", includes:"Floor Plan · Elevation · 3D View", imgData:null },
  { id:13, title:"Brick Gabled Home",        area:"2,200 sq.ft", floors:"G+1",    rooms:"3 BHK", price:4999,  gradient:"linear-gradient(135deg,#5a3a28,#9A6A4A)", includes:"Floor Plan · Elevation · Section", imgData:null },
  { id:14, title:"Tudor Countryside Villa",  area:"3,100 sq.ft", floors:"G+1",    rooms:"4 BHK", price:6999,  gradient:"linear-gradient(135deg,#3e3028,#7E6048)", includes:"Full Architectural Set + Sections", imgData:null },
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

const ov  = { position:"fixed",inset:0,background:"rgba(0,0,0,0.82)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:16,overflowY:"auto" };
const md  = { background:"#fff",width:"100%",maxWidth:440,padding:"28px 22px",position:"relative",maxHeight:"92vh",overflowY:"auto",margin:"auto" };
const cls = { position:"absolute",top:12,right:12,background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#888" };
const fld = { display:"flex",flexDirection:"column",gap:6 };
const lbl = { fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase",color:"#888",fontWeight:500 };
const inp = { border:"1px solid #ddd",padding:"11px 13px",fontSize:14,outline:"none",width:"100%",color:"#1A1A18",fontFamily:"inherit",borderRadius:0 };
const cinp= { background:"transparent",border:"1px solid rgba(255,255,255,0.15)",padding:"11px 13px",fontSize:14,outline:"none",width:"100%",color:"#F5F3EF",fontFamily:"inherit" };
const csel= { background:"#111",border:"1px solid rgba(255,255,255,0.15)",padding:"11px 13px",fontSize:14,outline:"none",width:"100%",color:"#F5F3EF",fontFamily:"inherit" };

function useWW() {
  const [w,setW] = useState(typeof window!=="undefined"?window.innerWidth:1200);
  useEffect(()=>{ const h=()=>setW(window.innerWidth); window.addEventListener("resize",h); return()=>window.removeEventListener("resize",h); },[]);
  return w;
}

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
    React.createElement('div', { style: ov, onClick: onClose },
      React.createElement('div', { style: md, onClick: e => e.stopPropagation() },
        React.createElement('button', { style: cls, onClick: onClose }, '✕'),
        React.createElement('div', { style: {fontWeight:500,fontSize:13,letterSpacing:"0.2em",color:"#8B6F47",marginBottom:14} }, '◐ Q ARCH'),
        pendingProject && React.createElement('div', { style: {background:"#FFF8F0",border:"1px solid #EED8B0",padding:"9px 12px",fontSize:13,color:"#555",marginBottom:16,lineHeight:1.5} },
          'To purchase ',
          React.createElement('strong', null, `"${pendingProject.title}"`),
          ' please log in or register.'
        ),
        React.createElement('div', { style: {display:"flex",borderBottom:"2px solid #eee",marginBottom:20} },
          ["login","register"].map(m=>
            React.createElement('button', { key: m, onClick: ()=>{setMode(m);setErr("");}, style: {flex:1,background:"none",border:"none",padding:"9px 0",fontSize:14,cursor:"pointer", fontWeight:mode===m?600:400,color:mode===m?"#1A1A18":"#888", borderBottom:mode===m?"2px solid #8B6F47":"none",marginBottom:mode===m?-2:0} },
              m==="login"?"Log In":"Register"
            )
          )
        ),
        React.createElement('div', { style: {display:"flex",flexDirection:"column",gap:13} },
          mode==="register" && React.createElement('div', { style: fld },
            React.createElement('label', { style: lbl }, 'Full Name'),
            React.createElement('input', { style: inp, placeholder: "Mohammad Aamir", value: name, onChange: e=>setName(e.target.value) })
          ),
          React.createElement('div', { style: fld },
            React.createElement('label', { style: lbl }, 'Email'),
            React.createElement('input', { style: inp, placeholder: "you@email.com", value: email, onChange: e=>setEmail(e.target.value) })
          ),
          React.createElement('div', { style: fld },
            React.createElement('label', { style: lbl }, 'Password'),
            React.createElement('input', { style: inp, type: "password", placeholder: "••••••••", value: pass, onChange: e=>setPass(e.target.value) })
          ),
          mode==="register" && React.createElement('div', { style: fld },
            React.createElement('label', { style: lbl }, 'Confirm Password'),
            React.createElement('input', { style: inp, type: "password", placeholder: "••••••••", value: conf, onChange: e=>setConf(e.target.value) })
          ),
          err && React.createElement('p', { style: {color:"#c62828",fontSize:13,background:"#FFEBEE",padding:"8px 11px"} }, err),
          React.createElement('button', { onClick: submit, style: {background:"#1A1A18",color:"#fff",border:"none",padding:"13px",fontSize:14,fontWeight:500,cursor:"pointer"} },
            mode==="register"?"Create Account →":"Log In →"
          ),
          React.createElement('p', { style: {fontSize:13,color:"#888",textAlign:"center"} },
            mode==="login"?"New? ":"Have account? ",
            React.createElement('span', { style: {color:"#8B6F47",cursor:"pointer",fontWeight:500,textDecoration:"underline"}, onClick: ()=>{setMode(mode==="login"?"register":"login");setErr("");} },
              mode==="login"?"Create account":"Log in"
            )
          )
        )
      )
    )
  );
}

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
    React.createElement('div', { style: ov, onClick: onClose },
      React.createElement('div', { style: {...md,maxWidth:460}, onClick: e => e.stopPropagation() },
        React.createElement('button', { style: cls, onClick: onClose }, '✕'),
        step==="form" && React.createElement(React.Fragment, null,
          React.createElement('div', { style: {display:"flex",gap:13,alignItems:"flex-start",marginBottom:16} },
            React.createElement('div', { style: {width:80,height:64,flexShrink:0,background:project.imgData?`url(${project.imgData})`:project.gradient,backgroundSize:"cover"} }),
            React.createElement('div', null,
              React.createElement('p', { style: {fontSize:15,fontWeight:500,color:"#1A1A18",marginBottom:3} }, project.title),
              React.createElement('p', { style: {fontSize:11,color:"#888",lineHeight:1.5,marginBottom:5} }, '📄 '+project.includes),
              React.createElement('p', { style: {fontSize:20,fontWeight:700,color:"#8B6F47"} }, fmt(project.price))
            )
          ),
          React.createElement('div', { style: {height:1,background:"#eee",marginBottom:16} }),
          React.createElement('p', { style: {fontSize:12,fontWeight:600,color:"#555",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:9} }, 'Payment Method'),
          React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:9,marginBottom:16} },
            [["upi","📱 UPI"],["card","💳 Card"],["netbanking","🏦 Net Banking"]].map(([m,label])=>
              React.createElement('div', { key: m, onClick: ()=>setMethod(m), style: {border:method===m?"2px solid #8B6F47":"1px solid #ddd",padding:"9px 5px",textAlign:"center",fontSize:12,cursor:"pointer",color:method===m?"#8B6F47":"#888"} },
                label
              )
            )
          ),
          method==="upi" && React.createElement('div', { style: fld },
            React.createElement('label', { style: lbl }, 'UPI ID'),
            React.createElement('input', { style: inp, placeholder: "name@ybl", value: upiId, onChange: e=>setUpiId(e.target.value) })
          ),
          method==="card" && React.createElement('div', { style: {display:"flex",flexDirection:"column",gap:11} },
            React.createElement('div', { style: fld },
              React.createElement('label', { style: lbl }, 'Card Number'),
              React.createElement('input', { style: inp, placeholder: "1234 5678 9012 3456", maxLength: 19, value: card, onChange: e=>setCard(e.target.value.replace(/[^0-9]/g, '').replace(/(\d{4})/g, '$1 ').trim()) })
            ),
            React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:11} },
              React.createElement('div', { style: fld },
                React.createElement('label', { style: lbl }, 'Expiry'),
                React.createElement('input', { style: inp, placeholder: "08/27", maxLength: 5, value: expiry, onChange: e=>setExpiry(e.target.value) })
              ),
              React.createElement('div', { style: fld },
                React.createElement('label', { style: lbl }, 'CVV'),
                React.createElement('input', { style: inp, type: "password", placeholder: "•••", maxLength: 3, value: cvv, onChange: e=>setCvv(e.target.value) })
              )
            )
          ),
          method==="netbanking" && React.createElement('p', { style: {background:"#F8F9FA",border:"1px solid #eee",padding:"13px",fontSize:13,color:"#555"} }, 'You will be redirected to your bank\'s secure page.'),
          err && React.createElement('p', { style: {color:"#c62828",fontSize:13,background:"#FFEBEE",padding:"8px 11px",marginTop:11} }, err),
          React.createElement('p', { style: {fontSize:11,color:"#aaa",textAlign:"center",margin:"14px 0 10px"} }, '🔒 Secure Payment · Files delivered instantly'),
          React.createElement('button', { onClick: pay, style: {background:"#2E7D32",color:"#fff",border:"none",padding:"14px",width:"100%",fontSize:15,fontWeight:700,cursor:"pointer"} }, 'Pay '+fmt(project.price)),
          React.createElement('p', { style: {fontSize:12,color:"#aaa",textAlign:"center",marginTop:11} },
            'Need help? ',
            React.createElement('a', { href: "https://wa.me/919541840665", target: "_blank", rel: "noopener noreferrer", style: {color:"#25D366"} }, 'WhatsApp Us')
          )
        ),
        step==="processing" && React.createElement('div', { style: {textAlign:"center",padding:"50px 20px",display:"flex",flexDirection:"column",alignItems:"center",gap:16} },
          React.createElement('div', { style: {width:50,height:50,border:"4px solid #eee",borderTop:"4px solid #8B6F47",borderRadius:"50%",animation:"spin 0.9s linear infinite"} }),
          React.createElement('p', { style: {fontSize:15,color:"#444",fontWeight:500} }, 'Processing payment…'),
          React.createElement('p', { style: {fontSize:13,color:"#aaa"} }, 'Please do not close this window.')
        ),
        step==="done" && React.createElement('div', { style: {textAlign:"center",padding:"36px 16px",display:"flex",flexDirection:"column",alignItems:"center",gap:14} },
          React.createElement('div', { style: {width:64,height:64,borderRadius:"50%",background:"#4CAF50",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28} }, '✓'),
          React.createElement('h3', { style: {fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:300,color:"#1A1A18"} }, 'Payment Successful!'),
          React.createElement('p', { style: {color:"#555",fontSize:14,lineHeight:1.7,maxWidth:300} },
            'Thank you, ',
            React.createElement('strong', null, user.name),
            '! Your files for ',
            React.createElement('strong', null, `"${project.title}"`),
            ' are ready.'
          ),
          React.createElement('button', { onClick: ()=>onSuccess(project), style: {background:"#1A1A18",color:"#fff",border:"none",padding:"13px 32px",fontSize:14,fontWeight:500,cursor:"pointer"} }, '⬇ Download Files')
        )
      )
    )
  );
}

function ClientBriefForm() {
  const ww=useWW(); 
  const mob=ww<=768;
  const [step,setStep]=useState(1);
  const [submitted,setSubmitted]=useState(false);
  const [form,setForm]=useState({fullName:"",phone:"",email:"",location:"",projectType:"",plotOwned:"",plotLocation:"",plotArea:"",plotDimensions:"",floors:"",bedrooms:"",bathrooms:"",parking:"",specialRooms:[],style:"",budget:"",timeline:"",dreamHome:"",vastu:"",snowLoad:"",accessibility:"",additionalNotes:""});
  
  const up=(k,v)=>setForm(f=>({...f,[k]:v}));
  const toggleRoom=r=>setForm(f=>({...f,specialRooms:f.specialRooms.includes(r)?f.specialRooms.filter(x=>x!==r):[...f.specialRooms,r]}));
  const titles=["Personal Info","Project & Site","Space Requirements","Style & Budget","Special Requirements"];

  if(submitted) return(
    React.createElement('div', { style: {textAlign:"center",padding:"40px 16px",display:"flex",flexDirection:"column",alignItems:"center",gap:16} },
      React.createElement('div', { style: {width:64,height:64,borderRadius:"50%",background:"#4CAF50",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28} }, '✓'),
      React.createElement('h3', { style: {fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:300,color:"#F5F3EF"} }, 'Brief Submitted!'),
      React.createElement('p', { style: {color:"#888",fontSize:14,lineHeight:1.8,maxWidth:380} },
        'Thank you ',
        React.createElement('strong', { style: {color:"#F5F3EF"} }, form.fullName),
        '. We\'ll contact you within 24 hours.'
      ),
      React.createElement('a', { href: "https://wa.me/919541840665", target: "_blank", rel: "noopener noreferrer", style: {background:"#25D366",color:"#fff",padding:"12px 28px",textDecoration:"none",fontSize:14,fontWeight:500} }, '💬 Chat on WhatsApp')
    )
  );

  const Opt=({val,field})=>(
    React.createElement('div', { onClick: ()=>up(field,val), style: {border:form[field]===val?"1px solid #8B6F47":"1px solid rgba(255,255,255,0.12)",padding:"10px 12px",fontSize:13,cursor:"pointer",textAlign:"center",lineHeight:1.4,background:form[field]===val?"rgba(139,111,71,0.1)":"transparent",color:form[field]===val?"#8B6F47":"#aaa"} },
      val
    )
  );

  const F=({label,children})=>(
    React.createElement('div', { style: {display:"flex",flexDirection:"column",gap:7} },
      React.createElement('label', { style: lbl }, label),
      children
    )
  );

  return(
    React.createElement('div', { style: {marginTop:30} },
      React.createElement('div', { style: {display:"flex",alignItems:"center",marginBottom:10} },
        titles.map((t,i)=>
          React.createElement('div', { key: i, style: {display:"flex",alignItems:"center",flex:i<4?1:"none"} },
            React.createElement('div', { style: {width:28,height:28,borderRadius:"50%",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:500,background:step>i+1?"#4CAF50":step===i+1?"#8B6F47":"rgba(255,255,255,0.1)",color:step>i+1||step===i+1?"#fff":"#888"} },
              step>i+1?"✓":i+1
            ),
            i<4 && React.createElement('div', { style: {flex:1,height:1,background:step>i+1?"#4CAF50":"rgba(255,255,255,0.1)",margin:"0 5px"} })
          )
        )
      ),
      React.createElement('p', { style: {color:"#888",fontSize:12,marginBottom:24} },
        `Step ${step} of 5: `,
        React.createElement('strong', { style: {color:"#ccc"} }, titles[step-1])
      ),
      step===1 && React.createElement('div', { style: {display:"flex",flexDirection:"column",gap:18} },
        React.createElement('p', { style: {color:"#888",fontSize:13,lineHeight:1.7,borderLeft:"2px solid #8B6F47",paddingLeft:12} }, 'Let us know who you are so we can build your client profile.'),
        React.createElement('div', { style: {display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:14} },
          React.createElement(F, { label: "Full Name *" },
            React.createElement('input', { style: cinp, placeholder: "Mohammad Aamir", value: form.fullName, onChange: e=>up("fullName",e.target.value) })
          ),
          React.createElement(F, { label: "Phone *" },
            React.createElement('input', { style: cinp, placeholder: "+91 9XXXXXXXXX", value: form.phone, onChange: e=>up("phone",e.target.value) })
          ),
          React.createElement(F, { label: "Email" },
            React.createElement('input', { style: cinp, placeholder: "you@email.com", value: form.email, onChange: e=>up("email",e.target.value) })
          ),
          React.createElement(F, { label: "Location" },
            React.createElement('input', { style: cinp, placeholder: "Pulwama, J&K", value: form.location, onChange: e=>up("location",e.target.value) })
          )
        )
      ),
      React.createElement('div', { style: {display:"flex",justifyContent:"space-between",marginTop:30,paddingTop:20,borderTop:"1px solid rgba(255,255,255,0.08)"} },
        step>1 && React.createElement('button', { onClick: ()=>setStep(s=>s-1), style: {background:"transparent",border:"1px solid rgba(255,255,255,0.2)",color:"#aaa",padding:"11px 24px",fontSize:14,cursor:"pointer"} }, '← Back'),
        step<5
          ? React.createElement('button', { onClick: ()=>setStep(s=>s+1), style: {background:"#8B6F47",color:"#fff",border:"none",padding:"11px 28px",fontSize:14,fontWeight:500,cursor:"pointer",marginLeft:"auto"} }, 'Next →')
          : React.createElement('button', { onClick: ()=>setSubmitted(true), style: {background:"#4CAF50",color:"#fff",border:"none",padding:"11px 28px",fontSize:14,fontWeight:500,cursor:"pointer",marginLeft:"auto"} }, 'Submit ✓')
      )
    )
  );
}

function App() {
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
    try{ 
      const s=localStorage.getItem("qarch_projects"); 
      if(s){
        const p=JSON.parse(s);
        if(Array.isArray(p)&&p.length>0)return p;
      } 
    }catch(e){}
    return PROJECTS;
  });
  const refs = useRef({});

  useEffect(()=>{ 
    const h=()=>setScrolled(window.scrollY>40); 
    window.addEventListener("scroll",h); 
    return()=>window.removeEventListener("scroll",h); 
  },[]);

  useEffect(()=>{
    const io=new IntersectionObserver(entries=>{ 
      entries.forEach(e=>{
        if(e.isIntersecting)setVisible(v=>({...v,[e.target.id]:true}));
      }); 
    },{threshold:0.08});
    Object.values(refs.current).forEach(el=>el&&io.observe(el));
    return()=>io.disconnect();
  },[]);

  useEffect(()=>{ 
    try{
      localStorage.setItem("qarch_projects",JSON.stringify(projects));
    }catch(e){} 
  },[projects]);

  useEffect(()=>{
    const h=e=>{
      if(lightbox===null)return;
      if(e.key==="Escape")setLightbox(null);
      if(e.key==="ArrowLeft") setLightbox(i=>i>0?i-1:projects.length-1);
      if(e.key==="ArrowRight")setLightbox(i=>i<projects.length-1?i+1:0);
    };
    window.addEventListener("keydown",h); 
    return()=>window.removeEventListener("keydown",h);
  },[lightbox,projects.length]);

  const reg=id=>el=>{refs.current[id]=el;};
  const vis=id=>visible[id];

  const onAuthSuccess=user=>{ setSession(user); setAuthOpen(false); };
  const onBuy=p=>{ if(purchased.includes(p.id))return; setPayProject(p); if(!session)setAuthOpen(true); };
  const onPaySuccess=p=>{ setPurchased(prev=>[...prev,p.id]); setPayProject(null); };
  const logout=()=>{ setSession(null); setPurchased([]); setUserMenu(false); };

  const navH = scrolled ? (mob?"56px":"60px") : (mob?"64px":"80px");

  return(
    React.createElement('div', { style: {fontFamily:"'DM Sans',sans-serif",background:"#F5F3EF",color:"#1A1A18",overflowX:"hidden"} },
      React.createElement('nav', { style: {position:"fixed",top:0,left:0,right:0,zIndex:100,display:"flex",alignItems:"center",justifyContent:"space-between", padding: mob ? "0 16px" : "0 48px", height: navH, background:scrolled?"rgba(245,243,239,0.97)":"transparent", backdropFilter:scrolled?"blur(12px)":"none", boxShadow:scrolled?"0 1px 0 rgba(0,0,0,0.08)":"none", transition:"all 0.4s"} },
        React.createElement('div', { style: {height:mob?40:48,overflow:"hidden",position:"relative",width:mob?90:110} },
          React.createElement('img', { src: LOGO_URI, alt: "Q Arch", style: {width:mob?180:220,position:"absolute",top:0,left:0} })
        ),
        !mob && React.createElement('div', { style: {display:"flex",alignItems:"center",gap:24} },
          NAV_LINKS.map(l=>
            React.createElement('a', { key: l, href: "#"+l.toLowerCase(), style: {textDecoration:"none",color:"#555",fontSize:14,letterSpacing:"0.04em"} }, l)
          ),
          React.createElement('a', { href: "https://www.facebook.com/share/18zSdQfcyD/", target: "_blank", rel: "noopener noreferrer", style: {textDecoration:"none",color:"#4267B2",fontSize:13,fontWeight:500,display:"flex",alignItems:"center",gap:5} },
            '📘 Facebook'
          ),
          React.createElement('button', { onClick: ()=>setAdminOpen(true), style: {background:"rgba(139,111,71,0.15)",border:"1px solid rgba(139,111,71,0.4)",color:"#8B6F47",padding:"7px 13px",fontSize:12,cursor:"pointer"} }, '🔐 Admin'),
          session?(
            React.createElement('div', { style: {position:"relative"} },
              React.createElement('button', { onClick: ()=>setUserMenu(!userMenu), style: {background:"#1A1A18",color:"#F5F3EF",border:"none",padding:"8px 16px",fontSize:13,cursor:"pointer",fontWeight:500} },
                '👤 '+session.name.split(" ")[0]+' ▾'
              ),
              userMenu && React.createElement('div', { style: {position:"absolute",top:"calc(100% + 8px)",right:0,background:"#fff",boxShadow:"0 8px 28px rgba(0,0,0,0.12)",padding:"16px 18px",minWidth:200,zIndex:200} },
                React.createElement('p', { style: {fontSize:12,color:"#888",marginBottom:6,wordBreak:"break-all"} }, session.email),
                React.createElement('p', { style: {fontSize:13,fontWeight:500,marginBottom:12} }, '📂 '+purchased.length+' plan'+(purchased.length!==1?"s":"")+' purchased'),
                React.createElement('button', { onClick: logout, style: {border:"1px solid #ddd",background:"none",padding:"7px 14px",fontSize:12,cursor:"pointer",color:"#666",width:"100%"} }, 'Logout')
              )
            )
          ):(
            React.createElement('button', { onClick: ()=>{setPayProject(null);setAuthOpen(true);}, style: {background:"#1A1A18",color:"#F5F3EF",border:"none",padding:"8px 18px",fontSize:13,cursor:"pointer",fontWeight:500} },
              'Login'
            )
          )
        ),
        mob && React.createElement('div', { style: {display:"flex",alignItems:"center",gap:10} },
          session && React.createElement('span', { style: {fontSize:12,color:"#8B6F47",fontWeight:500} }, '👤 '+session.name.split(" ")[0]),
          React.createElement('button', { onClick: ()=>setMenuOpen(!menuOpen), style: {background:"none",border:"none",cursor:"pointer",padding:6,display:"flex",flexDirection:"column",gap:5} },
            React.createElement('span', { style: {display:"block",width:22,height:2,background:"#1A1A18",transition:"all 0.3s",transform:menuOpen?"rotate(45deg) translate(4px,4px)":"none"} }),
            React.createElement('span', { style: {display:"block",width:22,height:2,background:"#1A1A18",transition:"all 0.3s",opacity:menuOpen?0:1} }),
            React.createElement('span', { style: {display:"block",width:22,height:2,background:"#1A1A18",transition:"all 0.3s",transform:menuOpen?"rotate(-45deg) translate(4px,-4px)":"none"} })
          )
        )
      ),
      React.createElement('section', { style: {minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center", padding: mob ? "90px 20px 60px" : "120px 48px 80px", position:"relative",overflow:"hidden"} },
        React.createElement('div', { style: {position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)",backgroundSize:"60px 60px",opacity:0.5} }),
        React.createElement('div', { style: {position:"relative",zIndex:2,maxWidth:900} },
          React.createElement('p', { style: {fontSize:11,letterSpacing:"0.18em",color:"#8B6F47",textTransform:"uppercase",marginBottom:24,fontWeight:500} },
            'Pulwama, J&K · Qamar Architects'
          ),
          React.createElement('h1', { style: {display:"flex",flexDirection:"column",marginBottom:24} },
            React.createElement('span', { style: {fontFamily:"'Cormorant Garamond',serif",fontSize:mob?(sm?"52px":"72px"):"clamp(64px,9vw,140px)",fontWeight:300,lineHeight:1,animation:"fadeIn 0.9s ease both"} }, 'We Build'),
            React.createElement('span', { style: {fontFamily:"'Cormorant Garamond',serif",fontSize:mob?(sm?"52px":"72px"):"clamp(64px,9vw,140px)",fontWeight:300,lineHeight:1,paddingLeft:mob?"20px":"clamp(24px,4vw,80px)",animation:"fadeIn 0.9s 0.2s both",opacity:0,animationFillMode:"forwards"} }, 'Spaces That'),
            React.createElement('span', { style: {fontFamily:"'Cormorant Garamond',serif",fontSize:mob?(sm?"52px":"72px"):"clamp(64px,9vw,140px)",fontWeight:300,lineHeight:1,fontStyle:"italic",color:"#8B6F47",animation:"fadeIn 0.9s 0.35s both",opacity:0,animationFillMode:"forwards"} }, 'Matter.')
          ),
          React.createElement('p', { style: {fontSize:mob?14:16,color:"#666",lineHeight:1.7,marginBottom:36,fontWeight:300,animation:"fadeIn 0.9s 0.5s both",opacity:0,animationFillMode:"forwards"} },
            'Architecture & Design Studio crafting spaces',
            React.createElement('br', null),
            'that shape culture, commerce, and community.'
          ),
          React.createElement('div', { style: {display:"flex",gap:14,alignItems:"center",flexWrap:"wrap",animation:"fadeIn 0.9s 0.65s both",opacity:0,animationFillMode:"forwards"} },
            React.createElement('a', { href: "#work", style: {background:"#1A1A18",color:"#F5F3EF",padding:mob?"12px 22px":"14px 32px",textDecoration:"none",fontSize:mob?13:14,fontWeight:500} }, 'Explore Work'),
            React.createElement('a', { href: "#plans", style: {background:"#8B6F47",color:"#fff", padding:mob?"12px 22px":"14px 32px",textDecoration:"none",fontSize:mob?13:14,fontWeight:500} }, 'Buy Plans'),
            React.createElement('a', { href: "#studio", style: {color:"#1A1A18",textDecoration:"none",fontSize:mob?13:14,borderBottom:"1px solid #1A1A18",paddingBottom:2} }, 'Our Story →')
          )
        ),
        !mob && React.createElement('div', { style: {position:"absolute",bottom:40,left:48,display:"flex",flexDirection:"column",alignItems:"center",gap:8,zIndex:2} },
          React.createElement('div', { style: {width:1,height:60,background:"#8B6F47",animation:"scrollLine 2s ease infinite"} }),
          React.createElement('span', { style: {fontSize:10,letterSpacing:"0.25em",color:"#8B6F47",writingMode:"vertical-rl"} }, 'SCROLL')
        )
      ),
      React.createElement('footer', { style: {background:"#111",padding:mob?"36px 20px 24px":"64px 48px 32px"} },
        React.createElement('div', { style: {display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr 1fr",gap:mob?28:40,marginBottom:36,paddingBottom:36,borderBottom:"1px solid rgba(255,255,255,0.07)"} },
          React.createElement('div', null,
            React.createElement('div', { style: {height:44,overflow:"hidden",position:"relative",width:100,marginBottom:14,background:"#fff",padding:4,borderRadius:3} },
              React.createElement('img', { src: LOGO_URI, alt: "Q Arch", style: {width:190,position:"absolute",top:0,left:"50%",transform:"translateX(-50%)"} })
            ),
            React.createElement('p', { style: {fontSize:13,color:"#666",lineHeight:1.7} },
              'Shaping the world,',
              React.createElement('br', null),
              'one space at a time.'
            )
          ),
          React.createElement('div', { style: {display:"flex",flexDirection:"column",gap:11} },
            React.createElement('a', { href: "https://www.facebook.com/share/18zSdQfcyD/", target: "_blank", rel: "noopener noreferrer", style: {textDecoration:"none",color:"#4267B2",fontSize:13,fontWeight:500,display:"flex",alignItems:"center",gap:5} },
              '📘 Facebook'
            ),
            ["Instagram","LinkedIn","Behance"].map(l=>
              React.createElement('a', { key: l, href: "#", style: {textDecoration:"none",color:"#888",fontSize:13} }, l)
            )
          ),
          React.createElement('div', { style: {display:"flex",flexDirection:"column",gap:8} },
            React.createElement('p', { style: {fontSize:13,color:"#888"} }, 'rizwan.bgsbu@gmail.com'),
            React.createElement('p', { style: {fontSize:13,color:"#888"} }, '+91 7006613989'),
            React.createElement('a', { href: "https://wa.me/919541840665", target: "_blank", rel: "noopener noreferrer", style: {fontSize:13,color:"#25D366",textDecoration:"none",fontWeight:500} }, '💬 WhatsApp: +91 9541840665'),
            React.createElement('p', { style: {fontSize:13,color:"#888"} }, 'Pulwama, Jammu & Kashmir, India')
          )
        ),
        React.createElement('div', { style: {display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8} },
          React.createElement('span', { style: {fontSize:11,color:"#555"} }, '© 2026 Qamar Architects. All rights reserved.'),
          React.createElement('span', { style: {fontSize:11,color:"#555"} }, 'Privacy · Terms')
        )
      ),
      authOpen && React.createElement(AuthModal, { onClose: ()=>setAuthOpen(false), onSuccess: user=>{setSession(user);setAuthOpen(false);}, pendingProject: payProject }),
      payProject && session && !authOpen && React.createElement(PaymentModal, { project: payProject, user: session, onClose: ()=>setPayProject(null), onSuccess: onPaySuccess }),
      React.createElement('style', null, `
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
      `)
    )
  );
}

module.exports = App;