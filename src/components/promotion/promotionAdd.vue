<template>
  <div class="account_setting">
    <header>
      <h2>
        <span>Promotion</span>
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
        <el-form-item label="Select currency type:" prop="region">
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
          <span style="color: #606266;">Wallet addresses:</span>
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
        <el-form-item v-else-if="title=='Edit'" prop="region">
          <span style="color: #606266;">Wallet addresses:</span>
          <div class="Currencyrange">
            <div class="additem">
              <el-form-item>
                <el-input v-model="ruleForm.coin_address"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="Discount(eg. Enjoy 10-percent discount, enter 10):">
          <el-input v-model="ruleForm.discount" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="State:">
          <el-radio-group v-model="ruleForm.status">
            <el-radio :label="1">Normal</el-radio>
            <el-radio :label="2">Prohibit</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <section>
        <button @click="$routerto('promotionList')">Cancel</button>
        <button @click="submitForm('ruleForm')">Save</button>
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
      ruleForm: {
        coin_type: "",
        coin_address: [
          {
            text: ""
          }
        ],
        discount: "",
        status: null
      },
      rules: {
        username: [{ required: true, message: "Please input", trigg: "change" }]
      }
    };
  },
  created() {
    if (this.$route.query.type == 1) {
      this.title = "Add";
      this.ruleForm.status = 1;
    } else if (this.$route.query.type == 2) {
      this.title = "Edit";
      this.ruleForm.discount_id = this.$route.query.discount_id;
      this.ruleForm.coin_address;
      this.$set(this.ruleForm, "coin_address", "");
      this.getdata();
    }
  },
  methods: {
    getdata() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/admin_api/user.discount/getDiscountInfo`,
          {
            discount_id: this.$route.query.discount_id
          }
        )
        .then(res => {
          if (res.data.ret == 0) {
            console.log(res);
            for (let key in res.data.data) {
              if (this.ruleForm.hasOwnProperty(key)) {
                this.ruleForm[key] = res.data.data[key];
                if (key == "status") {
                  this.ruleForm[key] = this.ruleForm[key] * 1;
                }
              }
            }
          }
          //   console.log(this.ruleForm);
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
                `${this.$axios.defaults.baseURL}/admin_api/user.discount/addDiscount`,
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
                `${this.$axios.defaults.baseURL}/admin_api/user.discount/editDiscount`,
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
          margin-right: 10px;
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
