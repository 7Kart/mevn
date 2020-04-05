<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: ["chartdata", "options", "isRender"],
  watch: {
    isRender(render) {
      if (render) {
        this.renderChart(this.chartdata, this.options);
      }
    }
  }
};
</script>

<style>
</style>
