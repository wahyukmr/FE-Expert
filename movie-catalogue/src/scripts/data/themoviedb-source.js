import { API_ENPOINTS } from '../global/api-enpoints';

class TheMovieDbSource {
  static async nowPlayingMovies() {
    const response = await fetch(API_ENPOINTS.NOW_PLAYING);
    const responseJson = await response.json();
    return responseJson.results;
  }

  static async upcomingMovies() {
    const response = await fetch(API_ENPOINTS.UPCOMING);
    const responseJson = await response.json();
    return responseJson.results;
  }

  static async detailMovie(id) {
    const response = await fetch(API_ENPOINTS.DETAIL(id));
    return response.json();
  }
}

export default TheMovieDbSource;
