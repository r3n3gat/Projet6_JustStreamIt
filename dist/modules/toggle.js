/**
 * Gère l'affichage progressif des films (voir plus / voir moins)
 */
export function setupToggleButtons() {
  const setupSectionToggle = (sectionId, buttonId) => {
    const section = document.getElementById(sectionId);
    const button = document.getElementById(buttonId);

    if (!section || !button) return;

    let expanded = false; // état pour savoir si on a étendu la liste
    const movieCards = section.querySelectorAll(".movie-card");

    function updateVisibility() {
      const width = window.innerWidth;
      let visibleCount;

      if (width < 768) {
        visibleCount = 2; // mobile
      } else if (width < 992) {
        visibleCount = 4; // tablette
      } else {
        visibleCount = movieCards.length; // PC, tout visible
      }

      movieCards.forEach((card, index) => {
        if (!expanded && index >= visibleCount) {
          card.classList.add("d-none");
        } else {
          card.classList.remove("d-none");
        }
      });

      if (width >= 992 || movieCards.length <= visibleCount) {
        // Si on est en PC ou pas assez de films : pas besoin de bouton
        button.classList.add("d-none");
      } else {
        button.classList.remove("d-none");
        button.textContent = expanded ? "Voir moins" : "Voir plus";
      }
    }

    // Initialisation
    updateVisibility();
    window.addEventListener("resize", () => {
      expanded = false; // Reset à "fermé" au resize
      updateVisibility();
    });

    button.addEventListener("click", () => {
      expanded = !expanded;
      updateVisibility();
    });
  };

  // Activation pour chaque section
  setupSectionToggle("top-rated", "toggle-top-rated");
  setupSectionToggle("selected-category", "toggle-category");
}
