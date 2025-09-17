<template>
  <div class="py-4">
    <div
      class="flex flex-col md:flex-row md:items-center md:justify-between gap-2"
    >
      <h1 class="text-2xl font-semibold text-gray-900">{{ currentTitle }}</h1>
      <div class="flex items-center gap-2">
        <span
          class="inline-flex items-center justify-center w-7 h-7 md:w-6 md:h-6 rounded bg-gray-900 text-white"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-4 h-4"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </span>
        <span class="text-gray-800 text-base md:text-sm">Calendar</span>
        <date-picker
          v-model="internalRange"
          type="daterange"
          range-separator=" - "
          format="d MMMM yyyy"
          value-type="format"
          :editable="false"
          :clearable="false"
          input-class="bg-transparent border-0 text-gray-800 text-base md:text-sm px-0 py-0 focus:outline-none focus:ring-0"
          @change="emitRange"
        />
      </div>
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
    const end = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const start = new Date(end);
    start.setDate(start.getDate() - 13); // show last 14 days
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
<style scoped>
/* Hide the built-in calendar icon inside vue2-datepicker to avoid duplicate icon */
/* deep selector for Vue 2 (vue-loader v15) */
/deep/ .mx-datepicker .mx-input-wrapper .mx-icon-calendar {
  display: none;
}
/* Remove extra input padding reserved for the removed icon */
/deep/ .mx-datepicker .mx-input {
  padding-left: 0;
  padding-right: 0;
}
</style>
