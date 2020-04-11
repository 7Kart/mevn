<template>
  <v-container v-scroll="onScroll">
    <v-row>
      <FlatItem v-for="flat in getFlats" :key="flat._id" :flat-value="flat"></FlatItem>
      <v-progress-linear
        v-show="getFlatsLoadingStatus && getFlats.length>0"
        indeterminate
        color="cyan"
      ></v-progress-linear>
    </v-row>
  </v-container>
</template>

<script>
import FlatItem from "./FlatItem";

export default {
  components: {
    FlatItem
  },
  computed: {
    getFlats() {
      return this.$store.getters.getFlats;
    },
    //loaded flats flag
    getFlatsLoadingStatus() {
      return this.$store.getters.getFlatsLoadingStatus;
    },

    getAllFilterValues() {
      return this.$store.getters.getAllFilterValues;
    }
  },
  watch: {
    getAllFilterValues(filters) {
      console.log("filter change", filters);
      this.$store.dispatch("changePage", 0);
      this.$store.dispatch("getFlats", filters);
    }
  },

  methods: {
    onScroll(e) {
      if (!this.getFlatsLoadingStatus) {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          this.$store.dispatch("changePage");
          this.$store.dispatch("getFlats", this.getAllFilterValues);
        }
      }
    }
  }
};
</script>