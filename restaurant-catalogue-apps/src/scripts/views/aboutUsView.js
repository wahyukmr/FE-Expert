class AboutUsView {
  constructor() {
    this._main = document.querySelector("main-component").shadowRoot.querySelector("main");
    this._renderFavorite();
  }

  _renderFavorite() {
    this._main.innerHTML = "";
    const notFoundContent = document.createElement("about-section");
    this._main.appendChild(notFoundContent);
  }
}

export default AboutUsView;
