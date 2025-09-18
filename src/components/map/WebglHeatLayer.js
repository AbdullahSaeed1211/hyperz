import L from "leaflet";
import "leaflet-webgl-heatmap";
import { clamp01 } from "@/config/heatmap";

export default {
  name: "WebglHeatLayer",
  props: {
    points: { type: Array, required: true }, // [lat,lng,value]
    radius: { type: Number, default: 50 },
    intensity: { type: Number, default: 1 },
    gradient: { type: Object, default: () => ({}) },
  },
  mounted() {
    const findMap = () => {
      let p = this.$parent;
      while (p && !p.mapObject) p = p.$parent;
      return p && p.mapObject ? p.mapObject : null;
    };
    this.layer = L.webGLHeatmap({
      size: this.radius,
      units: "px",
      alphaRange: 1.0,
    });
    const map = findMap();
    if (map) {
      map.addLayer(this.layer);
      this._applyData();
      this.$emit("ready");
    }
  },
  methods: {
    _applyData() {
      if (!this.layer) return;
      const fallback = clamp01(this.intensity);
      const data = this.points.map((p) => ({
        lat: p[0],
        lon: p[1],
        value: p[2] != null ? clamp01(p[2]) : fallback,
      }));
      if (typeof this.layer.setData === "function") this.layer.setData(data);
      if (typeof this.layer.update === "function") this.layer.update();
    },
    update(points) {
      this.$props.points = points || this.points;
      this._applyData();
    },
  },
  watch: {
    points() {
      this._applyData();
    },
    radius(next) {
      if (this.layer && typeof this.layer.setOptions === "function") {
        this.layer.setOptions({ size: next, units: "px" });
      } else if (this.layer) {
        this.layer.options.size = next;
        if (typeof this.layer.update === "function") this.layer.update();
      }
    },
    intensity() {
      this._applyData();
    },
  },
  beforeDestroy() {
    try {
      if (this.layer && this.$parent && this.$parent.mapObject) {
        this.$parent.mapObject.removeLayer(this.layer);
      }
    } catch (e) {
      this.$emit("error", e);
    }
  },
  render(h) {
    return h();
  },
};
