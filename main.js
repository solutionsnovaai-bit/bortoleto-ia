// LOADER → MAIN reveal
window.addEventListener('load', function () {
  setTimeout(function () {
    document.getElementById('loader').classList.add('hidden');
    document.getElementById('main').classList.add('visible');
    initReveal();
  }, 2400);
});

// SCROLL REVEAL
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.10 });
  items.forEach(function (el) { obs.observe(el); });
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    e.preventDefault();
    var id = a.getAttribute('href').slice(1);
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
});

// COUNTER ANIMATION for proof stats
function animateCounters() {
  document.querySelectorAll('.proof-stat-number[data-target]').forEach(function (el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var duration = 1600;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  });
}

// Trigger counter when proof section enters viewport
var proofObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) {
      animateCounters();
      proofObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

var proofSection = document.querySelector('.proof-section');
if (proofSection) proofObserver.observe(proofSection);
