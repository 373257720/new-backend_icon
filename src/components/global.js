import axios from 'axios'
import Vue from 'vue'
const global = {
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
  changepage: async function (url, num, currpage, pagesize,arr) {
     axios({
      method: "get",
      url: `${url}/bsl_web/projectSign/project`,
      params: {
        projectStatus: num,
        pageIndex: currpage,
        pageSize: pagesize
      }
    }).then(res => {
      
      arr = [...res.data.data.lists];
      arr.forEach((item,idx) => {
        item.projectStartTime = this.timestampToTime(item.projectStartTime)
        item.signTime = this.timestampToTime(item.signTime)
        arr = Vue.set(arr,idx,item)
        console.log(arr)
      })    
    })
  },
  cleanall(){
    this.$goto("login");
    sessionStorage.clear();
    
  }


  // abc:async function(url, num, currpage, pagesize){
  //   let a = await this.getdata(url, num, currpage, pagesize);
  //   console.log(a);
  // }


}

export default global
