<template>
  <div class="d-flex flex-row justify-space-between mb-6 align-center">
    <div class="flex-grow-1 flex-shrink-1" :style="lineStyle"></div>
    <div class="flex-grow-1 text-center flex-shrink-0">{{line.label}}</div>
    <div class="flex-grow-1 text-right flex-shrink-0">
      <v-btn icon>
        <v-icon color="green">mdi-border-color</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    line: {
      type: Object,
      require: true
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
  mounted() {
    console.log("!!!", this.line);
  }
};
</script>

