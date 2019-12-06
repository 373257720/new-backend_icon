<template>
  <div id="home">
    <el-aside width="250px" class="fl-aside">
      <h1>
        <img src="../../static/sign.png" alt />
      </h1>
 <el-menu
        :default-active="activeName"
        @select="handleSelect"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-submenu index="1" :class="{ active: isActive }">
          <template slot="title">
            <i class="el-icon-message"></i>USER
          </template>
          <router-link to="/home/userlist/verified_user">
            <el-menu-item index="/home/userlist/verified_user">ATM Technical Support</el-menu-item>
          </router-link>
          <router-link to="/home/project/tosignup">
            <el-menu-item index="/home/project/tosignup">A</el-menu-item>
          </router-link>
          <router-link to="/home/project/signedup">
            <el-menu-item index="/home/project/signedup">Customer Data</el-menu-item>
          </router-link>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>MACHINES
          </template>
          <router-link to="/home/userlist/verified_user">
            <el-menu-item index="/home/userlist/verified_user">已验证用户</el-menu-item>
          </router-link>
          <router-link to="/home/userlist/check_pending">
            <el-menu-item index="/home/userlist/check_pending">待审核用户</el-menu-item>
          </router-link>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu"></i>SETTING
          </template>
          <router-link to="/home/userlist/verified_user">
            <el-menu-item index="/home/userlist/verified_user">已验证用户</el-menu-item>
          </router-link>
          <router-link to="/home/userlist/check_pending">
            <el-menu-item index="/home/userlist/check_pending">待审核用户</el-menu-item>
          </router-link>
        </el-submenu>
      </el-menu>

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
      isActive: false
    };
  },
  created() {
    let href = window.location.href;
    this.activeName = href.split("/#")[1];
  },
  mounted() {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
      let arr = document.querySelector(".el-menu").children;
      let b = (arr[key - 1].children[0].style.backgroundImage = "");
      // arr[key - 1].children[0].style.backgroundRepeat = "no-repeat";
      console.log(b);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
      let arr = document.querySelector(".el-menu").children;
      let b = (arr[key - 1].children[0].style.backgroundImage =
        "url('../../static/col.png')");
      arr[key - 1].children[0].style.backgroundRepeat = "no-repeat";
      console.log(b);
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

  .tac::-webkit-scrollbar {
    width: 0px;
    background: none;
  }
  // .el-submenu__title:hover {
  //   background: url(../../static/col.png) no-repeat;
  // }
  // .active {
  //   background: url(../../static/col.png) no-repeat;
  // }
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
  .fl-aside {
    box-sizing: border-box;
    .is-active{
      margin:0;
    }
    /*position: absolute;*/
    /*top: 50px;*/
    border-right: 1px solid #d3d3d3;
    width: 252px;
    /*height: calc(100% - 50px);*/
    // overflow-y: auto;
    // overflow-x: hidden;

    // .bg{
    //   background:url(../../static/col.png) no-repeat;
    // }
    ul {
      border-top: 1px solid #d3d3d3;
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
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
