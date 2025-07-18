// Modern JavaScript with improved error handling and maintainability
(function() {
  'use strict';

  // Utility functions
  const utils = {
    // Safe element selection with error handling
    safeQuerySelector: (selector) => {
      try {
        return document.querySelector(selector);
      } catch (error) {
        console.warn(`Element not found: ${selector}`, error);
        return null;
      }
    },

    // Toggle class utility
    toggleClass: (element, className) => {
      if (element && element.classList) {
        element.classList.toggle(className);
      }
    },

    // Add/remove class utility
    setClass: (element, className, add = true) => {
      if (element && element.classList) {
        element.classList[add ? 'add' : 'remove'](className);
      }
    }
  };

  // Dropdown functionality module
  const DropdownManager = {
    init() {
      const servicesButton = utils.safeQuerySelector('#services-button');
      const dropdown = utils.safeQuerySelector('#services-dropdown');

      if (!servicesButton || !dropdown) {
        console.info('Services dropdown elements not found - skipping initialization');
        return;
      }

      this.setupDropdown(servicesButton, dropdown);
    },

    setupDropdown(button, dropdown) {
      // Toggle dropdown on button click
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleDropdown(dropdown);
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!button.contains(e.target) && !dropdown.contains(e.target)) {
          this.closeDropdown(dropdown);
        }
      });

      // Close dropdown on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeDropdown(dropdown);
        }
      });
    },

    toggleDropdown(dropdown) {
      const isVisible = dropdown.classList.contains('opacity-100');
      if (isVisible) {
        this.closeDropdown(dropdown);
      } else {
        this.openDropdown(dropdown);
      }
    },

    openDropdown(dropdown) {
      utils.setClass(dropdown, 'opacity-0', false);
      utils.setClass(dropdown, 'opacity-100', true);
      dropdown.style.pointerEvents = 'auto';
      dropdown.setAttribute('aria-hidden', 'false');
    },

    closeDropdown(dropdown) {
      utils.setClass(dropdown, 'opacity-100', false);
      utils.setClass(dropdown, 'opacity-0', true);
      dropdown.style.pointerEvents = 'none';
      dropdown.setAttribute('aria-hidden', 'true');
    }
  };

  // Mobile menu functionality module
  const MobileMenuManager = {
    init() {
      const mobileMenuButton = utils.safeQuerySelector('#mobile-menu-button');
      const mobileMenu = utils.safeQuerySelector('#mobile-menu');

      if (!mobileMenuButton || !mobileMenu) {
        console.info('Mobile menu elements not found - skipping initialization');
        return;
      }

      this.setupMobileMenu(mobileMenuButton, mobileMenu);
    },

    setupMobileMenu(button, menu) {
      // Toggle mobile menu on button click
      button.addEventListener('click', () => {
        this.toggleMobileMenu(button, menu);
      });

      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!button.contains(e.target) && !menu.contains(e.target) && !menu.classList.contains('hidden')) {
          this.closeMobileMenu(button, menu);
        }
      });

      // Close mobile menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
          this.closeMobileMenu(button, menu);
        }
      });

      // Close mobile menu when window is resized to desktop size
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && !menu.classList.contains('hidden')) {
          this.closeMobileMenu(button, menu);
        }
      });
    },

    toggleMobileMenu(button, menu) {
      const isHidden = menu.classList.contains('hidden');
      if (isHidden) {
        this.openMobileMenu(button, menu);
      } else {
        this.closeMobileMenu(button, menu);
      }
    },

    openMobileMenu(button, menu) {
      utils.setClass(menu, 'hidden', false);
      this.toggleIcon(button, true);
      menu.setAttribute('aria-hidden', 'false');
      button.setAttribute('aria-expanded', 'true');
    },

    closeMobileMenu(button, menu) {
      utils.setClass(menu, 'hidden', true);
      this.toggleIcon(button, false);
      menu.setAttribute('aria-hidden', 'true');
      button.setAttribute('aria-expanded', 'false');
    },

    toggleIcon(button, isOpen) {
      const icon = button.querySelector('i');
      if (!icon) return;

      if (isOpen) {
        utils.setClass(icon, 'fa-bars', false);
        utils.setClass(icon, 'fa-times', true);
      } else {
        utils.setClass(icon, 'fa-times', false);
        utils.setClass(icon, 'fa-bars', true);
      }
    }
  };

  // Performance optimization module
  const PerformanceOptimizer = {
    init() {
      // Lazy load images that are not already lazy loaded
      this.setupLazyLoading();
      
      // Optimize scroll performance
      this.optimizeScrollEvents();
    },

    setupLazyLoading() {
      // Only for browsers that don't support native lazy loading
      if ('loading' in HTMLImageElement.prototype) {
        return; // Native lazy loading is supported
      }

      const images = document.querySelectorAll('img[loading="lazy"]');
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    },

    optimizeScrollEvents() {
      let ticking = false;

      function updateScrollPosition() {
        // Add scroll-based functionality here if needed
        ticking = false;
      }

      function requestTick() {
        if (!ticking) {
          requestAnimationFrame(updateScrollPosition);
          ticking = true;
        }
      }

      window.addEventListener('scroll', requestTick, { passive: true });
    }
  };

  // Main application initialization
  const App = {
    init() {
      try {
        console.info('Initializing Insignyx website functionality...');
        
        // Initialize all modules
        DropdownManager.init();
        MobileMenuManager.init();
        PerformanceOptimizer.init();
        
        console.info('Website functionality initialized successfully');
      } catch (error) {
        console.error('Error initializing website functionality:', error);
      }
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', App.init);
  } else {
    App.init();
  }

  // Expose utilities for potential external use
  window.InsignyxUtils = utils;

})();
