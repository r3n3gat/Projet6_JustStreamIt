// URL de base de l'API locale (vérifie bien que le serveur OCMovies tourne)
export const API_BASE_URL = 'http://localhost:8000/api/v1';


/**
 * Fonction pour récupérer les meilleurs films (par exemple pour la section "Best Movie")
 */
export async function fetchBestMovies() {
  try {
    const response = await fetch(`${API_BASE_URL}/titles/?sort_by=-imdb_score&page_size=1`);
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des meilleurs films');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('fetchBestMovies:', error);
    return [];
  }
}

/**
 * Fonction pour récupérer les films par catégorie spécifique
 * @param {string} category - Le genre ou catégorie de films
 */
export async function fetchMoviesByCategory(category) {
  try {
    const response = await fetch(`${API_BASE_URL}/titles/?genre=${category}&sort_by=-imdb_score&page_size=6`);
    if (!response.ok) {
      throw new Error(`Erreur lors du chargement de la catégorie : ${category}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('fetchMoviesByCategory:', error);
    return [];
  }
}

/**
 * Fonction pour récupérer les détails d'un film spécifique
 * @param {string} id - L'identifiant du film
 */
export async function fetchMovieDetails(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/titles/${id}`);
    if (!response.ok) {
      throw new Error(`Erreur lors du chargement du film ID: ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('fetchMovieDetails:', error);
    return null;
  }
}

/**
 * Fonction pour récupérer la liste des genres disponibles
 */
export async function fetchGenres() {
  try {
    const response = await fetch(`${API_BASE_URL}/genres/`);
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des genres');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('fetchGenres:', error);
    return [];
  }
}
