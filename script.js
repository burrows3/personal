/* ===== NAVBAR SCROLL EFFECT ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,.5)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const observerOptions = { rootMargin: '-50% 0px -50% 0px' };
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, observerOptions);
sections.forEach(s => sectionObserver.observe(s));

/* ===== SKILL BAR ANIMATION ===== */
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      fill.style.width = fill.dataset.fill + '%';
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(f => skillObserver.observe(f));

/* ===== FADE-IN ON SCROLL ===== */
const fadeEls = document.querySelectorAll(
  '.stat-card, .skills-column, .timeline-item, .project-card, .edu-card, .contact-item'
);
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  fadeObserver.observe(el);
});
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.visible').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });
});
// When visible class is added
const styleSheet = document.createElement('style');
styleSheet.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(styleSheet);

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => {
  // If the form has a real FormSpree action, let it submit natively via fetch
  const action = contactForm.action;
  const isFormspree = action && action.includes('formspree.io') && !action.includes('YOUR_FORM_ID');

  if (isFormspree) {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
    btn.disabled = true;
    try {
      const data = new FormData(contactForm);
      const res = await fetch(action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (res.ok) {
        btn.innerHTML = '<i class="fas fa-check"></i> Message sent!';
        btn.style.background = '#10b981';
        contactForm.reset();
      } else {
        throw new Error('server error');
      }
    } catch {
      btn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error — please try again';
      btn.style.background = '#ef4444';
    }
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
  } else {
    // Demo mode (no FormSpree ID set yet)
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message sent!';
    btn.style.background = '#10b981';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  }
});
