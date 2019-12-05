<template>
  <div id="addproject_eng">
    <header>My Project Information</header>
    <el-form ref="form" :model="form" label-width="80px" :label-position="labelposition">
      <el-form-item label="Corporate Name" class="companyname">
        <el-select
          v-model="form.projectCompany"
          filterable
          remote
          reserve-keyword
          @change="selectOne"
          placeholder="please input"
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
          v-model="form.region"
          placeholder="please choose"
        >
          <el-option
            v-for="item in regionlist"
            :key="item.countryCode"
            :label="item.countryZhname"
            :value="item.countryCode"
          >
            <span style="float: left; ">{{ item.countryZhname }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.countryCode }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Industry" class="industry">
        <el-select
          v-model="industry"
          @change="selectindustry(industrylist[industry-1])"
          placeholder="please choose"
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
      <el-form-item label="Project Name">
        <el-input v-model="form.projectName"></el-input>
      </el-form-item>
        <el-form-item label="Is it a pubulic company">
        <el-select v-model="form.publicCompany" placeholder="please choose">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="Fund raising amount">
        <el-input v-model="form.collectMoney"></el-input>
      </el-form-item>
        <el-form-item label="Project status">
        <el-select v-model="form.financingStage" placeholder="please choose">
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
      </el-form-item> -->
        <el-form-item label="Contact number">
        <el-input v-model="form.projectMobile"></el-input>
      </el-form-item>
           <el-form-item label="E-mail">
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
      </el-form-item> -->
      <el-form-item label="Project Profile">
        <el-input
          type="textarea"
          v-model="form.projectDescribe"
          :autosize="{ minRows: 6, maxRows: 10}"
        ></el-input>
      </el-form-item>
      <el-form-item label="Project details">
        <el-input
          type="textarea"
          v-model="form.projectDetail"
          :autosize="{ minRows: 6, maxRows: 10}"
        ></el-input>
      </el-form-item>
      <el-form-item class="addproject_eng_bottom">
        <el-button type="primary" @click="commit">返回</el-button>
        <el-button type="primary" @click="commit">下一步</el-button>
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
      industry:'',
      form: {
        projectCompany: "",
        region: "",
        financingStage:'',
        // regionname: "",
        // industry: null,
        projectName: "",
        // projectStartTime: "",
        projectDescribe: "",
        publicCompany: null,
        collectMoney: "",
        projectMobile: "",
        projectEmail: "",
        projectDetail: "",
        projectLan: "zh_CN",
        // projectId: "",
        // pic: [],
        projectUserId: "",
        industryId: "",
        projectIndustry: "",
        bslAreaCode: "",
        projectArea: ""
      },
      // timeout: null,
      // formData: "",    
      // dialogImageUrl: "",
      // dialogVisible: false,
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
        },  {
          value: 5,
          label: "PER-IPO"
        },
         {
          value: 6,
          label: "IPO"
        }
      ],
    };
  },
  created() {
    this.$axios({
      method: "get",
      url: `${this.$baseurl}/bsl_admin_web/base/countryList`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(res => {
        // this.regionlist = res.data.data;
        // console.log(res.data.data);
        for (let i = 0; i < res.data.data.length; i++) {
          this.regionlist[res.data.data[i].countryCode] = res.data.data[i];
        }
      })
      .catch(err => {
        console.log(err);
      });

    this.$axios({
      method: "get",
      url: `${this.$baseurl}/bsl_admin_web/industry/getAllIndustry`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(res => {
        this.industrylist = res.data.data;
        console.log(this.industrylist);
        
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {},
  methods: {
    selectOne(item) {
      this.form.projectUserId = item.userId;
      this.form.projectCompany=item.userCompany;
      console.log(item);
    },
    selectregion(val) {
      // console.log(val);
      this.form.bslAreaCode = val.countryCode;
      this.form.projectArea = val.countryZhname;
    },
    selectindustry(val) {
      this.form.industryId = val.industryId;
      this.form.projectIndustry = val.industryNameCh;
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
            if(this.restaurants.length<=0){
                    this.form.projectCompany='';
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.options = [];
      }
    },
    commit() {
      console.log(this.form);
     this.form.projectDescribe = this.form.projectDescribe
        .replace(/\r\n/g, "<br/>")
        .replace(/\n/g, "<br/>")
        .replace(/\s/g, "&nbsp;");
      this.form.projectDetail = this.form.projectDetail
        .replace(/\r\n/g, "<br/>")
        .replace(/\n/g, "<br/>")
        .replace(/\s/g, "&nbsp;");
      // formtable.projectStartTime = this.form.projectStartTime / 1000;
      this.$axios({
        method: "post",
        url: `${this.$baseurl}/bsl_admin_web/project/saveProject`,
        data: qs.stringify(this.form),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        console.log(res);
        
        this.$router.push({
          name: "addproject_eng",
          query: {
            projectid: res.data.data.projectId,
            // starttime: res.data.data.projectStartTime
          }
        });
      });
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
    },
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
