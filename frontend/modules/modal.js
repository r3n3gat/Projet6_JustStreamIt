// /js/modal.js

import { checkImage } from "../js/utils.js";
import { fetchMovieDetails } from "../js/api.js";

/**
 * Remplit la modale avec les infos d'un film.
 * @param {Object} movie - Détails du film
 */
export async function populateModal(movie) {
  const modalImg = document.getElementById("modal-img");
  const modalImgDesktop = document.getElementById("modal-img-desktop");
  const modalTitle = document.getElementById("modal-title");
  const modalYear = document.getElementById("modal-year");
  const modalGenre = document.getElementById("modal-genre");
  const modalScore = document.getElementById("modal-score");
  const modalDirectors = document.getElementById("modal-directors-name");
  const modalDesc = document.getElementById("modal-desc");
  const modalActors = document.getElementById("modal-actors-name");

  if (!modalImg || !modalImgDesktop || !modalTitle || !modalYear || !modalGenre || !modalScore || !modalDirectors || !modalDesc || !modalActors) {
    console.error("Erreur : éléments DOM pour la modale introuvables.");
    return;
  }

  const isValid = await checkImage(movie.image_url);
  const imageUrl = isValid ? movie.image_url : "https://dummyimage.com/227x334/cccccc/000000&text=Image+indisponible";

  modalImg.src = imageUrl;
  modalImg.alt = movie.title || "Image indisponible";
  modalImgDesktop.src = imageUrl;
  modalImgDesktop.alt = movie.title || "Image indisponible";

  modalTitle.textContent = movie.title || "Titre inconnu";
  modalYear.innerHTML = `<strong>Année :</strong> ${movie.year || "N.C."}`;
  modalGenre.innerHTML = `<strong>Genre :</strong> ${movie.genres?.join(", ") || "N.C."}`;
  modalScore.innerHTML = `<strong>Note IMDb :</strong> ${movie.imdb_score || "N.C."}`;
  modalDirectors.textContent = movie.directors?.join(", ") || "Réalisateur inconnu";
  modalDesc.textContent = movie.description || "Pas de description disponible.";
  modalActors.textContent = movie.actors?.join(", ") || "Acteurs inconnus";
}

/**
 * Fonction pour ouvrir la modale Bootstrap avec un film donné
 * @param {Object} movie - Détails du film
 */
export async function openModal(movie) {
  await populateModal(movie);

  const modalElement = document.getElementById("movieModal");
  if (!modalElement) {
    console.error("Erreur : élément #movieModal non trouvé.");
    return;
  }

  const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
  modalInstance.show();
}

/**
 * Écouteur global au cas où (backup click listener)
 */
export function setupModalListener() {
  document.body.addEventListener("click", async (event) => {
    const target = event.target;
    const movieId = target.dataset.movieId;

    if (!movieId) return;

    try {
      const movie = await fetchMovieDetails(movieId);
      if (movie) {
        openModal(movie);
      }
    } catch (error) {
      console.error("Erreur lors de l'ouverture de la modale :", error);
    }
  });
}
