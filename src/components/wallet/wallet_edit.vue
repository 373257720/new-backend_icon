<template>
  <div class="wallet_edit">
    <header>
      <h2>
        <span>{{$t("WalletSetting.Wallet")}}</span>
        <i class="el-icon-arrow-right"></i>
        <span>{{$t('common.Edit')}}</span>
      </h2>
    </header>
    <main>
      <nav>
        <span>{{$t("machines.Cryptocurrency")}}:</span>
        <span>{{this.ruleForm.coin_type}}</span>
      </nav>
      <el-form
        label-position="top"
        :rules="rules"
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item :label="$t('WalletSetting.HedgePlatform')" prop="region">
          <el-select v-model="ruleForm.platform" placeholder>
            <el-option
              v-for="item in groupList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!--        <el-form-item v-show="ruleForm.platform=='none'" label="Hedge Balance:" >-->
        <!--          <el-input v-model="ruleForm2.coin_number" clearable autocomplete="off"></el-input>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item v-show="ruleForm.platform=='none'"  label="Hedge Interval(mins):" >-->
        <!--          <el-input v-model.number="ruleForm2.interval_time" clearable autocomplete="off"></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item
          v-show="ruleForm.platform=='binance'"
          :label="$t('WalletSetting.HedgeBalance')"
          prop="coin_number"
        >
          <el-input
            v-model="ruleForm.coin_number"
            oninput="value=value.replace(/[^\d.]/g,'')"
            clearable
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-show="ruleForm.platform=='binance'"
          :label="$t('WalletSetting.HedgeInterval')"
          prop="interval_time"
        >
          <el-input
            v-model="ruleForm.interval_time"
            oninput="value=value.replace(/[^\d.]/g,'')"
            clearable
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item v-show="ruleForm.platform=='binance'" label="Key:" prop="key">
          <el-input v-model="ruleForm.key" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-show="ruleForm.platform=='binance'"
          :label="$t('WalletSetting.Secret')"
          prop="secret"
        >
          <el-input v-model="ruleForm.secret" show-password clearable autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <section>
        <button @click="$routerto('wallet')">{{$t('common.Cancel')}}</button>
        <button @click="submitForm('ruleForm')">{{$t('common.save')}}</button>
      </section>
    </main>
    <dialogReminder :msg="msg" :successto="successto" :remindervisible.sync="remindervisible"></dialogReminder>
  </div>
</template>

<script>
export default {
  data() {
    // var validatePass= (rule, value, callback) => {
    //    console.log(value)
    //    let min=  value*1;
    //    // if (min === '') {
    //    //   callback(new Error('请输入'))
    //    // } else
    //    if (min < 0) {
    //      callback(new Error('金额需要大于0'))
    //    } else {
    //      callback()
    //    }
    //  }
    return {
      msg: "",
      remindervisible: false,
      successto: "",
      ruleForm2: {
        coin_type: this.$route.query.coin_type,
        platform: "",
        coin_number: "",
        interval_time: "",
        key: "",
        secret: ""
      },
      ruleForm: {
        coin_type: this.$route.query.coin_type,
        platform: "binance",
        coin_number: "",
        interval_time: "",
        key: "",
        secret: ""
      },
      groupList: [
        {
          value: "binance",
          label: "binance.com"
        },
        {
          value: "none",
          label: this.$t("common.NonHedge")
        }
      ],
      rules: {
        coin_number: [
          {
            required: true,
            message: this.$t("common.PleaseInput"),
            trigger: "blur"
          }
        ],
        interval_time: [
          {
            required: true,
            message: this.$t("common.PleaseInput"),
            trigger: "blur"
          }
        ],
        key: [
          {
            required: true,
            message: this.$t("common.PleaseInput"),
            trigger: "blur"
          }
        ],
        secret: [
          {
            required: true,
            message: this.$t("common.PleaseInput"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/admin_api/content.hedge_config/getHedgeConfigInfo`,
          { coin_type: this.$route.query.coin_type }
        )
        .then(res => {
          if (res.data.ret == 0) {
            // console.log(res.data.data.api_parameter.key)
            if (res.data.data.platform == "binance") {
              this.ruleForm.platform = "binance";
              if (res.data.data.api_parameter) {
                this.ruleForm.key = res.data.data.api_parameter.key;
                this.ruleForm.secret = res.data.data.api_parameter.secret;
              }
              for (let key in res.data.data) {
                if (this.ruleForm.hasOwnProperty(key)) {
                  this.ruleForm[key] = res.data.data[key];
                }
              }
            } else {
              this.ruleForm.platform = "none";
            }

            // console.log(this.ruleForm)
          }
        });
    },
    submitForm(formName) {
      if (this.ruleForm.platform == "binance") {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$global
              .post_encapsulation(
                `${this.$axios.defaults.baseURL}/admin_api/content.hedge_config/editHedgeConfig`,
                this.ruleForm
              )
              .then(res => {
                this.msg = res.data.msg;
                this.remindervisible = true;
                if (res.data.ret === 0) {
                  this.successto = "wallet_lists";
                }
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else if (this.ruleForm.platform == "none") {
        this.$global
          .post_encapsulation(
            `${this.$axios.defaults.baseURL}/admin_api/content.hedge_config/editHedgeConfig`,
            this.ruleForm2
          )
          .then(res => {
            this.msg = res.data.msg;
            this.remindervisible = true;
            if (res.data.ret === 0) {
              this.successto = "wallet_lists";
            }
          });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang='scss'>
.wallet_edit {
  margin: 0 0 0 50px;
  width: 90%;

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
