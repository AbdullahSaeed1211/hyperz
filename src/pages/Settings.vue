<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold mb-4">General</h3>
        <div class="space-y-3">
          <label class="block text-sm text-gray-600">Store Name</label>
          <input
            class="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="My Store"
          />
          <label class="block text-sm text-gray-600 mt-3">Support Email</label>
          <input
            class="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="support@example.com"
          />
        </div>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold mb-4">Payments</h3>
        <div class="space-y-3">
          <label class="block text-sm text-gray-600">Currency</label>
          <select class="w-full px-3 py-2 border border-gray-300 rounded">
            <option>INR</option>
            <option>USD</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default { name: "SettingsPage" };
</script>

<style scoped></style>
