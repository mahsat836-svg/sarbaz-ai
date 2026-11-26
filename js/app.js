"use strict";
/* ============================ НЕГІЗГІ БАПТАУЛАР ============================ */
const SKILLS = { hazard:"Қауіпті тану", order:"Қауіпсіз әрекет реті", justify:"Шешімді негіздеу", others:"Өзгенің қауіпсіздігі" };
const TOPICS = { fire:"Өрт", quake:"Жер сілкінісі", flood:"Су тасқыны" };
const DIFF = { 1:"Бастапқы күрделілік", 2:"Орта күрделілік", 3:"Жоғары күрделілік" };
const LEVELS = {
  1:{ name:"Қолдаумен үйренемін", desc:"Ишаралар мен қысқа түсіндірмелер бірден көрсетіледі." },
  2:{ name:"Өзім шешемін", desc:"Ишара тек сұрағанда ашылады." },
  3:{ name:"Күрделі жағдайды талдаймын", desc:"Ишара жоқ, қосымша жағдай мен белгісіз ақпарат қосылады." }
};
const CYCLE = ["Жағдайды таны","Шешім қабылда","Себебін түсіндір","Кері байланыс ал","Жаңа жағдайда қолдан"];
const K = { results:"sarbaz.v1.results", custom:"sarbaz.v1.custom", checked:"sarbaz.v1.checked", current:"sarbaz.v1.current" };
const MAX_IMPORT = 100000;
const GAME_URL = "game.html";
const SITE_URL = location.origin + location.pathname.replace(/[^/]*$/, "");

/* ============================ SVG БЕЛГІШЕЛЕР ============================ */
const ICONS = {
  play:'<polygon points="6 4 20 12 6 20 6 4"/>',
  teacher:'<circle cx="12" cy="7" r="4"/><path d="M4 21v-1a7 7 0 0 1 14 0v1"/><path d="M19 4l2 2-2 2"/>',
  info:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="11" x2="12" y2="17"/><circle cx="12" cy="7.5" r=".6" fill="currentColor"/>',
  demo:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/><polygon points="10 8 15 10 10 12 10 8"/>',
  fire:'<path d="M12 2c1 4 5 5.5 5 11a5 5 0 0 1-10 0c0-2.5 1.2-4 2.5-5 0 2 1 3 2 3 0-3-1-5.5.5-9z"/>',
  quake:'<polyline points="2 12 6 12 8 6 11 18 14 9 16 14 18 12 22 12"/>',
  flood:'<path d="M2 15c2 0 2-1.5 4-1.5S8 15 10 15s2-1.5 4-1.5S16 15 18 15s2-1.5 4-1.5"/><path d="M2 20c2 0 2-1.5 4-1.5S8 20 10 20s2-1.5 4-1.5S16 20 18 20s2-1.5 4-1.5"/><path d="M6 11l6-6 6 6"/>',
  check:'<polyline points="4 12 10 18 20 6"/>',
  x:'<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>',
  hint:'<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z"/>',
  back:'<line x1="19" y1="12" x2="5" y2="12"/><polyline points="11 6 5 12 11 18"/>',
  next:'<line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/>',
  download:'<path d="M12 3v12"/><polyline points="7 10 12 15 17 10"/><path d="M4 19h16"/>',
  upload:'<path d="M12 21V9"/><polyline points="7 14 12 9 17 14"/><path d="M4 5h16"/>',
  print:'<rect x="6" y="3" width="12" height="6"/><rect x="4" y="9" width="16" height="8" rx="2"/><rect x="7" y="14" width="10" height="7"/>',
  trash:'<polyline points="3 6 21 6"/><path d="M8 6V4h8v2M6 6l1 15h10l1-15"/>',
  copy:'<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>',
  file:'<path d="M14 3H6v18h12V7z"/><polyline points="14 3 14 7 18 7"/>',
  shield:'<path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z"/>',
  retry:'<polyline points="3 4 3 10 9 10"/><path d="M3.5 15a9 9 0 1 0 2-9.5L3 10"/>',
  chart:'<line x1="4" y1="20" x2="20" y2="20"/><rect x="6" y="11" width="3" height="7"/><rect x="11" y="6" width="3" height="12"/><rect x="16" y="13" width="3" height="5"/>',
  edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/>',
  server:'<rect x="3" y="4" width="18" height="7" rx="1"/><rect x="3" y="13" width="18" height="7" rx="1"/><circle cx="7" cy="7.5" r=".8" fill="currentColor"/><circle cx="7" cy="16.5" r=".8" fill="currentColor"/>',
  map:'<polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>',
  book:'<path d="M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-4a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h5z"/>',
  logout:'<path d="M9 21H5V3h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  run:'<circle cx="14" cy="4" r="2"/><path d="M8 21l3-6 3 3v3M6 12l3-3 4 1 3 4 3 1"/>',
  qr:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM18 18h3v3h-3zM14 20h2M20 14v2"/>'
};
function icon(name){
  const s = document.createElementNS("http://www.w3.org/2000/svg","svg");
  s.setAttribute("viewBox","0 0 24 24"); s.setAttribute("fill","none"); s.setAttribute("stroke","currentColor");
  s.setAttribute("stroke-width","2"); s.setAttribute("stroke-linecap","round"); s.setAttribute("stroke-linejoin","round");
  s.setAttribute("aria-hidden","true"); s.setAttribute("class","ic");
  s.innerHTML = ICONS[name] || ""; // тек осы файлдағы тұрақты белгішелер
  return s;
}

