import { checkImage } from './utils.js';
export async function loadBestMovie() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score");
    const data = await response.json();
    const best = data.results[0];
    const bestImg = document.getElementById("best-img");
    const isValid = await checkImage(best.image_url);
    bestImg.src = isValid ? best.image_url : "https://dummyimage.com/200x300/cccccc/000000&text=Image+indisponible";
    bestImg.alt = best.title || "Image indisponible";
    document.getElementById("best-title").textContent = best.title || "Titre inconnu";
    document.getElementById("best-desc").textContent = best.description || "Description non disponible";
  } catch (error) {
    console.error("Erreur lors du chargement du meilleur film :", error);
  }
}
