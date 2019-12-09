<template>
  <div id="verified_usercheck">
    <header>我的项目资料</header>
    <div class="nationality">
      <p>注册时间</p>
      <el-input placeholder="-" v-model="createTime" :disabled="true"></el-input>
    </div>
    <div class="idcard_num">
      <p>类型</p>
      <el-input placeholder="-" v-model="userType" :disabled="true"></el-input>
    </div>
    <div class="userIdentityType">
      <p>身份</p>
      <el-input placeholder="-" v-model="userIdentityType_tag[userIdentityType]" :disabled="true"></el-input>
    </div>
    <div class="email">
      <p>邮箱</p>
      <el-input placeholder="-" v-model="email" :disabled="true"></el-input>
    </div>
    <div class="bslName">
      <p>国籍</p>
      <el-input placeholder="-" v-model="userCountry" :disabled="true"></el-input>
    </div>
    <div class="bslName2" v-if="userIdentityType==1">
      <p>用户名称</p>
      <el-input placeholder="-" v-model="userName" :disabled="true"></el-input>
    </div>

    <div class="id_back" v-if="userIdentityType==2">
      <p>公司名称</p>
      <el-input placeholder="-" v-model="userCompany" :disabled="true"></el-input>
    </div>
    <div class="id_back" v-if="userIdentityType==2">
      <p>公司地址</p>
      <el-input placeholder="-" v-model="userAddressCh" :disabled="true"></el-input>
    </div>
    <div class="id_front">
      <p>验证时间</p>
      <el-input placeholder="-" v-model="optTime" :disabled="true"></el-input>
    </div>
    <div class="companycheck" v-if="userIdentityType==1">
      <p>身份证号</p>
      <el-input placeholder="-" v-model="userIdentity" :disabled="true"></el-input>
    </div>
    <div class="optStatus">
      <p>验证状态</p>
      <el-input placeholder="-" v-model="optStatus_tag[optStatus]" :disabled="true"></el-input>
    </div>
    <div class="failure_reasons" v-if="optStatus==2">
      <p>失败原因</p>
      <el-input placeholder="-" v-model="failure_reasons" :disabled="true"></el-input>
    </div>
    <div class="project_details" v-if="identityPicTwo!=0 && userIdentityType==1">
      <p>用户身份证</p>
      <section>
        <img style="" :src="identityPicOne" alt />
        <img style="" :src="identityPicTwo" alt />
      </section>
    </div>
    <div class="project_details" v-if="identityPicTwo==0  && userIdentityType==1">
      <p>护照</p>
      <section>
        <img style="" :src="identityPicOne" alt />
      </section>
    </div>
    <div class="project_details" v-if="userIdentityType==2">
      <p>公司营业执照</p>
      <section>
        <img style="" :src="userCompanyPic" alt />
      </section>
    </div>
    <div class="commit">
      <router-link to="/home/userlist/verified_user">
        <button>返回</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      createTime: "",
      userType: "",
      userCountry: "",
      userName: "",
      email: "",
      optTime: "",
      userCompany: "",
      userIdentity: "",
      optStatus: "",
      optStatus_tag: ["未审核", "审核通过", "审核不通过"],
      identityPicOne: "",
      userAddressCh: "",
      identityPicTwo: "",
      userCompanyPic: "",
      userIdentityType: "",
      userIdentityType_tag: { "1": "个人", "2": "公司" },
      failure_reasons: ""
    };
  },
  created() {
    var idx = this.$route.query.idx;
    this.userIdentityType = this.$route.query.userIdentityType;
    // console.log(this.$route.query);
    // if (
    //   this.$route.query.country == "Macau" ||
    //   this.$route.query.country == "China" ||
    //   this.$route.query.country == "Hongkong"
    // ){

    // }
    this.$axios({
      method: "get",
      url: `${this.$baseurl}/bsl_admin_web/user/getUserAuthDetail?userId=${idx}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(res => {
      var arr = res.data.data;
      this.email = arr.bslEmail;
      this.createTime = arr.createTime
        ? this.$global.timestampToTime(arr.createTime)
        : "-";
      this.failure_reasons = arr.optRemark ? arr.optRemark : "-";
      this.userType = arr.userType == 1 ? "项目方" : "投资方中介";
      this.userCountry =
        arr.lan == "zh_CN" ? arr.userCountryCh : arr.userCountryEn;
      this.userName = arr.userName;
      this.optTime = arr.optTime
        ? this.$global.timestampToTime(arr.optTime)
        : "-";
      this.userAddressCh = arr.userAddressCh ? arr.userAddressCh : "-";
      this.userCompany = arr.userCompanyCh ? arr.userCompanyCh : "-";
      this.userIdentity = arr.userIdentity;
      this.optStatus = arr.optStatus;
      // if (arr.optStatus === 0) {
      //   this.optStatus = "未审核";
      // } else if (arr.optStatus === 1) {
      //   this.optStatus = "审核通过";
      // } else if (arr.optStatus === 2) {
      //   this.optStatus = "审核不通过";
      // }
      this.identityPicOne = this.$baseurl + arr.identityPicOne;
      this.userCompanyPic = this.$baseurl + arr.userCompanyPic;
      if (arr.identityPicTwo) {
        this.identityPicTwo = this.$baseurl + arr.identityPicTwo;
      }
    });
  }
};
</script>

<<style lang='scss' scoped>
#verified_usercheck{
  width: 700px;
  margin: 0 auto;
  header{
    text-align: center;
    font-size: 26px;
    margin:20px;
  }
  >div{
    margin-bottom:30px;
    >p{
      font-size:16px;
    margin-bottom:20px;
    }
  }
  .project_details{
    section{
      width:100%;
      height:230px;
      display:flex;
      justify-content:space-between;
      
    }
     img{
        width:45%; 
        border-radius:5px;
        border:1px solid #E4E7ED;
        background:#F5F7FA;
      }   
  }
  .commit{
    text-align: center;
    button{
      width: 200px;
      height: 50px;
      background:#F5F7FA;
      border-radius:5px;
      border:1px solid #E4E7ED;
      cursor:pointer;
    }
  }
}
</style>