// Karena kini di dalam service worker (sw.js) kita banyak menjalankan kode yang berjalan secara async, jangan lupa untuk mengimpor “regenerator-runtime”. Agar ketika babel men-transpile kode, fungsi asynchronous tetap berjalan.

import 'regenerator-runtime';
import CacheHelper from './utils/cache-helper';

const assetsToCache = [
  './',
  './icons/icon-72x72.png',
  './icons/icon-96x96.png',
  './icons/icon-128x128.png',
  './icons/icon-144x144.png',
  './icons/icon-152x152.png',
  './icons/icon-192x192.png',
  './icons/icon-384x384.png',
  './icons/icon-512x512.png',
  './index.html',
  './favicon.png',
  './app.bundle.js',
  './app.webmanifest',
  './sw.bundle.js',
];

self.addEventListener('install', (event) => {
  // TODO: Caching app shell resource
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener('activate', (event) => {
  // TODO: Delete old caches
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  if (url.protocol === 'chrome-extension:') {
    console.warn('Ignoring request from Chrome Extension:', url.href);
    return;
  }

  // TODO: Add/get fetch request to/from caches
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
