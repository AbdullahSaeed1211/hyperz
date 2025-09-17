<template>
  <div class="space-y-6">
    <!-- Page header is provided globally by PageHeader.vue -->

    <div class="bg-white rounded-lg border border-gray-200 p-4">
      <div class="flex flex-wrap gap-3 items-center mb-4">
        <input
          type="text"
          placeholder="Search Merchant"
          class="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <select class="px-3 py-2 border border-gray-300 rounded-lg text-sm">
          <option>Status: All</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <button
          class="ml-auto bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-md"
        >
          Add Merchant
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th
                class="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                NAME
              </th>
              <th
                class="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                CATEGORY
              </th>
              <th
                class="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                LOCATION
              </th>
              <th
                class="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                STATUS
              </th>
              <th
                class="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="5" class="text-center py-12 text-gray-500">
                No merchants yet
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default { name: "MerchantsPage" };
</script>

<style scoped></style>
