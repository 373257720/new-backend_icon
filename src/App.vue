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
    window.addEventListener("pagehide", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  methods: {

  }
};
</script>
<style>
.el-message-box{
	border-radius: 5px;
}
.el-button--primary {
    color: #FFF;
    background-color: #2ABEE2;
    border-color: #2ABEE2;
}
.el-button--primary:hover{
  background-color: #2ABEE2;
  border-color: #2ABEE2;
}
.el-message-box__header{
         background: #EDF1F4;
    font-size: 16px;
    line-height: 30px;
    text-align: left;
    height: 50px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px 20px;
    position: relative;
}
.el-message-box__title{
  line-height: 30px;
}
.el-date-editor .el-range-separator{
  color:#777777;
}
.el-table thead {
  /*color: #909399;*/
  color:#777777;
  /*font-weight: 500;*/
}
.el-table__fixed-right::before{
  /* height: 0; */
      /* background-color:initial; */
}
.el-table--border {
/*   border-right: 2px;
    border-bottom: 2px; */
}
</style>
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
  /*position: relative;*/
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
