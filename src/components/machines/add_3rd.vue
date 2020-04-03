<template>
  <div class="add_third">
    <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="Operator:" prop="name">
        <el-input v-model="ruleForm.company_name"></el-input>
      </el-form-item>
      <el-form-item label="Tel:" prop="name">
        <el-input v-model="ruleForm.customer_service_mobile"></el-input>
      </el-form-item>
      <el-form-item label="Email:" prop="name">
        <el-input v-model="ruleForm.customer_service_email"></el-input>
      </el-form-item>
      <el-form-item label="Safe Mode Password:" prop="name">
        <el-input show-password v-model="ruleForm.safe_password"></el-input>
      </el-form-item>
      <el-form-item label="Withdrawl Password:" prop="name">
        <el-input show-password v-model="ruleForm.withdraw_password"></el-input>
      </el-form-item>
    </el-form>
    <section>
      <button @click="goback">BACK</button>
      <button  @click="submitForm('ruleForm')">NEXT</button>
    </section>
  </div>
</template>
<script>
  export default {
    props:["tochind"],
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
        ruleForm:{
          machine_id:'',
          company_name:'',
          customer_service_mobile:'',
          customer_service_email:'',
          safe_password:'',
          withdraw_password:'',
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
      }
    },
    watch:{
      ruleForm: {
        handler(newValue, oldValue) {
          // console.log(newValue)
          this.$emit('getchildren',this.ruleForm)
        },
        deep: true
      },
    },
    mounted() {

      if(this.$route.query.type==2){
        for(let i in this.ruleForm){
          if(this.tochind.hasOwnProperty(i)){
            this.ruleForm[i]=this.tochind[i]
          }

        }

      }
    },
    methods:{
      goback(){
        this.$emit('back','second')
      },
      submitForm(){
      this.$emit('getchildren','','fourth');
  //       this.ruleForm.token=this.$store.state.token;
  // this.$global.post_encapsulation(`${this.$baseurl}/admin_api/machine.machine/editMachine`,this.ruleForm)
  //   .then(res=>{
  //     if(res.data.ret==0){
  //       this.$emit('getchildren');
  //       this.$routerto('edit_4th',{machine_id:this.$route.query.machine_id});
  //     }
  //   })
  },

    }
  }
</script>

<style lang='scss'>
  .add_third{
    .el-select{
      width: 100%;
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
