<template>
  <v-layout>
    <v-container>
      <v-row class="mb-12">
        <!-- statistic chart container-->
        <v-col md="8" sm="12">
          <chart :chartdata="chartdata" :options="chartOptions" />
        </v-col>

        <!-- label to chart -->
        <v-col align-self="center" md="4" sm="12">
          <v-card class="mx-auto" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4 sm-12">ЦЕНА ЗА КВАДРАТ</div>
                <v-list-item-title class="headline mb-1">Фильтры</v-list-item-title>
                <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-btn text>Добавить</v-btn>
              <v-btn text>Сбросить</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import chart from "../components/charts/StatisticChart";

export default {
  components: {
    chart
  },

  data: () => {
    return {
      chartdata: {
        labels: ["January", "February"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 20]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        fill: false
      },
      isRender: false
    };
  },

  mounted() {
    this.$store.dispatch("getStatistic", {});
  },

  methods: {}
};
</script>

