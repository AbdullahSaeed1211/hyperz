# Design Guide

## Typography
- Font: Poppins, sans-serif
- Body: 14px, line-height 1.5
- Headings: h1 24px, h2 20px, h3 18px, h4 16px, h5 14px (mapped in Tailwind base layer)

## Colors
- Primary: #0671E3
- Accent Amber: #F59E0B
- Text: #212837
- Background: #f2f2f2
- Greys: see Tailwind tokens in `src/assets/tailwind.css` root variables

## Components
- Card: `bg-white border border-gray-200 rounded-lg p-6` (dashboard stats, sections)
- Input: `px-3 py-2 border border-gray-300 rounded-lg text-sm`
- Button Primary: `bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md`
- Menu Link: `.menu-link` rules in Tailwind component layer

## Layout
- Sidebar: fixed on desktop, mobile slide-in with overlay
- Navbar: black; left search, right date-range and avatar
- Content: scrollable, offset with `md:ml-64`

## Map / Heatmap
- Basemap: Carto light_no_labels + light_only_labels overlay
- Gradient: blue → green → orange → red
- Controls: Heat toggle, Markers toggle, Radius, Blur, Intensity

## Tailwind Conventions
- Prefer utilities; extract common clusters to `@layer components` in `src/assets/tailwind.css`
- Keep utility chains readable; use component classes for longer clusters
