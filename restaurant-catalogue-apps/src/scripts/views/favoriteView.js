class FavoriteView {
  constructor() {
    this._main = document.querySelector('main-component').shadowRoot.querySelector('main');
    this._renderFavoritePage();
  }

  _renderFavoritePage() {
    this._main.innerHTML = '';
    const favoritePageContent = document.createElement('favorite-page');
    this._main.appendChild(favoritePageContent);
  }
}

export default FavoriteView;
