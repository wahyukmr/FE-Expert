import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock-upgrade";

class NavigationView {
  constructor() {
    this.navigationMenu = document.querySelector("navigation-menu");
    this.mainComponent = document.querySelector("main-component");
    this.skipToContent = document.querySelector(".skip-to-content");
    this.brandLogo = document.querySelector("brand-logo");
    this.btnOpen = this.navigationMenu.shadowRoot.querySelector("#btnOpen");
    this.btnClose = this.navigationMenu.shadowRoot.querySelector("#btnClose");
    this.topNavMenu = this.navigationMenu.shadowRoot.querySelector(".topnav__menu");
    this.media = window.matchMedia("(width <= 37.4988em)");
    this.body = document.querySelector("body");

    this._setupTopNav(this.media);

    this.navigationMenu.addEventListener("open-menu", this._openMobileMenu.bind(this));
    this.navigationMenu.addEventListener("close-menu", this._closeMobileMenu.bind(this));
    this.navigationMenu.addEventListener("nav-click", this._navClickHandler.bind(this));
    this.media.addEventListener("change", (e) => this._setupTopNav(e));
  }

  _openMobileMenu() {
    this.btnOpen.setAttribute("aria-expanded", "true");
    this.topNavMenu.removeAttribute("inert");
    this.topNavMenu.removeAttribute("style");
    this.skipToContent.setAttribute("inert", "");
    this.brandLogo.setAttribute("inert", "");
    this.btnOpen.setAttribute("inert", "");
    this.btnClose.removeAttribute("inert");
    this.mainComponent.setAttribute("inert", "");
    disableBodyScroll(this.body);
    this.btnClose.focus();
  }

  _closeMobileMenu() {
    this.btnOpen.setAttribute("aria-expanded", "false");
    this.topNavMenu.setAttribute("inert", "");
    this.skipToContent.removeAttribute("inert");
    this.brandLogo.removeAttribute("inert");
    this.btnOpen.removeAttribute("inert", "");
    this.btnClose.removeAttribute("inert");
    this.mainComponent.removeAttribute("inert");
    enableBodyScroll(this.body);
    this.btnOpen.focus();

    setTimeout(() => {
      this.topNavMenu.style.transition = "none";
    }, 500);
  }

  _navClickHandler() {
    if (this.media.matches) {
      this._closeMobileMenu();
    }
  }

  _setupTopNav(e) {
    if (e.matches) {
      this.topNavMenu.setAttribute("inert", "");
      this.topNavMenu.style.transition = "none";
    } else {
      this._closeMobileMenu();
      this.topNavMenu.removeAttribute("inert");
    }
  }
}

export default NavigationView;
