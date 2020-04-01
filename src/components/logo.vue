<template>
  <div @click="$routerto('home')" id="logo">
    <div class="logo con">
        <header><img src="../../static/home.png" alt=""></header>
        <p>WELCOME TO ATM BACKEND ADMIN SYSTEM</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "logo",
  data() {
    return {
    };
  },
  created() {},
  methods: {
  }
};
</script>
<style lang='scss'>
#logo {
  .logo {
    text-align: center;
    .el-input--suffix {
      width: 492px;
    }
    .el-input__inner {
      background: #ffffff;
      height: 68px;
      padding-left: 70px;
      border: 1px solid #b6b6b6;
    }
    .el-input__inner::placeholder {
      color: #b6b6b6;
    }
  }
}
</style>
<style lang='scss' scoped>
#logo {
  position: relative;
  top: 50px;
  cursor: pointer;
  height: calc(100% - 50px);
}
.logo {
  width: 830px;
//   height: 345px;
//   background:  #f36d6c;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 188px;
  transform: translate(-50%, 0);
  overflow: hidden;

  header{
      margin-bottom: 36px;
  }
  p {
    color: #919191;
    // line-height: 40px;
    font-size: 30px;
    // height: 40px;
  }

}
</style>

