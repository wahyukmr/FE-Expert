import styles from "../assets/styles/components/testimonial-section.styles.scss";
import { emptyContent } from "../utils/emptyContent";

class TestimonialSection extends HTMLElement {
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
      <section class="testimonials">
        <div class="testimonials__container">
          <h2 class="testimonials__header">What people say</h2>
          <p class="testimonials__description">
            Discover what our guests have to say about their dining experiences at our featured restaurants.
          </p>
          <div class="testimonial">
            <article class="testimonial__card">
              <p class="testimonial__text">
                "The variety and quality of restaurants on this platform are outstanding! I always find new gems that exceed my expectations every time."
              </p>
              <div class="testimonial__profile">
                <img src="../../public/images/maria-lopez.jpg" alt="Profile picture of Maria Lopez" class="testimonial__avatar" />
                <div>
                  <h3 class="testimonial__name">Maria Lopez</h3>
                  <p class="testimonial__role">Food Blogger</p>
                </div>
              </div>
            </article>
            <article class="testimonial__card">
              <p class="testimonial__text">
                "Thanks to this catalog, I discovered my new favorite spot. The user-friendly layout and detailed reviews made choosing a restaurant effortless!"
              </p>
              <div class="testimonial__profile">
                <img src="../../public/images/james-brown.jpg" alt="Profile picture of James Brown" class="testimonial__avatar" />
                <div>
                  <h3 class="testimonial__name">James Brown</h3>
                  <p class="testimonial__role">Frequent Diner</p>
                </div>
              </div>
            </article>
            <article class="testimonial__card">
              <p class="testimonial__text">
                "As a chef, I appreciate the exposure this platform provides. It’s a fantastic way for food enthusiasts to discover our culinary offerings."
              </p>
              <div class="testimonial__profile">
                <img src="../../public/images/lisa-chen.jpg" alt="Profile picture of Lisa Chen" class="testimonial__avatar" />
                <div>
                  <h3 class="testimonial__name">Lisa Chen</h3>
                  <p class="testimonial__role">Chef</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("testimonial-section", TestimonialSection);
