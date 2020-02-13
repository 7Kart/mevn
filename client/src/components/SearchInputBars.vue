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
      </v-row>
    </v-container>
  </v-form>
</template>

<script>

export default {
  data() {
    return {
      developersIds: [],
      developersProjectsIds: []
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
      console.log("developers", this.developersIds);
      this.$store.dispatch("getDevelopersProjects", this.developersIds);
    }
  }
};
</script>
