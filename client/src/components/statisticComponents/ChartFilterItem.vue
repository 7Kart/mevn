<template>
  <v-card class="mx-auto" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4 sm-12">ЦЕНА ЗА КВАДРАТ</div>
        <!-- date range -->
        <div xs-12>
          <range-date-pick
            @changeInterval="onIntervalChange"
            :date-start="chartFilter.dtStart"
            :date-end="chartFilter.dtEnd"
          />
        </div>
        <!-- step picker -->
        <div xs-12>
          <numberPicker
            label="Шаг интервала"
            :value="chartFilter.intervalStep"
            :min="1"
            :iterator="1"
            :max="31"
            @iteratorChanged="onIteratorChanged"
          />
        </div>
        <!-- lines -->
        <chartLine xs-12 v-for="(line, index) in chartLines" :line="line" :key="index" />
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-btn @click="acceptFilter()" color="success" small>Применить</v-btn>
      <v-btn small>Сбросить</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon color="green">mdi-plus</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import rangeDatePick from "../ui/RangeDatePick";
import numberPicker from "../ui/NumberPicker";
import chartLine from "../statisticComponents/ChartLine";

export default {
  components: {
    rangeDatePick,
    numberPicker,
    chartLine
  },
  props: {
    chartFilter: {
      require: true,
      type: Object
    },
    chartId: {
      require: true,
      type: Number
    },
    chartLines: {
      require: true,
      type: Array
    }
  },
  methods: {
    onIntervalChange(dates) {
      [this.chartFilter.dtStart, this.chartFilter.dtEnd] = dates.map(date => {
        const [year, month, day] = date.split("-");
        return new Date(1 * year, 1 * month - 1, 1 * day);
      });
    },
    acceptFilter() {
      this.$store.dispatch("GetChartData", this.chartId);
    },
    onIteratorChanged(iterator) {
      this.chartFilter.intervalStep = iterator;
    }
  }
};
</script>