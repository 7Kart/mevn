<template>
  <v-card class="mx-auto" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4 sm-12">ЦЕНА ЗА КВАДРАТ</div>
        <div xs-12>
          <range-date-pick :date-start="chartFilter.dtStart" :date-end="chartFilter.dtEnd"/>
        </div>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-btn text>Применить</v-btn>
      <v-btn text>Сбросить</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import rangeDatePick from "./UI/RangeDatePick";

export default {
    components:{
        rangeDatePick
    },
    props:{
        chartFilter:{
            require: true,
            type:Object
        }
    },
    mounted() {
        console.log('filter component init', this.chartFilter);
    },
}
</script>