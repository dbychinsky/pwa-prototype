const CACHE_NAME = 'my-cache-v1'; // Cache name (change for versioning)
const URLS_TO_CACHE = [
    'index.html',
    'index.css',
    'index.js',
];

// Install event - caching static files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(URLS_TO_CACHE);
            })
    );
});

// Activate event - clean up old caches if needed
self.addEventListener('activate', (event) => {
    const currentCaches = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!currentCaches.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event - network first, fall back to cache if offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // If the request is successful, clone it and store it in cache
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseClone);
                });
                return response;
            })
            .catch(() => {
                // If network is unavailable, serve from the cache
                return caches.match(event.request).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    // Optionally return a fallback page or response here
                    return caches.match('/offline.html'); // Example fallback
                });
            })
    );
});
