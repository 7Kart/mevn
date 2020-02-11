<template>
  <v-container>
    <v-row>
      <FlatItem v-for="flat in flats" :key="flat._id" :flat-value="flat"></FlatItem>
    </v-row>
  </v-container>
</template>

<script>
import FlatItem from "./FlatItem";

export default {
  components: {
    FlatItem
  },
  data() {
    return {
        flats: this.$store.getters.getFlats
    };
  },
  
  mounted() {
      console.log("this.$store.getters.flats", this.$store.getters.getFlats)
  },
};
</script>