import Vue from "vue";
import VueI18n from "vue-i18n";
// import store from './store/store'
Vue.use(VueI18n);
import chinese from "../assets/lan/chinese";
import english from "../assets/lan/en";
export const i18n = new VueI18n({
  locale: window.localStorage.getItem("lan")
    ? window.localStorage.getItem("lan")
    : "en-us",
  messages: {
    "zh-cn": chinese,
    "en-us": english
  }
});
