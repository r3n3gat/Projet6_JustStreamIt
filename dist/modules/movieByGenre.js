// movieByGenre.js
import { checkImage } from "./utils.js";
import { API_BASE_URL } from "./config.js";
import { populateModal } from "./modal.js";

/**
 * Charge et affiche des films selon un genre donné.
 * @param {string} genre - Le genre choisi.
 * @param {string} containerId - ID du conteneur HTML où injecter les films.
 */
export async function loadMoviesByGenre(genre, containerId) {
  try {
    const response = await fetch(`${API_BASE_URL}/titles/?genre=${genre}&sort_by=-imdb_score&page_size=6`);
    const data = await response.json();
    const movies = data.results;

    const container = document.getElementById(containerId);
    container.innerHTML = "";

    movies.forEach(async (movie) => {
      const card = document.createElement("div");
      card.classList.add("movie-card");

      // Image du film
      const poster = document.createElement("img");
      const isValid = await checkImage(movie.image_url);
      poster.src = isValid
        ? movie.image_url
        : "https://dummyimage.com/259x252/cccccc/000000&text=Image+indisponible";
      poster.alt = movie.title || "Affiche indisponible";
      poster.classList.add("movie-poster");

      // Overlay avec titre et bouton
      const overlay = document.createElement("div");
      overlay.classList.add("movie-overlay");

      // Titre du film
      const title = document.createElement("p");
      title.classList.add("movie-title");
      title.textContent = movie.title.length > 20 ? movie.title.slice(0, 18) + "…" : movie.title;

      // Bouton "Détail"
      const detailBtn = document.createElement("button");
      detailBtn.classList.add("movie-detail-btn");
      detailBtn.textContent = "Détail";
      detailBtn.dataset.movieId = movie.id;

      // Clic sur le bouton "Détail" ouvre la modale
      detailBtn.addEventListener("click", async (event) => {
        event.stopPropagation(); // éviter d'autres événements accidentels
        try {
          const res = await fetch(`${API_BASE_URL}/titles/${movie.id}`);
          const movieDetails = await res.json();
          await populateModal(movieDetails);

          const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("movieModal"));
          modal.show();
        } catch (error) {
          console.error("Erreur lors de l'ouverture de la modale pour un film :", error);
        }
      });

      // Ajout des éléments dans l'overlay
      overlay.appendChild(title);
      overlay.appendChild(detailBtn);

      // Ajout final de tous les éléments dans la carte
      card.appendChild(poster);
      card.appendChild(overlay);

      // Insertion dans le conteneur principal
      container.appendChild(card);
    });
  } catch (error) {
    console.error(`Erreur lors du chargement des films pour le genre ${genre} :`, error);
  }
}
