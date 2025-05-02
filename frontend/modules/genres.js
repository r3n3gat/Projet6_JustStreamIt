// /js/modules/genres.js

import { fetchGenres } from "../api.js";
import { loadMoviesByGenre } from "./movieByGenre.js";

/**
 * Charge dynamiquement les genres depuis l'API
 * et les insère dans une balise <select>
 * @param {string} selectId - ID du <select> HTML
 */
export async function loadGenres(selectId) {
  try {
    const genres = await fetchGenres();

    const select = document.getElementById(selectId);
    if (!select) {
      console.error(`Erreur : élément avec l'id "${selectId}" non trouvé.`);
      return;
    }

    genres.forEach(genre => {
      const option = document.createElement("option");
      option.value = genre.name;
      option.textContent = genre.name;
      select.appendChild(option);
    });

    console.log("Genres chargés :", genres);
  } catch (error) {
    console.error("Erreur lors du chargement des genres :", error);
  }
}

/**
 * Gère le changement de genre sélectionné (dropdown)
 * et met à jour le titre + les films affichés
 * @param {string} selectId - ID du <select>
 * @param {string} titleId - ID de l'élément titre
 * @param {string} containerId - ID du conteneur de films
 */
export function setupGenreChangeListener(selectId, titleId, containerId) {
  const select = document.getElementById(selectId);
  const title = document.getElementById(titleId);
  const button = document.getElementById("toggle-category");

  if (!select || !title || !button) {
    console.error("Erreur : un des éléments DOM nécessaires est manquant.");
    return;
  }

  select.addEventListener("change", async (e) => {
    const selected = e.target.value;

    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";

    if (selected) {
      title.textContent = capitalizeFirstLetter(selected);
      await loadMoviesByGenre(selected, containerId);
      button.dataset.expanded = "false";
      button.textContent = "Voir plus";
    } else {
      title.textContent = "Catégorie sélectionnée";
    }
  });
}

/**
 * Capitalise la première lettre d'une chaîne
 * @param {string} str
 * @returns {string}
 */
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
