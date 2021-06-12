<template>
  <v-app
    :style="`position: relative; background-color: ${$vuetify.theme.themes[theme].background};`"
  >
    <app-bar @drawer="drawer = true" />
    <drawer v-model="drawer" />
    <v-main>
      <router-view />
    </v-main>
    <v-fab-transition>
      <v-btn
        absolute
        fixed
        large
        right
        bottom
        class="fab-btn-pos"
        @click="goToTop"
      >
        <v-icon>mdi-format-vertical-align-top</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import AppBar from "./components/AppBar.vue";
import Drawer from "./components/Drawer.vue";

export default Vue.extend({
  name: "App",
  components: {
    AppBar,
    Drawer,
  },
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },

  methods: {
    goToTop(): void {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
});
</script>
<style>
.fab-btn-pos {
  bottom: 5rem;
  right: 5rem;
}
</style>
