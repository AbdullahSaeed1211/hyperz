import L from "leaflet";
import "leaflet.heat";
import { HEATMAP_DEFAULTS } from "@/config/heatmap";

export default {
  name: "CanvasHeatLayer",
  props: {
    points: { type: Array, required: true }, // [lat,lng,value]
    radius: { type: Number, default: 35 },
    blur: { type: Number, default: 20 },
    intensity: { type: Number, default: 1 },
    gradient: { type: Object, default: () => ({}) },
  },
  mounted() {
    const findMap = () => {
      let p = this.$parent;
      while (p && !p.mapObject) p = p.$parent;
      return p && p.mapObject ? p.mapObject : null;
    };
    const blur = Math.max(
      Math.round(
        Math.max(this.blur, this.radius * HEATMAP_DEFAULTS.blurFactor)
      ),
      10
    );
    this.layer = L.heatLayer(this.points, {
      radius: this.radius,
      blur,
      gradient: this.gradient,
      maxZoom: 17,
    });
    const map = findMap();
    if (map) {
      map.addLayer(this.layer);
      this.$emit("ready");
    }
  },
  methods: {
    update(points) {
      if (this.layer && this.layer._map) {
        this.layer.setLatLngs(points || this.points);
        this.layer.redraw();
      }
    },
  },
  watch: {
    points(next) {
      if (this.layer && this.layer._map) this.layer.setLatLngs(next);
    },
    radius(next) {
      if (this.layer && this.layer._map)
        this.layer.setOptions({ radius: next });
    },
    blur(next) {
      if (this.layer && this.layer._map) {
        const b = Math.max(
          Math.round(Math.max(next, this.radius * HEATMAP_DEFAULTS.blurFactor)),
          10
        );
        this.layer.setOptions({ blur: b });
        this.layer.redraw();
      }
    },
    gradient(next) {
      if (this.layer && this.layer._map)
        this.layer.setOptions({ gradient: next });
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
