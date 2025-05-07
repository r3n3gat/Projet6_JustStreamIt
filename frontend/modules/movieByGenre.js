import { createMovieCard } from '../js/utils.js';
import { fetchMoviesByCategory, fetchMovieDetails } from '../js/api.js';
import { openModal } from './modal.js';

/**
 * Charge et affiche des films selon un genre donné.
 * @param {string} genre - Le genre choisi.
 * @param {string} containerId - ID du conteneur HTML où injecter les films.
 */
export async function loadMoviesByGenre(genre, containerId) {
  try {
    const movies = await fetchMoviesByCategory(genre);
    const container = document.getElementById(containerId);

    if (!container) {
      console.error(`Erreur : conteneur avec l'id ${containerId} introuvable.`);
      return;
    }

    container.innerHTML = ""; // Nettoyer avant d'ajouter

    for (const movie of movies.slice(0, 6)) { // Afficher seulement les 6 premiers films
      const card = await createMovieCard(movie, async (movieId) => {
  try {
    const movieDetails = await fetchMovieDetails(movieId);
    if (movieDetails) {
      openModal(movieDetails);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des détails du film :", error);
  }
});

      container.appendChild(card);
    }

  } catch (error) {
    console.error(`Erreur lors du chargement des films pour le genre ${genre} :`, error);
  }
}
