<template>
  <div class="h-[75vh] md:h-[78vh] lg:h-[80vh]">
    <!-- Heatmap Controls -->
    <div
      class="mb-4 bg-white rounded-lg shadow-sm border border-gray-200 p-4 heatmap-controls"
    >
      <h3 class="text-lg font-semibold mb-3 text-gray-900">Map Controls</h3>
      <div class="md:grid md:grid-cols-2 md:gap-6">
        <!-- LEFT: Controls -->
        <div>
          <!-- Layer Controls -->
          <div class="mb-4">
            <h4 class="text-sm font-medium text-gray-700 mb-2">Layers</h4>
            <div class="flex gap-4">
              <label class="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  v-model="showHeat"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span
                  class="text-sm group-hover:text-blue-600 transition-colors"
                >
                  Heat Layer
                </span>
                <div class="tooltip-container relative">
                  <span class="info-icon cursor-help">i</span>
                  <div
                    class="tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-10"
                  >
                    Shows order density as colored heat zones
                  </div>
                </div>
              </label>
              <label class="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  v-model="showMarkers"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span
                  class="text-sm group-hover:text-blue-600 transition-colors"
                >
                  Markers
                </span>
                <div class="tooltip-container relative">
                  <span class="info-icon cursor-help">i</span>
                  <div
                    class="tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-10"
                  >
                    Individual order location pins
                  </div>
                </div>
              </label>
            </div>
          </div>

          <!-- Heatmap Settings -->
          <div class="mb-4">
            <h4 class="text-sm font-medium text-gray-700 mb-3">
              Heatmap Settings
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Radius Control -->
              <div class="space-y-2">
                <label
                  class="flex items-center justify-between text-sm text-gray-600"
                >
                  <span class="flex items-center gap-1">Radius</span>
                  <div class="tooltip-container relative">
                    <span class="info-icon cursor-help">i</span>
                    <div
                      class="tooltip absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-10 max-w-xs"
                    >
                      Controls the size of heat zones around each order
                    </div>
                  </div>
                </label>
                <input
                  type="range"
                  min="10"
                  max="200"
                  v-model.number="radius"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-blue"
                />
                <div class="text-xs text-gray-500 text-center">
                  {{ radius }}px
                </div>
              </div>

              <!-- Blur Control -->
              <div class="space-y-2">
                <label
                  class="flex items-center justify-between text-sm text-gray-600"
                >
                  <span class="flex items-center gap-1">Blur</span>
                  <div class="tooltip-container relative">
                    <span class="info-icon cursor-help">i</span>
                    <div
                      class="tooltip absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-10 max-w-xs"
                    >
                      Controls the softness/fading of heat zones
                    </div>
                  </div>
                </label>
                <input
                  type="range"
                  min="10"
                  max="40"
                  v-model.number="blur"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-blue"
                />
                <div class="text-xs text-gray-500 text-center">
                  {{ blur }}px
                </div>
              </div>

              <!-- Intensity Control -->
              <div class="space-y-2">
                <label
                  class="flex items-center justify-between text-sm text-gray-600"
                >
                  <span class="flex items-center gap-1">Intensity</span>
                  <div class="tooltip-container relative">
                    <span class="info-icon cursor-help">i</span>
                    <div
                      class="tooltip absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-10 max-w-xs"
                    >
                      Controls the strength/brightness of heat zones
                    </div>
                  </div>
                </label>
                <input
                  type="range"
                  min="0.2"
                  max="2"
                  step="0.05"
                  v-model.number="weightScale"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-blue"
                />
                <div class="text-xs text-gray-500 text-center">
                  {{ weightScale.toFixed(2) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div
            class="flex justify-between items-center pt-2 border-t border-gray-100"
          >
            <button
              class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
              @click="fitToOrders"
            >
              Fit to Orders
            </button>
            <div class="text-xs text-gray-500">
              {{ orders.length }} orders displayed
            </div>
          </div>
        </div>

        <!-- RIGHT: Legend -->
        <div class="mt-6 md:mt-0">
          <h4 class="text-sm font-medium text-gray-800 mb-3">Heatmap Legend</h4>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs text-gray-600 font-medium">Order Density</span>
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-500">Low</span>
              <div class="flex">
                <div
                  class="w-3 h-6 bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 rounded-l"
                ></div>
                <div
                  class="w-3 h-6 bg-gradient-to-r from-yellow-400 to-red-500 rounded-r"
                ></div>
              </div>
              <span class="text-xs text-gray-500">High</span>
            </div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-2 gap-2 text-xs">
            <div class="flex items-center gap-1">
              <div class="w-3 h-3 bg-blue-500 rounded"></div>
              <span class="text-gray-600">Low Activity</span>
            </div>
            <div class="flex items-center gap-1">
              <div class="w-3 h-3 bg-green-500 rounded"></div>
              <span class="text-gray-600">Medium Activity</span>
            </div>
            <div class="flex items-center gap-1">
              <div class="w-3 h-3 bg-yellow-500 rounded"></div>
              <span class="text-gray-600">High Activity</span>
            </div>
            <div class="flex items-center gap-1">
              <div class="w-3 h-3 bg-red-500 rounded"></div>
              <span class="text-gray-600">Peak Activity</span>
            </div>
          </div>
          <div class="mt-3 pt-3 border-t border-gray-100">
            <div class="flex items-center gap-4 text-xs">
              <div class="flex items-center gap-1">
                <div
                  class="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-sm"
                ></div>
                <span class="text-gray-600">Order Location</span>
              </div>
              <div class="flex items-center gap-1">
                <div
                  class="w-4 h-4 bg-green-600 rounded-full border-2 border-white shadow-sm"
                ></div>
                <span class="text-gray-600">High-Value Order</span>
              </div>
              <div class="flex items-center gap-1">
                <div
                  class="w-4 h-4 bg-purple-600 rounded-full border-2 border-white shadow-sm"
                ></div>
                <span class="text-gray-600">Premium Order</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <l-map
      ref="map"
      :zoom="12"
      :center="center"
      style="height: 100%; width: 100%"
    >
      <l-tile-layer :url="tileUrl" :attribution="attribution" />
      <l-tile-layer :url="labelsUrl" :opacity="0.9" />
      <!-- Canvas Heatmap (leaflet.heat) -->
      <l-heatmap
        v-if="showHeat && !useWebgl"
        :lat-lngs="heatLatLngs"
        :radius="radius"
        :gradient="gradient"
        :blur="blur"
      />
      <!-- WebGL Heatmap for large radii -->
      <l-webgl-heatmap
        v-if="showHeat && useWebgl"
        :lat-lngs="heatLatLngs"
        :radius="radius"
        :gradient="gradient"
        :intensity="weightScale"
      />
      <template v-if="showMarkers">
        <l-marker
          v-for="o in orders"
          :key="o.order_id"
          :lat-lng="o.location_lat_lon"
          :icon="getMarkerIcon(o)"
          @click.native="select(o)"
        >
          <l-popup>
            <div class="text-sm">
              <div class="mb-2">
                <span
                  class="inline-block px-2 py-1 text-xs rounded-full"
                  :class="{
                    'bg-purple-100 text-purple-800': o.tenant_id >= 1015,
                    'bg-green-100 text-green-800':
                      o.tenant_id >= 1010 && o.tenant_id < 1015,
                    'bg-blue-100 text-blue-800': o.tenant_id < 1010,
                  }"
                >
                  {{
                    o.tenant_id >= 1015
                      ? "Premium"
                      : o.tenant_id >= 1010
                      ? "High-Value"
                      : "Regular"
                  }}
                </span>
              </div>
              <div><strong>Order ID:</strong> {{ o.order_id }}</div>
              <div><strong>Tenant ID:</strong> {{ o.tenant_id }}</div>
              <div><strong>User ID:</strong> {{ o.user_id }}</div>
              <div>
                <strong>Location:</strong> {{ o.location_lat_lon.join(", ") }}
              </div>
            </div>
          </l-popup>
        </l-marker>
      </template>
    </l-map>

    <!-- Enhanced Legend -->
    <div class="mt-4 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h4 class="text-sm font-medium text-gray-800 mb-3">Heatmap Legend</h4>

      <!-- Color Scale Legend -->
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs text-gray-600 font-medium">Order Density</span>
        <div class="flex items-center gap-2">
          <span class="text-xs text-gray-500">Low</span>
          <div class="flex">
            <div
              class="w-3 h-6 bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 rounded-l"
            ></div>
            <div
              class="w-3 h-6 bg-gradient-to-r from-yellow-400 to-red-500 rounded-r"
            ></div>
          </div>
          <span class="text-xs text-gray-500">High</span>
        </div>
      </div>

      <!-- Legend Details -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        <div class="flex items-center gap-1">
          <div class="w-3 h-3 bg-blue-500 rounded"></div>
          <span class="text-gray-600">Low Activity</span>
        </div>
        <div class="flex items-center gap-1">
          <div class="w-3 h-3 bg-green-500 rounded"></div>
          <span class="text-gray-600">Medium Activity</span>
        </div>
        <div class="flex items-center gap-1">
          <div class="w-3 h-3 bg-yellow-500 rounded"></div>
          <span class="text-gray-600">High Activity</span>
        </div>
        <div class="flex items-center gap-1">
          <div class="w-3 h-3 bg-red-500 rounded"></div>
          <span class="text-gray-600">Peak Activity</span>
        </div>
      </div>

      <!-- Marker Legend -->
      <div class="mt-3 pt-3 border-t border-gray-100">
        <div class="flex items-center gap-4 text-xs">
          <div class="flex items-center gap-1">
            <div
              class="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-sm"
            ></div>
            <span class="text-gray-600">Order Location</span>
          </div>
          <div class="flex items-center gap-1">
            <div
              class="w-4 h-4 bg-green-600 rounded-full border-2 border-white shadow-sm"
            ></div>
            <span class="text-gray-600">High-Value Order</span>
          </div>
          <div class="flex items-center gap-1">
            <div
              class="w-4 h-4 bg-purple-600 rounded-full border-2 border-white shadow-sm"
            ></div>
            <span class="text-gray-600">Premium Order</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
import L from "leaflet";
import "leaflet.heat";
import "leaflet-webgl-heatmap";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// Lightweight wrapper to expose canvas heat layer as a component
const LHeatmap = {
  name: "LHeatmap",
  props: {
    latLngs: { type: Array, required: true },
    radius: { type: Number, default: 25 },
    blur: { type: Number, default: 20 },
    minOpacity: { type: Number, default: 0.2 },
    gradient: {
      type: Object,
      default: () => ({
        0.0: "rgba(0,0,255,0.45)",
        0.4: "#32CD32",
        0.7: "#FFA500",
        1.0: "#FF0000",
      }),
    },
  },
  data() {
    return { attachTimer: null };
  },
  mounted() {
    const layer = L.heatLayer(this.latLngs, {
      radius: this.radius,
      blur: Math.max(this.blur, Math.round(this.radius * 0.6)),
      maxZoom: 17,
      gradient: this.gradient,
    });
    this.layer = layer;
    const attach = () => {
      const map = this.$parent && this.$parent.mapObject;
      if (map) {
        map.addLayer(layer);
        if (this.attachTimer) {
          clearInterval(this.attachTimer);
          this.attachTimer = null;
        }
      }
    };
    // Attempt to attach immediately and keep trying until the map exists
    attach();
    if (!this.layer._map) {
      this.attachTimer = setInterval(attach, 30);
    }
  },
  watch: {
    latLngs(next) {
      if (this.layer && this.layer._map) this.layer.setLatLngs(next);
    },
    radius(next) {
      if (this.layer && this.layer._map) {
        this.layer.setOptions({ radius: next });
        this.layer.redraw();
      }
    },
    blur(next) {
      if (this.layer && this.layer._map) {
        const effective = Math.max(next, Math.round(this.radius * 0.6));
        this.layer.setOptions({ blur: effective });
        this.layer.redraw();
      }
    },
    minOpacity(next) {
      if (this.layer && this.layer._map) {
        this.layer.setOptions({ minOpacity: next });
        this.layer.redraw();
      }
    },
    gradient(next) {
      if (this.layer && this.layer._map) {
        this.layer.setOptions({ gradient: next });
      }
    },
  },
  beforeDestroy() {
    if (this.attachTimer) {
      clearInterval(this.attachTimer);
      this.attachTimer = null;
    }
    if (
      this.layer &&
      this.layer._map &&
      this.$parent &&
      this.$parent.mapObject
    ) {
      this.$parent.mapObject.removeLayer(this.layer);
    }
  },
  render(h) {
    return h();
  },
};

// WebGL heatmap wrapper using leaflet-webgl-heatmap
const LWebglHeatmap = {
  name: "LWebglHeatmap",
  props: {
    latLngs: { type: Array, required: true },
    radius: { type: Number, default: 50 },
    intensity: { type: Number, default: 1 },
    gradient: { type: Object, default: () => ({}) },
  },
  mounted() {
    const layer = (this.layer = L.webGLHeatmap({
      size: this.radius,
      alphaRange: 0.8,
    }));
    const map = this.$parent && this.$parent.mapObject;
    if (map) {
      map.addLayer(layer);
      this._applyData();
    }
  },
  watch: {
    latLngs() {
      this._applyData();
    },
    radius(next) {
      if (this.layer) {
        this.layer.setOptions({ size: next });
      }
    },
    intensity() {
      this._applyData();
    },
  },
  methods: {
    _applyData() {
      if (!this.layer) return;
      const points = this.latLngs.map((p) => ({
        lat: p[0],
        lon: p[1],
        value: p[2] || this.intensity,
      }));
      this.layer.setData(points);
      this.layer.update();
    },
  },
  beforeDestroy() {
    if (this.layer && this.$parent && this.$parent.mapObject) {
      this.$parent.mapObject.removeLayer(this.layer);
    }
  },
  render(h) {
    return h();
  },
};

import orderService from "@/services/orderService";

export default {
  name: "HeatmapPage",
  components: { LMap, LTileLayer, LMarker, LPopup, LHeatmap, LWebglHeatmap },
  data() {
    return {
      orders: [],
      loading: true,
      center: [26.8467, 80.9462],
      tileUrl:
        "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
      labelsUrl:
        "https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png",
      attribution:
        '&copy; OpenStreetMap, &copy; <a href="https://carto.com/attributions">CARTO</a>',
      showHeat: true,
      showMarkers: true,
      radius: 35,
      baseRadius: 35,
      blur: 32,
      weightScale: 0.8,
      gradient: {
        0.0: "#2563eb",
        0.35: "#22c55e",
        0.65: "#f59e0b",
        1.0: "#ef4444",
      },
    };
  },
  computed: {
    useWebgl() {
      return this.radius >= 95;
    },
    heatLatLngs() {
      const w = this.weightScale;
      return this.orders.map((o) => [...o.location_lat_lon, w]);
    },

    // Determine marker style based on tenant_id patterns
    getMarkerStyle() {
      return (order) => {
        const tenantId = order.tenant_id;

        // Premium tenants (higher numbers get special styling)
        if (tenantId >= 1015) {
          return "marker-premium";
        }
        // High-value tenants (medium range)
        else if (tenantId >= 1010) {
          return "marker-high-value";
        }
        // Regular tenants (default styling)
        else {
          return "marker-regular";
        }
      };
    },

    // Get marker icon based on order type
    getMarkerIcon() {
      return (order) => {
        const tenantId = order.tenant_id;

        // Create custom icons for different marker types
        if (tenantId >= 1015) {
          return L.divIcon({
            className: "marker-premium",
            html: '<div style="width: 20px; height: 20px; background-color: #8b5cf6; border: 2px solid white; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          });
        } else if (tenantId >= 1010) {
          return L.divIcon({
            className: "marker-high-value",
            html: '<div style="width: 18px; height: 18px; background-color: #10b981; border: 2px solid white; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>',
            iconSize: [18, 18],
            iconAnchor: [9, 9],
          });
        } else {
          return L.divIcon({
            className: "marker-regular",
            html: '<div style="width: 16px; height: 16px; background-color: #3b82f6; border: 2px solid white; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>',
            iconSize: [16, 16],
            iconAnchor: [8, 8],
          });
        }
      };
    },
  },
  async created() {
    L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });
    this.orders = await orderService.getOrders();
    this.$nextTick(this.fitToOrders);
    this.$nextTick(this.setupZoomBinding);
  },
  methods: {
    select(o) {
      this.$nextTick(() => {});
      return o;
    },
    fitToOrders() {
      if (!this.orders.length || !this.$refs.map) return;
      const bounds = L.latLngBounds(this.orders.map((o) => o.location_lat_lon));
      this.$refs.map.mapObject.fitBounds(bounds.pad(0.1));
    },
    setupZoomBinding() {
      const map = this.$refs.map && this.$refs.map.mapObject;
      if (!map) return;
      map.on("zoomend", () => {
        const z = map.getZoom();
        // Scale the radius with zoom to keep heat visible when zooming out/in
        const scaled = Math.max(
          10,
          Math.min(200, Math.round(this.baseRadius * (z / 12)))
        );
        this.radius = scaled;
      });
    },
  },
};
</script>

<style scoped>
/* Tooltips */
.tooltip-container:hover .tooltip {
  opacity: 1;
  pointer-events: auto;
}

/* Minimal info icon matching app aesthetic */
.info-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  font-size: 10px;
  line-height: 1;
  background-color: #e5e7eb; /* gray-200 */
  color: #374151; /* gray-700 */
}

/* Custom slider styling */
.slider-blue::-webkit-slider-thumb {
  appearance: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.slider-blue::-webkit-slider-thumb:hover {
  background: #2563eb;
  transform: scale(1.1);
}

.slider-blue::-moz-range-thumb {
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.slider-blue::-moz-range-thumb:hover {
  background: #2563eb;
  transform: scale(1.1);
}

/* Smooth transitions for map layers */
.leaflet-heatmap-layer,
.leaflet-marker-pane {
  transition: opacity 0.3s ease-in-out;
}

/* Fade in animation for controls */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.heatmap-controls {
  animation: fadeInUp 0.5s ease-out;
}

/* Enhanced marker styles */
.leaflet-marker-icon {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.leaflet-marker-icon:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

/* Custom marker styles for different types */
.marker-regular {
  background-color: #3b82f6;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.marker-high-value {
  background-color: #10b981;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.marker-premium {
  background-color: #8b5cf6;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .tooltip {
    display: none; /* Hide tooltips on mobile to avoid clutter */
  }

  .heatmap-controls {
    padding: 12px;
  }
}

/* Loading state styles */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
