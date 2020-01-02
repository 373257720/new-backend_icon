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
Vue.prototype.$routerto = function routerTo(name, obj) {
  console.log(this)
  this.$router.push({
    name: name,
    query: obj
  })
}
Vue.prototype.$qs = qs;

// import 'vue-googlemaps/dist/vue-googlemaps.css'
// import VueGoogleMaps from 'vue-googlemaps'
// Vue.use(VueGoogleMaps, {
//   load: {
// //填入申请的apiKey账号
//     apiKey: '',
//     libraries: ['places'],
//     useBetaRenderer: false,
//   },
// })
// //让ajax携带cookie
// axios.defaults.withCredentials = true;
axios.interceptors.response.use(res => {
    // endLoading();
    // console.log(123)
    if (res.data.ret) {
      let code = res.data.ret;
      if (code >= 1000) {
        console.log(666,res.data)
        ElementUI.MessageBox({
          title: '提示"',
          message: '登录超时,点击返回登陆页'
        }).then(()=>{
          router.push({name:'login'})
        })
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
