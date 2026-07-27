/* =============================================================
   OEPM SHOP · MEDICAMENTOS Y SALUD
   main.js — Configuración, navegación, FAQ y redirección a tienda
   -------------------------------------------------------------
   JavaScript vanilla, sin dependencias.
   Todo lo que normalmente se cambia está en el bloque CONFIG.
   ============================================================= */

(function () {
  'use strict';

  /* -----------------------------------------------------------
     1. CONFIGURACIÓN — EDITA SOLO ESTO
     ----------------------------------------------------------- */
  var CONFIG = {
    /* URL de la tienda OEPM Shop a la que redirigen todos los CTA */
    shopUrl: 'https://nube-store-pi.vercel.app',

    /* WhatsApp de atención en formato internacional, solo dígitos.
       Ejemplo México: 52 + LADA + número → 521234567890 */
    whatsappNumber: '520000000000',
    whatsappMessage: 'Hola OEPM Shop, quiero información sobre productos de salud y envíos a Estados Unidos.',

    /* Etiquetas UTM que se agregan a cada clic hacia la tienda */
    utm: {
      source: 'landing-salud',
      medium: 'referral',
      campaign: 'oepm-medicina'
    },

    /* Enlaces directos por categoría (opcional).
       Si dejas un valor vacío, el botón lleva a la portada de la tienda.
       Sustituye por las URLs reales de cada categoría cuando existan:
         'producto-vitaminas': CONFIG.shopUrl + '/categoria/vitaminas'  */
    productLinks: {
      'producto-analgesicos': '',
      'producto-vitaminas': '',
      'producto-digestivo': '',
      'producto-respiratorio': '',
      'producto-dermatologico': '',
      'producto-botiquin': ''
    }
  };

  /* Parámetros publicitarios que se conservan de la campaña a la tienda */
  var TRACKING_PARAMS = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
    'fbclid', 'ttclid', 'gclid', 'msclkid'
  ];

  /* -----------------------------------------------------------
     2. UTILIDADES
     ----------------------------------------------------------- */
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  };

  /**
   * Construye la URL final de la tienda:
   * base + utm propios + parámetros de campaña recibidos en la landing.
   * @param {string} base  URL destino
   * @param {string} label identificador del botón (data-cta)
   */
  function buildShopUrl(base, label) {
    var url;
    try {
      url = new URL(base, window.location.href);
    } catch (err) {
      return base;
    }

    var incoming = new URLSearchParams(window.location.search);

    /* 1) Se respetan los parámetros que trae la campaña */
    TRACKING_PARAMS.forEach(function (key) {
      var value = incoming.get(key);
      if (value) { url.searchParams.set(key, value); }
    });

    /* 2) Si la campaña no los trae, se usan los de CONFIG */
    if (!url.searchParams.get('utm_source')) { url.searchParams.set('utm_source', CONFIG.utm.source); }
    if (!url.searchParams.get('utm_medium')) { url.searchParams.set('utm_medium', CONFIG.utm.medium); }
    if (!url.searchParams.get('utm_campaign')) { url.searchParams.set('utm_campaign', CONFIG.utm.campaign); }

    /* 3) El origen del clic siempre se registra */
    if (label) { url.searchParams.set('utm_content', label); }

    return url.toString();
  }

  /** Envía el evento a las herramientas de medición si existen. */
  function track(eventName, payload) {
    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', eventName, payload);
    }
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, payload);
    }
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(Object.assign({ event: eventName }, payload));
    }
  }

  /* -----------------------------------------------------------
     3. ENLACES A LA TIENDA Y A WHATSAPP
     ----------------------------------------------------------- */
  function initLinks() {
    /* --- Botones "Comprar ahora" --- */
    $$('[data-shop]').forEach(function (link) {
      var label = link.getAttribute('data-cta') || 'cta';
      var custom = CONFIG.productLinks[label];
      var base = custom ? custom : CONFIG.shopUrl;

      link.href = buildShopUrl(base, label);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';

      link.addEventListener('click', function () {
        track('ClicComprarAhora', { origen: label, destino: link.href });
      });
    });

    /* --- Botones de WhatsApp --- */
    var waHref = 'https://wa.me/' + CONFIG.whatsappNumber +
                 '?text=' + encodeURIComponent(CONFIG.whatsappMessage);

    $$('[data-wa]').forEach(function (link) {
      var label = link.getAttribute('data-cta') || 'whatsapp';
      link.href = waHref;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';

      link.addEventListener('click', function () {
        track('ClicWhatsApp', { origen: label });
      });
    });
  }

  /* -----------------------------------------------------------
     4. HEADER: sombra al hacer scroll + menú móvil
     ----------------------------------------------------------- */
  function initHeader() {
    var header = $('#header');
    var burger = $('#burger');
    var menu = $('#mobile-menu');
    if (!header) { return; }

    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    if (!burger || !menu) { return; }

    var closeMenu = function () {
      menu.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Abrir menú');
    };

    burger.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(isOpen));
      burger.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });

    /* Cerrar al elegir una opción, al presionar Escape o al tocar fuera */
    $$('a', menu).forEach(function (a) { a.addEventListener('click', closeMenu); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeMenu(); }
    });

    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && !burger.contains(e.target)) { closeMenu(); }
    });
  }

  /* -----------------------------------------------------------
     5. ACORDEÓN DE PREGUNTAS FRECUENTES (accesible)
     ----------------------------------------------------------- */
  function initFaq() {
    var triggers = $$('.faq__trigger');

    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var item = trigger.closest('.faq__item');
        var isOpen = item.classList.contains('is-open');

        /* Comportamiento acordeón: solo una respuesta abierta */
        triggers.forEach(function (other) {
          other.setAttribute('aria-expanded', 'false');
          other.closest('.faq__item').classList.remove('is-open');
        });

        if (!isOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          track('AbrirPregunta', { pregunta: trigger.textContent.trim() });
        }
      });
    });
  }

  /* -----------------------------------------------------------
     6. BARRA FIJA DE COMPRA EN MÓVIL
        Aparece cuando el hero sale de pantalla y se oculta al
        llegar al CTA final para no duplicar el mensaje.
     ----------------------------------------------------------- */
  function initBuyBar() {
    var bar = $('#buybar');
    var hero = $('#hero');
    var finalCta = $('#comprar');
    if (!bar || !hero) { return; }

    var update = function () {
      var heroPassed = hero.getBoundingClientRect().bottom < 0;
      var atFinal = finalCta
        ? finalCta.getBoundingClientRect().top < window.innerHeight * 0.9
        : false;
      bar.classList.toggle('is-visible', heroPassed && !atFinal);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  /* -----------------------------------------------------------
     7. DETALLES FINALES
     ----------------------------------------------------------- */
  function initMisc() {
    var year = $('#year');
    if (year) { year.textContent = String(new Date().getFullYear()); }
  }

  /* -----------------------------------------------------------
     8. ARRANQUE
     ----------------------------------------------------------- */
  function init() {
    initLinks();
    initHeader();
    initFaq();
    initBuyBar();
    initMisc();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
