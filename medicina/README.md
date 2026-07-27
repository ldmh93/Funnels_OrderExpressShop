# OEPM SHOP · Landing de medicamentos y productos de salud

Landing page de alta conversión para campañas de Facebook, Instagram y TikTok Ads.
El objetivo del sitio es uno solo: llevar al visitante a **comprar en la tienda
OEPM Shop**.

```
Anuncio → Landing → Conoce productos → «Comprar ahora» → Tienda OEPM Shop → Compra
```

> **Proyecto independiente.** No comparte código, estilos ni assets con la landing de
> dulces típicos (`oem-shop-landing/`). Vive completo dentro de esta carpeta.

---

## 1. Cómo verla

**Opción rápida:** doble clic en `index.html`.
El sprite de iconos va incrustado en el HTML justo para que esto funcione.

**Opción recomendada** (así se comporta igual que en producción):

```bash
# Python
python -m http.server 5500

# o Node
npx serve .
```

Luego abre `http://localhost:5500`.

---

## 2. Estructura

```
OEM-MEDICINA-LANDING/
├── index.html                  Todo el contenido, HTML semántico + datos estructurados
├── css/
│   ├── variables.css           Tokens de marca (colores, tipografía, espaciado)
│   ├── components.css          Botones, tarjetas, pasos, acordeón, testimonios
│   └── style.css               Base, layout, secciones, animaciones, responsive
├── js/
│   ├── main.js                 CONFIG, enlaces a tienda/WhatsApp, menú, FAQ, buybar
│   └── animations.js           Reveal al scroll, contadores, parallax suave
├── assets/
│   ├── branding/ejemplos-branding-medicina/   Referencias visuales + lectura del branding
│   ├── images/                 Ilustraciones SVG y og-image
│   ├── icons/icons.svg         Sprite de iconos (versión reutilizable)
│   └── logo/                   Logotipo oficial en magenta, blanco, isotipo y favicon
└── README.md
```

---

## 3. Lo primero que debes editar

Todo lo configurable está en el bloque `CONFIG` al inicio de **`js/main.js`**:

| Campo | Para qué sirve | Valor actual |
|---|---|---|
| `shopUrl` | Destino de todos los botones «Comprar ahora» | `https://nube-store-pi.vercel.app` |
| `whatsappNumber` | Número de atención, solo dígitos con lada país | `520000000000` ← **cámbialo** |
| `whatsappMessage` | Mensaje precargado del chat | listo |
| `utm.*` | Etiquetas de campaña por defecto | `landing-salud` / `referral` / `oepm-medicina` |
| `productLinks` | Enlace directo por categoría (opcional) | vacío → van a la portada de la tienda |

Ejemplo para enlazar una categoría concreta:

```js
productLinks: {
  'producto-vitaminas': 'https://nube-store-pi.vercel.app/categoria/vitaminas'
}
```

También conviene revisar en `index.html`:

- El dominio de `canonical`, `og:url` y `og:image` (hoy `https://oemshop.mx/salud/`).
- El correo de contacto del footer (`hola@oemshop.mx`).

---

## 4. Cómo funcionan los CTA

Cualquier enlace con el atributo `data-shop` se convierte automáticamente en un
botón a la tienda:

```html
<a class="btn btn--primary" data-shop data-cta="hero" href="#">Comprar ahora</a>
```

`js/main.js` se encarga de:

1. Poner la URL final (categoría específica o portada de la tienda).
2. Abrirla en pestaña nueva con `rel="noopener noreferrer"`.
3. **Conservar los parámetros de la campaña** (`utm_*`, `fbclid`, `ttclid`, `gclid`,
   `msclkid`) que traiga el visitante desde el anuncio, y agregar `utm_content` con el
   valor de `data-cta`. Así sabes en la tienda qué botón generó cada venta.
4. Disparar el evento de medición si existe `fbq`, `gtag` o `dataLayer`.

Lo mismo aplica a `data-wa` para los botones de WhatsApp.

### Puntos de conversión en la página

