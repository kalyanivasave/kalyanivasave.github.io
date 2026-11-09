/* Configuration Portfolio Cockpit by Kalyani Wasave. Practice data; part numbers from Lancer Worldwide's public operation manuals. */
(function(){
"use strict";

/* ---------- Sample data ---------- */
const SAMPLE = [
 {id:"K01",family:"IBD 22",valves:"6",valveType:"LEV",voltage:"115V",graphics:"Standard",extra:"",units:2400,price:4600,cost:3050,uniqueParts:0,leadTime:7,openQuotes:0,contractEnd:"",notes:""},
 {id:"K02",family:"IBD 30",valves:"8",valveType:"LEV",voltage:"115V",graphics:"Standard",extra:"",units:2100,price:5700,cost:3700,uniqueParts:0,leadTime:7,openQuotes:0,contractEnd:"",notes:""},
 {id:"K03",family:"IBD 30",valves:"10",valveType:"LEV",voltage:"115V",graphics:"Standard",extra:"",units:1350,price:6100,cost:4000,uniqueParts:0,leadTime:7,openQuotes:0,contractEnd:"",notes:""},
 {id:"K04",family:"IBD 25",valves:"8",valveType:"LEV",voltage:"115V",graphics:"Standard",extra:"",units:900,price:5100,cost:3350,uniqueParts:0,leadTime:7,openQuotes:0,contractEnd:"",notes:""},
 {id:"K05",family:"IBD 44",valves:"12",valveType:"LEV",voltage:"115V",graphics:"Standard",extra:"",units:380,price:8200,cost:5500,uniqueParts:1,leadTime:14,openQuotes:0,contractEnd:"",notes:""},
 {id:"K06",family:"IBD 30",valves:"10",valveType:"Portion control",voltage:"115V",graphics:"Standard",extra:"",units:520,price:6900,cost:4600,uniqueParts:2,leadTime:14,openQuotes:0,contractEnd:"",notes:"Mostly QSR chains"},
 {id:"K07",family:"IBD 30",valves:"8",valveType:"LEV",voltage:"230V",graphics:"Standard",extra:"",units:310,price:6050,cost:3950,uniqueParts:2,leadTime:21,openQuotes:0,contractEnd:"",notes:"Export"},
 {id:"K08",family:"IBD 22",valves:"6",valveType:"LEV",voltage:"230V",graphics:"Standard",extra:"",units:140,price:4950,cost:3350,uniqueParts:2,leadTime:21,openQuotes:0,contractEnd:"",notes:"Export"},
 {id:"K09",family:"IBD 30",valves:"10",valveType:"LEV",voltage:"115V",graphics:"Custom program",extra:"",units:260,price:6600,cost:4250,uniqueParts:3,leadTime:28,openQuotes:0,contractEnd:"2027-03-31",notes:"One QSR chain program"},
 {id:"K10",family:"IBD Bold 30i",valves:"24 brands",valveType:"Multi-flavor",voltage:"120V",graphics:"Digital 32in",extra:"",units:180,price:21500,cost:14800,uniqueParts:0,leadTime:21,openQuotes:0,contractEnd:"",notes:"Volume up 60% vs prior year"},
 {id:"K11",family:"IBD 30",valves:"8",valveType:"LEV",voltage:"115V",graphics:"Standard",extra:"Front plumbing kit",units:45,price:5950,cost:4300,uniqueParts:3,leadTime:28,openQuotes:0,contractEnd:"",notes:""},
 {id:"K12",family:"IBD 44",valves:"12",valveType:"LEV",voltage:"230V",graphics:"Standard",extra:"",units:22,price:8750,cost:6500,uniqueParts:3,leadTime:35,openQuotes:0,contractEnd:"",notes:""},
 {id:"K13",family:"IBD 25",valves:"8",valveType:"Customer-specified",voltage:"115V",graphics:"Standard",extra:"",units:30,price:5600,cost:4250,uniqueParts:4,leadTime:35,openQuotes:5,contractEnd:"",notes:"All quotes from one distributor"},
 {id:"K14",family:"IBD 22",valves:"6",valveType:"Portion control",voltage:"230V",graphics:"Standard",extra:"",units:9,price:5600,cost:4700,uniqueParts:5,leadTime:42,openQuotes:0,contractEnd:"",notes:""},
 {id:"K15",family:"IBD 30",valves:"10",valveType:"Portion control",voltage:"230V",graphics:"Custom program",extra:"",units:6,price:7900,cost:6600,uniqueParts:6,leadTime:45,openQuotes:0,contractEnd:"",notes:""},
 {id:"K16",family:"ICDI 2300",valves:"8",valveType:"LEV",voltage:"115V",graphics:"Standard",extra:"Drop-in",units:640,price:3400,cost:2250,uniqueParts:0,leadTime:7,openQuotes:0,contractEnd:"",notes:""},
 {id:"K17",family:"IBD 30",valves:"8",valveType:"LEV",voltage:"115V",graphics:"Standard",extra:"",units:12,price:5700,cost:3700,uniqueParts:1,leadTime:7,openQuotes:0,contractEnd:"",notes:"Created in 2024 for one quote"},
 {id:"K18",family:"IBD Bold 30i",valves:"20 brands",valveType:"Multi-flavor",voltage:"120V",graphics:"Digital 32in",extra:"",units:40,price:20500,cost:14600,uniqueParts:2,leadTime:21,openQuotes:0,contractEnd:"",notes:"Lower-brand-count build"},
 {id:"K19",family:"ICDI 2200",valves:"6",valveType:"LEV",voltage:"115V",graphics:"Standard",extra:"Drop-in",units:380,price:2900,cost:1950,uniqueParts:0,leadTime:7,openQuotes:0,contractEnd:"",notes:""},
 {id:"K20",family:"ICDI 2323",valves:"8",valveType:"LEV",voltage:"115V",graphics:"Standard",extra:"Drop-in, high performance",units:210,price:3900,cost:2600,uniqueParts:1,leadTime:10,openQuotes:0,contractEnd:"",notes:""},
 {id:"K21",family:"ICDI 23300",valves:"10",valveType:"LEV",voltage:"115V",graphics:"Standard",extra:"Drop-in, high performance",units:150,price:4300,cost:2850,uniqueParts:1,leadTime:10,openQuotes:0,contractEnd:"",notes:""},
 {id:"K22",family:"ICDI 23300",valves:"8",valveType:"LEV",voltage:"115V",graphics:"Standard",extra:"Drop-in, high performance",units:24,price:4000,cost:3150,uniqueParts:2,leadTime:14,openQuotes:0,contractEnd:"",notes:"Overlaps ICDI 2323"},
 {id:"K23",family:"CED 400",valves:"4",valveType:"LPV",voltage:"115V",graphics:"Standard",extra:"R290",units:340,price:4100,cost:2750,uniqueParts:0,leadTime:7,openQuotes:0,contractEnd:"",notes:""},
 {id:"K24",family:"CED 400",valves:"2",valveType:"LPV",voltage:"115V",graphics:"Standard",extra:"R290",units:260,price:3600,cost:2450,uniqueParts:0,leadTime:7,openQuotes:0,contractEnd:"",notes:""},
 {id:"K25",family:"CED 400",valves:"3",valveType:"LPV",voltage:"220-240V 50Hz",graphics:"Standard",extra:"R290",units:90,price:4200,cost:2950,uniqueParts:4,leadTime:21,openQuotes:0,contractEnd:"",notes:"Export"},
 {id:"K26",family:"CED 400",valves:"3",valveType:"LPV",voltage:"220-240V 60Hz",graphics:"Standard",extra:"R290",units:11,price:4200,cost:3500,uniqueParts:5,leadTime:35,openQuotes:2,contractEnd:"",notes:"Export; fan part not listed for this version"},
 {id:"K27",family:"CED 600",valves:"",valveType:"Post-mix",voltage:"115V",graphics:"Standard",extra:"R290",units:220,price:5200,cost:3500,uniqueParts:0,leadTime:10,openQuotes:0,contractEnd:"",notes:""},
 {id:"K28",family:"CED 800",valves:"8",valveType:"Post-mix",voltage:"115V",graphics:"Standard",extra:"R290",units:160,price:6800,cost:4550,uniqueParts:0,leadTime:10,openQuotes:0,contractEnd:"",notes:""},
 {id:"K29",family:"CED 800",valves:"6",valveType:"Post-mix",voltage:"115V",graphics:"Standard",extra:"R290",units:35,price:6300,cost:4700,uniqueParts:2,leadTime:21,openQuotes:0,contractEnd:"",notes:""},
 {id:"K30",family:"Sensation 30",valves:"",valveType:"Post-mix",voltage:"115V",graphics:"Standard",extra:"Cubelet ice",units:300,price:7200,cost:4800,uniqueParts:0,leadTime:10,openQuotes:0,contractEnd:"",notes:""},
 {id:"K31",family:"Sensation 44",valves:"",valveType:"Post-mix",voltage:"115V",graphics:"Standard",extra:"Cubelet ice",units:140,price:9400,cost:6300,uniqueParts:0,leadTime:14,openQuotes:0,contractEnd:"",notes:""},
 {id:"K32",family:"Sensation 44",valves:"",valveType:"Post-mix",voltage:"220-240V",graphics:"Standard",extra:"Cubelet ice",units:18,price:9900,cost:7600,uniqueParts:3,leadTime:35,openQuotes:0,contractEnd:"",notes:"Export"},
 {id:"K33",family:"Sensation 44",valves:"",valveType:"Post-mix",voltage:"115V",graphics:"Digital merchandiser",extra:"Cubelet ice",units:55,price:11800,cost:8100,uniqueParts:2,leadTime:21,openQuotes:0,contractEnd:"",notes:""},
 {id:"K34",family:"Flavor Select 30",valves:"",valveType:"Air Mix nozzle",voltage:"115V",graphics:"Standard",extra:"Cold carbonation",units:120,price:16500,cost:11200,uniqueParts:0,leadTime:21,openQuotes:0,contractEnd:"",notes:""},
 {id:"K35",family:"Flavor Select 44",valves:"",valveType:"Air Mix nozzle",voltage:"115V",graphics:"Standard",extra:"Cold carbonation",units:45,price:19800,cost:14100,uniqueParts:1,leadTime:28,openQuotes:0,contractEnd:"",notes:""},
 {id:"K36",family:"Drive-Thru Solution",valves:"24 brands",valveType:"Multi-flavor",voltage:"115V",graphics:"Standard",extra:"Chewable or cubed ice",units:95,price:24500,cost:16900,uniqueParts:0,leadTime:28,openQuotes:0,contractEnd:"",notes:""},
 {id:"K37",family:"Twin Pour",valves:"266 combinations",valveType:"Multi-flavor",voltage:"115V",graphics:"Two 7in touchscreens",extra:"",units:60,price:32000,cost:22400,uniqueParts:0,leadTime:28,openQuotes:0,contractEnd:"",notes:""},
 {id:"K38",family:"Twin Pour",valves:"266 combinations",valveType:"Multi-flavor",voltage:"230V",graphics:"Two 7in touchscreens",extra:"",units:7,price:33500,cost:27800,uniqueParts:4,leadTime:42,openQuotes:0,contractEnd:"",notes:"Export"},
 {id:"K39",family:"Touch Screen Tower",valves:"10 brands",valveType:"Multi-flavor",voltage:"115V",graphics:"Touchscreen",extra:"",units:110,price:8900,cost:6000,uniqueParts:0,leadTime:21,openQuotes:0,contractEnd:"",notes:""},
 {id:"K40",family:"Quick-Serve Solution",valves:"Multi-valve",valveType:"Multi-flavor nozzle",voltage:"120V",graphics:"Standard",extra:"Ice portioning",units:70,price:14500,cost:10100,uniqueParts:0,leadTime:21,openQuotes:0,contractEnd:"",notes:""},
 {id:"K41",family:"Versa Pour valve",valves:"1",valveType:"Versa Pour",voltage:"24V",graphics:"Standard",extra:"Sold as a component",units:900,price:240,cost:140,uniqueParts:0,leadTime:3,openQuotes:0,contractEnd:"",notes:"Units are valves, not dispensers"}
];
const COLS = ["id","family","valves","valveType","voltage","graphics","extra","units","price","cost","uniqueParts","leadTime","openQuotes","contractEnd","notes"];
const NUMCOLS = ["units","price","cost","uniqueParts","leadTime","openQuotes"];

const DEFAULT_SETTINGS = {complexityCost:2000, retireMaxUnits:50, retireMinNet:15000, retireMaxGM:25, repriceGM:28, quickShipMinUnits:500, targetGM:33, noticeDays:90};

const ACTIONS = {
  "Quick-ship":{c:"var(--a-quickship)",d:"Build ahead and promote as the fast default"},
  "Keep":{c:"var(--a-keep)",d:"No change"},
  "Reprice":{c:"var(--a-reprice)",d:"Raise price toward target margin"},
  "Restrict":{c:"var(--a-restrict)",d:"Special order only, outside the standard configurator"},
  "Merge":{c:"var(--a-merge)",d:"Duplicate of another configuration; fold it in"},
  "Phase out":{c:"var(--a-phaseout)",d:"Retire after a commitment ends"},
  "Retire":{c:"var(--a-retire)",d:"Stop selling with a notice period"}
};

/* ---------- State ---------- */
const state = {
  tab:"diagnose",
  data: SAMPLE.map(r=>({...r})),
  custom:false,
  settings:{...DEFAULT_SETTINGS},
  overrides:{},
  decisions:[],
  selected:null,
  cfgModel:"ibd", cfgs:null, ruleOns:null, catQ:"",
  ai:{onepager:"",ask:"",explain:{}}
};
let caps = {db:null,user:null,sample:null,downloads:null,uid:null,storage:"browser"};

/* ---------- Helpers ---------- */
const $ = s=>document.querySelector(s);
const esc = s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const money = n=>{const s=n<0?"-":"";n=Math.abs(n);return s+"$"+(n>=1e6?(n/1e6).toFixed(2)+"M":n>=1e4?Math.round(n/1e3).toLocaleString()+"k":Math.round(n).toLocaleString());};
const moneyFull = n=>(n<0?"-$":"$")+Math.abs(Math.round(n)).toLocaleString();
const pct = (n,d=1)=>(n).toFixed(d)+"%";
const fmt = n=>Math.round(n).toLocaleString();
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove("show"),2400);}
function addDays(iso,d){const t=new Date(iso+"T12:00:00Z");t.setUTCDate(t.getUTCDate()+d);return t.toISOString().slice(0,10);}
function today(){return new Date().toISOString().slice(0,10);}
function pill(a){return `<span class="pill" style="color:${ACTIONS[a]?ACTIONS[a].c:"var(--ink-2)"}">${esc(a)}</span>`;}
function clsBadge(c){return `<span class="cls ${"c"+c}">${c}</span>`;}
function descOf(r){return [r.family, r.valves?r.valves+(isNaN(+r.valves)?"":" valves"):"", r.valveType, r.voltage, r.graphics!=="Standard"?r.graphics+" graphics":"", r.extra].filter(Boolean).join(", ");}

