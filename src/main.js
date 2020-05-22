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
const restore_obj=deepCopy(store._modules.root.state);
Vue.prototype.$restore_obj=restore_obj;
function deepCopy(obj) {
  var result = Array.isArray(obj) ? [] : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        result[key] = deepCopy(obj[key]); //递归复制
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
};
let isShowLoading =true;
console.log(isShowLoading)
Vue.prototype.$qs = qs;
Vue.prototype.$axios = axios
// axios.defaults.withCredentials = true;
axios.interceptors.response.use(res => {
    if (res.data.ret) {
      let code = res.data.ret;
      if (code > 999) {
        if(isShowLoading){
          isShowLoading=false;
          console.log(isShowLoading)
          ElementUI.MessageBox({
            title: 'Reminder',
            message: res.data.msg,
          }).then(()=>{
            window.sessionStorage.clear();
            store.dispatch("reset_actions",this.$restore_obj)
            location.href='http://atm.wearetechman.com/dist/index.html'
            // router.push({name:'login'})
          })
          return;
        }
      }
    }

    return res
  },
  error => {
    // alert('请求失败，请稍后重试！')
      ElementUI.MessageBox({
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

