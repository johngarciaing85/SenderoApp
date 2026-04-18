# SenderoApp 🏔️

Landing page cinematográfica para **SenderoApp** — marketplace de senderismo y aventura en Colombia.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **Google Fonts** — Fraunces (display, variable), Inter Tight (body), JetBrains Mono (acentos)
- **next/image** con Unsplash como CDN de imágenes

## Características del diseño

- Hero cinematográfico con **parallax en 5 capas** (cielo, sol, montañas lejanas, medias, cercanas + niebla)
- **Animaciones on-scroll** con IntersectionObserver (reveal, reveal-scale, reveal-stagger)
- **Contadores animados** en la sección de stats (count-up con ease-out cúbico)
- **Marquee infinito** con palabras clave en fuente display italic
- **Galería de rutas** con fotos reales de montaña, hover Ken Burns
- **Sección cinematográfica** de imagen fullscreen con efecto Ken Burns
- **Iconos SVG** hechos a mano (en vez de emojis)
- Paleta dusk/mountain: dorado amanecer, verde musgo, arcilla, sobre fondo muy oscuro
- Respeta `prefers-reduced-motion`

## Instalación

```bash
cd senderoapp
npm install
npm run dev
# Abrir http://localhost:3000
```

## Build de producción

```bash
npm run build
npm start
```

## Despliegue en Vercel

```bash
git init
git add .
git commit -m "SenderoApp landing page v2"
git remote add origin https://github.com/TU_USUARIO/senderoapp.git
git push -u origin main
```

1. Ir a vercel.com y loguearse con GitHub
2. "New Project" → seleccionar el repo
3. "Deploy" — en 2 min tenés tu URL: `senderoapp.vercel.app`

## Dominio personalizado

1. Comprar el dominio (ej: `senderoapp.co`) en Hostinger / GoDaddy
2. En Vercel → Settings → Domains → Add Domain
3. Configurar los DNS como indica Vercel

## Conectar Waitlist a Google Sheets

1. Crear un Google Form con campos: Nombre, Email, Rol
2. Inspeccionar el form para obtener los `entry.NUMERO` de cada campo
3. Actualizar en `src/app/components/WaitlistForm.tsx` los valores:
   - `entry.NAME_FIELD` → `entry.XXXXXXX`
   - `entry.EMAIL_FIELD` → `entry.YYYYYYY`
   - `entry.ROLE_FIELD` → `entry.ZZZZZZZ`
4. Crear `.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/TU_FORM_ID/formResponse
   ```

## Estructura

```
src/app/
├── components/
│   ├── AnimatedStat.tsx      # Contadores animados
│   ├── Icons.tsx             # Set de iconos SVG
│   ├── Marquee.tsx           # Tira infinita
│   ├── MountainHero.tsx      # Hero SVG con 5 capas parallax
│   ├── RouteCard.tsx         # Card de ruta con imagen
│   └── WaitlistForm.tsx      # Formulario de lista de espera
├── hooks/
│   ├── useCountUp.ts         # Hook para animar números
│   ├── useParallax.ts        # Hook para parallax
│   └── useReveal.ts          # Hook para animaciones on-scroll
├── globals.css               # Tema + keyframes + utilities
├── layout.tsx                # Layout + fuentes + metadata
└── page.tsx                  # Landing page
```

## Imágenes

Las fotos son de **Unsplash** (libres de uso comercial). Si querés usar tus propias imágenes:

1. Poné las fotos en `public/images/`
2. Actualizá las URLs en `src/app/page.tsx` (array `routes`)
3. Si ya no usás Unsplash, podés quitar `images.unsplash.com` de `next.config.ts`

---

**SenderoApp** — Medellín, Colombia · 2026
