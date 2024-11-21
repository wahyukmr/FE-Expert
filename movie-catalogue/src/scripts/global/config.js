export const CONFIG = {
  KEY: 'ce30ce5c43adb6a629a193a0bfdd3b48',
  BASE_URL: 'https://api.themoviedb.org/3/',
  BASE_IMAGE_URL: 'https://image.tmdb.org/t/p/w500/',
  DEFAULT_LANGUAGE: 'en-us',
  CACHE_NAME: 'MovieCatalogue-V1',
  DATABASE_NAME: 'movie-catalogue-database',
  DATABASE_VERSION: 1,
  OBJECT_STORE_NAME: 'movies',
  WEB_SOCKET_SERVER: 'wss://movies-feed.dicoding.dev',

  // menambahkan application server keys (VAPID Keys) yang bersifat public
  PUSH_MSG_VAPID_PUBLIC_KEY:
    'BN7-r0Svv7CsTi18-OPYtJLVW0bfuZ1x1UtrygczKjennA_qs7OWmgOewcuYSYF3Gc_mPbqsDh2YoGCDPL0RxDQ',

  // mendaftarkan user yang melakukan subscribing
  PUSH_MSG_SUBSCRIBE_URL:
    'https://dicoding-movie-push-notif.netlify.app/.netlify/functions/subscribe',

  // mengidentifikasi client (browser) yang melakukan unsubscribing
  PUSH_MSG_UNSUBSCRIBE_URL:
    'https://dicoding-movie-push-notif.netlify.app/.netlify/functions/unsubscribe',
};
