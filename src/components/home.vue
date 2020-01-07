<template>
  <div id="home">
    <el-aside width="250px" class="fl-aside">
      <h1>
        <img src="../../static/sign.png" alt />
      </h1>
      <div class="left_body">
        <el-menu
          :default-active="activeName"
          active-text-color="#2ABEE2"
          @open="handleOpen"
          @close="handleClose"
          :unique-opened="true"
          @select='selectone'
        >
          <el-menu-item :style="{ background: 'url(' + coverimg.dashboard + ')  no-repeat'}" index="dashboard"  :class="{active:isActive[2]}"  @click="routerto('/home/dashboard')">
            <i><img :src="color_icon.dashboard" alt=""></i>
            <span slot="title">DASHBOARD</span>
          </el-menu-item>

          <el-submenu :style="{ background: 'url(' + coverimg.user + ')  no-repeat'}" index="user" :class="{active:isActive[1]}">
            <template slot="title">
              <i><img :src="color_icon.user" alt=""></i>
              <span>USER</span>
            </template>
              <el-menu-item   @click="routerto('/home/user/atm_support')" index="atm_support">ATM Technical Support</el-menu-item>
              <el-menu-item  @click="routerto('/home/user/customer_data')" index="customer_data">Customer Data</el-menu-item>
          </el-submenu>
          <el-submenu :style="{ background: 'url(' + coverimg.machines + ')  no-repeat'}" index="machines" :class="{active:isActive[2]}">
            <template slot="title">
             <i><img :src="color_icon.machines" alt=""></i><span>MACHINES</span>
            </template>
              <el-menu-item @click="routerto('/home/machines/machine_subtitle')" index="machine_subtitle">MACHINES</el-menu-item>
              <el-menu-item @click="routerto('/home/machines/group_subtitle')" index="group_subtitle">GROUP PATTERN</el-menu-item>
          </el-submenu>
          <el-menu-item :style="{ background: 'url(' + coverimg.transaction + ')  no-repeat'}" index="transaction"  :class="{active:isActive[2]}" @click="routerto('/home/transaction')">
            <i><img :src="color_icon.transaction" alt=""></i>
            <span slot="title">TRANSACTIONS</span>
          </el-menu-item>
          <el-menu-item :style="{ background: 'url(' + coverimg.wallet + ')  no-repeat'}" index="wallet"  :class="{active:isActive[2]}" @click="routerto('/home/wallet')">
            <i><img :src="color_icon.wallet" alt=""></i>
            <span slot="title">WALLET</span>
          </el-menu-item>
          <el-submenu index="report" :style="{ background: 'url(' + coverimg.report + ')  no-repeat'}" :class="{active:isActive[1]}">
            <template slot="title">
              <i><img :src="color_icon.report" alt=""></i>
              <span slot="title">REPORT</span>
            </template>
            <el-menu-item index="report_lists"  :class="{active:isActive[2]}" @click="routerto('/home/report')">

              <span slot="title">REPORTS</span>
            </el-menu-item>
            <el-menu-item index="report_crytocurrency"  :class="{active:isActive[2]}" @click="routerto('/home/report/report_crytocurrency')">

              <span slot="title">CRYTOCURRENCY</span>
            </el-menu-item>
