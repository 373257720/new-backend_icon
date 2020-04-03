<template>
  <div class="setting_edit">
    <header><h2>
      <span>Setting</span>
      <i class="el-icon-arrow-right"></i>
      <span>{{title}}</span>
    </h2>
    </header>
    <main v-if="rowid==0">
      <el-form  label-position="top" :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item  label="Cash Inbox Percent:" prop="in_cashbox_warn_percent">
          <el-input  v-model="ruleForm.in_cashbox_warn_percent" clearable autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <section>
        <button @click="$routerto('setting')">Cancel</button>
        <button  @click="submitForm('ruleForm')">Save Change</button>

      </section>
    </main>
    <main v-if="rowid==1">
      <el-form  label-position="top" :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
<!--        <el-form-item  label="Cash Inbox Percent:" prop="in_cashbox_warn_percent">-->
<!--          <el-input  v-model="ruleForm.in_cashbox_warn_percent" clearable autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item  label="Cash Outbox Percent:" prop="out_cashbox_warn_percent">
          <el-input  v-model="ruleForm.out_cashbox_warn_percent"  clearable autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <section>
        <button @click="$routerto('setting')">Cancel</button>
        <button  @click="submitForm('ruleForm')">Save Change</button>

      </section>
    </main>
    <main v-if="rowid==2">
      <el-form  label-position="top" :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item  label="Transaction Time(seconds):" prop="sell_coin_wait_time">
          <el-input  v-model="ruleForm.sell_coin_wait_time" clearable autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <section>
        <button @click="$routerto('setting')">Cancel</button>
        <button  @click="submitForm('ruleForm')">Save Change</button>

      </section>
    </main>
    <main v-if="rowid==3">
      <el-form  label-position="top" :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item  label="Website:" prop="website">
          <el-input  v-model="ruleForm.customer_service_website" clearable autocomplete="off">{{ruleForm.website}}</el-input>
        </el-form-item>
        <el-form-item  label="E-mail:" prop="email">
          <el-input  v-model="ruleForm.customer_service_email"  clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Contact Number:" prop="contact_num">
          <el-input  v-model="ruleForm.customer_service_phone"   clearable autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <section>
        <button @click="$routerto('setting')">Cancel</button>
        <button  @click="submitForm('ruleForm')">Save Change</button>

      </section>
    </main>
    <main v-if="rowid==4">
      <el-form  label-position="top" :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="Ethereum Wallet Address:" prop="contact_num">
          <el-input  v-model="ruleForm.wallet"   clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Ethereum Private key" prop="contact_num">
          <el-input  show-password v-model="ruleForm.private_key"   clearable autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <section>
        <button @click="$routerto('setting')">Cancel</button>
        <button  @click="submitForm('ruleForm')">Save Change</button>

      </section>
    </main>
    <main v-if="rowid==5">
      <el-form  label-position="top" :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item  label="Token:" prop="password">
          <el-input type="password" v-model="ruleForm.token" show-password  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Wallet ID:" prop="wallet_id">
          <el-input  v-model="ruleForm.wallet_id"    clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Wallet Password:" prop="wallet_passphrase" >
          <el-input type="password" v-model.number="ruleForm.wallet_passphrase" show-password   clearable autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <section>
        <button @click="$routerto('setting')">Cancel</button>
        <button  @click="submitForm('ruleForm')">Save Change</button>
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
        title:'',
        msg:'',
        successto:'',
        remindervisible:false,
        rowid:'',//which  edit
        parameter_obj:{
          name:'',
        },
        ruleForm: {},
        rules: {
          // website:[{
          //
          // }],
          // inbox: [
          //   { required: true, message: 'this gap can not be empty', trigg: 'change' }
          // ],
          // outbox:[
          //   { required: true, message: 'this gap can not be empty', trigg: 'change' }
          // ],
          // username: [
          //   { required: true, message: 'this gap can not be empty', trigg: 'change' }
          // ],
          //
          // password: [
          //   {required: true, validator: validatePass, trigger: 'blur' },
          //   { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          //
          // ],
          // repassword: [
          //   { required: true,min: 6, max: 16,validator: validatePass2, trigger: 'blur' },
          // ],
          // nickname:[
          //   { required: true, message: 'this gap can not be empty', trigger: 'blur' }
          // ],
          // email: [
          //   { required: true, message: "请输入邮箱地址", trigger: "blur" },
          //   {
          //     type: "email",
          //     message: "请输入正确的邮箱地址",
          //     trigger: ["blur", "change"]
          //   }
          // ],
          // mobile:[
          //   { required: true, message: 'this gap can not be empty', trigger: 'blur' }
          // ],
          // status:[
          //   { required: true,},
          // ]
        },

      };
    },
    watch:{
      ruleform:{}
    },
  created() {
      // console.log(this.$route.query)
      this.parameter_obj.token=this.$store.state.token;
      this.ruleForm.token=this.$store.state.token;
      this.rowid=this.$route.query.rowindex;
      if(this.rowid==0){
        this.title='Cash Inbox';
        this.ruleForm=Object.assign({}, this.ruleForm,{
          in_cashbox_warn_percent:'',
        })
        Object.assign(this.parameter_obj,{
          name:'in_cashbox_warn_percent',
        })

      }
      else if(this.rowid==1){
        this.title='Cash Outbox';
        this.ruleForm=Object.assign({}, this.ruleForm,{
          out_cashbox_warn_percent:'',
        })
        Object.assign(this.parameter_obj,{
          name:'out_cashbox_warn_percent',
        })
      }
      else if(this.rowid==2){
        this.title='Transaction Time';
        this.ruleForm=Object.assign({}, this.ruleForm,{
          sell_coin_wait_time:'',
        })
        Object.assign(this.parameter_obj,{
          name:'sell_coin_wait_time',
        })
      }
      else if(this.rowid==3){
        this.title='Receipts';
        this.ruleForm=Object.assign({}, this.ruleForm,{
          customer_service_website:'',
          customer_service_email:'',
          customer_service_phone:'',
        })
          Object.assign(this.parameter_obj,{
          name:'customer_service_website,customer_service_email,customer_service_phone',
        })

      }
      else if(this.rowid==4){
        this.title='Ethereum';
        this.ruleForm=Object.assign({}, this.ruleForm,{
          // value:'',
          wallet:'',
          private_key:'',
        })
        Object.assign(this.parameter_obj,{
          name:'ethereum',
        })

      }
      else if(this.rowid==5){
        this.title='Bitgo';
        this.ruleForm=Object.assign({}, this.ruleForm,{
          bitgo_token:'',
          wallet_id:'',
          wallet_passphrase:'',
        })
        Object.assign(this.parameter_obj,{
          name:'bitgo',
        })
        // console.log(this.parameter_obj)
      }
      this.getdata();
    },
    methods: {
      getdata(){
        // this.$axios({
        //   method: 'get',
        //   url: `${this.$baseurl}/admin_api/user.user_config/getUserConfigInfo`,
        //   params: this.parameter_obj,
        // })
          this.$global.get_encapsulation(`${this.$baseurl}/admin_api/user.user_config/getUserConfigInfo`,this.parameter_obj)
          .then(res => {
          if(res.data.ret==0){
            // console.log(res)
            if(this.rowid==6 || this.rowid==5 || this.rowid==4){
              // console.log(res.data.data[0].value)
              for( var i in res.data.data[0].value){
               if(this.ruleForm.hasOwnProperty(i)) {
                 this.ruleForm[i]= res.data.data[0].value[i]
               }
              }
            }
            else{
              res.data.data.forEach(item=>{
                if(this.ruleForm.hasOwnProperty(item.name)) {
                  this.ruleForm[item.name]=item.value;
                }
              })
              // console.log(this.ruleForm)
            }
            // else if(this.rowid==4){
            //   res.data.data.forEach(item=>{
            //     this.ruleForm[item.name]=item.value;
            //   })
            // }
          }
        });
      },
      // handleClick(row) {
      //   console.log(row);
      //   this.$router.push("/home/project/signedup/signedup_check");
      // },
      // fromchildren1(data) {
      //   this.bobo = data;
      //   // console.log(data);
      // },
      submitForm(formName) {
        // this.$refs[formName].validate((valid) => {
          // if (valid) {
              if(this.$route.query.rowindex==5 ){
              let ruleform={
                name:'bitgo',
                bitgo_token:this.ruleForm.token,
                wallet_id:this.ruleForm.wallet_id,
                wallet_passphrase:this.ruleForm.wallet_passphrase
              }
                this.$global.post_encapsulation(`${this.$baseurl}/admin_api/user.user_config/editUserConfig`,ruleform).then(res=>{
                  this.msg=res.data.msg;
                  this.remindervisible=true;
                  if(res.data.ret==0){
                    this.successto='setting_list';
                    // this.$routerto('setting_list')

                  }
                })
            }else if(this.$route.query.rowindex==4){
                let ruleform={
                  name:'ethereum',
                  wallet:this.ruleForm.wallet,
                  private_key:this.ruleForm.private_key,
                }
                this.$global.post_encapsulation(`${this.$baseurl}/admin_api/user.user_config/editUserConfig`,ruleform).then(res=>{
                  this.msg=res.data.msg;
                  this.remindervisible=true;
                  if(res.data.ret==0){
                    this.successto='setting_list';
                    // this.$routerto('setting_list')

                  }
                })
              }
              else{
                console.log(this.ruleForm)
                this.$global.post_encapsulation(`${this.$baseurl}/admin_api/user.user_config/editUserConfig`,this.ruleForm).then(res=>{
                  this.msg=res.data.msg;
                  this.remindervisible=true;
                  if(res.data.ret==0){
                    this.successto='setting_list';
                  }
                })
              }
          // } else {
          //   console.log('error submit!!');
          //   return false;
          // }
        // });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },

    // watch: {
    //   $route(to, from) {
    //     if (to.name == "signedup_check") {
    //       this.ischeck = !this.ischeck;
    //     } else {
    //       this.ischeck = false;
    //     }
    //   }
    // }
  };
</script>

<style lang='scss'>
  .setting_edit{
    margin :0 0 0 50px;
    width: 90%;
    header{
      position: relative;
      height: 136px;
      border-bottom: 1px solid #d3d3d3;
      h2{
        font-size: 20px;
        position: absolute;
        bottom:20px;
        /*font-weight: 550;*/
      }

    }
    .el-form--label-top .el-form-item__label{
      padding: 0;
    }
    main{
      /*margin:30px 0 100px 20px;*/
      margin: 50px 0 0 0;
      width: 40%;
      section{
        display: flex;
        justify-content: space-between;
        button{
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
        button:nth-of-type(2){
          background:url("../../../static/savechange.png") no-repeat;
          background-size: cover;
        }
      }
    }
  }
</style>
