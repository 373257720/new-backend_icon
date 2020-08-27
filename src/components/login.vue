<template>
  <div id="login">
    <div class="lan">
      <el-dropdown @command="handleCommandlang" trigger="click" class="language">
        <span class="el-dropdown-link">
          {{language}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="en-us">English</el-dropdown-item>
          <el-dropdown-item command="zh-cn">中文</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="login con" v-loading="loading">
      <h2>
        <img src="../../static/sign.png" alt />
      </h2>
      <p :class="{'reminder':reminder}">{{remind}}</p>
      <div class="username">
        <el-input :placeholder="$t('machines.Email')" v-model.trim="username" clearable>
          <i slot="prefix" class="icon-user"></i>
        </el-input>
      </div>
      <div class="password">
        <el-input
          :placeholder="$t('user.Password')"
          show-password
          clearable
          v-model.trim="password"
        >
          <i slot="prefix" class="icon-password"></i>
        </el-input>
      </div>
      <div class="email">
        <el-input :placeholder="$t('home.VerificationCode')" v-model.trim="code" clearable>
          <i slot="prefix" class="icon-email"></i>
          <i slot="append" class="sendout" @click="getcode">{{$t('home.Sendout')}}</i>
          <!--          <span class="sendout">Send out</span>-->
        </el-input>
      </div>
      <button @click="login">{{$t('home.SIGNIN')}}</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  inject: ["reload"],
  data() {
    return {
      username: "",
      password: "",
      language: "",
      remind: "",
      code: "",
      loading: false,
      reminder: false
    };
  },
  created() {
    if (this.$i18n.locale == "en-us") {
      this.language = "English";
    } else if (this.$i18n.locale == "zh-cn") {
      this.language = "中文";
    }
  },
  methods: {
    handleCommandlang(command) {
      if (command == "en-us") {
        this.language = "English";
      } else if (command == "zh-cn") {
        this.language = "中文";
      }
      window.localStorage.setItem("lan", command);
      this.$Local(command);
      this.$i18n.locale = command;
    },
    getcode() {
      this.remind = "";
      this.loading = true;
      this.reminder = false;
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/admin_api/common.common/sendEmailCode`,
          {
            email: this.username,
            type: "login"
          }
        )
        .then(res => {
          this.loading = false;
          if (res.data.ret == 0) {
            this.reminder = true;
          }
          this.remind = res.data.msg;
          // console.log(res)
        });
    },
    login() {
      this.remind = "";
      this.reminder = false;
      if (this.username) {
        if (this.password) {
          this.loading = true;
          this.$global
            .post_encapsulation(
              `${this.$axios.defaults.baseURL}/admin_api/user.back_user/login`,
              {
                username: this.username,
                password: this.password,
                verify: this.code
              }
            )
            .then(res => {
              this.loading = false;
              var rescode = res.data.ret;
              if (rescode == 0) {
                window.sessionStorage.clear();
                //  this.reload();
                this.$store.dispatch("reset_actions", this.$restore_obj);
                this.$store.dispatch("setUser", res.data.data.nickname);
                this.$store.dispatch("settoken_action", res.data.data.token);
                this.$routerto("logo");
              } else {
                this.remind = res.data.msg;
              }
            })
            .catch(error => {});
        } else {
          this.remind = this.$t("home.PleaseEnterPassword");
        }
      } else {
        // this.loading = false;
        this.remind = this.$t("home.PleaseEnterEmailAccount");
      }
    }
  }
};
</script>
<style lang='scss'>
.el-loading-mask {
  opacity: 0.5;
}

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
  height: 100%;
  width: 100%;
  /*top: 50px;*/
  /*height: calc(100% - 50px);*/
}
div.lan {
  position: absolute;
  top: 20px;
  right: 10%;
}
.login {
  width: 890px;
  height: 680px;
  /*box-shadow: 0px 0px 8px #e8e8e8;*/
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;

  p {
    color: #f36d6c;

    line-height: 40px;
    height: 40px;
  }

  .reminder {
    color: #2ab4e5;
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

  .sendout {
    /*position: absolute;*/
    /*right: 0;*/
    color: #2ab4e5;
    text-decoration: underline;
    cursor: pointer;
    /*z-index: 5;*/
  }

  button {
    background: url(../../static/transition.png) no-repeat;
    width: 492px;
    height: 68px;
    // margin-top:35px;
    font-size: 18px;
    color: white;
    font-weight: 500;
    cursor: pointer;
    // color:
  }
}
</style>
