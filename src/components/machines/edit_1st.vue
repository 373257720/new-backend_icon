<template>
  <div class="edit_first">
    <el-form
      :model="ruleForm"
      label-position="top"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="Machine:" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Serial Number:" prop="name">
        <el-input v-model="ruleForm.serial_number" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="Warning E-mail Adress:" prop="alert_email">
        <el-input v-model="ruleForm.alert_email"></el-input>
      </el-form-item>
      <el-form-item label="Emergent Contact Number:" prop="name">
        <el-input v-model="ruleForm.alert_mobile"></el-input>
      </el-form-item>
      <el-form-item label="Group:" prop="region">
        <el-select :popper-append-to-body="false" v-model="ruleForm.machine_group_id" placeholder>
          <el-option
            v-for="item in groupList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Location:" prop="region">
        <el-select :popper-append-to-body="false" v-model="ruleForm.country_id" placeholder>
          <el-option
            v-for="item in CountryList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Address:" prop="name">
        <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item label="Machine photo:">
        <div class="machine_picture">
          <el-upload
            action
            list-type="picture-card"
            :http-request="function(params){return uploadFile(params,'machine_picture','machine_picture_id')}"
            :on-preview="handlePictureCardPreview"
            :file-list="fileList"
            :on-remove="function(params){return appear3(params,'machine_picture')}"
            :on-error="function(params){return appear3(params,'machine_picture')}"
            :before-upload="function(params){return dispear3(params,'machine_picture')}"
            :limit="1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>
      </el-form-item>
      <!-- <el-form-item label="Email photo:">
        <div class="email_picture">
          <el-upload
            action
            list-type="picture-card"
            :http-request="function(params){return uploadFile(params,'email_picture','email_picture_id')}"
            :on-preview="handlePictureCardPreview"
            :file-list="Email_photo"
            :on-remove="function(params){return appear3(params,'email_picture')}"
            :on-error="function(params){return appear3(params,'email_picture')}"
            :before-upload="function(params){return dispear3(params,'email_picture')}"
            :limit="1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>
      </el-form-item> -->
    </el-form>
    <section>
      <button @click="goback">BACK</button>
      <button @click="submitForm('ruleForm')">SUBMIT</button>
    </section>
    <dialog_reminder :msg="msg" :remindervisible.sync="remindervisible"></dialog_reminder>
  </div>
