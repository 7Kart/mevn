<template>
  <v-layout>
    <v-container fluid>
      <chartItem v-for="chart in charts" :chartProperty="chart" :key="chart.id" />
    </v-container>
  </v-layout>
</template>

<script>
import chartItem from "../components/statisticComponents/ChartItem";

export default {
  components: {
    chartItem
  },

  data(){
    return {
      charts: this.$store.getters.getCharts
    }
  },

  mounted() {
    if (this.charts.length == 0) this.$store.dispatch("GetLocalChart");
    this.$store.dispatch("getAllDevelopersProjects")
  },

  methods: {}
};
</script>

   