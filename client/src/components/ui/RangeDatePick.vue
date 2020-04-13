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
      dates: [
        `${this.dateStart.getFullYear()}-${this.dateStart.getMonth() +
          1}-${this.dateEnd.getDate()}`,
        `${this.dateEnd.getFullYear()}-${this.dateEnd.getMonth() +
          1}-${this.dateStart.getDate()}`
      ],
      menu: false
    };
  },
  props: {
    dateStart: {
      required: true,
      type: Date
    },
    dateEnd: {
      required: true,
      type: Date
    }
  },
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    }
  },
  watch: {
    dates(dates) {
      if (dates.length > 1) {
        this.$emit("changeInterval", this.dates);
      }
    }
  }
};
</script>