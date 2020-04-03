<template>
  <div id="home">
    <el-aside width="250px" class="fl-aside">
      <h1>
              <img src="../../static/sign.png" alt />
            </h1>
      <div class="left_body">
        <el-menu
          @open="handleOpen"
          @close="handleClose"
          active-text-color="#2AB4E5"
          :unique-opened="true"
          @select='selectone'
        >
<!--          :default-active="activeName"-->

          <el-menu-item  :class="{bgisactive:text.dashboard}"  @mouseenter.native="changeImageSrc('dashboard', 'hover')"   @mouseleave.native="changeImageSrc('dashboard', 'leave')" index="dashboard"   @click="routerto('/home/dashboard')">
            <i><img :src="color_icon.dashboard" alt=""></i>
            <span  slot="title" :class="{textisactive:text.dashboard}">DASHBOARD</span>
          </el-menu-item>
          <el-submenu :class="{bgisactive:text.user}" @mouseenter.native="changeImageSrc('user', 'hover')"   @mouseleave.native="changeImageSrc('user', 'leave')" index="user" >
            <template slot="title">
              <i><img :src="color_icon.user" alt=""></i>
              <span :class="{textisactive:text.user}">USER</span>
            </template>
              <el-menu-item   @click="routerto('/home/user/atm_support')" index="atm_support">ATM Technical Support</el-menu-item>
              <el-menu-item  @click="routerto('/home/user/customer_data')" index="customer_data">Customer Data</el-menu-item>
          </el-submenu>
          <el-submenu  :class="{bgisactive:text.machines}" @mouseenter.native="changeImageSrc('machines', 'hover')"   @mouseleave.native="changeImageSrc('machines', 'leave')" index="machines" >
            <template slot="title">
              <i><img :src="color_icon.machines" alt=""></i>
              <span  :class="{textisactive:text.machines}">MACHINES</span>
            </template>
              <el-menu-item @click="routerto('/home/machines/machine_subtitle')" index="machine_subtitle">MACHINES</el-menu-item>
              <el-menu-item @click="routerto('/home/machines/group_subtitle')" index="group_subtitle">GROUP PATTERN</el-menu-item>
          </el-submenu>
          <el-menu-item  @mouseenter.native="changeImageSrc('transaction', 'hover')"   @mouseleave.native="changeImageSrc('transaction', 'leave')" index="transaction"   @click="routerto('/home/transaction')">
            <i><img :src="color_icon.transaction" alt=""></i>
            <span slot="title">TRANSACTIONS</span>
          </el-menu-item>
          <el-menu-item  @mouseenter.native="changeImageSrc('wallet', 'hover')"   @mouseleave.native="changeImageSrc('wallet', 'leave')" index="wallet"   @click="routerto('/home/wallet')">
            <i><img :src="color_icon.wallet" alt=""></i>
            <span slot="title">WALLET</span>
          </el-menu-item>
          <el-submenu @mouseenter.native="changeImageSrc('report', 'hover')"   @mouseleave.native="changeImageSrc('report', 'leave')" index="report"  >
            <template slot="title">
              <i><img :src="color_icon.report" alt=""></i>
              <span slot="title">REPORT</span>
            </template>
            <el-menu-item index="report_lists"   @click="routerto('/home/report')">
              <span slot="title">REPORTS</span>
            </el-menu-item>
            <el-menu-item index="report_crytocurrency"  @click="routerto('/home/report/report_crytocurrency')">

              <span slot="title">CRYTOCURRENCY</span>
            </el-menu-item>