<!--            <el-menu-item   @click="routerto('/home/user/atm_support')" index="/home/user/atm_support">ATM Technical Support</el-menu-item>-->
<!--            <el-menu-item  @click="routerto('/home/user/customer_data')" index="/home/user/customer_data">Customer Data</el-menu-item>-->
          </el-submenu>
          <el-menu-item :style="{ background: 'url(' + coverimg.compliance+ ')  no-repeat'}" index="compliance" :class="{active:isActive[4]}" @click="routerto('/home/compliance')">
            <i><img :src="color_icon.compliance" alt=""></i>
            <span slot="title">COMPLIANCE</span>
          </el-menu-item>
          <el-menu-item index="setting" :style="{ background: 'url(' + coverimg.setting + ')  no-repeat'}" :class="{active:isActive[2]}" @click="routerto('/home/setting')">
            <i><img :src="color_icon.setting" alt=""></i>
            <span slot="title">SETTING</span>
          </el-menu-item>
          <el-menu-item index="alerts" :style="{ background: 'url(' + coverimg.alerts+ ')  no-repeat'}" :class="{active:isActive[4]}" @click="routerto('/home/alerts')">
            <i><img :src="color_icon.alerts" alt=""></i>
            <span slot="title">ALERTS</span>
          </el-menu-item>
          <el-menu-item index="audit_log"  :style="{ background: 'url(' + coverimg.audit_log + ')  no-repeat'}" :class="{active:isActive[3]}"  @click="routerto('/home/audit_log')">
            <i><img :src="color_icon.audit_log" alt=""></i>
            <span slot="title">AUDIT LOG</span>
          </el-menu-item>
        </el-menu>

      </div>



    </el-aside>
    <!-- <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item)  in levelList" :key="item.path">
        <router-link :to="item.path ||item.redirect">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>-->
    <div class="maincontent">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { log } from "util";
export default {
  data() {
    return {
      coverimg:{
        dashboard:'',
        user:'',
        machines:'',
        transaction:'',
        wallet:'',
        report:'',
        compliance:'',
        setting:'',
        alerts:'',
        audit_log:'',
      },
      levelList: null,
      new_icon:{
        dashboard:'./static/dashborad1.png',
        user:'./static/user1.png',
        machines:'./static/machine1.png',
        transaction:'./static/tran1.png',
        wallet:'./static/wallet1.png',
        report:'./static/repo1.png',
        compliance:'./static/comp1.png',
        setting:'./static/setting2.png',
        alerts:'./static/alert1.png',
        audit_log:'./static/audit1.png',
      },
      color_icon:{
        dashboard:'./static/dashbor2.png',
        user:'./static/ren.png',
        machines:'./static/machine2.png',
        transaction:'./static/tran2.png',
        wallet:'./static/wallet2.png',
        report:'./static/repo2.png',
        compliance:'./static/comp2.png',
        setting:'./static/setting.png',
        alerts:'./static/alert2.png',
        audit_log:'./static/audit2.png',
      },
      original_icon:{
        dashboard:'./static/dashbor2.png',
        user:'./static/ren.png',
        machines:'./static/machine2.png',
        transaction:'./static/tran2.png',
        wallet:'./static/wallet2.png',
        report:'./static/repo2.png',
        compliance:'./static/comp2.png',
        setting:'./static/setting.png',
        alerts:'./static/alert2.png',
        audit_log:'./static/audit2.png',
      },
      activeName: "",
      isActive:{
        '1':false,
        '2':false,
        '3':false,
        '4':false,
      },

    };
  },
  created() {
    let href = window.location.href;
    let path =  href.split("#")[1].substr(1).split('/');
    if(path[1]=='user' || path[1]=='machines' || path[1]=='report'){
      this.activeName = path[2];
    }
    else{
      this.activeName = path[1];
    }

    this.color_icon[path[1]]=this.new_icon[path[1]];
  },



  beforeMount() {
    // this.getActiveNav();
  },
  methods: {
    getActiveNav() {
      let currentUrl = window.location.href;
      this.NavActive = currentUrl.split('#')[1].replace("/","");
      this.NavActive =this.NavActive.split('/')
      console.log(this.NavActive)
    },
    routerto(num){
      this.$router.push({path:num})
    },
    selectone(index, indexPath){
      console.log( index, indexPath)
      for(let key in this.coverimg){
        this.coverimg[key]='';
      }
      for(let key in  this.color_icon ){
        if(this.original_icon.hasOwnProperty(key)){
          this.color_icon[key]=this.original_icon[key];
        }
      }
      let path= indexPath[0]
       this.color_icon[path]=this.new_icon[path];
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
      // let arr = document.querySelector(".el-menu").children;
      // let b = (arr[key - 1].children[0].style.backgroundImage = "");
      // // arr[key - 1].children[0].style.backgroundRepeat = "no-repeat";
      // console.log(b);
    },
    handleOpen(index, keyPath) {
      // console.log(index, keyPath);
      // if(index='user'){
      //   for(let key in this.coverimg){
      //     this.coverimg[key]='';
      //   }
      //   for(let key in  this.color_icon ){
      //     if(this.original_icon.hasOwnProperty(key)){
      //       this.color_icon[key]=this.original_icon[key];
      //     }
      //   }
      //   this.color_icon[index]='../../static/user1.png';
      //   this.coverimg[index]='../../static/col.png';
      // }
      // for(var i in this.isActive){
      //   this.isActive[i]=false;
      // }
      // this.isActive[key]=true;
      // let arr = document.querySelector(".el-menu").children;
      // let b = (arr[key - 1].children[0].style.backgroundImage =
      //   "url('../../static/col.png')");
      // arr[key - 1].children[0].style.backgroundRepeat = "no-repeat";
      // console.log(b);
    },
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.meta.title);
      const first = matched[0];
      this.levelList = matched;
    },
    handleSelect(index) {
      this.activeName = index;
      // console.log(this.activeName)
    },
  },
  mounted() {
    this.getBreadcrumb();
    // document.querySelector('.maincontent')
    // console.log(document.querySelector('.maincontent'));
  },
  watch: {
    $route(index) {
      let path = index.path.substr(1).split('/');
      for(let key in  this.color_icon ){
        if(this.original_icon.hasOwnProperty(key)){
          this.color_icon[key]=this.original_icon[key];
        }
      }
      console.log(path)
      this.color_icon[path[1]]=this.new_icon[path[1]];
      if(path[1]=='user' || path[1]=='machines' || path[1]=='report'){

        this.handleSelect(path[2]);
      }
      else{
        this.handleSelect(path[1]);
      }

    },
  }
};
</script>
<style lang='scss'>
.fl-aside {
  .is-opened {
    margin: 0;
  }
  .el-submenu {
    margin: 0;

    display: block;
  }
  .el-menu {
    border: 0;
    .el-submenu__title,.el-menu-item{
      color:#606266;
      /*#b6b6b6;*/
      font-size: 14px;
      display: flex;
      i{
        /*align-items: center;*/
        display: flex;
        align-items: center;
        img{
          /*vert-align: middle;*/
          height: 16px;
          width: 16px;
          margin-right: 10px;
        }
      }

    }



  }
  .tac {
    overflow-y: scroll;
    //  height: 100%;
  }
  .el-menu-item{
    width: 100%;
  }
  .tac::-webkit-scrollbar {
    width: 0px;
    background: none;
  }
  // .el-submenu__title:hover {
  //   background: url(../../static/col.png) no-repeat;
  // }
 .active {
     background: url(../../static/col.png) no-repeat;
}
}
</style>

