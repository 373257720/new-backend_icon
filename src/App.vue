<template>
  <div id="app">
    <div id="top">
      <div class="top con">
        <!-- <div class="top_left fl">BANK投资银行</div> -->
        <div class="top_right fr">
          <el-dropdown @command="handleCommandlang" trigger="click" class="language">
            <span class="el-dropdown-link">
              {{language}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="en_US">ENGLISH</el-dropdown-item>
              <el-dropdown-item command="zh_CN">中文</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <el-dropdown @command="handleCommand" trigger="click" v-if="this.$store.state.topright">
            <span class="el-dropdown-link">
              {{this.$store.state.currentUser}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="login" icon="el-icon-back">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
        </div>
      </div>
    </div>
    <router-view></router-view>
    <!-- <div id="bottom">
      <div class="bottom con">
        <p>BANK投资银行</p>
        <ul>
          <li>About us</li>
          <li>Contact us</li>
          <li>User agreement</li>
          <li>Privacy treaty</li>
          <li>Legal statement</li>
          <li>Rate standard</li>
          <li>Problem feedback</li>
          <li>Novice tutorial</li>
        </ul>
        <footer>copyright@4coin web.2018</footer>
      </div>
    </div> -->
    <!-- :visible.sync="this.$store.state.commandialog" -->
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      language: "中文",
      showw: true
      // commandialog:
    };
  },
  watch: {
    commandialog: function(neww, olld) {
      console.log(neww, olld);
    }
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      // console.dir(this.$store.state);
      // console.dir( JSON.parse(sessionStorage.getItem("store")));
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
      // console.dir(this.$store.state);
      
    }
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
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
        this.$goto("userpass");
      } else if (command == "mysign") {
        this.$goto("mysign");
      } else if (command == "login") {
        this.$goto("login");
      }
    },
    handleCommandlang(command) {
      this.$axios({
        method: "get",
        url: `${this.$baseurl}/bsl_admin_web/base/language.do?lan=${command}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          if (command == "en_US") {
            this.language = "ENGLISH";
          } else if (command == "zh_CN") this.language = "中文";
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang='scss'>
//
#app {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}
#top {
  background: #222222;
  width: 100%;
  height: 50px;
  position: absolute;
  top: 0;
}
.top {
  height: 50px;
  line-height: 50px;
  // overflow: hidden;
  .top_left {
    color: #788ca5;
    font-size: 18px;
    font-weight: 700;
  }
  .top_right {
    // color: #788ca5;
    height: 50px;
    font-size: 18px;
    font-weight: 700;
    display: flex;
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
#bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
   padding:0 0  12px 0;
  // height: 100px;
  background: #222222;
  overflow: hidden;
  text-align: center;
  p {
    color: #788ea6;
    font-size: 18px;
    margin: 12px 0;
  }
  ul {
    // margin-bottom: 20px;
    color: #788ca5;
    display: flex;
    flex-direction: row;
    font-size: 12px;
    li {
      flex-grow: 1;
    }
  }
  footer {
    color: #4c5d71;
    font-size: 12px;
  }
}
</style>
