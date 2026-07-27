/* =============================================================
   OEPM SHOP · MEDICAMENTOS Y SALUD
   animations.js — Entradas al hacer scroll y microinteracciones
   -------------------------------------------------------------
   · Reveal con IntersectionObserver (una sola vez por elemento).
   · Contadores numéricos de la banda de datos.
   · Movimiento sutil de las formas decorativas del branding.
   Todo se desactiva si el usuario pidió menos movimiento.
   ============================================================= */

(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -----------------------------------------------------------
     1. REVEAL AL HACER SCROLL
     ----------------------------------------------------------- */
  function initReveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    if (!items.length) { return; }

    /* Sin soporte o con movimiento reducido: se muestra todo de inmediato */
    if (prefersReduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.12
    });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* -----------------------------------------------------------
     2. CONTADORES DE LA BANDA DE DATOS
     ----------------------------------------------------------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1400;
    var start = null;

    if (prefersReduced) {
      el.textContent = target.toLocaleString('es-MX') + suffix;
      return;
    }

    function step(timestamp) {
      if (start === null) { start = timestamp; }
      var progress = Math.min((timestamp - start) / duration, 1);
      /* easeOutCubic para que frene de forma natural */
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toLocaleString('es-MX') + suffix;
      if (progress < 1) { window.requestAnimationFrame(step); }
    }

    window.requestAnimationFrame(step);
  }

  function initCounters() {
    var counters = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
    if (!counters.length) { return; }

    if (!('IntersectionObserver' in window)) {
      counters.forEach(animateCount);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        animateCount(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  /* -----------------------------------------------------------
     3. PARALLAX SUAVE DE LAS FORMAS DEL BRANDING
        Solo en escritorio y con requestAnimationFrame para no
        castigar el rendimiento del scroll.
     ----------------------------------------------------------- */
  function initParallax() {
    if (prefersReduced || window.matchMedia('(max-width: 960px)').matches) { return; }

    /* Solo formas sin transform propio en CSS, para no pisarlo */
    var shapes = Array.prototype.slice.call(
      document.querySelectorAll('.shipping .blob, .cta-final .blob')
    );
    if (!shapes.length) { return; }

    var ticking = false;

    function update() {
      var y = window.scrollY;
      shapes.forEach(function (shape, i) {
        var speed = 0.03 + (i % 3) * 0.015;
        shape.style.transform = 'translate3d(0,' + (-y * speed).toFixed(1) + 'px,0)';
      });
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (ticking) { return; }
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });
  }

  /* -----------------------------------------------------------
     4. ARRANQUE
     ----------------------------------------------------------- */
  function init() {
    initReveal();
    initCounters();
    initParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
