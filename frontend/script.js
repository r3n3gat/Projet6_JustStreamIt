//  Au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  console.log("Page chargée, JS prêt !");

  // 1. Charger et afficher le meilleur film
  loadBestMovie();

  // 2. Charger et afficher les films d'une catégorie (ex : Action)
  loadMoviesByGenre("Action", "category-1");

  // 3. Charger et afficher les genres
  loadGenres();
});

// ==============================
// Fonction pour charger le meilleur film
// ==============================
async function loadBestMovie() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score");
    const data = await response.json();
    const best = data.results[0];
    console.log("Meilleur film :", best);

    // Insère dynamiquement les données dans la page
    document.getElementById("best-title").textContent = best.title;
    document.getElementById("best-img").src = best.image_url;
    document.getElementById("best-desc").textContent = best.description;

  } catch (error) {
    console.error("Erreur lors du chargement du meilleur film :", error);
  }
}

// ==============================
// Fonction pour charger les films d'un genre
// ==============================
async function loadMoviesByGenre(genre, elementId) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/titles/?genre=${genre}&sort_by=-imdb_score`
    );
    const data = await response.json();
    const container = document.getElementById(elementId);
    container.innerHTML = ""; // Nettoie

    data.results.slice(0, 6).forEach(movie => {
      const img = document.createElement("img");
      img.src = movie.image_url;
      img.alt = movie.title;
      img.classList.add("img-fluid", "rounded", "me-2", "mb-2");
      container.appendChild(img);
    });

  } catch (error) {
    console.error(`Erreur lors du chargement des films ${genre}:`, error);
  }
}

// ==============================
// Fonction pour charger la liste des genres
// ==============================
async function loadGenres() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/v1/genres/");
    const data = await response.json();
    console.log("Genres disponibles :", data.results);
  } catch (error) {
    console.error("Erreur lors du chargement des genres :", error);
  }
}
