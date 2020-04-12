<template>
  <v-layout>
    <v-container>
      <chartItem v-for="chart in charts" :chartProperty="chart" :key="chart.id" />
    </v-container>
  </v-layout>
</template>

<script>
import chartItem from "../components/ChartItem";

export default {
  components: {
    chartItem
  },

  data() {
    return {
      charts: this.$store.getters.getAllCharts
    };
  },

  mounted() {},

  methods: {}
};
</script>

   