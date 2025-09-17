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

## Run locally
```bash
pnpm install
pnpm run serve
```

Open the app at `http://localhost:3000`. Navigate to “Orders Heatmap” from the sidebar.

## Notes
- Map centers on Lucknow (26.8467, 80.9462).
- Heat layer uses `leaflet.heat`; clicking markers shows basic order info.
- Tailwind classes provide responsive admin styling with a collapsible sidebar.

## Design Docs
- See `docs/design-guide.md` for spacing, typography, color, and component usage.
- See `docs/context.md` for app structure, routing, and layout composition.
# hyperz
