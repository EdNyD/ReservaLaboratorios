// =====================================================
// SERVICE WORKER — ReservasEDMED PWA
// =====================================================
const CACHE_NAME = 'reservas-edmed-v1';
const APP_URL = 'https://script.google.com/macros/s/AKfycbzROcSrjgizGmrffFENHu7wdvSTXSpIFZbwDbhhcZkYrMts7J4noJkeIvF2gdxnuOZZ/exec';

// Archivos a guardar en caché (la página de instalación local)
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png',
];

// --- Instalación del Service Worker ---
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
                console.warn('SW: No se pudo cachear algunos activos:', err);
            });
        })
    );
    self.skipWaiting();
});

// --- Activación y limpieza de caché vieja ---
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

// --- Estrategia de fetch: Network First para la app, Cache First para activos ---
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Para la app de Google Apps Script, siempre ir a la red
    if (event.request.url.startsWith('https://script.google.com')) {
        return; // Deja pasar sin interceptar
    }

    // Para activos locales, usar caché primero
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            return fetch(event.request).then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // Fallback si no hay red
                return caches.match('/index.html');
            });
        })
    );
});
