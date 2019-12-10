<template>
  <div class="account_setting">
    <header><h2>{{title}}</h2></header>
    <main>
      <el-form  label-position="top" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item  label="用户" prop="username">
          <el-input  v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input type="password" v-model="ruleForm.repassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model.number="ruleForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model.number="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <template>
            <el-radio v-model="ruleForm.status" label="1">备选项</el-radio>
            <el-radio v-model="ruleForm.status" label="2">备选项</el-radio>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button type="手机号码" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>

      </el-form>
    </main>

  </div>
</template>

<script>
export default {
  data() {

    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
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
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      title:'',
      ruleForm: {
        token:'',
        atm_user_id:'',
        username:'',
        password: '',
        repassword: '',
        nickname: '',
        email:'',
        mobile:'',
        status:'',
      },
      rules: {
        username: [
          { validator: validatePass, trigger: 'blur' }
        ],
        
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    // console.log(this.$route.query)
    if(this.$route.query.type==1){
        this.title='增加';
    }else if(this.$route.query.type==2){
      this.title='编辑';
    }

  },
  methods: {
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
          alert('submit!');
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
    main{
      margin:30px 0 100px 20px;
      width: 40%;
    }
  }
</style>
