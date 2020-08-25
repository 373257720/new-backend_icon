<template>
  <div class="account_setting">
    <header>
      <h2>
        <span>{{$t('user.AtmTechnicalSupport')}}</span>
        <i class="el-icon-arrow-right"></i>
        <span>{{title}}</span>
      </h2>
    </header>
    <main>
      <el-form
        label-position="top"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item :label="$t('user.UserName')+':'">
          <el-input v-model="ruleForm.username" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('user.Password')+':'" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            show-password
            clearable
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('user.Confirmpassword')+':'" prop="repassword">
          <el-input
            type="password"
            v-model="ruleForm.repassword"
            show-password
            clearable
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('user.Nickname')+':'" prop="nickname">
          <el-input v-model="ruleForm.nickname" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('user.Email')+':'" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item :label="$t('user.Phone')+':'" prop="mobile">
          <el-input v-model="ruleForm.mobile" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('user.State')+':'" prop="status">
          <template>
            <el-radio v-model="ruleForm.status" :label="1">{{$t('promotion.Enable')}}</el-radio>
            <el-radio v-model="ruleForm.status" :label="2">{{$t('promotion.Disable')}}</el-radio>
          </template>
        </el-form-item>
        <!--        <el-form-item>-->
        <!--          <el-button  @click="submitForm('ruleForm')">提交</el-button>-->
        <!--          <el-button @click="resetForm('ruleForm')">重置</el-button>-->
        <!--        </el-form-item>-->
      </el-form>
      <section>
        <button @click="$routerto('atm_support')">{{$t('common.Cancel')}}</button>
        <button @click="submitForm('ruleForm')">{{$t('common.save')}}</button>
      </section>
    </main>
    <dialogReminder :msg="msg" :successto="successto" :remindervisible.sync="remindervisible"></dialogReminder>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("Two inputs do not match!"));
      } else {
        callback();
      }
    };
    return {
      title: "",
      msg: "",
      remindervisible: false,
      successto: "",
      ruleForm: {
        username: "",
        password: "",
        repassword: "",
        nickname: "",
        email: "",
        mobile: "",
        status: 1
      },
      rules: {
        username: [
          { required: true, message: "Please input", trigg: "change" }
        ],

        password: [
          { required: true, validator: validatePass, trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "Length should be 6 to 16",
            trigger: "blur"
          }
        ],
        repassword: [
          {
            required: true,
            min: 6,
            max: 16,
            validator: validatePass2,
            trigger: "blur"
          }
        ],
        nickname: [
          { required: true, message: "Please input", trigger: "blur" }
        ],
        email: [
          {
            required: true,
            message: "Please input email address",
            trigger: "blur"
          },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"]
          }
        ],
        mobile: [{ required: true, message: "Please input", trigger: "blur" }],
        status: [{ required: true }]
      }
    };
  },
  created() {
    // console.log(this.$route.query)
    this.ruleForm.token = this.$store.state.token;
    if (this.$route.query.type == 1) {
      this.title = "Add";
    } else if (this.$route.query.type == 2) {
      this.title = "Edit";
      this.ruleForm.atm_user_id = this.$route.query.atm_user_id;
      this.getdata();
    }
  },
  methods: {
    getdata() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/admin_api/user.atm_user/getAtmUserInfo`,
          {
            atm_user_id: this.$route.query.atm_user_id
          }
        )
        .then(res => {
          if (res.data.ret == 0) {
            console.log(res);
            for (let key in res.data.data) {
              if (this.ruleForm.hasOwnProperty(key)) {
                this.ruleForm[key] = res.data.data[key];
                if (key == "status") {
                  // console.log(this.ruleForm[key] );
                  this.ruleForm[key] = this.ruleForm[key] * 1;
                }
              }
            }
          }
        });
    },
    // handleClick(row) {
    //   console.log(row);
    //   this.$router.push("/home/project/signedup/signedup_check");
    // },
    // fromchildren1(data) {
    //   this.bobo = data;
    //   // console.log(data);
    // },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.$route.query.type == 1) {
            this.$global
              .post_encapsulation(
                `${this.$axios.defaults.baseURL}/admin_api/user.atm_user/addAtmUser`,
                this.ruleForm
              )
              .then(res => {
                if (res.data.ret === 0) {
                  this.successto = "atm_supportlist";
                }
                this.msg = res.data.msg;
                this.remindervisible = true;
              });
          } else if (this.$route.query.type == 2) {
            this.$global
              .post_encapsulation(
                `${this.$axios.defaults.baseURL}/admin_api/user.atm_user/editAtmUser`,
                this.ruleForm
              )
              .then(res => {
                if (res.data.ret === 0) {
                  this.successto = "atm_supportlist";
                }
                this.msg = res.data.msg;
                this.remindervisible = true;
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang='scss'>
.account_setting {
  margin: 0 0 0 50px;
  width: 90%;
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #2abee2;
    background: #2abee2;
  }
  .el-radio__inner:hover {
    border-color: #2abee2;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: #2abee2;
  }
  .el-radio__input.is-checked .el-radio__inner::after {
    transform: rotate(45deg) scaleY(1);
  }
  .el-radio__inner::after {
    box-sizing: content-box;
    content: "";
    background: none;
    border: 2px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 7px;
    left: 4px;
    position: absolute;
    top: 1px;
    border-radius: 0;
    /*!*-webkit-transform: rotate(45deg) scaleY(0);*!*/
    /*!*transform: rotate(45deg) scaleY(0);*!*/
    width: 3px;
    /*-webkit-transition: -webkit-transform .15s ease-in .05s;*/
    /*transition: -webkit-transform .15s ease-in .05s;*/
    /*transition: transform .15s ease-in .05s;*/
    /*transition: transform .15s ease-in .05s, -webkit-transform .15s ease-in .05s;*/
    /*transition: transform .15s ease-in .05s,-webkit-transform .15s ease-in .05s;*/
    /*-webkit-transform-origin: center;*/
    /*transform-origin: center;*/
  }
  header {
    position: relative;
    height: 80px;
    border-bottom: 1px solid #d3d3d3;
    h2 {
      font-size: 20px;
      position: absolute;
      bottom: 20px;
      /*font-weight: 550;*/
    }
  }
  .el-form--label-top .el-form-item__label {
    padding: 0;
  }
  main {
    margin: 30px 0 100px 20px;
    width: 40%;
    section {
      display: flex;
      justify-content: space-between;
      button {
        width: 40%;
        height: 40px;
        cursor: pointer;
        color: white;
        background: #ddd;
        font-size: 16px;
        line-height: 40px;
        border-radius: 5px;
      }
      button:nth-of-type(2) {
        background: url("../../../static/savechange.png") no-repeat;
      }
    }
  }
}
</style>
