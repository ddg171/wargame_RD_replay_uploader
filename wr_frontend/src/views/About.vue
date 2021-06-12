<template>
  <v-main>
    <v-container class="pt-0 pb-16">
      <v-row justify="center">
        <v-col cols="12" md="9" xl="7">
          <about-card></about-card>
        </v-col>
        <v-col cols="12" md="9" xl="7">
          <contact-card />
        </v-col>
        <v-col cols="12" md="9" xl="7">
          <ga-card />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import Vue from "vue";
import AboutCard from "@/components/AboutCard.vue";
import ContactCard from "@/components/ContactCard.vue";
import GaCard from "@/components/GaCard.vue";
export default Vue.extend({
  components: {
    AboutCard,
    ContactCard,
    GaCard,
  },
});
</script>
