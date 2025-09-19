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
          <div class="mb-4" role="group" aria-labelledby="layers-heading">
            <h4
              id="layers-heading"
              class="text-sm font-medium text-gray-700 mb-2"
            >
              Layers
            </h4>
            <div class="flex gap-4">
              <label class="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  v-model="showHeat"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  aria-label="Toggle heat layer"
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
                  aria-label="Toggle markers"
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

          <!-- Render Mode removed: we always use Canvas for compatibility -->

          <!-- Heatmap Settings -->
          <div class="mb-4">
            <h4 class="text-sm font-medium text-gray-700 mb-3">
              Heatmap Settings
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  aria-label="Heat blur"
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
                  aria-label="Intensity"
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

        <!-- RIGHT: Legend (markers-only) -->
        <div class="mt-6 md:mt-0">
          <h4 class="text-sm font-medium text-gray-800 mb-3">Legend</h4>
          <div class="flex items-center gap-6 text-xs">
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
          </div>
        </div>
      </div>
    </div>

    <l-map
      ref="map"
      :zoom="12"
      :center="center"
      style="height: 100%; width: 100%"
      @ready="onMapReady"
    >
      <l-tile-layer :url="tileUrl" :attribution="attribution" />
      <l-tile-layer :url="labelsUrl" :opacity="0.9" />
      <l-polygon
        v-if="coverageLatLngs.length"
        :lat-lngs="coverageLatLngs"
        :color="'#2563eb'"
        :weight="1"
        :opacity="0.15"
        :fill-color="'#2563eb'"
        :fill-opacity="0.08"
      />
      <HeatLayer
        v-if="showHeat"
        :mode="'canvas'"
        :points="heatPoints"
        :radius="radius"
        :blur="blur"
        :intensity="clampedIntensity"
        :gradient="gradient"
        @ready="() => {}"
        @error="() => {}"
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
                    'bg-green-100 text-green-800':
                      o.tenant_id >= 1010 && o.tenant_id < 1015,
                    'bg-blue-100 text-blue-800': o.tenant_id < 1010,
                  }"
                >
                  {{ o.tenant_id >= 1010 ? "High-Value" : "Regular" }}
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
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup, LPolygon } from "vue2-leaflet";
import L from "leaflet";
import HeatLayer from "@/components/map/HeatLayer.vue";
// import { scaleRadiusWithZoom } from "@/config/heatmap";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// using abstract HeatLayer facade; the page doesn't know the backend

import orderService from "@/services/orderService";

export default {
  name: "HeatmapPage",
  components: { LMap, LTileLayer, LMarker, LPopup, LPolygon, HeatLayer },
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
      radius: 56, // fixed radius (higher for stronger zones)
      baseRadius: 56,
      blur: 52,
      weightScale: 0.8,
      gradient: {
        0.0: "#2563eb",
        0.35: "#22c55e",
        0.65: "#f59e0b",
        1.0: "#ef4444",
      },
      mapReady: false,
      mapInstance: null,
    };
  },
  computed: {
    clampedIntensity() {
      return Math.min(1, Math.max(0, this.weightScale));
    },
    heatLatLngs() {
      const w = this.weightScale;
      return this.orders.map((o) => [...o.location_lat_lon, w]);
    },
    heatPoints() {
      // Non-reactive buffer derivation kept minimal here
      return this.heatLatLngs;
    },

    coverageLatLngs() {
      if (!this.orders || this.orders.length < 3) return [];
      const pts = this.orders.map((o) => ({
        x: o.location_lat_lon[1],
        y: o.location_lat_lon[0],
      }));
      pts.sort((a, b) => (a.x === b.x ? a.y - b.y : a.x - b.x));
      const cross = (o, a, b) =>
        (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
      const lower = [];
      for (const p of pts) {
        while (
          lower.length >= 2 &&
          cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0
        )
          lower.pop();
        lower.push(p);
      }
      const upper = [];
      for (let i = pts.length - 1; i >= 0; i--) {
        const p = pts[i];
        while (
          upper.length >= 2 &&
          cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0
        )
          upper.pop();
        upper.push(p);
      }
      const hull = lower.slice(0, -1).concat(upper.slice(0, -1));
      if (hull.length < 3) return [];
      const centroid = hull.reduce(
        (acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }),
        { x: 0, y: 0 }
      );
      centroid.x /= hull.length;
      centroid.y /= hull.length;
      const expand = 1.06;
      return hull.map((p) => {
        const dx = p.x - centroid.x;
        const dy = p.y - centroid.y;
        return [centroid.y + dy * expand, centroid.x + dx * expand];
      });
    },

    // Get marker icon based on order type
    getMarkerIcon() {
      return (order) => {
        const tenantId = order.tenant_id;

        // Create custom icons for different marker types
        if (tenantId >= 1010) {
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
  },
  methods: {
    onMapReady() {
      this.mapInstance = this.$refs.map && this.$refs.map.mapObject;
      this.mapReady = !!this.mapInstance;
      if (this.mapReady) {
        this.fitToOrders();
      }
    },
    select(o) {
      this.$nextTick(() => {});
      return o;
    },
    fitToOrders() {
      if (!this.orders.length || !this.mapReady || !this.mapInstance) return;
      const bounds = L.latLngBounds(this.orders.map((o) => o.location_lat_lon));
      this.mapInstance.fitBounds(bounds.pad(0.1));
    },
    setupZoomBinding() {},
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

/* Canvas rendering quality tweaks */
.leaflet-heatmap-layer canvas {
  image-rendering: auto;
  transform: translateZ(0);
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
