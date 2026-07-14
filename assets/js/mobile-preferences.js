/* Mobile menu theme and direction controls. */
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const themeButton = document.getElementById('mobile-preference-theme') || document.getElementById('mobile-theme-toggle');
  const directionButton = document.getElementById('mobile-preference-direction') || document.getElementById('mobile-rtl-toggle');
  const desktopThemeButton = document.getElementById('theme-toggle');
  const desktopDirectionButton = document.getElementById('rtl-toggle');

  try {
    const savedTheme = localStorage.getItem('theme');
    const savedDirection = localStorage.getItem('direction');
    if (savedTheme) root.classList.toggle('dark', savedTheme === 'dark');
    if (savedDirection) root.setAttribute('dir', savedDirection);
  } catch (error) {
    // Controls still work if browser storage is unavailable.
  }

  const updateControls = () => {
    const isDark = root.classList.contains('dark');
    const isRtl = root.getAttribute('dir') === 'rtl';

    if (themeButton) {
      themeButton.setAttribute('aria-pressed', String(isDark));
      themeButton.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
      themeButton.setAttribute('title', `Switch to ${isDark ? 'light' : 'dark'} theme`);
    }
    if (directionButton) {
      directionButton.setAttribute('aria-pressed', String(isRtl));
      directionButton.setAttribute('aria-label', `Switch to ${isRtl ? 'left-to-right' : 'right-to-left'} layout`);
      directionButton.setAttribute('title', `Switch to ${isRtl ? 'LTR' : 'RTL'} layout`);
    }
    if (desktopThemeButton) {
      desktopThemeButton.setAttribute('aria-pressed', String(isDark));
    }
    if (desktopDirectionButton) {
      desktopDirectionButton.setAttribute('aria-pressed', String(isRtl));
    }
  };

  if (themeButton) {
    themeButton.addEventListener('click', () => {
      const nextTheme = root.classList.contains('dark') ? 'light' : 'dark';
      root.classList.toggle('dark', nextTheme === 'dark');
      localStorage.setItem('theme', nextTheme);
      updateControls();
    });
  }

  if (directionButton) {
    directionButton.addEventListener('click', () => {
      const nextDirection = root.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
      root.setAttribute('dir', nextDirection);
      localStorage.setItem('direction', nextDirection);
      updateControls();
    });
  }

  updateControls();
});
