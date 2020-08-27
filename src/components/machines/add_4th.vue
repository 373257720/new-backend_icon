<template>
  <div class="add_fourth">
    <el-form
      :model="ruleForm"
      label-position="top"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item :label="$t('machines.BackgroundPic')">
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
      <el-form-item :label="$t('machines.Logo1')">
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
      <el-form-item :label="$t('machines.Logo2')">
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
      <el-form-item :label="$t('machines.Advertising')">
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
      <el-form-item :label="$t('machines.Slogan')">
        <el-input
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 10}"
          placeholder
          v-model="ruleForm.advertisement_language"
        ></el-input>
      </el-form-item>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </el-form>
    <section>
      <button @click="goback">{{$t('common.BACK')}}</button>
      <button @click="submitForm('ruleForm')">{{$t('common.SUBMIT')}}</button>
    </section>
    <dialogReminder :msg="msg" :successto="successto" :remindervisible.sync="remindervisible"></dialogReminder>
  </div>
</template>
<script>
export default {
  props: ["tochind", "submitfordata"],
  data() {
    return {
      msg: "",
      successto: "",
      remindervisible: false,
      dialogVisible: false,
      dialogImageUrl: "",
      fileList: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
      background_picture: "",
      logo_picture: "",
      logo2_picture: "",
      advertisement_picture: "",
      ruleForm: {
        // machine_id:'',
        background_picture_id: "",
        logo_picture_id: "",
        logo2_picture_id: "",
        advertisement_picture_id: "",
        advertisement_language: ""
      },
      rules: {}
    };
  },
  // MachineInfo: {
  //   handler(newValue, oldValue) {
  //     console.log(newValue)
  //   },
  //   deep: true
  // },
  watch: {
    ruleForm: {
      handler(newValue, oldValue) {
        // console.log(newValue)
        this.$emit("getchildren", this.ruleForm);
      },
      deep: true
    }
  },
  mounted() {
    if (this.$route.query.type == 2) {
      // console.log(this.tochind)
      for (let i in this.ruleForm) {
        if (this.tochind.hasOwnProperty(i)) {
          this.ruleForm[i] = this.tochind[i];
        }
      }
      if (this.tochind.background_picture != null) {
        this.choose(".background_picture .el-upload--picture-card");
        this.fileList.push({
          name: "background_picture",
          url: this.$axios.defaults.baseURL + this.tochind.background_picture
        });
      }
      if (this.tochind.logo_picture != null) {
        this.choose(".logo_picture .el-upload--picture-card");
        this.fileList2.push({
          name: "logo_picture",
          url: this.$axios.defaults.baseURL + this.tochind.logo_picture
        });
      }
      if (this.tochind.logo2_picture != null) {
        this.choose(".logo2_picture .el-upload--picture-card");
        this.fileList3.push({
          name: "logo2_picture",
          url: this.$axios.defaults.baseURL + this.tochind.logo2_picture
        });
      }
      if (this.tochind.advertisement_picture != null) {
        this.choose(".advertisement_picture .el-upload--picture-card");
        this.fileList4.push({
          name: "advertisement_picture",
          url: this.$axios.defaults.baseURL + this.tochind.advertisement_picture
        });
      }
    }
    //   for(var i in this.ruleForm){
    //     if(this.MachineInfo.hasOwnProperty(i))
    //       this.ruleForm[i]=this.MachineInfo[i]
    //   }

    //
  },
  methods: {
    goback() {
      this.$emit("back", "third");
    },
    submitForm() {
      if (this.$route.query.type == 2) {
        this.$global
          .post_encapsulation(
            `${this.$axios.defaults.baseURL}/admin_api/machine.machine_group/editMachineGroup`,
            this.submitfordata
          )
          .then(res => {
            this.msg = res.data.msg;
            this.remindervisible = true;
            if (res.data.ret == 0) {
              this.successto = "group_pattern";
            }
          });
      } else {
        this.$global
          .post_encapsulation(
            `${this.$axios.defaults.baseURL}/admin_api/machine.machine_group/addMachineGroup`,
            this.tochind
          )
          .then(res => {
            this.msg = res.data.msg;
            this.remindervisible = true;
            if (res.data.ret == 0) {
              this.successto = "group_pattern";
            }
          });
      }
    },
    appear3(params, picname) {
      this.handleRemove(
        `.${picname} .el-upload--picture-card`,
        `.${picname} .el-upload-list__item`
      );
      this.ruleForm[`${picname}_id`] = "";
      // if (picname == "logo_picture") {
      //   this.handleRemove(
      //     ".logo_picture .el-upload--picture-card",
      //     ".logo_picture .el-upload-list__item"
      //   );
      //   this.ruleForm.logo_picture_id = "";
      // } else if (picname == "background_picture") {
      //   this.handleRemove(
      //     ".background_picture .el-upload--picture-card",
      //     ".background_picture .el-upload-list__item"
      //   );
      //   this.ruleForm.background_picture_id = "";
      // } else if (picname == "logo2_picture") {
      //   this.handleRemove(
      //     ".logo2_picture .el-upload--picture-card",
      //     ".logo2_picture .el-upload-list__item"
      //   );
      //   this.ruleForm.logo2_picture_id = "";
      // } else if (picname == "advertisement_picture") {
      //   this.handleRemove(
      //     ".advertisement_picture .el-upload--picture-card",
      //     ".advertisement_picture .el-upload-list__item"
      //   );
      //   this.ruleForm.advertisement_picture_id = "";
      // }
    },
    dispear3(file, picname) {
      let width;
      let height;
      const isSize = new Promise(function(resolve, reject) {
        if (!/.(jpg|jpeg|png)$/.test(file.type)) {
          return reject("type_error");
        }
        if (picname == "logo_picture") {
          width = 192;
          height = 78;
        } else if (picname == "background_picture") {
          width = 1440;
          height = 900;
        } else if (picname == "logo2_picture") {
          width = 256;
          height = 256;
        } else if (picname == "advertisement_picture") {
          width = 256;
          height = 256;
        }
        let _URL = window.URL || window.webkitURL;
        let img = new Image();
        img.onload = function() {
          let valid = img.width >= width && img.height >= height;
          valid ? resolve() : reject();
        };
        img.src = _URL.createObjectURL(file);
      })
        .then(() => {
          this.choose(
            `.${picname} .el-upload--picture-card`,
            `.${picname} .el-upload-list__item`
          );
          return file;
        })
        .catch(err => {
          if (err === "type_error") {
            this.$message.error(this.$t("machines.JPEGJPGPNG"));
          } else {
            this.$message.error(
              this.$t("machines.uploadedpictur") + width + "*" + height
            );
          }
          return Promise.reject();
        });
      return isSize;
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
    uploadFile(params, picname, picid) {
      // console.log(params,index);
      const _file = params.file;
      console.log(params);
      // const isLt2M = _file.size / 1024 / 1024 < 2;
      this.formData = new FormData();
      this.formData.append("file", _file);
      this.formData.append("picture_input", "file");
      this.formData.append("attach_dir", "machine");
      // console.log(this.formData);
      this.$axios({
        method: "post",
        url: `${this.$axios.defaults.baseURL}/home/common.picture/upload.html`,
        data: this.formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(res => {
          if (res.data.ret == 0) {
            console.log(res.data);
            this.ruleForm[picid] = res.data.data.picture_id;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang='scss'>
.add_fourth {
  .el-select {
    width: 100%;
  }
  .el-upload-list__item.is-success .el-upload-list__item-status-label {
    display: none;
  }
  .background_picture,
  .logo_picture,
  .logo2_picture,
  .advertisement_picture {
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
