class NotFoundRouteView {
  constructor() {
    this._main = document.querySelector("main-component").shadowRoot.querySelector("main");
    this._renderNotFound();
  }

  _renderNotFound() {
    this._main.innerHTML = "";
    const notFoundContent = document.createElement("not-found-section");
    this._main.appendChild(notFoundContent);
  }
}

export default NotFoundRouteView;
