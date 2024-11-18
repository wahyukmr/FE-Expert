import styles from "../assets/styles/components/loader-section.styles.scss";
import { emptyContent } from "../utils/emptyContent";

class LoaderSection extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    this.render();
  }

  render() {
    emptyContent(this);

    this._style.textContent = styles;
    this._shadowRoot.appendChild(this._style);

    this._shadowRoot.innerHTML += `
      <div class="custom-loader"></div>
    `;
  }
}

customElements.define("loader-section", LoaderSection);
