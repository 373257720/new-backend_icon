<template>
  <div class="setting_edit">
    <header>
      <h2>
        <span>Setting</span>
        <i class="el-icon-arrow-right"></i>
        <span>{{title}}</span>
      </h2>
    </header>
    <main v-if="rowid==1">
      <el-form
        label-position="top"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="Cash Inbox Percent (%):" prop="in_cashbox_warn_percent">
          <el-input v-model="ruleForm.in_cashbox_warn_percent" clearable autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <section>
        <button @click="$routerto('setting')">Cancel</button>
        <button @click="submitForm('ruleForm')">Save Change</button>
      </section>
    </main>
    <main v-else-if="rowid===0">
      <el-form
        label-position="top"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!--        <el-form-item  label="Cash Inbox Percent:" prop="in_cashbox_warn_percent">-->
        <!--          <el-input  v-model="ruleForm.in_cashbox_warn_percent" clearable autocomplete="off"></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item label="Cash Outbox Percent (%):" prop="out_cashbox_warn_percent">
          <el-input v-model="ruleForm.out_cashbox_warn_percent" clearable autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <section>
        <button @click="$routerto('setting')">Cancel</button>
        <button @click="submitForm('ruleForm')">Save Change</button>
      </section>
    </main>
    <main v-else-if="rowid==2">
      <el-form
        label-position="top"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="Transaction Time(seconds):" prop="sell_coin_wait_time">
          <el-input v-model="ruleForm.sell_coin_wait_time" clearable autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <section>
        <button @click="$routerto('setting')">Cancel</button>
        <button @click="submitForm('ruleForm')">Save Change</button>
      </section>
    </main>
    <main v-else-if="rowid==3">
      <el-form
        label-position="top"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="Website:" prop="website">
          <el-input
            v-model="ruleForm.customer_service_website"
            clearable
            autocomplete="off"
          >{{ruleForm.website}}</el-input>
        </el-form-item>
        <el-form-item label="E-mail:" prop="email">
          <el-input v-model="ruleForm.customer_service_email" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Contact Number:" prop="contact_num">
          <el-input v-model="ruleForm.customer_service_phone" clearable autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <section>
        <button @click="$routerto('setting')">Cancel</button>
        <button @click="submitForm('ruleForm')">Save Change</button>
      </section>
    </main>
    <main v-else-if="rowid==4">
      <el-form
        label-position="top"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="Ethereum Wallet Address:" prop="contact_num">
          <el-input v-model="ruleForm.wallet" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Ethereum Private key" prop="contact_num">
          <el-input show-password v-model="ruleForm.private_key" clearable autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <section>
        <button @click="$routerto('setting')">Cancel</button>
        <button @click="submitForm('ruleForm')">Save Change</button>
      </section>
    </main>
    <main v-else-if="rowid==5">
      <el-form
        label-position="top"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="Token:" prop="password">
          <el-input type="password" v-model="ruleForm.token" show-password autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Wallet ID:" prop="wallet_id">
          <el-input v-model="ruleForm.wallet_id" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Wallet Password:" prop="wallet_passphrase">
          <el-input
            type="password"
            v-model.number="ruleForm.wallet_passphrase"
            show-password
            clearable
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <section>
        <button @click="$routerto('setting')">Cancel</button>
        <button @click="submitForm('ruleForm')">Save Change</button>
      </section>
    </main>
    <main v-else-if="rowid==6" class="text">
      <el-form
        label-position="top"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
       <el-form-item label="example（Replace the order data with variables）">
          <ul class="example">
            <li>
              <el-input type="textarea" autosize readonly v-model="textarea"></el-input>
            </li>
            <li>
              <el-input type="textarea"  autosize readonly v-model="textareaSample"></el-input>
            </li>
          </ul>
        </el-form-item>
        <el-form-item label="configuration value（Simplified）">
          <el-input
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 10}"
            v-model="SimplifiedText"
            show-password
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="configuration value（Traditional Chinese）" prop="password">
          <el-input
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 10}"
            v-model="traditionalText"
            show-password
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="configuration value（English）" prop="password">
          <el-input
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 10}"
            v-model="englishText"
            show-password
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <section>
        <button @click="$routerto('setting')">Cancel</button>
        <button @click="submitForm('ruleForm')">Save Change</button>
      </section>
    </main>
    <main v-else-if="rowid==7" class="richtext">
      <el-form
        label-position="top"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="example（Replace the order data with variables）">
          <ul class="example">
            <li>
              <el-input type="textarea" autosize readonly v-model="richpattern"></el-input>
            </li>
            <li>
              <el-input type="textarea"  autosize readonly v-model="richsample"></el-input>
            </li>
          </ul>
        </el-form-item>
        <el-form-item label="configuration value（Simplified）">
          <UE
            id="Simplified"
            @ready="editorReady"
            :config="config1"
            :content="Simplified"
            ref="Simplified"
            style="width:100%;"
          ></UE>
        </el-form-item>
        <el-form-item label="configuration value（Traditional Chinese）">
          <UE
            id="traditional"
            @ready="editorReady"
            :config="config1"
            :content="traditional"
            ref="traditional"
            style="width:100%;"
          ></UE>
        </el-form-item>
        <el-form-item label="configuration value（English）">
          <UE
            id="english"
            @ready="editorReady"
            :config="config"
            :content="english"
            ref="english"
            style="width:100%;"
          ></UE>
        </el-form-item>
      </el-form>
      <section>
        <button @click="$routerto('setting')">Cancel</button>
        <button @click="submitForm('ruleForm')">Save Change</button>
      </section>
    </main>
    <dialog_reminder :msg="msg" :successto="successto" :remindervisible.sync="remindervisible"></dialog_reminder>
  </div>
