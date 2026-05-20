/* Shared theme & accent helper for CRITERIA
   - Applies saved theme/accent early and syncs UI selections when present
   - Exposes `setTheme` and `setAccent` globally for existing pages
*/
(function(){
  function shadeColor(hex, pct) {
    const num = parseInt(hex.slice(1), 16);
    const amt = Math.round(2.55 * pct);
    const r = Math.min(255, Math.max(0, (num >> 16) + amt));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amt));
    const b = Math.min(255, Math.max(0, (num & 0xff) + amt));
    return `#${((1<<24)|(r<<16)|(g<<8)|b).toString(16).slice(1)}`;
  }

  function applyAccentVars(color) {
    try {
      const r = parseInt(color.slice(1,3), 16);
      const g = parseInt(color.slice(3,5), 16);
      const b = parseInt(color.slice(5,7), 16);
      document.documentElement.style.setProperty('--gold', color);
      document.documentElement.style.setProperty('--gold-dim', shadeColor(color, -20));
      document.documentElement.style.setProperty('--gold-glow', `rgba(${r},${g},${b},0.12)`);
      document.documentElement.style.setProperty('--gold-border', `rgba(${r},${g},${b},0.25)`);
      // Hover/light variant for accent (used in buttons/hover states)
      document.documentElement.style.setProperty('--gold-hover', shadeColor(color, 18));
    } catch(e) { /* ignore malformed color */ }
  }

  function applySavedThemeAndAccent() {
    const t = localStorage.getItem('criteria-theme');
    if (t) document.documentElement.setAttribute('data-theme', t);
    const a = localStorage.getItem('criteria-accent');
    if (a) applyAccentVars(a);
    else {
      // ensure --gold-hover exists based on current --gold
      try {
        const cs = getComputedStyle(document.documentElement);
        const current = cs.getPropertyValue('--gold').trim() || '#f0a500';
        document.documentElement.style.setProperty('--gold-hover', shadeColor(current, 18));
      } catch(e) {}
    }

    // Sync UI selection states if present
    try {
      const darkCard = document.getElementById('theme-card-dark');
      const lightCard = document.getElementById('theme-card-light');
      if (darkCard && lightCard) {
        darkCard.classList.toggle('selected', (t || 'dark') === 'dark');
        lightCard.classList.toggle('selected', (t || 'dark') === 'light');
      }
      const swatches = document.querySelectorAll('.accent-swatch');
      if (swatches && swatches.length) {
        swatches.forEach(s => s.classList.toggle('selected', s.dataset.color === a));
      }
    } catch(e) { /* no-op */ }
  }

  function setTheme(t, persist = true) {
    document.documentElement.setAttribute('data-theme', t);
    const darkCard = document.getElementById('theme-card-dark');
    const lightCard = document.getElementById('theme-card-light');
    if (darkCard && lightCard) {
      darkCard.classList.toggle('selected', t === 'dark');
      lightCard.classList.toggle('selected', t === 'light');
    }
    if (persist) localStorage.setItem('criteria-theme', t);
  }

  function setAccent(color, el) {
    document.querySelectorAll('.accent-swatch').forEach(s => s.classList.remove('selected'));
    if (el) el.classList.add('selected');
    applyAccentVars(color);
    localStorage.setItem('criteria-accent', color);
  }

  // Expose globally so existing inline handlers keep working
  window.setTheme = setTheme;
  window.setAccent = setAccent;
  window.applyAccentVars = applyAccentVars;
  window.themeAccent = { applySavedThemeAndAccent, setTheme, setAccent };

  // Sync UI after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applySavedThemeAndAccent);
  } else {
    applySavedThemeAndAccent();
  }

})();
/* Shared theme & accent helper for CRITERIA
   - Applies saved theme/accent early and syncs UI selections when present
   - Exposes `setTheme` and `setAccent` globally for existing pages
*/
(function(){
  function shadeColor(hex, pct) {
    const num = parseInt(hex.slice(1), 16);
    const amt = Math.round(2.55 * pct);
    const r = Math.min(255, Math.max(0, (num >> 16) + amt));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amt));
    const b = Math.min(255, Math.max(0, (num & 0xff) + amt));
    return `#${((1<<24)|(r<<16)|(g<<8)|b).toString(16).slice(1)}`;
  }

  function applyAccentVars(color) {
    try {
      const r = parseInt(color.slice(1,3), 16);
      const g = parseInt(color.slice(3,5), 16);
      const b = parseInt(color.slice(5,7), 16);
      document.documentElement.style.setProperty('--gold', color);
      document.documentElement.style.setProperty('--gold-dim', shadeColor(color, -20));
      document.documentElement.style.setProperty('--gold-glow', `rgba(${r},${g},${b},0.12)`);
      document.documentElement.style.setProperty('--gold-border', `rgba(${r},${g},${b},0.25)`);
    } catch(e) { /* ignore malformed color */ }
  }

  function applySavedThemeAndAccent() {
    const t = localStorage.getItem('criteria-theme');
    if (t) document.documentElement.setAttribute('data-theme', t);
    const a = localStorage.getItem('criteria-accent');
    if (a) applyAccentVars(a);

    // Sync UI selection states if present
    try {
      const darkCard = document.getElementById('theme-card-dark');
      const lightCard = document.getElementById('theme-card-light');
      if (darkCard && lightCard) {
        darkCard.classList.toggle('selected', (t || 'dark') === 'dark');
        lightCard.classList.toggle('selected', (t || 'dark') === 'light');
      }
      const swatches = document.querySelectorAll('.accent-swatch');
      if (swatches && swatches.length) {
        swatches.forEach(s => s.classList.toggle('selected', s.dataset.color === a));
      }
    } catch(e) { /* no-op */ }
  }

  function setTheme(t, persist = true) {
    document.documentElement.setAttribute('data-theme', t);
    const darkCard = document.getElementById('theme-card-dark');
    const lightCard = document.getElementById('theme-card-light');
    if (darkCard && lightCard) {
      darkCard.classList.toggle('selected', t === 'dark');
      lightCard.classList.toggle('selected', t === 'light');
    }
    if (persist) localStorage.setItem('criteria-theme', t);
  }

  function setAccent(color, el) {
    document.querySelectorAll('.accent-swatch').forEach(s => s.classList.remove('selected'));
    if (el) el.classList.add('selected');
    applyAccentVars(color);
    localStorage.setItem('criteria-accent', color);
  }

  // Expose globally so existing inline handlers keep working
  window.setTheme = setTheme;
  window.setAccent = setAccent;
  window.applyAccentVars = applyAccentVars;
  window.themeAccent = { applySavedThemeAndAccent, setTheme, setAccent };

  // Sync UI after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applySavedThemeAndAccent);
  } else {
    applySavedThemeAndAccent();
  }

})();
