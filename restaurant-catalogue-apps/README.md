## OVERVIEW

### Project Title:

CookNify (Restaurant Catalog)

### Short Description:

The restaurant catalog app that supports offline-first using **Service Worker** and **IndexedDB**. This project uses **MVC** architecture, **JavaScript OOP**, **Clean Code**, and implementation of **Web Component** with **Shadow DOM**.

### Main Features:

- Hash-Based Routing (`/, /favorite, /list-resto, /list-resto/detail/:id, /about`).
- Lazy loading of pages, UI elements, and images.
- Offline-first with Service Worker and IndexedDB.
- Skeleton loader for improve user experience.
- Performance optimization with Webpack module bundler (dynamic import and split chunks).

### Technology used:

- **Web Component** (Custom Elements + Shadow DOM)
- **SCSS**
- **Webpack 5**
- **IndexedDb** (with `idb` third party library)
- **Service Worker**
- **Intersection Observer API**
- **HTML5 & ES Modules**

## Instructions for use

### Page Navigation:

- Home Page (`/`): Displays overview of this app.
- Favorites Page (`/favorite`): Displays restaurants marked as favorites.
- Restaurant Details (`/list-resto`): Displays a list of popular restaurants.
- Restaurant Details (`/list-resto/detail/:id`): Displays complete information about a restaurant.
- About (`/about`): Information about this application.

### Offline Mode

The application continues to function even if there is no internet connection, thanks to caching with **Service Worker** and **IndexedDB**.
