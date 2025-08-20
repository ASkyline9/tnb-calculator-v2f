// sw.js - Service Worker for TNB Calculator V2

const CACHE_NAME = "tnb-calc-v2-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./assets/favicon-32x32.png",
  "./assets/favicon-64x64.png",
  "./assets/icon-192x192.png",
  "./assets/icon-512x512.png"
];

// Install service worker and cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache and adding assets");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate service worker and clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log("Deleting old cache:", name);
            return caches.delete(name);
          }
        })
      )
    )
  );
});

// Fetch requests with network fallback
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;
      return fetch(event.request)
        .then((networkResponse) => {
          // Cache the new request for offline use
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // Optional: return offline fallback page/image if available
        });
    })
  );
});
