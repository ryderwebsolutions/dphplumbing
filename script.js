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

const mailForms = document.querySelectorAll('.js-mail-form');

mailForms.forEach((form) => {
  const note = form.querySelector('.form-note');
  const title = form.dataset.formTitle || 'New DPH Plumbing Website Enquiry';
  const preferredType = form.dataset.projectType || '';

  if (!note) {
    return;
  }

  if (preferredType) {
    const projectTypeSelect = form.querySelector('[name="projectType"]');
    if (projectTypeSelect && !projectTypeSelect.value) {
      projectTypeSelect.value = preferredType;
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      note.textContent = 'Please complete all required fields before sending your enquiry.';
      return;
    }

    const formData = new FormData(form);
    const lines = [
      `Name: ${formData.get('name')}`,
      `Phone: ${formData.get('phone')}`,
      `Email: ${formData.get('email')}`,
      `Location: ${formData.get('location')}`,
      `Project Type: ${formData.get('projectType')}`,
      '',
      `${formData.get('message')}`
    ];

    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = `mailto:shanedunnewx@gmail.com?subject=${subject}&body=${body}`;

    note.textContent = 'Opening your email app now. Attach project photos if available.';
    form.reset();

    if (preferredType) {
      const projectTypeSelect = form.querySelector('[name="projectType"]');
      if (projectTypeSelect) {
        projectTypeSelect.value = preferredType;
      }
    }
  });
});
