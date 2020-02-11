import Vue from 'vue';
import Vuex from 'vuex';
import developer from "./developers";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    developer
  }
})
