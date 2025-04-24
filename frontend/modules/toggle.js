
export function setupToggleButton(buttonId, containerId) {
  const toggleBtn = document.getElementById(buttonId);
  const container = document.getElementById(containerId);

  toggleBtn.addEventListener("click", () => {
    const movieCards = container.querySelectorAll(".movie-card");
    const isExpanded = toggleBtn.dataset.expanded === "true";

    movieCards.forEach((card, index) => {
      if (index >= 2 && index < 6) {
        card.classList.toggle("d-none", isExpanded);
      }
    });

    toggleBtn.textContent = isExpanded ? "Voir plus" : "Voir moins";
    toggleBtn.dataset.expanded = (!isExpanded).toString();
  });
}

// Fonction globale pour les setups multiples
export function setupToggleButtons() {
  setupToggleButton("toggle-category-1", "category-1");
}
