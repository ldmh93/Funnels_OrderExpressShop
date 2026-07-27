# OEM Shop · Landing Page

Landing de alta conversión para **OEM Shop (Order Express Shop)**, venta en línea
de dulces típicos michoacanos. Pensada como destino de anuncios de Instagram,
Facebook y TikTok: continúa el lenguaje visual del post y empuja al usuario a
un único objetivo, **Comprar ahora**, redirigiendo a la tienda OEM Shop.

HTML5 + CSS3 + JavaScript vanilla. Sin frameworks, sin dependencias, sin build.

---

## 🚀 Cómo verla

Abre `index.html` en el navegador. Ya está.

Para trabajar con ella conviene un servidor local (evita restricciones de
`file://` en algunos navegadores):

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Luego visita <http://localhost:8000>.

---

## 🛒 La tienda (ya conectada)

Los **16 botones** de la página apuntan a:

```
https://nube-store-pi.vercel.app
```

Se configura en un solo sitio, **`js/main.js`**:

```js
var OEM_CONFIG = {
  urlTienda: "https://nube-store-pi.vercel.app",
```

No hay que tocar el HTML: cada botón lleva `data-cta="..."` y el script les
escribe el `href` solo. Para cambiar de tienda, esa línea y ya.

**Enlaces por producto (opcional).** Ahora mismo los seis botones "Comprar" del
catálogo van a la tienda general. Si cada dulce llega a tener su propia ficha,
descomenta y completa el mapa:

```js
enlacesProducto: {
  morelianas: "https://nube-store-pi.vercel.app/producto/morelianas",
  cocadas:    "https://nube-store-pi.vercel.app/producto/cocadas",
  // …
},
```

La clave debe coincidir con el `data-producto` de la tarjeta en `index.html`.
Si un producto no está en la lista, su botón usa `urlTienda`.

---

## ⚠️ Lo que sigue pendiente antes de publicar

### 1. Cambiar el dominio en el SEO

En `index.html` sustituye `https://oemshop.mx/` por el dominio real en:
`<link rel="canonical">`, `og:url`, `og:image`, `twitter:image` y en el bloque
JSON-LD. Open Graph exige **URL absoluta**: con ruta relativa no se ve la
miniatura al compartir en WhatsApp o Facebook.

### 2. Sustituir los testimonios

Los tres testimonios de la sección *Opiniones* son **texto de ejemplo**, están
marcados como tal con un comentario en el HTML. Reemplázalos por opiniones
reales antes de publicar.

Por la misma razón, el JSON-LD **no incluye `Review` ni `AggregateRating`**:
publicar valoraciones inventadas como datos estructurados es motivo de sanción
manual de Google además de ser publicidad engañosa. Añade ese bloque cuando
tengas reseñas verificables.

---

## 📊 Medición: de dónde vino cada venta

Cada salida hacia la tienda se etiqueta sola. Ejemplo real de un usuario que
llegó desde un reel de Instagram y pulsó el botón del hero:

```
https://tienda.com/?utm_source=instagram
                   &utm_medium=referral
                   &utm_campaign=reel_dulces_oct
                   &fbclid=ABC123
                   &utm_content=hero-principal
```

- Los `utm_*` **del anuncio tienen prioridad** sobre los que trae la landing por
  defecto, así que la atribución real no se pierde.
- `fbclid`, `gclid`, `ttclid` y `msclkid` se conservan.
- `utm_content` identifica **qué botón concreto** se pulsó, lo que permite ver
  qué punto de conversión funciona mejor.

Puntos de conversión disponibles: `nav`, `header`, `hero-principal`, `catalogo`
(uno por producto), `post-catalogo`, `historia`, `paquete`, `cierre`,
`flotante`, `footer`, `footer-paquete`.

Si usas Google Tag Manager, cada clic empuja un evento a `dataLayer`:

```js
{ event: "cta_comprar", cta_origen: "hero-principal", cta_producto: null }
```

---

## 📁 Estructura

```
oem-shop-landing/
├── index.html              Página completa (8 secciones + sprite de iconos)
├── assets/
│   ├── images/
│   │   ├── dulces-canasta.png      Foto del hero, sin fondo (LCP)
│   │   ├── seccion-historia.jpg    Foto sección "Nuestra historia"
│   │   ├── seccion-cierre.jpg      Foto del CTA final
│   │   ├── og-image.jpg            1200×630 para redes sociales
│   │   ├── producto-morelianas.jpg ┐
│   │   ├── producto-cocadas.jpg    │
│   │   ├── producto-ate.jpg        │ Fotos del catálogo
│   │   ├── producto-alegrias.jpg   │ (700×700, una por tarjeta)
│   │   ├── producto-jamoncillo.jpg │
│   │   └── producto-palanqueta.jpg ┘
│   │   └── ilustraciones/          Versión ilustrada, ya sin usar
│   │       └── dulce-*.svg         (ver "Sobre las imágenes")
│   ├── icons/
│   │   └── favicon.svg
│   └── logo/
│       ├── oem-shop-logo.svg          Fucsia (color de marca)
│       ├── oem-shop-logo-blanco.svg   Para fondos azules
│       ├── oem-shop-logo-azul.svg     Para fondos claros
│       └── oem-shop-isotipo.svg       Solo el camión + "OE"
├── css/
│   ├── variables.css       Tokens: color, tipografía, espaciado, motion
│   ├── components.css      Botones, tarjetas, badges, encabezados
│   └── style.css           Reset, layout, secciones, responsive
├── js/
│   ├── main.js             Configuración, CTAs, header, menú, CTA flotante
│   └── animations.js       Scroll reveal, paralaje, microinteracciones
└── README.md
```

