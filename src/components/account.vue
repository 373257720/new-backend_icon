<template>
  <div class="account">
    <header><h2>
      <span>{{$t('AccountSetting.AccountSetting')}}</span>
      <!--      <i class="el-icon-arrow-right"></i>-->
      <!--      <span>{{title}}</span>-->
    </h2>
    </header>
    <main>
      <el-form  label-position="top" :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item  :label="$t('AccountSetting.Nickname')+':'" prop="nickname">
          <el-input  v-model="ruleForm.nickname" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('AccountSetting.Newpassword')+':'" prop="password" >
          <el-input type="password" v-model="ruleForm.password" show-password   clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('AccountSetting.ConfirmNewpassword')+':'" prop="repassword">
          <el-input type="password" v-model="ruleForm.repassword" show-password   clearable autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <section>
        <button @click="$routerto('atm_support')">{{$t('common.Cancel')}}</button>
        <button  @click="submitForm('ruleForm')">{{$t('common.save')}}</button>
      </section>
    </main>

  </div>
</template>

<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('user.Pleasepassword')));
        } else {
          if (this.ruleForm.repassword !== '') {
            this.$refs.ruleForm.validateField('repassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        console.log(value,this.ruleForm.password)
        if (value === '') {
          callback(new Error(this.$t('user.Pleasepasswordagain')));
        } else if (value !== this.ruleForm.password) {
          callback(new Error(this.$t('user.Twoinputsdonotmatch')));
        } else {
          callback();
        }
      };
      return {
        title:'',
        ruleForm: {
          password:'',
          repassword: '',
          nickname: '',
        },
        rules: {
          password: [
            {required: true, validator: validatePass, trigger: 'blur' },
            { min: 6, max: 16, message:  this.$t('user.Length6to16'), trigger: 'blur' }
          ],
          repassword: [
            { required: true,min: 6, max: 16,validator: validatePass2, trigger: 'blur' },
          ],
          nickname:[
            { required: true, message: this.$t('common.PleaseInput'), trigger: 'blur' }
          ],
  
        }
      };
    },
    created() {
      this.getdata();
      // console.log(this.$route.query)
      // this.ruleForm.token=this.$store.state.token;
      // if(this.$route.query.type==1){
      //   this.title='ADD';
      // }else if(this.$route.query.type==2){
      //   this.title='EDIT';
      //   this.ruleForm.atm_user_id=this.$route.query.atm_user_id;
      //   this.getdata();
      // }

    },
    methods: {
      getdata(){
        // this.$axios({
        //   method: 'get',
        //   url: `${this.$axios.defaults.baseURL}/admin_api/user.back_user/getUserInfo`,
        //   params: {
        //     token:this.$store.state.token,
        //     // user_id:this.$route.query.atm_user_id,
        //   },
        // })
        this.$global.get_encapsulation(`${this.$axios.defaults.baseURL}/admin_api/user.back_user/getUserInfo`)
          .then(res => {
          if(res.data.ret==0){
            console.log(res)
            for( let key in res.data.data){
              if(this.ruleForm.hasOwnProperty(key)){
                this.ruleForm[key]=res.data.data[key];
              }
            }
            // if(this.ruleForm.hasOwnProperty())
            // this.$routerto('atm_support');
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
        this.$refs[formName].validate((valid) => {
          if (valid) {
              // this.$axios({
              //   method: 'post',
              //   url: `${this.$axios.defaults.baseURL}/admin_api/user.back_user/editUser`,
              //   data: this.ruleForm,
              // })
            this.$global.post_encapsulation(`${this.$axios.defaults.baseURL}/admin_api/user.back_user/editUser`, this.ruleForm)
                .then(res => {
                if(res.data.ret==0){
                  console.log(res)
                  // this.$routerto('atm_support');
                  this.$message({
                    message: res.data.msg,
                    type: 'success'
                  });
                }
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },


  };
</script>

<style lang='scss'>
  .account{
    margin :0 0 0 50px;
    width: 90%;
    header{
      position: relative;
      height: 80px;
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
      margin:30px 0 100px 20px;
      width: 40%;
      section{
        display: flex;
        justify-content: space-between;
        button{
          width: 40%;
          height: 40px;
          cursor: pointer;
          background: #ddd;
          color: white;
          font-size: 16px;
          line-height: 40px;
          border-radius: 5px;

        }
        button:nth-of-type(2){
          background:url("../../static/savechange.png") no-repeat;
          background-size: cover;
        }
      }
    }
  }
</style>
