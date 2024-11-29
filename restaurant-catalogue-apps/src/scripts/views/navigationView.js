import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock-upgrade';

class NavigationView {
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
      btnOpen: navigationMenuElement.shadowRoot.querySelector('#btnOpen'),
      btnClose: navigationMenuElement.shadowRoot.querySelector('#btnClose'),
      topNavMenu: navigationMenuElement.shadowRoot.querySelector('.topnav__menu'),
    };
    this._media = window.matchMedia(this._smallBreakpoint);
  }

  initialize() {
    this._updateTopNavMenuState(this._media.matches);
    this._addEventListeners();
  }

  _addEventListeners() {
    const { header, skipToContent, navigationMenu } = this._elements;

    window.addEventListener('scroll', () => this._toggleHeaderScrolledState(header));
    skipToContent.addEventListener('click', (e) => this._handleSkipToContentClick(e));
    this._media.addEventListener('change', (e) => this._updateTopNavMenuState(e.matches));
    navigationMenu.addEventListener('btn-open-menu-click', this._openMobileMenu.bind(this));
    navigationMenu.addEventListener('btn-close-menu-click', this._closeMobileMenu.bind(this));
    navigationMenu.addEventListener('nav-click', this._handleNavClick.bind(this));
  }

  _toggleHeaderScrolledState(headerElement) {
    headerElement.classList.toggle('scrolled', window.scrollY > 0);
  }

  _handleSkipToContentClick(event) {
    event.preventDefault();
    const { main } = this._elements;
    main.focus();
    main.scrollIntoView({ behavior: 'smooth' });
  }

  _updateTopNavMenuState(isSmallScreen) {
    const { topNavMenu } = this._elements;

    if (isSmallScreen) {
      topNavMenu.setAttribute('inert', '');
      topNavMenu.style.transition = 'none';
    } else {
      this._closeMobileMenu();
      topNavMenu.removeAttribute('inert');
    }
  }

  _openMobileMenu() {
    const { btnOpen, btnClose, topNavMenu, body } = this._elements;

    btnOpen.setAttribute('aria-expanded', 'true');
    topNavMenu.removeAttribute('style');
    this._setInertState(true, [btnClose, topNavMenu]);
    btnClose.focus();
    disableBodyScroll(body);
  }

  _closeMobileMenu() {
    const { btnOpen, btnClose, topNavMenu, body } = this._elements;

    btnOpen.setAttribute('aria-expanded', 'false');
    this._setInertState(false, [btnClose, topNavMenu]);
    btnOpen.focus();
    enableBodyScroll(body);

    setTimeout(() => {
      topNavMenu.style.transition = 'none';
    }, 500);
  }

  _handleNavClick() {
    if (this._media.matches) {
      this._closeMobileMenu();
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

export default NavigationView;