</template>
<script>
export default {
  props: ["MachineInfo"],
  data() {
    return {
      msg: "",
      remindervisible: false,
      CountryList: [],
      groupList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
      Email_photo: [],
      machine_picture: "",
      email_picture: "",
      ruleForm: {
        name: "",
        machine_id: "",
        serial_number: "",
        alert_email: "",
        alert_mobile: "",
        machine_group_id: null,
        country_id: "",
        address: "",
        machine_picture_id: null,
        // email_picture_id: null
      },
      rules: {
        username: [{ required: true, message: "不能为空", trigg: "change" }],
        nickname: [{ required: true, message: "不能为空", trigger: "blur" }],
        alert_email: [
          { message: "Please input email address", trigger: "blur" },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"]
          }
        ],
        mobile: [{ required: true, message: "不能为空", trigger: "blur" }],
        status: [{ required: true }]
      }
    };
  },
  watch: {},

  created() {
    let axiosList = [
      this.$axios.get(
        `${this.$axios.defaults.baseURL}/admin_api/content.country/getCountryList`,
        {
          params: { token: this.$store.state.token, lang: "en-us" }
        }
      ),
      this.$axios.get(
        `${this.$axios.defaults.baseURL}/admin_api/machine.machine_group/getMachineGroupList`,
        {
          params: {
            token: this.$store.state.token,
            page: 1,
            size: 10000,
            keyword: ""
          }
        }
      )
    ];
    this.$axios.all(axiosList).then(
      this.$axios.spread((res1, res2) => {
        if (res1) {
          // console.log(res1)
          this.CountryList.push({ value: 0, label: "-" });
          for (let i = 0; i < res1.data.data.data.length; i++) {
            this.CountryList.push({
              value: res1.data.data.data[i].country_id * 1,
              label: res1.data.data.data[i].name
            });
          }
          // if(this.CountryList.indexOf(this.ruleForm.country_id)<0){
          //   this.ruleForm.country_id=0;
          // }
          console.log(this.CountryList);
        }
        if (res2) {
          this.groupList.push({ value: 0, label: "-" });
          for (let i = 0; i < res2.data.data.data.length; i++) {
            this.groupList.push({
              value: res2.data.data.data[i].machine_group_id * 1,
              label: res2.data.data.data[i].name
            });
          }
        }
      })
    );
  },
  mounted() {
    this.$nextTick(function() {
      // console.log(this.MachineInfo)
      for (var i in this.ruleForm) {
        if (this.MachineInfo.hasOwnProperty(i)) {
          this.ruleForm[i] = this.MachineInfo[i];
        }
      }
      // console.log(this.ruleForm);
      if (this.MachineInfo.machine_picture) {
        this.choose(".machine_picture .el-upload--picture-card");
        this.fileList.push({
          name: "machine_picture.jpeg",
          url: this.$axios.defaults.baseURL + this.MachineInfo.machine_picture
        });
      }
      if (this.MachineInfo.email_picture) {
        this.choose(".email_picture .el-upload--picture-card");
        this.Email_photo.push({
          name: "Email_photo.jpeg",
          url: this.$axios.defaults.baseURL + this.MachineInfo.email_picture
        });
      }
    });
    // console.log(this.MachineInfo)
  },
  methods: {
    goback() {
      this.$router.push({ name: "machines_lists", params: { userId: "123" } });
    },
    submitForm() {
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/admin_api/machine.machine/editMachine`,
          this.ruleForm
        )
        .then(res => {
          if (res.data.ret == 0) {
            this.$emit("update:isupdated", true);
            this.$routerto("edit_2nd", {
              machine_id: this.$route.query.machine_id
            });
          } else {
            this.msg = res.data.msg;
            this.remindervisible = true;
          }
        });
    },
    // appear3() {
    //   this.handleRemove(
    //     ".machine_picture .el-upload--picture-card",
    //     ".machine_picture .el-upload-list__item"
    //   );
    //   this.ruleForm.machine_picture_id = "";
    // },
    handleRemove(a, b) {
      document.querySelector(a).style =
        "position:absolute;bottom:0;display:block;";
      document.querySelector(b).style = "display:none";
    },
    // dispear3(file, fileList) {
    //   this.choose(".machine_picture .el-upload--picture-card");
    // },
    appear3(params, picname) {
      if (picname == "machine_picture") {
        this.handleRemove(
          ".machine_picture .el-upload--picture-card",
          ".machine_picture .el-upload-list__item"
        );
        this.ruleForm.machine_picture_id = "";
      } else if (picname == "email_picture") {
        this.handleRemove(
          ".email_picture .el-upload--picture-card",
          ".email_picture .el-upload-list__item"
        );
        this.ruleForm.email_picture_id = "";
      }
    },
    dispear3(file, picname) {
      if (picname == "machine_picture") {
        this.choose(
          ".machine_picture .el-upload--picture-card",
          ".machine_picture .el-upload-list__item"
        );
        const isSize = new Promise(function(resolve, reject) {
          if (!/.(jpg|jpeg|png)$/.test(file.type)) {
            // alert("图片类型必须是.gif,jpeg,jpg,png中的一种");
            return reject("typeErr");
          }
          resolve();
        }).then(
          () => {
            this.choose(
              ".machine_picture .el-upload--picture-card",
              ".machine_picture .el-upload-list__item"
            );
            return file;
          },
          err => {
            if ((err = "typeErr")) {
              this.$message.error(
                "The image type must be one of  JPEG, JPG, PNG"
              );
            }
            return Promise.reject();
          }
        );
        return isSize;
      } else if (picname == "email_picture") {
        this.choose(
          ".email_picture .el-upload--picture-card",
          "email_picture .el-upload-list__item"
        );
        const isSize = new Promise(function(resolve, reject) {
           if (!/.(jpg|jpeg|png)$/.test(file.type)) {
            // alert("图片类型必须是.gif,jpeg,jpg,png中的一种");
            return reject("typeErr");
          }
          resolve();
        }).then(
          () => {
            this.choose(
              ".email_picture .el-upload--picture-card",
              "email_picture.el-upload-list__item"
            );
            return file;
          },
          (err) => {
            if ((err = "typeErr")) {
              this.$message.error(
               "The image type must be one of  JPEG, JPG, PNG"
              );
            }
            // this.$message.error('The uploaded picture must be equal to or greater than 1440 * 900!');
            return Promise.reject();
          }
        );
        return isSize;
      }
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
      // console.log(params,index);formData
      const _file = params.file;
      console.log(params);
      // const isLt2M = _file.size / 1024 / 1024 < 2;
      let formData = new FormData();
      formData.append("file", _file);
      formData.append("picture_input", "file");
      formData.append("attach_dir", "machine");
      console.log(formData);

      this.$axios({
        method: "post",
        url: `${this.$axios.defaults.baseURL}/home/common.picture/upload.html`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(res => {
          if (res.data.ret === 0) {
            console.log(res.data);

            this.ruleForm[picid] = res.data.data.picture_id;
          }
          // console.log(this.ruleForm[picid] );
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang='scss'>
.edit_first {
  .el-select {
    width: 100%;
  }
  .machine_picture,
  .email_picture {
    position: relative;
    height: 200px;
    .el-upload-list--picture-card .el-upload-list__item {
      margin: 0;
      transform: none;
      bottom: 0;
      width: 100%;
      height: 200px;
      position: absolute;
      /*box-sizing: border-box;*/
    }
    .el-upload-list__item.is-success .el-upload-list__item-status-label {
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
