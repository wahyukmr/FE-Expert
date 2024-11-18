class HomeView {
  constructor() {
    this._main = document.querySelector("main-component").shadowRoot.querySelector("main");
  }

  renderLoading() {
    const loadingElement = document.createElement("loader-section");
    this._main.appendChild(loadingElement);
  }

  removeLoading() {
    const loadingElement = this._main.querySelector("loader-section");
    loadingElement.remove();
  }

  renderMessage(message) {
    this._main.innerHTML = "";
    const messageElement = document.createElement("message-section");
    messageElement.textMessage = message;
    this._main.appendChild(messageElement);
  }

  renderRestaurant(restaurants) {
    const restoListElement = this._main.querySelector("restaurant-list-section");
    const restaurantList = restoListElement.shadowRoot.querySelector("#restaurantList");

    if (restaurantList) {
      const restoItemElements = restaurants.map((restaurant) => {
        const restoItem = document.createElement("restaurant-item");
        restoItem.dataRestaurant = restaurant;
        return restoItem;
      });

      restaurantList.innerHTML = "";
      restaurantList.append(...restoItemElements);
    }
  }

  heroCtaClickBtnHandler() {
    const restoListElement = this._main.querySelector("restaurant-list-section");
    this._heroSection = this._main.querySelector("hero-section");

    this._heroSection.addEventListener("heroCtaBtnClick", () => {
      if (restoListElement) {
        restoListElement.focus();
        restoListElement.scrollIntoView({ behavior: "smooth" });
      } else {
        this.renderMessage("data is not available");
      }
    });
  }
}

export default new HomeView();
