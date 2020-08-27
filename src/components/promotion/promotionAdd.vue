<template>
  <div class="promotionAdd">
    <header>
      <h2>
        <span>{{$t('promotion.Promotion')}}</span>
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
        <el-form-item :label="$t('promotion.SelectCurrencytype')" prop="region">
          <el-select :popper-append-to-body="false" v-model="ruleForm.coin_type" placeholder>
            <el-option
              v-for="item in groupList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="title=='Add'" prop="region">
          <span style="color: #606266;">{{$t('promotion.WalletAddresses')}}:</span>
          <i @click="additem" class="el-icon-circle-plus-outline addsymbol"></i>
          <div class="Currencyrange">
            <div class="additem" v-for="(item,index) in ruleForm.coin_address" :key="index">
              <el-form-item>
                <el-input v-model="item.text"></el-input>
              </el-form-item>
              <el-button
                v-show="ruleForm.coin_address.length>1"
                @click="deleteitem(index)"
                type="primary"
                icon="el-icon-delete"
              ></el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item v-else-if="title=='Edit'">
          <span style="color: #606266;">{{$t('promotion.WalletAddresses')}}:</span>
          <div class="Currencyrange">
            <div class="additem">
              <el-form-item>
                <el-input v-model="ruleForm.coin_address"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form-item>
        <el-form-item :label="$t('promotion.Newcommissionrate')">
          <el-input v-model="ruleForm.discount_fee" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('promotion.PleaseSelect')">
          <el-checkbox-group v-model="ruleForm.machine_id_list">
            <el-checkbox
              v-for="item in machineList"
              :label="item.machine_id"
              :key="item.machine_id"
            >
              <span>{{item.name}}</span>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- <el-form-item label="System fee（Percentage of order amount charged）">
          <el-input v-model="ruleForm.system_fee" clearable autocomplete="off"></el-input>
        </el-form-item>-->
        <el-form-item :label="$t('promotion.Status')+':'">
          <el-radio-group v-model="ruleForm.status">
            <el-radio :label="1">{{$t('promotion.Enable')}}</el-radio>
            <el-radio :label="2">{{$t('promotion.Disable')}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <section>
        <button @click="$routerto('promotionList')">{{$t('common.Cancel')}}</button>
        <button @click="submitForm('ruleForm')">{{$t('common.save')}}</button>
      </section>
    </main>
    <dialogReminder :msg="msg" :successto="successto" :remindervisible.sync="remindervisible"></dialogReminder>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groupList: [
        { value: "bitcoin", label: "BTC" },
        { value: "ethereum", label: "ETH" }
      ],
      title: "",
      msg: "",
      remindervisible: false,
      successto: "",
      machineList: [],
      ruleForm: {
        machine_id_list: [],
        coin_type: "bitcoin",
        coin_address: [
          {
            text: ""
          }
        ],
        discount_fee: "",
        system_fee: null,
        status: null
      },
      rules: {
        // username: [{ required: true, message: "Please input", trigg: "change" }]
      }
    };
  },
  created() {
    this.getmachineList();
    if (this.$route.query.type == 1) {
      this.title = this.$t('common.Add');
      this.ruleForm.status = 1;
    } else if (this.$route.query.type == 2) {
      this.title =  this.$t('common.Edit');
      this.ruleForm.coin_address_fee_id = this.$route.query.coin_address_fee_id;
      this.ruleForm.coin_address;
      this.$set(this.ruleForm, "coin_address", "");
    }
  },
  methods: {
    getmachineList() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/admin_api/machine.machine/getMachineList`
        )
        .then(res => {
          if (res.data.ret == 0) {
            this.machineList = [...res.data.data.data];
            // console.log(this.ruleForm);
            this.getdata();
          }
        });
    },
    getdata() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/admin_api/user.coin_address_fee/getCoinAddressFeeInfo`,
          {
            coin_address_fee_id: this.$route.query.coin_address_fee_id
          }
        )
        .then(res => {
          if (res.data.ret == 0) {
            for (let key in res.data.data) {
              if (this.ruleForm.hasOwnProperty(key)) {
                this.ruleForm[key] = res.data.data[key];
                if (key == "machine_id_list") {
                  if (this.ruleForm[key] === null) {
                    this.ruleForm[key] = [];
                  } else {
                    let arr = this.ruleForm[key].split(",");
                    this.ruleForm[key] = arr.map(item => {
                      return parseInt(item);
                    });
                  }
                }

                if (key == "status") {
                  this.ruleForm[key] = this.ruleForm[key] * 1;
                }
              }
            }
          }
          console.log(this.ruleForm);
        });
    },
    additem() {
      this.ruleForm.coin_address.push({
        text: ""
      });
    },

    deleteitem(index) {
      // if(this.arr.length===1){
      //   return
      // }
      this.ruleForm.coin_address.splice(index, 1);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let self = this;
          if (this.$route.query.type == 1) {
            this.$global
              .post_encapsulation(
                `${this.$axios.defaults.baseURL}/admin_api/user.coin_address_fee/addCoinAddressFee`,
                this.ruleForm
              )
              .then(res => {
                if (res.data.ret === 0) {
                  this.successto = "promotionList";
                }
                this.msg = res.data.msg;
                this.remindervisible = true;
              });
          } else if (this.$route.query.type == 2) {
            this.$global
              .post_encapsulation(
                `${this.$axios.defaults.baseURL}/admin_api/user.coin_address_fee/editCoinAddressFee`,
                this.ruleForm
              )
              .then(res => {
                if (res.data.ret === 0) {
                  this.successto = "promotionList";
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
.promotionAdd {
  margin: 0 0 0 50px;
  width: 90%;
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
      &:hover {
        border-color: #2ab4e2;
      }
    }
  }
  .el-checkbox__inner {
    border-radius: 50%;
    transition: none;
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
    width: 3px;
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
    .el-select {
      width: 100%;
    }
    .Currencyrange {
      div.additem {
        display: flex;
        justify-content: space-between;
        padding-bottom: 20px;
      }
      div.additem:nth-last-of-type(1) {
        padding: 0;
      }

      .el-button {
        padding: 0;
        background: none;
        border: none;
      }
      .el-button--primary {
        background: none !important;
        margin-left: 10px;
      }
      .el-input {
        /*width:125px;*/
        // width: 350px;
      }
      .el-form-item {
        width: 100%;
      }
      .el-input__inner {
        /*width: 100px;*/
        padding: 0 10px;
        font-size: 12px;
      }
      > div {
        display: flex;
        align-items: center;
        .el-form-item {
          margin-bottom: 0;
          // margin-right: 10px;
        }
        i {
          /*width: 20%;*/
          font-size: 20px;
          color: #606266;
          text-align: center;
        }
      }
    }
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
