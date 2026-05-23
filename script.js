function createServiceTestimonialsSection() {
  if (!document.querySelector('.service-contact') || document.querySelector('.service-testimonials')) {
    return;
  }

  const testimonials = [
    {
      name: 'John',
      context: 'New Build – Wexford',
      text: 'Shane and his team handled all the plumbing and heating on our new build, and I couldn\'t fault a thing. The quality of the work, the attention to detail, and the team\'s professionalism were outstanding.'
    },
    {
      name: 'Mairead',
      context: 'Retrofit – Dublin',
      text: 'Shane and his team recently upgraded our home with a new heat pump system and took care of the SEAI grant process too. They were so easy to deal with—friendly, professional, and efficient.'
    },
    {
      name: 'Bruce',
      context: '1760s Home – Kinsale',
      text: 'We recently had our 1760s home in Kinsale fully re-plumbed by Shane and his team, and I couldn\'t be more impressed. The project involved replacing all the old pipework and updating our heating system completely.'
    }
  ];

  const section = document.createElement('section');
  section.className = 'section service-testimonials';
  section.setAttribute('aria-label', 'Client testimonials');
  section.innerHTML = `
    <div class="container">
      <p class="eyebrow reveal">Trusted By Homeowners Across Ireland</p>
      <h2 class="reveal">Real Client Feedback</h2>
      <p class="service-testimonials-intro reveal">From new builds and retrofits to full heating upgrades, our clients trust us for reliable workmanship, clean installations, and professional service.</p>
      <div class="service-testimonials-grid">
        ${testimonials
          .map(
            (testimonial) => `
              <article class="service-testimonial-card reveal">
                <div class="service-rating" aria-label="5 star rating">★★★★★</div>
                <p class="service-testimonial-text">"${testimonial.text}"</p>
                <div class="service-testimonial-meta"><strong>${testimonial.name}</strong><span>${testimonial.context}</span></div>
              </article>
            `
          )
          .join('')}
      </div>
    </div>
  `;

  const serviceContact = document.querySelector('.service-contact');
  serviceContact.parentNode.insertBefore(section, serviceContact);
}

createServiceTestimonialsSection();

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
