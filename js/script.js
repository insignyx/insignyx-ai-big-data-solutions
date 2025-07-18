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
  
  // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      // Toggle the 'hidden' class to show/hide the mobile menu
      mobileMenu.classList.toggle('hidden');
      
      // Toggle the icon between bars and times (X)
      const icon = mobileMenuButton.querySelector('i');
      if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuButton.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
});
