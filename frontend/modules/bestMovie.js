import { checkImage } from '../js/utils.js';
import { fetchBestMovies, fetchMovieDetails } from '../js/api.js';
import { openModal } from './modal.js';

/**
 * Charge et affiche le meilleur film dans la bannière principale.
 */
export async function loadBestMovie() {
  try {
    const bestMovies = await fetchBestMovies();
    const best = bestMovies[0];

    if (!best) {
      console.warn("Aucun film trouvé pour la section Meilleur Film.");
      return;
    }

    // Récupération des détails complets
    const fullDetails = await fetchMovieDetails(best.id);
    if (!fullDetails) {
      console.error("Erreur lors de la récupération des détails du meilleur film.");
      return;
    }

    // Remplir la bannière principale
    const bestImg = document.getElementById("best-img");
    const bestTitle = document.getElementById("best-title");
    const bestDesc = document.getElementById("best-desc");
    const detailBtn = document.getElementById("best-detail-btn");

    if (!bestImg || !bestTitle || !bestDesc || !detailBtn) {
      console.error("Erreur : certains éléments DOM pour la bannière sont manquants.");
      return;
    }

    const isValid = await checkImage(best.image_url);
    bestImg.src = isValid ? best.image_url : "https://dummyimage.com/227x334/cccccc/000000&text=Image+indisponible";
    bestImg.alt = best.title || "Image indisponible";

    bestTitle.textContent = best.title.length > 50 ? best.title.slice(0, 48) + "…" : best.title;
    bestDesc.textContent = fullDetails.description || "Pas de description disponible.";

    // Gestion du bouton Détail
    detailBtn.addEventListener("click", async () => {
      try {
        const movieDetails = await fetchMovieDetails(best.id);
        if (movieDetails) {
          openModal(movieDetails);
        }
      } catch (error) {
        console.error("Erreur lors de l'ouverture de la modale du meilleur film :", error);
      }
    });

  } catch (error) {
    console.error("Erreur lors du chargement du meilleur film :", error);
  }
}
