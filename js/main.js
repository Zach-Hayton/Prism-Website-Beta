// Prism landing interactions

// Public beta application form
const BETA_APPLICATION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSe4XB8IPpUwa3eAc1XB_o8D0ey1A7yM7cf2rTeTFS2hpgnN7Q/viewform?usp=publish-editor";

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

// Count-up animation for metrics
function animateCount(el, to, duration = 1100){
  const start = 0;
  const t0 = performance.now();
  const isInt = Number.isInteger(to);

  function tick(now){
    const p = Math.min(1, (now - t0) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = start + (to - start) * eased;
    el.textContent = isInt ? Math.round(val) : val.toFixed(1);
    if(p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function initMetricAnimation(){
  const block = document.querySelector('[data-metrics]');
  if(!block) return;

  const numbers = block.querySelectorAll('[data-count]');
  const bars = block.querySelectorAll('[data-bar]');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;

      numbers.forEach(n => animateCount(n, Number(n.getAttribute('data-count'))));
      bars.forEach(b => {
        const pct = Math.max(0, Math.min(100, Number(b.getAttribute('data-bar'))));
        b.style.width = pct + '%';
      });

      io.disconnect();
    });
  }, { threshold: 0.35 });

  io.observe(block);
}

// Hero background slideshow
function initHeroSlideshow(){
  const bg = document.getElementById('heroBg');
  const dots = document.querySelectorAll('#heroDots span');
  if(!bg) return;

  const slides = [
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=2200&q=80",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2200&q=80",
    "https://images.unsplash.com/photo-1535378620166-273708d44e4c?auto=format&fit=crop&w=2200&q=80",
    "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=2200&q=80"
  ];

  let i = 0;
  function paint(idx){
    bg.style.backgroundImage = `url('${slides[idx]}')`;
    dots.forEach((d, k) => d.classList.toggle('active', k === idx));
  }

  paint(i);
  setInterval(() => {
    i = (i + 1) % slides.length;
    paint(i);
  }, 5200);
}

document.addEventListener('DOMContentLoaded', () => {
  wireBetaLinks();
  smoothAnchors();
  initMetricAnimation();
  initHeroSlideshow();
});
