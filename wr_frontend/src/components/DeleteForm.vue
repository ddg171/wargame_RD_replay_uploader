<template>
  <v-form
    ref="form"
    class="m-2 text-right"
    @submit.prevent="submit"
    v-model="valid"
  >
    <v-text-field
      class="d-inline-block"
      v-model="pin"
      ref="deletepin"
      :counter="10"
      label="delete key"
      :rules="deletePinRule"
      required
    />
    <v-btn type="submit" class="mx-2" color="error" :disabled="!valid"
      >DELETE</v-btn
    >
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import { deleteReplay } from "../axios";
import{ debugLog} from '../util/debug'

interface VForm {
  validate: () => boolean;
  reset: () => void;
  resetValidation: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type V<T = any> = (arg0: T) => boolean | string;

type LocalData = {
  pin: string;
  valid: boolean;
  deletePinRule: V[];
};

export default Vue.extend({
  name: "DeleteForm",
  props: {
    id: { type: String, required: true },
  },
  data(): LocalData {
    return {
      pin: "",
      valid: false,
      deletePinRule: [
        (v) => !!v || "Delete key is required",
        (v) =>
          (v && v.length <= 10) || "Delete key must be less than 10 characters",
      ],
    };
  },
  methods: {
    vForm(): VForm {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return this.$refs.form as any;
    },
    submit(): void {
      if (!this.pin) {
        return;
      }
      this.$gtag.event("delete");
      deleteReplay(this.id, this.pin)
        .then((res) => {
          debugLog(res);
          this.$emit("delete", res.id);
        })
        .catch((e) => {
          debugLog(e);
          this.$emit("error");
          this.pin = "";
        });
    },
    validate() {
      this.vForm().validate();
    },
    reset() {
      this.vForm().reset();
    },
    resetValidation() {
      this.vForm().resetValidation();
    },
  },
});
</script>
