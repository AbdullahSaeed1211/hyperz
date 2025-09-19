<template>
  <component
    :is="componentName"
    :points="points"
    :radius="radius"
    :blur="blur"
    :intensity="intensity"
    :gradient="gradient"
    @ready="$emit('ready')"
    @error="$emit('error', $event)"
  />
</template>

<script>
import CanvasHeatLayer from "@/components/map/CanvasHeatLayer";

export default {
  name: "HeatLayer",
  components: { CanvasHeatLayer },
  props: {
    mode: { type: String, default: "auto" }, // auto | canvas | webgl
    points: { type: Array, required: true },
    radius: { type: Number, default: 35 },
    blur: { type: Number, default: 20 },
    intensity: { type: Number, default: 1 },
    gradient: { type: Object, default: () => ({}) },
  },
  computed: {
    componentName() {
      // Consolidated: always use Canvas backend for compatibility and clarity
      return "CanvasHeatLayer";
    },
  },
};
</script>

<style scoped></style>
