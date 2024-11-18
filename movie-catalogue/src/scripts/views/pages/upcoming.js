import TheMovieDbSource from '../../data/themoviedb-source';
import { createMovieItemTemplate } from '../templates/template-creator';

const Upcoming = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Upcoming in Cinema</h2>
        <div id="movies" class="movies">
        </div>
      </div>
    `;
  },

  async afterRender() {
    const movies = await TheMovieDbSource.upcomingMovies();
    const movieElement = document.querySelector('#movies');
    if (movieElement) {
      movies.forEach((movie) => {
        movieElement.innerHTML += createMovieItemTemplate(movie);
      });
    }
  },
};

export default Upcoming;
