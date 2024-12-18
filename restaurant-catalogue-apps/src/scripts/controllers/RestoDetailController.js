import { delay, showErrorNotification, showSuccessNotification } from '../../utils';
import { DomHandlerNestedSelectors } from '../../utils/DomHandlerNestedSelectors';
import RestoDetailModel from '../models/RestoDetailModel';
import RestoDetailView from '../views/RestoDetailView';

export default class RestoDetailController {
  constructor(indexedDBService, restoDetailPage) {
    this._indexedDBService = indexedDBService;
    this._restoDetailPage = restoDetailPage;

    this._restoDetailModel = new RestoDetailModel();
    this._restoDetailView = new RestoDetailView(this._restoDetailPage);

    this._restoDetailId = this._restoDetailPage.dataset.id;

    this.init(this._restoDetailId);

    this._restoDetailView.bindClickFavoriteButton(this._handleClickFavoriteButton.bind(this));
    this._restoDetailView.bindSubmitReview(this._handleSubmitReview.bind(this));
  }

  async init(restoId) {
    try {
      this._restoDetailView.renderLoader();

      const dataRestaurant = await this._restoDetailModel.getRestaurantByID(restoId);
      const isFavorited = await this._indexedDBService.get(this._restoDetailId);

      if (dataRestaurant) {
        this._restoDetailView.renderRestaurantItemDetails(dataRestaurant);
        this._elements = new DomHandlerNestedSelectors(
          this._restoDetailPage.shadowRoot,
          {
            favoriteBtn:
              '#restaurantDetailContainer >> list-restaurant-item-detail >> #favoriteBtn',
            categories: '#restaurantDetailContainer >> list-restaurant-item-detail >> #categories',
            menus: (root) =>
              root
                .getElementById('restaurantDetailContainer')
                .querySelector('list-restaurant-item-detail')
                .shadowRoot.querySelectorAll('.menu__items'),
            review: '#restaurantDetailContainer >> list-restaurant-item-detail >> #review',
            submitReviewBtn:
              '#restaurantDetailContainer >> list-restaurant-item-detail >> #submitReview',
          },
          true,
        ).elements;

        this._restoDetailView.renderFavoriteButton(this._elements.favoriteBtn, !!isFavorited);
        this._restoDetailView.renderCategories(
          this._elements.categories,
          dataRestaurant.categories,
        );
        this._restoDetailView.renderMenus(this._elements.menus, dataRestaurant.menus);
        this._restoDetailView.renderCustomerReview(
          this._elements.review,
          dataRestaurant.customerReviews,
        );
      } else {
        this._restoDetailView.renderFallback(`Can't find restaurant with id ${restoId}.`);
      }
    } catch (error) {
      showErrorNotification(error.message);
    }
  }

  async _handleClickFavoriteButton(dataResto) {
    try {
      this._elements.favoriteBtn.disabled = true;

      const isFavorited = await this._indexedDBService.get(this._restoDetailId);

      if (isFavorited) {
        await this._indexedDBService.delete(this._restoDetailId);
        showSuccessNotification('Restaurant removed from favorites list');
        await delay(3000);
      } else {
        await this._indexedDBService.put(dataResto);
        showSuccessNotification('Restaurant added to favorites list');
        await delay(3000);
      }

      this._restoDetailView.renderFavoriteButton(this._elements.favoriteBtn, !isFavorited);
    } catch (error) {
      showErrorNotification(error.message);
    } finally {
      this._elements.favoriteBtn.disabled = false;
    }
  }

  async _handleSubmitReview(reviewData) {
    try {
      this._elements.submitReviewBtn.disabled = true;

      const body = { ...reviewData, id: this._restoDetailId };

      const { customerReviews, message } = await this._restoDetailModel.addReviewRestaurant(body);

      this._restoDetailView.renderCustomerReview(this._elements.review, customerReviews);

      if (message == 'success') {
        showSuccessNotification('Successfully added a restaurant review');
        await delay(3000);
      }
    } catch (error) {
      showErrorNotification(error.message);
    } finally {
      this._elements.submitReviewBtn.disabled = false;
    }
  }
}
