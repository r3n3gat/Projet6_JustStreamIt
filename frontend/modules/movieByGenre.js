import { checkImage } from './helpers.js';

export async function loadMoviesByGenre(genre, elementId) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/v1/titles/?genre=${genre}&sort_by=-imdb_score`);
    const data = await response.json();
    const container = document.getElementById(elementId);
    container.innerHTML = "";

    for (const movie of data.results.slice(0, 6)) {
      const col = document.createElement("div");
      col.className = "col-12 col-md-6 col-lg-4 mb-3 text-center";

      const img = document.createElement("img");
      img.className = "img-fluid rounded";

      const isValid = await checkImage(movie.image_url);
      img.src = isValid
        ? movie.image_url
        : "https://dummyimage.com/200x300/cccccc/000000&text=Image+indisponible";
      img.alt = movie.title || "Image manquante";

      const title = document.createElement("p");
      title.textContent = movie.title || "Titre inconnu";
      title.className = "mt-2 fw-bold";

      col.appendChild(img);
      col.appendChild(title);
      container.appendChild(col);
    }

  } catch (error) {
    console.error(`Erreur lors du chargement des films pour le genre ${genre}:`, error);
  }
}
