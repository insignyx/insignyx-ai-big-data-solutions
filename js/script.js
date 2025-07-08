document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle (if implemented later)
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav ul');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('hidden');
    });
  }

  // Dropdown menu toggle on click for desktop and mobile
  const dropdownButtons = document.querySelectorAll('nav ul li.relative > button');

  dropdownButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const dropdown = button.nextElementSibling;
      if (dropdown) {
        const isVisible = dropdown.classList.contains('opacity-100');
        // Hide all dropdowns
        document.querySelectorAll('nav ul li.relative div').forEach(div => {
          div.classList.remove('opacity-100');
          div.classList.add('opacity-0');
          div.style.pointerEvents = 'none';
        });
        // Toggle current dropdown
        if (!isVisible) {
          dropdown.classList.remove('opacity-0');
          dropdown.classList.add('opacity-100');
          dropdown.style.pointerEvents = 'auto';
        }
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav ul li.relative')) {
      document.querySelectorAll('nav ul li.relative div').forEach(div => {
        div.classList.remove('opacity-100');
        div.classList.add('opacity-0');
        div.style.pointerEvents = 'none';
      });
    }
  });
});
