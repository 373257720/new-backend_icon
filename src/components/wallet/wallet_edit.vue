<template>
  <div class="wallet_edit">
    <header><h2>
      <span>Wallet Setting</span>
      <i class="el-icon-arrow-right"></i>
      <span>Edit</span>
    </h2>
    </header>

    <main>
      <nav>
        <span>Cryto Currency:</span><span>bitcon</span>
      </nav>
      <el-form label-position="top" :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="Hedge Platform" prop="region">
          <el-select v-model="ruleForm.platform" placeholder="">
            <el-option
              v-for="item in groupList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Hedge Balance" prop="password">
          <el-input v-model="ruleForm.coin_number" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Hedge Interval" prop="nickname">
          <el-input v-model.number="ruleForm.interval_time" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-show="ruleForm.platform=='binance'" label="Key" prop="nickname">
          <el-input v-model.number="ruleForm.key" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-show="ruleForm.platform=='binance'" label="Secret" prop="nickname">
          <el-input v-model.number="ruleForm.secret" clearable autocomplete="off"></el-input>
        </el-form-item>
        <!--        <el-form-item label="API Adress" prop="repassword">-->
        <!--          <el-input type="password" v-model="ruleForm.repassword"   clearable autocomplete="off"></el-input>-->
        <!--        </el-form-item>-->
      </el-form>
      <section>
        <button @click="$routerto('atm_support')">Cancel</button>
        <button @click="submitForm('ruleForm')">Save Change</button>


      </section>
    </main>

  </div>
</template>

<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          token: this.$store.state.token,
          coin_type: this.$route.query.coin_type,
          platform: '',
          coin_number: '',
          interval_time: '',
          key: '',
          secret: '',
        },
        groupList: [{
          value: 'binance',
          label: 'binance.com'
        }, {
          value: 'none',
          label: 'Non Hedge'
        }],
        // rules: {
        //   username: [
        //     { required: true, message: '不能为空', trigg: 'change' }
        //   ],
        //
        //   password: [
        //     {required: true, validator: validatePass, trigger: 'blur' },
        //     { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        //
        //   ],
        //   repassword: [
        //     { required: true,min: 6, max: 16,validator: validatePass2, trigger: 'blur' },
        //   ],
        //   nickname:[
        //     { required: true, message: '不能为空', trigger: 'blur' }
        //   ],
        //   email: [
        //     { required: true, message: "请输入邮箱地址", trigger: "blur" },
        //     {
        //       type: "email",
        //       message: "请输入正确的邮箱地址",
        //       trigger: ["blur", "change"]
        //     }
        //   ],
        //   mobile:[
        //     { required: true, message: '不能为空', trigger: 'blur' }
        //   ],
        //   status:[
        //     { required: true,},
        //   ]
        // }
      };
    },
    created() {
      this.getdata();
    },
    methods: {
      getdata() {
        this.$axios({
          method: 'get',
          url: `${this.$baseurl}/admin_api/content.hedge_config/getHedgeConfigInfo`,
          params: {
            token: this.$store.state.token,
            coin_type: this.$route.query.coin_type,
          },
        }).then(res => {
          if (res.data.ret == 0) {
            this.ruleForm.key = res.data.data.api_parameter.key;
            this.ruleForm.secret = res.data.data.api_parameter.secret;
            for (let key in res.data.data) {
              if (this.ruleForm.hasOwnProperty(key)) {
                this.ruleForm[key] = res.data.data[key];
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
        // this.$refs[formName].validate((valid) => {
        this.$global.post_encapsulation(`${this.$baseurl}/admin_api/content.hedge_config/editHedgeConfig`, this.ruleForm)
          .then(res => {
            if (res.data.ret == 0) {
              console.log(res)
            }
          });
        // } else {
        //   console.log('error submit!!');
        //   return false;
        // }
        // });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
  };
</script>

<style lang='scss'>
  .wallet_edit {
    margin: 0 0 0 50px;
    width: 90%;

    header {
      position: relative;
      height: 136px;
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
      nav {
        margin-bottom: 10px;
      }

      .el-select {
        width: 100%;
      }

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
          font-size: 16px;
          line-height: 40px;
          border-radius: 5px;

        }

        button:nth-of-type(2) {
          background: url("../../../static/savechange.png") no-repeat;
          background-size: cover;
        }
      }
    }
  }
</style>
