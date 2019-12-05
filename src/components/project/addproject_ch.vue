<template>
  <div id="addproject_ch">
    <header>我的项目资料</header>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      prop="projectCompany"
      label-width="80px"
      :label-position="labelposition"
    >
      <el-form-item label="公司名称" class="companyname" prop="projectCompany">
        <el-select
          value-key="userCompany"
          v-model="form.projectCompany"
          filterable
          remote
          @change="selectOne"
          placeholder="请输入关键词"
          :remote-method="remoteMethod"
          :loading="loading"
          @focus="remoteMethod"
        >
          <el-option
            v-for="(item) in restaurants"
            :key="item.userId"
            :label="item.userCompanyCh"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地区" class="region" prop="region">
        <el-select
          @change="selectregion(regionlist[form.region])"
          v-model="form.region"
          placeholder="请选择"
          filterable
        >
          <el-option
            v-for="item in regionlist"
            :key="item.countryEnname"
            :label="item.countryZhname"
            :value="item.countryCode"
          >
            <span style="float: left; ">{{ item.countryZhname }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.countryCode }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="行业" class="industry" prop="projectIndustry">
        <el-select
          v-model="form.projectIndustry"
          filterable
          @change="selectindustry(industrylist[form.projectIndustry-1])"
          placeholder="请选择"
        >
          <el-option
            v-for="item in industrylist"
            :key="item.industryId"
            :label="item.industryNameCh"
            :value="item.industryId"
          >
            <span style="float: left; ">{{item.industryNameCh }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.industryNameEn}}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目名称" prop="projectName">
        <el-input v-model="form.projectName"></el-input>
      </el-form-item>
      <el-form-item label="是否是上市公司" prop="publicCompany">
        <el-select v-model="form.publicCompany" placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="集资额" prop="collectMoney">
        <el-input v-model.number="form.collectMoney" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="融资阶段" prop="financingStage">
        <el-select v-model="form.financingStage" placeholder="请选择">
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
      <el-form-item label="联络电话" prop="projectMobile">
        <el-input v-model="form.projectMobile"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="projectEmail">
        <el-input v-model="form.projectEmail"></el-input>
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
      <el-form-item label="项目简介" prop="projectDescribe">
        <el-input
          type="textarea"
          maxlength="300"
          show-word-limit
          v-model="form.projectDescribe"
          :autosize="{ minRows: 6, maxRows: 10}"
        ></el-input>
      </el-form-item>
      <el-form-item label="项目详情" prop="projectDetail">
        <el-input
          type="textarea"
          v-model="form.projectDetail"
          :autosize="{ minRows: 10, maxRows: 10}"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="项目图片">
        <div class="project_pic">
          <el-upload
            action
            list-type="picture-card"
            :http-request="function(params){return uploadFile(params)}"
            :on-preview="handlePictureCardPreview"
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
      </el-form-item>-->
      <el-form-item class="addproject_ch_bottom">
        <el-button type="primary" @click="back">返回</el-button>
        <el-button type="primary" class="next" @click="submitForm('form')">下一步</el-button>
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
      form: {
        projectCompanyEn: "",
        projectCompany: "",
        region: "",
        financingStage: "",
        projectName: "",
        projectDescribe: "",
        publicCompany: null,
        collectMoney: null,
        projectMobile: "",
        projectEmail: "",
        projectDetail: "",
        projectLan: "zh_CN",
        projectUserId: "",
        industryId: "",
        projectIndustry: "",
        projectIndustryEn: "",
        bslAreaCode: "",
        projectArea: "",
        projectAreaEn: ""
      },
      //是否上市公司
      options2: [
        {
          value: 0,
          label: "否"
        },
        {
          value: 1,
          label: "是"
        }
      ],
      rules: {
        projectCompany: [
          { required: true, message: "请输入", trigger: "change" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [{ required: true, message: "请选择", trigger: "change" }],
        projectIndustry: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        collectMoney: [
          { required: true, message: "金额不能为空" },
          { type: "number", message: "金额必须为数字值" }
        ],
        projectDescribe: [
          { required: true, message: "请输入", trigger: "blur" },
          {
            min: 1,
            max: 300,
            message: "长度在 1 到 300个字符",
            trigger: "blur"
          }
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
        publicCompany: [
          { required: true, message: "请选择", trigger: "change" }
          // { min: 1, max: 300, message: "长度在 1 到 5 个字符", trigger: "blur" }
        ],
        projectDetail: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 1, trigger: "blur" }
        ],
        financingStage: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        projectMobile: [
          { required: true, message: "请输入  ", trigger: "blur" }
        ],
        projectEmail: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      },
      //融资阶段
      options3: [
        {
          value: 0,
          label: "种子轮"
        },
        {
          value: 1,
          label: "天使轮"
        },
        {
          value: 2,
          label: "A轮"
        },
        {
          value: 3,
          label: "B轮"
        },
        {
          value: 4,
          label: "C轮"
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
  watch: {
    // "form.collectMoney": {
    //   handler(newName, oldName) {
    //     // ...
    //     var pattern = /(?=((?!\b)\d{3})+$)/g;
    //     pattern = parseInt(newName);
    //     // return newName.replace(pattern, ",");
    //     //  return newName
    //     console.log(pattern);
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },
  created() {
    let axiosList = [
      this.$axios.get(`${this.$baseurl}/bsl_admin_web/base/countryList`),
      this.$axios.get(`${this.$baseurl}/bsl_admin_web/industry/getAllIndustry`)
    ];
    this.$axios.all(axiosList).then(
      this.$axios.spread((res1, res2) => {
        if (res1) {
          for (let i = 0; i < res1.data.data.length; i++) {
            this.regionlist[res1.data.data[i].countryCode] = res1.data.data[i];
          }
        }
        if (res2) {
          this.industrylist = res2.data.data;
        }
      })
    );
  },
  computed: {},
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.commit();
        } else {
          this.$confirm("请检查提交信息", "提示", {
            confirmButtonText: "确定",
            // cancelButtonText: "取消",
            type: "warning",
            center: true,
            showCancelButton: false
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    open() {
      this.$confirm("请填写完整信息", "提示", {
        confirmButtonText: "确定",
        // cancelButtonText: "取消",
        type: "warning",
        center: true,
        showCancelButton: false
      });
      // .then(() => {
      //   this.$message({
      //     type: "success",
      //     message: "删除成功!"
      //   });
      // })
      // .catch(() => {
      //   this.$message({
      //     type: "info",
      //     message: "已取消删除"
      //   });
      // });
    },
    back() {
      this.$router.go(-1);
    },
    selectOne(item) {
      // this.restaurants[item]
      this.form.projectUserId = item.userId;
      this.form.projectCompany = item.userCompanyCh;
      this.form.projectCompanyEn = item.userCompanyEn;
      console.log(item);

      // console.log(this.form.projectUserId,this.form.projectCompany);
    },
    selectregion(val) {
      console.log(val);
      this.form.bslAreaCode = val.countryCode;
      this.form.projectArea = val.countryZhname;
      this.form.projectAreaEn = val.countryEnname;
    },
    selectindustry(val) {
      console.log(val);
      this.form.industryId = val.industryId;
      this.form.projectIndustry = val.industryNameCh;
      this.form.projectIndustryEn = val.industryNameEn;
      // console.log(val);
    },
    remoteMethod(query) {
      let type = typeof query;
      // if(typeof(query))
      console.log(type);

      if (type == "string") {
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
      } else if (type == "object") {
        this.loading = true;
        this.$axios({
          method: "get",
          url: `${this.$baseurl}/bsl_admin_web/project/getRelationCompany?searchKey=`,
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
      console.dir(cloneObj);

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
          this.$store.dispatch("submit_formdata_action", res.data.data);
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
          type: "warning",
          center: true,
          showCancelButton: false
        }).then(() => {
          this.$router.push({
            name: "addproject_eng"
          });
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
#addproject_ch {
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
    // color: 0;
    // background-color: 0;
    // border-color: 0;
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
.addproject_ch_bottom {
  text-align: center;
  .el-button {
    width: 98px;
  }
}
</style>

<style lang='scss' scoped>
#addproject_ch {
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