</template>

<script>
import UE from "@/components/ueditor.vue";
// import VueUeditorWrap from "vue-ueditor-wrap";
export default {
  components: {
    UE
    // VueUeditorWrap //ueditor富文本编辑器
  },
  data() {
    return {
      title: "",
      msg: "",
      SimplifiedText:'',
      englishText:'',
      traditionalText:'',
      successto: "",
      remindervisible: false,
      rowid: "", //which  edit
      parameter_obj: {
        name: ""
      },
      richpattern:`Thank you for using the digital assets exchange machine. Attached below is the receipt:

{coin_type} {trade_type}
Date: {create_time}
Transaction ID: {trade_id}
{trade_type} price: {price}
{trade_type} amount: {money}
Quantity bought: {coin_number}
Redemption code: {redeem_code}

Contact us
Phone: {customer_service_phone}
Email: {customer_service_email}
Website: {customer_service_website}

Please download mobile application ixWallet to manage your coins (for IOS and Android only)`,
    richsample:`Thank you for using the digital assets exchange machine. Attached below is the receipt:

BTC Buy
Date: 2020-07-30 18:25:57
Transaction ID: ejrhrjjrj378347jdjddjdjd
Buying price: HKD 64112.34
Buying amount: HKD 300
Quantity bought: BTC 0.38737
Redemption code: 4dhdjdj47Heje47

Contact us
Phone: (+852) 3595 3868
Email: info@ixfintech.com
Website: https://ixfintech.com/crypto.html

Please download mobile application ixWallet to manage your coins (for IOS and Android only)`,
      textarea: `Thank you for using the digital assets exchange machine. Attached below is the receipt:

{coin_type} {trade_type}
Date: {create_time}
Transaction ID: {trade_id}
{trade_type} price: {price}
{trade_type} amount: {money}
Quantity bought: {coin_number}
Redemption code: {redeem_code}

Contact us
Phone: {customer_service_phone}
Email: {customer_service_email}
Website: {customer_service_website}

Please download mobile application ixWallet to manage your coins (for IOS and Android only)`,
      textareaSample: `Thank you for using the digital assets exchange machine. Attached below is the receipt:

BTC Buy
Date: 2020-07-30 18:25:57
Transaction ID: ejrhrjjrj378347jdjddjdjd
Buying price: HKD 64112.34
Buying amount: HKD 300
Quantity bought: BTC 0.38737
Redemption code: 4dhdjdj47Heje47

Contact us
Phone: (+852) 3595 3868
Email: info@ixfintech.com
Website: https://ixfintech.com/crypto.html

Please download mobile application ixWallet to manage your coins (for IOS and Android only)`,
      config1: {
        initialFrameWidth: null,
        initialFrameHeight: 300,
        lang: "zh-cn"
      },
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 300,
        lang: "en"
      },
      Simplified: "",
      traditional: "",
      english: "",
      // form: {
      //   content: ""
      // },
      ruleForm: {},
      rules: {}
    };
  },

  watch: {},
  created() {
    // console.log(this.$route.query)
    this.parameter_obj.token = this.$store.state.token;
    // this.ruleForm.token=this.$store.state.token;
    this.rowid = this.$route.query.rowindex;
    if (this.rowid == 0) {
      this.title = "Cash Outbox";
      this.ruleForm = Object.assign({}, this.ruleForm, {
        out_cashbox_warn_percent: ""
      });
      Object.assign(this.parameter_obj, {
        name: "out_cashbox_warn_percent"
      });
    } else if (this.rowid == 1) {
      this.title = "Cash Inbox";
      this.ruleForm = Object.assign({}, this.ruleForm, {
        in_cashbox_warn_percent: ""
      });
      Object.assign(this.parameter_obj, {
        name: "in_cashbox_warn_percent"
      });
    } else if (this.rowid == 2) {
      this.title = "Transaction Time";
      this.ruleForm = Object.assign({}, this.ruleForm, {
        sell_coin_wait_time: ""
      });
      Object.assign(this.parameter_obj, {
        name: "sell_coin_wait_time"
      });
    } else if (this.rowid == 3) {
      this.title = "Receipts";
      this.ruleForm = Object.assign({}, this.ruleForm, {
        customer_service_website: "",
        customer_service_email: "",
        customer_service_phone: ""
      });
      Object.assign(this.parameter_obj, {
        name:
          "customer_service_website,customer_service_email,customer_service_phone"
      });
    } else if (this.rowid == 4) {
      this.title = "Ethereum";
      this.ruleForm = Object.assign({}, this.ruleForm, {
        // value:'',
        wallet: "",
        private_key: ""
      });
      Object.assign(this.parameter_obj, {
        name: "ethereum"
      });
    } else if (this.rowid == 5) {
      this.title = "Bitgo";
      this.ruleForm = Object.assign({}, this.ruleForm, {
        bitgo_token: "",
        wallet_id: "",
        wallet_passphrase: ""
      });
      Object.assign(this.parameter_obj, {
        name: "bitgo"
      });
    }else if (this.rowid == 6) {
      this.title = "Order SMS";
      this.ruleForm = Object.assign({}, this.ruleForm, {
        user_config_id: null,
        value: null,
      });
      Object.assign(this.parameter_obj, {
        name: "order_sms"
      });
    } else if (this.rowid == 7) {
      this.title = "Order mail";
      this.ruleForm = Object.assign({}, this.ruleForm, {
        simplify_value: "",
        traditional_value: "",
        english_value: ""
      });
      Object.assign(this.parameter_obj, {
        name: "order_email"
      });
    }
    this.getdata();
  },
  methods: {
    editorReady(instance) {
      instance.addListener("contentChange", () => {
        this[instance.key] = instance.getContent();
        // console.log(instance);
      });
    },
    getdata() {
      // this.$axios({
      //   method: 'get',
      //   url: `${this.$axios.defaults.baseURL}/admin_api/user.user_config/getUserConfigInfo`,
      //   params: this.parameter_obj,
      // })
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/admin_api/user.user_config/getUserConfigInfo`,
          this.parameter_obj
        )
        .then(res => {
          if (res.data.ret == 0) {
            if (this.rowid == 5 || this.rowid == 4) {
              for (var i in res.data.data[0].value) {
                if (this.ruleForm.hasOwnProperty(i)) {
                  this.ruleForm[i] = res.data.data[0].value[i];
                } 
              } 
            } else if (this.rowid == 6) {
              this.SimplifiedText = res.data.data[0].value.simplify_value || "";
              this.traditionalText = res.data.data[0].value.traditional_value || "";
              this.englishText = res.data.data[0].value.english_value || "";
            } else if (this.rowid == 7) {
              this.Simplified = res.data.data[0].value.simplify_value;
              this.traditional = res.data.data[0].value.traditional_value;
              this.english = res.data.data[0].value.english_value;
            } else {
              res.data.data.forEach(item => {
                if (this.ruleForm.hasOwnProperty(item.name)) {
                  this.ruleForm[item.name] = item.value;
                }
              });

            }
          }
        });
    },
    submitForm(formName) {
      // this.$refs[formName].validate((valid) => {
      // if (valid) {
      let ruleform;
      if (this.$route.query.rowindex == 5) {
        ruleform = {
          name: "bitgo",
          bitgo_token: this.ruleForm.token,
          wallet_id: this.ruleForm.wallet_id,
          wallet_passphrase: this.ruleForm.wallet_passphrase
        };
      } else if (this.$route.query.rowindex == 4) {
        ruleform = {
          name: "ethereum",
          wallet: this.ruleForm.wallet,
          private_key: this.ruleForm.private_key
        };
      }else if (this.$route.query.rowindex == 6) {
        ruleform = {
          name: "order_sms",
          simplify_value: this.SimplifiedText,
          traditional_value: this.traditionalText,
          english_value: this.englishText
        };
      }  else if (this.$route.query.rowindex == 7) {
        ruleform = {
          name: "order_email",
          simplify_value: this.Simplified,
          traditional_value: this.traditional,
          english_value: this.english
        };
      } else {
        ruleform = this.ruleForm;
      }
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/admin_api/user.user_config/editUserConfig`,
          ruleform
        )
        .then(res => {
          this.msg = res.data.msg;
          this.remindervisible = true;
          if (res.data.ret == 0) {
            this.successto = "setting_list";
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
.setting_edit {
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
    /*margin:30px 0 100px 20px;*/
    margin: 50px 0 100px 0;
    width: 40%;
    section {
      display: flex;
      justify-content: space-between;
      button {
        width: 40%;
        height: 40px;
        cursor: pointer;
        color: white;
        /*text-align: center;*/
        font-size: 16px;
        line-height: 40px;
        border-radius: 5px;
        background: #ddd;
      }
      @media (max-width: 1024px) {
        button {
          font-size: 14px;
        }
      }
      button:nth-of-type(2) {
        background: url("../../../static/savechange.png") no-repeat;
        background-size: cover;
      }
    }
  }
  main.text{

  }
   main.richtext{
      width: 90%;
   }
    main.text{
      width: 80%; 
    }
   main.text,main.richtext {
    //  width: 90%;
    .example {
      display: flex;
      li {
        // flex:1;
        width: 40%;
        .el-textarea {
          height: 100%;
          .el-textarea__inner {
            height: 100%;
            font-family: 'Roboto,RobotoDraft,Helvetica,Arial,sans-serif';
          }
        }
      }
      li:nth-of-type(1) {
        margin-right: 30px;
        // font-weight: 550;
      }
    }
    section {
      button {
        width: 23%;
      }
    }
  }
}
</style>
