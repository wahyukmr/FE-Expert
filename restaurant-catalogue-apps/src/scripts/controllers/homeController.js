import model from "../model";
import homeView from "../views/homeView";

export default class HomeController {
  constructor() {
    this._main = document.querySelector("main-component").shadowRoot.querySelector("main");

    this._controlHomeMainContent();
  }

  async _controlHomeMainContent() {
    this._main.innerHTML = "";

    await import("../../components/hero-section.js");
    const heroSection = document.createElement("hero-section");
    this._main.appendChild(heroSection);

    try {
      homeView.renderLoading();

      model.getAllRestaurants();
      const dataResto = model.restaurantListData;

      await import("../../components/restaurant-list-section.js");
      const restaurantListSection = document.createElement("restaurant-list-section");

      homeView.removeLoading();

      if (dataResto.length > 0) {
        this._main.appendChild(restaurantListSection);
        homeView.renderRestaurant(dataResto);
      } else {
        console.log("kontroller" + dataResto);
        homeView.renderMessage("No Restaurant list found");
      }
    } catch (error) {
      console.log(error);
      homeView.renderMessage(error);
    }

    homeView.heroCtaClickBtnHandler();

    await import("../../components/testimonial-section.js");
    const testimonialSection = document.createElement("testimonial-section");
    this._main.appendChild(testimonialSection);
  }
}
