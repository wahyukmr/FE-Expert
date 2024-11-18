import { emptyContent } from "../utils/emptyContent";

class MainComponent extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    emptyContent(this);

    this._shadowRoot.innerHTML += `
      <main id="main-content" tabindex="-1"></main>
    `;
  }
}

customElements.define("main-component", MainComponent);
