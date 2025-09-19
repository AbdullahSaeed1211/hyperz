# Admin Panel with Orders Heatmap (Vue 2)

This project implements a production-style admin skeleton and an orders heatmap for Lucknow using Vue 2, Vue Router, TailwindCSS and Leaflet.

## Tech Stack
- Vue 2 + Vue Router (lazy routes)
- TailwindCSS 3 + PostCSS
- Leaflet + vue2-leaflet + leaflet.heat

## Structure
```
src/
  components/ (Navbar.vue, Sidebar.vue)
  layouts/ (DefaultLayout.vue)
  pages/ (Dashboard.vue, Orders.vue, Heatmap.vue, Merchants.vue, Customers.vue, Settings.vue)
  router/ (index.js)
  services/ (orderService.js)
  data/ (orders.json)
```

## Features (high-level)
- Admin Panel skeleton (Vue 2 + Tailwind): fixed sidebar, top navbar, global page header
- Routing: Dashboard, Orders, Orders Heatmap, Merchants, Customers, Settings
- Orders Heatmap (Leaflet Canvas):
  - Lucknow-centered map (26.8467, 80.9462)
  - Heat layer with Blur and Intensity sliders; toggle Heat Layer on/off
  - 30+ dummy orders in `src/data/orders.json`; markers are clickable (basic info)
  - Subtle coverage overlay (convex hull) to hint overall footprint

## Run locally
```bash
pnpm install
pnpm run serve
```

Open the app at `http://localhost:3000`. Navigate to “Orders Heatmap” from the sidebar.

## Notes
- Heatmap renderer: Canvas-only (`leaflet.heat`) for simplicity and stable visuals
- Fixed radius kernel; adjust Blur/Intensity to taste
- “Blue zone” explanation: the gradient maps lower densities to blue. Areas at the fringe of clusters (or isolated points) naturally render as blue—indicating low activity relative to hotter (yellow/red) centers. As more nearby orders cluster, those regions transition through green/yellow toward red.
- Tailwind classes provide responsive admin styling with a collapsible sidebar

