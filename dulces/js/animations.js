/* ==========================================================================
   OEM SHOP · animations.js
   Microinteracciones y animación de entrada al hacer scroll.

   Reglas:
   · Todo es progresivo: sin JS la página se ve completa (clase .sin-js).
   · Se respeta prefers-reduced-motion: si el usuario pide menos movimiento,
     el script no anima nada.
   · Solo se anima transform y opacity (propiedades baratas para el
     compositor) para no dañar los Core Web Vitals.
   ========================================================================== */

(function () {
  "use strict";

  var raiz = document.documentElement;
  var menosMovimiento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ======================================================================
     1. SCROLL REVEAL
     Los elementos con [data-reveal] aparecen al entrar en pantalla.
     Si además están dentro de un contenedor [data-reveal-grupo], la
     aparición se escalona automáticamente.
     ====================================================================== */

  function revelarAlHacerScroll() {
    var elementos = Array.prototype.slice.call(
      document.querySelectorAll("[data-reveal]")
    );

    if (!elementos.length) return;

    // Sin soporte de IntersectionObserver: se muestra todo de golpe.
    if (!("IntersectionObserver" in window)) {
      elementos.forEach(function (el) {
        el.classList.add("es-visible");
      });
      return;
    }

    // Cascada dentro de cada grupo (tarjetas de una misma rejilla)
    document
      .querySelectorAll("[data-reveal-grupo]")
      .forEach(function (grupo) {
        var hijos = grupo.querySelectorAll("[data-reveal]");
        Array.prototype.forEach.call(hijos, function (hijo, i) {
          hijo.style.setProperty("--retraso", i * 90 + "ms");
        });
      });

    var observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) return;
          entrada.target.classList.add("es-visible");
          // Una sola vez: se deja de observar para ahorrar trabajo.
          observador.unobserve(entrada.target);
        });
      },
      {
        threshold: 0.12,
        // Se dispara un poco antes de que el elemento toque el borde.
        rootMargin: "0px 0px -8% 0px",
      }
    );

    elementos.forEach(function (el) {
      observador.observe(el);
    });
  }

  /* ======================================================================
     2. PARALAJE SUAVE DE LAS FORMAS DEL HERO
     Las manchas orgánicas se mueven un poco más lento que el scroll.
     Se calcula dentro de requestAnimationFrame para no bloquear el hilo.
     ====================================================================== */

  function paralajeHero() {
    var capas = Array.prototype.slice.call(
      document.querySelectorAll("[data-paralaje]")
    );

    if (!capas.length) return;

    var pendiente = false;

    function pintar() {
      var y = window.scrollY;

      capas.forEach(function (capa) {
        var factor = parseFloat(capa.getAttribute("data-paralaje")) || 0.15;
        capa.style.transform = "translate3d(0," + y * factor + "px,0)";
      });

      pendiente = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        // Se deja de calcular cuando el hero ya no está a la vista.
        if (window.scrollY > window.innerHeight * 1.2) return;
        if (pendiente) return;
        pendiente = true;
        window.requestAnimationFrame(pintar);
      },
      { passive: true }
    );
  }

  /* ======================================================================
     3. INCLINACIÓN SUAVE DE LAS TARJETAS DE PRODUCTO
     Efecto sutil de seguimiento del cursor. Solo en dispositivos con
     puntero fino (ratón); en táctil no aporta nada y gasta batería.
     ====================================================================== */

  function inclinarTarjetas() {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    var tarjetas = document.querySelectorAll(".producto");

    Array.prototype.forEach.call(tarjetas, function (tarjeta) {
      tarjeta.addEventListener("mousemove", function (e) {
        var caja = tarjeta.getBoundingClientRect();
        var x = (e.clientX - caja.left) / caja.width - 0.5;
        var y = (e.clientY - caja.top) / caja.height - 0.5;

        tarjeta.style.transform =
          "translateY(-8px) rotateX(" +
          (-y * 4).toFixed(2) +
          "deg) rotateY(" +
          (x * 4).toFixed(2) +
          "deg)";
      });

      tarjeta.addEventListener("mouseleave", function () {
        // Se devuelve el control al CSS (:hover)
        tarjeta.style.transform = "";
      });
    });
  }

  /* ======================================================================
     4. ARRANQUE
     ====================================================================== */

  function iniciar() {
    // Marca que el JS está activo (style.css usa .sin-js como respaldo)
    raiz.classList.remove("sin-js");

    if (menosMovimiento) {
      // Movimiento reducido: se muestra todo, sin animaciones.
      document
        .querySelectorAll("[data-reveal]")
        .forEach(function (el) {
          el.classList.add("es-visible");
        });
      return;
    }

    revelarAlHacerScroll();
    paralajeHero();
    inclinarTarjetas();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
