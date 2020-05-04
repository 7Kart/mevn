<template>
  <v-app id="scrolling-flats">
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      :collapse-on-scroll="true"
      dark
    >
      <v-toolbar-title>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">Hives</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list nav dense>
        <v-list-item-group active-class="light-blue--text text--darken-4">
          <v-list-item v-for="item in items" :key="item.title" :to="item.href" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
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
    drawer: false,
    mini: true,
    group: null,
    items: [
      { title: "Квартиры", icon: "mdi-home-city", href: "/" },
      { title: "Статистика", icon: "mdi-chart-line", href: "/statistic" }
    ]
  }),
  watch: {
    group() {
      this.drawer = false;
    }
  }
};
</script>
