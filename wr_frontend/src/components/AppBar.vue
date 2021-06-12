<template>
  <v-app-bar app color="primary" dark>
    <v-container class="fill-height py-0">
      <v-toolbar-title class="mr-10">
        <router-link tag="span" to="/">
          Wargame: RD Replay Uploader(α)
        </router-link>
      </v-toolbar-title>
      <v-btn to="/" class="d-none d-sm-flex" text>Replay</v-btn>
      <v-btn to="/about" class="d-none d-sm-flex" text>About</v-btn>
    </v-container>

    <v-spacer></v-spacer>

    <!-- <v-btn class="d-none d-sm-flex" text>lang</v-btn> -->
    <v-app-bar-nav-icon
      class="d-flex d-sm-none"
      @click="$emit('drawer')"
    ></v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "AppBar",
});
</script>
