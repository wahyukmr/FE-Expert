import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock-upgrade';

export default class NavigationView {
  _smallBreakpoint = '(width <= 37.4988em)';
  _elements;
  _media;

  constructor({
    bodyElement,
    headerElement,
    mainElement,
    navigationMenuElement,
    brandLogoElement,
    skipToContentButton,
  }) {
    this._elements = {
      body: bodyElement,
      header: headerElement,
      main: mainElement,
      skipToContent: skipToContentButton,
      navigationMenu: navigationMenuElement,
      brandLogo: brandLogoElement,
      btnOpen: navigationMenuElement.shadowRoot.getElementById('btnOpen'),
      btnClose: navigationMenuElement.shadowRoot.getElementById('btnClose'),
      topNavMenu: navigationMenuElement.shadowRoot.querySelector('.topnav__menu'),
    };

    this._handleOpenMobileMenu = this._onOpenMobileMenu.bind(this);
    this._handleCloseMobileMenu = this._onCloseMobileMenu.bind(this);

    this._media = window.matchMedia(this._smallBreakpoint);
  }

  initialize() {
    this._addEventListeners();
  }

  _addEventListeners() {
    const { skipToContent, navigationMenu } = this._elements;

    window.addEventListener('scroll', this._onToggleHeaderScrolledState.bind(this));
    this._media.addEventListener('change', this._onNavMenuUpdateState.bind(this));
    skipToContent.addEventListener('click', this._onSkipToContentClick.bind(this));
    navigationMenu.addEventListener('click-nav-item', this._onNavClick.bind(this));

    this._onNavMenuUpdateState(this._media);
  }

  _onToggleHeaderScrolledState() {
    const headerElement = this._elements.header;
    headerElement.classList.toggle('scrolled', window.scrollY > 0);
  }

  _onNavMenuUpdateState(event) {
    const { topNavMenu, navigationMenu } = this._elements;
    const isSmallScreen = event.matches;

    navigationMenu.removeEventListener('click-open-nav-btn', this._handleOpenMobileMenu);
    navigationMenu.removeEventListener('click-close-nav-btn', this._handleCloseMobileMenu);

    if (isSmallScreen) {
      topNavMenu.setAttribute('inert', '');
      topNavMenu.style.transition = 'none';

      navigationMenu.addEventListener('click-open-nav-btn', this._handleOpenMobileMenu);
    } else {
      this._onCloseMobileMenu();
      topNavMenu.removeAttribute('inert');

      navigationMenu.addEventListener('click-close-nav-btn', this._handleCloseMobileMenu);
    }
  }

  _onSkipToContentClick(event) {
    event.preventDefault();
    const { main } = this._elements;
    main.focus();
    main.scrollIntoView({ behavior: 'smooth' });
  }

  _onOpenMobileMenu() {
    const { btnOpen, btnClose, topNavMenu, body, navigationMenu } = this._elements;

    btnOpen.setAttribute('aria-expanded', 'true');
    topNavMenu.removeAttribute('style');
    this._setInertState(true, [btnClose, topNavMenu]);
    disableBodyScroll(body);
    btnClose.focus();

    navigationMenu.removeEventListener('click-open-nav-btn', this._handleOpenMobileMenu);

    navigationMenu.addEventListener('click-close-nav-btn', this._handleCloseMobileMenu);
  }

  _onCloseMobileMenu() {
    const { btnOpen, btnClose, topNavMenu, body, navigationMenu } = this._elements;

    btnOpen.setAttribute('aria-expanded', 'false');
    this._setInertState(false, [btnClose, topNavMenu]);
    enableBodyScroll(body);
    btnOpen.focus();

    navigationMenu.removeEventListener('click-close-nav-btn', this._handleCloseMobileMenu);

    navigationMenu.addEventListener('click-open-nav-btn', this._handleOpenMobileMenu);

    setTimeout(() => {
      topNavMenu.style.transition = 'none';
    }, 500);
  }

  _onNavClick() {
    if (this._media.matches) {
      this._onCloseMobileMenu();
    }
  }

  _setInertState(isInert, specificElements = []) {
    const { skipToContent, brandLogo, btnOpen, main } = this._elements;

    const elements = [skipToContent, brandLogo, btnOpen, main];

    if (isInert) {
      specificElements[0].removeAttribute('inert');
      specificElements[1].removeAttribute('inert');
    } else {
      specificElements[0].setAttribute('inert', '');
      specificElements[1].setAttribute('inert', '');
    }
    elements.forEach((el) =>
      isInert ? el.setAttribute('inert', '') : el.removeAttribute('inert'),
    );
  }
}
