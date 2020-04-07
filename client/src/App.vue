<template>
  <v-app id="inspire">
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" :collapse-on-scroll="true" dark>
      <v-toolbar-title class="ml-0 pl-3">
        <v-app-bar-nav-icon @click.stop="mini = !mini"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">Hives</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      app
      :mini-variant.sync="mini"
      clipped
      color="grey lighten-4"
    >
      <v-list dense class="grey lighten-4">
        <v-list-item v-for="item in items" :key="item.title" :to="item.href" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},
  mounted() {
    this.$store.dispatch("getFlats");
  },
  data: () => ({
    drawer: null,
    mini: true,
    items: [
      { title: "Квартиры", icon: "mdi-home-city", href: "/" },
      { title: "Статистика", icon: "mdi-chart-line", href: "/statistic" }
    ]
  })
};
</script>
