import { DomHandlerNestedSelectors } from '../../utils/DomHandlerNestedSelectors';

export default class RestoBaseView {
  currentIndex = 0;

  constructor(rootContainer) {
    this._rootElements = new DomHandlerNestedSelectors(
      rootContainer.shadowRoot,
      {
        listItemContainer: 'list-restaurant-container >> #listItemContainer',
        detailItemContainer: '#restaurantDetailContainer',
      },
      false,
    ).elements;
    this._currentRootContainer =
      this._rootElements.listItemContainer || this._rootElements.detailItemContainer;

    this._restaurants = [];
    this._batchSize = 2;
    this._observer = this._createIntersectionObserver();
  }

  renderFallback(message) {
    this._clearContainer();
    const messageElement = this._createMessageSection(message);
    this._currentRootContainer.appendChild(messageElement);
  }

  renderLoader() {
    this._clearContainer();
    const loaderElement = this._createLoaderSection();
    this._currentRootContainer.appendChild(loaderElement);
  }

  renderRestaurantItems(restaurants) {
    this._clearContainer();
    this._restaurants = restaurants;

    if (restaurants.length > 0) {
      this._renderBatch();
    } else {
      this.currentIndex = 0;
    }
  }

  renderRestaurantItemDetails(dataRestaurant) {
    this._clearContainer();
    this._dataRestaurant = dataRestaurant;

    const restoItemDetail = this._createRestaurantItem(
      this._dataRestaurant,
      'list-restaurant-item-detail',
    );

    this._rootElements.detailItemContainer.appendChild(restoItemDetail);
  }

  _createIntersectionObserver() {
    return new IntersectionObserver(this._onIntersect.bind(this), {
      root: null,
      threshold: 1.0,
    });
  }

  _onIntersect(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this._observer.unobserve(entry.target);
        entry.target.remove();
        this._renderBatch();
      }
    });
  }

  _renderBatch() {
    const batch = this._restaurants.slice(this.currentIndex, this.currentIndex + this._batchSize);

    batch.forEach((restaurant) => {
      const restoItem = this._createRestaurantItem(restaurant, 'list-restaurant-items');
      this._rootElements.listItemContainer.appendChild(restoItem);
    });

    this.currentIndex += this._batchSize;

    if (this.currentIndex < this._restaurants.length) {
      this._appendSentinel();
    } else {
      this.currentIndex = 0;
    }
  }

  _createRestaurantItem(dataRestaurant, targetElement) {
    const restoItem = document.createElement(targetElement);
    restoItem.dataRestaurant = dataRestaurant;
    return restoItem;
  }

  _appendSentinel() {
    const sentinel = document.createElement('div');
    this._rootElements.listItemContainer.appendChild(sentinel);
    this._observer.observe(sentinel);
  }

  _createMessageSection(message) {
    const messageElement = document.createElement('message-section');
    messageElement.textMessage = message;
    return messageElement;
  }

  _createLoaderSection() {
    return document.createElement('loader-section');
  }

  _clearContainer() {
    this._currentRootContainer.innerHTML = '';
  }
}
