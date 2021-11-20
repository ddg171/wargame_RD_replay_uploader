<template>
  <v-list-item>
    <v-list-item-avatar tile>
      <v-icon class="grey lighten-1"  dark> mdi-account </v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        {{ playerName || "NO NAME" }}
      </v-list-item-title>
      <v-list-item-subtitle>
        <small class="all-select">
          {{ deck }}
        </small>
      </v-list-item-subtitle>
      <p class="mb-0">
        <template v-if="!!deck">
          <small>
            <b>
              {{ decoded.nation || "NONE" }}
            </b>
            /</small
          >
          <small>
            <b>
              {{ decoded.spec || "NONE" }}
            </b>
            /</small
          >
          <small>
            <b>
              {{ era(decoded.era) || "NONE" }}
            </b>
          </small>
        </template>
        <template v-else>
          <small>//</small>
        </template>
      </p>
    </v-list-item-content>

    <v-btn icon @click="copy(deck)">
      <v-icon> mdi-content-copy </v-icon>
    </v-btn>
  </v-list-item>
</template>

<script lang="ts">
import Vue from "vue";
import { decodeDeck, DeckInfo } from "../deckDecoder";
export default Vue.extend({
  props: {
    deck: {
      type: String,
      default: (): string => {
        return "";
      },
    },
    playerName: {
      type: String,
      default: (): string => {
        return "n/a";
      },
    },
    versionStr:{
      type:String,
      default:()=>''
    }
  },
  computed:{
    decoded():DeckInfo | null{
      return this.decode(this.deck,this.version)
    },
    version():number{
      return parseInt(this.versionStr)
    }
  },
  methods: {
    copy(str: string): void {
      if (navigator.clipboard) {
        this.$gtag.event("copy_deck");
        try {
          navigator.clipboard.writeText(str);
          this.$emit("copy");
        } catch (error) {
          this.$emit("error");
        }
      }
    },
    decode(deck: string,version:number): DeckInfo | null {
      return decodeDeck(deck,version);
    },
    era(cat: string): string {
      const eraMap: { [T: string]: string } = {
        A: "All",
        B: "Before 1985",
        C: "Before 1980",
      };
      return eraMap[cat] || cat;
    },
  },
});
</script>
<style scoped>
.all-select {
  user-select: all;
}
</style>
