import { emptyContent } from '../utils/emptyContent';

export default class HomePage extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
    this.render();
  }

  render() {
    emptyContent(this);

    this._shadowRoot.innerHTML += `
      <hero-section></hero-section>
      <features-section></features-section>
      <restaurant-list-section></restaurant-list-section>
      <testimonials-section></testimonials-section>
    `;
  }
}
