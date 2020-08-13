<template>
  <div class="edit_3rd">
    <el-form
      :model="ruleForm"
      label-position="top"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="Need to register:  (Everyone need to register an account in CryptoGo to buy/sell cryptocurrency)"
        prop="name"
      >
        <el-radio-group v-model="ruleForm.is_register">
          <el-radio :label="1">Yes</el-radio>
          <el-radio :label="2">No</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Know your customer authentication:">
        <el-radio-group v-model="ruleForm.is_money_range">
          <el-radio :label="1">Yes</el-radio>
          <el-radio :label="2">No</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="ruleForm.is_money_range==1">
        <span style="color: #606266;">Currency range:</span>
        <span style="color: #606266;">(Fill in the minimum in the front and the maximum in the back)</span>
        <i @click="additem" class="el-icon-circle-plus-outline addsymbol"></i>
        <div class="Currencyrange">
          <div class="additem" v-for="(item,index) in ruleForm.arr" :key="index">
            <el-form-item  prop="minimum123">
              <el-input v-model="item.money_range_minimum"></el-input>
            </el-form-item>
            <el-form-item prop="maximun">
              <el-input v-model="item.money_range_maximum" @input="maximun(item, index)"></el-input>
            </el-form-item>
            <el-select :popper-append-to-body="false" v-model="item.money_range_identify1">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select :popper-append-to-body="false" v-model="item.money_range_identify2">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select :popper-append-to-body="false" v-model="item.money_range_identify3">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-button
              v-show="arr.length>1"
              @click="deleteitem(index)"
              type="primary"
              icon="el-icon-delete"
            ></el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="Whether to support redemption coins:">
        <el-radio-group v-model="ruleForm.is_redeem_coin">
          <el-radio :label="1">Yes</el-radio>
          <el-radio :label="2">No</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Whether to support redemption of money:">
        <el-radio-group v-model="ruleForm.is_redeem_money">
          <el-radio :label="1">Yes</el-radio>
          <el-radio :label="2">No</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Whether to support the use of coupons:">
        <el-radio-group v-model="ruleForm.is_coupon">
          <el-radio :label="1">Yes</el-radio>
          <el-radio :label="2">No</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Language configuration:" prop="name">
        <el-checkbox-group v-model="ruleForm.language_name">
          <el-checkbox label="zh-cn">
            <span>中文简体</span>
            <input class="lan_input" v-model="ruleForm['language_sort_zh-cn']" type="number" />
          </el-checkbox>
          <el-checkbox label="zh-tw">
            <span>中文繁体</span>
            <input class="lan_input" v-model="ruleForm['language_sort_zh-tw']" type="number" />
          </el-checkbox>
          <el-checkbox label="en-us">
            <span>English</span>
            <input class="lan_input" v-model="ruleForm['language_sort_en-us']" type="number" />
          </el-checkbox>
          <el-checkbox label="ja-jp">
            <span>日本語</span>
            <input class="lan_input" v-model="ruleForm['language_sort_ja-jp']" type="number" />
          </el-checkbox>
          <el-checkbox label="ko-kr">
            <span>한국어</span>
            <input class="lan_input" v-model="ruleForm['language_sort_ko-kr']" type="number" />
          </el-checkbox>
          <el-checkbox label="ms-my">
            <span>Melayu</span>
            <input class="lan_input" v-model="ruleForm['language_sort_ms-my']" type="number" />
          </el-checkbox>
          <el-checkbox label="th-th">
            <span>ไทย</span>
            <input class="lan_input" v-model="ruleForm['language_sort_th-th']" type="number" />
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <section>
      <button @click="$global.previous">BACK</button>
      <button @click="submitForm('ruleForm')">SUBMIT</button>
    </section>
    <dialog_reminder :msg="msg" :remindervisible.sync="remindervisible"></dialog_reminder>
  </div>
