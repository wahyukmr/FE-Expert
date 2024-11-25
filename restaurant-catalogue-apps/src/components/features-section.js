import styles from '../assets/styles/components/features-section.styles.scss';
import { emptyContent } from '../utils/emptyContent';
import favorite from '../assets/svg/favorite.svg';
import search from '../assets/svg/search.svg';
import upToDate from '../assets/svg/up_to_date.svg';
import feedback from '../assets/svg/feedback.svg';

class FeaturesSection extends HTMLElement {
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
      <section class="features">
        <div class="features__container">
          <div class="feature">
            <div class="feature__illustration">
              <img src=${search} alt="Search & Filter">
            </div>
            <div class="feature__content">
              <h2>Search & Filter</h2>
              <div class="feature__text">
                <p class="feature__text-firstLine">
                  Discover the best dining spots in seconds. 
                  Our advanced search lets you filter by name, category and menu. 
                  Whether it's 'outdoor cafes' or 'vegan restaurants,' find exactly what you're looking for with ease. 
                </p>
                <p>
                  With smart filtering technology, results are accurate and tailored to your needs—making every dining choice a confident one.
                </p>
              </div>
            </div>
            
            <div class="feature__content">
              <h2>Favorite Your Choices</h2>
              <div class="feature__text">
                <p class="feature__text-firstLine">
                  Save and revisit your favorite restaurants effortlessly. 
                  Keep all your top picks in one convenient list for quick access. 
                  Whether it’s your go-to brunch spot or a must-try dinner venue, your favorites are just a click away. 
                </p>
                <p>
                  This feature is designed for maximum convenience, ensuring a seamless dining experience every time.
                </p>
              </div>
            </div>
            <div class="feature__illustration">
              <img src=${favorite} alt="Favorite Your Choices">
            </div>
            
            <div class="feature__illustration">
              <img src=${upToDate} alt="Up-to-Date Information">
            </div>
            <div class="feature__content">
              <h2>Up-to-Date Information</h2>
              <div class="feature__text">
                <p class="feature__text-firstLine">
                  Stay informed with the latest updates on restaurants. 
                  From trending spots to seasonal menus and exclusive deals, our platform keeps you ahead of the curve. 
                </p>
                <p>
                  Partnering directly with restaurants, we ensure accurate and reliable information so you can plan your visits with confidence.
                </p>
              </div>
            </div>
            
            <div class="feature__content">
              <h2>Submit Restaurant Reviews</h2>
              <div class="feature__text">
                <p>
                  Users can easily leave reviews for restaurants they've visited, sharing their experiences and helping others make better choices.
                </p>
              </div>
            </div>
            <div class="feature__illustration">
              <img src=${feedback} alt="Favorite Your Choices">
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('features-section', FeaturesSection);
