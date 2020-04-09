<template>
  <v-layout>
    <v-container>
      <v-row class="mb-12" v-for="chart in charts" :key="chart.id">
        <!-- statistic chart container-->
        <v-col md="8" sm="12">
          <chart :chartdata="{}" :options="chart.chartOptions" />
        </v-col>

        <!-- label to chart -->
        <v-col align-self="center" md="4" sm="12">
          <v-card class="mx-auto" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4 sm-12">ЦЕНА ЗА КВАДРАТ</div>
                <div xs-12>
                  <range-date-pick />
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-btn text>Применить</v-btn>
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
import rangeDatePick from "../components/ui/RangeDatePick";

export default {
  components: {
    chart,
    rangeDatePick
  },

  data() {
    return {
      charts: this.$store.getters.getCharts
    };
  },

  mounted() {
    this.$store.dispatch("GetAllCrartsData");
  },

  methods: {}
};
</script>

  