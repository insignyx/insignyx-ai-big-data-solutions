console.log("Script loaded");

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

  // JavaScript-based navigation for SPA-like behavior
  const contentContainer = document.getElementById('content-container') || document.createElement('div');
  contentContainer.id = 'content-container';
  if (!document.getElementById('content-container')) {
    document.body.appendChild(contentContainer);
  }

  const pages = {
    'hero.html': 'hero.html',
    'core-capabilities.html': 'core-capabilities.html',
    'clients.html': 'clients.html',
    'customer-stories.html': 'customer-stories.html',
    'index.html': 'index.html',
    'solutions.html': 'solutions.html',
    'products.html': 'products.html',
    'about.html': 'about.html',
    'resources.html': 'resources.html',
    'case-studies.html': 'case-studies.html',
    'career.html': 'career.html',
    'contact.html': 'contact.html',
    'blog.html': 'blog.html',
    'whitepapers.html': 'whitepapers.html'
  };

  async function loadPage(page) {
    if (!pages[page]) return;
    try {
      const response = await fetch(pages[page]);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const mainContent = doc.querySelector('body > section, body > div#content-container');
      if (mainContent) {
        contentContainer.innerHTML = '';
        contentContainer.appendChild(mainContent.cloneNode(true));
      }
    } catch (err) {
      console.error('Error loading page:', err);
      throw err;
    }
  }

  // Intercept link clicks
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', async e => {
      e.preventDefault();
      const href = link.getAttribute('href');
      try {
        await loadPage(href);
        history.pushState(null, '', href);
      } catch (err) {
        window.location.href = href;
      }
    });
  });

  // Load initial page content only on index.html or when no page is specified
  const currentPage = location.pathname.split('/').pop();
  if (!currentPage || currentPage === '' || currentPage === 'index.html') {
    loadPage('hero.html');
  }

  // Handle browser back/forward buttons
  window.addEventListener('popstate', () => {
    loadPage(location.pathname.substring(1) || 'hero.html');
  });

  // Dynamically load footer for static HTML usage
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    fetch('footer.html')
      .then(r => r.text())
      .then(html => {
        footerPlaceholder.innerHTML = html;
      })
      .catch(err => console.error('Error loading footer:', err));
  }
});
