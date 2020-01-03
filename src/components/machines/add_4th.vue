<template>
  <div class="add_fourth">
    <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="Background">
        <div class="background_picture">
          <el-upload
            action
            list-type="picture-card"
            :http-request="function(params){return uploadFile(params,'background_picture','background_picture_id')}"
            :on-preview="handlePictureCardPreview"
            :file-list="fileList"
            :on-remove="function(params){return appear3(params,'background_picture')}"
            :on-error="function(params){return appear3(params,'background_picture')}"
            :before-upload="function(params){return dispear3(params,'background_picture')}"
            :limit="1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="Logo1">
        <div class="logo_picture">
          <el-upload
            action
            list-type="picture-card"
            :http-request="function(params){return uploadFile(params,'logo_picture','logo_picture_id')}"
            :on-preview="handlePictureCardPreview"
            :file-list="fileList2"
            :on-remove="function(params){return appear3(params,'logo_picture')}"
            :on-error="function(params){return appear3(params,'logo_picture')}"
            :before-upload="function(params){return dispear3(params,'logo_picture')}"
            :limit="1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="Logo2">
        <div class="logo2_picture">
          <el-upload
            action
            list-type="picture-card"
            :http-request="function(params){return uploadFile(params,'logo2_picture','logo2_picture_id')}"
            :on-preview="handlePictureCardPreview"
            :on-remove="function(params){return appear3(params,'logo2_picture')}"
            :on-error="function(params){return appear3(params,'logo2_picture')}"
            :before-upload="function(params){return dispear3(params,'logo2_picture')}"
            :file-list="fileList3"
            :limit="1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="Advertising">
        <div class="advertisement_picture">
          <el-upload
            action
            list-type="picture-card"
            :http-request="function(params){return uploadFile(params,'advertisement_picture','advertisement_picture_id')}"
            :on-preview="handlePictureCardPreview"
            :file-list="fileList4"
            :on-remove="function(params){return appear3(params,'advertisement_picture')}"
            :on-error="function(params){return appear3(params,'advertisement_picture')}"
            :before-upload="function(params){return dispear3(params,'advertisement_picture')}"
            :limit="1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="Slogan:">
        <el-input
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 10}"
          placeholder="请输入内容"
          v-model="ruleForm.advertisement_language">
        </el-input>
      </el-form-item>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
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
    props:["tochind","submitfordata"],
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
        dialogVisible:false,
        dialogImageUrl:'',
        fileList: [],
        fileList2: [],
        fileList3: [],
        fileList4: [],
        background_picture:'',
        logo_picture:'',
        logo2_picture:'',
        advertisement_picture:'',
        ruleForm:{
          // machine_id:'',
          background_picture_id:'',
          logo_picture_id:'',
          logo2_picture_id:'',
          advertisement_picture_id:'',
          advertisement_language:'',
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
    // MachineInfo: {
    //   handler(newValue, oldValue) {
    //     console.log(newValue)
    //   },
    //   deep: true
    // },
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
        // console.log(this.tochind)
        for(let i in this.ruleForm){
          if(this.tochind.hasOwnProperty(i)){
            this.ruleForm[i]=this.tochind[i]
          }

        }
          if(this.tochind.background_picture!=null){
            this.choose(".background_picture .el-upload--picture-card");
            this.fileList.push({name: 'background_picture', url:this.$baseurl+this.tochind.background_picture})
          }
          if(this.tochind.logo_picture!=null){
            this.choose(".logo_picture .el-upload--picture-card");
            this.fileList2.push({name: 'logo_picture', url:this.$baseurl+this.tochind.logo_picture})
          }
          if(this.tochind.logo2_picture!=null){
            this.choose(".logo2_picture .el-upload--picture-card");
            this.fileList3.push({name: 'logo2_picture', url:this.$baseurl+this.tochind.logo2_picture})
          }
          if(this.tochind.advertisement_picture!=null){
            this.choose(".advertisement_picture .el-upload--picture-card");
            this.fileList4.push({name: 'advertisement_picture', url:this.$baseurl+this.tochind.advertisement_picture})
          }

      }
    //   for(var i in this.ruleForm){
    //     if(this.MachineInfo.hasOwnProperty(i))
    //       this.ruleForm[i]=this.MachineInfo[i]
    //   }

    //
    },
    methods:{
      submitForm(){
        // this.ruleForm.token=this.$store.state.token;
        // this.$emit('getchildren',this.ruleForm);
        // console.log(this.ruleForm)
    if(this.$route.query.type==2){
      this.$global.post_encapsulation(`${this.$baseurl}/admin_api/machine.machine_group/editMachineGroup`,this.submitfordata)
        .then(res=>{
          this.msg=res.data.msg;
          this.remindervisible=true;
          if(res.data.ret==0){
            // this.$routerto('group_pattern')
            // this.$emit('getchildren');
          }
        })
    }else{
      this.$global.post_encapsulation(`${this.$baseurl}/admin_api/machine.machine_group/addMachineGroup`,this.tochind)
        .then(res=>{
          this.msg=res.data.msg;
          this.remindervisible=true;
          if(res.data.ret==0){
            console.log(res)
            // this.$routerto('group_pattern')
            // this.$emit('getchildren');
          }
        })
    }

      },
      appear3(params,picname) {
        if(picname=="logo_picture"){
          this.handleRemove(
            ".logo_picture .el-upload--picture-card",
            ".logo_picture .el-upload-list__item"
          );
          this.ruleForm.logo_picture_id='';
        }else if(picname=="background_picture"){
          this.handleRemove(
            ".background_picture .el-upload--picture-card",
            ".background_picture .el-upload-list__item"
          );
          this.ruleForm.background_picture_id='';
        }else if(picname=="logo2_picture"){
          this.handleRemove(
            ".logo2_picture .el-upload--picture-card",
            ".logo2_picture .el-upload-list__item"
          );
          this.ruleForm.logo2_picture_id='';
        }else if(picname=="advertisement_picture"){
          this.handleRemove(
            ".advertisement_picture .el-upload--picture-card",
            ".advertisement_picture .el-upload-list__item"
          );
          this.ruleForm.advertisement_picture_id='';
        }

      },
      dispear3(file, picname) {
        // console.log(file,picname)
        if(picname=="logo_picture"){
          this.choose(
            ".logo_picture .el-upload--picture-card",
            ".logo_picture .el-upload-list__item"
          );

        }else if(picname=="background_picture"){
          this.choose(
            ".background_picture .el-upload--picture-card",
            ".background_picture .el-upload-list__item"
          );
        }else if(picname=="logo2_picture"){
          this.choose(
            ".logo2_picture .el-upload--picture-card",
            ".logo2_picture .el-upload-list__item"
          );
        }else if(picname=="advertisement_picture"){
          this.choose(
            ".advertisement_picture .el-upload--picture-card",
            ".advertisement_picture .el-upload-list__item"
          );
        }
      },
      handleRemove(a, b) {
        document.querySelector(a).style =
          "position:absolute;bottom:0;display:block;";
        document.querySelector(b).style = "display:none";
      },
      choose(a) {
        var b = document.querySelector(a);
        b.style = "display:none;";
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      uploadFile(params,picname,picid) {
        // console.log(params,index);
        const _file = params.file;
        console.log(params)
        // const isLt2M = _file.size / 1024 / 1024 < 2;
        this.formData = new FormData();
        this.formData.append("file", _file);
        this.formData.append('picture_input', 'file');
        this.formData.append('attach_dir', 'machine');
        // console.log(this.formData);
        this.$axios({
          method: "post",
          url: `${this.$baseurl}/home/common.picture/upload.html`,
          data: this.formData,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
          .then(res => {
            if(res.data.ret==0) {
              console.log(res.data)
              this.ruleForm[picid] = res.data.data.picture_id;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
</script>

<style lang='scss'>
  .add_fourth{
    .el-select{
      width: 100%;
    }
    .el-upload-list__item.is-success .el-upload-list__item-status-label{
      display: none;
    }
    .background_picture, .logo_picture, .logo2_picture, .advertisement_picture{
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
        margin: 0;
        transform: none;
        bottom: 0;
        width: 100%;
        height: 200px;
        position: absolute;
      }
    }
  }


</style>
