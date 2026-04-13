// Animate skill & language bars
const animateBars = () => {
  document.querySelectorAll('.skill-fill, .lang-fill')
    .forEach(bar => bar.style.width = bar.dataset.w + '%');
};

// Scroll spy for active nav icon
const updateNav = () => {
  const current = [...document.querySelectorAll('.section')]
    .filter(sec => sec.getBoundingClientRect().top <= window.innerHeight * 0.5)
    .map(sec => sec.id)
    .at(-1);

  document.querySelectorAll('.nav-icon').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};

// Fade-in on scroll
const setupFadeIns = () => {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
    { threshold: 0.12 }
  );

  document.querySelectorAll('.service-card, .price-card, .highlight-box, .stat')
    .forEach(el => { el.classList.add('fade-in'); observer.observe(el); });
};

// Contact form submit
const handleForm = () => {
  const fields = ['name', 'email', 'message'];
  const values = fields.map(id => document.getElementById(id));
  const isValid = values.every(el => el.value.trim());

  values.forEach(el => {
    el.style.borderColor = el.value.trim() ? 'var(--gold)' : '#e74c3c';
  }); 

  if (!isValid) return;

  const btn = document.getElementById('send-btn');
  btn.textContent = '✓ Message Sent!';
  btn.style.background = '#4caf50';

  setTimeout(() => {
    btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    btn.style.background = '';
    values.forEach(el => { el.value = ''; el.style.borderColor = ''; });
  }, 3000);
};

// Init
document.addEventListener('DOMContentLoaded', () => {
  setupFadeIns();
  setTimeout(animateBars, 400);
  window.addEventListener('scroll', updateNav, { passive: true });
  document.getElementById('send-btn').addEventListener('click', handleForm);
  updateNav();
});