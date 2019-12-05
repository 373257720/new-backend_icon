<template>
  <div id="addproject_eng">
    <header>My Project Information</header>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      :label-position="labelposition"
    >
      <el-form-item prop="projectCompanyEn" label="Corporate Name" class="companyname">
        <el-select
          disabled
          v-model="form.projectCompanyEn"
          filterable
          remote
          reserve-keyword
          @change="selectOne"
          placeholder="-"
          :remote-method="remoteMethod"
          :loading="loading"
        >
          <el-option
            v-for="item in restaurants"
            :key="item.userId"
            :label="item.userCompany"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Region" class="region">
        <el-select
          @change="selectregion(regionlist[form.region])"
          v-model="form.projectAreaEn"
          disabled
          placeholder="-"
        >
          <el-option
            v-for="item in regionlist"
            :key="item.countryCode"
            :label="item.countryEnname"
            :value="item.countryCode"
          >
            <!-- <span style="float: left; ">{{ item.countryEnname }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.countryCode }}</span>-->
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Industry" class="industry">
        <el-select
          v-model="form.projectIndustryEn"
          disabled
          @change="selectindustry(industrylist[industry-1])"
          placeholder="-"
        >
          <el-option
            v-for="item in industrylist"
            :key="item.industryId"
            :label="item.industryNameEn"
            :value="item.industryId"
          >
            <span style="float: left; ">{{item.industryNameEn }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.industryNameEn}}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="projectName" label="Project Name">
        <el-input v-model="form.projectName"></el-input>
      </el-form-item>
      <el-form-item label="Is it a pubulic company">
        <el-select disabled v-model="form.publicCompany" placeholder="-">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Fund raising amount" :rules="rules">
        <el-input disabled v-model="form.collectMoney"></el-input>
      </el-form-item>
      <el-form-item label="Project status">
        <el-select disabled v-model="form.financingStage" placeholder="-">
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="项目状态">
        <el-input v-model="form.projectMobile"></el-input>
      </el-form-item>-->
      <el-form-item label="Contact number">
        <el-input disabled v-model="form.projectMobile"></el-input>
      </el-form-item>
      <el-form-item label="E-mail">
        <el-input disabled v-model="form.projectEmail"></el-input>
      </el-form-item>
      <!-- <el-form-item label="项目日期">
        <el-col :span="11">
          <el-date-picker
            v-model="form.projectStartTime"
            value-format="timestamp"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
      </el-form-item>-->
      <el-form-item prop="projectDescribe" label="Project Profile">
        <el-input
          type="textarea"
          maxlength="1500"
          show-word-limit
          v-model="form.projectDescribe"
          :autosize="{ minRows: 6, maxRows: 10}"
        ></el-input>
      </el-form-item>
      <el-form-item prop="projectDetail" label="Project details">
        <el-input
          type="textarea"
          v-model="form.projectDetail"
          :autosize="{ minRows: 10, maxRows: 10}"
        ></el-input>
      </el-form-item>
      <el-form-item class="addproject_eng_bottom">
        <el-button type="primary" @click="goback">BACK</el-button>
        <el-button type="primary" @click="submitForm('form')">SUBMIT</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import qs from "qs";