/* ---------- Analysis engine ---------- */
function analyze(){
  const S = state.settings;
  const rows = state.data.map(r=>{
    const rev=r.units*r.price, gm=r.units*(r.price-r.cost), gmPct=rev?gm/rev*100:0, cx=r.uniqueParts*S.complexityCost;
    return {...r, rev, gm, gmPct, cx, net:gm-cx};
  });
  const totRev = rows.reduce((a,r)=>a+r.rev,0)||1;
  const totUnits = rows.reduce((a,r)=>a+r.units,0)||1;
  const totParts = rows.reduce((a,r)=>a+r.uniqueParts,0);
  const sorted = [...rows].sort((a,b)=>b.rev-a.rev);
  let cum=0;
  sorted.forEach(r=>{cum+=r.rev;r.cumPct=cum/totRev*100;r.cls=r.cumPct<=80.0001?"A":r.cumPct<=95.0001?"B":"C";});
  // duplicates
  const keyOf = r=>[r.family,r.valves,r.valveType,r.voltage,r.graphics,r.extra].join("|").toLowerCase();
  const groups = {};
  rows.forEach(r=>{(groups[keyOf(r)]=groups[keyOf(r)]||[]).push(r);});
  Object.values(groups).forEach(g=>{ if(g.length>1){ const keep=[...g].sort((a,b)=>b.units-a.units)[0]; g.forEach(r=>{ if(r!==keep) r.dupOf=keep.id; }); }});
  // recommendations
  const now = today();
  rows.forEach(r=>{
    const reasons=[], hints=[];
    let act="Keep";
    const contractActive = r.contractEnd && r.contractEnd>=now;
    if(r.dupOf){
      act="Merge"; reasons.push(`Same options as ${r.dupOf}, but a separate item with ${r.uniqueParts} unique part${r.uniqueParts===1?"":"s"}.`);
    } else if(r.net<0){
      act = contractActive?"Phase out":"Retire";
      reasons.push(`Net contribution is ${moneyFull(r.net)}: complexity cost (${moneyFull(r.cx)}) is larger than its margin (${moneyFull(r.gm)}).`);
    } else if(r.units<=S.retireMaxUnits && (r.gmPct<S.retireMaxGM || r.net<S.retireMinNet)){
      reasons.push(`Only ${fmt(r.units)} units a year (limit ${S.retireMaxUnits}).`);
      if(r.gmPct<S.retireMaxGM) reasons.push(`Margin ${pct(r.gmPct)} is below the ${S.retireMaxGM}% floor.`);
      if(r.net<S.retireMinNet) reasons.push(`Net contribution ${moneyFull(r.net)} is below ${moneyFull(S.retireMinNet)}.`);
      if(r.openQuotes>0){act="Restrict";reasons.push(`${r.openQuotes} open quotes, so keep it as a special order instead of retiring.`);}
      else if(contractActive){act="Phase out";reasons.push(`Customer commitment runs to ${r.contractEnd}.`);}
      else act="Retire";
    } else if(r.units>=S.quickShipMinUnits && r.uniqueParts===0){
      act="Quick-ship"; reasons.push(`${fmt(r.units)} units a year with no unique parts: ideal to build ahead.`);
    } else if(r.gmPct<S.repriceGM){
      act="Reprice"; const np=r.cost/(1-S.targetGM/100);
      reasons.push(`Margin ${pct(r.gmPct)} is below the ${S.repriceGM}% reprice line.`);
      reasons.push(`Price for ${S.targetGM}% margin: ${moneyFull(np)} (now ${moneyFull(r.price)}).`);
    } else {
      reasons.push(`Healthy: ${pct(r.gmPct)} margin and ${moneyFull(r.net)} net contribution.`);
    }
    const fam=(r.family||"").toLowerCase();
    if(/front plumbing/i.test(r.extra) && fam.startsWith("ibd")) hints.push("Lancer's public IBD pages list front and rear plumbing access as standard. Ask engineering what this kit adds before keeping it.");
    if(/custom/i.test(r.graphics) && fam.startsWith("ibd")) hints.push("IBD graphics are interchangeable. Selling the panel as a program accessory on a standard unit would remove this configuration's unique parts.");
    if(/2[23]0/.test(r.voltage)) hints.push("Export variant: keep at least one 230V option per cabinet size that sells abroad, and check regional demand before retiring.");
    if(contractActive) hints.push(`Customer commitment until ${r.contractEnd}: no retirement before this date.`);
    if(r.openQuotes>0) hints.push(`${r.openQuotes} open quotes: honor them before any restriction takes effect.`);
    if(/up \d+%/i.test(r.notes)) hints.push("Growing fast: watch margin and lead time as volume scales.");
    if(/fan part not listed/i.test(r.notes)) hints.push("Lancer's CED 400 manual lists no 220 to 240V / 60 Hz fan assembly. Confirm the part with engineering before selling more of this version.");
    if(/Overlaps ICDI 2323/i.test(r.notes)) hints.push("An 8-valve high-performance drop-in already exists as the ICDI 2323. Check whether both are needed.");
    if(/component/i.test(r.extra)) hints.push("Component sold on its own: judge it on attach rate and service demand, not like a dispenser.");
    r.rec=act; r.reasons=reasons; r.hints=hints;
    r.action = state.overrides[r.id] || act;
  });
  // impact
  const S2=S;
  const imp={revLost:0,gmLost:0,cxSaved:0,partsRemoved:0,units:0,repriceUplift:0,qsUnits:0,variantsOut:0};
  rows.forEach(r=>{
    if(r.action==="Retire"||r.action==="Phase out"){imp.revLost+=r.rev;imp.gmLost+=r.gm;imp.cxSaved+=r.cx;imp.partsRemoved+=r.uniqueParts;imp.units+=r.units;imp.variantsOut++;}
    if(r.action==="Merge"){imp.cxSaved+=r.cx;imp.partsRemoved+=r.uniqueParts;imp.variantsOut++;}
    if(r.action==="Restrict"){imp.variantsOut++;}
    if(r.action==="Reprice"){const np=r.cost/(1-S2.targetGM/100); if(np>r.price) imp.repriceUplift+=r.units*(np-r.price);}
    if(r.action==="Quick-ship") imp.qsUnits+=r.units;
  });
  const qs = rows.filter(r=>r.action==="Quick-ship");
  const avgStdGM = qs.length? qs.reduce((a,r)=>a+(r.price-r.cost)*r.units,0)/qs.reduce((a,r)=>a+r.units,0) : 1000;
  imp.net = imp.cxSaved - imp.gmLost;
  imp.breakEvenUnits = imp.net<0 ? Math.ceil(-imp.net/avgStdGM) : 0;
  imp.qsCoverage = imp.qsUnits/totUnits*100;
  imp.avgStdGM = avgStdGM;
  // class shares
  const share={A:{rev:0,units:0,parts:0,n:0},B:{rev:0,units:0,parts:0,n:0},C:{rev:0,units:0,parts:0,n:0}};
  rows.forEach(r=>{const s=share[r.cls];s.rev+=r.rev;s.units+=r.units;s.parts+=r.uniqueParts;s.n++;});
  const totGM = rows.reduce((a,r)=>a+r.gm,0);
  return {rows, sorted, totRev, totUnits, totParts, totGM, share, imp};
}

/* ---------- Persistence ---------- */
let saveTimer=null;
function snapshot(){return {settings:state.settings, overrides:state.overrides, decisions:state.decisions, custom:state.custom, data: state.custom?state.data:null, v:1};}
function applySaved(s){
  if(!s||typeof s!=="object") return;
  if(s.settings) state.settings={...DEFAULT_SETTINGS,...s.settings};
  if(s.overrides) state.overrides=s.overrides;
  if(Array.isArray(s.decisions)) state.decisions=s.decisions;
  if(s.custom && Array.isArray(s.data) && s.data.length){state.data=s.data;state.custom=true;}
}
function scheduleSave(){clearTimeout(saveTimer);saveTimer=setTimeout(save,700);}
async function save(){
  const snap=snapshot();
  if(caps.db && caps.uid){
    try{ await caps.db.doc(`data/users/${caps.uid}/workspace`).set({json:JSON.stringify(snap), savedAt:new Date().toISOString()}); renderStatus(); return; }
    catch(e){ /* fall through to browser */ }
  }
  try{ localStorage.setItem("ibd-cockpit",JSON.stringify(snap)); }catch(e){}
}
function loadLocal(){ try{ const s=localStorage.getItem("ibd-cockpit"); if(s) applySaved(JSON.parse(s)); }catch(e){} }

/* ---------- Status & nav ---------- */
function renderStatus(){
  const a=analyze();
  $("#status").innerHTML = `<span>${caps.storage==="account"?"Saved to your account":"Saved in this browser"}</span>
  
  <span>${a.rows.length} configurations, ${state.custom?"your data":"practice data"}</span>`;
}
const TABS=[["catalog","Product catalog"],["diagnose","Diagnose"],["decide","Decide"],["rules","Validate rules"],["record","Record & share"],["data","Data"]];
function renderNav(){
  $("#steps").innerHTML = TABS.map(([k,l],i)=>{
    const n = k==="data"?"⚙":String(i+1);
    return (i? (k==="data"?'<span class="sep" aria-hidden="true" style="background:transparent;width:18px"></span>':'<span class="sep" aria-hidden="true"></span>'):"")+
    `<button data-tab="${k}" ${state.tab===k?'aria-current="page"':""}><span class="n" aria-hidden="true">${n}</span>${l}</button>`;
  }).join("");
}

