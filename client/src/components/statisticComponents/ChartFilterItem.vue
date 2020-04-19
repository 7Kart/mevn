<template>
  <v-card class="mx-auto" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4 sm-12">ЦЕНА ЗА КВАДРАТ</div>
        <!-- date range -->
        <div>
          <range-date-pick
            @changeInterval="onIntervalChange"
            :date-start="chart.filter.dtStart"
            :date-end="chart.filter.dtEnd"
          />
        </div>
        <!-- step picker -->
        <div>
          <numberPicker
            label="Шаг интервала"
            :value="chart.filter.intervalStep"
            :min="1"
            :iterator="1"
            :max="31"
            @iteratorChanged="onIteratorChanged"
          />
        </div>
        <!-- lines -->
        <chartLine xs-12 v-for="(line, index) in chart.lines" :line="line" :key="index" />
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-btn @click="acceptFilter()" color="success" small>Применить</v-btn>
      <v-btn small>Сбросить</v-btn>
      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" persistent max-width="700px">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon>
            <v-icon color="green">mdi-plus</v-icon>
          </v-btn>
        </template>
        <chartLineDialog
          @closeChartLineDialog="dialog=$event"
          :line="chart.getDefaultLine()"
          dialogTitle="Добавить фильтр"
          @lineEdited="createNewLine"
        />
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import rangeDatePick from "../ui/RangeDatePick";
import numberPicker from "../ui/NumberPicker";
import chartLine from "../statisticComponents/ChartLine";
import chartLineDialog from "./ChartLineDialog";

export default {
  components: {
    rangeDatePick,
    numberPicker,
    chartLine,
    chartLineDialog
  },
  data() {
    return {
      dialog: false
    };
  },
  props: {
    chart: {
      require: true,
      type: Object
    }
  },
  methods: {
    createNewLine(newLine) {
      this.chart.addNewLine(newLine);
      this.$store.dispatch("GetChartData", this.chart.id)
      this.dialog = false;
      //add save data
    },
    onIntervalChange(dates) {
      [this.chart.filter.dtStart, this.chart.filter.dtEnd] = dates.map(date => {
        const [year, month, day] = date.split("-");
        return new Date(1 * year, 1 * month - 1, 1 * day);
      });
    },
    acceptFilter() {
      this.$store.dispatch("GetChartData", this.chart.id);
    },
    onIteratorChanged(iterator) {
      this.chart.filter.intervalStep = iterator;
    }
  }
};
</script>