El orden de carga del CSS importa: `variables` → `components` → `style`.

---

## 🎨 Identidad visual

Los colores se muestrearon píxel a píxel del post original para que la
transición anuncio → landing sea exacta.

| Token | Valor | Uso |
|---|---|---|
| `--c-azul` | `#262858` | Fondos principales, encabezados, secciones premium |
| `--c-rosa` | `#dd1766` | **Botones CTA**, destacados, promociones |
| `--c-rosa-profundo` | `#d4126b` | Formas orgánicas del fondo |
| `--c-crema` | `#e5cfc1` | Fondos cálidos, sensación artesanal |
| `--c-blanco` | `#ffffff` | Tarjetas, espacios limpios |

**Tipografía:** Fredoka (títulos, redondeada y cercana) + Poppins (texto).

**Formas:** todo curvo. `--r-blob` genera el `border-radius` orgánico que usan
las fotos y las manchas de color, el mismo recurso gráfico del anuncio.

Para cambiar cualquier cosa de la identidad, edita **solo** `variables.css`.

---

## 🖼️ Sobre las imágenes

**La foto del hero** (`dulces-canasta.png`) es una foto de producto a la que se
le quitó el fondo blanco, de modo que la canasta flota sobre el óvalo crema
igual que en el arte del anuncio. El recorte se hizo con relleno por inundación
desde los bordes, para no perforar los dulces blancos del interior de la
canasta.

Como la imagen tiene transparencia, la sombra **no** puede ser `box-shadow`
(dibujaría la caja rectangular): se usa `filter: drop-shadow()`, que sigue la
silueta real del producto.

⚠️ **Licencia.** El archivo original venía de Depositphotos
(`depositphotos_521935726…`, 600×399, una previsualización). Antes de publicar,
confirma que tienes licencia comercial para esa imagen o cámbiala por
fotografía propia. Usar una vista previa de stock en una landing comercial es
infracción de derechos de autor.

**Las fotos del catálogo y de las dos secciones** salen de las originales que
están en `fotos productos/` (fuera de esta carpeta, junto al proyecto). Se
recortaron a cuadrado centrando cada dulce y se redimensionaron a 700×700.

Las dos fotos de sección usan **encuadre ancho** de tomas que en el catálogo
aparecen en cuadrado cerrado: al cambiar la proporción y mostrar el entorno
completo (sarape, talavera, plato) no se leen como repetidas.

| Archivo | Origen |
|---|---|
| `producto-morelianas.jpg` | `morelianas.jpg` |
| `producto-cocadas.jpg` | `cocada.jpeg` |
| `producto-ate.jpg` | `Ate.jpg` |
| `producto-alegrias.jpg` | `alegrias.jpeg` |
| `producto-jamoncillo.jpg` | `jamoncillo.jpeg` |
| `producto-palanqueta.jpg` | `palanqueta.jpeg` |
| `seccion-historia.jpg` | `jamoncillo.jpeg` (encuadre 3:2) |
| `seccion-cierre.jpg` | `alegrias.jpeg` (encuadre 16:11) |

**Las ilustraciones SVG** que se usaron antes de tener fotografía quedaron en
`assets/images/ilustraciones/`. Ya no las carga nadie, pero ahí están por si
hace falta volver a una tarjeta ilustrada — incluida `dulce-obleas.svg`.

**Obleas ya no está en el catálogo.** No llegó foto de ese dulce, así que su
lugar lo tomó **Palanqueta**. Para recuperarla: añade `obleas.jpg` a
`fotos productos/`, duplica un bloque `<article class="producto">` y ajusta
imagen, nombre, descripción y `data-producto`.

**WebP: la mejora de rendimiento más rentable que queda.** En este equipo no
había codificador disponible, así que las fotos son JPEG optimizado (52–83 KB)
y el hero es PNG (210 KB, obligado por la transparencia).

Ese PNG es el elemento **LCP** de la página, así que es el que más conviene
convertir: WebP con canal alfa deja la misma imagen en unos 50 KB, cuatro veces
menos.

```bash
cwebp -q 84 -alpha_q 90 assets/images/dulces-canasta.png -o assets/images/dulces-canasta.webp
for f in assets/images/producto-*.jpg assets/images/seccion-*.jpg; do
  cwebp -q 82 "$f" -o "${f%.jpg}.webp"
done
```

