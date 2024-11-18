import notFoundIcon from "../../public/svg/404-page-not-found.svg";
import styles from "../assets/styles/components/not-found-section.styles.scss";
import { emptyContent } from "../utils/emptyContent";

class NotFoundRouteSection extends HTMLElement {
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
      <section class="not-found">
        <img src=${notFoundIcon} class="not-found__img" alt="not found 404 logo on screen"/>
        <p class="not-found__text">The page you are looking for does not exist.</p>
      </section>
    `;
  }
}

customElements.define("not-found-section", NotFoundRouteSection);