`header` · `hero` · `menu-movil` · 6 botones de catálogo · `envios-whatsapp` ·
`diferencial` · `cta-final` · `buybar` (barra fija en móvil) · `wa-flotante` · footer.

---

## 5. Secciones

1. **Hero** — titular, beneficio, doble CTA y sellos de confianza.
2. **Confianza** — 4 tarjetas + banda de datos con contadores animados.
3. **Catálogo** — 6 categorías de venta libre, cada una con su «Comprar ahora».
4. **Envíos a USA** — proceso en 4 pasos sobre fondo oscuro + consulta por WhatsApp.
5. **Diferencial** — bloque emocional «Más fácil, más rápido, más cerca de ti».
6. **Testimonios** — prueba social con 5 estrellas.
7. **FAQ** — acordeón accesible, replicado en `schema.org/FAQPage`.
8. **CTA final** — cierre magenta a pantalla completa.

---

## 6. Branding aplicado

Extraído del logotipo oficial y del post de referencia que está en
`assets/branding/ejemplos-branding-medicina/` (ahí hay una lectura detallada):

- **Magenta `#dd1766`** tomado del propio SVG del logo.
- **Tinta `#2b2a4a`** para texto y bloques oscuros.
- **Poppins** itálica bold en mayúsculas para titulares.
- **Pétalos orgánicos** (`.blob`) y **franjas diagonales** (`.slash`) en magenta pleno.
- **Botones píldora** con sombra de color, como el del post.
- Fotos con una esquina de radio grande.

Para cambiar la marca completa basta con tocar `css/variables.css`.

---

## 7. Rendimiento y SEO

Ya implementado:

- HTML semántico (`header`, `main`, `section`, `article`, `nav`, `footer`).
- Meta title, description, keywords, canonical, Open Graph y Twitter Card.
- Datos estructurados: `OnlineStore`, `WebSite` y `FAQPage`.
- `alt` descriptivo en todas las imágenes; `width`/`height` para evitar CLS.
- `loading="lazy"` y `decoding="async"` en todo lo que está bajo el pliegue;
  `fetchpriority="high"` en la imagen del hero.
- Fotografía real recortada a la proporción exacta de cada bloque, a 2× para
  pantallas retina: **~510 KB en toda la página** (ver `assets/images/LEEME.md`).
- Fuentes con `preconnect` + carga no bloqueante y `display=swap`.
- CSS y JS propios, sin frameworks (≈ 40 KB en total, sin minificar).
- Respeto de `prefers-reduced-motion` y foco visible en todos los interactivos.

Antes de publicar:

1. Sube por HTTPS con compresión gzip/brotli y caché larga en `assets/`.
2. Opcional: convierte las fotos a WebP para bajar ~30 % el peso
   (receta en `assets/images/LEEME.md`).
3. Corre Lighthouse en móvil; el objetivo es 90+ en las cuatro categorías.

---

## 8. Comunicación responsable

La landing habla de **productos de venta libre, vitaminas y cuidado personal**.
De forma deliberada:

- No promete resultados médicos ni cura de enfermedades.
- Aclara que la información es comercial y no sustituye la consulta médica.
- Indica que los productos que requieren receta no se venden por este canal.
- Señala que el envío internacional depende de la normativa aduanal aplicable.

Estos avisos están en la sección de catálogo, en el FAQ y en el footer.
**Consulta con tu asesor legal antes de publicar campañas pagadas**: las plataformas
de anuncios y la regulación de exportación de productos farmacéuticos tienen
requisitos propios para esta categoría.

---

## 9. Pendientes para producción

- [ ] Número real de WhatsApp en `CONFIG.whatsappNumber`.
- [ ] URLs reales por categoría en `CONFIG.productLinks`.
- [ ] Dominio definitivo en `canonical` y Open Graph.
- [ ] Sustituir las fotos de stock (Pexels) por fotografía propia del catálogo
      cuando la tengas: mismos nombres de archivo, misma proporción.
- [ ] Pixel de Meta / TikTok y Google Analytics (los eventos ya están listos).
- [ ] Testimonios reales con autorización de los clientes.
- [ ] Aviso de privacidad y términos, enlazados desde el footer.
