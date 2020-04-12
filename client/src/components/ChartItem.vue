<template>
  <v-row class="mb-12">
    <!-- statistic chart container-->
    <v-col md="8" sm="12">
      <chart :chartdata="chartProperty.data" :options="chartProperty.chartOptions" />
    </v-col>
    <!-- chart's filter -->
    <v-col align-self="center" md="4" sm="12">
      <chartFilter :chartFilter="chartProperty.filter" />
    </v-col>
  </v-row>
</template>

<script>
import chart from "./charts/StatisticChart";
import chartFilter from "./ChartFilterItem";

export default {
  props: {
    chartProperty: {
      require: true,
      type: Object
    }
  },
  components: {
    chart,
    chartFilter
  },

  watch: {},

  mounted() {
    if (this.chartProperty.data.length == 0)
      this.$store.dispatch("GetChartData", this.chartProperty.id);
  }
};
</script>