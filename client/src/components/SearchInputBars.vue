<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col md="3" cols="12" sm="6">
          <v-select
            :items="getAllDevelopers"
            item-text="name"
            item-value="_id"
            label="Застройщик"
            :multiple="true"
            v-model="developersIds"
            @change="onSelectDeveloper"
          ></v-select>
        </v-col>

        <v-col md="3" cols="12" sm="6">
          <v-select
            :items="developersProjects"
            item-text="name"
            item-value="_id"
            label="Проект"
            :multiple="true"
            v-model="developersProjectsIds"
          ></v-select>
        </v-col>

        <v-col md="6" cols="12" sm="12" class="range-slider-container">
          <v-range-slider
            style="margin-bottom:18px"
            v-model="roomCountRange"
            :max="roomCountMax"
            :min="roomCountMin"
            :hide-details="true"
            thumb-label="always"
            :thumb-size="24"
            label="Количество комнат"
          ></v-range-slider>
        </v-col>

        <v-col md="6" cols="12" sm="12" class="range-slider-container">
          <v-range-slider
            style="margin-bottom:18px"
            v-model="areaRange"
            :max="areaMax"
            :min="areaMin"
            :hide-details="true"
            thumb-label="always"
            :thumb-size="24"
            label="Площадь"
          ></v-range-slider>
        </v-col>

        <v-col md="12" cols="12" sm="12" class="pa-1 text-center" @click="acceptFilter">
          <div class="my-auto mx-auto">
            <v-btn small color="primary">Применить</v-btn>
            <v-btn small>сбросить</v-btn>
          </div>
        </v-col>

      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      developersIds: this.$store.getters.getDeveloperFilter,
      developersProjectsIds: [],
      roomCountRange: this.$store.getters.getRommRange,
      roomCountMin: this.$store.getters.getRoomCountFilter.min,
      roomCountMax: this.$store.getters.getRoomCountFilter.max,
      areaMin: this.$store.getters.getAreaFilter.min,
      areaMax: this.$store.getters.getAreaFilter.max,
      areaRange: this.$store.getters.getAreaRange
    };
  },
  computed: {
    getAllDevelopers() {
      return this.$store.getters.getDevelopers;
    },
    developersProjects() {
      return this.$store.getters.getDevelopersProject;
    }
  },
  mounted() {
    this.$store.dispatch("getAllDevelopers");
  },
  methods: {
    onSelectDeveloper() {
      this.$store.dispatch("getDevelopersProjects", this.developersIds);      
    },
    acceptFilter(){
      console.log("filters", this.$store.getters.getAllFilterValues)
    }
  }
};
</script>

<style lang="scss">
.range-slider-container {
  display: flex;
  align-items: flex-end;
}
</style>