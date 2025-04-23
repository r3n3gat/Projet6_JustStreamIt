import { loadBestMovie } from './modules/bestMovie.js';
import { loadMoviesByGenre } from './modules/movieByGenre.js';
import { loadGenres } from './modules/genres.js';
import { setupToggleButtons } from './modules/toggle.js';

loadBestMovie();
loadMoviesByGenre("Action", "category-1");
loadGenres();
setupToggleButtons();
