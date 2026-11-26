/* SARBAZ AI — офлайн жұмыс (PWA). Нұсқа өзгерсе, CACHE атауын жаңартыңыз. */
const CACHE = "sarbaz-ai-v1";
const CORE = ["./", "index.html", "game.html", "js/scenarios.js", "js/app.js", "manifest.webmanifest", "icon.svg",
  "img/evac1.jpg", "img/evac2.jpg", "img/evac2wall.jpg", "img/award1.jpg", "img/award2.jpg", "img/award3.jpg", "img/award4.jpg"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(CORE.map(u => c.add(u).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  e.respondWith(fetch(req).then(res => {
    if (res && res.ok && (new URL(req.url).origin === location.origin || req.url.includes("cdnjs.cloudflare.com"))){
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy));
    }
    return res;
  }).catch(() => caches.match(req).then(r => r || caches.match("index.html"))));
});
