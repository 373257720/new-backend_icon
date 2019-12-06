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
import global from '@/components/global.js';
Vue.prototype.$global = global
Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.prototype.$goto = function goto(name, id) {
  let obj = {
    name
  };
  if (id) {
    obj.params = {
      idx: id
    };
  }
  this.$router.push(obj);
}
Vue.prototype.$qs = qs;
// //让ajax携带cookie
axios.defaults.withCredentials = true;
axios.interceptors.response.use(res => {
    if (res.data && res.data.resultCode) {
      let code = res.data.resultCode
      // 10101是未登录状态码
      if (code == 10090) {
        Confirm("登录超时,点击返回登陆页", "提示", {
            confirmButtonText: "确定",
            // cancelButtonText: "取消",
            type: "warning",
            center: true,
            showCancelButton: false
          })
          .then(() => {
            location.href = '/'

          });

      }
    }
    return res
  },
  error => {
    alert('请求失败，请稍后重试！')
    return Promise.reject(error)
  }
)
Vue.prototype.$axios = axios
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
