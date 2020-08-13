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
import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";
locale.use(lang);
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import   '../static/UE/lang/en/en.js'
import  '../static/UE/lang/zh-cn/zh-cn.js'
// console.log(UE.I18N);

import '../static/UE/ueditor.parse.min'
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
// console.log(Vue.$nextTick)
axios.interceptors.response.use(
  res => {
    if (res.data.ret) {
      let code = res.data.ret;
      if (code > 999) {
        if (isShowLoading) {
          isShowLoading = false;
          // console.log(isShowLoading);
          Vue.prototype
            .$msgbox({
              title: "Reminder",
              message: res.data.msg
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
    // alert('请求失败，请稍后重试！')
    Vue.$msgbox({
      title: "Reminder",
      message: "Network exception, please try again later"
    }).then(() => {
      window.sessionStorage.clear();
      store.dispatch("reset_actions", this.$restore_obj);
      isShowLoading = true;
      router.push({ name: "login" });

      // location.href='http://www.cryptogolab.com/master';
      // window.location.href = 'http://atm.wearetechman.com/dist/index.html#/login';
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
Vue.component("dialog_reminder", dialog);
import confirm_dialog from "./components/confirm_dialog.vue";
Vue.component("confirm_dialog", confirm_dialog);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: {
    App
  },
  template: "<App/>"
});