/* ============================ ҚАУІПСІЗ DOM КӨМЕКШІСІ ============================ */
function h(tag, attrs){
  const el = document.createElement(tag);
  attrs = attrs || {};
  for (const k in attrs){
    const v = attrs[k];
    if (v === null || v === undefined || v === false) continue;
    if (k === "class") el.className = v;
    else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === "value") el.value = v;
    else if (v === true) el.setAttribute(k, "");
    else el.setAttribute(k, String(v));
  }
  for (let i = 2; i < arguments.length; i++) add(el, arguments[i]);
  return el;
}
function add(el, c){
  if (c === null || c === undefined || c === false) return;
  if (Array.isArray(c)) { c.forEach(x => add(el, x)); return; }
  el.appendChild(c instanceof Node ? c : document.createTextNode(String(c)));
}
function btn(label, cls, onclick, ic, extra){ return h("button", Object.assign({ type:"button", class:"btn " + (cls||""), onclick:onclick }, extra||{}), ic ? icon(ic) : null, label); }
function linkBtn(label, cls, href, ic){ return h("a", { class:"btn " + (cls||""), href:href }, ic ? icon(ic) : null, label); }
function notice(cls, ...kids){ return h("div", { class:"notice " + (cls||"") }, kids); }
function pill(text, cls){ return h("span", { class:"pill " + (cls||"") }, text); }
function announce(t){ const l = document.getElementById("live"); l.textContent = ""; setTimeout(() => l.textContent = t, 30); }
function fmtDate(ts){ if(!ts) return "—"; const d = new Date(ts); const p = n => String(n).padStart(2,"0"); return p(d.getDate())+"."+p(d.getMonth()+1)+"."+d.getFullYear()+" "+p(d.getHours())+":"+p(d.getMinutes()); }
function uid(p){ return (p||"id") + "-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2,7); }
function hash(str){ let x = 2166136261; for (let i=0;i<str.length;i++){ x ^= str.charCodeAt(i); x = Math.imul(x, 16777619); } return x >>> 0; }
/* ============================ АУЫЛ: ОРЫНДАР, ТЕГТЕР, СУРЕТТЕР ============================ */
const PLACES = {
  school:{ name:"Мектеп", x:15, y:27 },
  house:{ name:"Ауыл үйлері", x:31, y:47 },
  canal:{ name:"Канал бойы", x:66, y:22 },
  bridge:{ name:"Көпір мен жол", x:47, y:70 },
  street:{ name:"Ауыл көшесі", x:80, y:76 }
};
const DEFAULT_PLACE = { fire:"house", quake:"street", flood:"canal" };
const LIFE_TAGS = {
  stove:"Үйіміз пешпен жылытылады",
  canal:"Үйіміз канал немесе өзенге жақын",
  livestock:"Үйде мал бар",
  sibling:"Кіші бауырларым бар",
  elder:"Үйде қарт адам бар",
  road:"Мектепке көпір немесе алыс жол арқылы барамын"
};
function placeOf(sc){ return PLACES[sc.place] ? sc.place : (DEFAULT_PLACE[sc.topic] || "house"); }
function matchCount(sc, s){ const life = (s && s.life) || []; return (sc.tags || []).filter(t => life.includes(t)).length; }

function svgEl(markup, viewBox, cls, label){
  const s = document.createElementNS("http://www.w3.org/2000/svg","svg");
  s.setAttribute("viewBox", viewBox); if (cls) s.setAttribute("class", cls);
  if (label){ s.setAttribute("role","img"); s.setAttribute("aria-label", label); } else s.setAttribute("aria-hidden","true");
  s.innerHTML = markup; // тек осы файлдағы тұрақты сурет мәтіні
  return s;
}
const SKY = '<defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d2547"/><stop offset="1" stop-color="#1b4d7a"/></linearGradient></defs><rect width="400" height="170" fill="url(#sk)"/><circle cx="350" cy="28" r="12" fill="#ffe8a3" opacity=".85"/><rect y="128" width="400" height="42" fill="#1d4a3a"/>';
function houseG(x, y, w, roof, extra){ return '<g><rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+(128-y)+'" fill="#e9dcc2" stroke="#8a7650"/><polygon points="'+(x-6)+','+y+' '+(x+w/2)+','+(y-22)+' '+(x+w+6)+','+y+'" fill="'+roof+'"/><rect x="'+(x+8)+'" y="'+(y+10)+'" width="14" height="12" fill="#7fc8ff" stroke="#5a4a2a"/>'+(extra||"")+'</g>'; }
const PLACE_ART = {
  school:'<g class="bld"><rect x="70" y="70" width="230" height="58" fill="#f0e6cf" stroke="#8a7650"/><rect x="60" y="62" width="250" height="10" fill="#3d6b9a"/>'+
    [90,130,170,230,270].map(x => '<rect x="'+x+'" y="82" width="22" height="18" fill="#7fc8ff" stroke="#5a4a2a"/>').join("")+
    '<rect x="200" y="96" width="22" height="32" fill="#6b4a2a"/><text x="185" y="58" fill="#fff" font-size="11" font-family="sans-serif" text-anchor="middle">МЕКТЕП</text></g>'+
    '<line x1="330" y1="128" x2="330" y2="60" stroke="#ccc" stroke-width="2"/><rect x="330" y="60" width="26" height="15" fill="#4cc9f0"/><circle cx="343" cy="67" r="3" fill="#ffd34d"/>'+
    '<circle cx="35" cy="105" r="18" fill="#2f7a4f"/><rect x="33" y="110" width="4" height="18" fill="#6b4a2a"/>',
  house:'<g class="bld">'+houseG(60,85,70,"#b5523b",'<rect x="110" y="58" width="9" height="16" fill="#8a3b2b"/>')+houseG(250,92,64,"#3d6b9a")+'</g>'+
    '<path d="M150 128 q20-38 40 0z" fill="#d9b44a"/><path d="M160 128 q15-28 30 0z" fill="#c9a23d"/>'+
    '<g stroke="#bfe6ff" stroke-width="2" opacity=".6"><line x1="190" y1="40" x2="230" y2="40"/><line x1="200" y1="50" x2="245" y2="50"/></g>'+
    '<g stroke="#8a7650">'+[20,35,50,330,345,360,375].map(x => '<line x1="'+x+'" y1="110" x2="'+x+'" y2="128"/>').join("")+'<line x1="15" y1="116" x2="55" y2="116"/><line x1="325" y1="116" x2="385" y2="116"/></g>',
  street:'<rect y="132" width="400" height="20" fill="#3a3f47"/><g class="bld"><rect x="40" y="96" width="140" height="32" fill="#b8664a"/>'+
    [0,1,2].map(r => [0,1,2,3,4,5,6].map(c => '<rect x="'+(40+c*20)+'" y="'+(96+r*11)+'" width="20" height="11" fill="none" stroke="#7a3f2a"/>').join("")).join("")+
    houseG(230,90,70,"#3d6b9a")+'</g>'+
    '<g stroke="#9aa" stroke-width="3"><line x1="200" y1="128" x2="200" y2="40"/><line x1="360" y1="128" x2="360" y2="40"/></g><path d="M200 46 Q280 70 360 46" stroke="#222" stroke-width="2" fill="none"/>'+
    '<circle cx="320" cy="122" r="6" fill="#e9dcc2"/><rect x="314" y="128" width="12" height="4" fill="#556"/>',
  canal:'<g class="bld">'+houseG(40,88,64,"#b5523b")+houseG(130,94,58,"#3d6b9a")+'</g>'+
    '<path d="M0 150 C120 140 250 160 400 145 L400 170 L0 170Z" fill="#2b7fbf"/>'+
    '<g stroke="#5aa86a" stroke-width="2">'+[230,236,242,300,306].map(x => '<line x1="'+x+'" y1="140" x2="'+(x-3)+'" y2="118"/>').join("")+'</g>'+
    '<rect x="270" y="104" width="50" height="24" fill="#8a6a40"/><circle cx="282" cy="98" r="7" fill="#e9dcc2"/><circle cx="305" cy="98" r="7" fill="#7a5a3a"/>',
  bridge:'<path d="M0 140 C100 130 300 150 400 138 L400 170 L0 170Z" fill="#2b7fbf"/>'+
    '<rect x="120" y="118" width="160" height="10" fill="#7a6a5a"/><g stroke="#7a6a5a" stroke-width="3"><line x1="135" y1="128" x2="135" y2="150"/><line x1="265" y1="128" x2="265" y2="150"/></g>'+
    '<line x1="330" y1="128" x2="330" y2="50" stroke="#9aa" stroke-width="3"/><path d="M330 56 Q350 100 345 128" stroke="#222" stroke-width="2" fill="none"/>'+
    '<rect x="40" y="96" width="40" height="22" fill="#5a4a3a"/><rect x="50" y="102" width="10" height="8" fill="#ffd34d"/>'+
    '<circle cx="180" cy="104" r="6" fill="#e9dcc2"/><rect x="175" y="110" width="10" height="8" fill="#4cc9f0"/><circle cx="210" cy="104" r="6" fill="#e9dcc2"/><rect x="205" y="110" width="10" height="8" fill="#3ddc97"/>'
};
const FX = {
  fire:'<g><path class="flame" d="M150 128 q8-30 18-14 q4-18 14 0 q10-10 8 14z" fill="#ff8a3d"/><path class="flame" d="M160 128 q6-18 12-8 q6-10 10 8z" fill="#ffd34d"/>'+
    '<circle class="smoke" cx="170" cy="92" r="10" fill="#9aa3ad"/><circle class="smoke d2" cx="178" cy="88" r="12" fill="#8a939d"/><circle class="smoke d3" cx="164" cy="86" r="9" fill="#a9b1ba"/></g>',
  quake:'<path d="M40 150 l20-6 l10 8 l18-10 l12 9 l20-8 M250 152 l18-8 l12 7 l22-9" stroke="#0a1a2a" stroke-width="3" fill="none"/><g fill="#ffc857"><path d="M10 40 l6 4 -6 4z"/><path d="M386 40 l-6 4 6 4z"/></g>',
  flood:'<path class="wave" d="M-30 138 q20-8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 V170 H-30Z" fill="#4cc9f0" opacity=".55"/>'
};
function sceneEl(sc){
  const place = placeOf(sc);
  let art = PLACE_ART[place];
  if (sc.topic === "quake") art = art.replace('class="bld"', 'class="bld shake"');
  return svgEl(SKY + art + (FX[sc.topic] || ""), "0 0 400 170", "scene", "Сурет: " + PLACES[place].name + ", " + TOPICS[sc.topic].toLowerCase());
}
function villageMap(){
  return '<defs><linearGradient id="fld" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1f5a3e"/><stop offset="1" stop-color="#16402f"/></linearGradient></defs>'+
  '<rect width="800" height="440" fill="url(#fld)"/>'+
  '<g fill="#2a6e4b" opacity=".6"><rect x="560" y="300" width="240" height="140"/><rect x="0" y="330" width="200" height="110"/></g>'+
  '<path d="M600 0 C560 120 470 200 400 300 C340 380 330 410 300 440" stroke="#2b7fbf" stroke-width="34" fill="none"/>'+
  '<path d="M600 0 C560 120 470 200 400 300 C340 380 330 410 300 440" stroke="#7fd0ff" stroke-width="3" stroke-dasharray="10 14" fill="none" opacity=".7"/>'+
  '<rect x="0" y="292" width="800" height="26" fill="#5b5f66"/><path d="M0 305 H800" stroke="#e8e8e8" stroke-width="2" stroke-dasharray="18 14"/>'+
  '<rect x="352" y="284" width="80" height="42" fill="#8a7a6a" stroke="#5a4a3a" stroke-width="2"/>'+
  '<g><rect x="60" y="80" width="140" height="60" fill="#f0e6cf" stroke="#8a7650"/><rect x="52" y="72" width="156" height="10" fill="#3d6b9a"/>'+[75,105,135,165].map(x => '<rect x="'+x+'" y="94" width="16" height="14" fill="#7fc8ff"/>').join("")+'<line x1="220" y1="140" x2="220" y2="70" stroke="#ddd" stroke-width="3"/><rect x="220" y="70" width="28" height="16" fill="#4cc9f0"/><circle cx="234" cy="78" r="4" fill="#ffd34d"/></g>'+
  [[210,190,"#b5523b"],[270,215,"#3d6b9a"],[200,245,"#7a5aa0"],[300,170,"#b5523b"]].map(([x,y,c]) => '<rect x="'+x+'" y="'+y+'" width="44" height="30" fill="#e9dcc2" stroke="#8a7650"/><polygon points="'+(x-4)+','+y+' '+(x+22)+','+(y-16)+' '+(x+48)+','+y+'" fill="'+c+'"/>').join("")+
  '<path d="M150 270 q18-30 36 0z M180 272 q14-24 28 0z" fill="#d9b44a"/>'+
  '<rect x="620" y="60" width="110" height="60" fill="none" stroke="#c9a46a" stroke-width="3"/><circle cx="650" cy="92" r="9" fill="#e9dcc2"/><circle cx="690" cy="96" r="9" fill="#7a5a3a"/>'+
  [[560,360],[620,360],[680,360],[740,360]].map(([x,y]) => '<rect x="'+x+'" y="'+y+'" width="44" height="30" fill="#e9dcc2" stroke="#8a7650"/><polygon points="'+(x-4)+','+y+' '+(x+22)+','+(y-16)+' '+(x+48)+','+y+'" fill="#3d6b9a"/>').join("")+
  '<g stroke="#aab" stroke-width="3">'+[560,640,720].map(x => '<line x1="'+x+'" y1="345" x2="'+x+'" y2="325"/>').join("")+'</g>'+
  [[30,40],[260,60],[480,410],[760,240],[40,230],[520,40]].map(([x,y]) => '<circle cx="'+x+'" cy="'+y+'" r="16" fill="#2f7a4f"/><circle cx="'+(x+10)+'" cy="'+(y+6)+'" r="12" fill="#2a6e4b"/>').join("")+
  '<text x="20" y="425" fill="#cfe9ff" font-size="16" font-family="sans-serif" font-weight="700">Ташанақ ауылы (сызбалық карта)</text>';
}
function mascotEl(){
  return svgEl('<defs><linearGradient id="ms" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4cc9f0"/><stop offset="1" stop-color="#3ddc97"/></linearGradient></defs>'+
    '<path d="M40 6 L72 18 V42 C72 64 58 78 40 86 C22 78 8 64 8 42 V18 Z" fill="url(#ms)" stroke="#062036" stroke-width="3"/>'+
    '<path d="M14 20 L40 10 L66 20 L66 28 L14 28 Z" fill="#0b5a8a"/><circle cx="40" cy="20" r="4" fill="#ffd34d"/>'+
    '<circle cx="29" cy="44" r="6" fill="#fff"/><circle cx="51" cy="44" r="6" fill="#fff"/><circle cx="30" cy="45" r="3" fill="#062036"/><circle cx="52" cy="45" r="3" fill="#062036"/>'+
    '<path d="M28 60 Q40 70 52 60" stroke="#062036" stroke-width="3" fill="none" stroke-linecap="round"/>', "0 0 80 90", null, "Сарбаз — көмекші кейіпкер");
}
function mascotSays(...kids){ return h("div", { class:"mascot" }, mascotEl(), h("div", { class:"bubble" }, h("strong", null, "Сарбаз: "), kids)); }
const CHEER_OK = ["Жарайсың! Қауіпсіз шешім.", "Дұрыс ойладың — себебін тағы бір рет оқып шық.", "Міне, нағыз сабырлы шешім!", "Тамаша! Сен басқаларды да ескердің."];
const CHEER_BAD = ["Ештеңе етпейді — жаттығу дәл осы үшін керек.", "Салдарына қара да, тағы ойланып көр.", "Қателік — сабақ. Енді қауіпсіз жолды табайық.", "Асықпа. Қауіп қайда екенін қайта қарап шық."];
function cheer(ok, seed){ const a = ok ? CHEER_OK : CHEER_BAD; return a[hash(seed) % a.length]; }

/* ============================ ЖАТТЫҒУ БЕЛГІЛЕРІ ============================ */
function badgeSvg(kind, on){
  const c = on ? { fire:"#ff8a3d", quake:"#ffc857", flood:"#4cc9f0", star:"#3ddc97" }[kind] || "#3ddc97" : "#5b6b80";
  return svgEl('<circle cx="24" cy="24" r="20" fill="'+c+'" stroke="#fff" stroke-width="3"/><path d="M24 12 l3.5 7.5 8 1 -6 5.5 1.6 8 -7.1-4 -7.1 4 1.6-8 -6-5.5 8-1z" fill="#fff" opacity=".9"/>', "0 0 48 48");
}
function gameBest(){ try { const b = JSON.parse(localStorage.getItem("sarbaz.street.v1")) || []; return b; } catch(e){ return []; } }
function badgesOf(s){
  const runs = s.runs || [];
  const steps = runs.flatMap(r => r.steps);
  const topics = new Set(runs.map(r => r.topic));
  const places = new Set(runs.map(r => { const sc = findScenario(r.scenarioId); return sc ? placeOf(sc) : null; }).filter(Boolean));
  const care = steps.filter(x => x.skill === "others" && x.firstOk).length;
  return [
    { k:"star", name:"Алғашқы қадам", desc:"Бірінші сценарийді аяқтадың", got: runs.length >= 1 },
    { k:"star", name:"Қатеден үйрендім", desc:"Қайта байқап, қауіпсіз шешім таптың", got: steps.some(x => x.attempts.length > 1 && x.attempts.some(a => a.ok)) },
    { k:"fire", name:"Үш тақырып", desc:"Өрт, жер сілкінісі, су тасқыны — әрқайсысынан бір сценарий", got: topics.size >= 3 },
    { k:"flood", name:"Қамқор көрші", desc:"«Өзгенің қауіпсіздігі» бойынша 3 қадам бірінші әрекетте", got: care >= 3 },
    { k:"quake", name:"Ойлы дәлел", desc:"3 сценарийдің соңында өз дәлеліңді жаздың", got: runs.filter(r => r.justification).length >= 3 },
    { k:"star", name:"Ауыл картасы", desc:"Картадағы барлық 5 орынды аралап шықтың", got: places.size >= 5 },
    { k:"star", name:"Екі белес", desc:"Бастапқы және қорытынды тапсырманы орындадың", got: !!(s.pre && s.post) },
    { k:"fire", name:"Көшеге шықтым", desc:"«Көшеге шық!» ойынын осы құрылғыда аяқтадың", got: gameBest().length > 0 }
  ];
}
function badgesBlock(s){
  const b = badgesOf(s);
  return h("div", null,
    h("p", { class:"meta" }, "Жаттығу белгілері: " + b.filter(x => x.got).length + " / " + b.length + ". Олар жаттығудағы әрекетті көрсетеді, нақты дайындықты растамайды."),
    h("div", { class:"badges" }, b.map(x => h("div", { class:"badge" + (x.got ? "" : " off") }, badgeSvg(x.k, x.got),
      h("div", null, h("strong", null, x.name), h("small", null, x.desc), h("small", null, x.got ? "✓ Алынды" : "Әлі алынбаған"))))));
}

/* ============================ САҚТАУ (localStorage + уақытша жад) ============================ */
const store = (function(){
  let ok = true; const mem = {};
  try { const t="__sarbaz_test"; localStorage.setItem(t,"1"); localStorage.removeItem(t); } catch(e){ ok = false; }
  function warn(){ const b = document.getElementById("storeBanner"); b.hidden = false;
    b.textContent = "Браузер жадына сақтау мүмкін емес. Тренажер уақытша жадпен жұмыс істейді: бетті жапсаңыз, нәтижелер жойылады."; }
  return {
    get ok(){ return ok; }, warn:warn,
    get(k, d){ if (ok){ try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch(e){ return d; } } return (k in mem) ? JSON.parse(mem[k]) : d; },
    set(k, v){ const s = JSON.stringify(v); if (ok){ try { localStorage.setItem(k, s); return; } catch(e){ ok = false; warn(); } } mem[k] = s; },
    del(k){ if (ok){ try { localStorage.removeItem(k); } catch(e){} } delete mem[k]; }
  };
})();

/* ============================ КҮЙ ============================ */
const state = { view:"home", demo:false, demoResults:[], sessionId:null, run:null, check:null, lastRec:null,
  libTopic:"all", libPlace:null, tTab:"results", tStudent:null, tSample:false, editor:null, planUrl:null, planType:"", planName:"",
  prompt:"", serverMsg:null, importMsg:null };

function getResults(){ return state.demo ? state.demoResults : store.get(K.results, []); }
function saveResults(arr){ if (state.demo) state.demoResults = arr; else store.set(K.results, arr); }
function session(){ return getResults().find(r => r.id === state.sessionId) || null; }
function updateSession(fn){ const arr = getResults(); const s = arr.find(r => r.id === state.sessionId); if (!s) return; fn(s); s.updated = Date.now(); saveResults(arr); }

function customList(){ return store.get(K.custom, []); }
function saveCustom(a){ store.set(K.custom, a); }
function checkedMap(){ return store.get(K.checked, {}); }
function builtinIds(){ return SCENARIOS.map(s => s.id); }
function allScenarios(){
  const ch = checkedMap();
  const b = SCENARIOS.map(s => Object.assign({}, s, { _source:"builtin", _status: ch[s.id] ? "checked" : "needs_check", _checkedAt: ch[s.id] || null }));
  const c = customList().map(x => Object.assign({}, x.scenario, { id:x.cid, _source:x.source, _status:x.status, _cid:x.cid, _created:x.created }));
  return b.concat(c);
}
function studentScenarios(){ return allScenarios().filter(s => s._source === "builtin" || s._status === "approved"); }
function findScenario(id){ return allScenarios().find(s => s.id === id); }
function scenarioSkills(sc){ const set = new Set(); Object.values(sc.nodes).forEach(n => set.add(n.skill)); return Array.from(set); }

/* ============================ НАВИГАЦИЯ ============================ */
const app = document.getElementById("app");
const HASHABLE = ["home","evac","videos","awards","teacher","about","jury"];
function go(view){ state.view = view; if (HASHABLE.includes(view)){ try { history.replaceState(null, "", view === "home" ? location.pathname : "#" + view); } catch(e){} } render(true); window.scrollTo(0,0); }
function render(focusHead){
  app.textContent = "";
  document.getElementById("demoBanner").hidden = !state.demo;
  renderNav();
  const views = { home:vHome, login:vLogin, hub:vHub, library:vLibrary, play:vPlay, finish:vFinish, rec:vRec, check:vCheck,
                  results:vResults, teacher:vTeacher, about:vAbout, evac:vEvac, videos:vVideos, awards:vAwards, jury:vJury };
  (views[state.view] || vHome)();
  const head = app.querySelector("h1, h2");
  if (focusHead && head){ head.setAttribute("tabindex","-1"); head.focus({ preventScroll:true }); }
}
function renderNav(){
  const nav = document.getElementById("topnav"); nav.textContent = "";
  add(nav, [
    state.demo ? pill("ДЕМО · Үлгі деректер","demo") : null,
    btn("Жаттығу", "ghost small", () => go(state.sessionId ? "hub" : "login"), "play"),
    linkBtn("Көшеге шық! ойыны", "hotbtn small", GAME_URL, "run"),
    btn("Мектеп сызбасы", "ghost small", () => go("evac"), "map"),
    btn("Бейнесабақтар", "ghost small", () => go("videos"), "play"),
    btn("Марапаттар", "ghost small", () => go("awards"), "info"),
    btn("Мұғалім панелі", "ghost small", () => go("teacher"), "teacher"),
    btn("Жоба туралы", "ghost small", () => go("about"), "info"),
    state.demo ? btn("Демодан шығу", "danger small", exitDemo, "logout") : null
  ]);
}
document.getElementById("brandBtn").addEventListener("click", () => go("home"));

/* ============================ QR КОД ============================ */
function qrBox(size){
  const box = h("div", { class:"qr", role:"img", "aria-label":"Сайттың QR коды: " + SITE_URL });
  let tries = 0;
  const draw = () => {
    if (window.QRCode){ try { new window.QRCode(box, { text:SITE_URL, width:size, height:size, colorDark:"#062036", colorLight:"#ffffff", correctLevel:window.QRCode.CorrectLevel.M }); return; } catch(e){} }
    if (++tries < 30){ setTimeout(draw, 150); return; }
    add(box, h("p", { class:"meta", style:"color:#062036;padding:8px" }, SITE_URL));
  };
  setTimeout(draw, 0);
  return box;
}

/* ============================ БАСТЫ БЕТ ============================ */
function heroArt(){
  const s = document.createElementNS("http://www.w3.org/2000/svg","svg");
  s.setAttribute("viewBox","0 0 320 260"); s.setAttribute("class","hero-art float"); s.setAttribute("aria-hidden","true");
  s.innerHTML = '<defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4cc9f0"/><stop offset="1" stop-color="#3ddc97"/></linearGradient></defs>'+
    '<rect x="20" y="150" width="280" height="80" rx="14" fill="#11305a" stroke="#2b5288"/>'+
    '<path d="M60 150v-40l40-30 40 30v40" fill="#163a6b" stroke="#2b5288" stroke-width="2"/>'+
    '<rect x="88" y="120" width="24" height="30" fill="#0a2142" stroke="#4cc9f0"/>'+
    '<path d="M170 150v-30h90v30" fill="#163a6b" stroke="#2b5288" stroke-width="2"/><rect x="185" y="128" width="18" height="14" fill="#0a2142" stroke="#4cc9f0"/><rect x="225" y="128" width="18" height="14" fill="#0a2142" stroke="#4cc9f0"/>'+
    '<path d="M160 18l70 26v52c0 44-30 76-70 92-40-16-70-48-70-92V44z" fill="url(#g1)" opacity=".95"/>'+
    '<path d="M128 100l22 22 42-46" fill="none" stroke="#062036" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>'+
    '<path d="M30 200c20 0 20-8 40-8s20 8 40 8 20-8 40-8 20 8 40 8 20-8 40-8 20 8 40 8" fill="none" stroke="#4cc9f0" stroke-width="3" opacity=".6"/>';
  return s;
}
function gameTeaser(){
  return h("section", { class:"card gamecard fade" },
    h("div", { class:"gamegrid" },
      h("div", null,
        pill("ЖАҢА · Ө. Жәнібеков мектебінің картасы", "warn"),
        h("h2", null, "«Көшеге шық!» — өз мектебіңнен эвакуация ойыны"),
        h("p", { class:"lead" }, "Оқушы өз кабинетін таңдап, мектептің екі қабатты картасы бойынша сыртқа, одан Ақынтоған көшесіндегі жиналу орнына шығады. Өрт ошағы әр ойында басқа жерде, түтін тарайды, баспалдақ бөгеледі — оқушы балама жолды өзі табады."),
        h("ul", { class:"ticks" },
          h("li", null, "4 жағдай: асхана, химия кабинеті, шеберхана өрті және жер сілкінісі + кездейсоқ режим"),
          h("li", null, "Жолдағы 8 шешім: дабыл, түтін, бөгелген баспалдақ, сөмке, өрт көлігі, түскен сым, жиналу орны"),
          h("li", null, "Соңында — жұлдыз, ұпай және әр шешімнің себебі")),
        h("div", { class:"row" }, linkBtn("Ойынды бастау", "primary big", GAME_URL, "run"), btn("Түпнұсқа сызбаны көру", "ghost", () => go("evac"), "map"))),
      h("a", { class:"mapthumb", href:GAME_URL, "aria-label":"Ойынды ашу" }, svgEl(miniSchool(), "0 0 480 300", null, "Мектеп картасының кішірейтілген көрінісі"))));
}
function miniSchool(){
  let s = '<rect width="480" height="300" fill="#2f6b45"/><rect x="20" y="20" width="440" height="150" fill="#2b3d55"/>';
  [[30,30,80,50],[120,30,80,50],[210,30,80,50],[300,30,150,50],[30,120,80,40],[120,120,60,40],[260,120,80,40],[350,120,100,40]].forEach(([x,y,w,hh]) => s += '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+hh+'" fill="#efe4cc"/>');
  s += '<rect x="30" y="88" width="420" height="24" fill="#fbf7ec"/><rect x="215" y="112" width="40" height="58" fill="#fbf7ec"/>';
  s += '<rect x="30" y="88" width="20" height="24" fill="#c9d3df"/><rect x="430" y="88" width="20" height="24" fill="#c9d3df"/>';
  s += '<rect x="215" y="166" width="40" height="8" fill="#3ddc97"/><rect x="20" y="88" width="10" height="24" fill="#3ddc97"/><rect x="450" y="88" width="10" height="24" fill="#3ddc97"/>';
  s += '<rect x="30" y="120" width="80" height="40" fill="#5d6670" opacity=".8"/><path d="M45 158 q8-26 18-10 q4-16 12 0 q10-8 6 10z" fill="#ff8a3d"/>';
  s += '<rect x="30" y="88" width="120" height="24" fill="#5d6670" opacity=".6"/>';
  s += '<rect x="215" y="174" width="40" height="70" fill="#cdbd9c"/><rect x="0" y="244" width="480" height="8" fill="#5a4632"/><rect x="205" y="244" width="60" height="8" fill="#c9a46a"/>';
  s += '<rect x="0" y="252" width="480" height="24" fill="#a7afb8"/><rect x="40" y="252" width="90" height="24" fill="#ffc857"/><rect x="0" y="276" width="480" height="24" fill="#3a3f47"/>';
  s += '<path d="M235 100 L380 100 L440 100" stroke="#1f9d63" stroke-width="5" fill="none" stroke-dasharray="10 8"/>';
  s += '<path d="M440 100 L465 100 L465 230 L250 230 L235 248 L235 262 L90 262" stroke="#4cc9f0" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
  s += '<circle cx="235" cy="100" r="11" fill="#4cc9f0" stroke="#062036" stroke-width="3"/><text x="85" y="268" font-size="13" font-weight="800" fill="#1b1300" text-anchor="middle" font-family="sans-serif">Жиналу орны</text>';
  s += '<text x="240" y="293" font-size="12" fill="#e8e8e8" text-anchor="middle" font-family="sans-serif">Ақынтоған көшесі</text>';
  return s;
}
function vHome(){
  add(app, h("section", { class:"card fade" },
    h("div", { class:"hero" },
      h("div", null,
        pill("БӘД · бастапқы әскери даярлық · 10–11-сынып"),
        h("h1", null, "SARBAZ AI — төтенше жағдайдағы шешім тренажері"),
        h("p", { class:"lead" }, "Ауыл жағдайындағы өрт, жер сілкінісі және су тасқыны сценарийлерін талдап, қауіпсіз шешім таңдауды, оны дәлелдеуді және өзгерген жағдайда қайта әрекет етуді жаттықтыруға арналған."),
        h("p", null, h("strong", null, "Автор: "), "А. Хайдаров — БӘД оқытушы-ұйымдастырушысы, Ө. Жәнібеков атындағы мектеп"),
        h("div", { class:"row" },
          btn("Жаттығуды бастау", "primary", () => go(state.sessionId ? "hub" : "login"), "play"),
          linkBtn("Көшеге шық! ойыны", "hotbtn", GAME_URL, "run"),
          btn("Демо көрсету", "green", startDemo, "demo"),
          btn("Қазылар үшін", "ghost", () => go("jury"), "qr"))
      ),
      heroArt()
    ),
    h("div", { class:"stats" },
      stat2("9", "тармақталған сценарий"), stat2("4", "өлшенетін дағды"), stat2("2", "қабатты мектеп картасы"), stat2("12", "бейнесабақ"), stat2("0", "интернет қажет емес · офлайн жұмыс істейді")),
    notice("", h("strong", null, "Ескерту: "), "Бұл — оқу тренажері. Нақты төтенше жағдайда мектептің бекітілген жоспары мен ресми нұсқауларды орындаңыз.")
  ));
  add(app, gameTeaser());
  add(app, h("section", { class:"grid g3" },
    infoCard("book", "Тармақталған сценарийлер", "Әр таңдау келесі жағдайды өзгертеді. Барлық жауап бір экранға апармайды."),
    infoCard("chart", "Ережеге негізделген бейімдеу", "Келесі тапсырма оқушы қай дағдыда қателескеніне қарай таңдалады."),
    infoCard("shield", "Мұғалімнің бақылауы", "ЖИ дайындаған сценарий мұғалім тексеріп, бекітпейінше оқушыға берілмейді.")
  ));
  if (!store.ok) add(app, notice("err", "Браузер жадына сақтау мүмкін емес — нәтижелер уақытша жадта ғана сақталады."));
}
function stat2(n, t){ return h("div", { class:"stat2" }, h("b", null, n), h("span", null, t)); }
function infoCard(ic, title, text){ return h("div", { class:"card" }, h("div", { class:"row" }, h("span", { class:"topicic t-flood" }, icon(ic)), h("h3", null, title)), h("p", { class:"meta" }, text)); }

/* ============================ ҚАЗЫЛАР ҮШІН ============================ */
function vJury(){
  add(app, h("section", { class:"card fade jury" },
    h("div", { class:"jurygrid" },
      h("div", null,
        pill("Педагогикалық идеялар фестивалі · облыстық кезең"),
        h("h1", null, "Құрметті қазылар алқасы, телефоныңызбен сканерлеп, қазір ойнап көріңіз"),
        h("p", { class:"lead" }, "Тіркелу, қосымша орнату, құпиясөз қажет емес. Сайт телефонда да, интерактивті тақтада да ашылады, бір рет ашылған соң интернетсіз жұмыс істейді."),
        h("ol", { class:"steps" },
          h("li", null, h("strong", null, "«Көшеге шық!» "), "— мектеп картасы бойынша өз сыныбыңнан Ақынтоған көшесіндегі жиналу орнына шық (2–3 минут)."),
          h("li", null, h("strong", null, "«Демо көрсету» "), "— тармақталған сценарийде әдейі қате жауап беріп, оқиғаның қалай өзгеретінін көріңіз."),
          h("li", null, h("strong", null, "«Мұғалім панелі» "), "— оқушының шешім жолы, 4 дағды бойынша нәтиже, CSV есеп.")),
        h("p", { class:"meta" }, "Мекенжай: ", h("a", { href:SITE_URL }, SITE_URL)),
        h("div", { class:"row" }, linkBtn("Көшеге шық!", "hotbtn big", GAME_URL, "run"), btn("Демо", "green", startDemo, "demo"), btn("Басты бет", "ghost", () => go("home"), "back"))),
      h("div", { class:"qrwrap" }, qrBox(300), h("p", null, "SARBAZ AI · БӘД")))));
}

/* ============================ ОҚУШЫНЫҢ КІРУІ ============================ */
function levelChooser(current, name){
  return h("fieldset", null, h("legend", null, "Жаттығу режимі (кез келген уақытта өзгертуге болады)"),
    [1,2,3].map(l => h("label", { class:"choice" },
      h("input", { type:"radio", name:name, value:l, checked: Number(current) === l }),
      h("span", null, LEVELS[l].name, h("small", null, LEVELS[l].desc)))));
}
function vLogin(){
  const nick = h("input", { type:"text", id:"nick", maxlength:"24", autocomplete:"off", required:true, "aria-describedby":"nickHelp" });
  const cls = h("input", { type:"text", id:"cls", maxlength:"10", autocomplete:"off", placeholder:"мысалы: 10 Ә", required:true });
  const err = h("div", { role:"alert" });
  const form = h("form", { class:"card fade", onsubmit:(e) => {
      e.preventDefault(); err.textContent = "";
      const n = nick.value.trim(), c = cls.value.trim();
      const lvl = Number((form.querySelector("input[name=lvl]:checked")||{}).value || 1);
      if (n.length < 2){ add(err, notice("err", "Бүркеншік атты жазыңыз (кемінде 2 таңба).")); nick.focus(); return; }
      if (!c){ add(err, notice("err", "Сыныпты жазыңыз.")); cls.focus(); return; }
      const rec = { id:uid("st"), nick:n, cls:c, level:lvl, created:Date.now(), updated:Date.now(), pre:null, post:null, runs:[], cleanStreak:0, demo:state.demo };
      const arr = getResults(); arr.push(rec); saveResults(arr);
      state.sessionId = rec.id; if (!state.demo) store.set(K.current, rec.id);
      go("hub");
    }},
    h("h2", null, "Жаттығуға кіру"),
    notice("info", "Тек бүркеншік ат пен сынып керек. Толық аты-жөніңді, телефоныңды, мекенжайыңды жазба."),
    h("label", { for:"nick" }, "Бүркеншік ат"), nick,
    h("p", { id:"nickHelp", class:"meta" }, "Мысалы: Сұңқар-7, Қыран. Мұғалім сені осы атпен таниды."),
    h("label", { for:"cls" }, "Сынып"), cls,
    levelChooser(1, "lvl"),
    err,
    h("div", { class:"row" }, h("button", { type:"submit", class:"btn primary" }, icon("play"), "Кіру"), btn("Артқа", "ghost", () => go("home"), "back"))
  );
  add(app, form);
}

/* ============================ ОҚУШЫ ОРТАЛЫҒЫ ============================ */
function vHub(){
  const s = session(); if (!s){ go("login"); return; }
  const lvlBox = levelChooser(s.level, "hubLvl");
  lvlBox.addEventListener("change", (e) => { if (e.target.name === "hubLvl"){ updateSession(x => x.level = Number(e.target.value)); announce("Режим өзгертілді: " + LEVELS[Number(e.target.value)].name); } });
  const firstRec = recommendStart(s);
  const lifeBox = h("fieldset", null, h("legend", null, "Менің ауылым — жеке сценарийлер үшін (міндетті емес)"),
    h("p", { class:"meta" }, "Өз ортаңа сәйкес келетіндерін белгіле. Тренажер саған жақын сценарийлерді ұсынады. Бұл белгілер тек осы құрылғыда сақталады, CSV-ға шықпайды. Мекенжай мен аты-жөн сұралмайды."),
    Object.keys(LIFE_TAGS).map(k => h("label", { class:"choice" }, h("input", { type:"checkbox", value:k, checked:(s.life||[]).includes(k) }), h("span", null, LIFE_TAGS[k]))));
  lifeBox.addEventListener("change", () => { const v = Array.from(lifeBox.querySelectorAll("input:checked")).map(x => x.value); updateSession(x => x.life = v); announce("Сақталды. Саған жақын сценарийлер жаңартылды."); });
  add(app, h("section", { class:"card fade" },
    h("h2", null, "Сәлем, ", s.nick, "!"),
    h("div", { class:"story" }, mascotSays("Ташанақ ауылына қош келдің! Мен — Сарбаз. Бұл ауылда мектеп, канал, көпір, көше және ауыл үйлері бар. Әр жерде бір жағдай сені күтіп тұр. Асықпа: мұнда жылдамдыққа емес, ойлы шешімге ұпай беріледі.")),
    h("p", { class:"meta" }, "Сынып: ", s.cls, " · Режим: ", LEVELS[s.level].name, state.demo ? " · Үлгі деректер" : ""),
    h("ol", { class:"stepper", "aria-label":"Оқу циклі" }, CYCLE.map((c,i) => h("li", null, h("span",{class:"n"}, h("span",null,String(i+1))), c))),
    lvlBox, lifeBox
  ));
  add(app, h("section", { class:"grid g2" },
    h("div", { class:"card" }, h("h3", null, "1. Бастапқы тапсырма"),
      h("p", { class:"meta" }, "Жаттығуға дейін 4 сұрақ: әр дағдыға біреуі."),
      h("p", null, s.pre ? "Орындалды ✓ (" + countOk(s.pre) + "/4)" : "Әлі орындалмаған"),
      btn(s.pre ? "Қайта орындау" : "Бастау", "primary", () => startCheck("pre"), "play")),
    h("div", { class:"card" }, h("h3", null, "2. Сценарийлер"),
      h("p", { class:"meta" }, "Орындалған сценарий: " + doneIds(s).size + " / " + studentScenarios().length),
      firstRec ? h("p", null, "Ұсынылады: ", h("strong", null, firstRec.title), matchCount(firstRec, s) ? " — сенің ауылыңа жақын" : "") : null,
      h("div", { class:"row" },
        firstRec ? btn("Ұсынылғанды бастау", "primary", () => startRun(firstRec.id), "play") : null,
        btn("Кітапхананы ашу", "ghost", () => go("library"), "book"))),
    h("div", { class:"card" }, h("h3", null, "3. Мектеп картасы: «Көшеге шық!»"),
      h("p", { class:"meta" }, "Үйренгеніңді өз мектебіңде тексер: сыныптан жиналу орнына дейін."),
      h("p", null, gameBest().length ? "Ойналды ✓ (үздік ұпай: " + Math.max(...gameBest().map(x => Number(x.score) || 0)) + ")" : "Әлі ойналмаған"),
      linkBtn("Ойынды ашу", "hotbtn", GAME_URL, "run")),
    h("div", { class:"card" }, h("h3", null, "4. Қорытынды тапсырма"),
      h("p", { class:"meta" }, "Құрылымы бастапқы тапсырмаға ұқсас, бірақ жағдайы басқа."),
      h("p", null, s.post ? "Орындалды ✓ (" + countOk(s.post) + "/4)" : "Әлі орындалмаған"),
      btn(s.post ? "Қайта орындау" : "Бастау", "ghost", () => startCheck("post"), "play")),
    h("div", { class:"card" }, h("h3", null, "Менің нәтижем"),
      h("p", { class:"meta" }, "Дағдылар бойынша жаттығу нәтижесі және келесі ұсыныс."),
      h("div", { class:"row" }, btn("Нәтижені көру", "ghost", () => go("results"), "chart"),
        btn("Шығу", "ghost", logout, "logout")))
  ));
  add(app, h("section", { class:"card" }, h("h3", null, "Жаттығу белгілерім"), badgesBlock(s)));
}
function logout(){ state.sessionId = null; state.run = null; if (!state.demo) store.del(K.current); go("home"); }
function countOk(chk){ return chk.answers.filter(a => a.ok).length; }
function doneIds(s){ return new Set(s.runs.filter(r => r.finishedAt).map(r => r.scenarioId)); }
function recommendStart(s){
  const done = doneIds(s); const list = studentScenarios().filter(x => !done.has(x.id));
  if (!list.length) return null;
  const target = Math.min(3, s.level);
  list.sort((a,b) => (Math.abs(a.difficulty-target) - Math.abs(b.difficulty-target)) || (matchCount(b,s) - matchCount(a,s)));
  return list[0];
}

/* ============================ КІТАПХАНА ============================ */
function topicIcon(t){ return h("span", { class:"topicic t-" + t }, icon(t)); }
function vLibrary(){
  const s = session(); if (!s){ go("login"); return; }
  const done = doneIds(s); const rec = recommendStart(s); const all = studentScenarios();
  const wrap = h("div", { class:"villagewrap" }, svgEl(villageMap(), "0 0 800 440", null, "Ташанақ ауылының сызбалық картасы: мектеп, ауыл үйлері, канал, көпір және көше"));
  Object.keys(PLACES).forEach(p => {
    const here = all.filter(x => placeOf(x) === p); if (!here.length) return;
    const d = here.filter(x => done.has(x.id)).length;
    add(wrap, h("button", { type:"button", class:"hot" + (d === here.length ? " all" : ""), style:"left:" + PLACES[p].x + "%;top:" + PLACES[p].y + "%",
      "aria-expanded": String(state.libPlace === p), "aria-label": PLACES[p].name + ": " + here.length + " сценарий, " + d + " орындалды",
      onclick:() => { state.libPlace = state.libPlace === p ? null : p; render(); const t = document.getElementById("placePanel"); if (t) t.scrollIntoView({ block:"nearest" }); } },
      h("span", { class:"dot" }, d === here.length ? "✓" : String(here.length - d)), h("span", { class:"lbl" }, PLACES[p].name + " · " + d + "/" + here.length)));
  });
  const tabs = h("div", { class:"tabs", role:"tablist", "aria-label":"Тақырып сүзгісі" },
    [["all","Барлығы"],["fire","Өрт"],["quake","Жер сілкінісі"],["flood","Су тасқыны"]].map(([k,l]) =>
      h("button", { type:"button", class:"btn ghost small", role:"tab", "aria-selected": String(state.libTopic===k), onclick:() => { state.libTopic = k; render(); } }, l)));
  const list = all.filter(x => (state.libTopic === "all" || x.topic === state.libTopic) && (!state.libPlace || placeOf(x) === state.libPlace));
  add(app, h("section", { class:"fade" },
    h("div", { class:"row" }, btn("Артқа", "ghost small", () => go("hub"), "back")),
    h("h2", null, "Ташанақ ауылының картасы"),
    mascotSays("Картадағы белгіні бас — сол жердегі жағдайларды көресің. Сандар — әлі өтілмеген сценарийлер. Мектептің ішкі картасы бойынша ойын — «Көшеге шық!» бөлімінде."),
    wrap,
    h("div", { id:"placePanel" }, state.libPlace ? h("div", { class:"row", style:"margin-top:12px" }, pill("Орын: " + PLACES[state.libPlace].name, "warn"), btn("Барлық орын", "ghost small", () => { state.libPlace = null; render(); }, "x")) : null),
    h("h3", { style:"margin-top:16px" }, "Сценарийлер"),
    tabs,
    h("div", { class:"lib" }, list.map(sc => h("article", { class:"card sc" },
      sceneEl(sc),
      h("div", { class:"row" }, topicIcon(sc.topic), h("span", { class:"meta" }, TOPICS[sc.topic] + " · " + DIFF[sc.difficulty] + " · " + PLACES[placeOf(sc)].name)),
      h("h3", null, sc.title),
      h("p", { class:"meta" }, sc.setting),
      h("div", { class:"row" },
        done.has(sc.id) ? pill("✓ Орындалды", "ok") : null,
        rec && rec.id === sc.id ? pill("★ Ұсынылады", "warn") : null,
        matchCount(sc, s) ? pill("Сенің ауылыңа жақын", "pillmatch") : null,
        sc._source !== "builtin" ? pill("Мұғалім қосқан", "draft") : null),
      h("p", { class:"meta" }, "Дағдылар: " + scenarioSkills(sc).map(k => SKILLS[k]).join(", ")),
      h("div", { class:"row" }, btn(done.has(sc.id) ? "Қайта орындау" : "Бастау", "primary small", () => startRun(sc.id), "play"))
    ))),
    list.length ? null : h("p", { class:"meta" }, "Бұл сүзгі бойынша сценарий жоқ.")
  ));
}

/* ============================ СЦЕНАРИЙ ОЙНАТУ ============================ */
function startRun(id){
  const sc = findScenario(id); if (!sc) return;
  state.run = { sc:sc, nodeId:sc.start, steps:[], cur:null, selected:null, phase:"choose", reason:"", hintOpen:false,
    startedAt:Date.now(), lastChoice:null };
  newStep();
  go("play");
}
function newStep(){
  const r = state.run; const n = r.sc.nodes[r.nodeId];
  r.cur = { node:r.nodeId, question:n.question, situation:n.situation, skill:n.skill, attempts:[], firstOk:null, reason:"" };
  r.selected = null; r.phase = "choose"; r.hintOpen = false;
}
function orderOf(sc, nodeId, len){
  const idx = Array.from({length:len}, (_,i) => i);
  return idx.sort((a,b) => hash(sc.id+nodeId+a) - hash(sc.id+nodeId+b));
}
function stepperEl(active, doneUpTo){
  return h("ol", { class:"stepper", "aria-label":"Оқу циклі" }, CYCLE.map((c,i) => {
    const cls = i === active ? "now" : (i < doneUpTo ? "done" : "");
    return h("li", { class:cls, "aria-current": i === active ? "step" : null }, h("span", { class:"n" }, h("span", null, String(i+1))), c, i === active ? h("span",{class:"sr"}," (қазіргі кезең)") : null);
  }));
}
function demoGuide(){
  if (!state.demo) return null;
  return h("div", { class:"guide noprint" }, h("strong", null, "Демо нұсқаулығы (2–3 минут)"),
    h("ol", null,
      h("li", null, "Бірінші қадамда әдейі қауіпті нұсқаны таңдаңыз — келесі жағдай басқаша болады (тармақталу)."),
      h("li", null, "Кері байланыстан кейін «Таңдауыммен жалғастыру» батырмасын басып, өзгерген жағдайды көрсетіңіз."),
      h("li", null, "Соңында бейімдеу ережесі қателескен дағдыға арналған келесі тапсырманы таңдайды."),
      h("li", null, "«Менің нәтижем» бетінде нәтижелер панелін көрсетіңіз.")));
}
function vPlay(){
  const r = state.run; if (!r){ go("hub"); return; }
  const s = session(); const lvl = s ? s.level : 1;
  const sc = r.sc; const n = sc.nodes[r.nodeId];
  const stepNo = r.steps.length + 1;
  let active = 0; if (r.phase === "choose" && r.selected !== null) active = 2; else if (r.phase === "choose" && stepNo > 1) active = 1; if (r.phase === "feedback") active = 3;
  const wrap = h("section", { class:"card fade" });
  add(app, demoGuide());
  add(wrap, [
    h("div", { class:"row" }, topicIcon(sc.topic), pill(TOPICS[sc.topic]), pill(DIFF[sc.difficulty]), pill("Режим: " + LEVELS[lvl].name)),
    h("h2", null, sc.title),
    stepperEl(active, active),
    stepNo === 1 && r.phase === "choose" ? sceneEl(sc) : null,
    h("p", { class:"meta" }, "Шешім қадамы: " + stepNo + " · Дағды: " + SKILLS[n.skill]),
    stepNo === 1 ? h("p", null, h("strong", null, "Сенің рөлің: "), sc.role) : null,
    stepNo === 1 && lvl < 3 && sc.signs && sc.signs.length ? h("div", null, h("strong", null, "Назар аударатын белгілер:"), h("ul", { class:"signs" }, sc.signs.map(x => h("li", null, x)))) : null,
    h("div", { class:"situation" }, n.situation),
    lvl === 3 && n.extra ? h("div", { class:"extra" }, h("strong", null, "Қосымша жағдай / белгісіз ақпарат: "), n.extra) : null,
    h("h3", { id:"q" }, n.question)
  ]);
  if (r.phase === "choose"){
    if (n.hint && lvl === 1) add(wrap, mascotSays(n.hint));
    if (n.hint && lvl === 2){
      if (r.hintOpen) add(wrap, mascotSays(n.hint));
      else add(wrap, btn("Ишара керек", "ghost small", () => { r.hintOpen = true; render(); }, "hint"));
    }
    const ord = orderOf(sc, r.nodeId, n.options.length);
    const tried = r.cur.attempts.map(a => a.index);
    const group = h("div", { role:"group", "aria-labelledby":"q" });
    ord.forEach((oi, pos) => {
      const op = n.options[oi];
      const b = h("button", { type:"button", class:"btn opt", "aria-pressed": String(r.selected === oi), "data-key": pos+1,
        onclick:() => { r.selected = oi; render(); const ta = document.getElementById("reason"); if (ta) ta.focus(); } },
        h("span", { class:"k", "aria-hidden":"true" }, String(pos+1)), h("span", null, op.text,
          tried.includes(oi) ? h("small", { class:"meta" }, " (бұрын таңдалған)") : null));
      add(group, b);
    });
    add(wrap, group);
    add(wrap, h("p", { class:"meta" }, "Пернетақта: ", h("span",{class:"kbd"},"1"), "–", h("span",{class:"kbd"},String(n.options.length)), " нұсқаны таңдайды. Асықпа — жылдамдыққа ұпай берілмейді."));
    if (r.selected !== null){
      const ta = h("textarea", { id:"reason", maxlength:"500", placeholder:"Мысалы: Мен осыны таңдадым, себебі..." });
      ta.value = r.reason; ta.addEventListener("input", () => r.reason = ta.value);
      add(wrap, [
        h("label", { for:"reason" }, "Себебін түсіндір (міндетті емес; мұғалім оқиды, автоматты бағаланбайды)"), ta,
        h("div", { class:"row" }, btn("Шешімді растау", "primary", confirmChoice, "check"))
      ]);
    }
  } else {
    const op = n.options[r.lastChoice]; const good = op.correct;
    add(wrap, h("div", { class:"fb " + (good ? "good" : "bad"), role:"status" },
      h("h3", null, icon(good ? "check" : "x"), good ? "Қауіпсіз таңдау" : "Бұл таңдау қауіп тудыруы мүмкін"),
      h("p", null, h("strong", null, "Таңдауың: "), op.text),
      h("p", null, h("strong", null, "Ықтимал салдары: "), op.consequence),
      h("p", null, h("strong", null, "Қауіпсіз шешімнің түсіндірмесі: "), n.why)
    ));
    add(wrap, mascotSays(cheer(good, sc.id + r.nodeId + r.cur.attempts.length)));
    add(wrap, h("div", { class:"row" },
      !good ? btn("Қайта байқап көру", "primary", () => { r.phase = "choose"; r.selected = null; r.reason = ""; render(); }, "retry") : null,
      btn(good ? "Жалғастыру" : "Таңдауыммен жалғастыру", good ? "green" : "ghost", proceed, "next")));
    if (!good) add(wrap, h("p", { class:"meta" }, "«Таңдауыммен жалғастыру» — оқиға сенің таңдауыңның салдарымен дамиды."));
  }
  add(app, wrap);
  add(app, h("div", { class:"row noprint" }, btn("Сценарийден шығу", "ghost small", () => { state.run = null; go(state.sessionId ? "library" : "home"); }, "back")));
}
function confirmChoice(){
  const r = state.run; if (r.selected === null) return;
  const n = r.sc.nodes[r.nodeId]; const op = n.options[r.selected];
  r.cur.attempts.push({ index:r.selected, text:op.text, ok:!!op.correct, reason:r.reason.trim() });
  if (r.cur.firstOk === null) r.cur.firstOk = !!op.correct;
  r.lastChoice = r.selected; r.phase = "feedback"; r.reason = "";
  render(); announce(op.correct ? "Қауіпсіз таңдау" : "Бұл таңдау қауіп тудыруы мүмкін");
  const fh = app.querySelector(".fb h3"); if (fh){ fh.setAttribute("tabindex","-1"); fh.focus(); }
}
function proceed(){
  const r = state.run; const op = r.sc.nodes[r.nodeId].options[r.lastChoice];
  r.cur.reason = r.cur.attempts.map(a => a.reason).filter(Boolean).join(" | ");
  r.steps.push(r.cur);
  if (op.next === "end"){ r.phase = "end"; go("finish"); return; }
  r.nodeId = op.next; newStep(); render();
  const q = document.getElementById("q"); if (q){ q.setAttribute("tabindex","-1"); q.focus(); }
}
function runScore(steps){ return steps.reduce((t, s) => t + (s.firstOk ? 2 : (s.attempts.some(a => a.ok) ? 1 : 0)), 0); }

function vFinish(){
  const r = state.run; if (!r){ go("hub"); return; }
  const ta = h("textarea", { id:"just", maxlength:"1000", placeholder:"Осы сценарийдегі ең маңызды шешімің қайсы және неге?" });
  add(app, demoGuide());
  add(app, h("section", { class:"card fade" },
    h("h2", null, "Сценарий аяқталды: ", r.sc.title),
    stepperEl(2, 2),
    h("p", null, "Шешім қадамдары: " + r.steps.length + " · Бірінші әрекетте қауіпсіз таңдау: " + r.steps.filter(s => s.firstOk).length + " · Оқу ұпайы: " + runScore(r.steps) + " / " + (r.steps.length*2)),
    h("p", { class:"meta" }, "Оқу ұпайы тек осы жаттығудағы таңдауды көрсетеді. Ол нақты төтенше жағдайға дайындық деңгейін өлшемейді."),
    mascotSays(r.steps.every(x => x.firstOk) ? "Барлық қадамды бірінші әрекетте қауіпсіз орындадың! Енді шешіміңді өз сөзіңмен түсіндіріп көр." : "Жақсы жұмыс! Қай жерде ойланып қалғаныңды есіңе түсір де, төмендегі сұрақтарға жауап бер."),
    h("h3", null, "Рефлексия"),
    h("ul", null, (r.sc.reflection||[]).map(q => h("li", null, q))),
    h("label", { for:"just" }, "Себебін түсіндір: өз сөзіңмен жаз (мұғалім оқиды, автоматты бағаланбайды)"), ta,
    h("div", { class:"row" }, btn("Сақтау және келесі тапсырма", "primary", () => saveRun(ta.value), "next"))
  ));
}
function saveRun(just){
  const r = state.run;
  const run = { id:uid("run"), scenarioId:r.sc.id, title:r.sc.title, topic:r.sc.topic, difficulty:r.sc.difficulty,
    startedAt:r.startedAt, finishedAt:Date.now(), steps:r.steps, justification:(just||"").trim().slice(0,1000), teacherNote:"", score:runScore(r.steps) };
  const clean = r.steps.every(s => s.firstOk);
  updateSession(s => { s.runs.push(run); s.cleanStreak = clean ? (s.cleanStreak||0) + 1 : 0; });
  state.lastRec = recommendNext(session(), run);
  state.run = null;
  go("rec");
}

/* ============================ ЕРЕЖЕГЕ НЕГІЗДЕЛГЕН БЕЙІМДЕУ ============================ */
/* Ережелер:
   1) Сценарийде бірінші әрекетте қате жіберілсе → ең көп қателескен дағды анықталады,
      сол дағдысы бар, БАСҚА мазмұндағы (мүмкіндігінше басқа тақырыптағы), күрделілігі
      бірдей не төмен орындалмаған сценарий ұсынылады.
   2) Қатарынан екі сценарий бірінші әрекетте қатесіз орындалса → күрделірек сценарий.
   3) Әйтпесе → сол күрделіліктегі басқа тақырып. */
function recommendNext(s, run){
  const done = doneIds(s);
  const pool = studentScenarios().filter(x => x.id !== run.scenarioId && !done.has(x.id));
  const errs = run.steps.filter(st => !st.firstOk).map(st => st.skill);
  const byTopic = (a,b) => (a.topic === run.topic) - (b.topic === run.topic);
  let rule, reason, cands, weak = null;
  if (errs.length){
    const cnt = {}; errs.forEach(k => cnt[k] = (cnt[k]||0)+1);
    weak = Object.keys(cnt).sort((a,b) => cnt[b]-cnt[a])[0];
    cands = pool.filter(x => scenarioSkills(x).includes(weak) && x.difficulty <= run.difficulty)
      .sort((a,b) => byTopic(a,b) || (b.difficulty - a.difficulty) || (matchCount(b,s) - matchCount(a,s)));
    if (!cands.length) cands = pool.filter(x => scenarioSkills(x).includes(weak)).sort((a,b) => byTopic(a,b) || a.difficulty - b.difficulty);
    rule = 1; reason = "Сен «" + SKILLS[weak] + "» дағдысында бірінші әрекетте қателестің. Сол дағдыны басқа мазмұндағы жағдайда жаттықтырайық.";
  } else if ((s.cleanStreak||0) >= 2 && run.difficulty < 3){
    cands = pool.filter(x => x.difficulty === run.difficulty + 1).sort(byTopic);
    rule = 2; reason = "Қатарынан екі сценарийді бірінші әрекетте қауіпсіз орындадың. Күрделірек жағдай ұсынылады.";
  } else {
    cands = pool.filter(x => x.difficulty === run.difficulty).sort((a,b) => byTopic(a,b) || (matchCount(b,s) - matchCount(a,s)));
    rule = 3; reason = "Жақсы! Енді сол күрделіліктегі басқа жағдайда қолданып көр.";
  }
  if (!cands.length){ cands = pool.slice().sort((a,b) => Math.abs(a.difficulty-run.difficulty) - Math.abs(b.difficulty-run.difficulty)); }
  const next = cands[0] || null;
  let levelTip = null;
  if (errs.length >= 2 && s.level === 3) levelTip = "Қаласаң, «Өзім шешемін» режиміне ауысып, ишараларды қолдануға болады.";
  if ((s.cleanStreak||0) >= 2 && s.level === 1) levelTip = "Қаласаң, «Өзім шешемін» режиміне ауыса аласың.";
  return { rule, reason, weak, nextId: next ? next.id : null, levelTip, from: run.title };
}
function vRec(){
  const rec = state.lastRec; const s = session(); if (!rec || !s){ go("hub"); return; }
  const next = rec.nextId ? findScenario(rec.nextId) : null;
  add(app, demoGuide());
  add(app, h("section", { class:"card fade" },
    h("h2", null, "Жаңа жағдайда қолдан"),
    stepperEl(4, 4),
    mascotSays("Енді үйренгеніңді басқа жерде, басқа жағдайда қолданып көрейік."),
    h("div", { class:"notice info" }, h("strong", null, "Ережеге негізделген бейімдеу · ", "ереже " + rec.rule + ": "), rec.reason),
    next ? h("div", { class:"card" },
      h("div", { class:"row" }, topicIcon(next.topic), pill(TOPICS[next.topic]), pill(DIFF[next.difficulty])),
      h("h3", null, next.title), h("p", { class:"meta" }, next.setting),
      rec.weak ? h("p", null, "Жаттықтырылатын дағды: ", h("strong", null, SKILLS[rec.weak])) : null,
      btn("Жаңа жағдайды бастау", "primary", () => startRun(next.id), "play"))
      : notice("ok", "Барлық сценарий орындалды. Енді қорытынды тапсырманы орындауға болады.", h("div", { class:"row" }, btn("Қорытынды тапсырма", "primary small", () => startCheck("post"), "play"))),
    rec.levelTip ? notice("", rec.levelTip, " Режимді «Жаттығу» бетінде өзгертуге болады.") : null,
    h("div", { class:"row" }, btn("Менің нәтижем", "ghost", () => go("results"), "chart"), btn("Кітапхана", "ghost", () => go("library"), "book"), linkBtn("Өз мектебімде тексеру: Көшеге шық!", "hotbtn", GAME_URL, "run"))
  ));
}

/* ============================ БАСТАПҚЫ / ҚОРЫТЫНДЫ ТАПСЫРМА ============================ */
function startCheck(kind){ state.check = { kind:kind, submitted:false, answers:null }; go("check"); }
function vCheck(){
  const c = state.check; const s = session(); if (!c || !s){ go("hub"); return; }
  const data = CHECKS[c.kind];
  const form = h("form", { class:"card fade", onsubmit:(e) => {
    e.preventDefault();
    const answers = data.questions.map((q,i) => { const v = form.querySelector("input[name=q"+i+"]:checked"); return v ? Number(v.value) : null; });
    if (answers.some(a => a === null)){ errBox.textContent = ""; add(errBox, notice("err", "Барлық сұраққа жауап беріңіз.")); return; }
    const rec = { date:Date.now(), answers: data.questions.map((q,i) => ({ skill:q.skill, choice:q.options[answers[i]], ok: answers[i] === q.correct })) };
    updateSession(x => x[c.kind] = rec);
    c.submitted = true; c.answers = answers; render();
  }});
  const errBox = h("div", { role:"alert" });
  add(form, [
    h("h2", null, data.title),
    h("p", { class:"meta" }, "Тақырып: " + TOPICS[data.topic] + " · 4 сұрақ, әр дағдыға бір сұрақ. Бастапқы және қорытынды тапсырманың құрылымы бірдей, мазмұны әр түрлі."),
    h("div", { class:"situation" }, data.situation)
  ]);
  data.questions.forEach((q,i) => {
    const fs = h("fieldset", null, h("legend", null, (i+1) + ". " + q.q + " (" + SKILLS[q.skill] + ")"),
      q.options.map((op,j) => h("label", { class:"choice" },
        h("input", { type:"radio", name:"q"+i, value:j, checked: c.answers ? c.answers[i] === j : false, disabled: c.submitted }), h("span", null, op))));
    if (c.submitted){
      const ok = c.answers[i] === q.correct;
      add(fs, h("div", { class:"fb " + (ok ? "good" : "bad") }, h("strong", null, ok ? "✓ Қауіпсіз таңдау. " : "✗ Қауіпсіз жауап: " + q.options[q.correct] + ". "), q.why));
    }
    add(form, fs);
  });
  add(form, errBox);
  if (!c.submitted) add(form, h("div", { class:"row" }, h("button", { type:"submit", class:"btn primary" }, icon("check"), "Жауаптарды жіберу"), btn("Артқа", "ghost", () => go("hub"), "back")));
  else add(form, h("div", { class:"row" }, notice("ok", "Нәтиже сақталды: " + c.answers.filter((a,i) => a === data.questions[i].correct).length + " / 4."),
      btn(c.kind === "pre" ? "Сценарийлерге өту" : "Нәтижемді көру", "primary", () => go(c.kind === "pre" ? "library" : "results"), "next")));
  add(app, form);
}

/* ============================ НӘТИЖЕЛЕР (ОҚУШЫ) ============================ */
function skillStats(s){
  const st = {}; Object.keys(SKILLS).forEach(k => st[k] = { total:0, first:0, retried:0 });
  s.runs.forEach(r => r.steps.forEach(x => { const o = st[x.skill]; if (!o) return; o.total++; if (x.firstOk) o.first++; if (x.attempts.length > 1) o.retried++; }));
  return st;
}
function summaryOf(s){
  const steps = s.runs.flatMap(r => r.steps);
  return { scen:s.runs.length, steps:steps.length, first:steps.filter(x => x.firstOk).length, retried:steps.filter(x => x.attempts.length > 1).length,
           score:s.runs.reduce((t,r) => t + r.score, 0), max:steps.length*2 };
}
function skillTable(s){
  const st = skillStats(s);
  return h("div", null, Object.keys(SKILLS).map(k => {
    const o = st[k]; const pct = o.total ? Math.round(o.first / o.total * 100) : 0;
    return h("div", { class:"skillrow" }, h("span", null, SKILLS[k]),
      h("div", { class:"bar", role:"img", "aria-label": SKILLS[k] + ": " + o.first + " / " + o.total }, h("i", { style:"width:" + pct + "%" })),
      h("span", null, o.total ? (o.first + " / " + o.total + " бірінші әрекетте") : "жаттығу жоқ"));
  }));
}
function prePostTable(s){
  const row = (k) => { const f = (c) => { if (!c) return "—"; const a = c.answers.find(x => x.skill === k); return a ? (a.ok ? "✓ иә" : "✗ жоқ") : "—"; }; return h("tr", null, h("td", null, SKILLS[k]), h("td", null, f(s.pre)), h("td", null, f(s.post))); };
  return h("div", { class:"tablewrap" }, h("table", null,
    h("thead", null, h("tr", null, h("th", null, "Дағды"), h("th", null, "Бастапқы тапсырма"), h("th", null, "Қорытынды тапсырма"))),
    h("tbody", null, Object.keys(SKILLS).map(row),
      h("tr", null, h("th", null, "Барлығы"), h("th", null, s.pre ? countOk(s.pre) + " / 4" : "—"), h("th", null, s.post ? countOk(s.post) + " / 4" : "—")))));
}
function vResults(){
  const s = session(); if (!s){ go("login"); return; }
  const sm = summaryOf(s);
  const last = s.runs[s.runs.length-1];
  const rec = last ? recommendNext(s, last) : null;
  const next = rec && rec.nextId ? findScenario(rec.nextId) : recommendStart(s);
  add(app, demoGuide());
  add(app, h("section", { class:"card fade" },
    h("div", { class:"row noprint" }, btn("Артқа", "ghost small", () => go("hub"), "back"), printBtn()),
    state.demo ? pill("Үлгі деректер", "demo") : null,
    h("h2", null, "Жаттығу нәтижесі: ", s.nick, " (", s.cls, ")"),
    notice("info", "Бұл — оқу ұпайы ғана. Ол нақты төтенше жағдайға дайындық деңгейін көрсетпейді."),
    h("div", { class:"grid g3" },
      stat("Орындалған сценарийлер", sm.scen), stat("Бірінші әрекеттегі қауіпсіз таңдау", sm.first + " / " + sm.steps),
      stat("Қайталап орындалған қадамдар", sm.retried), stat("Оқу ұпайы", sm.score + " / " + sm.max)),
    h("h3", null, "Дағдылар бойынша жаттығу нәтижесі"), skillTable(s),
    h("h3", null, "Бастапқы және қорытынды тапсырма"), prePostTable(s),
    h("h3", null, "Жаттығу белгілері"), badgesBlock(s),
    h("h3", null, "Мұғалім қарайтын дәлелдер"),
    s.runs.length ? h("ul", null, s.runs.map(r => h("li", null, h("strong", null, r.title + ": "), r.justification || "(дәлел жазылмаған)",
      r.teacherNote ? h("div", { class:"notice ok" }, h("strong", null, "Мұғалім пікірі: "), r.teacherNote) : h("div", { class:"meta" }, "Мұғалімнің қарауын күтуде")))) : h("p", { class:"meta" }, "Әзірге сценарий орындалмаған."),
    h("h3", null, "Келесі жаттығуға ұсыныс"),
    next ? h("div", null, rec ? h("p", null, rec.reason) : null, btn("«" + next.title + "» сценарийін бастау", "primary", () => startRun(next.id), "play"))
         : h("p", null, "Барлық сценарий орындалды. Қорытынды тапсырманы орындаңыз."),
    state.demo ? h("div", { class:"row noprint" }, btn("Демо: мұғалім панеліндегі көрініс", "green", () => { state.tTab = "results"; go("teacher"); }, "teacher")) : null
  ));
}
function stat(label, val){ return h("div", { class:"card" }, h("div", { class:"meta" }, label), h("div", { style:"font-size:1.6rem;font-weight:800" }, String(val))); }

/* ============================ ДЕМО ============================ */
function startDemo(){
  state.demo = true; state.demoResults = [];
  const rec = { id:uid("demo"), nick:"Үлгі оқушы", cls:"10 (үлгі)", level:1, created:Date.now(), updated:Date.now(), pre:null, post:null, runs:[], cleanStreak:0, demo:true };
  state.demoResults.push(rec); state.sessionId = rec.id;
  startRun("fire-1");
}
function exitDemo(){
  state.demo = false; state.demoResults = []; state.run = null; state.lastRec = null; state.tStudent = null;
  state.sessionId = store.get(K.current, null);
  if (state.sessionId && !getResults().some(r => r.id === state.sessionId)) state.sessionId = null;
  go("home");
}

/* ============================ МҰҒАЛІМ ПАНЕЛІ ============================ */
function vTeacher(){
  add(app, h("section", { class:"fade" },
    h("h2", null, "Мұғалім панелі"),
    notice("", h("strong", null, "Маңызды: "), "Бұл панель құпиясөзбен қорғалған аккаунт жүйесі емес. Деректер тек ", h("strong", null, "осы құрылғыдағы осы браузерде"), " (localStorage) сақталады. Басқа телефондар мен компьютерлердегі нәтижелер мұнда автоматты түрде жиналмайды.",
      store.ok ? null : h("div", null, h("strong", null, " Қазір браузер жады қолжетімсіз: деректер уақытша жадта.")),
      state.demo ? h("div", null, h("strong", null, " Демо режим: тек үлгі деректер көрсетіледі.")) : null),
    h("div", { class:"tabs", role:"tablist" }, [["results","Нәтижелер"],["game","«Көшеге шық!» нәтижелері"],["scen","Сценарийлер"],["ai","ЖИ көмегімен дайындау"],["plan","Эвакуация жоспары"],["data","Деректер"]].map(([k,l]) =>
      h("button", { type:"button", role:"tab", class:"btn ghost small", "aria-selected": String(state.tTab === k), onclick:() => { state.tTab = k; state.tStudent = null; state.editor = null; render(); } }, l)))
  ));
  ({ results:tResults, game:tGame, scen:tScen, ai:tAI, plan:tPlan, data:tData })[state.tTab]();
}
function tGame(){
  const b = gameBest();
  add(app, h("section", { class:"card" },
    h("h3", null, "«Көшеге шық!» ойынының нәтижелері (осы құрылғы)"),
    h("p", { class:"meta" }, "Ойын мектептің эвакуация сызбасы негізінде жеңілдетіп салынған картада өтеді. Тек бүркеншік ат сақталады."),
    b.length ? h("div", { class:"tablewrap" }, h("table", null,
      h("thead", null, h("tr", null, ["#","Бүркеншік ат","Жағдай","Жұлдыз","Ұпай","Уақыт","Күні"].map(x => h("th", null, x)))),
      h("tbody", null, b.map((x,i) => h("tr", null, h("td", null, String(i+1)), h("td", null, String(x.nick)), h("td", null, String(x.scn)), h("td", null, "★".repeat(Number(x.stars)||0)),
        h("td", null, String(Number(x.score)||0)), h("td", null, Math.floor((x.sec||0)/60) + ":" + String((x.sec||0)%60).padStart(2,"0")), h("td", null, fmtDate(x.date)))))))
      : h("p", null, "Әзірге нәтиже жоқ."),
    h("div", { class:"row" }, linkBtn("Ойынды ашу", "hotbtn small", GAME_URL, "run"),
      b.length ? btn("CSV жүктеу", "primary small", () => {
        const rows = [["Бүркеншік ат","Жағдай","Жұлдыз","Ұпай","Уақыт (с)","Күні"]].concat(b.map(x => [x.nick, x.scn, x.stars, x.score, x.sec, fmtDate(x.date)]));
        download("﻿" + rows.map(r => r.map(csvCell).join(";")).join("\r\n"), "koshege-shyq-natizheler.csv", "text/csv;charset=utf-8");
      }, "download") : null)));
}

/* ---- Нәтижелер ---- */
function makeSample(){
  function sim(id, wrongAt){
    const sc = SCENARIOS.find(x => x.id === id); let node = sc.start; const steps = []; let i = 0;
    while (node !== "end" && i < 6){
      const n = sc.nodes[node]; const right = n.options.findIndex(o => o.correct); const wrong = n.options.findIndex(o => !o.correct);
      const isWrong = wrongAt.includes(i); const pick = isWrong ? wrong : right;
      const attempts = isWrong ? [{ index:wrong, text:n.options[wrong].text, ok:false, reason:"" }, { index:right, text:n.options[right].text, ok:true, reason:"Үлгі дәлел: себебі қауіпсіз." }] : [{ index:right, text:n.options[right].text, ok:true, reason:"" }];
      steps.push({ node, question:n.question, situation:n.situation, skill:n.skill, attempts, firstOk:!isWrong, reason:attempts.map(a=>a.reason).filter(Boolean).join(" | ") });
      node = isWrong ? n.options[right].next : n.options[pick].next; i++;
    }
    return { id:uid("run"), scenarioId:id, title:sc.title, topic:sc.topic, difficulty:sc.difficulty, startedAt:Date.now()-3600e3, finishedAt:Date.now()-3000e3, steps, justification:"Үлгі дәлел мәтіні.", teacherNote:"", score:runScore(steps) };
  }
  const pre = (oks) => ({ date:Date.now()-86400e3, answers:Object.keys(SKILLS).map((k,i) => ({ skill:k, choice:"—", ok:oks[i] })) });
  return [
    { id:"sample-1", nick:"Үлгі-Қыран", cls:"10 Ә", level:1, created:Date.now()-86400e3, updated:Date.now(), pre:pre([1,0,0,1]), post:pre([1,1,0,1]), runs:[sim("fire-1",[0]), sim("flood-1",[])], cleanStreak:1, demo:true },
    { id:"sample-2", nick:"Үлгі-Сұңқар", cls:"10 Ә", level:2, created:Date.now()-86400e3, updated:Date.now(), pre:pre([1,1,0,0]), post:null, runs:[sim("quake-2",[1])], cleanStreak:0, demo:true },
    { id:"sample-3", nick:"Үлгі-Бүркіт", cls:"11 Ә", level:3, created:Date.now()-86400e3, updated:Date.now(), pre:pre([1,1,1,0]), post:pre([1,1,1,1]), runs:[sim("fire-3",[]), sim("flood-3",[2])], cleanStreak:0, demo:true }
  ];
}
let SAMPLE = null;
function teacherData(){ if (state.demo) return { list:getResults(), sample:true }; if (state.tSample){ SAMPLE = SAMPLE || makeSample(); return { list:SAMPLE, sample:true }; } return { list:getResults(), sample:false }; }
function tResults(){
  const d = teacherData();
  if (state.tStudent){ const st = d.list.find(x => x.id === state.tStudent); if (st){ tStudent(st, d.sample); return; } state.tStudent = null; }
  const box = h("section", { class:"card" });
  if (!state.demo) add(box, h("label", { class:"choice noprint" }, h("input", { type:"checkbox", checked:state.tSample, onchange:(e) => { state.tSample = e.target.checked; render(); } }),
    h("span", null, "Үлгі деректерді көрсету", h("small", null, "Үлгі деректер бөлек көрсетіледі және нақты нәтижелермен араласпайды."))));
  if (d.sample) add(box, pill("Үлгі деректер", "demo"));
  add(box, h("h3", null, d.sample ? "Үлгі нәтижелер" : "Осы құрылғыда сақталған нәтижелер (" + d.list.length + ")"));
  if (!d.list.length) add(box, h("p", { class:"meta" }, "Әзірге нәтиже жоқ. Оқушылар осы құрылғыда жаттыққанда нәтижелер осында шығады."));
  else add(box, h("div", { class:"tablewrap" }, h("table", null,
    h("thead", null, h("tr", null, ["Бүркеншік ат","Сынып","Режим","Сценарий","Бірінші әрекетте","Қайталанған қадам","Бастапқы","Қорытынды","Соңғы белсенділік",""].map(x => h("th", null, x)))),
    h("tbody", null, d.list.map(st => { const sm = summaryOf(st); return h("tr", null,
      h("td", null, st.nick), h("td", null, st.cls), h("td", null, LEVELS[st.level] ? LEVELS[st.level].name : "—"), h("td", null, String(sm.scen)),
      h("td", null, sm.first + " / " + sm.steps), h("td", null, String(sm.retried)),
      h("td", null, st.pre ? countOk(st.pre) + "/4" : "—"), h("td", null, st.post ? countOk(st.post) + "/4" : "—"), h("td", null, fmtDate(st.updated)),
      h("td", null, btn("Шешім жолы", "ghost small", () => { state.tStudent = st.id; render(); }, "chart"))); })))));
  add(box, h("div", { class:"row noprint" },
    btn("CSV жүктеу", "primary small", () => exportCSV(d.list, d.sample), "download"),
    printBtn(),
    !d.sample && d.list.length ? btn("Барлық нәтижені өшіру", "danger small", async () => { if (await confirmBox("Осы құрылғыдағы барлық оқушы нәтижесі өшіріледі. Бұл әрекетті қайтару мүмкін емес.")){ saveResults([]); state.sessionId = null; store.del(K.current); render(); announce("Нәтижелер өшірілді"); } }, "trash") : null));
  add(app, box);
}
function tStudent(st, sample){
  const box = h("section", { class:"card" },
    h("div", { class:"row noprint" }, btn("Тізімге оралу", "ghost small", () => { state.tStudent = null; render(); }, "back"), printBtn()),
    sample ? pill("Үлгі деректер", "demo") : null,
    h("h3", null, st.nick + " · " + st.cls + " · " + (LEVELS[st.level] ? LEVELS[st.level].name : "")),
    skillTable(st), h("h3", null, "Бастапқы және қорытынды тапсырма"), prePostTable(st));
  st.runs.forEach((r, ri) => {
    const note = h("textarea", { maxlength:"1000", "aria-label":"Мұғалімнің кері байланысы: " + r.title }); note.value = r.teacherNote || "";
    const saved = h("span", { class:"meta", role:"status" });
    add(box, h("div", { class:"card" },
      h("h3", null, (ri+1) + ". " + r.title + " (" + TOPICS[r.topic] + ", " + DIFF[r.difficulty] + ")"),
      h("p", { class:"meta" }, fmtDate(r.finishedAt) + " · Оқу ұпайы: " + r.score + " / " + (r.steps.length*2)),
      h("ol", null, r.steps.map(sp => h("li", null,
        h("strong", null, sp.question), " ", h("span", { class:"meta" }, "(" + (SKILLS[sp.skill]||sp.skill) + ")"),
        h("ul", null, sp.attempts.map((a,ai) => h("li", null, (ai+1) + "-әрекет: " + a.text + " — " + (a.ok ? "✓ қауіпсіз" : "✗ қауіпті")))),
        sp.reason ? h("div", { class:"meta" }, "Оқушының түсіндірмесі: " + sp.reason) : null))),
      h("p", null, h("strong", null, "Сценарий соңындағы дәлел: "), r.justification || "(жазылмаған)"),
      h("label", null, "Еркін мәтіндегі дәлелге кері байланыс"), note,
      h("div", { class:"row noprint" }, btn("Пікірді сақтау", "primary small", () => {
        if (sample && !state.demo){ r.teacherNote = note.value.trim(); saved.textContent = "Үлгі деректерде сақталды (тек осы сеанс)."; return; }
        const arr = getResults(); const s2 = arr.find(x => x.id === st.id); if (s2 && s2.runs[ri]){ s2.runs[ri].teacherNote = note.value.trim(); saveResults(arr); saved.textContent = "Сақталды."; }
      }, "check"), saved)));
  });
  if (!sample) add(box, h("div", { class:"row noprint" }, btn("Осы оқушының деректерін өшіру", "danger small", async () => {
    if (await confirmBox("«" + st.nick + "» деректері өшіріледі. Жалғастырасыз ба?")){ saveResults(getResults().filter(x => x.id !== st.id)); if (state.sessionId === st.id){ state.sessionId = null; store.del(K.current); } state.tStudent = null; render(); }
  }, "trash")));
  add(app, box);
}
function csvCell(v){
  let s = (v === null || v === undefined) ? "" : String(v);
  s = s.replace(/\r?\n/g, " ");
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;          // формула ретінде орындалмауы үшін
  return '"' + s.replace(/"/g, '""') + '"';
}
function exportCSV(list, sample){
  const head = ["Деректер түрі","Бүркеншік ат","Сынып","Режим","Күні","Сценарий / тапсырма","Тақырып","Қадам","Дағды","Сұрақ","Таңдаулар (ретімен)","Бірінші әрекетте қауіпсіз","Әрекет саны","Оқушы түсіндірмесі","Сценарий соңындағы дәлел","Мұғалім пікірі"];
  const rows = [head];
  const kind = sample ? "Үлгі деректер" : "Нақты";
  list.forEach(st => {
    ["pre","post"].forEach(k => { const c = st[k]; if (!c) return; c.answers.forEach((a,i) => rows.push([kind, st.nick, st.cls, LEVELS[st.level] ? LEVELS[st.level].name : "", fmtDate(c.date), CHECKS[k].title, TOPICS[CHECKS[k].topic], i+1, SKILLS[a.skill], CHECKS[k].questions[i].q, a.choice, a.ok ? "иә" : "жоқ", 1, "", "", ""])); });
    st.runs.forEach(r => r.steps.forEach((sp,i) => rows.push([kind, st.nick, st.cls, LEVELS[st.level] ? LEVELS[st.level].name : "", fmtDate(r.finishedAt), r.title, TOPICS[r.topic], i+1, SKILLS[sp.skill]||sp.skill, sp.question,
      sp.attempts.map(a => a.text).join(" → "), sp.firstOk ? "иә" : "жоқ", sp.attempts.length, sp.reason || "", i === 0 ? r.justification : "", i === 0 ? r.teacherNote : ""])));
  });
  const csv = "﻿" + rows.map(r => r.map(csvCell).join(";")).join("\r\n");
  const d = new Date(); const name = (sample ? "ulgi-" : "") + "sarbaz-natizheler-" + d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0") + ".csv";
  download(csv, name, "text/csv;charset=utf-8");
}
/* Claude беті ішінде ашылса — платформа мүмкіндіктері (жүктеу, ЖИ); GitHub Pages-те — қарапайым браузер әдістері */
const IN_HOST = !!(window.claude && typeof window.claude.use === "function");
const capCache = {};
function getCap(name){ if (!IN_HOST) return Promise.resolve(null); if (!capCache[name]) capCache[name] = window.claude.use(name).catch(() => null); return capCache[name]; }
async function download(text, name, type){
  const dl = await getCap("downloads");
  if (dl){
    try { await dl.save({ filename:name, data:text }); announce("Файл сақталды: " + name); }
    catch(e){ if (e && e.code !== "declined") alert2("Файлды жүктеу мүмкін болмады (" + (e.code || "қате") + ")."); }
    return;
  }
  if (IN_HOST){ alert2("Бұл көріністе файл жүктеу қолжетімсіз."); return; }
  const blob = new Blob([text], { type:type }); const url = URL.createObjectURL(blob);
  const a = h("a", { href:url, download:name }); document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 2000);
}
function alert2(t){ const b = document.getElementById("storeBanner"); b.hidden = false; b.textContent = t; setTimeout(() => { if (b.textContent === t) b.hidden = !!store.ok; }, 6000); announce(t); }
function printBtn(cls){ return IN_HOST ? null : btn("Басып шығару", cls || "ghost small", () => window.print(), "print"); }

/* ---- Сценарийлер ---- */
function statusPill(sc){
  if (sc._source === "builtin") return sc._status === "checked" ? pill("Мұғалім тексерді: " + fmtDate(sc._checkedAt), "ok") : pill("Ресми нұсқаулықпен тексеру қажет", "warn");
  return sc._status === "approved" ? pill("Тексерілді, сабаққа қосылған", "ok") : pill("Жоба — оқушыға көрінбейді", "draft");
}
function tScen(){
  if (state.editor){ tEditor(); return; }
  const list = allScenarios();
  const box = h("section", { class:"card" },
    h("h3", null, "Сценарийлер тізімі"),
    notice("", "Кірістірілген 9 сценарий — демонстрациялық оқу материалы, ресми бекітілген нұсқаулық емес. Әрекет логикасын ҚР ТЖМ-нің ресми нұсқауларымен және мектептің бекітілген эвакуация жоспарымен тексеріңіз."),
    h("div", { class:"tablewrap" }, h("table", null,
      h("thead", null, h("tr", null, ["Атауы","Тақырып","Күрделілік","Шығу тегі","Мәртебе","Әрекеттер"].map(x => h("th", null, x)))),
      h("tbody", null, list.map(sc => h("tr", null,
        h("td", null, sc.title), h("td", null, TOPICS[sc.topic]), h("td", null, DIFF[sc.difficulty]),
        h("td", null, { builtin:"Кірістірілген (демо)", import:"Импорт (JSON)", server:"Серверден (ЖИ)", edit:"Өңделген көшірме" }[sc._source] || sc._source),
        h("td", null, statusPill(sc)),
        h("td", null, h("div", { class:"row" },
          btn(sc._source === "builtin" ? "Көшірмесін өңдеу" : "Қарау / өңдеу", "ghost small", () => openEditor(sc), "edit"),
          sc._source === "builtin" ? (sc._status === "checked"
              ? btn("Белгіні алу", "ghost small", () => { const m = checkedMap(); delete m[sc.id]; store.set(K.checked, m); render(); })
              : btn("Тексердім", "green small", () => { const m = checkedMap(); m[sc.id] = Date.now(); store.set(K.checked, m); render(); }, "check"))
            : (sc._status === "approved" ? btn("Сабақтан алу", "ghost small", () => setStatus(sc._cid, "draft"))
              : btn("Тексердім, сабаққа қосу", "green small", () => setStatus(sc._cid, "approved"), "check")),
          sc._source !== "builtin" ? btn("Өшіру", "danger small", async () => { if (await confirmBox("«" + sc.title + "» сценарийі өшіріледі.")){ saveCustom(customList().filter(x => x.cid !== sc._cid)); render(); } }, "trash") : null))
      )))))
  );
  add(app, box);
  add(app, importBox());
}
function setStatus(cid, st){ const a = customList(); const x = a.find(y => y.cid === cid); if (x){ x.status = st; x.reviewedAt = Date.now(); saveCustom(a); } render(); }
function importBox(){
  const ta = h("textarea", { class:"code", id:"impText", placeholder:'{ "title": "...", "topic": "fire", ... }', maxlength:String(MAX_IMPORT) });
  const file = h("input", { type:"file", accept:".json,application/json", id:"impFile" });
  const msg = h("div", { role:"status" });
  if (state.importMsg) add(msg, state.importMsg);
  file.addEventListener("change", () => {
    const f = file.files[0]; if (!f) return;
    if (f.size > MAX_IMPORT * 3){ msg.textContent = ""; add(msg, notice("err", "Файл тым үлкен. Шектеу — шамамен 100 000 таңба.")); return; }
    const rd = new FileReader(); rd.onload = () => { ta.value = String(rd.result).slice(0, MAX_IMPORT + 1); }; rd.readAsText(f, "utf-8");
  });
  return h("section", { class:"card" },
    h("h3", null, "JSON импорттау (ЖИ жауабы немесе мұғалім файлы)"),
    notice("info", "Құрылымдық тексеру тек пішімді, қадамдар мен жауаптардың байланысын тексереді. Ол ", h("strong", null, "мазмұнның қауіпсіздігін растамайды"), ". Импортталған сценарий «Жоба» мәртебесінде сақталады және мұғалім «Тексердім, сабаққа қосу» батырмасын баспайынша оқушыға көрінбейді."),
    h("label", { for:"impFile" }, "Файлдан жүктеу (.json)"), file,
    h("label", { for:"impText" }, "Немесе JSON мәтінін қойыңыз"), ta, msg,
    h("div", { class:"row" },
      btn("Тексеру және жоба ретінде сақтау", "primary small", () => {
        msg.textContent = "";
        const res = parseImport(ta.value);
        if (!res.ok){ add(msg, errList(res.errors)); return; }
        const a = customList(); const cid = uid("imp"); a.push({ cid, source:"import", status:"draft", created:Date.now(), scenario:res.scenario }); saveCustom(a);
        state.importMsg = notice("ok", "«" + res.scenario.title + "» жоба ретінде сақталды. Оны қарап, түзетіп, содан кейін ғана сабаққа қосыңыз.");
        render();
      }, "upload"),
      btn("JSON үлгісін жүктеу", "ghost small", () => download(JSON.stringify(templateScenario(), null, 2), "sarbaz-scenariy-ulgisi.json", "application/json"), "download")));
}
function errList(errs){ return notice("err", h("strong", null, "Импорт қабылданбады:"), h("ul", null, errs.slice(0,15).map(e => h("li", null, e))), errs.length > 15 ? h("p", null, "…және тағы " + (errs.length-15) + " қате.") : null); }
function templateScenario(){ const s = JSON.parse(JSON.stringify(SCENARIOS[0])); delete s.id; s.title = "Үлгі: " + s.title; return s; }
function openEditor(sc){
  const clean = cleanForExport(sc);
  state.editor = { cid: sc._source === "builtin" ? null : sc._cid, fromBuiltin: sc._source === "builtin", text: JSON.stringify(clean, null, 2), msg:null, preview:null };
  render();
}
function cleanForExport(sc){ const o = {}; ["title","topic","difficulty","place","tags","setting","role","signs","start","nodes","reflection"].forEach(k => o[k] = sc[k]); return JSON.parse(JSON.stringify(o)); }
function tEditor(){
  const ed = state.editor;
  const ta = h("textarea", { class:"code", id:"edText", "aria-label":"Сценарий JSON мәтіні" }); ta.value = ed.text; ta.addEventListener("input", () => ed.text = ta.value);
  const cur = ed.cid ? customList().find(x => x.cid === ed.cid) : null;
  const box = h("section", { class:"card" },
    h("div", { class:"row" }, btn("Тізімге оралу", "ghost small", () => { state.editor = null; render(); }, "back")),
    h("h3", null, ed.fromBuiltin ? "Кірістірілген сценарийдің көшірмесін өңдеу" : "Сценарийді қарау және өңдеу"),
    ed.fromBuiltin ? notice("info", "Түпнұсқа өзгермейді: өзгертілген көшірме «Жоба» ретінде сақталады.") : null,
    cur ? h("p", null, "Қазіргі мәртебе: ", statusPill(Object.assign({}, cur.scenario, { _source:cur.source, _status:cur.status }))) : null,
    notice("", "Сақтағаннан кейін сценарий «Жоба» мәртебесіне оралады. Оны ресми нұсқаулықпен тексергеннен кейін ғана сабаққа қосыңыз."),
    h("label", { for:"edText" }, "JSON мәтіні"), ta,
    ed.msg,
    h("div", { class:"row" },
      btn("Құрылымын тексеру және алдын ала қарау", "ghost small", () => { const r = parseImport(ed.text); ed.msg = r.ok ? notice("ok", "Құрылым дұрыс. Төменде мәтінді оқып шығыңыз (мазмұнның қауіпсіздігін мұғалім тексереді).") : errList(r.errors); ed.preview = r.ok ? r.scenario : null; render(); }, "check"),
      btn("Жоба ретінде сақтау", "primary small", () => {
        const r = parseImport(ed.text); if (!r.ok){ ed.msg = errList(r.errors); render(); return; }
        const a = customList();
        if (ed.cid){ const x = a.find(y => y.cid === ed.cid); if (x){ x.scenario = r.scenario; x.status = "draft"; x.updated = Date.now(); } }
        else { const cid = uid("edit"); a.push({ cid, source:"edit", status:"draft", created:Date.now(), scenario:r.scenario }); ed.cid = cid; ed.fromBuiltin = false; }
        saveCustom(a); ed.msg = notice("ok", "Жоба ретінде сақталды."); ed.preview = r.scenario; render();
      }, "upload"),
      cur && cur.status !== "approved" ? btn("Тексердім, сабаққа қосу", "green small", () => { setStatus(ed.cid, "approved"); }, "check") : null));
  if (ed.preview) add(box, previewScenario(ed.preview));
  add(app, box);
}
function previewScenario(sc){
  return h("div", { class:"card" }, h("h3", null, "Алдын ала қарау: " + sc.title),
    h("p", { class:"meta" }, TOPICS[sc.topic] + " · " + DIFF[sc.difficulty] + " · " + sc.setting),
    h("p", null, h("strong", null, "Рөл: "), sc.role),
    h("p", null, h("strong", null, "Белгілер: "), sc.signs.join("; ")),
    Object.keys(sc.nodes).map(k => { const n = sc.nodes[k]; return h("div", { class:"situation" },
      h("strong", null, "[" + k + "] " + (k === sc.start ? "(бастау) " : "") + SKILLS[n.skill]), h("p", null, n.situation), h("p", null, h("em", null, n.question)),
      h("ul", null, n.options.map(op => h("li", null, (op.correct ? "✓ " : "✗ ") + op.text + " → " + op.next, h("div", { class:"meta" }, "Салдары: " + op.consequence)))),
      h("p", { class:"meta" }, "Түсіндірме: " + n.why)); }),
    h("p", null, h("strong", null, "Рефлексия: "), sc.reflection.join(" / ")));
}

/* ---- JSON тексеру ---- */
function parseImport(text){
  text = String(text || "").trim();
  if (!text) return { ok:false, errors:["JSON мәтіні бос."] };
  if (text.length > MAX_IMPORT) return { ok:false, errors:["Мәтін тым үлкен: " + text.length + " таңба. Шектеу — " + MAX_IMPORT + " таңба."] };
  let obj; try { obj = JSON.parse(text); } catch(e){ return { ok:false, errors:["JSON пішімі қате. Жақшаларды, тырнақшаларды және үтірлерді тексеріңіз. (" + e.message + ")"] }; }
  if (obj && typeof obj === "object" && !Array.isArray(obj) && obj.scenario) obj = obj.scenario;
  if (Array.isArray(obj)) return { ok:false, errors:["Бір рет тек бір сценарий импорттауға болады."] };
  return validateScenario(obj);
}
function validateScenario(o){
  const E = [];
  if (!o || typeof o !== "object") return { ok:false, errors:["Сценарий объект ({ ... }) болуы керек."] };
  const S = (v, max, name, req) => {
    if (v === undefined || v === null || v === ""){ if (req !== false) E.push("«" + name + "» өрісі толтырылмаған."); return ""; }
    if (typeof v !== "string"){ E.push("«" + name + "» мәтін болуы керек."); return ""; }
    v = v.trim(); if (v.length > max) E.push("«" + name + "» тым ұзын (" + v.length + " таңба, шектеу " + max + ").");
    return v.slice(0, max);
  };
  const out = {};
  out.title = S(o.title, 120, "title");
  out.topic = o.topic; if (!TOPICS[o.topic]) E.push("«topic» мәні fire, quake немесе flood болуы керек.");
  out.difficulty = Number(o.difficulty); if (![1,2,3].includes(out.difficulty)) E.push("«difficulty» 1, 2 немесе 3 болуы керек.");
  out.setting = S(o.setting, 400, "setting");
  out.role = S(o.role, 300, "role");
  if (!Array.isArray(o.signs) || o.signs.length < 1 || o.signs.length > 6) E.push("«signs» 1–6 белгіден тұратын тізім болуы керек.");
  out.signs = Array.isArray(o.signs) ? o.signs.slice(0,6).map((x,i) => S(x, 150, "signs[" + i + "]")) : [];
  out.start = S(o.start, 20, "start");
  out.place = (typeof o.place === "string" && PLACES[o.place]) ? o.place : (DEFAULT_PLACE[o.topic] || "house");
  out.tags = Array.isArray(o.tags) ? o.tags.filter(t => typeof t === "string" && LIFE_TAGS[t]).slice(0,6) : [];
  if (!Array.isArray(o.reflection) || o.reflection.length < 1 || o.reflection.length > 4) E.push("«reflection» 1–4 сұрақтан тұратын тізім болуы керек.");
  out.reflection = Array.isArray(o.reflection) ? o.reflection.slice(0,4).map((x,i) => S(x, 250, "reflection[" + i + "]")) : [];
  out.nodes = {};
  if (!o.nodes || typeof o.nodes !== "object" || Array.isArray(o.nodes)){ E.push("«nodes» объект болуы керек."); return { ok:false, errors:E }; }
  const keys = Object.keys(o.nodes);
  if (keys.length < 3 || keys.length > 12) E.push("Түйіндер саны 3–12 аралығында болуы керек (қазір " + keys.length + ").");
  keys.slice(0,12).forEach(k => {
    if (!/^[A-Za-z0-9_-]{1,20}$/.test(k)) E.push("Түйін атауы «" + k.slice(0,30) + "» тек латын әрпі, сан, _ немесе - болуы керек.");
    const n = o.nodes[k]; const p = "nodes." + k;
    if (!n || typeof n !== "object"){ E.push("«" + p + "» объект болуы керек."); return; }
    const nn = { skill:n.skill, situation:S(n.situation, 600, p + ".situation"), question:S(n.question, 250, p + ".question"),
      hint:S(n.hint, 300, p + ".hint", false), extra:S(n.extra, 300, p + ".extra", false), why:S(n.why, 500, p + ".why"), options:[] };
    if (!SKILLS[n.skill]) E.push("«" + p + ".skill» мәні hazard, order, justify немесе others болуы керек.");
    if (!Array.isArray(n.options) || n.options.length < 3 || n.options.length > 4) E.push("«" + p + ".options» 3–4 нұсқадан тұруы керек.");
    (Array.isArray(n.options) ? n.options.slice(0,4) : []).forEach((op, i) => {
      const q = p + ".options[" + i + "]";
      if (!op || typeof op !== "object"){ E.push("«" + q + "» объект болуы керек."); return; }
      if (typeof op.correct !== "boolean") E.push("«" + q + ".correct» true немесе false болуы керек.");
      const nx = S(op.next, 20, q + ".next");
      nn.options.push({ text:S(op.text, 250, q + ".text"), correct:op.correct === true, consequence:S(op.consequence, 300, q + ".consequence"), next:nx });
    });
    if (nn.options.length && !nn.options.some(x => x.correct)) E.push("«" + p + "» түйінінде кемінде бір қауіпсіз (correct: true) нұсқа болуы керек.");
    if (nn.options.length && nn.options.every(x => x.correct)) E.push("«" + p + "» түйінінде кемінде бір қате нұсқа болуы керек.");
    out.nodes[k] = nn;
  });
  if (E.length) return { ok:false, errors:E };
  // Байланыстарды тексеру
  if (!out.nodes[out.start]) E.push("«start» мәні бар түйінге сілтеме жасауы керек.");
  Object.keys(out.nodes).forEach(k => out.nodes[k].options.forEach((op,i) => { if (op.next !== "end" && !out.nodes[op.next]) E.push("«nodes." + k + ".options[" + i + "].next» = «" + op.next + "» — мұндай түйін жоқ."); }));
  if (E.length) return { ok:false, errors:E };
  // Цикл, қолжетімділік, ұзындық
  const color = {}; let cycle = false; const minDepth = {};
  function dfs(k){ color[k] = 1; let best = Infinity;
    out.nodes[k].options.forEach(op => { if (op.next === "end"){ best = Math.min(best, 1); return; }
      if (color[op.next] === 1){ cycle = true; return; } if (!color[op.next]) dfs(op.next); best = Math.min(best, 1 + (minDepth[op.next] || Infinity)); });
    color[k] = 2; minDepth[k] = best; }
  dfs(out.start);
  if (cycle) E.push("Түйіндер тұйық айналым жасайды: сценарий аяқталмауы мүмкін.");
  const unreachable = Object.keys(out.nodes).filter(k => !color[k]);
  if (unreachable.length) E.push("Бастау түйінінен жетуге болмайтын түйіндер: " + unreachable.join(", ") + ".");
  if (!cycle && minDepth[out.start] < 3) E.push("Кез келген жолда кемінде 3 кезекті шешім қадамы болуы керек (ең қысқа жол: " + minDepth[out.start] + ").");
  if (!cycle && !isFinite(minDepth[out.start])) E.push("Сценарий «end» түйініне жетпейді.");
  return E.length ? { ok:false, errors:E } : { ok:true, scenario:out };
}

/* ---- ЖИ көмегімен дайындау ---- */
function tAI(){
  const topic = h("select", { id:"aiTopic" }, Object.keys(TOPICS).map(k => h("option", { value:k }, TOPICS[k])));
  const diff = h("select", { id:"aiDiff" }, [1,2,3].map(k => h("option", { value:k }, DIFF[k])));
  const skill = h("select", { id:"aiSkill" }, Object.keys(SKILLS).map(k => h("option", { value:k }, SKILLS[k])));
  const setting = h("input", { type:"text", id:"aiSet", maxlength:"200", value:"Бір қабатты жеке үйлері бар, пешпен жылытылатын, канал бойындағы ауыл" });
  const out = h("textarea", { class:"code", id:"aiOut", readonly:true, "aria-label":"Дайын промпт" }); out.value = state.prompt;
  const copyMsg = h("span", { class:"meta", role:"status" });
  const srvMsg = h("div", { role:"status" }); if (state.serverMsg) add(srvMsg, state.serverMsg);
  const params = () => ({ topic:topic.value, difficulty:Number(diff.value), weakSkill:skill.value, setting:setting.value.trim().slice(0,200), language:"kk", grade:"10-11" });
  add(app, h("section", { class:"card" },
    h("h3", null, "Ә) ЖИ көмегімен сценарий дайындау"),
    notice("info", h("strong", null, "Екі режим: "), "А) «Офлайн тренажер» — API-сіз, дайын тармақталған сценарийлер мен ережелік бейімдеу арқылы толық жұмыс істейді. Ә) Мұнда мұғалім ЖИ-ге арналған құрылымды промпт жасайды. ЖИ жауабы тексерілмейінше оқушыға берілмейді."),
    notice("", "Ауыл сипаттамасына оқушылардың аты-жөнін, мекенжайын немесе басқа жеке деректерін жазбаңыз."),
    h("div", { class:"grid g2" },
      h("div", null, h("label", { for:"aiTopic" }, "Тақырып"), topic),
      h("div", null, h("label", { for:"aiDiff" }, "Күрделілік"), diff),
      h("div", null, h("label", { for:"aiSkill" }, "Оқушы қиналған дағды"), skill),
      h("div", null, h("label", { for:"aiSet" }, "Ауыл жағдайы (жалпы сипаттама)"), setting)),
    h("h3", null, "1-жол: Промптты көшіру → ЖИ жауабын JSON ретінде импорттау"),
    h("div", { class:"row" }, btn("Промпт жасау", "primary small", () => { state.prompt = buildPrompt(params()); out.value = state.prompt; copyMsg.textContent = "Промпт дайын."; }, "edit"),
      btn("Көшіру", "ghost small", () => copyText(out.value, copyMsg), "copy"),
      btn("ЖИ жауабын импорттау", "ghost small", () => { state.tTab = "scen"; render(); setTimeout(() => { const t = document.getElementById("impText"); if (t){ t.focus(); t.scrollIntoView({ block:"center" }); } }, 50); }, "upload"), copyMsg),
    h("label", { for:"aiOut" }, "Дайын промпт"), out,
    h("div", { id:"directAI" }),
    h("h3", null, "2-жол: Қосымша сервер арқылы (/api/scenario)"),
    h("p", { class:"meta" }, "Бұл жол тек сіз бөлек сервер орнатсаңыз жұмыс істейді. API кілті браузерде, HTML-де немесе localStorage-та сақталмайды: оны тек сервер сақтайды. Файлды екі рет басып ашқанда (file://) сервер болмайды."),
    h("div", { class:"row" }, btn("Серверден сценарий сұрау", "ghost small", (e) => requestServer(params(), e.currentTarget), "server")),
    srvMsg));
  getCap("sample").then(sample => {
    const slot = document.getElementById("directAI"); if (!slot || !sample) return;
    const msg = h("div", { role:"status" }); const live = h("pre", { class:"meta", style:"white-space:pre-wrap;max-height:220px;overflow:auto", hidden:true });
    add(slot, h("div", { class:"card" },
      h("h3", null, "Тікелей: Claude арқылы сценарий жобасын жасау"),
      h("p", { class:"meta" }, "Бұл мүмкіндік тренажер claude.ai ішінде ашылғанда ғана жұмыс істейді. API кілті бетте сақталмайды. Нәтиже «Жоба» ретінде сақталады, мұғалім тексермейінше оқушыға көрінбейді."),
      h("div", { class:"row" }, btn("ЖИ-ден сценарий жобасын алу", "primary small", async (e) => {
        const b = e.currentTarget; b.disabled = true; msg.textContent = ""; live.hidden = false; live.textContent = "Сұрау жіберілді. Жауап келіп жатыр:";
        try {
          const prompt = buildPrompt(params());
          const res = await sample(prompt, { modelTier:"default", cache:false, onText:({ text }) => { live.textContent = text.slice(-1500); } });
          let t = String(res.text || ""); const i = t.indexOf("{"), j = t.lastIndexOf("}");
          if (i < 0 || j < i){ add(msg, notice("err", "ЖИ жауабында JSON табылмады. Қайта байқап көріңіз.")); return; }
          const r = parseImport(t.slice(i, j + 1));
          if (!r.ok){ add(msg, errList(r.errors)); return; }
          const a = customList(); a.push({ cid:uid("ai"), source:"server", status:"draft", created:Date.now(), scenario:r.scenario }); saveCustom(a);
          live.hidden = true;
          add(msg, notice("ok", "«" + r.scenario.title + "» жоба ретінде сақталды. «Сценарийлер» бөлімінде мәтінін оқып, ресми нұсқаулықпен тексергеннен кейін ғана сабаққа қосыңыз."));
        } catch(err){
          live.hidden = true;
          const code = err && err.code;
          add(msg, notice("err", code === "rate_limited" ? "Сұрау тым жиі жіберілді. Біраз күтіп, қайта байқап көріңіз." : code === "not_granted" ? "ЖИ қолдануға рұқсат берілмеді. Офлайн режим қолжетімді." : "ЖИ қосылмады. Офлайн режим қолжетімді."));
        } finally { b.disabled = false; }
      }, "server")), live, msg));
  });
}
function copyText(text, msgEl){
  if (!text){ msgEl.textContent = "Алдымен промпт жасаңыз."; return; }
  const done = () => msgEl.textContent = "Көшірілді.";
  const fallback = () => { const t = document.getElementById("aiOut"); t.removeAttribute("readonly"); t.select(); try { document.execCommand("copy"); done(); } catch(e){ msgEl.textContent = "Көшіру мүмкін болмады: мәтінді белгілеп, Ctrl+C басыңыз."; } t.setAttribute("readonly",""); };
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
}
function buildPrompt(p){
  const schema = {
    title:"мәтін, 120 таңбаға дейін", topic:p.topic, difficulty:p.difficulty,
    place:"school | house | street | canal | bridge (ауыл картасындағы орын)", tags:["stove | canal | livestock | sibling | elder | road — сценарий кімге жақын"],
    setting:"орта сипаттамасы (нақты мекенжайсыз)", role:"оқушының рөлі", signs:["назар аударатын белгі 1","белгі 2","белгі 3"],
    start:"s1",
    nodes:{ s1:{ skill:"hazard | order | justify | others", situation:"жағдай, 600 таңбаға дейін", question:"сұрақ", hint:"1-деңгейге арналған ишара", extra:"3-деңгейге арналған қосымша жағдай немесе белгісіз ақпарат", why:"қауіпсіз шешімнің негіздемесі",
      options:[ { text:"әрекет нұсқасы", correct:true, consequence:"ықтимал салдары", next:"s2" }, { text:"...", correct:false, consequence:"...", next:"s2x" }, { text:"...", correct:false, consequence:"...", next:"s2x" } ] },
      s2:"...", s2x:"...", s3:"...", s3x:"(s3 және s3x нұсқаларының next мәні: \"end\")" },
    reflection:["рефлексия сұрағы 1","рефлексия сұрағы 2"]
  };
  return [
    "Сен Қазақстандағы ауыл мектебінің Бастапқы әскери даярлық (БӘД) пәні оқытушы-ұйымдастырушысына көмектесетін әдіскерсің.",
    "Тапсырма: оқу тренажеріне арналған бір ТАРМАҚТАЛҒАН модельдік сценарий жаз. Жауапты ТЕК JSON түрінде бер, оның алдына да, артына да мәтін жазба.",
    "",
    "ОҚУ МАҚСАТЫ: оқушы төтенше жағдайды талдап, қауіпсіз шешім таңдайды, оны негіздейді және өзгерген жағдайда қайта әрекет етеді. Ерекше жаттықтырылатын дағды: «" + SKILLS[p.weakSkill] + "».",
    "ЖАС ЕРЕКШЕЛІГІ: 10–11-сынып, 15–17 жас. Тіл — қазақ тілі, сөйлемдер қысқа әрі түсінікті.",
    "ТАҚЫРЫП: " + TOPICS[p.topic] + ". КҮРДЕЛІЛІК: " + DIFF[p.difficulty] + ".",
    "АУЫЛ ЖАҒДАЙЫ: " + (p.setting || "ауыл мектебі, ауыл көшесі, үй маңы") + ". Нақты мекенжай, нақты адам аты, мектеп атауы болмасын.",
    "",
    "ҚҰРЫЛЫМ: 5 түйін — s1 → (дұрыс жауап) s2, (қате жауап) s2x; s2 және s2x → (дұрыс) s3, (қате) s3x; s3 және s3x → \"end\". Әр түйінде 3–4 нұсқа, кемінде біреуі қауіпсіз (correct: true), кемінде біреуі қате. Қате таңдауға апаратын түйін (s2x, s3x) жағдайдың сол қатеге байланысты өзгергенін сипаттасын.",
    "Әр түйінде skill өрісі: hazard (қауіпті тану), order (қауіпсіз әрекет реті), justify (шешімді негіздеу), others (өзгенің қауіпсіздігі). «" + p.weakSkill + "» дағдысы кемінде екі түйінде болсын.",
    "Әр нұсқаға consequence (ықтимал салдары), әр түйінге why (дұрыс жауаптың негіздемесі) жаз.",
    "",
    "ҚАУІПСІЗДІК ШЕКТЕУЛЕРІ:",
    "- Келесі әрекеттерді ЕШҚАШАН дұрыс жауап етпе: қауіпті ғимаратқа қайта кіру; су басқан аумақтан өту; электр жабдығына немесе түскен сымға жақындау; құтқарушының міндетін өз бетінше атқару; қауіпті заттармен тәжірибе жасау; өртті өз бетінше сөндіруге бару.",
    "- Жер сілкінісінде тербеліс КЕЗІНДЕГІ және тербелістен КЕЙІНГІ әрекеттерді ажырат. «Дереу сыртқа жүгіру» әмбебап дұрыс жауап болмасын.",
    "- От жағу, түтін шығару, қару-жарақ, қорқынышты суреттеу, жарақаттың егжей-тегжейі болмасын.",
    "- Ресми құжаттарға, заң нөмірлеріне, сілтемелерге немесе ұйымдарға ойдан сілтеме жасама. Ресми нұсқаулыққа сілтеме керек болса, оны жазба: мұғалім өзі қосады.",
    "- Сенімсіз тармақ болса, why өрісінде «Мұғалім ресми нұсқаулықпен тексеруі қажет» деп жаз.",
    "",
    "JSON СХЕМАСЫ (дәл осы өрістерді қолдан):",
    JSON.stringify(schema, null, 2),
    "",
    "ЕСКЕРТУ: бұл — мұғалімге арналған жоба. Мұғалім мазмұнды ҚР ТЖМ-нің ресми нұсқауларымен және мектептің бекітілген эвакуация жоспарымен тексергеннен кейін ғана оқушыға береді."
  ].join("\n");
}
async function requestServer(params, button){
  state.serverMsg = null;
  const box = button.parentNode.nextSibling;
  const show = (n) => { state.serverMsg = n; box.textContent = ""; add(box, n); };
  const offline = (detail) => show(notice("err", h("strong", null, "ЖИ қосылмаған. Офлайн режим қолжетімді."), detail ? h("div", { class:"meta" }, detail) : null));
  if (location.protocol === "file:"){ offline("Бет файлдан ашылған (file://). Сервер арқылы сұрау үшін тренажерді /api/scenario бар веб-серверден ашыңыз."); return; }
  if (location.hostname.endsWith("github.io")){ offline("GitHub Pages — статикалық хостинг, онда /api/scenario сервері жоқ. 1-жолды (промпт → JSON импорт) қолданыңыз."); return; }
  button.disabled = true; show(notice("info", "Сұрау серверге жіберілді. Жауап күтілуде."));
  const ctrl = new AbortController(); const timer = setTimeout(() => ctrl.abort(), 45000);
  try {
    const res = await fetch("/api/scenario", { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify(params), signal:ctrl.signal });
    if (!res.ok){ offline("Сервер жауабы: " + res.status + "."); return; }
    const txt = await res.text();
    if (txt.length > MAX_IMPORT){ show(notice("err", "Сервер жауабы тым үлкен.")); return; }
    let data; try { data = JSON.parse(txt); } catch(e){ show(notice("err", "Сервер JSON емес жауап қайтарды.")); return; }
    if (data && data.error){ show(notice("err", "Сервер қатесі: ", String(data.error).slice(0,200))); return; }
    const r = validateScenario(data && data.scenario ? data.scenario : data);
    if (!r.ok){ show(errList(r.errors)); return; }
    const a = customList(); a.push({ cid:uid("srv"), source:"server", status:"draft", created:Date.now(), scenario:r.scenario }); saveCustom(a);
    show(notice("ok", "«" + r.scenario.title + "» жоба ретінде сақталды. «Сценарийлер» бөлімінде қарап, тексергеннен кейін ғана сабаққа қосыңыз."));
  } catch(e){ offline(e.name === "AbortError" ? "Сервер уақытында жауап бермеді." : "Серверге қосылу мүмкін болмады."); }
  finally { clearTimeout(timer); button.disabled = false; }
}

/* ---- Эвакуация жоспары ---- */
function tPlan(){
  const file = h("input", { type:"file", id:"planFile", accept:"image/*,application/pdf" });
  file.addEventListener("change", () => {
    const f = file.files[0]; if (!f) return;
    if (state.planUrl) URL.revokeObjectURL(state.planUrl);
    state.planUrl = URL.createObjectURL(f); state.planType = f.type; state.planName = f.name; render();
  });
  let view = null;
  if (state.planUrl){
    if (state.planType.startsWith("image/")) view = h("img", { class:"planview", src:state.planUrl, alt:"Мектептің эвакуация жоспары: " + state.planName });
    else if (state.planType === "application/pdf") view = h("iframe", { class:"planview", src:state.planUrl, title:"Мектептің эвакуация жоспары: " + state.planName });
    else view = notice("err", "Бұл файл түрі көрсетілмейді. Сурет (PNG, JPG) немесе PDF таңдаңыз.");
  }
  add(app, h("section", { class:"card" },
    h("h3", null, "Мектептің эвакуация жоспарын ашу"),
    notice("info", "Мектептің бекітілген жоспарын осы құрылғыдан таңдаңыз. Файл ешқайда жіберілмейді және сақталмайды: ол тек осы бет ашық тұрғанда көрсетіледі."),
    h("label", { for:"planFile" }, "Файл (сурет немесе PDF)"), file,
    state.planUrl ? h("p", { class:"meta" }, "Ашылған файл: " + state.planName) : h("p", { class:"meta" }, "Файл әлі таңдалмаған."),
    view,
    state.planUrl && state.planType === "application/pdf" ? h("p", { class:"meta" }, "PDF көрінбесе, жоспарды сурет (PNG немесе JPG) ретінде таңдаңыз.") : null,
    state.planUrl ? h("div", { class:"row" }, btn("Жоспарды жабу", "ghost small", () => { URL.revokeObjectURL(state.planUrl); state.planUrl = null; render(); }, "x")) : null));
}

/* ---- Деректер ---- */
function tData(){
  const res = store.get(K.results, []); const cust = customList(); const ch = Object.keys(checkedMap()).length;
  add(app, h("section", { class:"card" },
    h("h3", null, "Деректерді басқару"),
    h("p", null, "Сақтау орны: " + (store.ok ? "осы браузердің localStorage жады" : "уақытша жад (бетті жапқанда жойылады)")),
    h("ul", null, h("li", null, "Оқушы жазбалары: " + res.length), h("li", null, "Мұғалім қосқан/өңдеген сценарийлер: " + cust.length), h("li", null, "«Тексердім» белгісі қойылған кірістірілген сценарийлер: " + ch)),
    notice("", "Өшірілген деректерді қайтару мүмкін емес. Алдымен CSV жүктеп алуды ұсынамыз."),
    h("div", { class:"row" },
      btn("Оқушы нәтижелерін өшіру", "danger small", async () => { if (await confirmBox("Барлық оқушы нәтижесі өшіріледі.")){ store.set(K.results, []); store.del(K.current); if (!state.demo) state.sessionId = null; render(); } }, "trash"),
      btn("Мұғалім сценарийлерін өшіру", "danger small", async () => { if (await confirmBox("Барлық импортталған және өңделген сценарий өшіріледі.")){ saveCustom([]); render(); } }, "trash"),
      btn("«Тексердім» белгілерін тазалау", "danger small", async () => { if (await confirmBox("Кірістірілген сценарийлердегі «Тексердім» белгілері алынады.")){ store.set(K.checked, {}); render(); } }, "trash"))));
}

/* ============================ ЖОБА ТУРАЛЫ ============================ */
function vAbout(){
  const qa = [
    ["Қандай оқу мәселесін шешеді?", "Оқушылар төтенше жағдайдағы ережелерді біледі, бірақ жағдай өзгергенде, мысалы шығу жолы бөгелгенде, қасында кіші бала болғанда, байланыс жоқ кезде, шешім қабылдауда қиналады. Тренажер ауылға жақын жағдайларда шешім қабылдауды, оны дәлелдеуді және өзгерген жағдайда бейімдеуді жаттықтырады."],
    ["Мұғалім не істейді?", "Сценарийлерді ресми нұсқаулармен және мектептің эвакуация жоспарымен тексереді, қажет болса өңдейді немесе ЖИ көмегімен жаңасын дайындайды. Оқушының шешім жолы мен еркін мәтіндегі дәлелін қарап, кері байланыс жазады."],
    ["Оқушы не істейді?", "Жағдайды таниды, шешім қабылдайды, себебін түсіндіреді, кері байланыс алады және жаңа жағдайда қолданады. Қате таңдаса, оқиға соған сай өзгереді. Сол дағдыға арналған келесі тапсырманы алады. Соңында «Көшеге шық!» ойынында үйренгенін өз мектебінің картасында тексереді."],
    ["ЖИ қай жерде қолданылады?", "Тек мұғалім панелінде, сценарий жобасын дайындау үшін: промпт → ЖИ жауабы (JSON) → тексеру → мұғалімнің бекітуі. Оқушыға арналған бейімдеу — генеративті ЖИ емес, «Ережеге негізделген бейімдеу». Тренажер интернетсіз толық жұмыс істейді."],
    ["Нәтижені қалай өлшейміз?", "Төрт дағды бойынша: қауіпті тану, қауіпсіз әрекет реті, шешімді негіздеу, өзгенің қауіпсіздігі. Бірінші әрекеттегі қауіпсіз таңдау, қайталанған қадамдар және құрылымы бірдей, мазмұны әр түрлі бастапқы және қорытынды тапсырмалар салыстырылады. Еркін мәтіндегі дәлелді мұғалім бағалайды."]
  ];
  add(app, h("section", { class:"card fade" },
    h("h2", null, "Жоба туралы"),
    h("p", null, h("strong", null, "SARBAZ AI"), " — БӘД (бастапқы әскери даярлық) пәніне арналған оқу тренажері. Автор: А. Хайдаров, БӘД оқытушы-ұйымдастырушысы. Педагогикалық тақырып: «Ауыл мектебі + ЖИ: төтенше жағдайға дайын — жеке сценарийлер арқылы әрекет етуді үйрену»."),
    h("h3", null, "Үш жұмыс режимі"),
    h("ul", null, h("li", null, h("strong", null, "А) Офлайн тренажер: "), "API-сіз жұмыс істейді. 9 тармақталған сценарий, бастапқы және қорытынды тапсырма, ережеге негізделген бейімдеу."),
      h("li", null, h("strong", null, "Ә) «Көшеге шық!» ойыны: "), "Ө. Жәнібеков мектебінің 2 қабатты картасы бойынша өз кабинетіңнен Ақынтоған көшесіндегі жиналу орнына шығу. Өрт ошағы мен бөгелген жол әр ойында өзгереді."),
      h("li", null, h("strong", null, "Б) ЖИ көмегімен сценарий дайындау: "), "мұғалім панелінде. Промптты көшіріп, ЖИ жауабын JSON түрінде импорттауға болады. Нәтиже әрдайым алдымен «Жоба» мәртебесінде сақталады.")),
    h("h3", null, "Ережеге негізделген бейімдеу"),
    h("ul", null, h("li", null, "Бірінші әрекетте қате жіберілсе, сол дағдыға арналған басқа мазмұндағы сценарий ұсынылады."),
      h("li", null, "Қатарынан екі сценарий бірінші әрекетте қатесіз орындалса, күрделірек сценарий ұсынылады."),
      h("li", null, "Режим (қолдау көлемі) — тұрақты баға емес: оқушы оны кез келген уақытта өзгерте алады.")),
    h("h3", null, "Педагогикалық идея: 5 сұрақ"),
    qa.map(([q,a]) => h("div", null, h("h3", null, q), h("p", null, a))),
    h("h3", null, "Қауіпсіздік және деректер"),
    h("ul", null, h("li", null, "Барлық сценарий — оқу мақсатындағы модельдеу. Кірістірілген сценарийлер ресми бекітілген нұсқаулық емес: мұғалім оларды ресми нұсқаулармен тексеруі тиіс."),
      h("li", null, "Оқушыдан тек бүркеншік ат пен сынып сұралады."),
      h("li", null, "Деректер тек осы браузерде сақталады. Мұғалім панелі құпиясөзбен қорғалмаған."),
      h("li", null, "Сайт GitHub Pages-те ашық кодпен орналасқан, бір рет ашылған соң интернетсіз жұмыс істейді (PWA).")),
    h("h3", null, "Пернетақта"),
    h("p", null, h("span", { class:"kbd" }, "Tab"), " — келесі элемент, ", h("span", { class:"kbd" }, "Enter"), " — таңдау, ", h("span", { class:"kbd" }, "1–4"), " — сценарийдегі нұсқаны таңдау."),
    notice("", "Бұл — оқу тренажері. Нақты төтенше жағдайда мектептің бекітілген жоспары мен ресми нұсқауларды орындаңыз."),
    h("div", { class:"row" }, btn("Басты бет", "ghost", () => go("home"), "back"), btn("Демо көрсету", "green", startDemo, "demo"), linkBtn("Көшеге шық!", "hotbtn", GAME_URL, "run"))));
}


/* ============================ МЕКТЕП СЫЗБАСЫ / БЕЙНЕСАБАҚТАР / МАРАПАТТАР ============================ */
function figImg(src, cap){
  const img = h("img", { src:src, alt:cap, loading:"lazy" });
  img.addEventListener("error", () => { const ph = h("div", { class:"imgph" }, "Сурет жүктелмеді: " + src); img.replaceWith(ph); });
  return h("figure", { class:"xfig" }, h("a", { href:src, target:"_blank", rel:"noopener" }, img), h("figcaption", null, cap));
}
const EVAC_Q = [
  { q:"Өрт туралы қай нөмірге хабарлайсыз?", a:["101","102","103","104"], ok:0, why:"Сызбада көрсетілгендей, өрт кезінде 101 нөміріне хабарлайды. Мектептің ішкі нөмірі: 4-24-01." },
  { q:"II қабатта дәлізде түтін бар. Қалай шығасыз?", a:["Терезеден секіремін","Ең жақын баспалдаққа сызбадағы көрсеткі бағытымен, еңкейіп, мұрын мен ауызды матамен жауып жүремін","Сыныпта отырып күтемін","Заттарымды жинап алып, жүгіремін"], ok:1, why:"Сызбада II қабатта екі баспалдақ бар. Түтін жоғары көтеріледі, сондықтан еңкейіп, көрсеткі бағытымен ең жақын баспалдаққа жүреміз." },
  { q:"Жақын баспалдақ түтінге толып, жабылып қалды. Не істейсіз?", a:["Сол баспалдақпен бәрібір түсемін","Дәліздің екінші шетіндегі баспалдаққа барамын","Лифтпен түсемін","Дәлізде тұрып қаламын"], ok:1, why:"Сызбада ғимараттың екі шетінде баспалдақ бар — бір жол жабылса, екіншісін қолданамыз. Мектепте лифт жоқ." },
  { q:"Сыныптан шыққаннан кейін мұғалім алдымен не істейді?", a:["Үйіне кетеді","Оқушыларды жиналу орнында санап, тізіммен тексереді","Сыныпқа қайта кіреді","Суретке түсіреді"], ok:1, why:"Жиналу орнында мұғалім оқушыларды тізім бойынша санап, жоқ оқушы туралы бірден хабарлайды." },
  { q:"Сызбадағы қызыл баллон белгісі нені білдіреді?", a:["Камера","Өрт сөндіргіш","Телефон","Есік"], ok:1, why:"Шартты белгілер бойынша қызыл баллон — өрт сөндіргіш. Дөңгелек белгі — дыбыстық өрт хабарлағышты қосу пернесі." }
];
function vEvac(){
  const sec = h("section", { class:"card fade" },
    h("h2", null, "Мектептің эвакуация сызбасы"),
    h("p", { class:"meta" }, "Ө.Жәнібеков атындағы жалпы білім беретін мектеп · сызбаны мектеп директоры Ж.Нұржакиева бекіткен · жауапты: И.Юлдашев"),
    notice("", "Сценарийлер осы нақты ғимаратқа бейімделеді: оқушы алдымен өз мектебінің сызбасын оқиды, содан кейін тренажерде және «Көшеге шық!» ойынында шешім қабылдайды."),
    h("div", { class:"row" }, linkBtn("Осы сызба бойынша ойнау: Көшеге шық!", "hotbtn big", GAME_URL, "run")),
    h("div", { class:"xgrid" }, figImg("img/evac1.jpg", "I қабат: оқу ғимаратының сызбасы"), figImg("img/evac2.jpg", "II қабат: оқу ғимаратының сызбасы")),
    figImg("img/evac2wall.jpg", "II қабаттағы «Өрт болған жағдайда сыртқа шығу жоспары» (дәліздегі тақта)"),
    h("h3", null, "Сызбаны оқу"),
    h("ul", null,
      h("li", null, h("strong", null, "Көрсеткілер"), " — шығу бағыты. Дәліз арқылы ең жақын баспалдаққа немесе шығу есігіне жүреміз."),
      h("li", null, h("strong", null, "Екі баспалдақ"), " — ғимараттың екі жағында. Бір жол бөгелсе, екіншісін қолданамыз."),
      h("li", null, h("strong", null, "Қызыл баллон"), " — өрт сөндіргіш; ", h("strong", null, "дөңгелек белгі"), " — дыбыстық өрт хабарлағышты қосу пернесі; ", h("strong", null, "камера"), " — бейнебақылау."),
      h("li", null, h("strong", null, "Телефондар:"), " 101 (өрт қызметі), мектептің ішкі нөмірі 4-24-01.")),
    h("h3", null, "Жаттығу: «Шығу жолын тап»"));
  const box = h("div", null);
  let score = 0, done = 0;
  EVAC_Q.forEach((it, qi) => {
    const fb = h("div", { class:"meta" });
    const opts = h("div", { class:"xopts" });
    it.a.forEach((t, ai) => opts.appendChild(btn((ai+1) + ". " + t, "ghost small", (e) => {
      if (opts.dataset.done) return; opts.dataset.done = "1"; done++;
      const ok = ai === it.ok; if (ok) score++;
      e.currentTarget.classList.add(ok ? "green" : "danger");
      fb.textContent = (ok ? "Дұрыс. " : "Қате. Дұрысы: " + it.a[it.ok] + ". ") + it.why;
      if (done === EVAC_Q.length) add(box, notice(score >= 4 ? "ok" : "info", "Нәтиже: " + score + " / " + EVAC_Q.length + ". " + (score >= 4 ? "Мектеп сызбасын жақсы білесіз. Енді «Көшеге шық!» ойынында тексеріңіз!" : "Сызбаны тағы бір рет қарап, тренажердегі өрт сценарийін орындаңыз.")));
    })));
    add(box, h("div", { class:"xq" }, h("p", null, h("strong", null, (qi+1) + ". " + it.q)), opts, fb));
  });
  add(sec, box);
  add(sec, h("div", { class:"row" }, btn("Тренажерге өту", "green", () => go(state.sessionId ? "hub" : "login"), "play"), linkBtn("Көшеге шық!", "hotbtn", GAME_URL, "run"), btn("Бейнесабақтар", "ghost", () => go("videos"), "play")));
  add(app, sec);
}
const YT = [
  ["Өрт", [["XN1hCSucuqQ","Өрт болған жағдайда не істеу керек","ДЧС города Астаны"],["0fOaDwa6ZBE","Егер өрт шықса","112 KZ"],["GkG1w2Jhq04","Мектеп ғимаратындағы өрт","112 KZ"],["UTs80f8M6Lk","Өрт сөндірудің алғашқы құралдары және қолдану қағидалары","112 KZ"]]],
  ["Жер сілкінісі", [["cM58Q4_gHS0","Жер сілкінісі кезіндегі жүріс-тұрыс қағидалары","112 KZ"],["DOi2imx9nEI","Жер сілкінісі кезіндегі іс-әрекеттер","Ақсай қаласы екінші мектеп"]]],
  ["Су тасқыны", [["BSugq5pe90A","Су тасқыны кезінде өзін-өзі ұстау ережелері","Love Astana"],["OcqbzZx9qug","Сел мен су тасқыны кезіндегі қауіпсіздік ережелері","Жамбыл облысы ТЖД"],["caoE_JrbpnM","Су тасқыны қаупі кезіндегі іс-қимыл тәртібі","KOKSHE TV"]]],
  ["Алғашқы көмек", [["0GRossnCWos","Жүрек тоқтағанда шұғыл көмек: базалық жүрек-өкпе реанимациясы","ҚазҰМУ симуляциялық орталығы"],["RIKuntXOTcU","Алғашқы медициналық көмек көрсете білесіз бе?","Таңшолпан бағдарламасы"]]],
  ["Азаматтық қорғаныс", [["UhC3XcCODr8","Азаматтық қорғаныстың хабарлау белгілері","Айдын Байназаров"]]]
];
function vVideos(){
  const sec = h("section", { class:"card fade" },
    h("h2", null, "Бейнесабақтар"),
    h("p", { class:"meta" }, "Сценарийден бұрын немесе кейін қарауға арналған қысқа бейнелер (YouTube). Мұғалім әр бейнені сабаққа дейін тексереді."));
  YT.forEach(([topic, list]) => {
    add(sec, h("h3", null, topic));
    add(sec, h("div", { class:"xvids" }, list.map(([id, t, ch]) => h("a", { class:"xvid", href:"https://www.youtube.com/watch?v=" + id, target:"_blank", rel:"noopener" },
      h("span", { class:"xplay" }, "▶"), h("span", null, h("strong", null, t), h("br"), h("small", null, ch))))));
  });
  add(sec, notice("", "Бейнелер YouTube-та ашылады. Интернет болмаса, мұғалім оларды сабаққа дейін көрсетеді."));
  add(app, sec);
}
function vAwards(){
  const sec = h("section", { class:"card fade" },
    h("h2", null, "Марапаттар: тәжірибе тек сабақта емес"),
    h("p", null, "Автор мен мектеп ұжымының төтенше жағдайлар мен азаматтық қорғаныс саласындағы нақты әрекеттері."),
    h("div", { class:"xgrid" },
      figImg("img/award4.jpg", "Алғыс хат: Бершін-Төбе елді мекенінде су тасқыны кезінде халыққа көрсеткен ерлігі үшін (ақпан, 2023)"),
      figImg("img/award2.jpg", "Грамота: азаматтық қорғау жүйесін дамытуға қосқан үлесі үшін (Сауран аудандық ТЖ бөлімі, 2023)"),
      figImg("img/award1.jpg", "Грамота: Дүниежүзілік азаматтық қорғаныс күніне арналған спорттық эстафетада I орын (2023)"),
      figImg("img/award3.jpg", "Алғыс хат: 2024 жылғы Дүниежүзілік азаматтық қорғаныс күніне белсенді қатысқаны үшін мектеп ұжымына")));
  add(app, sec);
}

/* ============================ РАСТАУ ТЕРЕЗЕСІ ============================ */
function confirmBox(text){
  const dlg = document.getElementById("confirmDlg");
  if (!dlg.showModal) return Promise.resolve(window.confirm(text));
  document.getElementById("dlgText").textContent = text;
  return new Promise(res => {
    const yes = document.getElementById("dlgYes"), no = document.getElementById("dlgNo");
    const done = (v) => { yes.onclick = no.onclick = null; dlg.onclose = null; if (dlg.open) dlg.close(); res(v); };
    yes.onclick = () => done(true); no.onclick = () => done(false); dlg.onclose = () => done(false);
    dlg.showModal(); no.focus();
  });
}

/* ============================ ПЕРНЕТАҚТА ============================ */
document.addEventListener("keydown", (e) => {
  if (state.view !== "play" || !state.run || state.run.phase !== "choose") return;
  const t = e.target; if (t && (t.tagName === "TEXTAREA" || t.tagName === "INPUT")) return;
  if (/^[1-4]$/.test(e.key)){ const b = app.querySelector('.opt[data-key="' + e.key + '"]'); if (b){ e.preventDefault(); b.click(); } }
});

/* ============================ ІСКЕ ҚОСУ ============================ */
(function init(){
  if (!store.ok) store.warn();
  const cur = store.get(K.current, null);
  if (cur && getResults().some(r => r.id === cur)) state.sessionId = cur;
  const hv = (location.hash || "").slice(1);
  if (HASHABLE.includes(hv)) state.view = hv;
  render();
  if ("serviceWorker" in navigator && location.protocol === "https:"){ navigator.serviceWorker.register("sw.js").catch(() => {}); }
})();
