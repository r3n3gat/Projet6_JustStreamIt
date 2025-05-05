import { loadBestMovie } from "./modules/bestMovie.js";
import { loadMoviesByGenre } from "./modules/movieByGenre.js";
import { loadGenres, setupGenreChangeListener } from "./modules/genres.js";
import { setupModalListener } from "./modules/modal.js";
import { setupToggleButtons } from "./modules/toggle.js";

// Chargement initial
loadBestMovie();
loadMoviesByGenre("", "top-rated");        // Meilleurs films
loadMoviesByGenre("Action", "selected-category"); // Films d'action
loadGenres("genre-select");
setupGenreChangeListener("genre-select", "selected-category-title", "selected-category");
setupToggleButtons();
setupModalListener();
