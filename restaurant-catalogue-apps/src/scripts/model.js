import DATA_DUMMY from "../../public/data/DATA.json";

class Model {
  constructor() {
    this._restaurantListData = DATA_DUMMY.restaurants ?? [];
  }

  getAllRestaurants() {
    return this._restaurantListData;
  }

  get restaurantListData() {
    return this._restaurantListData;
  }
}

export default new Model();
