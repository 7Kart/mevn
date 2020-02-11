<template>
  <v-col cols="12"> 
    <v-card class="pa-2" outlined tile>{{flatValue.roomsCount}}</v-card>
    <v-card class="pa-2" outlined tile>{{flatValue.district}}</v-card>
    <v-card class="pa-2" outlined tile>{{flatValue.area}}</v-card>
    <v-card class="pa-2" outlined tile>{{flatValue.coast}}</v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    flatValue: {
      type: Object,
      required: true
    }
  }
};
</script>