import 'regenerator-runtime'; /* for async await transpile */
import '../assets/styles/main.scss';
import '../components/index.js';
import '../layouts/index.js';
import routeHandlers from '../routes/routeHandlers.js';
import Router from '../routes/Router.js';
import RestoListController from './controllers/RestoListController.js';
import IndexedDBService from '../services/IndexedDBServices.js';
import RestoDetailController from './controllers/RestoDetailController.js';
import NavigationView from './views/NavigationView.js';
import RestoFavoriteController from './controllers/RestoFavoriteController.js';
import { DomHandlerNestedSelectors } from '../utils/DomHandlerNestedSelectors.js';

function initializeApp() {
  const domElements = new DomHandlerNestedSelectors(
    document,
    {
      bodyElement: 'body',
      headerElement: 'header-component >> header',
      mainElement: 'main',
      skipToContentButton: '.skip-to-content',
      navigationMenuElement: 'navigation-menu!',
      brandLogoElement: 'brand-logo!',
    },
    true,
  );

  const elements = domElements.elements;

  initializeRouter(elements.mainElement);
  initializeNavigation(elements);
  initializeRestoListObserver(elements.mainElement);
}

function initializeRouter(mainElement) {
  const router = new Router(routeHandlers, mainElement);
  router.startListening();
}

function initializeNavigation(elements) {
  const navigationView = new NavigationView(elements);
  navigationView.initialize();
}

function initializeRestoListObserver(mainElement) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        const { restoListPage, restoFavoritePage, restoDetailPage } = new DomHandlerNestedSelectors(
          mainElement,
          {
            restoListPage: 'resto-list-page!',
            restoFavoritePage: 'favorite-page!',
            restoDetailPage: 'resto-detail-page!',
          },
          false,
        ).elements;

        if (restoListPage) {
          const indexedDBService = new IndexedDBService({
            databaseName: 'favorite-restaurants-database',
            databaseVersion: 1,
            objectStoreName: 'favorite-restaurants',
          });
          new RestoListController(indexedDBService, restoListPage);
        }
        if (restoFavoritePage) {
          const indexedDBService = new IndexedDBService({
            databaseName: 'favorite-restaurants-database',
            databaseVersion: 1,
            objectStoreName: 'favorite-restaurants',
          });
          new RestoFavoriteController(indexedDBService, restoFavoritePage);
        }
        if (restoDetailPage) {
          const indexedDBService = new IndexedDBService({
            databaseName: 'favorite-restaurants-database',
            databaseVersion: 1,
            objectStoreName: 'favorite-restaurants',
          });
          new RestoDetailController(indexedDBService, restoDetailPage);
        }
      }
    });
  });

  observer.observe(mainElement, { childList: true });
}

document.addEventListener('DOMContentLoaded', initializeApp);
