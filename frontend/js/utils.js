// Fonction pour vérifier une image
export function checkImage(url) {
  return new Promise((resolve) => {
    if (!url) return resolve(false);
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

// Fonction utilitaire pour créer dynamiquement une carte complète de film
export async function createMovieCard(movie, openModalCallback) {
  const card = document.createElement("div");
  card.classList.add("movie-card");

  let isValid ;
  try {
    isValid = await checkImage(movie.image_url);
  } catch (error) {
    console.error("Erreur lors de la vérification de l'image :", error);
    isValid = false; // fallback si erreur
  }

  const poster = document.createElement("img");
  poster.src = isValid ? movie.image_url : "https://dummyimage.com/259x252/cccccc/000000&text=Image+indisponible";
  poster.alt = movie.title || "Affiche indisponible";
  poster.classList.add("movie-poster");
  poster.loading = "lazy";

  const overlay = document.createElement("div");
  overlay.classList.add("movie-overlay");

  const title = document.createElement("p");
  title.classList.add("movie-title");
  title.textContent = movie.title.length > 20 ? movie.title.slice(0, 18) + "…" : movie.title;

  const detailBtn = document.createElement("button");
  detailBtn.classList.add("movie-detail-btn");
  detailBtn.textContent = "Détail";
  detailBtn.addEventListener("click", async (event) => {
    event.stopPropagation();
    try {
      await openModalCallback(movie.id);
    } catch (error) {
      console.error("Erreur lors de l'ouverture du détail :", error);
    }
  });

  overlay.appendChild(title);
  overlay.appendChild(detailBtn);

  card.appendChild(poster);
  card.appendChild(overlay);

  return card;
}