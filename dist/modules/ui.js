import { fetchMovieDetails } from '../js/api.js';
import { openModal } from './modal.js';

/**
 * Crée un élément HTML pour représenter un film
 * @param {Object} movie - Un objet film reçu depuis l'API
 * @returns {HTMLElement}
 */
export function createMovieCard(movie) {
  const movieCard = document.createElement('div');
  movieCard.classList.add('movie-card');

  const image = document.createElement('img');
  image.src = movie.image_url;
  image.alt = movie.title;
  image.classList.add('movie-poster');

  // Au clic, ouvrir la modale avec les détails du film
  movieCard.addEventListener('click', async () => {
    const movieDetails = await fetchMovieDetails(movie.id);
    if (movieDetails) {
      openModal(movieDetails);
    }
  });

  movieCard.appendChild(image);
  return movieCard;
}

/**
 * Affiche une liste de films dans un conteneur cible
 * @param {HTMLElement} container - L'élément DOM dans lequel ajouter les films
 * @param {Array} movies - La liste des films à afficher
 */
export function displayMovies(container, movies) {
  container.innerHTML = ''; // Nettoyer avant d'ajouter

  movies.forEach(movie => {
    const movieCard = createMovieCard(movie);
    container.appendChild(movieCard);
  });
}
