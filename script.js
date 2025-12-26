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

(function(){
  const email = "info" + "@" + "eddadesign.com.au";
  const el = document.getElementById("email-link");
  if(el){
    el.href = "mailto:" + email;
    el.textContent = email;
  }
})();

(function(){
  const phone = "+61 477 104 981";
  const tel = "+61477104981";
  const el = document.getElementById("phone-link");
  if(el){
    el.href = "tel:" + tel;
    el.textContent = phone;
  }
})();



/* Contact detail injection to reduce scraping */
(function () {
  // Email (assembled to avoid simple scraping)
  const emailUser = "info";
  const emailDomain = "eddadesign.com.au";
  const email = emailUser + "@" + emailDomain;

  // Phone / SMS
  const phoneDisplay = "0477 104 981";
  const phoneDial = "+61477104981";

  function setLink(id, href, text) {
    const el = document.getElementById(id);
    if (!el) return;
    el.href = href;
    if (text) el.textContent = text;
  }

  // Email links
  ["email-link-topbar", "email-link-cta", "email-link-contact"].forEach(id => {
    setLink(id, "mailto:" + email, (id === "email-link-contact") ? email : null);
  });

  // Phone links
  ["phone-link-topbar", "phone-link-cta", "phone-link-contact"].forEach(id => {
    setLink(id, "tel:" + phoneDial, (id === "phone-link-contact") ? phoneDisplay : null);
  });

  // SMS links
  ["sms-link-topbar", "sms-link-contact"].forEach(id => {
    setLink(id, "sms:" + phoneDial, (id === "sms-link-contact") ? phoneDisplay : null);
  });
})();
