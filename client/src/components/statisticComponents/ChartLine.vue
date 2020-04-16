<template>
  <div class="d-flex flex-row justify-space-between mb-6 align-center">
    <div class="flex-grow-1 flex-shrink-1" :style="lineStyle"></div>
    <div class="flex-grow-1 text-center flex-shrink-0">{{line.label}}</div>
    <div class="flex-grow-1 text-right flex-shrink-0">
      <v-dialog v-model="dialog" persistent max-width="700px">
        <template v-slot:activator="{ on }">
          <v-btn icon dark v-on="on">
            <v-icon color="green">mdi-border-color</v-icon>
          </v-btn>
        </template>
        <chartLineDialog
          @closeChartLineDialog="dialog=$event"
          :line="line"
          dialogTitle="Настроить фильтр"
          @lineEdited="lineSave"
        />
      </v-dialog>
    </div>
  </div>
</template>

<script>
import chartLineDialog from "./ChartLineDialog";

export default {
  components: {
    chartLineDialog
  },
  data() {
    return {
      dialog: false
    };
  },
  props: {
    line: {
      type: Object,
      default: true
    }
  },
  computed: {
    lineStyle() {
      return {
        border: `${this.line.borderWidth}px solid ${this.line.borderColor}`,
        "background-color": this.line.backgroundColor,
        height: "15px"
      };
    }
  },
  methods: {
    lineSave(updatedLine) {
      this.line.updateLine(updatedLine);
      this.dialog = false;
    }
  }
};
</script>

