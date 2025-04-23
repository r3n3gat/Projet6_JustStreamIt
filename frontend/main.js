import { loadBestMovie } from './modules/bestMovie.js';
import { loadMoviesByGenre } from './modules/movieByGenre.js';
import { loadGenres } from './modules/genreList.js';

console.log("✅ JustStreamIt - JS chargé");

loadBestMovie();
loadMoviesByGenre("Action", "category-1");
loadGenres();