import { log } from "util";
export default {
  data() {
    return {
      labelposition: "top",
      loading: false,
      restaurants: [],
      regionlist: {},
      industrylist: [],
      rules: {
        projectCompany: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        projectName: [
          { required: true, message: "请输入", trigger: "blur" },
          {
            min: 1,
            max: 300,
            message: "长度在 1 到 300 个字符",
            trigger: "blur"
          }
        ],
        projectDescribe: [
          { required: true, message: "请输入", trigger: "blur" }
          // {
          //   min: 1,
          //   max: 1500,
          //   message: "长度在 1 到 1500个字符",
          //   trigger: "blur"
          // }
        ],
        projectDetail: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 1, trigger: "blur" }
        ]
      },
      form: {
        projectCompanyEn: "",
        financingStage: "",
        projectName: "",
        projectDescribe: "",
        publicCompany: null,

        collectMoney: null,
        projectMobile: "",
        projectEmail: "",
        projectDetail: "",
        projectLan: "zh_ENG",
        projectUserId: "",
        industryId: "",
        projectIndustryEn: "",
        bslAreaCode: "",
        projectAreaEn: ""
      },
      // timeout: null,
      // formData: "",
      // dialogImageUrl: "",
      // dialogVisible: false,
      //是否上市公司
      options2: [
        {
          value: 0,
          label: "NO"
        },
        {
          value: 1,
          label: "Yes"
        }
      ],
      //融资阶段
      options3: [
        {
          value: 0,
          label: "SEED ROUND"
        },
        {
          value: 1,
          label: "ANGLE ROUND"
        },
        {
          value: 2,
          label: "A ROUND"
        },
        {
          value: 3,
          label: "B ROUND"
        },
        {
          value: 4,
          label: "C ROUND"
        },
        {
          value: 5,
          label: "PER-IPO"
        },
        {
          value: 6,
          label: "IPO"
        }
      ]
    };
  },
  created() {
    console.log(this.$store.state.formobj);
    for (let i in this.$store.state.formobj) {
      for (let j in this.form) {
        if (j == i) {
          if (
            j != "projectName" &&
            j != "projectDescribe" &&
            j != "projectDetail"
          ) {
            this.form[j] = this.$store.state.formobj[i];
          }
        }
      }
    }
    console.log(this.form);
  },
  mounted() {},
  computed: {
    blank_panduan: function() {
      for (var i in this.form) {
        if (this.form[i] == "undefined") {
          return false;
        } else {
          return true;
        }
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.commit();
        } else {
          this.$confirm("PLEASE CHECK OUT YOUR INFORMATION", "REMINDER", {
            confirmButtonText: "YES",
            // cancelButtonText: "取消",
            type: "warning",
            center: true,
            showCancelButton: false
          });
          return false;
        }
      });
    },
    goback() {
      this.$router.go(-1);
    },
    // open() {
    //   this.$confirm("请填写完整信息", "REMINDER", {
    //     confirmButtonText: "确定",
    //     // cancelButtonText: "取消",
    //     type: "warning",
    //     center: true,
    //     showCancelButton: false
    //   });
    // },
    selectOne(item) {
      this.form.projectUserId = item.userId;
      this.form.projectCompany = item.userCompany;
      console.log(item);
    },
    selectregion(val) {
      // console.log(val);
      this.form.bslAreaCode = val.countryCode;
      this.form.projectArea = val.countryEnname;
    },
    selectindustry(val) {
      this.form.industryId = val.industryId;
      this.form.projectIndustry = val.industryNameEn;
      console.log(val);
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        this.$axios({
          method: "get",
          url: `${this.$baseurl}/bsl_admin_web/project/getRelationCompany?searchKey=${query}`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
          .then(res => {
            console.log(res);

            this.loading = false;
            this.restaurants = res.data.data;
            if (this.restaurants.length <= 0) {
              this.form.projectCompany = "";
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.options = [];
      }
    },
    deepClone(source) {
      const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
      for (let keys in source) {
        // 遍历目标
        if (source.hasOwnProperty(keys)) {
          if (source[keys] && typeof source[keys] === "object") {
            // 如果值是对象，就递归一下
            targetObj[keys] = source[keys].constructor === Array ? [] : {};
            targetObj[keys] = deepClone(source[keys]);
          } else {
            // 如果不是，就直接赋值
            targetObj[keys] = source[keys];
          }
        }
      }
      return targetObj;
    },
    commit() {
      // console.log(this.form);
      let cloneObj = this.deepClone(this.form);
      cloneObj.projectDescribe = cloneObj.projectDescribe
        .replace(/\r\n/g, "<br/>")
        .replace(/\n/g, "<br/>")
        .replace(/\s/g, "&nbsp;");
      cloneObj.projectDetail = cloneObj.projectDetail
        .replace(/\r\n/g, "<br/>")
        .replace(/\n/g, "<br/>")
        .replace(/\s/g, "&nbsp;");
      // console.log(cloneObj);
      cloneObj = {
        projectName: cloneObj.projectName,
        projectDescribe: cloneObj.projectDescribe,
        projectDetail: cloneObj.projectDetail,
        projectLan: "en_US",
        projectId: this.$store.state.formobj.projectId
      };
      console.log(cloneObj);

      // formtable.projectStartTime = this.form.projectStartTime / 1000;
      this.$axios({
        method: "post",
        url: `${this.$baseurl}/bsl_admin_web/project/saveProject`,
        data: qs.stringify(cloneObj),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        console.log(res);
        if (res.data.resultCode == 10000) {
          this.$store.dispatch("submit_formdata_action", {});
          this.warning(res.data.resultCode, res.data.resultDesc);
        } else {
          this.warning(res.data.resultCode, res.data.resultDesc);
        }
      });
    },
    warning(resultCode, reminder) {
      if (resultCode == 10000) {
        this.$confirm(reminder, "提示", {
          confirmButtonText: "确定",
          // cancelButtonText: "取消",
          type: "warning",
          center: true,
          showCancelButton: false
        }).then(() => {
          this.$router.push({ name: "tosignup" });
        });
      } else {
        this.$confirm(reminder, "提示", {
          confirmButtonText: "确定",
          // cancelButtonText: "取消",
          type: "warning",
          center: true,
          showCancelButton: false
        });
      }
    },
    choose(a) {
      var b = document.querySelector(a);
      b.style = "display:none;";
    },
    handleRemove(a, b) {
      document.querySelector(a).style =
        "position:absolute;bottom:0;display:block;";
      document.querySelector(b).style = "display:none";
    },
    appear3() {
      this.handleRemove(
        ".project_pic .el-upload--picture-card",
        ".project_pic .el-upload-list__item"
      );
    },
    dispear3(file, fileList) {
      this.choose(".project_pic .el-upload--picture-card");
    }
    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url;
    //   this.dialogVisible = true;
    // },
    // uploadFile(params) {
    //   // console.log(params,index);formData
    //   const _file = params.file;
    //   // const isLt2M = _file.size / 1024 / 1024 < 2;
    //   this.formData = new FormData();
    //   this.formData.append("file", _file);
    //   this.$axios({
    //     method: "post",
    //     url: `${this.$baseurl}/bsl_admin_web/upload/pic`,
    //     data: this.formData
    //     // headers: {
    //     //   "Content-Type": "multipart/form-data"
    //     // }
    //   })
    //     .then(res => {
    //       this.form.pic = [];
    //       this.form.pic.push(res.data.data.urlBase + res.data.data.url);
    //       this.form.pic.push(res.data.data.urlBase + res.data.data.url);
    //       // this.form.pic = res.data.data.url;
    //       // this.form.pic=JSON.stringify(arr)
    //       console.log(this.form.pic);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
  }
};
</script>

<style lang='scss'>
#addproject_eng {
  // .el-select-dropdown__item.selected{
  //   font-weight: 500;
  // }
  .el-select {
    width: 100%;
  }
  // .el-select-dropdown__item.selected{
  //   color: black;
  // }
  .el-button--primary {
    width: 200px;
  }
  .companyname {
    .my-autocomplete {
      li {
        line-height: normal;
        padding: 7px;

        .name {
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .addr {
          font-size: 12px;
          color: #b4b4b4;
        }

        .highlighted .addr {
          color: #ddd;
        }
      }
    }
  }
}
// .project_pic {
//   position: relative;
//   height: 200px;
//   .el-upload--picture-card {
//     bottom: 0;
//     width: 100%;
//     height: 200px;
//     border: 1px solid #c0ccda;
//     background: white;
//     position: absolute;
//   }
//   .el-icon-plus {
//     line-height: 200px;
//   }
//   .el-upload-list__item {
//     bottom: 0;
//     width: 600px;
//     height: 200px;
//     position: absolute;
//   }
// }
.addproject_eng_bottom {
  text-align: center;
  .el-button {
    width: 98px;
  }
}
</style>

<style lang='scss' scoped>
#addproject_eng {
  width: 600px;
  margin: 0 auto;
  header {
    text-align: center;
    font-size: 26px;
  }
  > div {
    margin-bottom: 15px;
    > p {
      margin-bottom: 10px;
    }
  }
  .commit {
    text-align: center;
    button {
      width: 200px;
      height: 50px;
      // background: #58bc58;
    }
  }
}
</style>
