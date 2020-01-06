<template>
  <div class="edit_first">
      <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="Machine:" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Serial Number:" prop="name">
          <el-input v-model="ruleForm.serial_number"   :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="Warning E-mail Adress" prop="name">
          <el-input v-model="ruleForm.alert_email"></el-input>
        </el-form-item>
        <el-form-item label="Emergent Contact Number" prop="name">
          <el-input v-model="ruleForm.alert_mobile"></el-input>
        </el-form-item>
        <el-form-item label="Group:" prop="region">
          <el-select v-model="ruleForm.machine_group_id" placeholder="">
            <el-option
              v-for="item in groupList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Location" prop="region">
          <el-select v-model="ruleForm.country_id" placeholder="">
            <el-option
              v-for="item in CountryList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Address" prop="name">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item label="Photo">
          <div class="project_pic">
            <el-upload
              action
              list-type="picture-card"
              :http-request="function(params){return uploadFile(params)}"
              :on-preview="handlePictureCardPreview"
              :file-list="fileList"
              :on-remove="appear3"
              :on-error="appear3"
              :on-change="dispear3"
              :limit="1"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </div>
        </el-form-item>
      </el-form>
      <section>
        <button @click="$global.previous">BACK</button>
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
        CountryList: [],
        groupList:[],
        dialogImageUrl:'',
        dialogVisible:false,
        fileList: [],
        machine_picture:'',
        ruleForm:{
            name:'',
            machine_id:'',
            serial_number:'',
            alert_email:'',
          alert_mobile:'',
            machine_group_id:'',
            country_id:'',
            address:'',
            machine_picture_id:'',
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
      }
    },
    watch: {

    },
    mounted() {
      this.$nextTick(function () {
        for(var i in this.ruleForm){
          if(this.MachineInfo.hasOwnProperty(i))
            this.ruleForm[i]=this.MachineInfo[i]
        }
        if(this.MachineInfo.machine_picture!=null){
          this.choose(".project_pic .el-upload--picture-card");
          this.fileList.push({name: 'food.jpeg', url:this.$baseurl+this.MachineInfo.machine_picture})

        }
      })

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
    methods:{


      submitForm(){
        console.log(this.ruleForm);
        this.ruleForm.token=this.$store.state.token;
        this.$global.post_encapsulation(`${this.$baseurl}/admin_api/machine.machine/editMachine`,this.ruleForm)
        .then(res=>{

          if(res.data.ret==0){
            this.$emit('getchildren');
            this.$routerto('edit_2nd',{machine_id:this.$route.query.machine_id});
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
        this.ruleForm.machine_picture_id='';
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
        this.formData.append('picture_input', 'file')
        this.formData.append('attach_dir', 'machine')
        this.$axios({
          method: "post",
          url: `${this.$baseurl}/home/common.picture/upload.html`,
          data: this.formData,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
          .then(res => {
            this.ruleForm.machine_picture_id=res.data.data.picture_id;
            // if(res.data.data.picture_list.original){
            //   this.machine_picture=res.data.data.picture_list.original;
            // }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
</script>

<style lang='scss'>
  .edit_first{
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

