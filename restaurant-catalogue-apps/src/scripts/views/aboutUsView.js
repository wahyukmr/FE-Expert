class AboutUsView {
  constructor() {
    this._main = document.querySelector('main-component').shadowRoot.querySelector('main');
    this._renderAboutUsPage();
  }

  _renderAboutUsPage() {
    this._main.innerHTML = '';
    const aboutUsPageContent = document.createElement('about-page');
    this._main.appendChild(aboutUsPageContent);
  }
}

export default AboutUsView;
