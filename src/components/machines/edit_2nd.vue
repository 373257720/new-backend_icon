
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
      <el-form-item label="Currency:" prop="currency_id">
        <el-select :popper-append-to-body="false" v-model="ruleForm.currency_id" placeholder>
          <el-option
            v-for="item in currencypList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="Cash Inbox Denomination: (Fill in numbers separated by commas)"
        prop="name"
      >
        <el-input :label="num" v-model="ruleForm.in_support_money"></el-input>
      </el-form-item>
      <el-form-item
        label="Cash Outbox Denomination: (Fill in numbers separated by commas)"
        prop="name"
      >
        <el-input v-model="ruleForm.out_support_money"></el-input>
      </el-form-item>
      <el-form-item
        label="Fast Withdraw Denomination: (Fill in numbers separated by commas)"
        prop="name"
      >
        <el-input v-model="ruleForm.shortcut_money"></el-input>
      </el-form-item>
      <el-form-item label="Customer can ___ Cryptocurrency:" prop="name">
        <el-radio-group v-model="ruleForm.is_buy_sell">
          <el-radio :label="1">Buy</el-radio>
          <el-radio :label="2">Sell</el-radio>
          <el-radio :label="3">Both</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Cryptocurrency Type:">
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">BTC</template>
            <el-form-item label="Local Transaction Regulation:" prop="name">
              <el-radio-group v-model="ruleForm.is_support_bitcoin">
                <el-radio :label="2">Buy</el-radio>
                <el-radio :label="3">Sell</el-radio>
                <el-radio :label="1">Both</el-radio>
                <el-radio :label="4">Not allow</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Commission Rate (%):" prop="name">
              <div class="flexbox">
                <div class="box">
                  <span>Buy:</span>
                  <el-input
                    oninput="value=value.replace(/[^\d.]/g,'')"
                    v-model="ruleForm.buy_bitcoin_fee"
                  ></el-input>
                </div>
                <div class="box">
                  <span>Sell:</span>
                  <el-input
                    oninput="value=value.replace(/[^\d.]/g,'')"
                    v-model="ruleForm.sell_bitcoin_fee"
                  ></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="Purchase Limitation (Minimum):" prop="name">
              <el-input
                oninput="value=value.replace(/[^\d.]/g,'')"
                v-model="ruleForm.minimum_bitcoin_buy"
              ></el-input>
            </el-form-item>
            <el-form-item label="Purchase Limitation (Maximum):" prop="name">
              <el-input
                oninput="value=value.replace(/[^\d.]/g,'')"
                v-model="ruleForm.maximum_bitcoin_buy"
              ></el-input>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">ETH</template>
            <el-form-item label="Local Transaction Regulation:" prop="name">
              <el-radio-group v-model="ruleForm.is_support_ethereum">
                <el-radio :label="2">Buy</el-radio>
                <el-radio :label="3">Sell</el-radio>
                <el-radio :label="1">Both</el-radio>
                <el-radio :label="4">Not allow</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Commission Rate (%):" prop="name">
              <div class="flexbox">
                <div class="box">
                  <span>Buy:</span>
                  <el-input
                    oninput="value=value.replace(/[^\d.]/g,'')"
                    v-model="ruleForm.buy_ethereum_fee"
                  ></el-input>
                </div>
                <div class="box">
                  <span>Sell:</span>
                  <el-input
                    oninput="value=value.replace(/[^\d.]/g,'')"
                    v-model="ruleForm.sell_ethereum_fee"
                  ></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="Purchase Limitation (Minimum):" prop="name">
              <el-input
                oninput="value=value.replace(/[^\d.]/g,'')"
                v-model="ruleForm.minimum_ethereum_buy"
              ></el-input>
            </el-form-item>
            <el-form-item label="Purchase Limitation (Maximum):" prop="name">
              <el-input
                oninput="value=value.replace(/[^\d.]/g,'')"
                v-model="ruleForm.maximum_ethereum_buy"
              ></el-input>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
      </el-form-item>
    </el-form>
    <section>
      <button @click="goback">BACK</button>
      <button @click="submitForm('ruleForm')">SUBMIT</button>
    </section>
    <dialog_reminder :msg="msg" :remindervisible.sync="remindervisible"></dialog_reminder>
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
        sell_ethereum_fee: ""
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
        `${this.$baseurl}/admin_api/content.currency/getCurrencyList`
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
  mounted() {
    // this.$nextTick(function() {
    //   for (var i in this.ruleForm) {
    //     if (this.MachineInfo.hasOwnProperty(i))
    //       this.ruleForm[i] = this.MachineInfo[i];
    //   }
    // });
  },
  methods: {
    //   toThousands(num) {
    //   var num = (num || 0).toString(), result = '';
    //   while (num.length > 3) {
    //     result = ',' + num.slice(-3) + result;
    //     num = num.slice(0, num.length - 3);
    //   }
    //   if (num) { result = num + result; }
    //     console.log(result)
    //   this.num=result
    // },
    goback() {
      // this.$emit('sontodad', 2);
      this.$global.previous();
    },
    submitForm() {
      console.log(this.ruleForm);
      this.$global
        .post_encapsulation(
          `${this.$baseurl}/admin_api/machine.machine/editMachine`,
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
