import Router from "../router";
import NavigationView from "../views/navigationView";

export default class AppController {
  constructor() {
    new NavigationView();
    new Router(
      async () => {
        const { default: HomeController } = await import("./homeController.js");
        return new HomeController();
      },
      async () => {
        const { default: FavoriteController } = await import("../views/favoriteView.js");
        return new FavoriteController();
      },
      async () => {
        const { default: AboutUsView } = await import("../views/aboutUsView.js");
        return new AboutUsView();
      },
      async () => {
        const { default: NotFoundRouteView } = await import("../views/notFoundRouteView.js");
        return new NotFoundRouteView();
      }
    );
  }
}
