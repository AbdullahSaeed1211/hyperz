<template>
  <component
    :is="componentName"
    :points="points"
    :radius="radius"
    :intensity="intensity"
    :gradient="gradient"
    @ready="$emit('ready')"
    @error="$emit('error', $event)"
  />
</template>

<script>
import CanvasHeatLayer from "@/components/map/CanvasHeatLayer";
import WebglHeatLayer from "@/components/map/WebglHeatLayer";
import { HEATMAP_DEFAULTS } from "@/config/heatmap";

export default {
  name: "HeatLayer",
  components: { CanvasHeatLayer, WebglHeatLayer },
  props: {
    mode: { type: String, default: "auto" }, // auto | canvas | webgl
    points: { type: Array, required: true },
    radius: { type: Number, default: 35 },
    intensity: { type: Number, default: 1 },
    gradient: { type: Object, default: () => ({}) },
  },
  computed: {
    componentName() {
      if (this.mode === "canvas") return "CanvasHeatLayer";
      if (this.mode === "webgl") return "WebglHeatLayer";
      return this.radius >= HEATMAP_DEFAULTS.webglSwitchRadius
        ? "WebglHeatLayer"
        : "CanvasHeatLayer";
    },
  },
};
</script>

<style scoped></style>
