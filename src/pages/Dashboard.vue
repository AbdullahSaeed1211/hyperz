<template>
  <div class="space-y-6">
    <!-- Hero two-column layout (hidden on mobile) -->
    <div
      class="hidden md:block rounded-2xl overflow-hidden bg-black text-white"
    >
      <div class="flex items-stretch">
        <div class="w-1/3 p-10 flex justify-center items-center">
          <div>
            <h4 class="text-4xl font-medium">
              Future is
              <span class="text-[#FED600]"
                >hyperlocal<span class="italic">!</span></span
              >
            </h4>
            <h4 class="text-lg font-normal mb-4 mt-2">
              Schedule a FREE 45 minutes business consultation with our experts
            </h4>
            <button
              class="inline-block cursor-pointer py-3 px-4 rounded-md bg-[#0671E3]"
            >
              <p class="m-0">Book a Meeting</p>
            </button>
          </div>
        </div>
        <div class="w-2/3 flex justify-center items-center">
          <iframe
            class="w-full h-60 lg:h-64"
            src="https://www.youtube.com/embed/yb4Sqs4je6c"
            title="YouTube video"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>

    <!-- Page header moved to global PageHeader component -->

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Orders Card -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h4 class="text-sm font-medium text-gray-600 mb-4">Orders</h4>
        <div class="flex items-start justify-between mb-4">
          <div class="text-3xl font-bold text-gray-900">0</div>
          <div class="space-y-2">
            <div class="flex items-center text-sm">
              <div class="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span class="text-gray-600">Active</span>
              <span class="ml-auto font-medium">0</span>
            </div>
            <div class="flex items-center text-sm">
              <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span class="text-gray-600">Completed</span>
              <span class="ml-auto font-medium">0</span>
            </div>
            <div class="flex items-center text-sm">
              <div class="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              <span class="text-gray-600">Cancelled</span>
              <span class="ml-auto font-medium">0</span>
            </div>
          </div>
        </div>
        <KpiChart />
      </div>

      <!-- Sales Card -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h4 class="text-sm font-medium text-gray-600 mb-4">Sales</h4>
        <div class="text-3xl font-bold text-gray-900 mb-4">₹0</div>
        <KpiChart />
      </div>

      <!-- Delivery Fee Card -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h4 class="text-sm font-medium text-gray-600 mb-4">Delivery Fee</h4>
        <div class="text-3xl font-bold text-gray-900 mb-4">₹0</div>
        <KpiChart />
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Top Performing Products -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">
          Top Performing Products
        </h4>
        <div class="text-center py-8 text-gray-500">No data available</div>
      </div>

      <!-- Top Performing Merchants -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">
          Top Performing Merchants
        </h4>
        <div class="text-center py-8 text-gray-500">No data available</div>
      </div>
    </div>
  </div>
</template>

<script>
import bannerUrl from "@/assets/hyperlocal-banner.svg";
import playButtonUrl from "@/assets/playButton.svg";
import KpiChart from "@/components/KpiChart.vue";

export default {
  name: "DashboardPage",
  components: { KpiChart },
  data() {
    return { bannerUrl, playButtonUrl };
  },
};
</script>

<style scoped></style>
