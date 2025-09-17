<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-semibold">Customers</h2>

    <div class="bg-white rounded-lg border border-gray-200 p-4">
      <div class="flex flex-wrap gap-3 items-center mb-4">
        <input
          type="text"
          placeholder="Search Customer"
          class="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <select class="px-3 py-2 border border-gray-300 rounded-lg text-sm">
          <option>All</option>
          <option>New</option>
          <option>Returning</option>
        </select>
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
                EMAIL
              </th>
              <th
                class="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ORDERS
              </th>
              <th
                class="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                VALUE
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="4" class="text-center py-12 text-gray-500">
                No customers yet
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default { name: "CustomersPage" };
</script>

<style scoped></style>
