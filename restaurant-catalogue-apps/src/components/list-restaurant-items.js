import styles from '../assets/styles/components/list-restaurant-items.styles.scss';
import { RESTO_IMG_LARGE, RESTO_IMG_MEDIUM, RESTO_IMG_SMALL } from '../config/constants';
import { lazysizesForShadowDom } from '../utils';
import { emptyContent } from '../utils/emptyContent';

class ListRestaurantItems extends HTMLElement {
  _dataRestaurant = {};

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
    this.render();
  }

  set dataRestaurant(data) {
    this._dataRestaurant = data;
    this.render();
  }

  get dataRestaurant() {
    return this._dataRestaurant;
  }

  connectedCallback() {
    lazysizesForShadowDom(this._shadowRoot, '.restaurant-item__picture');
  }

  render() {
    emptyContent(this);

    const { id, name, description, pictureId, city, rating, favorited } = this.dataRestaurant;

    this._style.textContent = styles;
    this._shadowRoot.appendChild(this._style);

    this._shadowRoot.innerHTML += `
      <div class="restaurant-item">
        <picture class="restaurant-item__picture">
          <div class="skeleton"></div>
          <source
            type="image/jpeg"
            data-srcset="${RESTO_IMG_SMALL}/${pictureId} 405w, 
                 ${RESTO_IMG_MEDIUM}/${pictureId} 810w, 
                 ${RESTO_IMG_LARGE}/${pictureId} 1215w"
            data-sizes="auto">
          <img
            data-src="${RESTO_IMG_MEDIUM}/${pictureId}" alt="${name} restaurant"
            loading="lazy"
            width="auto"
            height="auto"
            class="restaurant-item__image lazyload">
        </picture>
        
        <div class="restaurant-item__content">
          <div class="restaurant-item__location">
            <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="24px" width="24px" fill="#ffffff">
              <circle cx="256" cy="192" r="32" />
              <path d="M256 32c-88.22 0-160 68.65-160 153 0 40.17 18.31 93.59 54.42 158.78 29 52.34 62.55 99.67 80 123.22a31.75 31.75 0 0051.22 0c17.42-23.55 51-70.88 80-123.22C397.69 278.61 416 225.19 416 185c0-84.35-71.78-153-160-153zm0 224a64 64 0 1164-64 64.07 64.07 0 01-64 64z"/>
            </svg>
            <span class="restaurant-item__city">${city}</span>
          </div>
          <h3 class="restaurant-item__header">${name}</h3>
          <p class="restaurant-item__description">${description}</p>
          <span class="restaurant-item__rating">${rating}</span>
          <div class="restaurant-item__actions">
            ${this._renderFavoriteIcon(favorited)}
            <a href="#/resto-list/detail/${id}" class="actions__cta-anchor">
              <span class="actions__cta-text">View Details</span>
              <svg aria-hidden="true" focusable="false" role="img" class="actions__cta-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  _renderFavoriteIcon(favorited) {
    return favorited
      ? `
      <div id="favoriteBtn" class="restaurant-item__actions-favorite">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" role="img" height="100%">
          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
        </svg>
      </div>`
      : '';
  }
}

customElements.define('list-restaurant-items', ListRestaurantItems);