<style lang='scss' scoped>
.isActive {
  background: url(../../static/col.png) no-repeat;
}
.breadcrumb {
  position: absolute;
  top: 50px;
  height: 60px;
  left: 250px;
  box-sizing: border-box;
  padding-left: 30px;
  width: 100%;
  line-height: 60px;
  border-bottom: 1px solid #ebeef5;
  // text-align: 60px;
  a {
  }
}

#home {
  height: calc(100% - 50px);
  margin-top: 50px;
  width: 100%;
  display: flex;
  .el-aside{
    overflow: visible;
  }
  .fl-aside {
    box-sizing: border-box;
    .is-active{
      margin:0;
    }
    border-right: 1px solid #d3d3d3;
    width: 252px;
    .left_body{
      border-top: 1px solid #d3d3d3;
      height: calc(100% - 156px);
      overflow-y: auto;
    }
    .left_body::-webkit-scrollbar {
      width: 0px;
      background: none;
    }
    ul {

    }
    h1 {
      width: 252px;
      height: 136px;
      background: #ffffff;
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      img {
        width: 150px;
        height: 60px;
      }
    }
  }
    .maincontent {
    flex:1;
    box-sizing: border-box;
    overflow-y: scroll;
    /*top: 50px;*/
    /*left: 250px;*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*width: calc(100% - 250px);**/
    /*height: calc(100% - 50px);*/
  }
}

h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  /*margin: 0 10px;*/
}
a {
  color: #42b983;
}
</style>