</template>
<script>
export default {
  props: ["MachineInfo"],
  data() {
    var validatePass2 = (rule, value, callback) => {
      // console.log(rule,value,1123);
      console.log(this.$props);
      
      // let min = this.ruleForm.collectMoneyMin.replace(/,/g, "") * 1;
      // let max = value.replace(/,/g, "") * 1;
      // if (max == "") {
      //   callback(new Error("请输入"));
      // } else if (max <= min) {
      //   callback(new Error("金额需要大于最小值"));
      // } else {
      //   callback();
      // }
    };
    var validatePass = (rule, value, callback) => {
       console.log(rule,value);
      // let min = value.replace(/,/g, "") * 1;
      // if (min === "") {
      //   callback(new Error("请输入"));
      // } else if (min <= 0) {
      //   callback(new Error("金额需要大于0"));
      // } else {
      //   callback();
      // }
    };
    return {
      msg: "",
      remindervisible: false,
      options: [
        {
          value: "",
          label: "Please choose"
        },
        {
          value: "picture",
          label: "Picture"
        },
        {
          value: "fingerprint",
          label: "Fingerprint"
        },
        {
          value: "certificate",
          label: "Certificate"
        }
      ],
      arr: [
        {
          // key:1,
          money_range_minimum: "",
          money_range_maximum: "",
          money_range_identify1: "",
          money_range_identify2: "",
          money_range_identify3: ""
        }
      ],
      ruleForm: {
        is_register: "",
        // Currencyrange:'',
        machine_id: this.$route.query.machine_id,
        token: this.$store.state.token,
        money_range_minimum: [],
        money_range_maximum: [],
        money_range_identify1: [],
        money_range_identify2: [],
        money_range_identify3: [],
        arr: [
          {
            // key:1,
            money_range_minimum: "",
            money_range_maximum: "",
            money_range_identify1: "",
            money_range_identify2: "",
            money_range_identify3: ""
          }
        ],
        is_redeem_coin: "",
        is_redeem_money: "",
        is_money_range: null,
        is_coupon: "",
        language_name: [],
        "language_sort_zh-cn": null,
        "language_sort_zh-tw": null,
        "language_sort_en-us": null,
        "language_sort_ja-jp": null,
        "language_sort_ko-kr": null,
        "language_sort_ms-my": null,
        "language_sort_th-th": null
      },
      rules: {
        minimum123: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        maximun: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
      
        collectMoneyMax: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        collectMoneyMin: [
          { required: true, validator: validatePass, trigger: "blur" }
        ]
      }
    };
  },
  mounted() {},
  created() {
    this.ruleForm.is_register =
      this.MachineInfo.is_register || this.ruleForm.is_register;
    this.ruleForm.is_redeem_coin = this.MachineInfo.is_redeem_coin;
    this.ruleForm.is_redeem_money = this.MachineInfo.is_redeem_money;
    this.ruleForm.is_coupon = this.MachineInfo.is_coupon;
    this.ruleForm.is_money_range =
      this.MachineInfo.money_range.is_money_range * 1 || 2;
    if (this.ruleForm.is_money_range == 1) {
      this.arr = [...this.MachineInfo.money_range.data];
      this.arr.forEach(item => {
        item.money_range_minimum = item.money_range_minimum
          ? parseInt(
              item.money_range_minimum.toString().replace(/,/gi, "")
            ).toLocaleString()
          : "";
        item.money_range_maximum = item.money_range_maximum
          ? parseInt(
              item.money_range_maximum.toString().replace(/,/gi, "")
            ).toLocaleString()
          : "";
      });
    }
    // console.log(this.MachineInfo.language);
    if (this.MachineInfo.language instanceof Array) {
      this.MachineInfo.language.forEach(item => {
        this.ruleForm.language_name.push(item.name);
        this.ruleForm[`language_sort_${item.name}`] = item.sort * 1;
      });
    }
  },
  watch: {},
  methods: {
    minimum(item, index) {
      let value = parseInt(item.money_range_minimum.replace(/,/gi, ""));
      if (isNaN(value) || value === NaN) {
        //如果当前输入的不是数字就停止执行
        item.money_range_minimum = ""; //防止不是数字是input出现NaN提示
        return false;
      }
      console.log(value);

      item.money_range_minimum = value.toLocaleString();
      // if(parseFloat(newvalue_.replace(/,/ig,''))>1000000000000){
      //   item.money_range_minimum=oldvalue;
      //   return
      // }
    },
    maximun(item, index) {
      let value = parseInt(item.money_range_maximum.replace(/,/gi, ""));
      if (isNaN(value) || value === NaN) {
        //如果当前输入的不是数字就停止执行
        item.money_range_maximum = ""; //防止不是数字是input出现NaN提示
        return false;
      }
      item.money_range_maximum = value.toLocaleString();
    },

    deleteitem(index) {
      // if(this.arr.length===1){
      //   return
      // }
      this.arr.splice(index, 1);
    },
    additem() {
      this.arr.push({
        collectMoneyMin: "",
        collectMoneyMax: "",
        money_range_identify1: "",
        money_range_identify2: "",
        money_range_identify3: ""
      });
    },
    submitForm() {
      let self = this;
      self.ruleForm.money_range_minimum = [];
      self.ruleForm.money_range_maximum = [];
      self.ruleForm.money_range_identify1 = [];
      self.ruleForm.money_range_identify2 = [];
      self.ruleForm.money_range_identify3 = [];
      if (self.ruleForm.is_money_range == 1) {
        self.arr.forEach(item => {
          self.ruleForm.money_range_minimum.push(
            item.money_range_minimum
              ? item.money_range_minimum.replace(/,/gi, "") * 1
              : ""
          );
          self.ruleForm.money_range_maximum.push(
            item.money_range_maximum
              ? item.money_range_maximum.replace(/,/gi, "") * 1
              : ""
          );
          self.ruleForm.money_range_identify1.push(item.money_range_identify1);
          self.ruleForm.money_range_identify2.push(item.money_range_identify2);
          self.ruleForm.money_range_identify3.push(item.money_range_identify3);
        });
      }
      console.log(this.ruleForm);
      this.$axios({
        method: "post",
        url: `${this.$axios.defaults.baseURL}/admin_api/machine.machine/editMachine`,
        data: this.$qs.stringify(this.ruleForm, { arrayFormat: "brackets" }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log('back')
        if (res.data.ret === 0) {
          // this.$emit('getchildren');
          this.$routerto("edit_4th", {
            machine_id: this.$route.query.machine_id
          });
        }
        // else if(res.data.ret>999 ){
        //     return
        //   }
        else {
          this.msg = res.data.msg;
          this.remindervisible = true;
        }
      });
    }
  }
};
</script>

<style lang='scss'>
.addsymbol {
  /*display: inline-block;*/
  cursor: pointer;
  color: #777777;
  vertical-align: middle;
  font-size: 15px;
}
.lan_input {
  border: 1px solid #c0c4cc;
  border-radius: 4px;
  width: 50px;
  padding-left: 10px;
}
.addsymbol:hover {
  color: #2abee2;
}
.el-select-dropdown__item {
  padding: 0 10px;
  font-size: 12px;
}
.edit_3rd {
  .el-form-item__label {
    line-height: 30px;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background: #2abee2;
    border-radius: 50%;
    border-color: #2abee2;
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #2ab4e2;
  }
  .el-checkbox__input.is-focus {
    .el-checkbox__inner {
      border-color: #dcdfe6;
    }
  }
  .el-checkbox__inner:hover {
    border-color: #dcdfe6;
  }
  .el-checkbox__inner {
    border-radius: 50%;
    transition: none;
  }
  .el-checkbox__inner::after {
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
  }
  .Currencyrange {
    margin-bottom: 22px;
    .el-input--suffix .el-input__inner {
    }

    div.additem {
      display: flex;
      justify-content: space-between;
    }

    .el-button {
      padding: 0;
      /*background: #2ABEE2;*/
      background: none;
      border: none;
    }
    .el-button--primary {
      background: none !important;
    }
    .el-input {
      width: 120px;
    }
    .el-select {
      .el-input {
        /*width:125px;*/
      }
    }
    .el-input__inner {
      /*width: 100px;*/
      padding: 0 10px;
      font-size: 12px;
    }

    > div {
      display: flex;
      /*justify-content: space-between;*/
      align-items: center;
      .el-form-item {
        /*width: 20%;*/
        margin-bottom: 0;
      }
      i {
        /*width: 20%;*/
        font-size: 20px;
        color: #606266;
        text-align: center;
      }
    }
  }
  .radioo {
    display: flex;
  }
  .el-select {
    /*width: 100%;*/
  }
  .el-radio {
    margin-bottom: 10px;
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
}
</style>

  