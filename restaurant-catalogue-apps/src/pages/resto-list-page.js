import styles from '../assets/styles/components/favorite-page.styles.scss';
import { emptyContent } from '../utils/emptyContent';

export default class RestoListPage extends HTMLElement {
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
      <section class="favorite-section">
        <div class="favorite-section__container">
          <h1 class="favorite-section__heading">List Restaurants</h1>
          <p class="favorite-section__text">This feature will be implemented in future submissions.</p>
        </div>
      </section>
    `;
  }
}
