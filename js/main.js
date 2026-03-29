/* ============================================
   R.DOLFINI ARCH — Main JS
   Menu mobile, navbar scroll, animazioni
   ============================================ */

(function () {
  'use strict';

  /* --- Intro screen (solo prima visita della sessione) --- */
  var siteIntro = document.getElementById('siteIntro');
  if (siteIntro) {
    sessionStorage.setItem('rdarch-intro', '1');
    setTimeout(function () {
      siteIntro.classList.add('is-hidden');
      siteIntro.addEventListener('transitionend', function () {
        siteIntro.remove();
      }, { once: true });
    }, 1700);
  }

  /* --- Custom Cursor --- */
  var cursorEl = document.createElement('div');
  cursorEl.className = 'custom-cursor';
  cursorEl.textContent = '+';
  document.body.appendChild(cursorEl);

  var mousePos = { x: 0, y: 0 };
  var cursorPos = { x: 0, y: 0 };
  var cursorSpeed = 0.3;
  var cursorVisible = false;
  var cursorHovering = false;
  var cursorOnDark = false;

  /* Selettore sezioni con sfondo scuro — aggiungere [data-bg-dark] a nuove sezioni */
  var DARK_SELECTOR = '.footer, [data-bg-dark]';

  /* Disabilita solo su dispositivi puramente touch (no mouse) */
  var isMobileOnly = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  if (!isMobileOnly) {
    document.addEventListener('mousemove', function (e) {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;

      if (!cursorVisible) {
        cursorVisible = true;
        cursorEl.style.opacity = '1';
      }

      var target = e.target;
      var isInteractive = !!(
        target.closest('a, button, [role="button"], input, select, textarea, label, [data-clickable]') ||
        window.getComputedStyle(target).cursor === 'pointer'
      );

      if (isInteractive !== cursorHovering) {
        cursorHovering = isInteractive;
        cursorEl.style.width = isInteractive ? '70px' : '56px';
        cursorEl.style.height = isInteractive ? '70px' : '56px';
        cursorEl.classList.toggle('custom-cursor--hovering', isInteractive);
      }

      /* Rileva se il cursore e' su una sezione con sfondo scuro */
      var isOnDark = !!(target.closest(DARK_SELECTOR));
      if (isOnDark !== cursorOnDark) {
        cursorOnDark = isOnDark;
        cursorEl.classList.toggle('custom-cursor--inverted', isOnDark);
      }
    });

    document.addEventListener('mouseleave', function () {
      cursorVisible = false;
      cursorEl.style.opacity = '0';
    });

    /* Smooth follow loop */
    (function animateCursor() {
      cursorPos.x += (mousePos.x - cursorPos.x) * cursorSpeed;
      cursorPos.y += (mousePos.y - cursorPos.y) * cursorSpeed;
      cursorEl.style.transform = 'translate(' + cursorPos.x + 'px, ' + cursorPos.y + 'px) translate(-50%, -50%)';
      requestAnimationFrame(animateCursor);
    })();
  } else {
    /* Su touch: rimuovi cursor:none e nascondi il cerchio */
    cursorEl.style.display = 'none';
    document.documentElement.style.setProperty('cursor', 'auto', 'important');
  }

  /* --- Mobile Menu --- */
  var menuToggle = document.getElementById('menuToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  var body = document.body;
  var isMenuOpen = false;

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      isMenuOpen = !isMenuOpen;
      mobileMenu.classList.toggle('open', isMenuOpen);
      body.style.overflow = isMenuOpen ? 'hidden' : '';
      /* Animate hamburger to X */
      menuToggle.classList.toggle('active', isMenuOpen);
    });

    /* Close menu on link click */
    var menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        isMenuOpen = false;
        mobileMenu.classList.remove('open');
        body.style.overflow = '';
        menuToggle.classList.remove('active');
      });
    });
  }

  /* --- Navbar hide/show on scroll --- */
  var navbar = document.getElementById('navbar');
  var lastScroll = 0;
  var scrollThreshold = 80;

  window.addEventListener('scroll', function () {
    var currentScroll = window.pageYOffset;

    if (currentScroll <= scrollThreshold) {
      navbar.classList.remove('hidden');
      return;
    }

    if (currentScroll > lastScroll) {
      /* Scrolling down */
      navbar.classList.add('hidden');
    } else {
      /* Scrolling up */
      navbar.classList.remove('hidden');
    }

    lastScroll = currentScroll;
  });

  /* --- Scroll reveal animation --- */
  /* Standard reveal (bottom-up) */
  var revealUp = document.querySelectorAll(
    '.service-card, .cta-section, .section__header, .page-header, ' +
    '.service-detail, .project-card, .skill-group, .contact-grid, ' +
    '.footer__grid'
  );

  /* Directional reveals */
  var revealLeft = document.querySelectorAll('.about-preview__image');
  var revealRight = document.querySelectorAll('.about-preview__text');

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealUp.forEach(function (el) {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  revealLeft.forEach(function (el) {
    el.classList.add('reveal--left');
    revealObserver.observe(el);
  });

  revealRight.forEach(function (el) {
    el.classList.add('reveal--right');
    revealObserver.observe(el);
  });

  /* --- Privacy modal --- */
  var privacyModal = document.getElementById('privacyModal');
  var modalClose = document.getElementById('modalClose');
  var privacyTriggers = document.querySelectorAll('.privacy-trigger');

  function openModal(e) {
    e.preventDefault();
    privacyModal.classList.add('open');
    body.style.overflow = 'hidden';
  }

  function closeModal() {
    privacyModal.classList.remove('open');
    body.style.overflow = '';
  }

  privacyTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', openModal);
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (privacyModal) {
    privacyModal.addEventListener('click', function (e) {
      /* Chiudi cliccando sullo sfondo scuro */
      if (e.target === privacyModal) {
        closeModal();
      }
    });
  }

  /* Chiudi con ESC */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && privacyModal.classList.contains('open')) {
      closeModal();
    }
  });

  /* --- Active nav link based on current page --- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.navbar__links a');
  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

})();