<!--            <el-menu-item   @click="routerto('/home/user/atm_support')" index="/home/user/atm_support">ATM Technical Support</el-menu-item>-->
<!--            <el-menu-item  @click="routerto('/home/user/customer_data')" index="/home/user/customer_data">Customer Data</el-menu-item>-->
          </el-submenu>
          <el-menu-item  index="compliance"  @click="routerto('/home/compliance')">
            <i><img :src="color_icon.compliance" alt=""></i>
            <span slot="title">COMPLIANCE</span>
          </el-menu-item>
          <el-menu-item index="setting"   @click="routerto('/home/setting')">
            <i><img :src="color_icon.setting" alt=""></i>
            <span slot="title">SETTING</span>
          </el-menu-item>
          <el-menu-item index="alerts"   @click="routerto('/home/alerts')">
            <i><img :src="color_icon.alerts" alt=""></i>
            <span slot="title">ALERTS</span>
          </el-menu-item>
          <el-menu-item index="audit_log"     @click="routerto('/home/audit_log')">
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
    <div class="main">
        <div class="top">
          <div class="top_right">
            <el-dropdown @command="handleCommand" trigger="click">
            <span class="el-dropdown-link">
              {{this.$store.state.currentUser}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="account" >
                  <i><img src="../../static/my account.png" alt=""></i>
                 <span>My account</span>
                </el-dropdown-item>
                <el-dropdown-item command="login">
                  <i><img src="../../static/logout.png" alt=""></i>
                  <span>Log out</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
      </div>
      <div class="maincontent">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
import { log } from "util";
export default {
  data() {
    return {
      // coverimg:{
      //   dashboard:'',
      //   user:'',
      //   machines:'',
      //   transaction:'',
      //   wallet:'',
      //   report:'',
      //   compliance:'',
      //   setting:'',
      //   alerts:'',
      //   audit_log:'',
      // },
      levelList: null,
      text:{
        dashboard:false,
        user:false,
        machines:false,
        transaction:false,
        wallet:false,
        report:false,
        compliance:false,
        setting:false,
        alerts:false,
        audit_log:false,
      },
      new_icon:{
        dashboard:'./static/dashborad2.png',
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
        dashboard:'./static/dashborad1.png',
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
        dashboard:'./static/dashborad1.png',
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

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleCommand(command) {
      if (command == "userpass") {
        this.$routerto("userpass");
      } else if (command == "account") {
        this.$routerto("account");
      } else if (command == "login") {
        this.$routerto("login");
      }
    },
    handleCommandlang(command) {
      // this.$axios({
      //   method: "get",
      //   url: `${this.$baseurl}/bsl_admin_web/base/language.do?lan=${command}`,
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   }
      // })
      this.$global.get_encapsulation( `${this.$baseurl}/bsl_admin_web/base/language.do`,{
        lan:command
      })
        .then(res => {
          if (command == "en_US") {
            this.language = "ENGLISH";
          } else if (command == "zh_CN") this.language = "中文";
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeImageSrc (key, way) {
      // let path = index.path.substr(1).split('/');
      // console.log(this.$route)
      // if(this.activeName===key){
      //   return;
      // }else if(key==='user' && (this.activeName==='atm_support' || this.activeName==='customer_data')){
      //   return;
      // }else if(key==='machines' && (this.activeName==='machine_subtitle' || this.activeName==='group_subtitle')){
      //   return;
      // }else if(key==='report' && (this.activeName==='report_lists' || this.activeName==='report_crytocurrency')){
      //   return;
      // }
      // if(way=== 'hover'){
      //   this.color_icon[key]=this.new_icon[key];
      //   // console.log(this.color_icon[key])
      // }else if(way=== 'leave'){
      //   // console.log(this.color_icon[key],this.new_icon[key])
      //   // if(this.color_icon[key]===this.new_icon[key]){
      //     this.color_icon[key]=this.original_icon[key]
      //   // }
      //
      // }
    },
    toggleShow(x) {
      console.log(x)
      // this.active = "background-color:black";
      // // 操作dom 获取p标签改变其样式
      // var acps = this.$refs.acp
      // acps.style.color = "red"
    },
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
      // console.log( index, indexPath)
      // for(let key in this.coverimg){
      //   this.coverimg[key]='';
      // }
      // for(let key in  this.color_icon ){
      //   if(this.original_icon.hasOwnProperty(key)){
      //     this.color_icon[key]=this.original_icon[key];
      //   }
      // }
      // let path= indexPath[0]
      //  this.color_icon[path]=this.new_icon[path];

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
      // this.text[index]=true;
      // console.log(this.text.user)
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
      console.log(matched)
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


  .bgisactive{
    background-color: #ecf5ff;
    /*color: #2AB4E5;*/
  }
  .el-table .cell{
    word-break: initial;
  }
  .el-table--border, .el-table--group {
    border: 1px solid  #d3d3d3;
  }
.textisactive{
  /*background-color: #ecf5ff;*/
  color: #2AB4E5;
}
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
      /*color:#606266;*/
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
    .el-menu-item:hover{
      color: #2AB4E5;
    }
    .el-submenu__title:hover{
      color: #2AB4E5;
    }



  }
  .tac {
    overflow-y: scroll;
    //  height: 100%;
  }
  .el-menu-item{
    width: 100%;
  }
  .el-menu-item, .el-submenu__title{
    height: 40px;
    line-height: 40px;
  }
  .tac::-webkit-scrollbar {
    width: 0px;
    background: none;
  }
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

  /*height: calc(100% - 60px);*/
  /*margin-top: 60px;*/
  width: 100%;
  height: 100%;
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
      /*border-top: 1px solid #d3d3d3;*/
      height: calc(100% - 156px);
      overflow-y: auto;
    }
    .left_body::-webkit-scrollbar {
      width: 0px;
      background: none;
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
  .main{

    width: calc(100% - 250px);
    /*flex:1;*/
    /*-webkit-box-sizing: border-box;*/
    /*box-sizing: border-box;*/
      .top {
        height:60px;
        width: 100%;
        background: #ecf5ff;
        box-sizing: border-box;
        border-bottom: 1px solid #d3d3d3;
        padding: 0 100px 0 30px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .top_right {
          cursor: pointer;
          font-size: 18px;
          font-weight: 700;
          .language {
            margin:0;
            padding: 0;
            margin-right: 30px;
          }
          .el-dropdown{
            color: #788ca5;
          }

        }
      }
  }

    .maincontent {
    /*flex:1;*/
    box-sizing: border-box;
      /*padding-top: 60px;*/
    overflow-y: scroll;
    /*top: 50px;*/
    /*left: 250px;*/

    /*width: 100%;*/
    /*height: 100%;*/
    /*width: calc(100% - 250px);**/
    height: calc(100% - 50px);
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
  /*display: inline-block;*/
  /*margin: 0 10px;*/
}
a {
  color: #42b983;
}
</style>
