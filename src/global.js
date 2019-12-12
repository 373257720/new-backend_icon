import axios from 'axios'
import Vue from 'vue'
import router from './router';
import qs from 'qs'

const global = {
  stamptodate: function (stamp) {
    var date = new Date(stamp*1000);
    var Y = date.getFullYear() + "-";
    var M =
      (date.getMonth() + 1 < 10 ?
        "0" + (date.getMonth() + 1) :
        date.getMonth() + 1) + "-";
    var D =
      (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
    return Y + M + D
  },
  timestampToTime: function (timestamp) {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为1
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y + M + D + h + m + s;
  },
get_encapsulation: function (url,  datas) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: datas
      }).then((res) => {
        resolve(res)
      }).catch(function (error) {
        reject(error)
        // console.log(error);
      })
    })
  },
post_encapsulation: function (url,  datas) {
    return new Promise((resolve, reject) => {
      axios.post(url, qs.stringify(datas))
        .then((res) => {
        resolve(res)
      }).catch(function (error) {
        reject(error)
        // console.log(error);
      })
    })

  },
  goods_deatails: function (url, methods, datas, details_lists, nav_lists, investor_infor) {
    return new Promise((resolve, reject) => {
      axios({
        url: url,
        method: methods,
        params: datas
      })
        .then((res) => {
          let signAgreement = res.data.data.signAgreement;
          let investorsId = res.data.data.investorsId;
          let projectName = res.data.data.projectName;
          let signAgreementKey = res.data.data.signAgreementKey;
          for (let i in res.data.data) {
            if (details_lists[i]) {
              if (i == "signStatus") {
                details_lists[i].response = this.pic_obj[
                  res.data.data[i]
                  ];
              } else if (i == "publicCompany") {
                details_lists[i].response = res.data.data[i] == false ? '否' : '是'
              } else {
                details_lists[i].response = res.data.data[i];
              }
            }
            if (nav_lists[i]) {
              if (i == "financingStage") {
                nav_lists[i].response = this.financingStage[
                  res.data.data[i]
                  ];
              } else {
                nav_lists[i].response = res.data.data[i];
              }
            }
            if (investor_infor[i]) {
              if (i == 'investorsType') {
                investor_infor[i].response = this.investorsType[res.data.data[i]]
              } else {
                investor_infor[i].response = res.data.data[i];
              }
            }
          }
          let combin = {
            // investor_infor: investor_infor,
            // details_lists: details_lists,
            // nav_lists: nav_lists,
            signAgreement: signAgreement,
            investorsId: investorsId,
            title: projectName,
            signAgreementKey: signAgreementKey,
          }
          resolve(combin)

        }).catch(function (error) {
        reject(error)
        // console.log(error);
      })
    })

  },
  previous() {
    router.go(-1);

  },
  cleanall() {
    this.$goto("login");
    sessionStorage.clear();

  }


}

export default global
