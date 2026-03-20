/* ============================================================
   KRATANT JAIN — PORTFOLIO CV
   Interaction Script
   ============================================================ */

(function () {
  'use strict';

  // ----------------------------------------------------------
  // 1. Nav — scroll-triggered style
  // ----------------------------------------------------------
  const navHeader = document.getElementById('nav-header');

  function handleNavScroll() {
    if (window.scrollY > 56) {
      navHeader.classList.add('scrolled');
    } else {
      navHeader.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run on load

  // ----------------------------------------------------------
  // 2. Mobile nav toggle
  // ----------------------------------------------------------
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');

  navToggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    // Animate hamburger to X
    const spans = navToggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    });
  });

  // ----------------------------------------------------------
  // 3. Scroll reveal (IntersectionObserver)
  //    Targets every element with class .reveal-item
  // ----------------------------------------------------------
  const revealItems = document.querySelectorAll('.reveal-item');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold:  0.08,
        rootMargin: '0px 0px -36px 0px'
      }
    );

    revealItems.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: just show everything
    revealItems.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ----------------------------------------------------------
  // 4. Counter animation for impact stats
  // ----------------------------------------------------------
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCounter(element, target, duration) {
    duration = duration || 1800;
    var startTime = null;

    function step(currentTime) {
      if (!startTime) startTime = currentTime;
      var elapsed  = currentTime - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var eased    = easeOutCubic(progress);
      var current  = Math.round(eased * target);
      element.textContent = current;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  var statNumbers = document.querySelectorAll('.stat-number[data-target]');

  if ('IntersectionObserver' in window && statNumbers.length) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el     = entry.target;
            var target = parseInt(el.getAttribute('data-target'), 10);
            if (!isNaN(target)) {
              animateCounter(el, target, 1800);
            }
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  // ----------------------------------------------------------
  // 5. Active nav link highlighting on scroll
  // ----------------------------------------------------------
  var sections     = document.querySelectorAll('section[id]');
  var navLinksList = document.querySelectorAll('.nav-link');

  if ('IntersectionObserver' in window && sections.length && navLinksList.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            navLinksList.forEach(function (link) {
              link.classList.remove('active');
              if (link.getAttribute('href') === '#' + id) {
                link.classList.add('active');
              }
            });
          }
        });
      },
      {
        threshold:  0.25,
        rootMargin: '-10% 0px -60% 0px'
      }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  // ----------------------------------------------------------
  // 6. Smooth scroll offset for fixed nav
  //    Adjusts anchor scroll to not hide content under nav
  // ----------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href').slice(1);
      var target   = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      var navHeight = navHeader ? navHeader.offsetHeight : 0;
      var offset    = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

})();
