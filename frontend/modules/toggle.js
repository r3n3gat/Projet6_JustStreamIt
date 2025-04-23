export function setupToggleButtons() {
  const toggleBtn = document.getElementById("toggle-category-1");
  toggleBtn.addEventListener("click", () => {
    const category = document.getElementById("category-1");
    const hiddenMovies = category.querySelectorAll(".d-none.d-md-block");
    const isExpanded = toggleBtn.dataset.expanded === "true";
    hiddenMovies.forEach(div => {
      if (isExpanded) div.classList.add("d-none");
      else div.classList.remove("d-none");
    });
    toggleBtn.textContent = isExpanded ? "Voir plus" : "Voir moins";
    toggleBtn.dataset.expanded = !isExpanded;
  });
}
