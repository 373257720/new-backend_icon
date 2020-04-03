<template>
  <div class="edit_second">
    <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="Currency:" prop="currency_id">
        <el-select v-model="ruleForm.currency_id" placeholder="">
          <el-option
            v-for="item in currencypList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Cash Inbox Denomination:" prop="name">
        <el-input :label="num" v-model="ruleForm.in_support_money"></el-input>
      </el-form-item>
      <el-form-item label="Cash Outbox Denomination:" prop="name">
        <el-input v-model="ruleForm.out_support_money"></el-input>
      </el-form-item>
      <el-form-item label="Fast Withdraw Denomination:" prop="name">
        <el-input v-model="ruleForm.shortcut_money"></el-input>
      </el-form-item>
      <el-form-item  label="Cryptocurrency:" prop="name">
          <el-radio-group v-model="ruleForm.is_buy_sell">
            <el-radio :label="1">Buy</el-radio>
            <el-radio :label="2">Sell</el-radio>
            <el-radio :label="3">Both</el-radio>
          </el-radio-group>
    </el-form-item>
      <el-form-item  label="KYC Registration:" prop="region">
        <el-radio-group v-model="ruleForm.is_register">
          <el-radio :label="1">Yes</el-radio>
          <el-radio :label="2">No</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Cryptocurrency Type">
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">BTC</template>
            <el-form-item  label="Local Transaction Regulation:" prop="name">
              <el-radio-group v-model="ruleForm.is_support_bitcoin">
                <el-radio :label="2">Buy</el-radio>
                <el-radio :label="3">Sell</el-radio>
                <el-radio :label="1">Both</el-radio>
                <el-radio :label="4">Not allow</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item  label="Commission Rate (%):" prop="name">
              <div class="flexbox">
                <div class="box">
                  <span>Buy:</span><el-input v-model="ruleForm.buy_bitcoin_fee"></el-input>
                </div>
                <div class="box">
                  <span>Sell:</span><el-input v-model="ruleForm.sell_bitcoin_fee"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="Purchase Limitation (Minimum):" prop="name">
              <el-input v-model="ruleForm.minimum_bitcoin_buy"></el-input>
            </el-form-item>
            <el-form-item label="Purchase Limitation (Maximum):" prop="name">
              <el-input v-model="ruleForm.maximum_bitcoin_buy"></el-input>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">ETH</template>
            <el-form-item  label="Local Transaction Regulation:" prop="name">
              <el-radio-group v-model="ruleForm.is_support_ethereum">
                <el-radio :label="2">Buy</el-radio>
                <el-radio :label="3">Sell</el-radio>
                <el-radio :label="1">Both</el-radio>
                <el-radio :label="4">Not allow</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item  label="Commission Rate (%):" prop="name">
              <div class="flexbox">
                <div class="box">
                  <span>Buy:</span><el-input v-model="ruleForm.buy_ethereum_fee"></el-input>
                </div>
                <div class="box">
                  <span>Sell:</span><el-input v-model="ruleForm.sell_ethereum_fee"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="Purchase Limitation (Minimum):" prop="name">
              <el-input v-model="ruleForm.minimum_ethereum_buy"></el-input>
            </el-form-item>
            <el-form-item label="Purchase Limitation (Maximum):" prop="name">
              <el-input v-model="ruleForm.maximum_ethereum_buy"></el-input>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
      </el-form-item>
    </el-form>
    <section>
      <button @click="goback">BACK</button>
      <button  @click="submitForm('ruleForm')">SUBMIT</button>
    </section>
    <dialog_reminder :msg="msg" :remindervisible.sync="remindervisible"></dialog_reminder>
  </div>
