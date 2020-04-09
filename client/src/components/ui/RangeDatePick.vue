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
      <v-text-field
        v-model="dateRangeText"
        label="Период"
        readonly
        prepend-icon="mdi-calendar-multiselect"
        v-on="on"
      ></v-text-field>
    </template>

    <v-date-picker
      locale="ru"
      first-day-of-week="1"
      v-model="dates"
      no-title
      range
      @blur="menu = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      dates: ["2020-04-10", "2020-04-20"],
      menu: false
    };
  },
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    }
  }
};
</script>