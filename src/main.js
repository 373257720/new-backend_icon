// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store/store";
import "./css/base.css";
import qs from "qs";
Vue.prototype.$qs = qs;
import axios from "axios";
Vue.prototype.$axios = axios;
const url = process.env.BASE_API;
axios.defaults.baseURL = url;
import "element-ui/lib/theme-chalk/index.css";
import element from "./element.js";
Vue.use(element);
import global from "../src/global";
Vue.prototype.$global = global;

import Locale from "element-ui/lib/locale";
import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import { i18n } from "./lan/i18";
function locales(lan) {
  if (lan == "en-us") {
    Locale.use(enLocale);
  }
  if (lan == "zh-cn") {
    Locale.use(zhLocale);
  }
}
Vue.prototype.$Local = locales;
let z = window.localStorage.getItem("lan") || "en-us";
locales(z);
i18n.locale = z;

import "../static/UE/ueditor.parse.min";
Vue.config.productionTip = false;
Vue.prototype.$routerto = function routerTo(name, obj) {
  this.$router.push({
    name: name,
    query: obj
  });
};
const restore_obj = global.deepCopy(store._modules.root.state);
Vue.prototype.$restore_obj = restore_obj;

let isShowLoading = true;
Vue.prototype.$isShowLoading = isShowLoading;
// axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  res => {
    if (res.data.ret) {
      let code = res.data.ret;
      let errMes;
      // 1000 您的账号已在别的设备登录。
      // 1001 登录已超时,请重新登录
      if (code > 999) {
        if (code == 1000) {
          errMes = i18n.t("common.error1000");
        } else if (code == 1001) {
          errMes = i18n.t("common.error1001");
        }
        if (isShowLoading) {
          isShowLoading = false;
          Vue.prototype
            .$msgbox({
              title: i18n.t("common.Reminder"),
              message: errMes
            })
            .then(() => {
              window.sessionStorage.clear();
              store.dispatch("reset_actions", this.$restore_obj);
              isShowLoading = true;
              router.push({ name: "login" });
            });
          return;
        }
      }
    }

    return res;
  },
  error => {
    Vue.$msgbox({
      title: i18n.t("common.Reminder"),
      message: i18n.t("common.Network")
    }).then(() => {
      window.sessionStorage.clear();
      store.dispatch("reset_actions", this.$restore_obj);
      isShowLoading = true;
      router.push({ name: "login" });
    });
    //   return Promise.reject(error)
  }
);
// Vue.prototype.$jsp = function(method,data){
//         // baseUrl就是服务器地址
//         const baseUrl = 'http://192.168.191.1:8000/';
//         let url = `${baseUrl}${method}?`;
//         // jsonp请求参数和get方法类似，都是params的方式拼接
//         for(let item in data){
//             url += `&${item}=${data[item]}`;
//         }
//         return this.$jsonp(url);
//     };
// //设置baseurl
// var baseurl = {
//   // api: "http://192.168.1.37:80",
//   api: "https://www.cryptogolab.com"
//   // api: "http://atm.wearetechman.com"
// };
// Vue.prototype.$baseurl = baseurl.api;

router.beforeEach((to, from, next) => {
  store.commit("toprightt", to.name);
  next();
});

String.prototype.getAns = function() {
  var pattern = /(?=((?!\b)\d{3})+$)/g;
  return this.replace(pattern, ",");
};

import pagevue from "./components/pagevue.vue";
Vue.component("pagevue", pagevue);
import dialog from "./components/dialog.vue";
Vue.component("dialogReminder", dialog);
import confirmDialog from "./components/confirm_dialog.vue";
Vue.component("confirmDialog", confirmDialog);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  i18n,
  components: {
    App
  },
  template: "<App/>"
});
