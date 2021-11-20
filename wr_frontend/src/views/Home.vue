<template>
  <v-main class="pt-1">
    <v-container class="pt-0 pb-16">
      <v-row justify="center">
        <v-col cols="12" md="10" xl="8">
          <h2>Upload Form</h2>
          <v-divider />
        </v-col>

        <v-col cols="12" md="10" xl="8">
          <v-card>
            <v-card-actions>
              <v-row>
                <v-col cols="12">
                  <upload-form
                    class="fill-width"
                    @start="overlay = true"
                    @stop="overlay = false"
                    @upload="uploaded"
                    @error="showSnackbar"
                    @copy="showSnackbar"
                  />
                  <v-overlay absolute :value="overlay">
                    <v-progress-circular
                      indeterminate
                      size="64"
                    ></v-progress-circular>
                  </v-overlay>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="10" xl="8">
          <h2>Replays</h2>
          <v-divider />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col class="card-wrapper" cols="12" md="10" xl="8"  v-for="r in replays" :key="r.id">
          <replay-card
            :replay="r"
            @error="showSnackbar"
            @copy="showSnackbar"
            @delete="remove(r.id)"
          ></replay-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="10" xl="8">
          <v-card class="mt-2">
            <v-row justify="center">
              <v-col cols="12" class="text-center">
                <v-btn
                  text
                  @click="getReplaylist(10, oldestDate)"
                  :disabled="loadDisabled"
                >
                  {{ isEnd ? "oldest replay" : "load more replays" }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <v-snackbar v-model="snackbar">
        {{ message }}

        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import UploadForm from "../components/UploadForm.vue";
import ReplayCard from "../components/ReplayCard.vue";
import { detail, list } from "../axios";

import Vue from "vue";
import { parseISO } from "date-fns";

type UploadResult = {
  id: string;
  pin: string;
};

type LocalData = {
  snackbar: boolean;
  message: string;
  isEnd: boolean;
  loadDisabled: boolean;
  overlay: boolean;
  replays: any[];
};

export default Vue.extend({
  name: "Home",
  components: {
    UploadForm,
    ReplayCard,
  },
  data(): LocalData {
    return {
      snackbar: false,
      message: "upload",
      isEnd: false,
      loadDisabled: true,
      overlay: false,
      replays: [],
    };
  },
  computed: {
    oldestDate(): Date | undefined {
      if (!this.replays) return undefined;
      const l: number = this.replays.length;
      return parseISO(this.replays[l - 1]?.createdDate);
    },
  },
  created(): void {
    const id: string | undefined = this.$route.query?.id?.toString();
    if (id) {
      this.$router.push({ name: "detail", query: { id } });
      return;
    }
    this.init();
    this.getReplaylist(10);
  },
  methods: {
    init(): void {
      this.replays = [];
      this.message = "upload";
      this.snackbar = false;
    },
    uploaded(payload: UploadResult): void {
      const id: string = payload.id;
      const pin: string = payload.pin;
      // console.log(id, pin);
      if (id) {
        this.getReplay(id);
      }
      const snackberMsgOption: string = pin ? `delete key is "${pin}".` : "";
      this.showSnackbar(`upload successful.${snackberMsgOption}`);
    },
    remove(id: string): void {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const i: number = this.replays.findIndex((r: any) => r.id === id);
      if (i < 0) return;
      this.replays.splice(i, 1);
    },
    getReplay(id: string) {
      detail(id.toString())
        .then((replay) => {
          // console.log(replay);
          this.replays.unshift(replay);
        })
        .catch((e) => {
          // console.log(e);
          this.$emit("error");
        });
    },
    async getReplaylist(limit = 10, start: Date | undefined = undefined) {
      this.loadDisabled = true;
      await list(limit, start)
        .then((replayList: any[]) => {
          if (replayList.length === 0) {
            this.isEnd = true;
            return;
          }
          replayList.forEach((r: any) => {
            this.replays.push(r);
          });
          this.loadDisabled = false;
        })
        .catch((e: any) => {
          // console.log(e);
        });
    },

    showSnackbar(str: string): void {
      this.message = str || "エラー";
      this.snackbar = true;
    },
  },
});
</script>

<style scoped>
 .card-wrapper{
   padding-bottom: 0px;
   padding-top: 7px;
 }
</style>