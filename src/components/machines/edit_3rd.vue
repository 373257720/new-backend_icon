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
      <el-form-item :label="$t('machines.NeedToregister')" prop="name">
        <el-radio-group v-model="ruleForm.is_register">
          <el-radio :label="1">{{$t('common.Yes')}}</el-radio>
          <el-radio :label="2">{{$t('common.No')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('machines.KnowAuthentication')+':'">
        <el-radio-group v-model="ruleForm.is_money_range">
          <el-radio :label="1">{{$t('common.Yes')}}</el-radio>
          <el-radio :label="2">{{$t('common.No')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="ruleForm.is_money_range==1">
        <span style="color: #606266;">{{$t('machines.CurrencyRange')}}:</span>
        <span style="color: #606266;">（{{$t('machines.FillIN')}}）</span>
        <i @click="additem" class="el-icon-circle-plus-outline addsymbol"></i>
        <div class="Currencyrange">
          <div class="additem" v-for="(item,index) in ruleForm.arr" :key="index">
            <el-form-item :prop="'arr.' + index + '.money_range_minimum'" :rules="rules.minimum123">
              <el-input v-model="item.money_range_minimum" @input="minimum(item, index)"></el-input>
            </el-form-item>
            <el-form-item :prop="'arr.' + index + '.money_range_maximum'" :rules="rules.maximun">
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
              v-show="ruleForm.arr.length>1"
              @click="deleteitem(index)"
              type="primary"
              icon="el-icon-delete"
            ></el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item :label="$t('machines.supportRedemption')">
        <el-radio-group v-model="ruleForm.is_redeem_coin">
          <el-radio :label="1">{{$t('common.Yes')}}</el-radio>
          <el-radio :label="2">{{$t('common.No')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('machines.supportRedemptionMoney')">
        <el-radio-group v-model="ruleForm.is_redeem_money">
          <el-radio :label="1">{{$t('common.Yes')}}</el-radio>
          <el-radio :label="2">{{$t('common.No')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('machines.supportCoupons')">
        <el-radio-group v-model="ruleForm.is_coupon">
          <el-radio :label="1">{{$t('common.Yes')}}</el-radio>
          <el-radio :label="2">{{$t('common.No')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('machines.LanguageConfiguration')+':'" prop="name">
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
      <button @click="$global.previous">{{$t('common.BACK')}}</button>
      <button @click="submitForm('ruleForm')">{{$t('common.SUBMIT')}}</button>
    </section>
    <dialogReminder :msg="msg" :remindervisible.sync="remindervisible"></dialogReminder>
  </div>
</template>
<script>
export default {
  props: ["MachineInfo"],
  data() {
    var validatePass2 = (rule, value, callback) => {
      let order = rule.fullField.split(".")[1] * 1;
      // name = rule.fullField.split(".")[2];
      let a = this.ruleForm.arr[order];
      if (a.money_range_minimum && a.money_range_maximum) {
        let minimum = a.money_range_minimum.replace(/,/gi, "") * 1,
          maximum = a.money_range_maximum.replace(/,/gi, "") * 1;
        if (maximum <= minimum) {
          callback(new Error("Less than" + maximum));
        }
      }
      if (order > 0) {
        if (
          this.ruleForm.arr[order].money_range_minimum &&
          this.ruleForm.arr[order - 1].money_range_maximum
        ) {
          if (
            this.ruleForm.arr[order].money_range_minimum.replace(/,/gi, "") *
              1 <=
            this.ruleForm.arr[order - 1].money_range_maximum.replace(
              /,/gi,
              ""
            ) *
              1
          ) {
            callback(
              new Error(
                "More than" + this.ruleForm.arr[order - 1].money_range_maximum
              )
            );
          }
        } else if (
          this.ruleForm.arr[order].money_range_minimum &&
          this.ruleForm.arr[order - 1].money_range_maximum == "" &&
          this.ruleForm.arr[order - 1].money_range_minimum
        ) {
          if (
            this.ruleForm.arr[order].money_range_minimum.replace(/,/gi, "") *
              1 <=
            this.ruleForm.arr[order - 1].money_range_minimum.replace(
              /,/gi,
              ""
            ) *
              1
          ) {
            callback(
              new Error(
                "More than" + this.ruleForm.arr[order - 1].money_range_minimum
              )
            );
          }
        }
      }

      callback();
    };
    var validatePass = (rule, value, callback) => {
      let order = rule.fullField.split(".")[1] * 1;
      let a = this.ruleForm.arr[order];
      if (a.money_range_minimum && a.money_range_maximum) {
        let minimum = a.money_range_minimum.replace(/,/gi, "") * 1,
          maximum = a.money_range_maximum.replace(/,/gi, "") * 1;
        console.log(minimum, maximum);
        if (maximum <= minimum) {
          callback(new Error("More than" + a.money_range_minimum));
        }
      } else if (a.money_range_maximum && a.money_range_minimum == "") {
        if (order > 0 && this.ruleForm.arr[order - 1]) {
          if (
            this.ruleForm.arr[order - 1].money_range_maximum.replace(
              /,/gi,
              ""
            ) *
              1 >
            this.ruleForm.arr[order].money_range_maximum.replace(/,/gi, "") * 1
          ) {
            callback(
              new Error(
                "More than" + this.ruleForm.arr[order - 1].money_range_maximum
              )
            );
          }
        }
      }

      if (this.ruleForm.arr.length > 1) {
        if (
          this.ruleForm.arr[order].money_range_maximum &&
          this.ruleForm.arr[order + 1] &&
          this.ruleForm.arr[order + 1].money_range_minimum
        ) {
          if (
            this.ruleForm.arr[order].money_range_maximum.replace(/,/gi, "") *
              1 >=
            this.ruleForm.arr[order + 1].money_range_minimum.replace(
              /,/gi,
              ""
            ) *
              1
          ) {
            callback(
              new Error(
                "Less than" + this.ruleForm.arr[order + 1].money_range_minimum
              )
            );
          }
        }
      }
      callback();
    };
    return {
      msg: "",
      remindervisible: false,
      options: [
        {
          value: "",
          label: this.$t("machines.PleaseChoose")
        },
        {
          value: "picture",
          label: this.$t("machines.Picture")
        },
        {
          value: "fingerprint",
          label: this.$t("machines.Fingerprint")
        },
        {
          value: "certificate",
          label: this.$t("machines.Certificate")
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
          // { message: "请输入经纬度", trigger: "blur" }, //经纬度必填
          { validator: validatePass2, trigger: "blur" }
        ],
        // minimum: [
        //   { required: true, validator: validatePass2, trigger: "blur" }
        // ],
        maximun: [
          // { required: true, message: "请输入经纬度", trigger: "blur" }, //经纬度必填
          { validator: validatePass, trigger: "blur" }
        ]

        // collectMoneyMax: [
        //   { required: true, validator: validatePass2, trigger: "blur" }
        // ],
        // collectMoneyMin: [
        //   { required: true, validator: validatePass, trigger: "blur" }
        // ]
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
      this.ruleForm.arr = [...this.MachineInfo.money_range.data];
      this.ruleForm.arr.forEach(item => {
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
      this.ruleForm.arr.splice(index, 1);
    },
    additem() {
      this.ruleForm.arr.push({
        collectMoneyMin: "",
        collectMoneyMax: "",
        money_range_identify1: "",
        money_range_identify2: "",
        money_range_identify3: ""
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        console.log(valid);
        if (valid) {
          let self = this;
          self.ruleForm.money_range_minimum = [];
          self.ruleForm.money_range_maximum = [];
          self.ruleForm.money_range_identify1 = [];
          self.ruleForm.money_range_identify2 = [];
          self.ruleForm.money_range_identify3 = [];
          if (self.ruleForm.is_money_range == 1) {
            self.ruleForm.arr.forEach(item => {
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
              self.ruleForm.money_range_identify1.push(
                item.money_range_identify1
              );
              self.ruleForm.money_range_identify2.push(
                item.money_range_identify2
              );
              self.ruleForm.money_range_identify3.push(
                item.money_range_identify3
              );
            });
          }
          let obj = this.$global.deepCopy(self.ruleForm);
          obj.arr = undefined;
          delete obj.arr;
          console.log(obj, this.ruleForm);
          this.$axios({
            method: "post",
            url: `${this.$axios.defaults.baseURL}/admin_api/machine.machine/editMachine`,
            data: this.$qs.stringify(obj, { arrayFormat: "brackets" }),
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }).then(res => {
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
        } else {
          console.log(123);
          // console.log("error submit!!");
          return false;
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
      padding-bottom: 20px;
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

  