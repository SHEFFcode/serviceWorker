var cacheName = 'v2';
var cacheFiles = [
    './',
    './index.html',
    './css/style.css',
    'https://fonts.googleapis.com/css?family=PT+Sans',
    './js/app.js'
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker]: Installed');

    e.waitUntil(
        caches.open(cacheName)
            .then((cache) => {
                console.log('[Service Worker]: Caching Cache Files');
                return cache.addAll(cacheFiles);
            }
            )
    );
});

self.addEventListener('activate', (e) => {
    console.log('[Service Worker]: Activated');

    e.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(cacheNames.map((currentCacheName) => {
                    if (currentCacheName !== cacheName) {
                        console.log('[Service Worker]: Removing Cached Files from ' + currentCacheName);
                        return caches.delete(currentCacheName);
                    }
                }))
            }
            )
    );
});
self.addEventListener('fetch', (e) => {
    console.log('[Service Worker]: Fetched');

    e.respondWith(
        caches.match(e.request)
            .then((response) => {
                if (response) {
                    console.log('[Service Worker]: Found in cache ' + e.request.url);
                    return response;
                }

                var requestClone = e.request.clone();

                return fetch(requestClone)
                    .then((response) => {
                        if (!response) {
                            return response;
                        }

                        var responseClone = response.clone();
                        caches.open(cacheName).then((cache) => {
                            cache.put(requestClone, responseClone);
                            return responseClone;
                        });
                    }).catch((err) => {
                        throw err;
                    });
            })
    );
}
);