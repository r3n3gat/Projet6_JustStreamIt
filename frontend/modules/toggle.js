// /modules/toggle.js

/**
 * Gère l'affichage "Voir plus" / "Voir moins" de manière responsive
 */
export function setupToggleButtons() {
  const setupSectionToggle = (sectionId, buttonId) => {
    const section = document.getElementById(sectionId);
    const button = document.getElementById(buttonId);

    if (!section || !button) {
      console.error(`Erreur : éléments pour ${sectionId} introuvables.`);
      return;
    }

    let expanded = false; // état pour voir plus / voir moins

    const updateVisibility = () => {
      const width = window.innerWidth;
      const cards = section.querySelectorAll('.movie-card');
      let visibleCount;

      if (width < 768) {
        visibleCount = 2; // Mobile
      } else if (width < 992) {
        visibleCount = 4; // Tablette
      } else {
        visibleCount = cards.length; // Desktop (tout affiché)
      }

      cards.forEach((card, index) => {
        if (!expanded && index >= visibleCount) {
          card.classList.add('d-none');
        } else {
          card.classList.remove('d-none');
        }
      });

      if (width >= 992 || cards.length <= visibleCount) {
        button.classList.add('d-none'); // Cacher bouton en Desktop ou peu de films
      } else {
        button.classList.remove('d-none');
        button.textContent = expanded ? "Voir moins" : "Voir plus";
      }
    };

    window.addEventListener('resize', () => {
      expanded = false; // reset
      updateVisibility();
    });

    button.addEventListener('click', () => {
      expanded = !expanded;
      updateVisibility();
    });

    // Initialiser tout de suite
    updateVisibility();
  };

  // Activation pour les sections
  setupSectionToggle('top-rated', 'toggle-top-rated');
  setupSectionToggle('selected-category', 'toggle-category');
}
