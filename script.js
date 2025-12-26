// Edda Design - One Page JS (v6)
// - Mobile nav toggle
// - Smooth scroll with sticky header offset (topbar + header)
// - Footer year

(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.tagName === "A") {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  const topbar = document.querySelector(".topbar");
  const header = document.querySelector(".site-header");
  const offset = () =>
    (topbar ? topbar.getBoundingClientRect().height : 0) +
    (header ? header.getBoundingClientRect().height : 0) +
    10;

  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const href = a.getAttribute("href");
    if (!href || href === "#") return;

    const id = href.slice(1);
    const el = document.getElementById(id);
    if (!el) return;

    e.preventDefault();
    const y = window.scrollY + el.getBoundingClientRect().top - offset();
    window.scrollTo({ top: y, behavior: "smooth" });
    history.pushState(null, "", href);
  });
})();
