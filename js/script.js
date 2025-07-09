document.addEventListener('DOMContentLoaded', function () {
  // Dropdown toggle for Services menu
  const servicesButton = document.getElementById('services-button');
  const dropdown = document.getElementById('services-dropdown');

  if (servicesButton && dropdown) {
    servicesButton.addEventListener('click', function (e) {
      e.preventDefault();
      const isVisible = dropdown.classList.contains('opacity-100');
      if (isVisible) {
        dropdown.classList.remove('opacity-100');
        dropdown.classList.add('opacity-0');
        dropdown.style.pointerEvents = 'none';
      } else {
        dropdown.classList.remove('opacity-0');
        dropdown.classList.add('opacity-100');
        dropdown.style.pointerEvents = 'auto';
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
      if (!servicesButton.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('opacity-100');
        dropdown.classList.add('opacity-0');
        dropdown.style.pointerEvents = 'none';
      }
    });
  }
});
