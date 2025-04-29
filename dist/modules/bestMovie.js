import { checkImage } from "./utils.js";
import { API_BASE_URL } from "./config.js";
import { populateModal } from "./modal.js";

/**
 * Charge et affiche le film le mieux noté dans la bannière principale.
 */
export async function loadBestMovie() {
  try {
    // 1. Récupération du meilleur film
    const response = await fetch(`${API_BASE_URL}/titles/?sort_by=-imdb_score&page_size=1`);
    const data = await response.json();
    const best = data.results[0];

    if (!best) {
      console.warn("Aucun film trouvé pour la section Meilleur Film.");
      return;
    }

    // 2. Détails complets
    const detailResponse = await fetch(`${API_BASE_URL}/titles/${best.id}`);
    const fullDetails = await detailResponse.json();

    // 3. Affichage de l'image
    const bestImg = document.getElementById("best-img");
    const isValid = await checkImage(best.image_url);
    bestImg.src = isValid ? best.image_url : "https://dummyimage.com/227x334/cccccc/000000&text=Image+indisponible";
    bestImg.alt = best.title || "Image indisponible";

    // 4. Affichage du titre et de la description
    document.getElementById("best-title").textContent = best.title.length > 50 ? best.title.slice(0, 48) + "…" : best.title;
    document.getElementById("best-desc").textContent = fullDetails.description || "Pas de description disponible.";

    // 5. Gestion du bouton "Détail"
    const detailBtn = document.getElementById("best-detail-btn");
    detailBtn.dataset.movieId = best.id;

    // Nettoyer pour éviter des multiples événements en cas de reload
    detailBtn.replaceWith(detailBtn.cloneNode(true));
    const newDetailBtn = document.getElementById("best-detail-btn");
    newDetailBtn.dataset.movieId = best.id;

    newDetailBtn.addEventListener("click", async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/titles/${best.id}`);
        const movie = await res.json();
        await populateModal(movie);

        const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("movieModal"));
        modal.show();
      } catch (error) {
        console.error("Erreur lors de l'ouverture de la modale du meilleur film :", error);
      }
    });

  } catch (error) {
    console.error("Erreur lors du chargement du meilleur film :", error);
  }
}
