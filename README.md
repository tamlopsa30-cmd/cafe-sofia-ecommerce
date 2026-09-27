# Café SofIA

Prototipo de e-commerce de café construido con React + Vite, convertido a partir del prototipo navegable aprobado en Claude.

## Cómo correrlo

```
npm install
npm run dev
```

Abrí la URL que muestra la terminal (normalmente `http://localhost:5173`).

## Estructura

- `src/App.jsx` — pantalla principal, con las 10 pantallas de la app y toda la lógica (carrito, pago, desafíos, recompensas).
- `src/components/` — piezas reutilizables: `Header`, `BottomNav`, `ProductCard`, `RewardCard`.
- `src/data.js` — productos, desafíos y catálogo de recompensas.
- `src/index.css` — colores y estilos compartidos.
- `public/images/` — imágenes de la barista y la taza de Café SofIA.

Este es un prototipo académico (MVP de ADEN Business School): el pago por SINPE Móvil es simulado y no procesa dinero real.