</template>
<script>
  export default {
    props:["MachineInfo"],
    data(){
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
      return{
        msg:'',
        remindervisible:false,
        currencypList:[],
        ruleForm:{
          machine_id:'',
          currency_id:'',
          in_support_money:'',
          out_support_money:'',
          shortcut_money:'',
          is_buy_sell:'',
          is_register:'',
          is_support_bitcoin:'',
          minimum_bitcoin_buy:'',
          maximum_bitcoin_buy:'',
          buy_bitcoin_fee:'',
          sell_bitcoin_fee:'',
          is_support_ethereum:'',
          minimum_ethereum_buy:'',
          maximum_ethereum_buy:'',
          buy_ethereum_fee:'',
          sell_ethereum_fee:'',
        },
        rules: {
          username: [
            { required: true, message: '不能为空', trigg: 'change' }
          ],

          password: [
            {required: true, validator: validatePass, trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }

          ],
          repassword: [
            { required: true,min: 6, max: 16,validator: validatePass2, trigger: 'blur' },
          ],
          nickname:[
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          email: [
            { required: true, message: "请输入邮箱地址", trigger: "blur" },
            {
              type: "email",
              message: "请输入正确的邮箱地址",
              trigger: ["blur", "change"]
            }
          ],
          mobile:[
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          status:[
            { required: true,},
          ]
        },
        num:'',
      }
    },
    watch:{

    },
    created() {
      this.$global.get_encapsulation(`${this.$baseurl}/admin_api/content.currency/getCurrencyList`,{token:this.$store.state.token})
        .then(res=>{
          if (res) {
            this.currencypList.push({ value: '0', label:'-',})
            for (let i = 0; i < res.data.data.data.length; i++) {
              this.currencypList.push({
                value: res.data.data.data[i].currency_id,
                label: res.data.data.data[i].name
              });
            }
          }
        })
    },
    mounted() {
        for(var i in this.ruleForm){
          if(this.MachineInfo.hasOwnProperty(i))
            this.ruleForm[i]=this.MachineInfo[i]
        };
    },
    methods:{
    toThousands(num) {
    var num = (num || 0).toString(), result = '';
    while (num.length > 3) {
      result = ',' + num.slice(-3) + result;
      num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
      console.log(result)
    this.num=result
  },
  goback(){
        // this.$emit('sontodad', 2);
        this.$global.previous();
      },
      submitForm(){
        console.log(this.ruleForm);
        this.$global.post_encapsulation(`${this.$baseurl}/admin_api/machine.machine/editMachine`,this.ruleForm)
          .then(res=>{
            if(res.data.ret==0){
              this.$emit('getchildren');
              this.$routerto('edit_3rd',{machine_id:this.$route.query.machine_id});
            }else{
              this.msg=res.data.msg;
              this.remindervisible=true;
            }
          })
      },
      appear3() {
        this.handleRemove(
          ".project_pic .el-upload--picture-card",
          ".project_pic .el-upload-list__item"
        );
      },
      handleRemove(a, b) {
        document.querySelector(a).style =
          "position:absolute;bottom:0;display:block;";
        document.querySelector(b).style = "display:none";
      },
      dispear3(file, fileList) {
        this.choose(".project_pic .el-upload--picture-card");
      },
      choose(a) {
        var b = document.querySelector(a);
        b.style = "display:none;";
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      uploadFile(params) {
        // console.log(params,index);formData
        const _file = params.file;
        // const isLt2M = _file.size / 1024 / 1024 < 2;
        this.formData = new FormData();
        this.formData.append("file", _file);
        this.$axios({
          method: "post",
          url: `${this.$baseurl}/bsl_admin_web/upload/pic`,
          data: this.formData
          // headers: {
          //   "Content-Type": "multipart/form-data"
          // }
        })
          .then(res => {
            this.form.pic = [];
            this.form.pic.push(res.data.data.urlBase + res.data.data.url);
            this.form.pic.push(res.data.data.urlBase + res.data.data.url);
            // this.form.pic = res.data.data.url;
            // this.form.pic=JSON.stringify(arr)
            console.log(this.form.pic);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
</script>

<style lang='scss'>
  .edit_second{
    .radioo{
      display: flex;
    }
    .el-select{
      width: 100%;
    }
    .el-radio__input.is-checked .el-radio__inner{
      border-color:#2ABEE2;
      background: #2ABEE2;

    }
    .el-radio__inner:hover{
      border-color:#2ABEE2;
    }
    .el-radio__input.is-checked+.el-radio__label{
     color:#2ABEE2;
    }
    .el-radio__input.is-checked .el-radio__inner::after{
      transform: rotate(45deg) scaleY(1);
    }
    .el-radio__inner::after{
      box-sizing: content-box;
      content: "";
      background: none;
      border: 2px solid #FFF;
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
    .el-collapse-item__content{
      >div{
        /*margin-bottom: 10px;*/
      }
    }
    .flexbox{
      display: flex;
      justify-content: space-between;
      div.box{
        display: flex;
        width: 45%;
        span{
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
