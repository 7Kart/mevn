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

        <v-btn color="purple" title="перейти на сайт застройщика" text @click="toOriginalSite(flatValue.href)">Подробнее</v-btn>

        <v-spacer></v-spacer>

        <v-btn v-show="getFlatCoast.length > 1" icon @click="show = !show">
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-if="getFlatCoast.length > 1" v-show="show">
          <v-divider></v-divider>
          <v-card-text>
            <v-sheet color="cyan">
              <v-sparkline
                :value="getFlatCoast"
                :labels="getFlatCoast"
                label-size="9"
                color="rgba(255, 255, 255, .7)"
                height="100"
                padding="24"
                stroke-linecap="round"
                smooth
              ></v-sparkline>
            </v-sheet>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    flatValue: {
      type: Object,
      required: true
    }
  },
  computed: {
    getFlatCoast() {
      let coastList = [];
      this.flatValue.changes.forEach(change => {
        if (change["coast"]) coastList.push(change["coast"]);
      });
      coastList.push(this.flatValue.coast);
      return coastList;
    }
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    getYear(date) {
      return `${new Date(date).getFullYear()} г.`;
    },
    toOriginalSite(link) {
      window.open(link, "_blank");
    },
    vk(link){
      window.open(`http://vkontakte.ru/share.php?url=${link}`, "_blank")
    }
  }
};
</script>