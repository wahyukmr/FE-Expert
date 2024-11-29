import heroImage1031 from '../assets/images/hero-image,w_1031.jpg';
import heroImage1248 from '../assets/images/hero-image,w_1248.jpg';
import heroImage1400 from '../assets/images/hero-image,w_1400.jpg';
import heroImage200 from '../assets/images/hero-image,w_200.jpg';
import heroImage555 from '../assets/images/hero-image,w_555.jpg';
import heroImage815 from '../assets/images/hero-image,w_815.jpg';
import styles from '../assets/styles/components/hero-section.styles.scss';
import { emptyContent } from '../utils/emptyContent';

class HeroSection extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
    this.render();
  }

  connectedCallback() {
    this._shadowRoot
      .querySelector('#heroCtaBtn')
      .addEventListener('click', this._onCtaButtonClick.bind(this));
  }

  disconnectedCallback() {
    this._shadowRoot
      .querySelector('#heroCtaBtn')
      .removeEventListener('click', this._onCtaButtonClick.bind(this));
  }

  _onCtaButtonClick() {
    this.dispatchEvent(new CustomEvent('heroCtaBtnClick'));
  }

  render() {
    emptyContent(this);

    this._style.textContent = styles;
    this._shadowRoot.appendChild(this._style);

    this._shadowRoot.innerHTML += `
      <section class="hero">
        <picture class="hero__image-container">
          <source
            type="image/webp"
            srcset="
              ${heroImage200}?as=webp 200w,
              ${heroImage555}?as=webp 555w,
              ${heroImage815}?as=webp 815w,
              ${heroImage1031}?as=webp 1031w,
              ${heroImage1248}?as=webp 1248w,
              ${heroImage1400}?as=webp 1400w"
            sizes="(max-width: 1400px) 100vw, 1400px">
          <source
            type="image/jpeg"
            srcset="
              ${heroImage200} 200w,
              ${heroImage555} 555w,
              ${heroImage815} 815w,
              ${heroImage1031} 1031w,
              ${heroImage1248} 1248w,
              ${heroImage1400} 1400w"
            sizes="(max-width: 1400px) 100vw, 1400px">
          <img class="hero__image" src="${heroImage1400}" alt="Top view of a dark surface with a bowl containing four cookies, surrounded by yellow flowers, scattered crumbs, and slices of lemon">
        </picture>
        
        <div class="hero__content">
          <h1 class="hero__heading">
            Discover <span class="hero__heading--highlight">Exceptional Culinary Experiences</span> Curated Just for You
          </h1>
          <p class="hero__description">Discover unique flavors and exclusive dining spots curated just for you, all at your fingertips. Find the perfect restaurant for every occasion.</p>
          <button role="button" id="heroCtaBtn" class="hero__cta-button">Explore Now</button>
        </div>
      </section>
    `;
  }
}

customElements.define('hero-section', HeroSection);
