const CACHE_NAME = "dummy-pwa-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/styles.css",
    "/image.jpg",  // Ensure you have an image named image.jpg in your project
    "/manifest.json"
];

// Install the service worker
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Cache and return requests
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // Return cached response or fetch the resource
            return response || fetch(event.request).catch(() => caches.match('/index.html'));
        })
    );
});

// Update the service worker
self.addEventListener("activate", event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
