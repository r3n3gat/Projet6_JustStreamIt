import { loadBestMovie } from "./modules/bestMovie.js";
import { loadMoviesByGenre } from "./modules/movieByGenre.js";
import { loadGenres, setupGenreChangeListener } from "./modules/genres.js";
import { setupModalListener } from "./modules/modal.js";

// Charge le meilleur film
loadBestMovie();

// Charge les films d'action (avec setupToggle)
loadMoviesByGenre("Action", "selected-category", true);

// Charge les films les mieux notés (avec setupToggle)
loadMoviesByGenre("", "top-rated", true);

// Charge les genres pour le menu déroulant
loadGenres("genre-select");

// Active les écouteurs pour changement de catégorie
toggleGenre();
setupGenreChangeListener("genre-select", "selected-category-title", "selected-category");

// Active les modales
setupModalListener();
