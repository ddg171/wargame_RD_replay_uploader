<template>
  <v-navigation-drawer v-model="drawer" absolute left temporary>
    <v-list nav>
      <v-list-item to="/">
        <v-list-item-title>Replay</v-list-item-title>
      </v-list-item>

      <v-list-item to="/about">
        <v-list-item-title>About</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    value: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data() {
    return {
      group: false,
    };
  },
  computed: {
    drawer: {
      get(): boolean {
        return this.value;
      },
      set(val: boolean) {
        this.$emit("input", val);
      },
    },
  },
});
</script>
