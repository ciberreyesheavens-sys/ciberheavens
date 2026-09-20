# Sitio web para negocio local de trámites y servicios

Página de una sola sección de navegación (SPA con anclas) hecha únicamente con **HTML5, CSS3 y JavaScript vanilla**.
Sin frameworks, sin backend, sin base de datos y sin servicios de pago. Se puede alojar gratis.

```
/
├── index.html          ← estructura y textos
├── css/
│   └── style.css       ← colores, tipografía y diseño
├── js/
│   └── script.js       ← WhatsApp, menú, animaciones y formulario
├── assets/
│   ├── images/         ← fotos (ahora hay imágenes de ejemplo)
│   └── icons/          ← favicon
└── README.md
```

> **Ya está configurado** con los datos de Ciber Heavens Los Reyes (nombre, dirección, horario y WhatsApp).
> Lo que sigue siendo placeholder y aparece con fondo azul claro y entre `[corchetes]` son los **testimonios** y el texto de la **galería**.
> Las fotos de la galería y la imagen `og-image.png` también son de ejemplo. Además, `og:url` y `og:image` en `index.html` se actualizan al publicar.

---

## 1. Cómo abrir la página localmente

1. Coloca todos los archivos en una carpeta, respetando la estructura de arriba.
2. Haz doble clic en `index.html`. Se abre en tu navegador. No necesitas instalar nada.
3. Necesitas internet solo para cargar la tipografía Manrope (Google Fonts). Sin internet, la página usa la fuente del sistema y se ve bien igual.

Consejo: después de editar un archivo, guarda y recarga el navegador (F5).

## 2. Cómo cambiar el nombre del negocio

1. En `js/script.js`, cambia `BUSINESS_NAME`. Esto actualiza el logo, la inicial del logo, el footer y el copyright.
2. En `index.html`, cambia el nombre en estos lugares (usa Buscar y reemplazar de tu editor: busca `Ciber Heavens Los Reyes`):
   - `<title>`
   - `<meta name="author">`
   - `<meta property="og:site_name">` y `og:title`
3. Si tienes un logo en imagen, en `index.html` busca el comentario `El logo es una letra en un cuadro` y sigue la instrucción que aparece ahí.

## 3. Cómo cambiar los colores

Abre `css/style.css`. Al inicio, en `:root { ... }`, están todos los colores:

| Variable | Para qué sirve |
| --- | --- |
| `--navy` | Azul oscuro principal (franja, footer, paneles) |
| `--blue` | Azul eléctrico de acento (botones, iconos) |
| `--blue-dark` | Hover de botones y texto azul |
| `--gray-50` | Fondo gris muy claro de secciones alternas |
| `--text` | Color del texto principal |

Cambia el código (por ejemplo `#1f5eff`) y toda la página se actualiza. Si cambias un azul por otro color, revisa que el texto blanco sobre él se siga leyendo bien.

## 4. Cómo cambiar los textos

Todos los textos están en `index.html`, con comentarios que indican cada sección (`<!-- 4. SERVICIOS -->`, etc.).

- **Servicios:** cada tarjeta es un bloque `<article class="service ...">`. Para agregar uno, copia una tarjeta completa y cambia icono, título, descripción y `data-wa-msg` (el mensaje que se envía al pulsar "Cotizar").
- **Pasos ("Así de fácil"):** bloques `<li class="step">`.
- **Beneficios:** bloques `<li class="benefit">`. Deja solo lo que tu negocio realmente ofrece.
- **Cifras de confianza del hero:** busca `+500` y `Mismo día`. Déjalos solo si son ciertos; si cambian, edítalos o elimina ese `<li>`.
- **Testimonios:** busca `[TESTIMONIO REAL DEL CLIENTE]`. Reemplázalos por testimonios reales (con permiso del cliente) o elimina la sección `id="testimonios"` completa. Si la eliminas, quita también `testimonios: "nosotros",` del objeto `map` en `initScrollSpy()` de `js/script.js` (no da error si lo dejas, pero queda limpio).
- **Dirección y horario:** están en la sección de contacto, en el footer y en el bloque `application/ld+json` del `<head>` (que usa Google). Si cambian, actualízalos en los tres lugares.
- **Opciones del formulario:** el `<select id="f-service">` en `index.html`.

Los enlaces con `data-wa` abren WhatsApp con el mensaje que pongas en `data-wa-msg`.

## 5. Cómo cambiar las imágenes

Las imágenes de la galería son de ejemplo (`assets/images/placeholder-*.svg`).

**Con fotos tuyas (recomendado):**
1. Optimiza tus fotos (idealmente de 800 a 1200 px de ancho, formato JPG o WebP, menos de 200 KB cada una).
2. Cópialas a `assets/images/`.
3. En `index.html`, en la sección `id="galeria"`, cambia el `src` de cada imagen y escribe un `alt` que describa la foto.

