<template>
  <v-container>
    <v-row>
      <FlatItem v-for="flat in getFlats" :key="flat._id" :flat-value="flat"></FlatItem>
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
      console.log(`this.$store.getters.getFlats`, this.$store.getters.getFlats);
      
      return this.$store.getters.getFlats;
    }
  },
  mounted() {
    this.$store.dispatch("getFlats");
  }
};
</script>