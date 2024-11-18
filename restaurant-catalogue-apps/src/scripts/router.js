export default class Router {
  constructor(homeController, favoriteController, aboutUsController, noteFoundPage) {
    this._loadHomeMainContent = homeController;
    this._loadFavoriteMainContent = favoriteController;
    this._loadAboutUsMainContent = aboutUsController;
    this._loadNotFoundPage = noteFoundPage;

    window.addEventListener("hashchange", this._handleHashChange.bind(this));
    window.addEventListener("load", this._handleHashChange.bind(this));
  }

  async _handleHashChange() {
    const path = window.location.hash.slice(1) || "/";
    switch (path) {
      case "/":
        await this._loadHomeMainContent();
        break;
      case "/favorite":
        await this._loadFavoriteMainContent();
        break;
      case "/about":
        await this._loadAboutUsMainContent();
        break;
      default:
        await this._loadNotFoundPage();
    }
  }
}