**Con una URL pública libre de uso** (por ejemplo de Pexels, Unsplash o Pixabay): pega la URL directa de la imagen en `src`. Revisa la licencia de cada foto y no descargues imágenes de sitios de otras personas sin permiso.

**Imagen al compartir el enlace (Open Graph):** reemplaza `assets/images/og-image.png` por una imagen tuya de 1200 × 630 px. Después, en `index.html`, actualiza `og:image` y `og:url` con tu dirección real (ver paso 7).

**Favicon:** reemplaza `assets/icons/favicon.svg`.

## 6. Cómo configurar WhatsApp

Abre `js/script.js` y edita la primera sección:

```js
const WHATSAPP_NUMBER = "525627022347";
```

- Escribe código de país + número, solo dígitos, sin `+`, espacios ni guiones.
- Ejemplo con formato de México: `"52" + 10 dígitos`. Si el chat no abre, prueba con `"521" + 10 dígitos`.
- Este proyecto ya tiene tu número: `"525627022347"`.
- Con eso se configuran **todos** los botones, el formulario y el número que se muestra en contacto y footer.
- Mientras el número tenga las `X` de ejemplo, los botones muestran un aviso en lugar de abrir WhatsApp. Esto es intencional para que no publiques el sitio sin configurarlo.

Prueba: abre la página, llena el formulario y pulsa "Enviar por WhatsApp". Debe abrirse WhatsApp con el mensaje ya escrito.

---

## 7. Publicar gratis en GitHub Pages

1. Crea una cuenta en [github.com](https://github.com) si no tienes.
2. Pulsa **New repository**. Nombre sugerido: `mi-negocio`. Déjalo **Public** y crea el repositorio.
3. Sube los archivos:
   - **Sin instalar nada:** en el repositorio pulsa **Add file → Upload files** y arrastra el **contenido** de tu carpeta (`index.html`, `css`, `js`, `assets`, `README.md`) para que `index.html` quede en la raíz. Pulsa **Commit changes**.
   - **Con Git:**
     ```bash
     git init
     git add .
     git commit -m "Primer sitio"
     git branch -M main
     git remote add origin https://github.com/TU-USUARIO/mi-negocio.git
     git push -u origin main
     ```
4. Ve a **Settings → Pages**.
5. En **Build and deployment**, elige **Source: Deploy from a branch**, rama **main** y carpeta **/ (root)**. Pulsa **Save**.
6. Espera uno o dos minutos. Tu sitio quedará en `https://TU-USUARIO.github.io/mi-negocio/`.
7. Actualiza `og:url` y `og:image` en `index.html` con esa dirección y vuelve a subir el cambio.

Para actualizar el sitio después, sube de nuevo el archivo modificado y GitHub Pages lo publica solo.

## 8. Publicar gratis en Cloudflare Pages

1. Crea una cuenta en [cloudflare.com](https://www.cloudflare.com).
2. En el panel entra a **Workers & Pages** y crea un proyecto de **Pages**.
3. Elige una de estas opciones:
   - **Conectar con Git:** selecciona tu repositorio de GitHub. En la configuración de compilación deja el **comando de build vacío** y pon `/` (o déjalo vacío) como directorio de salida.
   - **Subir archivos directamente (Direct Upload):** arrastra la carpeta del proyecto.
4. Pulsa **Deploy**. Recibirás una dirección del tipo `tu-proyecto.pages.dev`.

Los nombres de los menús de Cloudflare cambian de vez en cuando; si no encuentras una opción, busca "Pages" y "Direct Upload" en su documentación.

## 9. Publicar gratis en Netlify

1. Crea una cuenta en [netlify.com](https://www.netlify.com).
2. **La forma más rápida:** entra a [app.netlify.com/drop](https://app.netlify.com/drop) y arrastra la carpeta del proyecto. En segundos tendrás una dirección `algo.netlify.app`.
3. **Con GitHub:** **Add new site → Import an existing project**, elige tu repositorio, deja vacío el comando de build y usa `.` (o vacío) como directorio de publicación.
4. En **Site configuration** puedes cambiar el nombre de la dirección.

---

## Lista de revisión antes de publicar

- [x] `WHATSAPP_NUMBER` con tu número real (ya configurado)
- [x] `BUSINESS_NAME`, `<title>` y meta etiquetas con tu nombre (ya configurado)
- [x] Dirección y horario reales (ya configurados)
- [ ] Confirmado que "+500 trámites al mes" y "Mismo día" son ciertos
- [ ] Testimonios reales o sección eliminada
- [ ] Fotos reales en la galería
- [ ] `og:url` y `og:image` con tu dirección real
- [ ] Probado en tu celular
