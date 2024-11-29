import 'regenerator-runtime'; /* for async await transpile */
import '../assets/styles/main.scss';
import '../components/index.js';
import '../layouts/index.js';
import NavigationView from './views/navigationView.js';
import { getDomElements, areElementsPresent, log } from '../utils';
import routeHandlers from '../routes/routeHandlers.js';
import Router from '../routes/Router.js';

document.addEventListener('DOMContentLoaded', () => {
  const domElements = getDomElements({
    bodyElement: 'body',
    headerElement: () =>
      document.querySelector('header-component')?.shadowRoot?.querySelector('header'),
    mainElement: 'main',
    skipToContentButton: '.skip-to-content',
    navigationMenuElement: 'navigation-menu',
    brandLogoElement: 'brand-logo',
  });

  if (!areElementsPresent(domElements)) {
    log('Required DOM elements are missing. Application cannot start.');
    return;
  }

  const router = new Router(routeHandlers, domElements.mainElement);
  router.startListening();

  const navigationView = new NavigationView(domElements);
  navigationView.initialize();
});
