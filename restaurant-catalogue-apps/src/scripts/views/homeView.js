class HomeView {
  constructor() {
    this._main = document.querySelector('main-component').shadowRoot.querySelector('main');
  }

  renderHomePage() {
    this._main.innerHTML = '';
    const homePageContent = document.createElement('home-page');
    this._main.appendChild(homePageContent);
  }

  renderLoading() {
    const { restoListId } = this._restaurantListSelector();

    restoListId.innerHTML = '';
    const loadingElement = document.createElement('loader-section');
    restoListId.appendChild(loadingElement);
  }

  renderMessage(message) {
    const { restoListId } = this._restaurantListSelector();

    restoListId.innerHTML = '';
    const messageElement = document.createElement('message-section');
    messageElement.textMessage = message;
    restoListId.appendChild(messageElement);
  }

  renderRestaurant(restaurants) {
    const { restoListId } = this._restaurantListSelector();

    const restoItemElements = restaurants.map((restaurant) => {
      const restoItem = document.createElement('restaurant-item');
      restoItem.dataRestaurant = restaurant;
      return restoItem;
    });

    restoListId.innerHTML = '';
    restoListId.append(...restoItemElements);
  }

  heroCtaClickBtnHandler() {
    const { heroSection, restoListSection } = this._restaurantListSelector();

    heroSection.addEventListener('heroCtaBtnClick', () => {
      if (restoListSection) {
        restoListSection.focus();
        restoListSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        this.renderMessage('data is not available');
      }
    });
  }

  _restaurantListSelector() {
    const home = this._main.querySelector('home-page');
    const restoListSection = home.shadowRoot.querySelector('restaurant-list-section');
    const restoListId = restoListSection.shadowRoot.querySelector('#restaurantList');
    const heroSection = home.shadowRoot.querySelector('hero-section');

    return { restoListSection, restoListId, heroSection };
  }
}

export default new HomeView();
