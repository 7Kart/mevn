<template>
  <div class="home">
    <SearchInputBars></SearchInputBars>
    <FlatList></FlatList>
  </div>
</template>

<script>
import FlatList from "@/components/FlatsList";
import SearchInputBars from "@/components/SearchInputBars";

export default {
  name: "Home",
  components: {
    SearchInputBars,
    FlatList
  },  
};



</script>