/* ---------- Diagnose ---------- */
function scatterSVG(a, opts={}){
  const W=640,H=360,pl=54,pr=18,pt=16,pb=46;
  const rows=a.rows.filter(r=>r.units>0);
  const maxU=Math.max(...rows.map(r=>r.units),10), minU=Math.max(1,Math.min(...rows.map(r=>r.units)));
  const lx0=Math.log10(Math.max(1,minU*0.7)), lx1=Math.log10(maxU*1.4);
  const gms=rows.map(r=>r.gmPct); const y0=Math.floor(Math.min(10,...gms)/5)*5, y1=Math.ceil(Math.max(40,...gms)/5)*5;
  const X=u=>pl+(Math.log10(u)-lx0)/(lx1-lx0)*(W-pl-pr);
  const Y=g=>pt+(1-(g-y0)/(y1-y0))*(H-pt-pb);
  const maxRev=Math.max(...rows.map(r=>r.rev));
  const R=v=>5+Math.sqrt(v/maxRev)*19;
  const S=state.settings;
  let g=`<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Units sold versus gross margin for each configuration" style="min-width:520px">`;
  // grid
  const ticks=[1,3,10,30,100,300,1000,3000,10000].filter(t=>Math.log10(t)>=lx0&&Math.log10(t)<=lx1);
  ticks.forEach(t=>{g+=`<line x1="${X(t)}" x2="${X(t)}" y1="${pt}" y2="${H-pb}" stroke="var(--line-2)"/><text x="${X(t)}" y="${H-pb+16}" font-size="11.5" text-anchor="middle" fill="var(--ink-3)">${t.toLocaleString()}</text>`;});
  for(let v=y0;v<=y1;v+=5){g+=`<line x1="${pl}" x2="${W-pr}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--line-2)"/><text x="${pl-8}" y="${Y(v)+4}" font-size="11.5" text-anchor="end" fill="var(--ink-3)">${v}%</text>`;}
  // threshold lines
  const xv=X(Math.max(S.retireMaxUnits,minU*0.7)), yv=Y(S.repriceGM);
  g+=`<rect x="${pl}" y="${yv}" width="${Math.max(0,xv-pl)}" height="${H-pb-yv}" fill="var(--a-retire)" opacity=".07"/>`;
  g+=`<line x1="${xv}" x2="${xv}" y1="${pt}" y2="${H-pb}" stroke="var(--ink-3)" stroke-dasharray="4 4"/>`;
  g+=`<line x1="${pl}" x2="${W-pr}" y1="${yv}" y2="${yv}" stroke="var(--ink-3)" stroke-dasharray="4 4"/>`;
  g+=`<text x="${xv+6}" y="${pt+12}" font-size="11.5" fill="var(--ink-2)">${S.retireMaxUnits} units</text>`;
  g+=`<text x="${W-pr}" y="${yv-6}" font-size="11.5" text-anchor="end" fill="var(--ink-2)">${S.repriceGM}% margin</text>`;
  g+=`<text x="${pl+6}" y="${H-pb-8}" font-size="11.5" fill="var(--a-retire)">Long tail</text>`;
  g+=`<text x="${(pl+W-pr)/2}" y="${H-8}" font-size="12" text-anchor="middle" fill="var(--ink-2)">Units sold in 12 months (log scale)</text>`;
  g+=`<text transform="translate(14 ${(pt+H-pb)/2}) rotate(-90)" font-size="12" text-anchor="middle" fill="var(--ink-2)">Gross margin</text>`;
  // points (largest first so small on top)
  [...rows].sort((p,q)=>q.rev-p.rev).forEach(r=>{
    const c=ACTIONS[r.action]?ACTIONS[r.action].c:"var(--ink-2)";
    const sel=state.selected===r.id;
    g+=`<g data-pick="${esc(r.id)}" style="cursor:pointer" tabindex="0" role="button" aria-label="${esc(r.id)}: ${fmt(r.units)} units, ${pct(r.gmPct)} margin, ${esc(r.action)}">
      <circle cx="${X(r.units)}" cy="${Y(r.gmPct)}" r="${R(r.rev)}" fill="${c}" fill-opacity="${sel?.55:.22}" stroke="${c}" stroke-width="${sel?2.5:1.4}"/>
      <text x="${X(r.units)}" y="${Y(r.gmPct)+3.5}" font-size="10" font-weight="600" text-anchor="middle" fill="var(--ink)">${esc(r.id)}</text></g>`;
  });
  g+=`</svg>`;
  return g;
}
function actionLegend(a){
  const used=[...new Set(a.rows.map(r=>r.action))];
  return `<div class="legend">${Object.keys(ACTIONS).filter(k=>used.includes(k)).map(k=>`<span><i style="background:${ACTIONS[k].c}"></i>${k}</span>`).join("")}<span>Bubble size = revenue</span></div>`;
}
function shareBars(a){
  const sh=a.share, tot={rev:a.totRev, units:a.totUnits, parts:a.totParts||1};
  const row=(label,key)=>`<div class="share-row"><span>${label}</span><div class="bar">${["A","B","C"].map(c=>{const v=sh[c][key]/tot[key]*100;return v>0?`<span class="c${c}" style="width:${v}%" title="${c}: ${pct(v)}">${v>=7?c+" "+Math.round(v)+"%":""}</span>`:"";}).join("")}</div></div>`;
  return `<div class="shares">${row("Revenue","rev")}${row("Units","units")}${row("Unique parts","parts")}</div>
  <div class="legend"><span><i class="cA"></i>A: top 80% of revenue (${sh.A.n})</span><span><i class="cB"></i>B: next 15% (${sh.B.n})</span><span><i class="cC"></i>C: last 5% (${sh.C.n})</span></div>`;
}
function renderDiagnose(){
  const a=analyze();
  const c=a.share.C, cRev=c.rev/a.totRev*100, cParts=a.totParts?c.parts/a.totParts*100:0;
  const dups=a.rows.filter(r=>r.dupOf), neg=a.rows.filter(r=>r.net<0), slow=a.rows.filter(r=>r.leadTime>=35);
  const alerts=[];
  dups.forEach(r=>alerts.push(`<div class="alert bad"><b>Duplicate:</b> ${esc(r.id)} has the same options as ${esc(r.dupOf)} but is a separate item. Merge it.</div>`));
  if(neg.length) alerts.push(`<div class="alert bad"><b>Losing money:</b> ${neg.map(r=>esc(r.id)).join(", ")} cost more to carry than they earn.</div>`);
  if(slow.length) alerts.push(`<div class="alert"><b>Slow to ship:</b> ${slow.map(r=>esc(r.id)+" ("+r.leadTime+" days)").join(", ")} take 5+ weeks.</div>`);
  const missing=a.rows.filter(r=>!r.cost||!r.price);
  if(missing.length) alerts.push(`<div class="alert bad"><b>Missing price or cost:</b> ${missing.map(r=>esc(r.id)).join(", ")}. Fix these before deciding.</div>`);
  $("#ck-main").innerHTML = `
  <div class="kpis">
    <div class="kpi"><div class="v">${a.rows.length}</div><div class="l">Active configurations</div></div>
    <div class="kpi"><div class="v">${fmt(a.totUnits)}</div><div class="l">Units, 12 months</div></div>
    <div class="kpi"><div class="v">${money(a.totRev)}</div><div class="l">Revenue</div></div>
    <div class="kpi"><div class="v">${pct(a.totGM/a.totRev*100)}</div><div class="l">Gross margin</div></div>
    <div class="kpi"><div class="v">${a.totParts}</div><div class="l">Unique parts carried</div></div>
    <div class="kpi"><div class="v">${money(a.rows.reduce((s,r)=>s+r.cx,0))}</div><div class="l">Complexity cost a year</div></div>
  </div>
  <div class="grid g-hero">
    <section class="panel">
      <h2>Where the complexity sits</h2>
      <p class="hero-line">C-class configurations bring <b>${pct(cRev)}</b> of revenue but carry <b>${pct(cParts,0)}</b> of unique parts.</p>
      ${shareBars(a)}
      <p class="small muted" style="margin-top:12px">Classes rank configurations by revenue. Unique parts are the ones each configuration alone uses, so each one must be stocked, costed and kept on drawings and BOMs.</p>
    </section>
    <section class="panel">
      <h2>What needs attention</h2>
      ${alerts.join("")||'<p class="muted">No data problems found.</p>'}
      <p class="small muted" style="margin-top:10px">Next: open <b>Decide</b> to set your thresholds and see the recommended action for every configuration.</p>
      <div class="btn-row" style="margin-top:8px"><button class="btn" data-tab="decide">Go to Decide</button></div>
    </section>
  </div>
  <section class="panel" style="margin-top:16px">
    <h2>Volume against margin</h2>
    <p class="small muted">Each bubble is a configuration, coloured by its current action. Click one to see why.</p>
    <div class="chart-wrap">${scatterSVG(a)}</div>
    ${actionLegend(a)}
    <div id="drawer-slot">${drawerHTML(a)}</div>
  </section>`;
}

/* ---------- Drawer ---------- */
function drawerHTML(a){
  const r=a.rows.find(x=>x.id===state.selected); if(!r) return "";
  const ex=state.ai.explain[r.id]||"";
  return `<div class="drawer" aria-live="polite">
    <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline">
      <h3 style="font-size:17px"><span class="id">${esc(r.id)}</span> &nbsp;${esc(descOf(r))}</h3>
      <div>${pill(r.action)} ${state.overrides[r.id]?'<span class="ovr">your override (recommended: '+esc(r.rec)+')</span>':""}</div>
    </div>
    <p class="small muted">${fmt(r.units)} units, ${moneyFull(r.rev)} revenue, ${pct(r.gmPct)} margin, ${r.uniqueParts} unique parts, ${r.leadTime}-day lead time, class ${r.cls}${r.notes?". "+esc(r.notes):""}</p>
    <h3>Why ${esc(r.rec)}</h3>
    <ul class="reasons">${r.reasons.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
    ${r.hints.length?`<h3>Check before deciding</h3>${r.hints.map(h=>`<div class="hint">${esc(h)}</div>`).join("")}`:""}
    <div class="btn-row" style="margin-top:10px">
      <button class="btn ghost" data-log="${esc(r.id)}">Log this decision</button>
      ${caps.sample?`<button class="btn ghost" data-explain="${esc(r.id)}">Ask the AI analyst to challenge it</button>`:""}
      <button class="btn ghost" data-close>Close</button>
    </div>
    ${ex?`<div class="ai-out" id="explain-out">${esc(ex)}</div>`:`<div id="explain-out"></div>`}
  </div>`;
}

