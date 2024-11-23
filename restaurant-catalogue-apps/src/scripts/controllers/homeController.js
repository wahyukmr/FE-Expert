import model from '../model';
import homeView from '../views/homeView';

export default class HomeController {
  constructor() {
    this._main = document.querySelector('main-component').shadowRoot.querySelector('main');
    homeView.renderHomePage();
    this._controlHomeMainContent();
  }

  async _controlHomeMainContent() {
    try {
      homeView.renderLoading();
      model.getAllRestaurants();
      const dataResto = model.restaurantListData;

      dataResto.length > 0
        ? homeView.renderRestaurant(dataResto)
        : homeView.renderMessage('No Restaurant list found');
    } catch (error) {
      homeView.renderMessage(error);
    }
    homeView.heroCtaClickBtnHandler();
  }
}
