import styles from '../assets/styles/components/restaurant-list-section.styles.scss';
import { emptyContent } from '../utils/emptyContent';

class RestaurantListSection extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
    this.render();
  }

  render() {
    emptyContent(this);

    this._style.textContent = styles;
    this._shadowRoot.appendChild(this._style);

    this._shadowRoot.innerHTML += `
      <section class="restaurant-list">
        <h2 class="restaurant-list__header">Explore Restaurants</h2>
        <div id="restaurantList" class="restaurant-list__container"></div>
      </section>
    `;
  }
}

customElements.define('restaurant-list-section', RestaurantListSection);
