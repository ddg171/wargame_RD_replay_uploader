<template>
  <div
    @dragover.prevent="overlay=true"
    @dragleave.prevent="overlay=false"
    @drop.prevent="drop"
  >
    <v-form ref="form" class="m-2" @submit.prevent="submit" v-model="valid">
      <v-file-input
        v-model="file"
        ref="file"
        show-size
        label="replay"
        :rules="fileRule"
        @change="validate"
        required
      />
      <v-textarea
        v-model="comment"
        ref="comment"
        :counter="30"
        label="comment"
        :rules="commentRule"
        auto-grow
      />
      <v-text-field
        v-model="deletePin"
        type="email"
        ref="deletepin"
        :counter="10"
        label="delete key"
        :rules="deletePinRule"
        required
      />
      <v-btn type="submit" color="secondary" :disabled="!valid">upload</v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "../axios";

interface VForm {
  validate: () => boolean;
  reset: () => void;
  resetValidation: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type V<T = any> = (arg0: T) => boolean | string;

type LocalData = {
  file: File | null;
  comment: string;
  deletePin: string;
  maxFileSize: number;
  valid: boolean;
  overlay:boolean
  commentRule: V[];
  deletePinRule: V[];
  fileRule: V[];
};

export default Vue.extend({
  name: "UploadForm",

  data(): LocalData {
    const maxFileSize: number = 25 * 1024 * 1024;
    return {
      file: null,
      comment: "",
      deletePin: "",
      maxFileSize,
      valid: false,
      overlay:false,
      commentRule: [
        (v) =>
          !v ||
          (v && v.length <= 30) ||
          "Comment must be less than 30 characters",
      ],
      deletePinRule: [
        (v) => !!v || "Delete key is required",
        (v) =>
          (v && v.length <= 10) || "Delete key must be less than 10 characters",
      ],
      fileRule: [
        (v) => !!v || "Replay file is required",
        (v) =>
          (v && v.size <= maxFileSize) ||
          `Replay file must be smaller than 20MB`,
        (v) =>
          !!(v && v.name && v.name.toString().indexOf(".wargamerpl2") > -1) ||
          "This file cannot be uploaded",
      ],
    };
  },
  methods: {
    vForm(): VForm {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return this.$refs.form as any;
    },
    drop(e: any): void {
      this.overlay=false
      const newFiles: any = e?.dataTransfer?.files;
      if (newFiles && newFiles.length > 0) {
        this.file = null;
        this.file = newFiles[0] as File;
      }
    },
    submit(): void {
      if (!this.valid) return;
      if (!this.file) {
        this.$emit("error", "file");

        return;
      }
      this.$emit("start");
      this.$gtag.event("upload");
      const payload: FormData = new FormData();
      payload.append("file", this.file);
      payload.append("comment", this.comment || "");
      payload.append("pin", this.deletePin || "");
      const headers = { "content-type": "multipart/form-data" };

      axios
        .post("/replay/upload", payload, { headers })
        .then((res) => {
          // console.log(res);
          const data = res.data;
          const id = data?.id;
          const pin = data?.pin;
          this.$emit("upload", { id, pin });
          this.reset();
          this.$emit("stop");
        })
        .catch((e) => {
          // console.log(e);
          this.$emit("error", "投稿失敗");
          this.$emit("stop");
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
