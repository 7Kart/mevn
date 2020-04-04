<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: ["chartdata", "options", "isRender"],
  watch: {
    isRender(render) {
      console.log("rendder", render);
      if (render) {
        console.log("rendered");
        this.renderChart(this.chartdata, this.options);
      }
    }
  }
};
</script>

<style>
</style>
