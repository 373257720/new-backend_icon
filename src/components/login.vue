<template>
  <div id="login">
    <div class="login con">
      <h2>
        <img src="../../static/sign.png" alt />
      </h2>
      <p>{{remind}}</p>
      <div class="username">
        <el-input placeholder="USER NAME" v-model="username" clearable>
          <i slot="prefix" class="icon-user"></i>
        </el-input>
      </div>
      <div class="password">
        <el-input placeholder="PASSWORD" show-password clearable v-model="password" clearable>
          <i slot="prefix" class="icon-password"></i>
        </el-input>
      </div>
      <div class="email">
        <el-input placeholder="EMAIL VERIFICATION CODE" v-model="email" clearable>
          <i slot="prefix" class="icon-email"></i>
        </el-input>
      </div>

      <!-- <div class="password">
        <el-input placeholder="请输入密码" v-model="password" show-password clearable></el-input>
      </div>
      <div class="password">
        <el-input placeholder="请输入密码" v-model="password" show-password clearable></el-input>
      </div>-->

      <button @click="login">SIGN IN</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      remind: "",
      email:'',
      loading: false
    };
  },
  created() {},
  methods: {
    login() {
      this.remind = "";
      // this.loading = true;
      //      this.$goto("logo");
      if (this.username && this.password) {
        console.log(this.username , this.password)
        this.$axios
          .post(
            `${this.$baseurl}/admin_api/user.back_user/login`,
            this.$qs.stringify({
              username: this.username,
              password: this.password,
              verify:'',
            }),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }
          )
          .then(res => {
            this.loading = false;
            var rescode = res.data.ret;
            if (rescode == 0) {
              this.$store.dispatch("setUser",res.data.data.nickname);
              this.$store.dispatch("settoken_action",res.data.data.token);
              this.$goto("home");
              // this.$router.push({path:'/home'});
            }
            else{
              this.remind=res.data.msg;
            }
          })
          .catch(error => {});
      } else {
        // this.loading = false;
        this.remind = "账号和密码不能为空，请输入 ";
      }
    }
  }
};
</script>
<style lang='scss'>
#login {
  .login {
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
#login {
  position: relative;
  top: 50px;
  height: calc(100% - 50px);
}
.login {
  width: 890px;
  height: 680px;
  box-shadow: 0px 0px 8px #e8e8e8;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 92px;
  transform: translate(-50%, 0);
  overflow: hidden;
  p {
    color: #f36d6c;
    line-height: 40px;
    height: 40px;
  }
  h2 {
    margin: 62px 0 18px 0;
    font: {
      size: 34px;
      weight: bold;
    }
  }
  div.username,
  div.password {
    margin-bottom: 20px;

  }
  div.email {
    margin-bottom: 35px;
  }
  button {
    background: url(../../static/transition.png) no-repeat;
    width: 492px;
    height: 68px;
    // margin-top:35px;
    font-size: 18px;
    color: white;
    // font-weight: 700;
    cursor: pointer;
    // color:
  }
}
</style>

