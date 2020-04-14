<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <slot name="colorPickerActive" v-bind:on="on" v-on="on"></slot>
    </template>
    <v-color-picker :value="color" @input="onChangeColor($event)"></v-color-picker>
  </v-menu>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: "#1565c057"
    }
  },

  data() {
    return {
      menu: false,
      test: "true"
    };
  },
  methods: {
    onChangeColor(color) {
      this.$emit("changeColor", color);
    }
  }
};
</script>