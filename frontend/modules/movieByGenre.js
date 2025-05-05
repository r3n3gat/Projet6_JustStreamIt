import { checkImage } from '../js/utils.js';
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
      const card = document.createElement("div");
      card.classList.add("movie-card");

      const poster = document.createElement("img");
      const isValid = await checkImage(movie.image_url);
      poster.src = isValid ? movie.image_url : "https://dummyimage.com/259x252/cccccc/000000&text=Image+indisponible";
      poster.alt = movie.title || "Affiche indisponible";
      poster.classList.add("movie-poster");

      const overlay = document.createElement("div");
      overlay.classList.add("movie-overlay");

      const title = document.createElement("p");
      title.classList.add("movie-title");
      title.textContent = movie.title.length > 20 ? movie.title.slice(0, 18) + "…" : movie.title;

      const detailBtn = document.createElement("button");
      detailBtn.classList.add("movie-detail-btn");
      detailBtn.textContent = "Détail";
      detailBtn.addEventListener("click", async (event) => {
        event.stopPropagation();
        try {
          const movieDetails = await fetchMovieDetails(movie.id);
          if (movieDetails) {
            openModal(movieDetails);
          }
        } catch (error) {
          console.error("Erreur lors de l'ouverture de la modale pour un film :", error);
        }
      });

      overlay.appendChild(title);
      overlay.appendChild(detailBtn);

      card.appendChild(poster);
      card.appendChild(overlay);

      container.appendChild(card);
    }

  } catch (error) {
    console.error(`Erreur lors du chargement des films pour le genre ${genre} :`, error);
  }
}
