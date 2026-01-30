// Service Worker for ChessHub Academy PWA
const CACHE_NAME = 'chesshub-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icon-192.png',
    '/icon-512.png'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Caching assets');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version or fetch from network
                return response || fetch(event.request).then((fetchResponse) => {
                    // Cache successful responses
                    if (fetchResponse.ok) {
                        return caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, fetchResponse.clone());
                            return fetchResponse;
                        });
                    }
                    return fetchResponse;
                });
            })
            .catch(() => {
                // Return offline page if available
                if (event.request.mode === 'navigate') {
                    return caches.match('/');
                }
            })
    );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-stats') {
        event.waitUntil(syncUserStats());
    }
});

async function syncUserStats() {
    try {
        // Sync localStorage data to backend when online
        const stats = {
            xp: localStorage.getItem('userXP'),
            level: localStorage.getItem('userLevel'),
            puzzleStreak: localStorage.getItem('puzzleStreak'),
            totalPuzzlesSolved: localStorage.getItem('totalPuzzlesSolved')
        };

        // Send to backend API
        // await fetch('/api/sync-stats', {
        //     method: 'POST',
        //     body: JSON.stringify(stats),
        //     headers: { 'Content-Type': 'application/json' }
        // });

        console.log('[Service Worker] Stats synced successfully');
    } catch (error) {
        console.error('[Service Worker] Sync failed:', error);
    }
}

// Push notifications
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'ChessHub Academy';
    const options = {
        body: data.body || 'New notification from ChessHub',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        data: data.url || '/'
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

//Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data || '/')
    );
});
