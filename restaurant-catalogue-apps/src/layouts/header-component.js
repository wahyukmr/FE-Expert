import styles from '../assets/styles/components/header-component.styles.scss';
import { emptyContent } from '../utils/emptyContent';

class HeaderComponent extends HTMLElement {
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
      <header class="header">
        <slot></slot>
      </header>
    `;
  }
}

customElements.define('header-component', HeaderComponent);
