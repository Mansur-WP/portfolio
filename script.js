/* NAV TOGGLE (mobile) */
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

navToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

/* SMOOTH SCROLL for anchor links */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    e.preventDefault();
    document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
    // hide mobile menu after click
    if (!mobileMenu.classList.contains('hidden')) mobileMenu.classList.add('hidden');
  });
});

/* CONTACT FORM */
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const successMessage = document.getElementById('successMessage');

  if (name && email && message) {
    successMessage.textContent = `Thanks ${name}! Message received.`;
    form.reset();
    // here you can add fetch() to send the message to a server or form service
  } else {
    successMessage.textContent = 'Please fill out all fields.';
    successMessage.classList.remove('text-green-600');
    successMessage.classList.add('text-red-600');
  }
});

/* TYPING FAKE EFFECT (hero subtitle) */
const typedEl = document.getElementById('typed');
const phrases = ['Frontend Developer', 'Web Designer', 'Tailwind enthusiast'];
let idx = 0, char = 0, forward = true;

function typeLoop() {
  const phrase = phrases[idx];
  if (forward) {
    char++;
    typedEl.textContent = phrase.slice(0, char);
    if (char === phrase.length) { forward = false; setTimeout(typeLoop, 1200); return; }
  } else {
    char--;
    typedEl.textContent = phrase.slice(0, char);
    if (char === 0) { forward = true; idx = (idx + 1) % phrases.length; }
  }
  setTimeout(typeLoop, forward ? 80 : 40);
}
setTimeout(typeLoop, 700);

/* SIMPLE FADE-IN ON SCROLL (IntersectionObserver) */
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('opacity-100', 'translate-y-0');
      entry.target.classList.remove('opacity-0', 'translate-y-6');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('section, article, img').forEach(el => {
  el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-6');
  io.observe(el);
});
