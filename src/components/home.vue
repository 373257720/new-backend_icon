<template>
  <div id="home">
    <el-aside width="250px" class="fl-aside">
      <h1>
        <img src="../../static/sign.png" alt />
      </h1>
      <div class="left_body">
        <el-menu
          :default-active="activeName"
          @select="handleSelect"
          @open="handleOpen"
          @close="handleClose"
          :unique-opened="true"
        >
          <el-menu-item index="1"  :class="{active:isActive[2]}"  @click="routerto('/home/dashboard')">
            <i class="el-icon-setting"></i>
            <span slot="title">DASHBOARD</span>
          </el-menu-item>
          <el-submenu index="2" :class="{active:isActive[1]}">
            <template slot="title">
              <i class="el-icon-message"></i>USER
            </template>
            <router-link to="/home/user/atm_support">
              <el-menu-item index="/home/user/atm_support">ATM Technical Support</el-menu-item>
            </router-link>
            <router-link to="/home/user/customer_data">
              <el-menu-item index="/home/user/customer_data">Customer Data</el-menu-item>
            </router-link>
          </el-submenu>

          <el-menu-item index="3"  :class="{active:isActive[2]}" @click="routerto('/home/setting')">
            <i class="el-icon-setting"></i>
            <span slot="title">MACHINES</span>
          </el-menu-item>

          <el-menu-item index="4"  :class="{active:isActive[2]}" @click="routerto('/home/setting')">
            <i class="el-icon-setting"></i>
            <span slot="title">TRANSACTIONS</span>
          </el-menu-item>
          <el-menu-item index="5"  :class="{active:isActive[2]}" @click="routerto('/home/setting')">
            <i class="el-icon-setting"></i>
            <span slot="title">WALLET</span>
          </el-menu-item>
          <el-menu-item index="6"  :class="{active:isActive[2]}" @click="routerto('/home/setting')">
            <i class="el-icon-setting"></i>
            <span slot="title">REPORTS</span>
          </el-menu-item>
          <el-menu-item index="7" :class="{active:isActive[4]}">
            <i class="el-icon-setting"></i>
            <span slot="title">COMPLIANCE</span>
          </el-menu-item>

          <el-menu-item index="8"  :class="{active:isActive[2]}" @click="routerto('/home/setting')">
            <i class="el-icon-setting"></i>
            <span slot="title">SETTING</span>
          </el-menu-item>
          <el-menu-item index="9" :class="{active:isActive[4]}">
            <i class="el-icon-setting"></i>
            <span slot="title">ALERTS</span>
          </el-menu-item>
          <el-menu-item index="10" :class="{active:isActive[3]}">
            <i class="el-icon-setting"></i>
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
      msg: "Welcome to Your Vue.js App",
      levelList: null,
      activeName: "/home/tosignup",
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
    // this.activeName = href.split("/#")[1];
  },
  mounted() {},
  methods: {
    routerto(num){
      this.$router.push({path:num})
    },
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
      // for(var i in this.isActive){
      //   this.isActive[i]=false;
      // }
      // this.isActive[key]=true;

    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
      // let arr = document.querySelector(".el-menu").children;
      // let b = (arr[key - 1].children[0].style.backgroundImage = "");
      // // arr[key - 1].children[0].style.backgroundRepeat = "no-repeat";
      // console.log(b);
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
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
    aactiveName() {}
  },
  mounted() {
    this.getBreadcrumb();
    // document.querySelector('.maincontent')
    // console.log(document.querySelector('.maincontent'));
  },
  watch: {
    $route(to, from) {
      if (to.path) {
        this.activeName = to.path;
        var str = to.path;
        // console.log(index);

        // str = str.substring(index + 1, str.length);

        // alert(str);
      }
      this.getBreadcrumb();
    }
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
    // background: red;
  }
  /*.el-menu{*/
  /*  height: 100%;*/
  /*  overflow-y: auto;*/
  /*  !*overflow: hidden;*!*/
  /*}*/

    .maincontent {
    /*position: absolute;*/
    // position: relative;
    flex:1;
    // border-top: 1px solid #ebeef5;
    /*padding-top: 90px;*/
    // padding-bottom: 50px;
    box-sizing: border-box;
    overflow-y: scroll;
    /*top: 50px;*/
    /*left: 250px;*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*width: calc(100% - 250px);**/
    /*height: calc(100% - 50px);*/
  }
  // text-align: center;
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
