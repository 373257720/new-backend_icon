<template>
  <div class="add_second">
    <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="Currency:" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Cash Inbox Denomination:" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Cash Outbox Denomination:" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Fast Withdraw Denomination:" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item  label="Cryptocurrency:" prop="name">
          <el-radio-group v-model="radio">
            <el-radio :label="3">Buy</el-radio>
            <el-radio :label="6">Sell</el-radio>
            <el-radio :label="9">Both</el-radio>
          </el-radio-group>
    </el-form-item>
      <el-form-item  label="KYC Registration:" prop="region">
        <el-radio-group v-model="radio">
          <el-radio :label="3">Yes</el-radio>
          <el-radio :label="6">No</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="Cryptocurrency Type" prop="name">
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">BTC</template>
            <el-form-item  label="Local Transaction Regulation:" prop="name">
              <el-radio-group v-model="radio">
                <el-radio :label="3">Buy</el-radio>
                <el-radio :label="6">Sell</el-radio>
                <el-radio :label="9">Both</el-radio>
                <el-radio :label="9">Not allow</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Purchase Limitation (Minimum):" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="Purchase Limitation (Maximum):" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="Commission Rate (%):" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">ETH</template>
            <el-form-item  label="Local Transaction Regulation:" prop="name">
              <el-radio-group v-model="radio">
                <el-radio :label="3">Buy</el-radio>
                <el-radio :label="6">Sell</el-radio>
                <el-radio :label="9">Both</el-radio>
                <el-radio :label="9">Not allow</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Purchase Limitation (Minimum):" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="Purchase Limitation (Maximum):" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="Commission Rate (%):" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
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
        radio: 3,
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
        this.$routerto('add_3rd');
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