/* ---------- Decide ---------- */
const SLIDERS=[
  ["complexityCost","Complexity cost per unique part",500,6000,250,v=>"$"+v.toLocaleString(),"Yearly cost to stock, plan, cost and document one unique part."],
  ["retireMaxUnits","Low-volume line (units a year)",5,200,5,v=>v,"At or below this, a configuration is a retirement candidate."],
  ["retireMaxGM","Retirement margin floor",10,35,1,v=>v+"%","Low-volume configurations under this margin are retired."],
  ["retireMinNet","Minimum net contribution",0,100000,2500,v=>"$"+v.toLocaleString(),"Low-volume configurations earning less after complexity cost are retired."],
  ["repriceGM","Reprice line",20,35,1,v=>v+"%","Configurations under this margin are repriced."],
  ["targetGM","Target margin when repricing",25,45,1,v=>v+"%","Used to calculate the new price."],
  ["quickShipMinUnits","Quick-ship volume line",100,2000,50,v=>v.toLocaleString(),"Configurations above this with no unique parts are built ahead."],
  ["noticeDays","Customer notice period (days)",30,180,15,v=>v,"Time between announcement and last order date."]
];
function renderDecide(){
  $("#ck-main").innerHTML = `
  <div class="grid g-decide">
    <aside class="panel" aria-label="Decision thresholds">
      <h2>Your thresholds</h2>
      <p class="small muted">Set the rules once; every recommendation updates as you move them.</p>
      ${SLIDERS.map(([k,l,mn,mx,st,f,h])=>`<label class="field"><span class="t">${l}<output id="o-${k}">${f(state.settings[k])}</output></span>
        <input type="range" min="${mn}" max="${mx}" step="${st}" value="${state.settings[k]}" data-set="${k}" aria-describedby="h-${k}"><span class="help" id="h-${k}">${h}</span></label>`).join("")}
      <div class="btn-row"><button class="btn ghost" data-reset-settings>Reset thresholds</button><button class="btn ghost" data-clear-overrides>Clear my overrides</button></div>
    </aside>
    <div id="decide-results"></div>
  </div>`;
  renderDecideResults();
}
function renderDecideResults(){
  const a=analyze(), I=a.imp;
  const counts={}; a.rows.forEach(r=>counts[r.action]=(counts[r.action]||0)+1);
  const netCls = I.net>=0?"pos":"neg";
  const el=$("#decide-results"); if(!el) return;
  el.innerHTML=`
  <div class="impact" aria-live="polite">
    <div><div class="v">${I.variantsOut}</div><div class="l">Configurations leaving the standard offer</div></div>
    <div><div class="v">${I.partsRemoved}</div><div class="l">Unique parts removed (of ${a.totParts})</div></div>
    <div><div class="v neg">${money(-I.revLost)}</div><div class="l">Revenue at risk (${pct(I.revLost/a.totRev*100,2)})</div></div>
    <div><div class="v ${netCls}">${money(I.net)}</div><div class="l">Complexity saved minus margin lost, before migration</div></div>
    <div><div class="v">${I.breakEvenUnits?I.breakEvenUnits+" of "+fmt(I.units):"None"}</div><div class="l">Units that must switch to standard models to break even</div></div>
    <div><div class="v pos">${money(I.repriceUplift)}</div><div class="l">Repricing upside at today's volume</div></div>
    <div><div class="v">${pct(I.qsCoverage)}</div><div class="l">Units covered by quick-ship</div></div>
  </div>
  <div class="legend" style="margin:-4px 0 10px">${Object.keys(ACTIONS).filter(k=>counts[k]).map(k=>`<span><i style="background:${ACTIONS[k].c}"></i>${k}: ${counts[k]}</span>`).join("")}</div>
  <div class="table-wrap"><table>
    <thead><tr><th>Config</th><th>Description</th><th>Class</th><th class="num">Units</th><th class="num">Revenue</th><th class="num">Margin</th><th class="num">Unique parts</th><th class="num">Net contribution</th><th>Action</th></tr></thead>
    <tbody>${a.sorted.map(r=>`<tr class="row ${state.selected===r.id?"sel":""}" data-pick="${esc(r.id)}">
      <td><span class="id">${esc(r.id)}</span></td><td class="desc">${esc(descOf(r))}</td><td>${clsBadge(r.cls)}</td>
      <td class="num">${fmt(r.units)}</td><td class="num">${money(r.rev)}</td><td class="num">${pct(r.gmPct)}</td><td class="num">${r.uniqueParts}</td>
      <td class="num" style="color:${r.net<0?"var(--bad)":"inherit"}">${money(r.net)}</td>
      <td><select class="act" data-override="${esc(r.id)}" aria-label="Action for ${esc(r.id)}" style="color:${ACTIONS[r.action].c};font-weight:600">${Object.keys(ACTIONS).map(k=>`<option value="${k}" ${r.action===k?"selected":""}>${k}${k===r.rec?" (rec.)":""}</option>`).join("")}</select>${state.overrides[r.id]?'<span class="ovr">edited</span>':""}</td></tr>`).join("")}</tbody>
  </table></div>
  <div class="btn-row" style="margin-top:12px">
    <button class="btn" data-log-all>Log all non-Keep decisions</button>
    <button class="btn ghost" data-export-analysis>Download analysis (CSV)</button>
  </div>
  <div id="drawer-slot">${drawerHTML(a)}</div>`;
  SLIDERS.forEach(([k,,,,,f])=>{const o=$("#o-"+k); if(o) o.textContent=f(state.settings[k]);});
}

/* ---------- Validate rules: multi-family configurators ----------
   IBD part numbers: IBD Series 4500 Operation Manual, Lancer PN 28-3194 (Nov 2025).
   CED 400 part numbers: CED 400 R290 Operation Manual, Lancer PN 28-3141 (Sep 2023).
   ICDI part numbers: ICDI 2200/2300/23300 Operation Manual (2018-2022). All read from lancerworldwide.com product pages. */
const APPROVED = ["QSR-A","CSTORE-C"];
const CAB = {
  "22":{label:"IBD 22",valves:["6"],shroud:"05-2753/01",wheel:"82-3556-01",lid:[["05-1467/01","Back lid, IBD 22"],["05-1476/02","Front lid"]],merch:"82-2630",splS:"30-8466",splE:"30-9073",drip:"82-4042/02",panel:"06-2165",lens:"27-0063",diff:"27-0069/01",trim:"82-1551/02",wrap:"30-10350",ebox:{"115V":"82-6007","230V":"82-2017/03"},drive:{"115V":[["82-3688/02","Drive assembly, motor, 115V"]],"230V":[["82-3834/01","Drive assembly, motor, 230V"]]},led:"82-5169"},
  "25":{label:"IBD 25",valves:["8"],shroud:"05-1658/02",wheel:"82-3556-01",lid:[["05-1659","Back lid, IBD 25"],["05-1476/02","Front lid"]],merch:"82-2706/02",splS:"30-8625",splE:"30-9372",drip:"82-3186/02",panel:"06-2166",lens:"27-0068",diff:"27-0071/01",trim:"82-2704",wrap:"30-10877",ebox:{"115V":"82-6007","230V":"82-2017/03"},drive:{"115V":[["82-3688/02","Drive assembly, motor, 115V"]],"230V":[["82-3834/01","Drive assembly, motor, 230V"]]},led:"82-5169"},
  "30":{label:"IBD 30",valves:["8","10"],shroud:"05-1310/02",wheel:"82-3556-01",lid:[["05-1606","Back lid, IBD 30"],["05-1476/02","Front lid"]],merch:"82-2641/01",splS:"30-10141",splE:"30-8565/01",drip:"82-4153/03",panel:"06-2167",lens:"27-0064",diff:"27-0070/01",trim:"82-1618/02",wrap:"30-10878",ebox:{"115V":"82-6007","230V":"82-2017/03"},drive:{"115V":[["82-3688/02","Drive assembly, motor, 115V"]],"230V":[["82-3834/01","Drive assembly, motor, 230V"]]},led:"82-5169"},
  "44":{label:"IBD 44",valves:["12"],shroud:"05-1311/01",wheel:"82-3650",lid:[["05-1392","One-piece lid, IBD 44"]],merch:"82-1980/04",splS:"30-8635/01",splE:"30-8794",drip:"82-3187/03",panel:"06-2168",lens:"27-0056",diff:"",trim:"82-1899",wrap:"30-8636",ebox:{"115V":"82-2404","230V":"82-3811"},drive:{"115V":[["82-3688/02","Drive assembly, motor, left, 115V"],["82-3689/01","Drive assembly, motor, right, 115V"]],"230V":[["82-3834/01","Drive assembly, motor, left, 230V"],["82-3941/01","Drive assembly, motor, right, 230V"]]},led:"82-5264"}
};
const FAUCET = {"22-6":"82-1559","25-8":"82-2703","30-8":"82-1631","30-10":"82-1938","44-12":"82-2260"};

