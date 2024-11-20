const { precacheAndRoute } = require('workbox-precaching');
const { Route, registerRoute } = require('workbox-routing');
const { StaleWhileRevalidate } = require('workbox-strategies');

// melakukan precaching
precacheAndRoute(self.__WB_MANIFEST);

const themoviedbApi = new Route(
  ({ url }) => url.href.startsWith('https://api.themoviedb.org/3/'),
  new StaleWhileRevalidate({
    cacheName: 'themoviedb-api',
  }),
);

const themovieImageApi = new Route(
  ({ url }) => url.href.startsWith('https://image.tmdb.org/t/p/w500/'),
  new StaleWhileRevalidate({
    cacheName: 'themoviedb-image-api',
  }),
);

registerRoute(themoviedbApi);
registerRoute(themovieImageApi);

self.addEventListener('install', () => {
  console.log('Service worker: Installed');
  self.skipWaiting();
});

self.addEventListener('push', (event) => {
  console.log('Service worker: Pushed');

  const notificationData = {
    title: 'Push Notification',
    options: {
      body: 'This is a push notification',
      icon: '/favicon.png',
      image: '/icon-512x512/icon-512x512.jpg',
    },
  };

  const showNotification = self.ServiceWorkerRegistration.showNotification(
    notificationData.title,
    notificationData.options,
  );

  event.waitUntil(showNotification);
});
