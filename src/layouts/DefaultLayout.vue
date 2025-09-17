<template>
  <div class="min-h-screen bg-gray-50">
    <div
      :class="[
        'fixed z-[1000] app-sidebar top-0 left-0 w-64 h-full transform md:transform-none',
        mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        'transition-transform duration-150',
      ]"
    >
      <Sidebar
        :collapsed="sidebarCollapsed"
        @toggle="sidebarCollapsed = !sidebarCollapsed"
      />
    </div>
    <div class="relative flex flex-col md:ml-64">
      <Navbar :title="pageTitle" @toggle-mobile="mobileOpen = true" />
      <div class="px-6 bg-gray-50">
        <PageHeader :title="pageTitle" :range.sync="dateRange" />
      </div>
      <main class="flex-1 p-6 pt-0 bg-gray-50 overflow-y-auto">
        <router-view />
      </main>
    </div>
    <!-- Overlay for mobile -->
    <div
      v-if="mobileOpen"
      class="fixed inset-0 bg-black bg-opacity-50 md:hidden z-[950]"
      @click="mobileOpen = false"
    ></div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import PageHeader from "@/components/PageHeader.vue";

export default {
  name: "DefaultLayout",
  components: { Sidebar, Navbar, PageHeader },
  data() {
    return { sidebarCollapsed: false, mobileOpen: false, dateRange: [] };
  },
  computed: {
    pageTitle() {
      const m = this.$route.meta && this.$route.meta.title;
      return m || "Admin Panel";
    },
  },
  watch: {
    $route() {
      this.mobileOpen = false;
    },
  },
};
</script>

<style scoped></style>
