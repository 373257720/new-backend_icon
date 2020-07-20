<template>
  <div class="add_first">
    <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="Group:" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Warning E-mail Address:" prop="alert_email">
        <el-input v-model="ruleForm.alert_email"></el-input>
      </el-form-item>
      <el-form-item label="Emergent Contact Number:" prop="name">
        <el-input v-model="ruleForm.alert_mobile"  ></el-input>
      </el-form-item>
    </el-form>
    <section>
      <button @click="$global.previous">BACK</button>
      <button  @click="submitForm('ruleForm')">NEXT</button>
    </section>
<!--    <dialog_reminder :msg="msg" :remindervisible.sync="remindervisible"></dialog_reminder>-->
  </div>
</template>
<script>
  export default {
    props:['tochind'],
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
        CountryList: [],
        groupList:[],
        dialogImageUrl:'',
        dialogVisible:false,
        fileList: [],
        machine_picture:'',
        ruleForm:{
          name:'',
          alert_email:'',
          alert_mobile:'',
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
          alert_email: [
            {  message: 'Please input email address', trigger: 'blur' },
            { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
          ],
          mobile:[
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          status:[
            { required: true,},
          ]
        },
      }
    },
    mounted() {
      if(this.$route.query.type==2){
        // console.log(this.tochind)
          for(let i in this.ruleForm){
            if(this.tochind.hasOwnProperty(i)){
              this.ruleForm[i]=this.tochind[i]
              // console.log(this.tochind)
            }
          }
          // ({alert_email} = this.tochind);
          // console.log(this.alert_email);
          
          
      }
    },
    created() {
      let axiosList = [
        this.$axios.get(`${this.$baseurl}/admin_api/content.country/getCountryList`,{
          params:{ token:this.$store.state.token,lang:'en-us'}}),
        this.$axios.get(`${this.$baseurl}/admin_api/machine.machine_group/getMachineGroupList`, {
          params: {token: this.$store.state.token, page: 1, size: 10000,keyword:''},
        })
      ];
      this.$axios.all(axiosList).then(
        this.$axios.spread((res1, res2) => {
          if (res1) {
            console.log(res1)
            for (let i = 0; i < res1.data.data.data.length; i++) {
              this.CountryList.push({
                value: res1.data.data.data[i].country_id,
                label: res1.data.data.data[i].name
              });
            }
            // console.log(this.CountryList  )
          }
          if (res2) {
            this.groupList.push({ value: '0', label:'-',})
            for (let i = 0; i < res2.data.data.data.length; i++) {
              this.groupList.push(
                {
                  value: res2.data.data.data[i].machine_group_id,
                  label: res2.data.data.data[i].name,
                });
            }
          }
        })
      );

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
    methods:{
      submitForm(){
        // console.log(this.ruleForm);
        this.$emit('getchildren','','second');
        // this.ruleForm.token=this.$store.state.token;
        // this.$global.post_encapsulation(`${this.$baseurl}/admin_api/machine.machine/editMachine`,this.ruleForm)
        //   .then(res=>{
        //     if(res.data.ret==0){
        //       this.$emit('getchildren');
        //       this.$routerto('edit_2nd',{machine_id:this.$route.query.machine_id});
        //     }
        //   })
      },
    }
  }
</script>

<style lang='scss'>
  .add_first{

    .el-select{
      width: 100%;
    }
    .project_pic {
      position: relative;
      height: 200px;
      .el-upload-list--picture-card .el-upload-list__item{
        margin: 0;
        transform: none;
        bottom: 0;
        width: 100%;
        height: 200px;
        position: absolute;
        /*box-sizing: border-box;*/
      }
      .el-upload-list__item.is-success .el-upload-list__item-status-label{
        display: none;
      }
      .el-upload--picture-card {
        /*display: none;*/
        bottom: 0;
        width: 100%;
        /*box-sizing: border-box;*/
        height: 200px;
        border: 1px solid #c0ccda;
        background: white;
        position: absolute;
      }
      .el-icon-plus {
        line-height: 200px;
      }

    }
  }


</style>

