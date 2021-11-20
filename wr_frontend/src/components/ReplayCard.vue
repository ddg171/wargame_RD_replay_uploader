<template>
  <v-card>
    <v-card-title class="pt-2">
      {{ replay.originalName }}
      <v-spacer></v-spacer>
      <div class="my-1">
        <v-btn
          class="mx-1"
          @click="download(replay.id)"
          color="accent"
          :disabled="!!fileURL"
        >
          <v-icon>mdi-download</v-icon>
        </v-btn>
        <a
          class="d-none"
          :href="fileURL"
          :ref="`dl-${replay.id}`"
          :download="replay.originalName"
          >download</a
        >

        <v-menu offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on">
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-btn @click="jump(twUrl)" class="tw-btn share-btn" text>
                <v-icon>mdi-twitter</v-icon>
                Twitter</v-btn
              >
            </v-list-item>
            <v-list-item>
              <v-btn @click="jump(rdUrl)" class="rd-btn share-btn" text>
                <v-icon>mdi-reddit</v-icon>
                Reddit</v-btn
              >
            </v-list-item>
            <v-list-item>
              <input class="all-select" :value="detailUrl" />
              <v-btn icon @click="copy(detailUrl)">
                <v-icon> mdi-content-copy </v-icon>
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn class="mx-1" @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </div>
    </v-card-title>
    <v-card-subtitle>
      <v-avatar size="25" tile>
        <img
          v-if="game.VictoryCond === '1'"
          src="img/destruction.jpg"
          alt="Destruction"
          height="35"
        />
        <img
          v-else-if="game.VictoryCond === '3'"
          src="img/economy.jpg"
          alt="Economy"
          height="35"
        />
        <img v-else src="img/conquest.jpg" alt="Conquest" height="35" />
      </v-avatar>
      <v-avatar v-if="mapTerrain(game.Map) !== 0" size="25" tile>
        <img
          v-if="mapTerrain(game.Map) === 1"
          src="img/land_sea.jpg"
          alt="Destruction"
          height="35"
        />
        <img v-else src="img/sea.jpg" alt="Economy" height="35" />
      </v-avatar>
      <b>
        {{ gameMap(game.Map) }}
      </b>
      <span v-if="game.GameMode === '3'">
        /
        <b> Ranked </b>
      </span>
      /Upload:
      {{ createdDate(replay.createdDate) }}</v-card-subtitle
    >
    <v-divider class="my-1"></v-divider>
    <v-expand-transition>
      <div v-show="show">
        <v-container>
          <v-row no-gutters>
            <v-col cols="12" md="7">
              <v-row no-gutters>
                <v-col cols="12" sm="5" class="pt-0">
                  <b> Version: </b>
                </v-col>
                <v-col class="pt-0">{{ game.Version }}</v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="5" class="pt-0">
                  <b> Map: </b>
                </v-col>
                <v-col class="pt-0">
                  <v-avatar v-if="mapTerrain(game.Map) !== 0" size="25" tile>
                    <img
                      v-if="mapTerrain(game.Map) === 1"
                      src="img/land_sea.jpg"
                      alt="Destruction"
                      height="35"
                    />
                    <img v-else src="img/sea.jpg" alt="Economy" height="35" />
                  </v-avatar>
                  {{ gameMap(game.Map) }}</v-col
                >
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="5" class="pt-0">
                  <b> Game rule: </b>
                </v-col>
                <v-col class="pt-0">{{
                  victoryCondition(game.VictoryCond)
                }}</v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="5" class="pt-0">
                  <b> Game type: </b>
                </v-col>
                <v-col class="pt-0">{{ gameType(game.GameType) }}</v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="5" class="pt-0">
                  <b> Visibility: </b>
                </v-col>
                <v-col class="pt-0">{{
                  parseInt(game.Private) ? "Private" : "Public"
                }}</v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="5" class="pt-0">
                  <b> Starting point: </b>
                </v-col>
                <v-col class="pt-0">{{ game.InitMoney }}</v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="5" class="pt-0">
                  <b> Victory point: </b>
                </v-col>
                <v-col class="pt-0">{{
                  game.ScoreLimit || "Total Destruction"
                }}</v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="5" class="pt-0">
                  <b> Timelimit: </b>
                </v-col>
                <v-col class="pt-0">{{ timeLimit(game.TimeLimit) }}</v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="5" class="pt-0">
                  <b> Income Rate: </b>
                </v-col>
                <v-col class="pt-0">{{ incomeRate(game.IncomeRate) }}</v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="5" class="d-none d-md-flex">
              <v-row justify="center" class="mt-3 mt-sm-0">
                <v-col cols="12">
                  MAP IMAGE
                  <v-img
                    :src="`./map/${mapImage(game.Map)}.jpg`"
                    lazy-src="@/assets/img/map_dummy.jpg"
                    contain
                    min-height="150"
                    max-height="250"
                    max-width="250"
                  >
                  </v-img>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-divider class="my-1"></v-divider>

          <v-row>
            <v-col cols="12" md="6" class="px-0">
              <v-row>
                <v-col>
                  <v-subheader>TEAM 1</v-subheader>
                  <v-list dense>
                    <player
                      v-for="b in team1"
                      :deck="b.PlayerDeckContent"
                      :player-name="b.PlayerName"
                      :version-str="replay.game.Version"
                      :key="`${replay.id}-${b.key}`"
                      @copy="$emit('copy', 'deck copied.')"
                      @error="$emit('error')"
                    />
                  </v-list>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="6">
              <v-row>
                <v-col class="px-0">
                  <v-subheader>TEAM 2</v-subheader>
                  <v-list dense>
                    <player
                      v-for="r in team2"
                      :deck="r.PlayerDeckContent"
                      :player-name="r.PlayerName"
                      :version-str="replay.game.Version"
                      :key="`${replay.id}-${r.key}`"
                      @copy="$emit('copy', 'deck copied.')"
                      @error="$emit('error')"
                    />
                  </v-list>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-expand-transition>
    <v-card-text>
      <p class="d-block d-md-inline-block">comment:</p>
      <p class="d-inline-block">{{ replay.comment }}</p>
    </v-card-text>
    <v-expand-transition>
      <v-row v-show="show" class="mb-1">
        <v-col cols="12">
          <v-divider></v-divider>
          <delete-form
            :id="replay.id"
            @delete="$emit('delete')"
            @error="$emit('error')"
          />
        </v-col>
      </v-row>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import DeleteForm from "./DeleteForm.vue";
