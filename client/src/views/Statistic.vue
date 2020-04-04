<template>
  <div class="containe">
    <div class="header">
      <h3 @click="stratRender">statistic page</h3>
    </div>
    <div class="chart-container">
      <!-- <chart :chartdata="chartdata" :options="options" :isRender="isRender" /> -->
    </div>
  </div>
</template>

<script>
import chart from "../components/charts/statChart";
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
      options: {
        responsive: true,
        maintainAspectRatio: false,
        fill: false
      },
      isRender: false
    };
  },

  methods: {
    stratRender() {
      console.log("render change", this.isRender);
      this.isRender = !this.isRender;
    }
  }
};
</script>

