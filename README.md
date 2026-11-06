# CMIC Aguascalientes — React + Vite

Proyecto independiente del sitio anterior. Conserva sus páginas, rutas, componentes, imágenes, documentos PDF y esquemas de Sanity. No se ha publicado ni se han modificado datos del CMS.

## Ejecutar el sitio

Desde esta carpeta:

```powershell
Copy-Item .env.example .env
npm install
npm run dev
```

Abre la dirección que indica Vite. Para verificar y generar la versión de producción:

```powershell
npm run build
npm run preview
```

## Sanity Studio

```powershell
npm run studio:install
npm run studio
```

El Studio copiado usa el proyecto `xs8bc8fb` y el dataset `production`, los mismos del sitio anterior. Editar o publicar desde este Studio también afecta el contenido que consulta el sitio anterior. Para contenido independiente, crea otro proyecto o dataset y cambia tanto `.env` como `studio/sanity.config.js` y `studio/sanity.cli.js`.

Si Sanity rechaza solicitudes locales por CORS, abre [Sanity Manage](https://www.sanity.io/manage), selecciona el proyecto `xs8bc8fb` y entra a **API → CORS Origins → Add CORS origin**. Autoriza el origen exacto de la vista local:

```text
http://127.0.0.1:5173
```

Si también abrirás el sitio con `http://localhost:5173`, agrega ese origen por separado. Deja **Allow credentials** desactivado para este frontend público. Recarga la página después de guardar. Si Vite cambia de puerto, ese puerto necesita su propio origen autorizado.

Diagnóstico realizado: la API sin cabecera Origin respondió HTTP 200; con el origen `http://127.0.0.1:5173` respondió HTTP 403 con el mensaje `CORS Origin not allowed`. La falta de contenido no está causada por TypeScript. No se han cambiado permisos del proyecto Sanity.

El frontend público no necesita tokens de escritura. Nunca coloques secretos en variables `VITE_*`, porque se incluyen en el navegador. [Documentación de CORS de Sanity](https://www.sanity.io/docs/content-lake/cors).

## TypeScript y estilos

Todo el frontend de `src/` está convertido a `.ts` y `.tsx`, incluidas las páginas, los componentes, las consultas y las utilidades. La configuración aplica `strict: true` y `allowJs: false`, sin omitir errores con `@ts-ignore`, `@ts-nocheck` o tipos `any`. `src/types/content.ts` describe los resultados de Sanity, los modelos preparados para las tarjetas y las propiedades compartidas. También se tiparon los eventos del navegador, las referencias al DOM, los temporizadores y los estados que pueden ser nulos.

Sanity Studio es un paquete independiente en `studio/`; sus esquemas y configuración se conservan en JavaScript tal como en el proyecto original. La comprobación del frontend no incluye el Studio.

Tailwind CSS 4 usa clases con prefijo `tw:`, por ejemplo `tw:flex tw:gap-4`. No se importa Preflight. Bootstrap 5 aporta su cuadrícula y utilidades (`container`, `row`, `col-md-6`, etc.). Ambos se cargan desde `src/styles/tailwind.css`, con las capas `theme, base, bootstrap, components, utilities`. Se importan únicamente `bootstrap-grid.min.css` y `bootstrap-utilities.min.css`; sus componentes completos y JavaScript no se cargan globalmente.

Se retiraron las hojas CSS individuales de `src/css/`, `src/App.css`, `src/index.css` y `src/styles/typography.css`. Las páginas y componentes ahora usan `cmicClasses()` de `src/styles/recipes.ts`: conserva las clases que necesitan los observadores y eventos del sitio, y añade sus utilidades literales de Tailwind. Para ajustar un componente, edita su entrada en ese archivo o añade utilidades `tw:` directamente a su `className`. Las variantes arbitrarias cubren descendientes, estados, pseudoelementos y formularios; los modificadores `--active`, etc., mantienen prioridad sobre el estilo base.

La única hoja CSS propia es `src/styles/tailwind.css`. Contiene los imports, las variables compartidas, los estilos base, las variantes de medios y los keyframes con prefijo `cmic-` para evitar conflictos con Tailwind. Los puntos de corte conservan sus límites inclusivos; también se mantienen impresión, contraste alto y movimiento reducido. `String.raw` en las recetas permite que JavaScript y el escáner de Tailwind interpreten igual las comillas del contenido decorativo y los caracteres escapados. No construyas nombres de utilidades concatenando fragmentos dinámicos.

Ejecuta `npm run check:styles` para verificar que Tailwind descubre y compila todas las utilidades de las recetas y que no se reintrodujeron imports de CSS individuales. `npm run build` comprueba TypeScript y genera producción. El respaldo local anterior a esta migración está en `.migration-backup.zip` y no se incluye en el repositorio ni en producción.

La tipografía global usa Montserrat para títulos, subtítulos y textos, e Inter para enlaces y controles. Ambas familias se cargan desde Google Fonts; los estilos compartidos se encuentran en la capa base de `src/styles/tailwind.css`.

El menú móvil se activa hasta 840 px. Al pasar a 841 px se cierra, elimina su overlay y restaura el scroll. El panel tiene acordeones, cierre con Escape, control de foco y desplazamiento interno en pantallas pequeñas. Su diseño combina recetas Tailwind y utilidades flex de Bootstrap.

La ruta de inicio reserva la altura del header mediante `--site-header-height` y la receta `site-home`. El Hero mantiene margen superior cero y una altura mínima flexible, sin compensaciones negativas. Los estilos de cada página se expresan mediante utilidades Tailwind, sin depender de las hojas anteriores.

## Rutas conservadas

Inicio, servicios, asociado proveedor, afiliación 2025, asociado estudiantil 2025, ICIC, cursos ICIC, ITC, nosotros, detalle de maestría, convenios y noticias. Se mantienen los alias de noticias y de asociado proveedor. `public/_redirects` y `netlify.toml` soportan navegación directa en Netlify; otros servidores necesitan una regla equivalente hacia `index.html`.

Google Analytics está desactivado hasta configurar `VITE_GA_MEASUREMENT_ID`; solo se inicializa en producción. No se registra el service worker heredado: requiere una estrategia de actualización de caché adecuada para Vite antes de activar modo offline.

Los scripts `build` y `typecheck` verifican todo el frontend TypeScript. Se comprobó la compilación de producción y la apertura/cierre del modal de servicios en el navegador. La validación completa del contenido dinámico queda pendiente de autorizar el origen local en Sanity.
