import styles from '../assets/styles/components/restaurant-item.styles.scss';
import { emptyContent } from '../utils/emptyContent';

class RestaurantItem extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
    this._dataRestaurant = {};
    this.render();
  }

  set dataRestaurant(data) {
    this._dataRestaurant = data;
    this.render();
  }

  get dataRestaurant() {
    return this._dataRestaurant;
  }

  render() {
    emptyContent(this);

    const { id, name, description, pictureId, city, rating } = this._dataRestaurant;

    this._style.textContent = styles;
    this._shadowRoot.appendChild(this._style);

    const container = document.createElement('div');
    container.classList.add('restaurant-item');

    const imgElement = document.createElement('div');
    imgElement.classList.add('restaurant-item__image');
    imgElement.setAttribute('aria-label', `${name} restaurant image`);
    imgElement.style.backgroundImage = `url(${pictureId})`;

    container.innerHTML += `
      <div class="restaurant-item__content">
        <div class="restaurant-item__location">
          <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff">
            <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/>
          </svg>
          <span class="restaurant-item__city">${city}</span>
        </div>
        <h3 class="restaurant-item__header">${name}</h3>
        <p class="restaurant-item__description">${description}</p>
        <span class="restaurant-item__rating">${rating}</span>
      </div>
    `;
    container.prepend(imgElement);
    this._shadowRoot.appendChild(container);
  }
}

customElements.define('restaurant-item', RestaurantItem);
