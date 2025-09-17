<template>
  <header
    class="bg-black text-white px-6 py-3 flex items-center justify-between"
  >
    <!-- Left side - Title and Search -->
    <div class="flex items-center space-x-4 w-full">
      <button
        class="md:hidden text-gray-300"
        aria-label="Open sidebar"
        @click="$emit('toggle-mobile')"
      >
        <span class="text-xl">☰</span>
      </button>
      <div
        class="flex-1 max-w-xl mx-4 hidden md:flex items-center bg-gray-800 rounded-lg px-3 py-2"
      >
        <span class="text-gray-400 mr-2">🔍</span>
        <input
          type="text"
          placeholder="Search"
          class="bg-transparent text-sm text-gray-200 placeholder-gray-400 outline-none w-full"
        />
      </div>
    </div>

    <!-- Right side - User Profile (date moved to page headers) -->
    <div class="flex items-center space-x-6">
      <!-- User Profile -->
      <div class="flex items-center space-x-2">
        <div
          class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold"
        >
          AS
        </div>
        <span class="hidden md:inline text-sm font-medium">Abdullah Saeed</span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppNavbar",
  props: { title: { type: String, default: "Admin Panel" } },
  components: {},
};
</script>

<style scoped></style>
