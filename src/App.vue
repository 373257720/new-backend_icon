<template>
  <div id="app" v-if="isRouterAlive">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  provide: function() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      language: "中文",
      isRouterAlive: true,
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
    window.addEventListener("pagehide", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  beforeMount() {
    this.preload();
  },
  mounted() {
    // console.log(456)
  },

  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
    preload() {
      let imgs = ["static/logo.png"];
      for (let img of imgs) {
        let image = new Image();
        image.src = img;
        image.onload = () => {
          // this.count++
          // console.log(1)
          // 计算图片加载的百分数，绑定到percent变量
          // let percentNum = Math.floor(this.count / 14 * 100)
          // this.percent = `${percentNum}%`
        };
      }
    }
  }
};
</script>
<style>
.el-table--border {
  border-right: 1px solid #ebeef5;
}

.el-pager li:hover {
  color: #2abee2;
}
.el-pager li.active {
  color: #2abee2;
}
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  color: #2abee2;
}
.el-message-box {
  border-radius: 5px;
}

.el-button--primary {
  color: #fff;
  background-color: #2abee2 !important;
  border-color: #2abee2;
}

.el-button--primary:hover {
  background-color: #2abee2;
  border-color: #2abee2;
}

.el-message-box__header {
  background: #edf1f4;
  font-size: 16px;
  line-height: 30px;
  text-align: left;
  height: 50px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 10px 20px;
  position: relative;
}

.el-message-box__title {
  line-height: 30px;
}

.el-date-editor .el-range-separator {
  color: #777777;
}

.el-table thead {
  /*color: #909399;*/
  color: #777777;
  /*font-weight: 500;*/
}

.el-table__fixed-right::before {
  /* height: 0; */
  /* background-color:initial; */
}

.el-table--border {
  /*   border-right: 2px;
    border-bottom: 2px; */
}
</style>
<style lang='scss' scoped>
.el-dropdown-menu__item {
  i {
    img {
      width: 14px;
      height: 14px;
    }
  }
}

#app {
  height: 100%;
  width: 100%;
  /*position: relative;*/
  overflow: hidden;
}

#bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 0 12px 0;
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
