<template>
  <div class="space-y-6">
    <!-- Page header is provided globally by PageHeader.vue -->

    <!-- Filters and Search -->
    <div class="bg-white rounded-lg border border-gray-200 p-4">
      <div class="flex flex-wrap items-center gap-4 mb-4">
        <!-- Filter Tabs -->
        <div class="flex bg-gray-100 rounded-lg p-1">
          <button
            class="px-4 py-2 text-sm font-medium bg-black text-white rounded-md"
          >
            All Orders
          </button>
          <button
            class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Scheduled
          </button>
        </div>

        <!-- Search -->
        <div class="flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search Order"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Per Page -->
        <div class="flex items-center space-x-2 text-sm text-gray-600">
          <span>Per Page</span>
          <select class="border border-gray-300 rounded px-2 py-1">
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>
      </div>

      <!-- Status Filter Tabs -->
      <div class="flex flex-wrap gap-2 mb-6">
        <button
          class="px-3 py-1 text-sm font-medium bg-gray-900 text-white rounded"
        >
          ALL
        </button>
        <button class="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
          Pending
        </button>
        <button class="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
          Accepted
        </button>
        <button class="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
          Ready
        </button>
        <button class="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
          Collected
        </button>
        <button class="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
          Completed
        </button>
        <button class="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
          Cancelled
        </button>
      </div>

      <!-- Table Header -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th
                class="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ORDER ID
              </th>
              <th
                class="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                DATE & TIME
              </th>
              <th
                class="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                MERCHANT
              </th>
              <th
                class="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                CUSTOMER
              </th>
              <th
                class="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ITEMS
              </th>
              <th
                class="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                TOTAL
              </th>
              <th
                class="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                TYPE
              </th>
              <th
                class="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                COMPLETED IN
              </th>
              <th
                class="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                PAYMENT
              </th>
              <th
                class="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                STATUS
              </th>
              <th
                class="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                NOTES
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Empty State -->
            <tr>
              <td colspan="11" class="text-center py-16 text-gray-500">
                There are no records to show
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default { name: "OrdersPage" };
</script>

<style scoped></style>
