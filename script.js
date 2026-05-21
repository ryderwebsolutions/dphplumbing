const revealNodes = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealNodes.forEach((node) => revealObserver.observe(node));

const mobileMenuToggles = document.querySelectorAll('.js-mobile-menu-toggle');

mobileMenuToggles.forEach((toggle) => {
  const navWrap = toggle.closest('.nav-wrap');
  if (!navWrap) {
    return;
  }

  toggle.addEventListener('click', () => {
    const isOpen = navWrap.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
});

document.addEventListener('click', (event) => {
  document.querySelectorAll('.nav-wrap.menu-open').forEach((navWrap) => {
    if (navWrap.contains(event.target)) {
      return;
    }

    navWrap.classList.remove('menu-open');
    const toggle = navWrap.querySelector('.js-mobile-menu-toggle');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
});
