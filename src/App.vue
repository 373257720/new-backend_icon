<template>
  <div id="app">
    <router-view></router-view>
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
    // commandialog: function(neww, olld) {
    //   console.log(neww, olld);
    // }
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  methods: {

  }
};
</script>

<style lang='scss' scoped>
  .el-dropdown-menu__item{
    i{
      img {
        width: 14px;
        height: 14px;
      }
    }
  }
#app {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;


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
