import RestoBaseView from './RestoBaseView';

export default class RestoFavoriteView extends RestoBaseView {
  constructor(rootContainer) {
    super(rootContainer);
    this._restoListPage = rootContainer;
  }
}
