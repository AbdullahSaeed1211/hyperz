# Project Context

## Stack
- Vue 2 + Vue Router
- TailwindCSS
- Leaflet + leaflet.heat
- vue2-datepicker, vue2-leaflet

## Structure
- `src/App.vue` wraps the app in `DefaultLayout` so navbar/sidebar persist
- `src/layouts/DefaultLayout.vue` owns:
  - Sidebar (fixed desktop, mobile slide-in)
  - Navbar (emits `toggle-mobile`)
  - `<keep-alive><router-view/></keep-alive>` to keep pages alive (SPA behavior)
- Pages: `Dashboard.vue`, `Orders.vue`, `Heatmap.vue`, `Merchants.vue`, `Customers.vue`, `Settings.vue`
- Components: `Navbar.vue`, `Sidebar.vue`, `SidebarIcon.vue`, `KpiChart.vue`
- Data/services: `src/data/orders.json`, `src/services/orderService.js`

## Routing
- Lazy-loaded child routes under `/`
- `meta.title` used for page titles (can hook into `afterEach` later)

## Slots / SPA
- The layout acts as a shell; only page content changes inside `<router-view/>`
- Sidebar/Navbar are mounted once and not rerendered between route changes

## Styling
- Tailwind global styles in `src/assets/tailwind.css` (Poppins, body tokens)
- Component-level rules in Tailwind component layer (menu link/icon sizing)

## Heatmap Notes
- Basemap uses Carto light_no_labels + labels overlay to reduce color interference
- Heat layer exposes Radius, Blur, Intensity; auto-scales radius with zoom