function quote(lines,qty,oneTime,adders,base){
  const unit=lines.reduce((s,l)=>s+l[1],0), total=unit*qty, disc=qty>=20?total*0.04:0;
  const top=[...adders].sort((p,q)=>q[1]-p[1])[0];
  return {lines,unit,total,disc,oneTime,grand:total-disc+oneTime,lead:(base||7)+(top?top[1]:0),driver:top?top[0]:"standard build"};
}
const MODELS = {
 ibd:{
  title:"IBD Series 4500 (IBD 22, 25, 30, 44)",
  sub:"Part numbers and rules tagged Lancer manual come from the IBD Series 4500 Operation Manual (PN 28-3194, November 2025).",
  fields:[["cab","Cabinet",[["22","IBD 22"],["25","IBD 25"],["30","IBD 30"],["44","IBD 44"]]],["valves","Valve count",["6","8","10","12"]],["vtype","Valve type",[["LEV","LEV (standard)"],["PC","Portion control (volumetric)"],["Other","Other, on request"]]],["market","Market",[["NA","North America"],["EX","Export"]]],["voltage","Voltage",[["115V","115V / 60 Hz"],["230V","220 to 240V / 50 to 60 Hz"]]],["ice","Ice type",[["Hard","Hard (cube) ice"],["Cubelet","Cubelet ice"],["Chewable","Chewable / pellet ice"]]],["maker","Ice maker on top",[["None","None (manual fill)"],["Hoshizaki","Hoshizaki Cubelet"],["Other","Other hard-ice maker"]]],["install","Installation",[["Legs","On supplied legs"],["Sealed","Sealed to counter"]]],["splash","Splash plate",["Standard","Extended"]],["graphics","Graphics",[["Generic","Generic panel"],["Brand","Brand panel (program)"]]],["program","Program ID","text"]],
  defaults:{cab:"30",valves:"10",voltage:"115V",market:"NA",vtype:"LEV",ice:"Hard",maker:"None",graphics:"Generic",program:"",install:"Legs",splash:"Standard"},
  rules:{
   R1:{t:"table",src:"manual",txt:"Valve count must match the cabinet: IBD 22 = 6, IBD 25 = 8, IBD 30 = 8 or 10, IBD 44 = 12 (one faucet plate exists per combination)."},
   R2:{t:"expression",src:"manual",txt:"Cubelet ice works only with a Hoshizaki Cubelet ice maker (or manual fill); a Hoshizaki Cubelet maker requires the cubelet setup."},
   R3:{t:"expression",src:"manual",txt:"Chewable or pellet ice is not suitable for the IBD (melts too quickly). Offer the Bold 30i, Drive-Thru Solution or Twin Pour instead."},
   R4:{t:"system table",src:"manual",txt:"Brand graphic panels (anything other than the generic panel) need an approved program arranged through Customer Service."},
   R5:{t:"table",src:"practice",txt:"Export orders require 230V; North America orders require 115V."}},
  viol(c,on){const v=[];
   if(on.R1 && !(CAB[c.cab]&&CAB[c.cab].valves.includes(c.valves))) v.push("R1");
   if(on.R2 && ((c.ice==="Cubelet"&&c.maker==="Other")||(c.maker==="Hoshizaki"&&c.ice!=="Cubelet"))) v.push("R2");
   if(on.R3 && c.ice==="Chewable") v.push("R3");
   if(on.R4 && c.graphics==="Brand" && !APPROVED.includes((c.program||"").trim().toUpperCase())) v.push("R4");
   if(on.R5 && ((c.market==="EX"&&c.voltage!=="230V")||(c.market==="NA"&&c.voltage!=="115V"))) v.push("R5");
   return v;},
  bom(c){const C=CAB[c.cab], n=+c.valves, b=[]; const add=(pn,d,q,src)=>b.push([pn,d,q,src||"manual"]);
   add(C.shroud,"Wheel shroud, "+C.label,1); add(C.wheel,"Dispensing wheel assembly",1); add("23-1373","Agitator assembly",1);
   C.lid.forEach(l=>add(l[0],l[1],1));
   add(C.merch,"Merchandiser assembly, "+C.label,1); add(C.lens,"Merchandiser lens, "+C.label,1); if(C.diff) add(C.diff,"Diffuser lens, "+C.label,1); add(C.led,"LED light assembly",1);
   add(c.splash==="Extended"?C.splE:C.splS,"Splash plate, "+(c.splash==="Extended"?"extended, ":"")+C.label,1);
   add(C.drip,"Drip tray assembly, "+C.label,1); add(C.trim,"Trim assembly, "+C.label,1); add(C.wrap,"Back wrapper, "+C.label,1);
   const fp=FAUCET[c.cab+"-"+c.valves]; add(fp||"NO PART","Faucet plate assembly, "+n+" valves, "+C.label+(fp?"":" (does not exist)"),1);
   C.drive[c.voltage].forEach(d=>add(d[0],d[1],1)); add(C.ebox[c.voltage],"Electrical box assembly, "+c.voltage+", "+C.label,1);
   add("12-0097","Key lock switch",1); add("82-4226","Solenoid assembly",1); add("82-3987","Ice chute assembly",1);
   if(c.graphics==="Brand") add("Via Customer Service","Brand graphic panel, program "+((c.program||"").toUpperCase()||"(none)"),1,"process"); else add(C.panel,"Graphic panel, generic, "+C.label,1);
   if(c.vtype==="LEV") add("See LEV spec sheet","LEV valve",n,"spec"); else if(c.vtype==="PC") add("See volumetric valve spec sheet","Volumetric (portion control) valve",n,"spec"); else add("Per engineering","Valve on request, engineering review",n,"process");
   if(c.install==="Sealed"){ add("Not public","Counter sealant (NSF sealing)",1,"rule"); add("Not public","3/8 in 90° splice fittings, cold plate inlets","As needed","rule"); } else add("Supplied with unit","Leg set",1,"rule");
   return b;},
  notes(c){const n=[]; n.push(c.ice==="Cubelet"?"Mount the bin thermostat for the cubelet configuration (manual diagram).":"Mount the bin thermostat for the hard ice configuration (manual diagram).");
   if(c.ice==="Chewable") n.push("If pellet ice is used anyway, set agitation to 4 seconds ON every 150 minutes (manual).");
   if(c.install==="Sealed") n.push("Seal the unit to the counter per NSF requirements; use 90° splices so beverage tubing does not kink (manual).");
   if(c.vtype==="PC") n.push("Program each volumetric valve with the handheld programmer (24 VAC).");
   if(c.market==="EX") n.push("Ship the export document set in the market's language.");
   if(c.maker==="None") n.push("No ice maker: leave clearance to fill the bin with a five-gallon bucket (manual).");
   return n;},
  price(c,qty){const n=+c.valves, base={"22":4900,"25":5400,"30":c.valves==="10"?6300:5900,"44":8600}[c.cab]||0;
   const L=[[CAB[c.cab].label+", "+n+" valves",base]], A=[];
   if(c.vtype==="PC"){L.push(["Portion control, $90 × "+n,90*n]);A.push(["portion control",7]);}
   if(c.vtype==="Other"){L.push(["Valves on request, $250 × "+n,250*n]);A.push(["valve on request",28]);}
   if(c.voltage==="230V"){L.push(["230V"+(c.cab==="44"?" (two drive motors)":""),c.cab==="44"?600:400]);A.push(["230V",14]);}
   if(c.splash==="Extended") L.push(["Extended splash plate",85]);
   if(c.graphics==="Brand"){L.push(["Brand graphic panel",650]);A.push(["brand graphics",21]);}
   return quote(L,qty,(c.vtype==="Other"?500:0)+(c.graphics==="Brand"?1200:0),A);},
  combos(){const out=[]; ["22","25","30","44"].forEach(cab=>["6","8","10","12"].forEach(valves=>["115V","230V"].forEach(voltage=>["NA","EX"].forEach(market=>["LEV","PC","Other"].forEach(vtype=>["Hard","Cubelet","Chewable"].forEach(ice=>["None","Hoshizaki","Other"].forEach(maker=>[["Generic",""],["Brand","QSR-A"],["Brand",""],["Brand","ZZZ-9"]].forEach(([graphics,program])=>out.push({cab,valves,voltage,market,vtype,ice,maker,graphics,program,install:"Legs",splash:"Standard"})))))))));return out;},
  comboNote:"Installation and splash plate change the BOM but not validity, so they are not multiplied in.",
  tests(){const T0=this.defaults; return [
   {name:"IBD 30, 10 valves, LEV, 115V, hard ice, generic",c:{...T0},expect:true},
   {name:"IBD 44, 12 portion control, 230V export, cubelet with Hoshizaki maker",c:{...T0,cab:"44",valves:"12",vtype:"PC",voltage:"230V",market:"EX",ice:"Cubelet",maker:"Hoshizaki"},expect:true},
   {name:"IBD 22, brand panel QSR-A, sealed to counter",c:{...T0,cab:"22",valves:"6",graphics:"Brand",program:"QSR-A",install:"Sealed"},expect:true},
   {name:"IBD 22 with 8 valves (must block)",c:{...T0,cab:"22",valves:"8"},expect:false},
   {name:"IBD 30 with 12 valves (must block)",c:{...T0,valves:"12"},expect:false},
   {name:"Cubelet ice with another brand's ice maker (must block)",c:{...T0,ice:"Cubelet",maker:"Other"},expect:false},
   {name:"Chewable ice on IBD 25 (must block)",c:{...T0,cab:"25",valves:"8",ice:"Chewable"},expect:false},
   {name:"Brand panel without program (must block)",c:{...T0,graphics:"Brand",program:""},expect:false},
   {name:"Export order at 115V (must block)",c:{...T0,market:"EX"},expect:false}];}
 },
 ced:{
  title:"CED 400 counter electric (R290)",
  sub:"Part numbers come from the CED 400 R290 Operation Manual (PN 28-3141, September 2023). Valve counts come from the CED 400 product page.",
  fields:[["valves","LPV valves",["2","3","4","6"]],["elec","Electrical",[["115-60","115V / 60 Hz"],["230-50","220 to 240V / 50 Hz"],["230-60","220 to 240V / 60 Hz"]]],["market","Market",[["NA","North America"],["EX","Export"]]]],
  defaults:{valves:"4",elec:"115-60",market:"NA"},
  rules:{
   C1:{t:"table",src:"manual",txt:"The CED 400 is offered with 2, 3 or 4 LPV valves only (product page); a merchandiser exists for each."},
   C2:{t:"table",src:"practice",txt:"Export orders require a 220 to 240V version; North America orders require 115V / 60 Hz."}},
  viol(c,on){const v=[]; if(on.C1&&!["2","3","4"].includes(c.valves)) v.push("C1"); if(on.C2&&((c.market==="EX"&&c.elec==="115-60")||(c.market==="NA"&&c.elec!=="115-60"))) v.push("C2"); return v;},
  bom(c){const b=[], add=(pn,d,q,src)=>b.push([pn,d,q,src||"manual"]), hv=c.elec!=="115-60";
   add("05-4271/01","Drip tray, CED 400",1); add("05-4270/01","Cup rest, CED 400",1); add("30-16489","Splash plate, CED 400",1); add("17-0469","Fitting assembly, CO2 in",1); add("12-0667","LED light bar, 12 in",1);
   const m={"2":"82-6570","3":"82-6634","4":"82-6635"}[c.valves]; add(m||"NO PART","Merchandiser assembly, "+c.valves+" valves"+(m?"":" (does not exist)"),1);
   add("64-5132/04-02","PCB assembly, R290 refrigeration control",1); add("64-6059","PCB assembly, agitator switch",1); add("12-1064","Power EMI filter",1); add("52-4283","Probe assembly, electronic ice bank control",1); add("86-0084","Pump, rotary vane, water",1); add("17-0485","Check valve assembly, double",1);
   add(hv?"91-0065":"91-0063","Carbonator motor, "+(hv?"230V 50 to 60 Hz":"115V"),1);
   add(hv?"82-6990":"82-6989/01","Agitator assembly, "+(hv?"220 to 240V":"115V"),1);
   if(c.elec==="115-60") add("82-6806","Fan assembly, 115V / 60 Hz",1); else if(c.elec==="230-50") add("82-6791","Fan assembly, 220 to 240V / 50 Hz",1); else add("Not listed","Fan assembly, 220 to 240V / 60 Hz (manual lists only 50 Hz and 115V fans)",1,"process");
   add(hv?"26-0377/01":"26-0374/01","Capacitor, carbonator motor, "+(hv?"230V":"115V"),1);
   add(hv?"25-0120":"25-0119","Transformer, "+(hv?"240/230V to 24V":"110V to 24V"),1);
   if(hv){add("12-1043 or 12-1006","Compressor relay (230V or 220V 50/60 Hz version: confirm)",1,"confirm"); add("12-1061 or 12-1008","Compressor overload (confirm version)",1,"confirm"); add("12-1042 or 12-1007","Compressor start capacitor (confirm version)",1,"confirm");}
   else {add("12-1000","Compressor relay, 115V",1); add("12-1001","Compressor overload, 115V",1); add("12-1002","Compressor start capacitor, 115V",1);}
   add("See LPV spec sheet","LPV valve",+c.valves,"spec"); return b;},
  notes(c){const n=["R290 natural refrigerant unit with internal cold carbonation and an electronic ice bank control (product page)."]; if(c.elec!=="115-60") n.push("The manual lists separate 220V and 230V compressor relay, overload and start capacitor parts. Confirm which one this electrical version uses before release."); if(c.elec==="230-60") n.push("No 220 to 240V / 60 Hz fan is listed in the manual's parts list. Raise this with engineering before selling the version."); return n;},
  price(c,qty){const L=[["CED 400, "+c.valves+" LPV valves",{"2":3600,"3":3850,"4":4100,"6":4600}[c.valves]]], A=[]; if(c.elec!=="115-60"){L.push(["220 to 240V version",350]);A.push(["220 to 240V version",14]);} return quote(L,qty,0,A);},
  combos(){const out=[]; ["2","3","4","6"].forEach(valves=>["115-60","230-50","230-60"].forEach(elec=>["NA","EX"].forEach(market=>out.push({valves,elec,market})))); return out;},
  comboNote:"",
  tests(){const T0=this.defaults; return [
   {name:"CED 400, 4 valves, 115V, North America",c:{...T0},expect:true},
   {name:"CED 400, 2 valves, 220 to 240V / 50 Hz, export",c:{...T0,valves:"2",elec:"230-50",market:"EX"},expect:true},
   {name:"CED 400 with 6 valves (must block)",c:{...T0,valves:"6"},expect:false},
   {name:"Export order at 115V (must block)",c:{...T0,market:"EX"},expect:false}];}
 },
 icdi:{
  title:"ICDI drop-ins (2200, 2300, 2323, 23300)",
  sub:"Part numbers come from the ICDI 2200/2300/23300 Operation Manual (2018 to 2022). Valve counts come from the product pages.",
  fields:[["unit","Unit",[["2200","ICDI 2200"],["2300","ICDI 2300"],["2323","ICDI 2323"],["23300","ICDI 23300"]]],["valves","Valve count",["6","8","10"]]],
  defaults:{unit:"2300",valves:"8"},
  rules:{I1:{t:"table",src:"manual",txt:"Valve count must match the unit: ICDI 2200 = 6, ICDI 2300 and 2323 = 8, ICDI 23300 = 8 or 10."}},
  viol(c,on){const ok={"2200":["6"],"2300":["8"],"2323":["8"],"23300":["8","10"]}[c.unit]; return on.I1&&!ok.includes(c.valves)?["I1"]:[];},
  bom(c){const b=[], add=(pn,d,q,src)=>b.push([pn,d,q,src||"manual"]);
   const T={"6":["82-6362","82-6363","82-6364"],"8":["82-6145/01","82-6278/01","82-6159/01"],"10":["82-6109","82-6110","82-6108"]}[c.valves];
   add(T[0],"Left tower structure assembly, "+c.valves+" valves",1); add(T[1],"Center tower structure assembly, "+c.valves+" valves",1); add(T[2],"Right tower structure assembly, "+c.valves+" valves",1);
   add("82-3029","Power supply assembly, 120 to 24V, 75 W",1); add("08-0510","Drain tube, insulated",1);
   if(c.valves==="8") add("82-1600","Label kit, 8 LEV, 3-1-1-3",1);
   if(c.unit==="2323"){add("82-0992","Accessory kit, 2323 ICDI",1); add("05-2586/01","Drip tray, 2323",1); add("30-16124/02","Sliding bin cover, 2323",1);}
   add("See LEV spec sheet","LEV valve",+c.valves,"spec"); return b;},
  notes(c){return ["Cut the counter to the ICDI counter cut-out drawing for this unit (downloads library).", c.unit==="2300"||c.unit==="2323"?"Any valve can run carbonated or plain water (product page).":"Confirm carbonated and plain water valve positions with the customer."];},
  price(c,qty){const base={"2200":2900,"2300":3400,"2323":3900,"23300":c.valves==="10"?4300:4000}[c.unit]; return quote([["ICDI "+c.unit+", "+c.valves+" valves",base]],qty,0,c.unit==="2323"||c.unit==="23300"?[["high-performance build",3]]:[]);},
  combos(){const out=[]; ["2200","2300","2323","23300"].forEach(unit=>["6","8","10"].forEach(valves=>out.push({unit,valves}))); return out;},
  comboNote:"",
  tests(){return [
   {name:"ICDI 2200, 6 valves",c:{unit:"2200",valves:"6"},expect:true},
   {name:"ICDI 23300, 10 valves",c:{unit:"23300",valves:"10"},expect:true},
   {name:"ICDI 2300 with 10 valves (must block)",c:{unit:"2300",valves:"10"},expect:false},
   {name:"ICDI 2200 with 8 valves (must block)",c:{unit:"2200",valves:"8"},expect:false}];}
 }
};
Object.values(MODELS).forEach(M=>{M.allOn=Object.fromEntries(Object.keys(M.rules).map(k=>[k,true]));});
function curM(){return MODELS[state.cfgModel];}
function curC(){return state.cfgs[state.cfgModel];}
function curOn(){return state.ruleOns[state.cfgModel];}
function renderRules(){
  const M=curM(), c=curC();
  const fld=([k,label,opts])=>opts==="text"?`<label>${label}<input type="text" data-cfg="${k}" placeholder="e.g. QSR-A" autocomplete="off"></label>`:`<label>${label}<select data-cfg="${k}">${opts.map(o=>Array.isArray(o)?`<option value="${o[0]}">${o[1]}</option>`:`<option>${o}</option>`).join("")}</select></label>`;
  $("#ck-main").innerHTML=`
  <section class="panel" style="margin-bottom:16px">
    <div class="btn-row" style="justify-content:space-between">
      <div><h2 style="margin:0">Configure and test a product family</h2><p class="small muted" style="margin:2px 0 0">Families with a public parts list have a full configurator here. For every other product, see the Product catalog step.</p></div>
      <label class="small" style="font-weight:500">Product family <select data-model class="act" style="font-size:14px;padding:6px 8px">${Object.entries(MODELS).map(([k,m])=>`<option value="${k}" ${state.cfgModel===k?"selected":""}>${m.title}</option>`).join("")}</select></label>
    </div>
  </section>
  <div class="grid g-2">
    <section class="panel">
      <h2>${esc(M.title)}</h2>
      <p class="small muted">${esc(M.sub)} Prices, lead times and rules tagged Practice rule are practice values.</p>
      <div class="cfg-grid" id="cfg-form">${M.fields.map(fld).join("")}<label>Quantity<input type="text" inputmode="numeric" id="cfg-qty" value="25"></label></div>
      <div id="cfg-out"></div>
    </section>
    <section class="panel">
      <h2>Rules and tests</h2>
      <p class="small muted">Switch a rule off to see how many invalid orders would reach the factory. Target: 98% or better of accepted orders are buildable.</p>
      <div class="rules">${Object.entries(M.rules).map(([k,r])=>`<label class="rule"><input type="checkbox" data-rule="${k}" ${curOn()[k]?"checked":""}><span class="rid">${k}</span><span>${esc(r.txt)} <span class="tag">${r.src==="manual"?"Lancer manual":"Practice rule"}</span> <span class="tag">${r.t} constraint</span></span></label>`).join("")}</div>
      <div id="rules-out"></div>
    </section>
  </div>`;
  document.querySelectorAll("[data-cfg]").forEach(el=>{el.value=c[el.dataset.cfg];});
  renderCfgOut(); renderRulesOut();
}
function renderCfgOut(){
  const M=curM(), c=curC(), v=M.viol(c,curOn()), all=M.viol(c,M.allOn);
  const qty=Math.max(1,parseInt(($("#cfg-qty")||{}).value,10)||1), p=M.price(c,qty);
  const srcTag={manual:"Lancer manual",spec:"Spec sheet",rule:"From install rule",process:"Process",confirm:"Manual: confirm version"};
  let h="";
  if(v.length) h+=`<div class="verdict bad" role="status">Blocked by ${v.join(", ")}: ${v.map(k=>esc(M.rules[k].txt)).join(" ")}</div>`;
  else if(all.length) h+=`<div class="verdict bad" role="status">Accepted, but it breaks ${all.join(", ")}. With that rule off, this order would reach the factory.</div>`;
  else h+=`<div class="verdict ok" role="status">Valid configuration${c.vtype==="Other"?", flagged for engineering review":""}</div>`;
  const bom=M.bom(c);
  h+=`<h3>Order BOM <span class="small muted" style="font-weight:400">(${bom.length} lines)</span></h3><div class="table-wrap"><table><thead><tr><th>Part</th><th>Description</th><th class="num">Qty</th><th>Source</th></tr></thead><tbody>${bom.map(b=>`<tr><td style="${b[0]==="NO PART"?"color:var(--bad);font-weight:600":""}">${esc(b[0])}</td><td class="desc">${esc(b[1])}</td><td class="num">${b[2]}</td><td><span class="tag">${srcTag[b[3]]}</span></td></tr>`).join("")}</tbody></table></div>
  <p class="small muted" style="margin-top:6px">Quantity 1 is shown where the manual's parts list does not state a quantity.</p>`;
  const notes=M.notes(c); if(notes.length) h+=`<h3 style="margin-top:14px">Build and install notes</h3><ul class="reasons">${notes.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`;
  h+=`<h3 style="margin-top:14px">Price and lead time <span class="tag">Practice values</span></h3><div class="table-wrap"><table><tbody>
    ${p.lines.map(l=>`<tr><td>${esc(l[0])}</td><td class="num">${moneyFull(l[1])}</td></tr>`).join("")}
    <tr><td><b>Unit list price</b></td><td class="num"><b>${moneyFull(p.unit)}</b></td></tr>
    <tr><td>${qty} units</td><td class="num">${moneyFull(p.total)}</td></tr>
    ${p.disc?`<tr><td>Quantity discount (4%, 20+ units)</td><td class="num">-${moneyFull(p.disc)}</td></tr>`:""}
    ${p.oneTime?`<tr><td>One-time fees (setup, engineering)</td><td class="num">${moneyFull(p.oneTime)}</td></tr>`:""}
    <tr><td><b>Order total</b></td><td class="num"><b>${moneyFull(p.grand)}</b></td></tr>
    <tr><td>Quoted lead time (7 days + longest adder: ${esc(p.driver)})</td><td class="num"><b>${p.lead} days</b></td></tr>
  </tbody></table></div>`;
  $("#cfg-out").innerHTML=h;
}
function renderRulesOut(){
  const M=curM(), combos=M.combos(), on=curOn();
  let valid=0, leak=0; const blockedBy=Object.fromEntries(Object.keys(M.rules).map(k=>[k,0]));
  combos.forEach(c=>{const v=M.viol(c,on), vf=M.viol(c,M.allOn); if(!v.length){valid++; if(vf.length) leak++;} v.forEach(k=>blockedBy[k]++);});
  const tests=M.tests().map(t=>{const ok=M.viol(t.c,on).length===0; return {...t,pass:ok===t.expect};});
  const passed=tests.filter(t=>t.pass).length, acc=(valid-leak)/Math.max(1,valid)*100;
  $("#rules-out").innerHTML=`
  <div class="impact" style="margin-top:14px">
    <div><div class="v">${combos.length.toLocaleString()}</div><div class="l">Combinations tested</div></div>
    <div><div class="v">${valid.toLocaleString()}</div><div class="l">Accepted by the configurator</div></div>
    <div><div class="v ${leak?"neg":"pos"}">${leak.toLocaleString()}</div><div class="l">Invalid orders that would reach the factory</div></div>
    <div><div class="v ${acc>=98?"pos":"neg"}">${pct(acc)}</div><div class="l">Accuracy of accepted orders (KPI: 98%+)</div></div>
  </div>
  <p class="small muted">Blocked by each rule: ${Object.entries(blockedBy).map(([k,n])=>`${k} ${n.toLocaleString()}`).join(", ")}. ${M.comboNote}</p>
  <h3 style="margin-top:12px">Regression tests: ${passed} of ${tests.length} passing</h3>
  <div class="table-wrap"><table><thead><tr><th>Test</th><th>Expected</th><th>Result</th></tr></thead><tbody>
  ${tests.map(t=>`<tr><td class="desc">${esc(t.name)}</td><td>${t.expect?"Accept":"Block"}</td><td class="${t.pass?"pass":"fail"}">${t.pass?"Pass":"Fail"}</td></tr>`).join("")}
  </tbody></table></div>`;
}

