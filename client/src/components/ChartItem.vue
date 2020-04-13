<template>
  <v-row class="xs-12">
    <!-- statistic chart container-->
    <v-col md="7" xs="12" lg="9">
      <chart :chartdata="chartProperty.data" :options="chartProperty.chartOptions" />
    </v-col>
    <!-- chart's filter -->
    <v-col align-self="center" md="5" xs="12" lg="3">
      <chartFilter :chartId="chartProperty.id" :chartFilter="chartProperty.filter" />
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