// Simple service worker for basic caching
const CACHE_NAME = 'portfolio-v1';
const urlsToCache = [
  '/',
  '/css/style.css',
  '/css/infinite_scroll.css',
  '/css/image_hover.css',
  '/script.js',
  '/js/enhancements.js',
  '/js/libs/gsap-fallback.js',
  '/images/project/digital-ilm-1.webp',
  '/images/project/landscape-1.webp',
  '/images/project/product-order-and-database-manager-1.webp'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .catch(function(error) {
        console.log('Service Worker: Cache failed', error);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});