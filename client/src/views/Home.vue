<template>
  <div class="home">
    <SearchInputBars></SearchInputBars>
  </div>
</template>

<script>
// @ is an alias to /src

import SearchInputBars from "@/components/SearchInputBars";

export default {
  name: "Home",
  components: {
    SearchInputBars
  }
};
</script>
