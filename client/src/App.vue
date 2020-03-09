<template>
  <v-app>
    <v-card class="overflow-hidden">
      <v-app-bar
        :collapse="false"
        :collapse-on-scroll="false"
        color="default"
        dark
        :dense="true"
        scroll-target="#scrolling-flats"
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>Hives</v-toolbar-title>
      </v-app-bar>

      <v-content id="scrolling-flats" class="overflow-y-auto">
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  })
};
</script>
