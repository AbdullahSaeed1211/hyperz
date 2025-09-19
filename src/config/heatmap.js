export const HEATMAP_DEFAULTS = Object.freeze({
  minRadius: 10,
  maxRadius: 200,
  webglSwitchRadius: 80,
  baseZoom: 12,
  blurFactor: 0.9,
});

export const DEFAULT_GRADIENT = Object.freeze({
  0.0: "#2563eb",
  0.35: "#22c55e",
  0.65: "#f59e0b",
  1.0: "#ef4444",
});

export function scaleRadiusWithZoom(
  baseRadius,
  zoom,
  baseZoom = HEATMAP_DEFAULTS.baseZoom
) {
  const r = Math.round(baseRadius * (zoom / baseZoom));
  return Math.max(
    HEATMAP_DEFAULTS.minRadius,
    Math.min(HEATMAP_DEFAULTS.maxRadius, r)
  );
}

export function clamp01(v) {
  return Math.min(1, Math.max(0, v));
}
