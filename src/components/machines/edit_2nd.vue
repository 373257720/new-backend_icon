
<template>
  <div class="edit_second">
    <el-form
      :model="ruleForm"
      label-position="top"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item :label="$t('machines.Currency')+':'" prop="currency_id">
        <el-select :popper-append-to-body="false" v-model="ruleForm.currency_id" placeholder>
          <el-option
            v-for="item in currencypList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('machines.CashInboxDenomination')+':'" prop="name">
        <el-input :label="num" v-model="ruleForm.in_support_money"></el-input>
      </el-form-item>
      <el-form-item :label="$t('machines.CashOutboxDenomination')+':'" prop="name">
        <el-input v-model="ruleForm.out_support_money"></el-input>
      </el-form-item>
      <el-form-item :label="$t('machines.FastWithdrawDenomination')+':'" prop="name">
        <el-input v-model="ruleForm.shortcut_money"></el-input>
      </el-form-item>
      <el-form-item :label="$t('machines.CustomerCan')+':'" prop="name">
        <el-radio-group v-model="ruleForm.is_buy_sell">
          <el-radio :label="1">{{$t('machines.Buy')}}</el-radio>
          <el-radio :label="2">{{$t('machines.Sell')}}</el-radio>
          <el-radio :label="3">{{$t('machines.Both')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('machines.CryptocurrencyType')+':'">
        <el-collapse accordion>
          <el-collapse-item v-if="ruleForm.trade_coin_list.bitcoin">
            <template slot="title">BTC</template>
            <el-form-item :label="$t('machines.LocalTransactionRegulation')+':'" prop="name">
              <el-radio-group v-model="ruleForm.is_support_bitcoin">
                <el-radio :label="2">{{$t('machines.Buy')}}</el-radio>
                <el-radio :label="3">{{$t('machines.Sell')}}</el-radio>
                <el-radio :label="1">{{$t('machines.Both')}}</el-radio>
                <el-radio :label="4">{{$t('machines.NotAllow')}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('machines.NotAllow')+'(%):'" prop="name">
              <div class="flexbox">
                <div class="box">
                  <span>{{$t('machines.Buy')}}:</span>
                  <el-input
                    oninput="value=value.replace(/[^\d.]/g,'')"
                    v-model="ruleForm.buy_bitcoin_fee"
                  ></el-input>
                </div>
                <div class="box">
                  <span>{{$t('machines.Sell')}}:</span>
                  <el-input
                    oninput="value=value.replace(/[^\d.]/g,'')"
                    v-model="ruleForm.sell_bitcoin_fee"
                  ></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item :label="$t('machines.PurchaseLimitationMin')+'(%):'" prop="name">
              <el-input
                oninput="value=value.replace(/[^\d.]/g,'')"
                v-model="ruleForm.minimum_bitcoin_buy"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('machines.PurchaseLimitationMax')+'(%):'" prop="name">
              <el-input
                oninput="value=value.replace(/[^\d.]/g,'')"
                v-model="ruleForm.maximum_bitcoin_buy"
              ></el-input>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item v-if="ruleForm.trade_coin_list.ethereum">
            <template slot="title">{{$t('machines.ETH')}}</template>
            <el-form-item :label="$t('machines.LocalTransactionRegulation')+':'" prop="name">
              <el-radio-group v-model="ruleForm.is_support_ethereum">
                <el-radio :label="2">{{$t('machines.Buy')}}</el-radio>
                <el-radio :label="3">{{$t('machines.Sell')}}</el-radio>
                <el-radio :label="1">{{$t('machines.Both')}}</el-radio>
                <el-radio :label="4">{{$t('machines.NotAllow')}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('machines.CommissionRate')+'(%):'" prop="name">
              <div class="flexbox">
                <div class="box">
                  <span>{{$t('machines.Buy')}}:</span>
                  <el-input
                    oninput="value=value.replace(/[^\d.]/g,'')"
                    v-model="ruleForm.buy_ethereum_fee"
                  ></el-input>
                </div>
                <div class="box">
                  <span>{{$t('machines.Sell')}}:</span>
                  <el-input
                    oninput="value=value.replace(/[^\d.]/g,'')"
                    v-model="ruleForm.sell_ethereum_fee"
                  ></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item :label="$t('machines.PurchaseLimitationMin')" prop="name">
              <el-input
                oninput="value=value.replace(/[^\d.]/g,'')"
                v-model="ruleForm.minimum_ethereum_buy"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('machines.PurchaseLimitationMax')" prop="name">
              <el-input
                oninput="value=value.replace(/[^\d.]/g,'')"
                v-model="ruleForm.maximum_ethereum_buy"
              ></el-input>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item v-if="ruleForm.trade_coin_list.usdt">
            <template slot="title">USDT</template>
            <el-form-item :label="$t('machines.LocalTransactionRegulation')+':'"  prop="name">
              <el-radio-group v-model="ruleForm.is_support_usdt">
                <el-radio :label="2">{{$t('machines.Buy')}}</el-radio>
                <el-radio :label="3">{{$t('machines.Sell')}}</el-radio>
                <el-radio :label="1">{{$t('machines.Both')}}</el-radio>
                <el-radio :label="4">{{$t('machines.NotAllow')}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('machines.CommissionRate')+'(%):'" prop="name">
              <div class="flexbox">
                <div class="box">
                  <span>{{$t('machines.Buy')}}:</span>
                  <el-input
                    oninput="value=value.replace(/[^\d.]/g,'')"
                    v-model="ruleForm.buy_usdt_fee"
                  ></el-input>
                </div>
                <div class="box">
                  <span>{{$t('machines.Sell')}}:</span>
                  <el-input
                    oninput="value=value.replace(/[^\d.]/g,'')"
                    v-model="ruleForm.sell_usdt_fee"
                  ></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item :label="$t('machines.PurchaseLimitationMin')" prop="name">
              <el-input
                oninput="value=value.replace(/[^\d.]/g,'')"
                v-model="ruleForm.minimum_usdt_buy"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('machines.PurchaseLimitationMax')" prop="name">
              <el-input
                oninput="value=value.replace(/[^\d.]/g,'')"
                v-model="ruleForm.maximum_usdt_buy"
              ></el-input>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item v-if="ruleForm.trade_coin_list.bm">
            <template slot="title">BM</template>
            <el-form-item :label="$t('machines.LocalTransactionRegulation')+':'"  prop="name">
              <el-radio-group v-model="ruleForm.is_support_bm">
                <el-radio :label="2">{{$t('machines.Buy')}}</el-radio>
                <el-radio :label="3">{{$t('machines.Sell')}}</el-radio>
                <el-radio :label="1">{{$t('machines.Both')}}</el-radio>
                <el-radio :label="4">{{$t('machines.NotAllow')}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('machines.CommissionRate')+'(%):'" prop="name">
              <div class="flexbox">
                <div class="box">
                  <span>{{$t('machines.Buy')}}:</span>
                  <el-input
                    oninput="value=value.replace(/[^\d.]/g,'')"
                    v-model="ruleForm.buy_bm_fee"
                  ></el-input>
                </div>
                <div class="box">
                  <span>{{$t('machines.Sell')}}:</span>
                  <el-input
                    oninput="value=value.replace(/[^\d.]/g,'')"
                    v-model="ruleForm.sell_bm_fee"
                  ></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item :label="$t('machines.PurchaseLimitationMin')" prop="name">
              <el-input
                oninput="value=value.replace(/[^\d.]/g,'')"
                v-model="ruleForm.minimum_bm_buy"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('machines.PurchaseLimitationMax')" prop="name">
              <el-input
                oninput="value=value.replace(/[^\d.]/g,'')"
                v-model="ruleForm.maximum_bm_buy"
              ></el-input>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
      </el-form-item>
    </el-form>
    <section>
      <button @click="goback">{{$t('common.BACK')}}</button>
      <button @click="submitForm('ruleForm')">{{$t('common.SUBMIT')}}</button>
    </section>
    <dialogReminder :msg="msg" :remindervisible.sync="remindervisible"></dialogReminder>
  </div>
</template>
<script>
export default {
  props: ["MachineInfo"],
  data() {
    return {
      msg: "",
      remindervisible: false,
      currencypList: [],
      ruleForm: {
        trade_coin_list: {},
        machine_id: "",
        currency_id: "",
        in_support_money: "",
        out_support_money: "",
        shortcut_money: "",
        is_buy_sell: "",
        is_register: "",
        is_support_bitcoin: "",
        minimum_bitcoin_buy: "",
        maximum_bitcoin_buy: "",
        buy_bitcoin_fee: "",
        sell_bitcoin_fee: "",
        is_support_ethereum: "",
        minimum_ethereum_buy: "",
        maximum_ethereum_buy: "",
        buy_ethereum_fee: "",
        sell_ethereum_fee: "",
        is_support_bm: "",
        sell_bm_fee: "",
        buy_bm_fee: "",
        maximum_bm_buy: "",
        minimum_bm_buy: "",
        is_support_usdt: "",
        sell_usdt_fee: "",
        buy_usdt_fee: "",
        maximum_usdt_buy: "",
        minimum_usdt_buy: ""
      },
      rules: {
        username: [{ required: true, message: "不能为空", trigg: "change" }],
        nickname: [{ required: true, message: "不能为空", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        mobile: [{ required: true, message: "不能为空", trigger: "blur" }],
        status: [{ required: true }]
      },
      num: ""
    };
  },
  created() {
    this.$global
      .get_encapsulation(
        `${this.$axios.defaults.baseURL}/admin_api/content.currency/getCurrencyList`
      )
      .then(res => {
        if (res) {
          this.currencypList.push({ value: 0, label: "-" });
          for (let i = 0; i < res.data.data.data.length; i++) {
            this.currencypList.push({
              value: res.data.data.data[i].currency_id * 1,
              label: res.data.data.data[i].name
            });
          }
        }
      })
      .then(() => {
        for (var i in this.ruleForm) {
          if (this.MachineInfo.hasOwnProperty(i))
            this.ruleForm[i] = this.MachineInfo[i];
        }
      });
  },
  mounted() {},
  methods: {
    goback() {
      // this.$emit('sontodad', 2);
      this.$global.previous();
    },
    submitForm() {
      console.log(this.ruleForm);
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/admin_api/machine.machine/editMachine`,
          this.ruleForm
        )
        .then(res => {
          if (res.data.ret == 0) {
            // this.$emit('getchildren');
            this.$routerto("edit_3rd", {
              machine_id: this.$route.query.machine_id
            });
          } else {
            this.msg = res.data.msg;
            this.remindervisible = true;
          }
        });
    }
  }
};
</script>

<style lang='scss'>
.edit_second {
  .radioo {
    display: flex;
  }
  .el-select {
    width: 100%;
  }
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
  .el-collapse-item__content {
    > div {
      /*margin-bottom: 10px;*/
    }
  }
  .flexbox {
    display: flex;
    justify-content: space-between;
    div.box {
      display: flex;
      width: 45%;
      span {
        margin-right: 5px;
      }
    }
  }
  .project_pic {
    position: relative;
    height: 200px;
    .el-upload--picture-card {
      bottom: 0;
      width: 100%;
      height: 200px;
      border: 1px solid #c0ccda;
      background: white;
      position: absolute;
    }
    .el-icon-plus {
      line-height: 200px;
    }
    .el-upload-list__item {
      bottom: 0;
      width: 100%;
      height: 200px;
      position: absolute;
    }
  }
}
</style>
