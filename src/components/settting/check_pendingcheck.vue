<template>
  <div id="check_pendingcheck">
    <div class="check_pendingcheck" v-if="identityType!=2">
      <header>
        <ul class="pending_left">
          <li v-for="(value,key) in pending_individual" :key="key">
            <p>{{value.title}}</p>
            <el-input placeholder v-model="value.value" :disabled="true"></el-input>
          </li>
        </ul>
        <!-- <ul class="pending_left" v-if='identityType==2'>
        <li v-for="(value,key) in pending_company" :key="key">
          <p>{{value.title}}</p>
          <el-input placeholder="" v-model="value.value" :disabled="true"></el-input>
        </li>
        
        </ul>-->
        <!-- <ul class="pending_right">
        <li v-for="(value,key) in pending_eng" :key="key">
          <p>{{value.title}}</p>
          <el-input placeholder="请输入内容" v-model="value.value" :disabled="true"></el-input>
        </li>
        </ul>-->
      </header>
      <main v-if="nationality==1">
        <aside>
          <p>身份证正面</p>
          <nav>
            <img :src="identityPicOne" alt />
          </nav>
        </aside>
        <section>
          <p>身份证反面</p>
          <nav>
            <img :src="identityPicTwo" alt />
          </nav>
        </section>
      </main>
      <main v-if="nationality==2">
        <aside>
          <p>护照</p>
          <nav>
            <img :src="identityPicOne" alt />
          </nav>
        </aside>
      </main>
    </div>

    <div class="check_pendingcheck" v-if="identityType==2">
      <header>
        <ul class="pending_left">
          <li v-for="(value,key) in pending_company" :key="key">
            <p>{{value.title}}</p>
            <el-input placeholder v-model="value.value" :disabled="true"></el-input>
          </li>
        </ul>
      </header>
      <main>
        <section>
          <p>公司营业执照</p>
          <nav>
            <img :src="userCompanyPic" alt />
          </nav>
        </section>
        <section></section>
      </main>
    </div>
    <footer class="review">
      <p>
        <el-button type="text" @click="dialogVisible = true">审核通过</el-button>
      </p>
      <p>
        <el-button type="text" @click="dialogFormVisible = true">审核失败</el-button>
      </p>
    </footer>
    <el-dialog title="审核失败" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="拒绝原因：">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="证件图片不清晰" name="type"></el-checkbox>
            <el-checkbox label="公司名称不符" name="type"></el-checkbox>
            <el-checkbox label="个人信息不正确" name="type"></el-checkbox>
            <el-checkbox label="其他" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="check(2)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <span>审核通过</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible= false">取 消</el-button>
        <el-button type="primary" @click="check(1)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        type: []
      },
      identityType: "",
      dialogFormVisible: false,
      dialogVisible: false,
      identityPicOne: "",
      identityPicTwo: "",
      userCompanyPic: "",
      idx: "",
      // formLabelWidth: "120px",
      pending_individual: {
        createTime: {
          title: "注册时间",
          value: ""
        },
        userType: {
          title: "类型",
          value: ""
        },
        identityType: {
          title: "身份",
          value: ""
        },
        bslEmail: {
          title: "邮箱",
          value: ""
        },

        userCountryCh: {
          title: "国籍",
          value: ""
        },
        userName: {
          title: "姓名",
          value: ""
        },
        // userCompanyCh: {
        //   title: "公司名称",
        //   value: ""
        // },
        userIdentity: {
          title: "身份证号",
          value: ""
        }
        // optTime: {
        //   title: "验证时间",
        //   value: ""
        // }
      },
      nationality: "", //国籍
      pending_company: {
        createTime: {
          title: "注册时间",
          value: ""
        },
        userType: {
          title: "类型",
          value: ""
        },
        identityType: {
          title: "身份",
          value: ""
        },
        bslEmail: {
          title: "注册邮箱",
          value: ""
        },

        userCountryCh: {
          title: "国籍",
          value: ""
        },
        userCompanyCh: {
          title: "公司名称",
          value: ""
        },
        userCompanyEn: {
          title: "Corporate name",
          value: ""
        },
        userAddressCh: {
          title: "公司地址",
          value: ""
        },
        userAddressEn: {
          title: "Company address",
          value: ""
        }
      }
      // pending_eng: {
      //   createTime: {
      //     title: "Registration time",
      //     value: ""
      //   },
      //   userType: {
      //     title: "type",
      //     value: ""
      //   },
      //   bslName: {
      //     title: "User Name",
      //     value: ""
      //   },
      //   userCountryEn: {
      //     title: "nationality",
      //     value: ""
      //   },
      //   userCompanyEn: {
      //     title: "Corporate name",
      //     value: ""
      //   },
      //   userIdentity: {
      //     title: "ID card",
      //     value: ""
      //   },
      //   optTime: {
      //     title: "Verification time",
      //     value: ""
      //   }
      // },
    };
  },
  methods: {
    handleClose(done) {
      done();
    },
    check(num) {
      var str;
      if(num==1){
        str='';
      }else if(num==2){
        str = this.form.type.join(",");
      }
      this.dialogVisible = false;
      this.dialogFormVisible = false;
     
      this.$axios({
        method: "post",
        url: `${this.$baseurl}/bsl_admin_web/user/saveAuth?userId=${this.idx}&optStatus=${num}&optRemark=${str}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        console.log(res);
        if(res.data.resultCode==10000){
          
               this.$router.push({name: 'verified_user'})
        }
      });
    }
  },
  created() {
    this.idx = this.$route.query.idx;
    this.identityType = this.$route.query.userIdentityType;
    this.$axios({
      method: "get",
      url: `${this.$baseurl}/bsl_admin_web/user/getUserAuthDetail?userId=${this.idx}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(res => {
      console.log(res.data.data);
      var arr = res.data.data;
      for (var key in arr) {
        if (key == "userType") {
          if (arr[key] == 1) {
            arr[key] = "项目方";
          } else if (arr[key] == 4) {
            arr[key] = "投资方中介";
          } else if (arr[key] == 3) {
            arr[key] = "投资方";
          }
        }
        if (key == "userCountryEn") {
          if (arr[key] == "China") {
            this.nationality = 1;
          } else {
            this.nationality = 2;
          }
        }
        if (key == "createTime") {
          arr[key] = this.$global.timestampToTime(arr[key]);
        }
      }
      if (arr.identityType) {
        if (this.identityType == 1) {
          arr.identityType = "个人";
          this.identityPicOne = this.$baseurl + arr.identityPicOne;

          this.identityPicTwo = this.$baseurl + arr.identityPicTwo;
          for (var key in this.pending_individual) {
            this.pending_individual[key].value = arr[key];
          }
        } else if (this.identityType == 2) {
          arr.identityType = "公司";
          this.userCompanyPic = this.$baseurl + arr.userCompanyPic;
          for (var key in this.pending_company) {
            this.pending_company[key].value = arr[key];
          }
        }
      }
    });
  }
};
</script>
<style lang='scss'>
#check_pendingcheck {
  .el-button--primary {
    color: black;
  }
  .el-button--text {
    color: black;
  }
  .el-dialog__footer {
    text-align: center;
  }
  .el-button--text {
    width: 200px;
    background: #409eff;
    color: white;
  }
  .el-dialog__header {
    text-align: center;
    //  font-size: 20px;
  }
  .el-dialog__body {
    text-align: center;
    font-size: 15px;
  }
}
</style>

<style lang='scss' scoped>
#check_pendingcheck {
  header {
    display: flex;
    width: 900px;
    justify-content: space-between;
    margin: 0 auto;
    .pending_left {
      width: 900px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        margin-bottom: 30px;
        width: 400px;
        p {
          margin-bottom: 10px;
        }
      }
    }
  }
  main {
    display: flex;
    width: 900px;
    margin: 0 auto;
    // text-align: center;
    margin-bottom: 20px;
    justify-content: space-between;
    p {
      margin-bottom: 10px;
    }
    nav {
      height: 200px;
      width: 400px;
      // background: #58bc58;
      border: 1px solid #e4e7ed;
      background-color: #f5f7fa;
      margin-bottom: 20px;
      border-radius: 4px;
      img {
        height: 200px;
        width: 400px;
      }
    }
    button {
      width: 40%;
      height: 50px;
      border: 1px solid #e4e7ed;
      background-color: #f5f7fa;
      // margin-bottom: 20px;
      border-radius: 4px;
      // background: red;
    }
  }
  footer.review {
    width: 900px;
    margin: 0 auto;
    margin-bottom: 60px;
    display: flex;
    justify-content: space-between;
    p {
      width: 400px;
      text-align: center;
    }
  }
}
</style>