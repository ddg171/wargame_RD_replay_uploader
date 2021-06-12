/* eslint-disable prettier/prettier */
import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

const myTheme = {
    theme: {
        themes: {
            light: {
                primary: "#009688",
                secondary: "#4caf50",
                accent: "#ffc107",
                error: "#ff5722",
                warning: "#ff9800",
                info: "#607d8b",
                success: "#00bcd4",
                background: "#e0e0e0",
            },
            dark: {
                primary: "#009688",
                secondary: "#4caf50",
                accent: "#ffc107",
                error: "#ff5722",
                warning: "#ff9800",
                info: "#607d8b",
                success: "#00bcd4",
                background: "#666666",
            },
        },
    },
};

// 警告:黄色
// 削除
// エラー:赤
// 投稿

export default new Vuetify(myTheme);
