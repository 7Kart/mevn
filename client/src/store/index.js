import Vue from 'vue';
import Vuex from 'vuex';
import developer from "./developers";
import flats from "./flats";
import statistic from "./statistic"
// import filterParams from "./filterParams";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    developer,
    flats,
    statistic
    // filterParams
  }
})
