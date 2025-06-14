const CACHE_NAME = "study-spot-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/map.html",
  "/camera.html",
  "/gallery.html",
  "/styles.css",
  "/app.js",
  "/manifest.json"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
