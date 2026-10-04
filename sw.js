const CACHE_NAME = 'madhira-cache-v1';
const urlsToCache = [
  '/',
  '/index.html'
];

// Install the service worker and cache base layout
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Serve cached data when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
