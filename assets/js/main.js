document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Theme toggle (robust)
  const themeToggle = document.getElementById('theme-toggle');

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      try { localStorage.theme = 'dark'; } catch (e) {}
    } else {
      document.documentElement.classList.remove('dark');
      try { localStorage.theme = 'light'; } catch (e) {}
    }
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', theme === 'dark');
      themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  };

  const detectSystem = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Initialize theme: prefer localStorage, then system preference
  let current = null;
  try { current = localStorage.theme; } catch (e) { current = null; }
  if (!current) current = detectSystem() ? 'dark' : 'light';
  applyTheme(current);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      applyTheme(isDark ? 'light' : 'dark');
    });

    // keyboard support
    themeToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        themeToggle.click();
      }
    });
  }

});

const rtlBtn = document.getElementById("rtl-toggle");

function applyDirection(dir) {
    document.documentElement.setAttribute("dir", dir);

    if (dir === "rtl") {
        rtlBtn.textContent = "LTR";
    } else {
        rtlBtn.textContent = "RTL";
    }
}

const savedDir = localStorage.getItem("direction") || "ltr";
applyDirection(savedDir);

rtlBtn.addEventListener("click", () => {
    const newDir =
        document.documentElement.getAttribute("dir") === "ltr"
            ? "rtl"
            : "ltr";

    localStorage.setItem("direction", newDir);
    applyDirection(newDir);
});