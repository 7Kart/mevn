<template>
  <v-input :hide-details="true">
    <v-icon slot="prepend" color="green" @click="changeValue(-1, iterator)">mdi-minus</v-icon>
    <v-icon slot="append" color="red" @click="changeValue(1, iterator)">mdi-plus</v-icon>
    <v-text-field
      :readonly="true"
      slot="default"
      class="pa-0 ma-0 centered-inputs"
      :value="currentValue"
      :label="label"
    ></v-text-field>
  </v-input>
</template>

<script>
export default {
  data() {
    return {
      currentValue: this.value
    };
  },
  props: {
    value: {
      type: Number,
      default: 1
    },
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    iterator: {
      type: Number,
      default: 1
    },
    label: {
      type: String,
      default: "Undefined"
    }
  },

  methods: {
    changeValue(direction, iterator) {
      let i = direction * iterator;
      let nextVal = this.currentValue + i;
      if (
        (!this.max || this.max >= nextVal) &&
        (!this.min || this.min <= nextVal)
      ) {
        this.currentValue = nextVal;
        this.$emit("iteratorChanged", this.currentValue);
      }
    }
  }
};
</script>

<style lang="scss">
.centered-inputs {
  input {
    text-align: center;
  }
}
</style>
