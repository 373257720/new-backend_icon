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
        <span>Cryto Currency:</span>
        <span>{{this.ruleForm.coin_type}}</span>
      </nav>
      <el-form label-position="top" :rules="rules" :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
        <el-form-item v-show="ruleForm.platform=='none'" label="Hedge Balance:" >
          <el-input v-model="ruleForm2.coin_number" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-show="ruleForm.platform=='none'"  label="Hedge Interval(mins):" >
          <el-input v-model.number="ruleForm2.interval_time" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-show="ruleForm.platform=='binance'" label="Hedge Balance:" prop="coin_number">
          <el-input v-model="ruleForm.coin_number" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-show="ruleForm.platform=='binance'" label="Hedge Interval(mins):" prop="interval_time">
          <el-input v-model="ruleForm.interval_time" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-show="ruleForm.platform=='binance'" label="Key:" prop="key">
          <el-input v-model="ruleForm.key" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-show="ruleForm.platform=='binance'" label="Secret:" prop="secret">
          <el-input v-model="ruleForm.secret" clearable autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <section>
        <button @click="$routerto('wallet')">Cancel</button>
        <button @click="submitForm('ruleForm')">Save Change</button>


      </section>
    </main>
    <dialog_reminder :msg="msg" :successto="successto" :remindervisible.sync="remindervisible"></dialog_reminder>
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
        msg:'',
        remindervisible:false,
        successto:'',
        ruleForm2: {
          token: this.$store.state.token,
          coin_type: this.$route.query.coin_type,
          platform: '',
          coin_number: '',
          interval_time: '',
        },
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
        rules: {
          coin_number: [
            { required: true, message: 'Please input', trigg: 'blur' }
          ],
          interval_time: [
            { required: true, message: 'Please input', trigg: 'blur' }
          ],
          key: [
            { required: true, message: 'Please input', trigg: 'blur' }
          ],
          secret:[
            { required: true, message: 'Please input', trigg: 'blur' }
          ],

        }
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
            // console.log(res.data.data.api_parameter.key)
            if(res.data.data.api_parameter){
              this.ruleForm.key = res.data.data.api_parameter.key;
              this.ruleForm.secret = res.data.data.api_parameter.secret;
            }
            for (let key in res.data.data) {
              if (this.ruleForm.hasOwnProperty(key)) {
                this.ruleForm[key] = res.data.data[key];
              }
            }
            // console.log(this.ruleForm)
          }
        });
      },
      submitForm(formName) {
        if(this.ruleForm.platform=='binance'){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$global.post_encapsulation(`${this.$baseurl}/admin_api/content.hedge_config/editHedgeConfig`, this.ruleForm)
                .then(res => {
                  this.msg=res.data.msg;
                  this.remindervisible=true;
                  if (res.data.ret == 0) {
                      this.successto='wallet_lists'
                  }
                });
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }else if(this.ruleForm.platform=='none'){
          this.$global.post_encapsulation(`${this.$baseurl}/admin_api/content.hedge_config/editHedgeConfig`, this.ruleForm2)
            .then(res => {
              this.msg=res.data.msg;
              this.remindervisible=true;
              if (res.data.ret == 0) {
                this.successto='wallet_lists'
              }
            });
        }

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
          background: #ddd;

        }

        button:nth-of-type(2) {
          background: url("../../../static/savechange.png") no-repeat;
          background-size: cover;
        }
      }
    }
  }
</style>
