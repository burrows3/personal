const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector("#nav-links");
const yearEl = document.querySelector("#year");
const themeToggle = document.querySelector("#theme-toggle");
const root = document.documentElement;

const THEME_KEY = "portfolio-theme";
const darkMedia = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  if (themeToggle) {
    themeToggle.textContent = theme === "dark" ? "Light" : "Dark";
  }
}

const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme === "light" || savedTheme === "dark") {
  applyTheme(savedTheme);
} else {
  applyTheme(darkMedia.matches ? "dark" : "light");
}

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme") || "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
  });
}

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.tagName === "A") {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

const revealTargets = document.querySelectorAll(
  ".section, .card, .image-card, .highlight-row, .hero-meta"
);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -30px 0px" }
  );

  revealTargets.forEach((el, index) => {
    el.setAttribute("data-reveal", "");
    el.style.transitionDelay = `${Math.min(index * 18, 220)}ms`;
    observer.observe(el);
  });
} else {
  revealTargets.forEach((el) => el.classList.add("is-visible"));
}
