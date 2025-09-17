<template>
  <div>
    <apexchart
      type="line"
      height="180"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "KpiChart",
  components: { apexchart: VueApexCharts },
  props: {
    series: {
      type: Array,
      default: () => [
        { name: "Active", data: [0, 0, 0, 0, 0, 0] },
        { name: "Completed", data: [0, 0, 0, 0, 0, 0] },
        { name: "Cancelled", data: [0, 0, 0, 0, 0, 0] },
      ],
    },
  },
  data() {
    return {
      chartOptions: {
        chart: {
          toolbar: { show: false },
          zoom: { enabled: false },
          animations: { enabled: false },
        },
        stroke: { curve: "smooth", width: 2 },
        colors: ["#0671e3", "#40c16a", "#fca432"],
        xaxis: {
          labels: { show: false },
          axisBorder: { show: false },
          axisTicks: { show: false },
        },
        yaxis: {
          tickAmount: 5,
          labels: { style: { colors: "#373d3f" } },
        },
        grid: { borderColor: "#e0e0e0" },
        legend: { show: false },
        tooltip: { theme: "light" },
      },
    };
  },
};
</script>

<style scoped></style>
