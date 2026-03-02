# ReservasEDMED — Aplicación Instalable

PWA (Progressive Web App) para el **Sistema de Reserva de Laboratorios EDMED**.  
Se instala como app nativa en Android, iPhone/iPad y computadoras (Windows/Mac).

---

## 🚀 Cómo publicar en GitHub Pages (guía paso a paso)

### Paso 1: Generar los íconos de la app
Antes de subir el proyecto, necesitas los íconos. **Abre el archivo `generate-icons.html`** en Chrome y sigue las instrucciones para descargar los tres íconos a la carpeta `icons/`.

### Paso 2: Crear el repositorio en GitHub
1. Ve a [github.com](https://github.com) e inicia sesión.
2. Haz clic en **"New repository"** (botón verde).
3. Nombre del repositorio: `reservas-edmed-app` (o el que prefieras).
4. Marca la opción **"Public"** (necesario para GitHub Pages gratuito).
5. Haz clic en **"Create repository"**.

### Paso 3: Subir los archivos
**Opción A — Desde el navegador (sin instalar nada):**
1. En la página del repositorio recién creado, haz clic en **"uploading an existing file"**.
2. Arrastra toda la carpeta `ReservasEdmed-PWA/` con todos sus archivos.
3. Haz clic en **"Commit changes"**.

**Opción B — Con Git (más rápido si ya lo tienes instalado):**
```bash
cd C:\Users\edgar\Desktop\ReservasEdmed-PWA
git init
git add .
git commit -m "Initial PWA setup"
git remote add origin https://github.com/TU_USUARIO/reservas-edmed-app.git
git push -u origin main
```

### Paso 4: Activar GitHub Pages
1. En tu repositorio, ve a **Settings** (⚙️ engranaje).
2. En el menú izquierdo, haz clic en **"Pages"**.
3. En "Source", selecciona **"Deploy from a branch"**.
4. En "Branch", selecciona **`main`** y **`/ (root)`**.
5. Haz clic en **"Save"**.
6. Espera ~2 minutos y recarga. Tu URL será:
   ```
   https://TU_USUARIO.github.io/reservas-edmed-app/
   ```

---

## 📲 Cómo instalar la app

Comparte la URL de GitHub Pages con tus usuarios. Según el dispositivo:

| Dispositivo | Cómo instalar |
|-------------|---------------|
| **Android (Chrome)** | Abre la URL → Toca el banner "Agregar a pantalla de inicio" o el botón en la página |
| **iPhone/iPad (Safari)** | Abre la URL en Safari → Toca ⬆️ Compartir → "En la pantalla de inicio" → Agregar |
| **Windows/Mac (Chrome o Edge)** | Abre la URL → Toca el ícono ⬇️ en la barra de direcciones → Instalar |

---

## 📁 Estructura del proyecto

```
ReservasEdmed-PWA/
├── index.html           ← Página de instalación (detecta plataforma automáticamente)
├── manifest.json        ← Configuración de la PWA (nombre, íconos, colores)
├── sw.js                ← Service Worker (permite la instalación)
├── generate-icons.html  ← Herramienta para generar los íconos
├── README.md            ← Esta guía
└── icons/
    ├── icon-192.png          ← Ícono para Android y lanzadores
    ├── icon-512.png          ← Ícono para splash screen
    └── icon-maskable-512.png ← Ícono adaptativo para Android
```

---

## ⚙️ Actualizar la URL de la app

Si en el futuro cambias el despliegue de Google Apps Script, actualiza la URL en estos archivos:
- `manifest.json` → propiedad `"start_url"`
- `index.html` → constante `APP_URL` y todos los atributos `href` de los botones
- `sw.js` → constante `APP_URL`
