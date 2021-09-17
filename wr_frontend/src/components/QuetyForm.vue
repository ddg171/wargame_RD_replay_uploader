<template>
  <v-card>
    <v-card-title class="pt-2">

      <v-spacer></v-spacer>
      <div class="my-1">



        <v-menu offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on">
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </template>

        </v-menu>
        <v-btn class="mx-1" @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </div>
    </v-card-title>
    <v-card-subtitle>
     </v-card-subtitle
    >
    <v-divider class="my-1"></v-divider>
    <v-expand-transition>
      <div v-show="show">
        <v-container>
          <v-row no-gutters>
            <v-col cols="12" md="7">
            </v-col>
          </v-row>
          <v-divider class="my-1"></v-divider>

          <v-row>
            <v-col cols="12" md="6" class="px-0">

            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-expand-transition>
    <v-card-text>
    </v-card-text>
    <v-expand-transition>
      <v-row v-show="show">
        <v-col cols="12">
        </v-col>
      </v-row>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";



export default Vue.extend({
  
});
</script>

<style scoped>

.all-select {
  user-select: all;
}
</style>
