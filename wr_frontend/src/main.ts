import Vue from "vue";
import App from "./App.vue";
import VueGtag from "vue-gtag";
import router from "./router";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

const GA_ID: string | undefined = process.env.VUE_APP_GA_ID;

if (GA_ID) {
  Vue.use(VueGtag, { config: { id: GA_ID } }, router);
}

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
