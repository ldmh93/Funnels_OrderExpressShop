/* ==========================================================================
   OEM SHOP · main.js
   Configuración de la tienda, enrutado de los CTA, header, menú móvil y
   barra de compra flotante.

   ⚠️  ÚNICO ARCHIVO QUE HAY QUE EDITAR PARA CONECTAR LA TIENDA:
       ajusta OEM_CONFIG.urlTienda (y opcionalmente enlacesProducto).
   ========================================================================== */

(function () {
  "use strict";

  /* ======================================================================
     1. CONFIGURACIÓN
     ====================================================================== */

  /* Valor de ejemplo: si urlTienda vuelve a quedarse en esto, la consola avisa. */
  var URL_SIN_CONFIGURAR = "https://oemshop.mx/tienda";

  var OEM_CONFIG = {
    /* Tienda OEM Shop. Todos los botones "Comprar ahora" apuntan aquí. */
    urlTienda: "https://nube-store-pi.vercel.app",

    /* Enlace directo por producto. Si un producto no está en esta lista,
       el botón usa urlTienda. La clave es el data-producto de la tarjeta.
       Mientras siga vacío, TODOS los botones van a la tienda general. */
    enlacesProducto: {
      // morelianas:  "https://nube-store-pi.vercel.app/producto/morelianas",
      // cocadas:     "https://nube-store-pi.vercel.app/producto/cocadas",
      // ate:         "https://nube-store-pi.vercel.app/producto/ate-de-membrillo",
      // alegrias:    "https://nube-store-pi.vercel.app/producto/alegrias",
      // jamoncillo:  "https://nube-store-pi.vercel.app/producto/jamoncillo",
      // palanqueta:  "https://nube-store-pi.vercel.app/producto/palanqueta",
    },

    /* Parámetros de campaña que se añaden a cada salida hacia la tienda.
       Permiten medir en la tienda qué CTA de la landing generó la venta. */
    utm: {
      utm_source: "landing",
      utm_medium: "referral",
      utm_campaign: "dulces-michoacanos",
    },

    /* Si el visitante llega desde un anuncio con sus propios utm_*, se
       conservan y tienen prioridad sobre los de arriba (atribución real). */
    heredarUtmDeLaUrl: true,

    /* Abrir la tienda en una pestaña nueva. false = misma pestaña
       (recomendado para no romper el flujo de compra en móvil). */
    abrirEnPestanaNueva: false,
  };

  /* Se expone para poder inspeccionarlo o sobreescribirlo desde consola. */
  window.OEM_CONFIG = OEM_CONFIG;

  /* ======================================================================
     2. UTILIDADES
     ====================================================================== */

  function $(sel, ctx) {
    return (ctx || document).querySelector(sel);
  }

  function $$(sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  }

  /**
   * Construye la URL de salida hacia OEM Shop.
   * @param {string} base    URL destino (producto o tienda general).
   * @param {string} origen  Identificador del CTA que se pulsó.
   * @returns {string}
   */
  function construirUrl(base, origen) {
    var url;

    try {
      url = new URL(base, window.location.href);
    } catch (e) {
      // Si la URL configurada no es válida, se devuelve tal cual.
      return base;
    }

    // 1) utm_* por defecto de la landing
    Object.keys(OEM_CONFIG.utm).forEach(function (clave) {
      url.searchParams.set(clave, OEM_CONFIG.utm[clave]);
    });

    // 2) utm_* que traiga el visitante desde el anuncio (tienen prioridad)
    if (OEM_CONFIG.heredarUtmDeLaUrl) {
      var entrada = new URLSearchParams(window.location.search);
      entrada.forEach(function (valor, clave) {
        if (/^(utm_|gclid|fbclid|ttclid|msclkid)/.test(clave)) {
          url.searchParams.set(clave, valor);
        }
      });
    }

    // 3) Qué botón concreto originó el clic
    if (origen) url.searchParams.set("utm_content", origen);

    return url.toString();
  }

  /* ======================================================================
     3. ENRUTADO DE LOS CTA
     Cada elemento con [data-cta] se convierte en un enlace a la tienda.
     data-cta      → identificador del punto de conversión (para medir)
     data-producto → (opcional) clave dentro de OEM_CONFIG.enlacesProducto
     ====================================================================== */

  function conectarCTAs() {
    var botones = $$("[data-cta]");

    botones.forEach(function (el) {
      var origen = el.getAttribute("data-cta");
      var producto = el.getAttribute("data-producto");
      var destino =
        (producto && OEM_CONFIG.enlacesProducto[producto]) ||
        OEM_CONFIG.urlTienda;

      el.href = construirUrl(destino, origen);
      el.setAttribute("rel", "noopener");

      if (OEM_CONFIG.abrirEnPestanaNueva) {
        el.setAttribute("target", "_blank");
      }

      // Hook de analítica: dispara un evento antes de salir de la página.
      el.addEventListener("click", function () {
        if (typeof window.dataLayer !== "undefined") {
          window.dataLayer.push({
            event: "cta_comprar",
            cta_origen: origen,
            cta_producto: producto || null,
          });
        }
      });
    });

    // Aviso en consola si la tienda todavía no está conectada.
    if (OEM_CONFIG.urlTienda === URL_SIN_CONFIGURAR) {
      console.warn(
        "[OEM Shop] urlTienda sigue con el valor de ejemplo. " +
          "Edita js/main.js → OEM_CONFIG.urlTienda con la URL real de la tienda."
      );
    }

    return botones.length;
  }

  /* ======================================================================
     4. HEADER: fondo sólido al hacer scroll
     ====================================================================== */

  function conectarHeader() {
    var header = $(".header");
    if (!header) return;

    var activo = false;

    function actualizar() {
      var debeActivarse = window.scrollY > 40;
      if (debeActivarse !== activo) {
        activo = debeActivarse;
        header.classList.toggle("header--fijo", activo);
      }
    }

    actualizar();
    window.addEventListener("scroll", actualizar, { passive: true });
  }

  /* ======================================================================
     5. MENÚ MÓVIL
     ====================================================================== */

  function conectarMenu() {
    var boton = $(".hamburguesa");
    var nav = $("#nav-principal");
    if (!boton || !nav) return;

    function cerrar() {
      nav.classList.remove("nav--abierta");
      boton.setAttribute("aria-expanded", "false");
    }

    boton.addEventListener("click", function () {
      var abierta = nav.classList.toggle("nav--abierta");
      boton.setAttribute("aria-expanded", abierta ? "true" : "false");
    });

    // Cerrar al pulsar un enlace del menú
    $$("a", nav).forEach(function (a) {
      a.addEventListener("click", cerrar);
    });

    // Cerrar con Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") cerrar();
    });

    // Cerrar al volver a escritorio
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) cerrar();
    });
  }

  /* ======================================================================
     6. BARRA DE COMPRA FLOTANTE (móvil)
     Aparece cuando el hero sale de pantalla y se esconde al llegar al
     CTA final, para no duplicar el mismo botón.
     ====================================================================== */

  function conectarCtaFlotante() {
    var barra = $(".cta-flotante");
    var hero = $(".hero");
    var cierre = $("#comprar");
    if (!barra || !hero || !("IntersectionObserver" in window)) return;

    var fueraDelHero = false;
    var enElCierre = false;

    function actualizar() {
      barra.classList.toggle(
        "cta-flotante--visible",
        fueraDelHero && !enElCierre
      );
    }

    new IntersectionObserver(
      function (entradas) {
        fueraDelHero = !entradas[0].isIntersecting;
        actualizar();
      },
      { threshold: 0, rootMargin: "-120px 0px 0px 0px" }
    ).observe(hero);

    if (cierre) {
      new IntersectionObserver(
        function (entradas) {
          enElCierre = entradas[0].isIntersecting;
          actualizar();
        },
        { threshold: 0.15 }
      ).observe(cierre);
    }
  }

  /* ======================================================================
     7. DETALLES MENORES
     ====================================================================== */

  function conectarVarios() {
    // Año actual en el footer
    var anio = $("[data-anio]");
    if (anio) anio.textContent = new Date().getFullYear();
  }

  /* ======================================================================
     8. ARRANQUE
     ====================================================================== */

  function iniciar() {
    conectarCTAs();
    conectarHeader();
    conectarMenu();
    conectarCtaFlotante();
    conectarVarios();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
