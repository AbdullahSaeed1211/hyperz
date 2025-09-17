<template>
  <div class="flex items-center justify-between py-4">
    <h1 class="text-2xl font-semibold text-gray-900">{{ currentTitle }}</h1>
    <div class="flex items-center space-x-2">
      <span class="text-gray-600">🗓️</span>
      <date-picker
        v-model="internalRange"
        type="daterange"
        range-separator="-"
        format="D MMMM YYYY"
        value-type="format"
        :editable="false"
        input-class="bg-white border border-gray-300 text-gray-800 text-sm px-3 py-2 rounded-lg"
        @change="emitRange"
      />
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  name: "PageHeader",
  components: { DatePicker },
  props: {
    title: { type: String, default: "" },
    range: { type: Array, default: () => [] },
  },
  data() {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 3);
    const end = new Date(today.getFullYear(), today.getMonth(), 17);
    const format = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const fmt = (d) => format.format(d);
    return {
      internalRange:
        this.range.length === 2 ? this.range : [fmt(start), fmt(end)],
    };
  },
  computed: {
    currentTitle() {
      if (this.title) return this.title;
      const m = this.$route.meta && this.$route.meta.title;
      return m || "";
    },
  },
  methods: {
    emitRange(val) {
      this.$emit("update:range", val);
      this.$emit("change", val);
    },
  },
};
</script>

<style scoped></style>
