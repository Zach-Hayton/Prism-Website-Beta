// Prism landing interactions (intentionally lightweight)

const BETA_APPLICATION_URL = "https://forms.gle/your-prism-beta-application"; // TODO: replace

function wireBetaLinks(){
  document.querySelectorAll('[data-beta-link]')
    .forEach(a => a.setAttribute('href', BETA_APPLICATION_URL));
}

function smoothAnchors(){
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if(!id || id.length < 2) return;
      const el = document.querySelector(id);
      if(!el) return;
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
      history.replaceState(null, '', id);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  wireBetaLinks();
  smoothAnchors();
});
