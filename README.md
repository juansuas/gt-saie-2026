# Micrositio del Grupo de Trabajo de SAIE

Micrositio estático para orientar a quienes participan del “GT 1 – Usos de información estadística y acceso a datos públicos” durante el VI Coloquio de Investigación Educativa en Argentina.

## Estructura

- `dist/index.html`: estructura semántica del sitio.
- `dist/css/styles.css`: estilos y diseño responsive.
- `dist/js/app.js`: sesiones desplegables, buscador integrado y descargas.
- `dist/data/sesiones.js`: fuente única para sesiones, ejes y trabajos.
- `dist/assets/`: logo del GT/SAIE.
- `dist/documentos/`: resúmenes, orientaciones, ZIP por sesión y recursos del Coloquio.
- `scripts/extract_sources.py`: extracción reproducible usada para contrastar DOCX, XLSX y PDF originales.

## Fuentes documentales

La fuente principal es `D:\89_SAIE\01_GT`. También se contrastaron la carpeta pública de Google Drive indicada por la coordinación y el sitio general del Coloquio: <https://coloquio-infomdq.netlify.app/>.

Se registraron estas decisiones de integración de las fuentes:

- El sitio muestra para la sesión 1 el horario del programa general: 14:30 a 16:15.
- GT 01.05 y GT 01.04 informaron que no participarán de las sesiones. Se conservan en la fuente de datos y en los documentos, pero no se muestran en el sitio.
- La cabecera de la sesión 4 en la planilla contiene un horario mal formado; el programa general y los restantes documentos coinciden en 14:30 a 16:30.

## Actualizar sesiones o trabajos

La mayor parte del contenido se actualiza en `dist/data/sesiones.js`. Cada sesión incluye fecha, horario, coordinación, dinámica, bloques, ejes y trabajos. No duplique esos datos en el HTML.

Para agregar un resumen:

1. Copiar el archivo original en `dist/documentos/sesion-N/` con un nombre breve, estable y sin espacios.
2. Agregar el trabajo al arreglo `works` de su sesión en `dist/data/sesiones.js`.
3. Incluir su ID en el bloque correspondiente. La marca `pending` identifica actualmente los trabajos que no participarán y que no se muestran en el sitio.
4. Volver a crear el ZIP `resumenes-sesion-N.zip` con todos los DOCX de esa carpeta.

## Publicación

El contenido publicable está dentro de `dist/` y no requiere compilación.

- GitHub Pages: publicar `dist/` mediante una rama o un workflow de Pages.
- Netlify: usar `dist` como directorio de publicación y dejar vacío el comando de build.

Antes de publicar, ejecutar `node scripts/validate_site.mjs` y revisar enlaces, descargas, búsqueda, navegación por teclado y diseño responsive.
