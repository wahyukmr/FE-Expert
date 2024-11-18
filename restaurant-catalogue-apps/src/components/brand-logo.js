import brandLogo from "../../public/svg/logo-no-background.svg";
import styles from "../assets/styles/components/brand-logo.styles.scss";
import { emptyContent } from "../utils/emptyContent";

class BrandLogo extends HTMLElement {
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
      <a href="#/" class="brand-logo" aria-label="Home">
        <img src=${brandLogo} class="brand-logo__img" alt="brand logo on screen"/>
      </a>
    `;
  }
}

customElements.define("brand-logo", BrandLogo);
