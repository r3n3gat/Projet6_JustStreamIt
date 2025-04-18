// ==============================
// Fonction : tester si une image est valide pour palier au pb de "trou" sur ma page web
// ==============================
function checkImage(url) {
  return new Promise((resolve) => {
    if (!url) return resolve(false);
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

// ==============================
// ⚡ Exécution au chargement de la page
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  console.log("Page chargée, JS prêt !");
  loadBestMovie();
  loadMoviesByGenre("Action", "category-1");
  loadGenres(); // Préparation pour plus tard
});

// ==============================
// Fonction : afficher le meilleur film
// ==============================
async function loadBestMovie() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score");
    const data = await response.json();
    const best = data.results[0];

    const bestImg = document.getElementById("best-img");
    const isValid = await checkImage(best.image_url);
    bestImg.src = isValid
      ? best.image_url
      : "https://dummyimage.com/200x300/cccccc/000000&text=Image+indisponible";
    bestImg.alt = best.title || "Image indisponible";

    document.getElementById("best-title").textContent = best.title || "Titre inconnu";
    document.getElementById("best-desc").textContent = best.description || "Description non disponible";

  } catch (error) {
    console.error("Erreur lors du chargement du meilleur film :", error);
  }
}

// ==============================
// Fonction : afficher les films d'une catégorie
// ==============================
async function loadMoviesByGenre(genre, elementId) {
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

// ==============================
// Fonction : charger la liste des genres
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
