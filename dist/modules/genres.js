import { API_BASE_URL } from "./config.js";
import { loadMoviesByGenre } from "./movieByGenre.js";

/**
 * Charge dynamiquement les genres depuis l'API
 * et les insère dans une balise <select>
 */
export async function loadGenres(selectId) {
  try {
    const response = await fetch(`${API_BASE_URL}/genres/`);
    const data = await response.json();

    const select = document.getElementById(selectId);
    if (!select) {
      console.error(`Élément avec l'id "${selectId}" non trouvé.`);
      return;
    }

    data.results.forEach(genre => {
      const option = document.createElement("option");
      option.value = genre.name;
      option.textContent = genre.name;
      select.appendChild(option);
    });

    console.log(" Genres chargés :", data.results);
  } catch (error) {
    console.error(" Erreur lors du chargement des genres :", error);
  }
}

/**
 * Gère le changement de genre sélectionné (dropdown)
 * et met à jour le titre + les films affichés
 */
export function setupGenreChangeListener(selectId, titleId, containerId) {
  const select = document.getElementById(selectId);
  const title = document.getElementById(titleId);
  const button = document.getElementById("toggle-category");

  if (!select || !title || !button) {
    console.error(" Un des éléments nécessaires est manquant dans le DOM.");
    return;
  }

  select.addEventListener("change", async (e) => {
    const selected = e.target.value;

    // Vider les anciens films avant de charger
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    if (selected) {
      // Maj du titre
      title.textContent = capitalizeFirstLetter(selected);

      // Rechargement des films
      await loadMoviesByGenre(selected, containerId);

      // Reset bouton toggle
      button.dataset.expanded = "false";
      button.textContent = "Voir plus";
    } else {
      title.textContent = "Catégorie sélectionnée";
    }
  });
}

// Helper optionnel pour styliser proprement le titre
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
