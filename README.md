# Portfolio — Jonathan Martín

Portfolio personal con estética **Fervon** (*forjado al rojo vivo*): página única, sin
dependencias, con fondo de brasas en `<canvas>`, luz que sigue al cursor, titular con
palabra rotativa, contadores animados, tarjetas con inclinación 3D y cinta de proyectos.

## Desarrollo

Es un único `index.html` autocontenido. Para verlo en local:

```bash
npx serve .
# o cualquier servidor estático — no abrir con file://
```

## Utilidades

- `record.mjs` — graba un recorrido en vídeo (Playwright headless → WebM, luego MP4 con ffmpeg).
- `shot.mjs` — captura screenshots de secciones.

Ambos requieren Playwright (se reutiliza el instalado en otro proyecto del workspace).

## Proyectos enlazados

Trace · inferbench · Lookspan · ClaudeScope · Launchpad · Pregón — todos bajo la marca
[Fervon](https://fervon.dev).
