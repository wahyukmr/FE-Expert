import styles from '../assets/styles/components/list-restaurant-container.styles.scss';
import { emptyContent } from '../utils/emptyContent';

class ListRestaurantContainer extends HTMLElement {
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
      <div id="listItemContainer" class="list-item__container"></div>
    `;
  }
}

customElements.define('list-restaurant-container', ListRestaurantContainer);
