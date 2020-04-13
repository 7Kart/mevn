<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: ["chartdata", "options"],
  watch: {
    chartdata(value) {
      console.log("watch", this.options);
      this.renderChart(value, this.options);
    }
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
};
</script>

<style>
</style>
