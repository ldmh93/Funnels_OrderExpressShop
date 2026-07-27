# Ejemplos de branding · línea de medicina

Esta carpeta es la **fuente de verdad visual** de la landing.
Todo lo que se diseñe debe verse como una extensión directa de estas piezas.

## Archivos actuales

| Archivo | Qué es |
|---|---|
| `referencia-post-delivery-service.jpeg` | Post «Delivery Service · Just in time!» en sus dos formatos (cuadrado y story). Es la pieza base del branding de la línea de salud. |

> Para sumar más referencias, coloca aquí los JPG/PNG/PDF y actualiza esta tabla.

---

## Lectura del branding aplicada a la landing

### 1. Paleta

| Rol | Color | Token en `css/variables.css` |
|---|---|---|
| Magenta de marca (el del logotipo oficial) | `#dd1766` | `--c-magenta` |
| Magenta luz (degradados) | `#ff3d8a` | `--c-magenta-400` |
| Magenta profundo (hover / sombra) | `#b01050` · `#9e0c3f` | `--c-magenta-600/700` |
| Rosa tinte (fondos suaves) | `#fff2f7` · `#ffd9e7` | `--c-magenta-050/100` |
| Tinta azul-violeta (texto y bloques oscuros) | `#2b2a4a` | `--c-ink` |
| Blanco | `#ffffff` | `--c-white` |

El magenta se toma directamente del SVG del logotipo (`fill: #dd1766`), no de una
muestra aproximada de la imagen.

### 2. Tipografía

La referencia usa una geométrica **bold itálica en mayúsculas** para el titular
(«DELIVERY SERVICE»), una itálica más ligera para el apoyo («Just in time!») y una
bold itálica pequeña para el bloque de texto inferior.

En web se reproduce con **Poppins** (400/500/600/700 + itálicas 600/700/800):

- Titulares → `.display` y `.section-title`: itálica, 800, mayúsculas.
- Apoyo → `.lead`: itálica, 500, color `--c-ink-500`.
- Cuerpo → Poppins 400 en redonda para que el texto largo se lea cómodo.

### 3. Formas gráficas

Tres recursos, siempre en magenta pleno:

1. **Pétalo / hoja orgánica** — círculo con una esquina en punta.
   → `--r-petal: 52% 52% 52% 8%`, clase `.blob`.
2. **Franja diagonal** (paralelogramo inclinado ~20°).
   → clase `.slash` con `transform: skewX(-20deg)`.
3. **Recorte en esquina de la foto** — una esquina con radio grande y las otras
   normales. → `.hero__photo`, `.split__media`.

### 4. Composición

- La foto ocupa un bloque grande; encima entra el pétalo magenta y una franja
  diagonal cruzando una esquina.
- El logotipo va sobre blanco o sobre magenta pleno, nunca sobre foto con detalle.
- Bloque de texto plano sobre fondo blanco, bien pegado al borde inferior.
- Botón píldora magenta con sombra de color propia.

### 5. Fotografía

Manos, piel real, píldoras y producto en primer plano; luz suave, fondo claro y
desenfocado, sin saturar. Nada de fotos clínicas frías ni de stock genérico de
hospital.

### 6. Personalidad y tono

Cercano, profesional y directo. Frases cortas, en segunda persona, orientadas al
servicio: «hasta donde los necesitas», «compra fácil», «te acompañamos».
Nunca lenguaje de promesa médica.
