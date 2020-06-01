// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import "./css/base.css";
import qs from 'qs'
Vue.prototype.$qs = qs;
// import ElementUI from 'element-ui';
import axios from 'axios';
Vue.prototype.$axios = axios
import 'element-ui/lib/theme-chalk/index.css';
import element from './element.js'
Vue.use(element)
import global from '../src/global';
Vue.prototype.$global = global;
// import locale from 'element-ui/lib/locale/lang/en'
// Vue.use(element, { locale })

import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
locale.use(lang);

Vue.config.productionTip = false
// Vue.use(ElementUI);
// import format from 'vue-text-format';
// Vue.use(format);
Vue.prototype.$routerto = function routerTo(name, obj) {
  // console.log(this)
  this.$router.push({
    name: name,
    query: obj
  })
}
const restore_obj=global.deepCopy(store._modules.root.state);
console.log(restore_obj)
Vue.prototype.$restore_obj=restore_obj;

let isShowLoading =true;
// axios.defaults.withCredentials = true;
// console.log(Vue.$nextTick)
axios.interceptors.response.use(res => {
    if (res.data.ret) {
      let code = res.data.ret;
      if (code > 999) {
        if(isShowLoading){
          isShowLoading=false;
          console.log(isShowLoading)
          Vue.prototype.$msgbox({
            title: 'Reminder',
            message: res.data.msg,
          }).then(()=>{
            window.sessionStorage.clear();
            store.dispatch("reset_actions",this.$restore_obj)
            // location.href='http://atm.wearetechman.com/dist/index.html'
            // this.$nextTick(function() {
            //   this.isRouterAlive = true
            // });
            router.push({name:'login'})

          })
          return;
        }
      }
    }

    return res
  },
  error => {
    // alert('请求失败，请稍后重试！')
      Vue.$msgbox({
        title: 'Reminder',
        message: 'Network exception, please try again later',
      }).then(()=>{
        window.sessionStorage.clear();
        store.dispatch("reset_actions",this.$restore_obj)
        location.href='http://atm.wearetechman.com/dist/index.html';
        // window.location.href = 'http://atm.wearetechman.com/dist/index.html#/login';
      })
    //   return Promise.reject(error)
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