import Player from "./Player.vue";
import formatter, { mapNameTrim } from "../formatter";
import parseISO from "date-fns/parseISO/index";
import { format, isDate, isValid } from "date-fns";
import { getURL } from "../axios";
import{ debugLog} from '../util/debug'

type LocalData = {
  fileURL: string | null;
  show: boolean;
  publicPath: string;
};
export default Vue.extend({
  props: {
    replay: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    DeleteForm,
    Player,
  },
  data(): LocalData {
    return {
      fileURL: null,
      show: false,
      publicPath: process.env.BASE_URL,
    };
  },
  computed: {
    game(): any {
      return this.replay.game;
    },
    player(): any[] {
      if (!this.replay?.player) return [];
      return this.replay.player.map((p: any, i: number) => {
        return { ...p, key: `${new Date().getTime()}-${i}` };
      });
    },
    team1(): any[] {
      if (this.game.GameType === "0") {
        return this.player.filter((p: any) => {
          return p.PlayerAlliance === 0;
        });
      }
      return this.replay.player.filter((_: any, i: number) => {
        return i % 2 === 0;
      });
    },
    team2(): any[] {
      if (this.game.GameType === "0") {
        return this.player.filter((p: any) => {
          return p.PlayerAlliance === 1;
        });
      }
      return this.replay.player.filter((_: any, i: number) => {
        return i % 2 === 1;
      });
    },
    detailUrl(): string {
      return `https://wargamerts-tool.com?id=${this.replay.id}`;
    },
    twUrl(): string {
      return `https://twitter.com/intent/tweet?text=Check%20out%20the%20replay.%20%7C%20Wargame:RD%20replay%20uploader%28α%29&url=https%3A%2F%2Fwargamerts-tool.com%3Fid=${this.replay.id}&hashtags=wargameRTS`;
    },
    rdUrl(): string {
      return `https://reddit.com/submit?url=https%3A%2F%2Fwargamerts-tool.com%3Fid%3D${this.replay.id}&title=Check%20out%20the%20replay.%20%7C%20Wargame:RD%20replay%20uploader%28α%29`;
    },
  },
  mounted(): void {
    this.$nextTick(() => {
      this.$emit("loaded");
    });
  },
  methods: {
    createdDate(val: string): string {
      const c: Date = parseISO(val);
      if (!isDate(c) || !isValid(c)) return "n/a";
      return format(c, "yyyy/MM/dd HH:mm:dd");
    },
    gameMode(val: string): string {
      return formatter.gameMode(val.toString());
    },
    victoryCondition(val: string): string {
      return formatter.victoryCondition(val);
    },
    gameType(val: string): string {
      return formatter.gameType(val.toString());
    },
    incomeRate(val: string): string {
      return formatter.incomeRate(val.toString());
    },
    mapImage(val: string): string {
      return mapNameTrim(val);
    },
    gameMap(val: string): string {
      return formatter
        .map(val.toString())
        .replace("#land_sea ", "")
        .replace("#sea ", "");
    },
    timeLimit(val: number): string {
      return formatter.timeLimit(val);
    },
    mapTerrain(val: string): number {
      const name: string = formatter.map(val.toString());
      if (!name) return 0;
      // 海あり
      if (name.indexOf("#land_sea") > -1) return 1;
      // 海のみ
      if (name.indexOf("#sea") > -1) return 2;
      return 0;
    },
    download(id: string): void {
      this.fileURL = null;
      this.$gtag.event("download");
      getURL(id)
        .then((res: any) => {
          debugLog(res);
          const url: string = res.url;
          return url;
        })
        .then((url: string) => {
          this.fileURL = url;
        })
        .then(() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this.$refs[`dl-${this.replay.id}`] as any).click();
        })
        .then(() => {
          this.fileURL = null;
        })
        .catch((e) => {
          debugLog(e);
          this.$emit("error");
          this.fileURL = null;
        });
    },
    open(): void {
      this.show = true;
    },
    jump(url: string): void {
      window.open(url);
    },
    copy(str: string): void {
      if (navigator.clipboard) {
        this.$gtag.event("copy_url");
        try {
          navigator.clipboard.writeText(str);
          this.$emit("copy", "url copied.");
        } catch (error) {
          debugLog(error);
          this.$emit("error");
        }
      }
    },
  },
});
</script>

<style scoped>
.share-btn {
  width: 100%;
}
.tw-btn {
  color: white !important;
  background-color: rgb(94, 170, 222);
}
.rd-btn {
  color: white;
  background-color: rgb(255, 87, 0);
}

.all-select {
  user-select: all;
}
</style>
