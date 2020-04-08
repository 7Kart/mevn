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
                <!-- date picker -->
                
                <v-date-picker
                  ref="picker"
                  locale="ru"
                  first-day-of-week="1"
                  v-model="date"
                  :picker-date.sync="pickerDate"
                  full-width
                ></v-date-picker>

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
      pickerDate: null,
      date: new Date().toISOString().substr(0, 10),
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        fill: false
      }
    };
  },
  computed: {
    chartdata() {
      const startDate = new Date(2020, 1, 1);
      const dateEnd = new Date();

      const states = this.$store.getters.GetMeanValue(startDate, dateEnd, 1);

      return {
        labels: states.map(
          state =>
            `${state.date.getDate()}. ${state.date.getMonth() +
              1}. ${state.date.getFullYear()}`
        ),
        datasets: [
          {
            label: "Цена за квадрат",
            backgroundColor: "#1565c057",
            borderColor: "#1565c0",
            borderWidth: 1,
            pointBorderColor: "#07519a",
            data: states.map(state => state.meanValue)
          }
        ]
      };
    }
  },

  mounted() {
    this.$store.dispatch("getStatistic", {});
  },

  methods: {}
};
</script>

