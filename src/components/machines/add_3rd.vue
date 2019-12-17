<template>
  <div class="add_second">
    <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="Operator:" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Tel:" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Email:" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
    </el-form>
    <section>
      <button  @click="submitForm('ruleForm')">NEXT</button>
      <button @click="$routerto('setting')">BACK</button>
    </section>
  </div>
</template>
<script>
  export default {
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
    methods:{
      submitForm(){
        this.$routerto('add_4th');
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
  .add_second{
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
