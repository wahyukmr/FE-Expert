export const CONFIG = {
  KEY: process.env.KEY,
  BASE_URL: process.env.BASE_URL,
  BASE_IMAGE_URL: process.env.BASE_IMAGE_URL,
  DEFAULT_LANGUAGE: 'en-us',
  CACHE_NAME: 'MovieCatalogue-V1',
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_VERSION: 1,
  OBJECT_STORE_NAME: 'movies',
  WEB_SOCKET_SERVER: process.env.WEB_SOCKET_SERVER,

  // menambahkan application server keys (VAPID Keys) yang bersifat public
  PUSH_MSG_VAPID_PUBLIC_KEY: process.env.PUSH_MSG_VAPID_PUBLIC_KEY,

  // mendaftarkan user yang melakukan subscribing
  PUSH_MSG_SUBSCRIBE_URL:
    'https://dicoding-movie-push-notif.netlify.app/.netlify/functions/subscribe',

  // mengidentifikasi client (browser) yang melakukan unsubscribing
  PUSH_MSG_UNSUBSCRIBE_URL:
    'https://dicoding-movie-push-notif.netlify.app/.netlify/functions/unsubscribe',
};
