import { showErrorNotification } from '../../utils';
import RestoFavoriteModel from '../models/RestoFavoriteModel';
import RestoFavoriteView from '../views/RestoFavoriteView';

export default class RestoFavoriteController {
  constructor(indexedDBService, restoFavoritePage) {
    this._restoFavoriteModel = new RestoFavoriteModel(indexedDBService);
    this._restoFavoriteView = new RestoFavoriteView(restoFavoritePage);
    this.init();
  }

  async init() {
    try {
      this._restoFavoriteView.renderLoader();

      const listFavoriteRestaurants = await this._restoFavoriteModel.getListFavoriteRestaurants();

      if (listFavoriteRestaurants.length > 0) {
        this._restoFavoriteView.renderRestaurantItems(listFavoriteRestaurants);
      } else {
        this._restoFavoriteView.renderFallback('No saved list of favorite restaurants.');
      }
    } catch (error) {
      showErrorNotification(`${error.message}`);
      this._restoFavoriteView.renderFallback('No saved list of favorite restaurants.');
    }
  }
}
