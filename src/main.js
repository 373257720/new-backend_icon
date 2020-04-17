// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import "./css/base.css";
import qs from 'qs'
import ElementUI from 'element-ui';
import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';
import global from '../src/global';
Vue.prototype.$global = global;
import locale from 'element-ui/lib/locale/lang/en'
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false
Vue.use(ElementUI);
import format from 'vue-text-format';
Vue.use(format);
Vue.prototype.$routerto = function routerTo(name, obj) {
  // console.log(this)
  this.$router.push({
    name: name,
    query: obj
  })
}
let loadingCount=0;
let isShowLoading =true;
console.log(isShowLoading)
function addLoading() {
  // isShowLoading = true;
  // loadingCount++;
  // if(loadingCount==1){
  //   Vue.prototype.$toast.loading({
  //     loadingType: 'circular',
  //     overlay:true,
  //     className:'loading',
  //     duration: 0,
  //   });
  // }
};
function isCloseLoading() {
  // loadingCount--
  // if (loadingCount == 0) {
  //    isShowLoading = false
  //    Vue.prototype.$toast.clear();
  // }
};
Vue.prototype.$qs = qs;
Vue.prototype.$axios = axios
// //让ajax携带cookie
// axios.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   return config;
// }, function (error) {
//   // 对请求错误做些什么
//   ElementUI.MessageBox({
//     title: 'Reminder',
//     message: res.data.msg,
//   }).then(()=>{
//     // router.push({name:'login'})
//     window.location.href = 'http://atm.wearetechman.com/dist/index.html#/login';
//   })
//   return Promise.reject(error)
// });

// axios.defaults.withCredentials = true;
axios.interceptors.response.use(res => {
    if (res.data.ret) {
      let code = res.data.ret;
      if (code > 999) {
        if(isShowLoading){
          isShowLoading=false;
          ElementUI.MessageBox({
            title: 'Reminder',
            message: res.data.msg,
          }).then(()=>{
            // router.push({name:'login'})
            window.location.href = 'http://atm.wearetechman.com/dist/index.html#/login';
            // loadingCount=0;
          })
        }
      }
    }
    return res
  },
  error => {
    // alert('请求失败，请稍后重试！')
    return Promise.reject(error)
  }
)
// //设置baseurl
var baseurl = {
  // api: "http://192.168.1.37:80",
   api: "http://atm.wearetechman.com",
}
Vue.prototype.$baseurl = baseurl.api

router.beforeEach((to, from, next) => {
  store.commit('toprightt', to.name)
  next();
})

String.prototype.getAns = function () {
  var pattern = /(?=((?!\b)\d{3})+$)/g;
  return this.replace(pattern, ',');
}

import pagevue from './components/pagevue.vue'
Vue.component('pagevue', pagevue)
import dialog from './components/dialog.vue'
Vue.component('dialog_reminder', dialog)
import confirm_dialog from './components/confirm_dialog.vue'
Vue.component('confirm_dialog', confirm_dialog)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})

