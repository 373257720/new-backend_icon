<template>
  <div class="account_setting">
    <header><h2>
      <span>ATM TECHNICAL SUPPORT</span>
    <i class="el-icon-arrow-right"></i>
      <span>{{title}}</span>
    </h2>
    </header>
    <main>
      <el-form  label-position="top" :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item  label="User Name" prop="username">
          <el-input  v-model="ruleForm.username" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  label="Password" prop="password">
          <el-input type="password" v-model="ruleForm.password" show-password clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Confirm password" prop="repassword">
          <el-input type="password" v-model="ruleForm.repassword" show-password   clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Nickname" prop="nickname" >
          <el-input v-model.number="ruleForm.nickname"   clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email"  >
          <el-input v-model.number="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Phone" prop="mobile"  >
          <el-input v-model.number="ruleForm.mobile" clearable></el-input>
        </el-form-item>
        <el-form-item label="State" prop="status">
          <template>
            <el-radio  v-model="ruleForm.status" label="1">Enable</el-radio>
            <el-radio v-model="ruleForm.status" label="2">Disable</el-radio>
          </template>
        </el-form-item>
<!--        <el-form-item>-->
<!--          <el-button  @click="submitForm('ruleForm')">提交</el-button>-->
<!--          <el-button @click="resetForm('ruleForm')">重置</el-button>-->
<!--        </el-form-item>-->


      </el-form>
      <section>
        <button @click="$routerto('atm_support')">Cancel</button>
        <button  @click="submitForm('ruleForm')">Save Change</button>


      </section>
    </main>

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
      ruleForm: {
        username:'',
        password: '',
        repassword: '',
        nickname: '',
        email:'',
        mobile:'',
        status:"1",
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
      }
    };
  },
  created() {
    // console.log(this.$route.query)
    this.ruleForm.token=this.$store.state.token;
    if(this.$route.query.type==1){
        this.title='ADD';

    }else if(this.$route.query.type==2){
      this.title='EDIT';
      this.ruleForm.atm_user_id=this.$route.query.atm_user_id;
      this.getdata();
    }

  },
  methods: {
    getdata(){
      this.$axios({
        method: 'get',
        url: `${this.$baseurl}/admin_api/user.atm_user/getAtmUserInfo`,
        params: {
          token:this.$store.state.token,
          atm_user_id:this.$route.query.atm_user_id,
        },
      }).then(res => {
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
          if(this.$route.query.type==1){
            this.$axios({
              method: 'post',
              url: `${this.$baseurl}/admin_api/user.atm_user/addAtmUser`,
              data: this.ruleForm,
            }).then(res => {
              if(res.data.ret==0){
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.$routerto('atm_support');
              }
            });
          }else if(this.$route.query.type==2){
            this.$axios({
              method: 'post',
              url: `${this.$baseurl}/admin_api/user.atm_user/editAtmUser`,
              data: this.ruleForm,
            }).then(res => {
              if(res.data.ret==0){
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.$routerto('atm_support');
              }
            });
          }


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

  watch: {
    $route(to, from) {
      if (to.name == "signedup_check") {
        this.ischeck = !this.ischeck;
      } else {
        this.ischeck = false;
      }
    }
  }
};
</script>

<style lang='scss'>
  .account_setting{
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
      margin:30px 0 100px 20px;
      width: 40%;
      section{
        display: flex;
        justify-content: space-between;
        button{
          width: 40%;
          height: 40px;
          cursor: pointer;
          color: white;
          font-size: 16px;
          line-height: 40px;
          border-radius: 5px;

        }
        button:nth-of-type(2){
          background:url("../../../static/savechange.png") no-repeat;
        }
      }
    }
  }
</style>
