# Funnels · Order Express Shop

Landing pages de campaña de **Order Express Shop**. Cada funnel es el destino
de un anuncio distinto y todos terminan llevando al cliente a la tienda:
<https://nube-store-pi.vercel.app>

HTML5 + CSS3 + JavaScript vanilla. Sin frameworks, sin dependencias, sin paso
de build: Vercel publica los archivos tal cual.

---

## Los dos funnels

| Ruta | Funnel | Campaña |
|---|---|---|
| `/` | Portada índice | Enlaza los dos funnels (útil para presentar) |
| `/dulces` | **El sabor de Michoacán** | Dulces típicos michoacanos, envío nacional |
| `/medicina` | **Medicamentos confiables** | Salud y bienestar, envíos a Estados Unidos |

Cada carpeta es autónoma: tiene su propio `index.html`, `css/`, `js/` y
`assets/`, y su propio `README.md` con el detalle de ese funnel.

---

## Estructura

```
Funnels_OrderExpressShop/
├── index.html          Portada que enlaza los dos funnels
├── vercel.json         Configuración de despliegue
├── dulces/             Funnel de dulces típicos
│   ├── index.html
│   ├── css/  js/  assets/
│   └── README.md       ← documentación de este funnel
└── medicina/           Funnel de salud y bienestar
    ├── index.html
    ├── css/  js/  assets/
    └── README.md
```

---

## Ver en local

No hace falta compilar nada. Desde la raíz:

```bash
npx serve . -l 8080
```

Y abre <http://localhost:8080>. Desde ahí se navega a los dos funnels.

> Conviene usar un servidor y no abrir el `index.html` a pelo: en `file://`
> algunos navegadores bloquean recursos y no se ve igual que en producción.

---

## Despliegue

Vercel está conectado a este repositorio. **Cada push a `main` publica solo.**

- Producción: la rama `main`.
- Cualquier otra rama genera una *preview* con su propia URL, útil para
  revisar un cambio antes de que lo vea el público.

No hay comando de build ni directorio de salida que configurar: es un sitio
estático servido desde la raíz.

---

## Añadir un tercer funnel

1. Crea la carpeta, por ejemplo `refacciones/`, con su `index.html` dentro.
2. Duplica un bloque `<a class="funnel">` en el `index.html` de la raíz.
3. Push. Queda publicado en `/refacciones`.

---

## A dónde apuntan los botones

Los CTA no llevan el enlace escrito en el HTML: se arma en JavaScript. En cada
funnel, `js/main.js` tiene arriba la URL de la tienda; cambiarla ahí reapunta
todos los botones de esa landing.

Además, cada salida hacia la tienda arrastra los `utm_*` del anuncio de origen
y añade un `utm_content` que identifica **qué botón concreto** se pulsó, de modo
que en la tienda se puede ver qué punto de conversión funciona mejor.

---

## Pendientes antes de dar tráfico real

Cada funnel tiene su propio checklist en su `README.md`. Los dos temas
transversales:

- **Nombre de marca.** El funnel de dulces dice «OEM Shop», el de medicina dice
  «OEPM Shop» y el logotipo dibuja **OEPM**. Conviene unificarlo antes de
  presentar, porque afecta al `<title>`, al Open Graph y al Schema.org.
- **Dominio.** Las etiquetas `canonical` y `og:url` todavía apuntan a un
  dominio de ejemplo. Hay que cambiarlas por la URL definitiva para que las
  miniaturas se vean bien al compartir en WhatsApp y redes.
