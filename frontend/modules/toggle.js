// /js/modules/toggle.js

/**
 * Gère l'affichage progressif des films (voir plus / voir moins)
 */
export function setupToggleButtons() {

  const debounce = (func, delay = 200) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const setupSectionToggle = (sectionId, buttonId) => {
    const section = document.getElementById(sectionId);
    const button = document.getElementById(buttonId);

    if (!section || !button) return;

    let expanded = false;
    const updateVisibility = () => {
      const movieCards = section.querySelectorAll(".movie-card");
      const width = window.innerWidth;
      let visibleCount;

      if (width < 768) {
        visibleCount = 2;
      } else if (width < 992) {
        visibleCount = 4;
      } else {
        visibleCount = movieCards.length;
      }

      movieCards.forEach((card, index) => {
        if (!expanded && index >= visibleCount) {
          card.classList.add("d-none");
        } else {
          card.classList.remove("d-none");
        }
      });

      if (width >= 992 || movieCards.length <= visibleCount) {
        button.classList.add("d-none");
      } else {
        button.classList.remove("d-none");
        button.textContent = expanded ? "Voir moins" : "Voir plus";
      }
    };

    // Initialisation
    updateVisibility();

    // Gestion fluide du resize
    window.addEventListener("resize", debounce(() => {
      expanded = false;
      updateVisibility();
    }));

    // Toggle voir plus / voir moins
    button.addEventListener("click", () => {
      expanded = !expanded;
      updateVisibility();
    });
  };

  // Activation pour chaque section
  setupSectionToggle("top-rated", "toggle-top-rated");
  setupSectionToggle("selected-category", "toggle-category");
}
