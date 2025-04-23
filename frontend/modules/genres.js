export async function loadGenres() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/v1/genres/");
    const data = await response.json();
    console.log("Genres disponibles :", data.results);
  } catch (error) {
    console.error("Erreur lors du chargement des genres :", error);
  }
}
