export function setupModalListener() {
  document.body.addEventListener("click", async (e) => {
    if (e.target.tagName === "IMG" && e.target.dataset.movieId) {
      const movieId = e.target.dataset.movieId;

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/titles/${movieId}`);
        const data = await response.json();

        document.getElementById("movieModalLabel").textContent = data.title;
        document.getElementById("modal-img").src = data.image_url;
        document.getElementById("modal-year").textContent = data.year;
        document.getElementById("modal-genres").textContent = data.genres.join(", ");
        document.getElementById("modal-directors").textContent = data.directors.join(", ");
        document.getElementById("modal-actors").textContent = data.actors.join(", ");
        document.getElementById("modal-score").textContent = data.imdb_score;
        document.getElementById("modal-desc").textContent = data.long_description || data.description;

      } catch (err) {
        console.error("Erreur lors du chargement du film :", err);
      }
    }
  });
}