/* ---------- Product catalog (all 21 products, read from lancerworldwide.com Oct 2 2026) ---------- */
const CATALOG=[
 ["IBD 22\"","Ice beverage dispenser","22.0 × 30.5 × 34","115V/60 Hz 3.0 A; 220 to 240V/50 to 60 Hz 1.5 A","180 lb","6 valves; self-serve or portion control; LEV standard, others on request; graphics","Full parts list","ibd-22","ibd"],
 ["IBD 25\"","Ice beverage dispenser","25.0 × 30.5 × 34.0","115V 3.6 A; 230V 1.8 A","210 lb","8 valves; same valve and graphics choices","Full parts list","ibd-25","ibd"],
 ["IBD 30\"","Ice beverage dispenser","30.0 × 30.5 × 34.0","115V 3.6 A; 230V 1.8 A","250 lb","8 or 10 valves; same valve and graphics choices","Full parts list","ibd-30","ibd"],
 ["IBD 44\"","Ice beverage dispenser","44.0 × 30.5 × 34.0","115V 6.0 A; 220 to 240V 3.0 A","360 lb","12 valves; two ice drive motors","Full parts list","ibd-44","ibd"],
 ["IBD Bold 30i","Premium ice beverage dispenser","30.00 × 33.85 × 40.60","120V/60 Hz 5 A","280 lb","20 to 24 brands + 4 flavor shots; 16 chilled / 12 ambient lines; cubed or chewable ice; 32\" touchscreen","Options only","ibd-bold-30i",""],
 ["ICDI 2200","Ice-cooled drop-in","15 × 23 × 34.25","115V","60 lb","6 valves","Partial parts list","icdi-2200","icdi"],
 ["ICDI 2300","Ice-cooled drop-in","25.2 × 25.2 × 42.4","115V","100 lb","8 valves; carbonated or plain water on any valve","Partial parts list","icdi-2300","icdi"],
 ["ICDI 2323","Ice-cooled drop-in (high performance)","25.2 × 25.2 × 42.4","115V","100 lb","8 valves; carbonated or plain water on any valve","Partial parts list","2323","icdi"],
 ["ICDI 23300","Ice-cooled drop-in (high performance)","30 × 23 × 35.25","Not stated","Not stated","8 or 10 valves","Partial parts list","icdi-23300","icdi"],
 ["CED 400","Counter electric","10.83 × 29.75 × 32.60","115V/60 Hz; 220 to 240V/50 Hz; 220 to 240V/60 Hz","Ice bank","2, 3 or 4 LPV valves; R290; internal cold carbonation","Electrical parts list","ced-400","ced"],
 ["CED 600","Counter electric","16.86 × 25.56 × 26.86","115V; 220 to 240V","Ice bank","R290; electronic ice bank control","Options only","ced-600",""],
 ["CED 800","Counter electric","23.96 × 28.49 × 32.27","Not stated","Ice bank","6 or 8 post-mix valves; R290","Options only","ced-800",""],
 ["Sensation 30\"","Cubelet ice beverage dispenser","30.0 × 31.0 × 37.25","115V","250 lb","Cubelet ice with no equipment change","Options only","sensation-30",""],
 ["Sensation 44\"","Cubelet ice beverage dispenser","44.00 × 31.13 × 39.36","115V; 220 to 240V","312 lb","Cubelet ice; digital merchandiser version","Options only","sensation-44",""],
 ["Flavor Select 30\"","Multi-flavor dispenser","30 × 30.5 × 40.25","Not stated","290 lb","Cold carbonation; Air Mix nozzles; three ice-fill options","Options only","flavor-select-30",""],
 ["Flavor Select 44\"","Multi-flavor dispenser","44.875 × 30.5 × 40.25","Not stated","400 lb","Same as the 30\"","Options only","flavor-select-44",""],
 ["Drive-Thru Solution","Drive-thru beverage and ice system","30.00 × 31.1 × 39.33","115V","Not stated","Up to 24 brands (16 chilled, 8 ambient); chewable or cubed ice; portion control for drinks and ice","Options only","dts",""],
 ["Twin Pour","Dual-station dispenser","44.00 × 31.13 × 39.36","115V; 230V","312 lb","Up to 266 flavor combinations; two 7\" touchscreens; two ice dispense points","Options only","twin-pour",""],
 ["Touch Screen Tower","Touchscreen beverage tower","9.2 × 17.1 × 26.9","Not stated","No ice","Up to 10 brands + 4 flavor shots; carbonated or non-carbonated","Options only","touch-screen-tower",""],
 ["Quick-Serve Solution","Quick-serve ice and beverage system","Not stated","120V","Not stated","Ice portioning with cup-size presets; multi-valve unit; multi-flavor nozzle","Options only","quick-serve-solution",""],
 ["Versa Pour valve","Valve","Not stated","Not stated","Not stated","Valve sold for use across dispensers","Options only","valves",""]
];
function renderCatalog(){
  const q=(state.catQ||"").toLowerCase();
  const rows=CATALOG.filter(r=>!q||r.join(" ").toLowerCase().includes(q));
  const a=analyze(); const inPortfolio=fam=>a.rows.filter(r=>(r.family||"").toLowerCase()===fam.replace(/"/g,"").toLowerCase()).length;
  $("#ck-main").innerHTML=`
  <section class="panel">
    <h2>All 21 current Lancer products</h2>
    <p class="small muted">Read from each product page on lancerworldwide.com on October 2, 2026. A dash means the page does not state it. “Data depth” says how far the public documents go: full parts lists exist for the IBD 4500 series; other families show options and specs only.</p>
    <label class="sr" for="cat-q">Search products</label><input type="text" id="cat-q" placeholder="Search, e.g. 230V, chewable, R290" value="${esc(state.catQ||"")}" style="width:100%;max-width:360px;margin:6px 0 12px">
    <div class="table-wrap"><table><thead><tr><th>Product</th><th>Type</th><th>Size (W × D × H, in)</th><th>Electrical</th><th>Ice</th><th>Configurable choices</th><th>Data depth</th><th class="num">In portfolio</th></tr></thead><tbody>
    ${rows.map(r=>`<tr><td><b>${esc(r[0])}</b><br><a href="https://www.lancerworldwide.com/shop/${r[7]}" target="_blank" rel="noopener" class="small">Product page</a>${r[8]?`&nbsp;&nbsp; <a href="#" data-open-model="${r[8]}" class="small">Configure</a>`:""}</td><td class="desc">${esc(r[1])}</td><td>${esc(r[2])}</td><td class="desc">${esc(r[3])}</td><td>${esc(r[4])}</td><td class="desc" style="max-width:300px">${esc(r[5])}</td><td><span class="tag">${esc(r[6])}</span></td><td class="num">${inPortfolio(r[0])}</td></tr>`).join("")}
    </tbody></table></div>
    <p class="small muted" style="margin-top:10px">“In portfolio” counts the practice configurations of that product in Diagnose and Decide.</p>
  </section>`;
}

/* ---------- Record & share ---------- */
function makeDecision(r){
  const S=state.settings, ann=today(), lastOrder=addDays(ann,S.noticeDays);
  let eff=lastOrder; if(r.action==="Phase out" && r.contractEnd && r.contractEnd>lastOrder) eff=r.contractEnd;
  const reason = (state.overrides[r.id]?"Override of "+r.rec+". ":"")+r.reasons.join(" ");
  const needsDates = ["Retire","Phase out","Restrict","Merge"].includes(r.action);
  return {id:r.id, desc:descOf(r), action:r.action, reason, owner:"", announce:needsDates?ann:"", lastOrder:needsDates?eff:"", lastShip:needsDates?addDays(eff,r.leadTime):"", status:"Proposed", loggedAt:new Date().toISOString()};
}
function logDecision(id){
  const a=analyze(), r=a.rows.find(x=>x.id===id); if(!r) return;
  state.decisions = state.decisions.filter(d=>d.id!==id).concat([makeDecision(r)]);
  scheduleSave(); toast(`Logged ${id}: ${r.action}`);
}
function renderRecord(){
  const a=analyze(), d=state.decisions;
  $("#ck-main").innerHTML=`
  <section class="panel">
    <h2>Decision log</h2>
    <p class="small muted">Your record for the configuration review board. Dates use your ${state.settings.noticeDays}-day notice period and each configuration's lead time; edit them before sharing.</p>
    ${d.length?`<div class="table-wrap"><table><thead><tr><th>Config</th><th>Action</th><th>Owner</th><th>Announce</th><th>Last order</th><th>Last ship</th><th>Status</th><th>Reason</th><th></th></tr></thead><tbody>
      ${d.map((x,i)=>`<tr>
        <td><span class="id">${esc(x.id)}</span></td><td>${pill(x.action)}</td>
        <td><input type="text" data-dec="${i}" data-f="owner" value="${esc(x.owner)}" placeholder="Name" aria-label="Owner for ${esc(x.id)}" style="width:110px"></td>
        <td><input type="date" data-dec="${i}" data-f="announce" value="${esc(x.announce)}" aria-label="Announce date"></td>
        <td><input type="date" data-dec="${i}" data-f="lastOrder" value="${esc(x.lastOrder)}" aria-label="Last order date"></td>
        <td><input type="date" data-dec="${i}" data-f="lastShip" value="${esc(x.lastShip)}" aria-label="Last ship date"></td>
        <td><select data-dec="${i}" data-f="status" class="act">${["Proposed","Approved","In progress","Done"].map(s=>`<option ${x.status===s?"selected":""}>${s}</option>`).join("")}</select></td>
        <td style="white-space:normal;min-width:260px;font-size:12.5px">${esc(x.reason)}</td>
        <td><button class="btn ghost" data-del="${i}" aria-label="Remove ${esc(x.id)}">Remove</button></td></tr>`).join("")}
    </tbody></table></div>`:`<p>No decisions logged yet. In <b>Decide</b>, choose “Log all non-Keep decisions”, or log configurations one at a time from their detail panel.</p><div class="btn-row"><button class="btn" data-tab="decide">Go to Decide</button></div>`}
    ${d.length?`<div class="btn-row" style="margin-top:12px"><button class="btn ghost" data-export-log>Download decision log (CSV)</button><button class="btn ghost" data-clear-log>Clear log</button></div>`:""}
  </section>
  <div class="grid ${caps.sample?"g-2":""}" style="margin-top:16px">
    <section class="panel">
      <h2>One-page recommendation</h2>
      <p class="small muted">${caps.sample?"The AI analyst drafts the memo for your VP from the numbers on screen. Check every figure before you send it.":"Build the memo for the review board from the numbers on screen, then edit it before you send it."}</p>
      <div class="btn-row">${caps.sample?`<button class="btn" data-onepager>Draft the one-pager</button><button class="btn ghost" data-stop hidden>Stop</button>`:""}<button class="btn ${caps.sample?"ghost":""}" data-template>${caps.sample?"Use the template":"Build the one-pager"}</button><button class="btn ghost" data-export-onepager ${state.ai.onepager?"":"disabled"}>Download (.md)</button></div>
      <div class="ai-out" id="onepager-out" ${state.ai.onepager?"":"hidden"}>${esc(state.ai.onepager)}</div>
    </section>
    ${caps.sample?`    <section class="panel">
      <h2>Ask about this portfolio</h2>
      <p class="small muted">Ask what a review board or VP would ask. The analyst sees the same table you do.</p>
      ${caps.sample?`<label class="sr" for="ask-in">Question</label><textarea id="ask-in" style="min-height:70px;font-family:var(--sans);font-size:14px" placeholder="Sales says retiring K13 will lose a distributor. How should I respond?"></textarea>
      <div class="btn-row" style="margin-top:8px"><button class="btn" data-ask>Ask</button>${["What are my three biggest risks?","Which decision would a VP push back on?","Summarize the plan in 3 sentences for sales"].map(q=>`<button class="btn ghost small" data-q="${esc(q)}">${esc(q)}</button>`).join("")}</div>
      <div class="ai-out" id="ask-out" ${state.ai.ask?"":"hidden"}>${esc(state.ai.ask)}</div>`:`<p class="muted">The AI analyst isn't available in this view.</p>`}
    </section>`:""}
  </div>`;
}
function portfolioContext(){
  const a=analyze(), S=state.settings;
  const rows=a.sorted.map(r=>({id:r.id,config:descOf(r),units:r.units,revenue:Math.round(r.rev),gmPct:+r.gmPct.toFixed(1),uniqueParts:r.uniqueParts,netContribution:Math.round(r.net),leadTimeDays:r.leadTime,class:r.cls,recommended:r.rec,chosenAction:r.action,openQuotes:r.openQuotes||0,contractEnd:r.contractEnd||null,notes:r.notes||null,duplicateOf:r.dupOf||null,checks:r.hints}));
  return JSON.stringify({context:"Practice data modeled on Lancer Worldwide's IBD and drop-in beverage dispenser lineup.",
    thresholds:S, totals:{configs:a.rows.length,units:a.totUnits,revenue:Math.round(a.totRev),grossMarginPct:+(a.totGM/a.totRev*100).toFixed(1),uniqueParts:a.totParts},
    impactOfChosenActions:{revenueAtRisk:Math.round(a.imp.revLost),marginLost:Math.round(a.imp.gmLost),complexitySaved:Math.round(a.imp.cxSaved),netBeforeMigration:Math.round(a.imp.net),breakEvenUnitsToMigrate:a.imp.breakEvenUnits,repriceUpside:Math.round(a.imp.repriceUplift),quickShipCoveragePct:+a.imp.qsCoverage.toFixed(1),uniquePartsRemoved:a.imp.partsRemoved},
    configurations:rows, decisionLog:state.decisions.map(d=>({id:d.id,action:d.action,lastOrder:d.lastOrder,status:d.status}))});
}
let aiCtl=null;
const AI_ERR={not_granted:"You declined AI access for this page. Reload to be asked again.",rate_limited:"Too many requests just now. Wait a minute and try again.",prompt_too_large:"The portfolio is too large to send. Remove some rows and try again.",refused:"The analyst declined this request. Rephrase it.",cancelled:"Stopped."};
async function runAI(prompt,outId,store,key,btn){
  const out=document.getElementById(outId); if(!out||!caps.sample) return;
  if(aiCtl) aiCtl.abort();
  aiCtl=new AbortController();
  out.hidden=false; out.textContent="Thinking…";
  if(btn) btn.disabled=true;
  const stop=document.querySelector("[data-stop]"); if(stop&&outId==="onepager-out") stop.hidden=false;
  try{
    const {text}=await caps.sample(prompt,{signal:aiCtl.signal,onText:({text})=>{out.textContent=text;}});
    out.textContent=text;
    if(key) state.ai[store][key]=text; else state.ai[store]=text;
    const dl=document.querySelector("[data-export-onepager]"); if(dl&&store==="onepager") dl.disabled=false;
  }catch(e){
    out.textContent=(e&&e.text?e.text+"\n\n":"")+(AI_ERR[e&&e.code]||"The analyst couldn't answer. Try again in a moment.");
  }finally{ if(btn) btn.disabled=false; if(stop) stop.hidden=true; }
}
function templateText(){
  const a=analyze(), I=a.imp;
  const by=k=>a.rows.filter(r=>r.action===k).map(r=>r.id).join(", ")||"none";
  const parts=[["Retire",x=>"retire "+x],["Merge",x=>"merge "+x],["Restrict",x=>"restrict "+x+" to special order"],["Phase out",x=>"phase out "+x+" after commitments end"],["Reprice",x=>"reprice "+x]].filter(([k])=>by(k)!=="none").map(([k,f])=>f(by(k)));
  const rest=parts.length?" "+parts.join("; ").replace(/^./,c=>c.toUpperCase())+".":"";
  return `Dispenser portfolio recommendation\n\nRecommendation\nMake ${by("Quick-ship")} our quick-ship standards (${pct(I.qsCoverage)} of units).${rest}\n\nImpact\n- Unique parts removed: ${I.partsRemoved} of ${a.totParts}\n- Revenue at risk: ${moneyFull(I.revLost)} (${pct(I.revLost/a.totRev*100,2)} of total)\n- Complexity saved minus margin lost: ${moneyFull(I.net)} a year before any customer switches\n- Repricing upside at today's volume: ${moneyFull(I.repriceUplift)}\n\nRisks and mitigations\n- [Customer or contract affected] → [alternative offered]\n- [Open quotes] → honored until the last order date\n\nDecisions needed\n- Approve the retirement list and a ${state.settings.noticeDays}-day notice period\n- Approve new prices for repriced configurations`;
}

/* ---------- Data ---------- */
function toCSV(rows,cols){const q=v=>{v=v==null?"":String(v);return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v;};return [cols.join(",")].concat(rows.map(r=>cols.map(c=>q(r[c])).join(","))).join("\n");}
function parseCSV(text){
  const rows=[];let row=[],f="",q=false;
  for(let i=0;i<text.length;i++){const ch=text[i];
    if(q){ if(ch==='"'){ if(text[i+1]==='"'){f+='"';i++;} else q=false; } else f+=ch; }
    else if(ch==='"') q=true; else if(ch===','){row.push(f);f="";} else if(ch==='\n'||ch==='\r'){ if(ch==='\r'&&text[i+1]==='\n') i++; row.push(f);rows.push(row);row=[];f=""; } else f+=ch; }
  if(f.length||row.length){row.push(f);rows.push(row);}
  return rows.filter(r=>r.some(c=>c.trim()!==""));
}
function renderData(){
  $("#ck-main").innerHTML=`
  <section class="panel">
    <h2>Load your own configuration data</h2>
    <p>Paste a CSV with a header row. Required columns: <b>id, units, price, cost, uniqueParts</b>. Optional: family, valves, valveType, voltage, graphics, extra, leadTime, openQuotes, contractEnd (YYYY-MM-DD), notes.</p>
    <p class="small muted">Tip: export 12 months of configured sales from your ERP, add standard cost and a count of parts used only by that configuration.</p>
    <label class="sr" for="csv-in">CSV data</label>
    <textarea id="csv-in" spellcheck="false">${esc(toCSV(state.data,COLS))}</textarea>
    <div id="csv-msg" class="small" style="margin-top:8px" role="status"></div>
    <div class="btn-row" style="margin-top:10px"><button class="btn" data-load-csv>Load this data</button><button class="btn ghost" data-reset-data>Restore full practice data (all families)</button><button class="btn ghost" data-export-data>Download as CSV</button></div>
  </section>`;
}
function loadCSV(){
  const msg=$("#csv-msg"), rows=parseCSV($("#csv-in").value);
  if(rows.length<2){msg.innerHTML='<span class="fail">Add a header row and at least one data row.</span>';return;}
  const head=rows[0].map(h=>h.trim()); const idx={}; head.forEach((h,i)=>idx[h.toLowerCase()]=i);
  const need=["id","units","price","cost","uniqueparts"].filter(k=>!(k in idx));
  if(need.length){msg.innerHTML=`<span class="fail">Missing column${need.length>1?"s":""}: ${need.join(", ")}.</span>`;return;}
  const errs=[], data=[];
  rows.slice(1).forEach((r,n)=>{
    const o={}; COLS.forEach(c=>{const i=idx[c.toLowerCase()]; o[c]=i==null?"":(r[i]||"").trim();});
    NUMCOLS.forEach(c=>{const v=parseFloat(String(o[c]).replace(/[$,]/g,"")); o[c]=isNaN(v)?0:v;});
    if(!o.id) errs.push(`Row ${n+2}: missing id`);
    if(o.price<=0||o.cost<=0) errs.push(`Row ${n+2} (${o.id||"?"}): price and cost must be above 0`);
    if(!o.graphics) o.graphics="Standard"; if(!o.leadTime) o.leadTime=7;
    data.push(o);
  });
  const ids=data.map(d=>d.id); const dupIds=ids.filter((x,i)=>ids.indexOf(x)!==i);
  if(dupIds.length) errs.push(`Duplicate ids: ${[...new Set(dupIds)].join(", ")}`);
  if(errs.length){msg.innerHTML=`<span class="fail">Fix ${errs.length} problem${errs.length>1?"s":""} before loading:</span><br>`+errs.slice(0,8).map(esc).join("<br>");return;}
  state.data=data; state.custom=true; state.overrides={}; state.selected=null; scheduleSave(); renderStatus();
  msg.innerHTML=`<span class="pass">Loaded ${data.length} configurations.</span> Open Diagnose to see the results.`;
}

/* ---------- Downloads ---------- */
async function download(filename,data){
  if(!caps.downloads){try{const u=URL.createObjectURL(new Blob([data],{type:/\.csv$/.test(filename)?"text/csv":"text/markdown"}));const l=document.createElement("a");l.href=u;l.download=filename;document.body.appendChild(l);l.click();l.remove();setTimeout(()=>URL.revokeObjectURL(u),1500);}catch(e){toast("Couldn't save the file here");}return;}
  try{ await caps.downloads.save({filename,data}); }
  catch(e){ if(e&&e.code==="declined") return; toast(e&&e.code==="rate_limited"?"A download is already waiting for your answer":"Couldn't save the file here"); }
}

/* ---------- Render router ---------- */
function ckTop(){const el=document.getElementById("cockpit"); if(el&&el.getBoundingClientRect().top<0) el.scrollIntoView({block:"start"});}
function render(){
  renderNav(); renderStatus();
  ({catalog:renderCatalog,diagnose:renderDiagnose,decide:renderDecide,rules:renderRules,record:renderRecord,data:renderData})[state.tab]();
}
function refreshDrawer(){const slot=$("#drawer-slot"); if(slot) slot.innerHTML=drawerHTML(analyze());}
function pick(id){
  state.selected = state.selected===id?null:id;
  if(state.tab==="diagnose") renderDiagnose(); else if(state.tab==="decide") renderDecideResults();
  const d=$(".drawer"); if(d) d.scrollIntoView({block:"nearest",behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
}

/* ---------- Events ---------- */
document.addEventListener("click",e=>{
  const t=e.target.closest("button,[data-pick],tr[data-pick],a[data-open-model]"); if(!t) return; if(t.matches("a[data-open-model]")) e.preventDefault();
  const ds=t.dataset;
  if(ds.tab){state.tab=ds.tab;render();ckTop();return;}
  if(ds.openModel){state.cfgModel=ds.openModel;state.tab="rules";render();ckTop();return;}
  if(ds.pick && !e.target.closest("select")){pick(ds.pick);return;}
  if("close" in ds){state.selected=null;refreshDrawer();return;}
  if(ds.log){logDecision(ds.log);return;}
  if("logAll" in ds){const a=analyze(); const keep=state.decisions.filter(d=>!a.rows.some(r=>r.id===d.id&&r.action!=="Keep")); state.decisions=keep.concat(a.sorted.filter(r=>r.action!=="Keep").map(makeDecision)); scheduleSave(); toast(`Logged ${a.rows.filter(r=>r.action!=="Keep").length} decisions`); return;}
  if("resetSettings" in ds){state.settings={...DEFAULT_SETTINGS};scheduleSave();renderDecide();return;}
  if("clearOverrides" in ds){state.overrides={};scheduleSave();renderDecideResults();return;}
  if(ds.explain){const a=analyze(), r=a.rows.find(x=>x.id===ds.explain);
    runAI(`You are a senior product line manager reviewing a beverage dispenser configuration portfolio. Challenge the action chosen for ${r.id} in under 180 words, in plain English. Give: (1) whether you agree and why, using the numbers, (2) the strongest argument against it, (3) one question to ask sales, engineering or service before deciding. Do not invent facts beyond the data.\n\nPortfolio data (JSON):\n${portfolioContext()}`,"explain-out","explain",r.id,t); return;}
  if("onepager" in ds){runAI(`Write a one-page recommendation memo (under 350 words) to the VP of Product Line Management about this dispenser configuration portfolio. Structure: a two-sentence answer first; "Decisions" (3-5 bullets naming configuration ids and actions); "Impact" (numbers from impactOfChosenActions only); "Risks and mitigations" (customers, contracts, open quotes, export variants, service); "Approvals needed". Plain English, no hype, use only numbers in the data, and say "practice data" once.\n\nData (JSON):\n${portfolioContext()}`,"onepager-out","onepager",null,t);return;}
  if("stop" in ds){if(aiCtl) aiCtl.abort();return;}
  if("template" in ds){state.ai.onepager=templateText();const o=$("#onepager-out");o.hidden=false;o.textContent=state.ai.onepager;const dl=document.querySelector("[data-export-onepager]");if(dl)dl.disabled=false;return;}
  if(ds.q){const box=$("#ask-in"); if(box) box.value=ds.q;}
  if("ask" in ds || ds.q){const box=$("#ask-in"); const q=(box&&box.value.trim())||""; if(!q){toast("Type a question first");return;}
    runAI([{role:"user",content:`You are a senior product configuration and product line management expert at a beverage dispenser manufacturer. Answer the question below about this portfolio in under 200 words, plain English, using the data's numbers. If the data can't answer it, say what data you'd need.\n\nData (JSON):\n${portfolioContext()}\n\nQuestion: ${q}`}],"ask-out","ask",null,t);return;}
  if(ds.del!=null){state.decisions.splice(+ds.del,1);scheduleSave();renderRecord();return;}
  if("clearLog" in ds){if(t.dataset.armed){state.decisions=[];scheduleSave();renderRecord();toast("Decision log cleared");}else{t.dataset.armed="1";t.textContent="Click again to clear";setTimeout(()=>{if(t.isConnected){delete t.dataset.armed;t.textContent="Clear log";}},3000);}return;}
  if("exportLog" in ds){download("configuration-decisions.csv",toCSV(state.decisions,["id","desc","action","owner","announce","lastOrder","lastShip","status","reason"]));return;}
  if("exportOnepager" in ds){if(state.ai.onepager) download("ibd-portfolio-recommendation.md",state.ai.onepager);return;}
  if("exportAnalysis" in ds){const a=analyze();download("ibd-portfolio-analysis.csv",toCSV(a.sorted.map(r=>({...r,description:descOf(r),revenue:Math.round(r.rev),grossMargin:Math.round(r.gm),grossMarginPct:r.gmPct.toFixed(1),complexityCost:r.cx,netContribution:Math.round(r.net),abc:r.cls,cumulativeRevenuePct:r.cumPct.toFixed(1),recommended:r.rec,action:r.action,why:r.reasons.join(" ")})),["id","description","units","price","cost","revenue","grossMargin","grossMarginPct","uniqueParts","complexityCost","netContribution","abc","cumulativeRevenuePct","leadTime","recommended","action","why"]));return;}
  if("loadCsv" in ds){loadCSV();return;}
  if("resetData" in ds){state.data=SAMPLE.map(r=>({...r}));state.custom=false;state.overrides={};state.selected=null;scheduleSave();renderData();renderStatus();toast("Practice data restored");return;}
  if("case1" in ds){state.data=SAMPLE.filter(r=>+r.id.slice(1)<=17).map(r=>({...r}));state.custom=true;state.overrides={};state.selected=null;scheduleSave();renderData();renderStatus();toast("Case 1 set loaded (matches the training guide answer key)");return;}
  if("exportData" in ds){download("configurations.csv",toCSV(state.data,COLS));return;}
});
document.addEventListener("keydown",e=>{ if((e.key==="Enter"||e.key===" ") && e.target.matches("g[data-pick]")){e.preventDefault();pick(e.target.dataset.pick);} });
document.addEventListener("input",e=>{
  const t=e.target;
  if(t.dataset.set){state.settings[t.dataset.set]=+t.value;scheduleSave();renderDecideResults();return;}
  if(t.id==="cat-q"){state.catQ=t.value;const pos=t.selectionStart;renderCatalog();const n=$("#cat-q");n.focus();n.setSelectionRange(pos,pos);return;}
  if((t.dataset.cfg&&t.tagName==="INPUT")||t.id==="cfg-qty"){if(t.dataset.cfg) curC()[t.dataset.cfg]=t.value;renderCfgOut();return;}
  if(t.dataset.dec!=null && t.type==="text"){state.decisions[+t.dataset.dec][t.dataset.f]=t.value;scheduleSave();return;}
});
document.addEventListener("change",e=>{
  const t=e.target;
  if(t.dataset.override){const id=t.dataset.override, a=analyze(), r=a.rows.find(x=>x.id===id); if(r && t.value===r.rec) delete state.overrides[id]; else state.overrides[id]=t.value; scheduleSave(); renderDecideResults(); return;}
  if("model" in t.dataset){state.cfgModel=t.value;renderRules();return;}
  if(t.dataset.cfg){curC()[t.dataset.cfg]=t.value;renderCfgOut();return;}
  if(t.dataset.rule){curOn()[t.dataset.rule]=t.checked;renderCfgOut();renderRulesOut();return;}
  if(t.dataset.dec!=null){state.decisions[+t.dataset.dec][t.dataset.f]=t.value;scheduleSave();return;}
});

/* ---------- Boot ---------- */
state.cfgs=Object.fromEntries(Object.entries(MODELS).map(([k,m])=>[k,{...m.defaults}]));
state.ruleOns=Object.fromEntries(Object.entries(MODELS).map(([k,m])=>[k,{...m.allOn}]));
loadLocal();
render();
(async function(){
  if(!window.claude||typeof window.claude.use!=="function") return;
  try{ caps.sample = await window.claude.use("sample"); }catch(e){}
  try{ caps.downloads = await window.claude.use("downloads"); }catch(e){}
  try{
    const db = await window.claude.use("db"), user = await window.claude.use("user");
    const uid = user ? await user.id() : null;
    if(db && uid){
      caps.db=db; caps.uid=uid;
      try{
        const snap = await db.doc(`data/users/${uid}/workspace`).get();
        const d = snap && snap.data ? snap.data() : null;
        if(d && d.json){ applySaved(JSON.parse(d.json)); }
        caps.storage="account";
      }catch(e){}
    }
  }catch(e){}
  render();
})();
})();
