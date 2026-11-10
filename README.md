# SlimeCube Portfolio — GitHub Pages

Portfolio estático (HTML/CSS/JavaScript). No necesita Node.js, base de datos ni hosting de pago.

## Personalizar
1. Abre `config.js`.
2. Cambia nombre, versión, Discord, email y estadísticas.
3. En `builds`, `commissions` y `tools`, añade/edita elementos.
4. Sube tus imágenes a `assets/images/` y escribe sus rutas en `config.js`.
5. No pongas contraseñas, tokens privados ni claves secretas en estos archivos: todo lo publicado en GitHub Pages es público.

## Publicar gratis en GitHub Pages
1. Crea un repositorio en GitHub, por ejemplo `slimecube-portfolio`.
2. Sube todos los archivos y carpetas de este ZIP. `index.html` debe quedar en la raíz del repositorio.
3. En GitHub abre **Settings → Pages**.
4. En **Build and deployment**, elige **Deploy from a branch**.
5. Selecciona `main` y `/ (root)`, luego **Save**.
6. Espera a que GitHub publique el sitio. La URL será `https://TU-USUARIO.github.io/slimecube-portfolio/`.

Para usar `https://TU-USUARIO.github.io/`, crea un repositorio llamado exactamente `TU-USUARIO.github.io`.

## Contador de visitas global
Para habilitar el contador global numérico, crea una cuenta gratuita en https://www.goatcounter.com/, crea un sitio y copia el código corto (por ejemplo `slimecube`) en `goatCounterCode` dentro de `config.js`. Activa en la configuración de GoatCounter **Allow adding visitor counts on your website**. El portfolio mostrará el total de visitas del sitio usando `TOTAL`. GoatCounter puede almacenar el dato en caché hasta 4 horas.

## Imágenes sugeridas
- `assets/images/hero.jpg`
- `assets/images/about.jpg`
- `assets/images/boxpvp.jpg`
- `assets/images/lobby.jpg`
- `assets/images/fullpvp.jpg`

Reemplaza las imágenes de ejemplo por capturas propias de tus builds.
