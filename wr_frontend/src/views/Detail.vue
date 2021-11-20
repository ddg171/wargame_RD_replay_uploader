<template>
  <v-main class="pt-1">
    <v-container class="pt-0 pb-16">
      <v-row justify="center">
        <v-col v-if="!!replay" cols="12" md="10" xl="8">
          <replay-card
            ref="replay"
            :replay="replay"
            @loaded="$refs.replay.open()"
          ></replay-card>
        </v-col>
        <v-col cols="12" md="10" xl="8">
          <v-card></v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import ReplayCard from "../components/ReplayCard.vue";
import { detail } from "../axios";
import{ debugLog} from '../util/debug'


import Vue from "vue";
// import parseISO from "date-fns/parseISO/index";
export default Vue.extend({
  name: "detail",
  data() {
    return {
      replay: null,
    };
  },
  components: {
    ReplayCard,
  },
  created(): void {
    const id: string | undefined = this.$route.query?.id?.toString();
    if (!id) {
      alert("Error.Back to top page.");
      this.$router.push("/");
      return;
    }
    this.getReplay(id);
  },
  methods: {
    getReplay(id: string) {
      detail(id.toString())
        .then((replay) => {
          debugLog(replay);
          this.replay = replay;
        })
        .catch((e) => {
          debugLog(e);
          this.$emit("error");
          alert("Replay is not found.");
          this.$router.push("/");
        });
    },
  },
});
</script>
