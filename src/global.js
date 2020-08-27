import axios from "axios";
import Vue from "vue";
import router from "./router";
import qs from "qs";
import store from "./store/store";

const global = {
  isRouterAlive: true,
  deepCopy: function(obj) {
    var result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          result[key] = this.deepCopy(obj[key]); //递归复制
        } else {
          result[key] = obj[key];
        }
      }
    }
    return result;
  },
  stamptodate: function(stamp) {
    var date = new Date(stamp * 1000);
    var Y = date.getFullYear() + "-";
    var M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
    return Y + M + D;
  },
  timestampToTime: function(timestamp) {
    if (timestamp != 0) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为1
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    } else {
      return "-";
    }
  },
  get_encapsulation: function(url, datas) {
    if (Object.prototype.toString.call(datas) !== "[object Object]") {
      datas = {};
    }
    if (store.state.token) {
      datas.token = store.state.token;
    }
    datas.lang=localStorage.getItem("lan") || "en-us";
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params: datas
        })
        .then(res => {
          resolve(res);
        })
        .catch(function(error) {
          reject(error);
          // console.log(error);
        });
    });
  },
  post_encapsulation: function(url, datas) {
    if (Object.prototype.toString.call(datas) !== "[object Object]") {
      datas = {};
    }
    if (store.state.token) {
      datas.token = store.state.token;
    }
    datas.lang=localStorage.getItem("lan") || "en-us";
    return new Promise((resolve, reject) => {
      axios
        .post(url, qs.stringify(datas), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(res => {
          resolve(res);
        })
        .catch(function(error) {
          reject(error);
          // console.log(error);
        });
    });
  },

  previous() {
    router.go(-1);
  },
  cleanall() {
    this.$routerto("login");
    sessionStorage.clear();
  }
};

export default global;
