# Fotos de rutas

Poné acá tus fotos de cada cerro/ruta. Formato recomendado:

- **Extensión:** `.webp` (más liviano) o `.jpg`
- **Dimensiones:** 1600×2000 px (proporción 4:5)
- **Peso:** menos de 200KB cada una (comprimí en https://squoosh.app)
- **Nombres:** sin tildes ni espacios, todo minúsculas

## Archivos esperados

```
cerro-tusa.webp
cerro-jardin.webp
charcos-del-tigre.webp
cuevas-esplendor.webp
paramo-sonson.webp
cerro-bravo.webp
salto-del-buey.webp
alto-san-miguel.webp
piedra-penol.webp
```

## Cómo usarlas

En `src/app/page.tsx` buscá el array `const routes: Route[] = [...]` (línea ~125)
y reemplazá cada `image: "https://images.unsplash.com/..."` por
`image: "/images/rutas/cerro-tusa.webp"` (el `/` al principio es importante).
