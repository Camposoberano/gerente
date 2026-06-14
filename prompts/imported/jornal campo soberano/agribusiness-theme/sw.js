const CACHE_NAME = 'agribusiness-v1';
const ASSETS_TO_CACHE = [
    './', // Cache root
    './style.css',
    './js/app.js',
    './offline.html' // TODO: Create this fallback page
];

// Install Event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Fetch Event
self.addEventListener('fetch', event => {
    if (event.request.mode !== 'navigate') {
        return;
    }
    event.respondWith(
        fetch(event.request)
            .catch(() => {
                return caches.open(CACHE_NAME)
                    .then(cache => {
                        return cache.match('offline.html');
                    });
            })
    );
});
