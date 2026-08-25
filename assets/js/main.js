/**
 * Royal Cabs Tirupur - Interactive & Mobile Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Drawer & Backdrop Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  
  // Create mobile backdrop dynamically if missing
  let navBackdrop = document.querySelector('.nav-backdrop');
  if (!navBackdrop) {
    navBackdrop = document.createElement('div');
    navBackdrop.className = 'nav-backdrop';
    document.body.appendChild(navBackdrop);
  }

  function toggleMenu(open) {
    const isExpanded = open !== undefined ? open : navMenu.classList.contains('is-active');
    if (isExpanded) {
      navMenu.classList.remove('is-active');
      navBackdrop.classList.remove('is-active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileToggle.innerHTML = '&#9776;';
      document.body.style.overflow = '';
    } else {
      navMenu.classList.add('is-active');
      navBackdrop.classList.add('is-active');
      mobileToggle.setAttribute('aria-expanded', 'true');
      mobileToggle.innerHTML = '&#10005;';
      document.body.style.overflow = 'hidden';
    }
  }

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    navBackdrop.addEventListener('click', () => {
      toggleMenu(true);
    });

    // Close on nav item click
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(true);
      });
    });
  }

  // 2. Sticky Header Elevation
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.style.boxShadow = '0 6px 25px rgba(6, 26, 48, 0.12)';
      } else {
        header.style.boxShadow = '0 2px 15px rgba(6, 26, 48, 0.05)';
      }
    });
  }

  // 3. FAQ Accordion
  const faqRows = document.querySelectorAll('.faq-row');
  faqRows.forEach(row => {
    const btn = row.querySelector('.faq-header-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = row.classList.contains('active');

        // Close others
        faqRows.forEach(other => {
          if (other !== row) {
            other.classList.remove('active');
            const otherBtn = other.querySelector('.faq-header-btn');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current
        if (isActive) {
          row.classList.remove('active');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          row.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // 4. Smooth Anchor Scroll with Header Offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