Después envuelve cada `<img>` en un `<picture>` con el original como respaldo, y
acuérdate de apuntar también el `<link rel="preload">` del `<head>` al `.webp`.
Los SVG no necesitan conversión.

**Añadir un séptimo producto:** ya tienes `dulce-palanqueta.svg` lista. Copia
un bloque `<article class="producto">` completo en el catálogo y cambia imagen,
nombre, descripción y `data-producto`. La rejilla se reacomoda sola.

---

## ⚡ Rendimiento

- **Cero dependencias.** Ni jQuery, ni AOS, ni GSAP, ni Bootstrap. Todo el JS
  son ~9 KB sin minificar entre los dos archivos.
- **Iconos en sprite SVG inline:** 11 iconos, 0 peticiones extra, heredan color.
- La imagen del hero lleva `rel="preload"` + `fetchpriority="high"` (es el LCP).
- El resto de imágenes usan `loading="lazy"` y `decoding="async"`.
- Todas las imágenes declaran `width`/`height` y `aspect-ratio` → **CLS ≈ 0**.
- Solo se animan `transform` y `opacity` (propiedades de compositor).
- El paralaje se calcula dentro de `requestAnimationFrame` y se apaga cuando el
  hero sale de pantalla.
- Los observers hacen `unobserve` tras revelar cada elemento.

**Antes de medir en PageSpeed**, súbela a un servidor real: en `file://` los
resultados no son representativos. Para exprimir más:
minifica CSS/JS, sirve con Brotli, y autoaloja las dos fuentes (evita el
`preconnect` a Google Fonts, que es el mayor coste de red que queda).

---

## ♿ Accesibilidad

- HTML semántico: `header`, `nav`, `main`, `section`, `article`, `footer`.
- Enlace "Saltar al contenido" para navegación por teclado.
- Menú móvil con `aria-expanded` / `aria-controls`, cierre con `Escape`.
- Foco visible en todos los interactivos (`:focus-visible`).
- `alt` descriptivo en todas las imágenes; las decorativas van con
  `aria-hidden="true"`.
- **`prefers-reduced-motion`**: si el sistema lo pide, no se anima nada y todo
  el contenido se muestra directamente.
- Sin JavaScript la página se ve completa (clase `.sin-js`) y los botones caen
  al ancla `#comprar` en lugar de quedarse muertos.

---

## 📱 Responsive

Mobile first, verificado a 390 px, 768 px, 1024 px y 1440 px.

| Punto de ruptura | Qué cambia |
|---|---|
| `≤ 1024px` | Hero, historia y cierre pasan a una columna; imagen arriba |
| `≤ 860px`  | Menú hamburguesa; aparece la barra de compra flotante |
| `≤ 560px`  | Botones a ancho completo; se oculta la pastilla secundaria |

La **barra de compra flotante** en móvil aparece al salir del hero y se esconde
al llegar al CTA final, para no mostrar dos veces el mismo botón.

---

## 🌐 Compatibilidad

Chrome, Edge, Firefox, Safari e iOS Safari en versiones actuales.
Usa `IntersectionObserver`, `URLSearchParams` y propiedades personalizadas CSS;
en navegadores sin soporte el contenido se muestra sin animación (degradación
elegante, nunca pantalla en blanco).

---

## 📝 Nota sobre la marca

Los archivos de logotipo entregados (`Recurso 1.svg` / `Recurso 2.svg`) dibujan
la palabra **OEPM**. El brief pedía «OEM Shop (Order Express Shop)», así que se
usó el logotipo tal cual viene y **OEM Shop** en los textos, meta etiquetas y
datos estructurados.

Si la marca es realmente **OEPM Shop**, es un buscar-y-reemplazar de `OEM Shop`
→ `OEPM Shop` en `index.html` y este README. Conviene confirmarlo antes de
publicar, porque afecta al `<title>`, al Open Graph y al Schema.org.

---

## ✅ Checklist antes de publicar

- [ ] `OEM_CONFIG.urlTienda` apunta a la tienda real
- [ ] Enlaces por producto configurados (si aplica)
- [ ] Dominio real en `canonical`, `og:url`, `og:image` y JSON-LD
- [ ] Testimonios reales sustituyendo los de ejemplo
- [ ] Confirmado si la marca es OEM Shop u OEPM Shop
- [ ] **Licencia comercial de la foto del hero** (viene de Depositphotos)
- [ ] Fotografía profesional en lugar de los recortes del post
- [ ] Hero convertido a WebP (es el LCP y hoy pesa 210 KB)
- [ ] Precios añadidos al JSON-LD (`offers`) si ya existen
- [ ] Probado un clic real de cada CTA hacia el checkout
- [ ] Píxel de Meta / TikTok y Google Analytics instalados
- [ ] Medido en PageSpeed Insights ya subida al servidor
