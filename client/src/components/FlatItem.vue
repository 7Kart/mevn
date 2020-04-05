<template>
  <v-col xs="12" sm="6" md="4" lg="4" xl="3">
    <v-card>
      <v-img :src="flatValue.imgSrc"></v-img>

      <v-card-title>{{flatValue.district}}</v-card-title>

      <v-card-subtitle>цена : {{flatValue.coast}}</v-card-subtitle>
      <v-card-text class="text--primary">
        <div>Этаж: {{flatValue.floor}}</div>

        <div>Сдача: {{getYear(flatValue.dateFinished)}}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="vk(flatValue.href)">Share</v-btn>

        <v-btn
          color="purple"
          title="перейти на сайт застройщика"
          text
          @click="toOriginalSite(flatValue.href)"
        >Подробнее</v-btn>

        <v-spacer></v-spacer>

        <v-btn icon @click="showChart">
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <chart :chartdata="getFlatCoast" :options="chartOptions" :isRender="isRenderChart" />
        </div>
      </v-expand-transition>
    </v-card>
  </v-col>
</template>

<script>
import chart from "./charts/statChart";

export default {
  components: {
    chart
  },
  data: () => {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        fill: false,
        // scales: {
        //   xAxes: [
        //     {
        //       type: "linear",
        //       position: "bottom"
        //     }
        //   ]
        // }
      },
      isRenderChart: false,
      show: false
    };
  },
  props: {
    flatValue: {
      type: Object,
      required: true
    }
  },
  computed: {
    getFlatCoast() {
      let chartdata = {
        labels: [],
        datasets: [
          {
            label: "Цена за метр",
            backgroundColor: "#1976d233",
            borderColor: "#1976d2",
            borderCapStyle: "#9c27b0",
            data: []
          }
        ]
      };
      this.flatValue.changes.forEach(change => {
        if (change.hasOwnProperty("prisePerMeter")) {
          chartdata.labels.push(this.outPutDate(change.dtChanges));
          chartdata.datasets[0].data.push(change.prisePerMeter);
        }
      });
      chartdata.labels.push(this.outPutDate(this.flatValue.dtCheck));
      chartdata.datasets[0].data.push(this.flatValue.prisePerMeter);

      return chartdata;
    }
  },
  methods: {
    getYear(date) {
      return `${new Date(date).getFullYear()} г.`;
    },
    outPutDate(date) {
      let parseDate = new Date(Date.parse(date));
      return `${parseDate.getDate()}.${parseDate.getMonth() +
        1}.${parseDate.getFullYear()}`;
    },
    toOriginalSite(link) {
      window.open(link, "_blank");
    },
    vk(link) {
      window.open(`http://vkontakte.ru/share.php?url=${link}`, "_blank");
    },
    showChart() {
      this.show = !this.show;
      this.isRenderChart = !this.isRenderChart;
    }
  }
};
</script>