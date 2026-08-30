// ==========================================================================
// Shared site behaviour: theme toggle (persisted) + mobile nav toggle.
// Loaded on every page via <script src="js/main.js" defer></script>
// (adjust the relative path on pages inside /projects/).
// ==========================================================================

(function () {
  "use strict";

  var STORAGE_KEY = "portfolio-theme";

  function getPreferredTheme() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark") return stored;
    } catch (e) {
      // localStorage can throw in some contexts (private browsing etc.) - ignore and fall back.
    }
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    var toggle = document.querySelector("[data-theme-toggle]");
    if (toggle) {
      toggle.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
      toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    }
  }

  function setTheme(theme) {
    applyTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // Ignore storage failures - theme just won't persist across visits.
    }
  }

  // Apply theme as early as possible to avoid a flash of the wrong theme.
  applyTheme(getPreferredTheme());

  document.addEventListener("DOMContentLoaded", function () {
    // Theme toggle button
    var themeToggle = document.querySelector("[data-theme-toggle]");
    if (themeToggle) {
      themeToggle.addEventListener("click", function () {
        var current = document.documentElement.getAttribute("data-theme");
        setTheme(current === "dark" ? "light" : "dark");
      });
    }

    // Mobile nav toggle
    var navToggle = document.querySelector("[data-nav-toggle]");
    var navLinks = document.querySelector("[data-nav-links]");
    if (navToggle && navLinks) {
      navToggle.addEventListener("click", function () {
        var isOpen = navLinks.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    }

    // Highlight the current page in the nav (belt-and-braces on top of
    // any aria-current already set manually in the HTML).
    var currentPath = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("[data-nav-links] a").forEach(function (link) {
      var linkPath = link.getAttribute("href").split("/").pop();
      if (linkPath === currentPath) {
        link.setAttribute("aria-current", "page");
      }
    });
  });
})();
