<template>
  <aside
    class="bg-black text-gray-300 w-64 min-h-screen flex-shrink-0 flex flex-col"
  >
    <!-- Logo/Brand -->
    <div class="p-4 flex items-center">
      <div class="text-white text-xl font-bold flex items-center">
        <div
          class="w-8 h-8 bg-blue-500 rounded mr-2 flex items-center justify-center text-white font-bold"
        >
          ⚡
        </div>
        <span v-if="!collapsed">Hyperzod</span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-2 app-sidebar-content">
      <router-link
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="flex items-center px-3 py-2 mb-1 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors menu-link"
        active-class="bg-gray-800 text-white border-l-2 border-white"
        exact
      >
        <SidebarIcon :type="link.type" :active="isActive(link)" class="mr-3" />
        <span v-if="!collapsed">{{ link.label }}</span>
      </router-link>
    </nav>

    <!-- Bottom Section -->
    <div class="p-4 border-t border-gray-700">
      <div class="flex items-center text-sm">
        <div
          class="w-6 h-6 bg-blue-500 rounded-full mr-2 flex items-center justify-center"
        >
          <span class="text-white text-xs">🤖</span>
        </div>
        <div v-if="!collapsed">
          <div class="text-white text-xs font-medium">AUTOZOD</div>
          <div class="text-gray-400 text-xs">Automatic order assignment</div>
        </div>
      </div>
    </div>

    <!-- User Guide & Demo -->
    <div class="p-2 space-y-1" v-if="!collapsed">
      <router-link
        to="/user-guide"
        class="flex items-center px-3 py-2 text-gray-400 hover:text-white text-sm"
      >
        <span class="mr-3">📖</span>
        User Guide
      </router-link>
      <router-link
        to="/demo"
        class="flex items-center px-3 py-2 text-gray-400 hover:text-white text-sm"
      >
        <span class="mr-3">📱</span>
        Visit My Store
      </router-link>
      <router-link
        to="/demo-app"
        class="flex items-center px-3 py-2 text-gray-400 hover:text-white text-sm"
      >
        <span class="mr-3">▶️</span>
        Get Demo App
      </router-link>
    </div>
  </aside>
</template>

<script>
import SidebarIcon from "@/components/SidebarIcon.vue";
export default {
  name: "AppSidebar",
  props: {
    collapsed: { type: Boolean, default: false },
  },
  components: { SidebarIcon },
  data() {
    return {
      links: [
        { label: "Dashboard", to: "/dashboard", type: "dashboard" },
        { label: "Orders", to: "/orders", type: "orders" },
        { label: "Orders Heatmap", to: "/orders/heatmap", type: "orders" },
        { label: "Merchant", to: "/merchants", type: "merchant" },
        { label: "Customers", to: "/customers", type: "customers" },
        { label: "Promotions", to: "/promotions", type: "promotions" },
        { label: "Analytics", to: "/analytics", type: "analytics" },
        { label: "Settings", to: "/settings", type: "settings" },
        { label: "Apps", to: "/apps", type: "apps" },
        { label: "Plans", to: "/plans", type: "plans" },
      ],
    };
  },
  methods: {
    isActive(link) {
      return this.$route && this.$route.path === link.to;
    },
  },
};
</script>

<style scoped></style>
