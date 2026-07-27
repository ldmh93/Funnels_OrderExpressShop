# Imágenes de la landing

Las imágenes actuales son **fotografías reales**, recortadas a la proporción exacta de
cada bloque y comprimidas para web (JPEG calidad 84).

## Inventario

| Archivo | Dónde se usa | Tamaño | Peso |
|---|---|---|---|
| `hero-salud.jpg` | Hero | 1040 × 1144 | 89 KB |
| `producto-analgesicos.jpg` | Catálogo · dolor y fiebre | 800 × 600 | 45 KB |
| `producto-vitaminas.jpg` | Catálogo · vitaminas | 800 × 600 | 26 KB |
| `producto-digestivo.jpg` | Catálogo · digestivo | 800 × 600 | 42 KB |
| `producto-respiratorio.jpg` | Catálogo · gripe y tos | 800 × 600 | 34 KB |
| `producto-dermatologico.jpg` | Catálogo · piel | 800 × 600 | 46 KB |
| `producto-botiquin.jpg` | Catálogo · botiquín | 800 × 600 | 53 KB |
| `diferencial-acompanamiento.jpg` | Sección «Más fácil, más rápido» | 1000 × 800 | 98 KB |
| `og-image.jpg` | Vista previa al compartir | 1200 × 630 | 78 KB |

Total: **~510 KB** de fotografía en toda la página.

Cada archivo está a **2× del tamaño en que se muestra**, para que se vea nítido en
pantallas retina sin desperdiciar bytes.

---

## Origen y licencia

Todas provienen de **Pexels**, bajo la [Licencia Pexels](https://www.pexels.com/license/):
uso comercial gratuito, **sin necesidad de atribución**, sin registro ni pago.
Lo único prohibido es revender la foto tal cual o usarla para difamar a las personas
que aparecen en ella. Ninguna de las fotos elegidas muestra rostros identificables.

| Archivo | Foto original |
|---|---|
| `hero-salud.jpg` | [Faceless woman demonstrating pills in hand](https://www.pexels.com/photo/faceless-woman-demonstrating-pills-in-hand-6798728/) |
| `producto-analgesicos.jpg` | [Close-Up Photo Of Pills](https://www.pexels.com/photo/close-up-photo-of-pills-3652103/) |
| `producto-vitaminas.jpg` | [White Bottle of Supplements Beside a Glass of Water](https://www.pexels.com/photo/white-bottle-of-supplements-beside-a-glass-of-water-13779107/) |
| `producto-digestivo.jpg` | [Effervescent Tablet Dissolving in a Glass of Water](https://www.pexels.com/photo/effervescent-tablet-dissolving-in-a-glass-of-water-5722880/) |
| `producto-respiratorio.jpg` | [A Person Holding a Spoon with Cough Syrup](https://www.pexels.com/photo/a-person-holding-a-spoon-with-cough-syrup-5858861/) |
| `producto-dermatologico.jpg` | [A Beauty Product on the Table](https://www.pexels.com/photo/a-beauty-product-on-the-table-13794471/) |
| `producto-botiquin.jpg` | [First aid Kit with Medicines and Pills](https://www.pexels.com/photo/first-aid-kit-with-medicines-and-pills-11894049/) |
| `diferencial-acompanamiento.jpg` | [Woman using smartphone for online shopping](https://www.pexels.com/photo/woman-using-smartphone-for-online-shopping-6331237/) |

`og-image.jpg` se compone con la foto del hero + el velo magenta y la tipografía de
la marca.

> **Recomendación:** son fotos de stock, así que otras marcas pueden estar usando las
> mismas. En cuanto tengas fotografía propia de tu catálogo, sustitúyelas: es lo que
> más diferencia a una tienda seria de una improvisada.

---

## Cómo cambiarlas por fotos propias

1. Exporta cada foto respetando la proporción de la tabla
   (hero **0.909 : 1**, tarjetas **4 : 3**, diferencial **5 : 4**).
2. Guárdala aquí con el **mismo nombre** de archivo. No hay que tocar el HTML.
3. Si cambias el tamaño en píxeles, actualiza `width` y `height` en
   `index.html` para que sigan coincidiendo: eso es lo que evita que el diseño
   "salte" al cargar (CLS).
4. Actualiza el `alt` describiendo lo que se ve en la foto nueva.

### Si quieres WebP (≈30 % menos peso)

```html
<picture>
  <source srcset="assets/images/hero-salud.webp" type="image/webp">
  <img src="assets/images/hero-salud.jpg" alt="..." width="1040" height="1144">
</picture>
```

Convierte con [Squoosh](https://squoosh.app) o con `cwebp -q 80 entrada.jpg -o salida.webp`.
El JPEG se queda como respaldo.

---

## Estilo fotográfico

Manos, piel real y producto en primer plano; luz suave, fondo claro y desenfocado.
En el hero, deja aire en la esquina superior derecha: ahí cae el pétalo magenta.

## `ilustraciones-svg/`

Las ilustraciones vectoriales que tenía la landing antes de las fotos. Se conservan
por si quieres volver a un estilo ilustrado o usarlas en redes.
