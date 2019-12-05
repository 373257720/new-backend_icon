<template>
  <div
    id="project_check"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
  >
    <header>{{title}}</header>
    <nav>
      <p>
        项目名称:
        <span>{{projectname}}</span>
      </p>
      <p>
        计划时间:
        <span>{{projectStartTime}}</span>
      </p>
    </nav>
    <main>
      <article>
        <ul>
          <li v-for="(value,key) in details_lists" :key="key">
            <p>{{value.title}}</p>
            <p v-html="value.content"></p>
          </li>
        </ul>
      </article>
      <!-- <aside>
        <img :src="picurl" alt />
      </aside>-->
    </main>
    <!-- to="/home/project/tosignup/investor_infor" -->
    <footer>
      <!-- <button v-if="this.datalist.length==0?false:true" @click="handleClick()">
        投资者资料
        <b>{{this.datalist.length}}</b>
      </button>-->
      <router-link to="/home/project/tosignup">
        <button>返回</button>
      </router-link>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      loading: false,
      datalist: [],
      details_lists: {
        projectCompany: {
          title: "公司名称:",
          content: ""
        },
        publicCompany: {
          title: "是否上市公司:",
          content: ""
        },
        projectDescribe: {
          title: "项目介绍:",
          content: ""
        },
        collectMoney: {
          title: "集资金额:",
          content: ""
        },
        projectMobile: {
          title: "联系电话:",
          content: ""
        },
        projectEmail: {
          title: "电邮:",
          content: ""
        }
      },
      projectid: "",
      projectname: "",
      projectStartTime: "",
      picurl: ""
    };
  },
  created() {
    // this.datalist = JSON.parse(this.$route.query.userRespList);
    if (this.$route.query.status == 0) {
      this.title = "待签约项目";
    } else if (this.$route.query.status == 1) {
      this.title = "中介已意向签约";
    } else if (this.$route.query.status == 2) {
      this.title = "项目方同意签约";
      // this.watch = true;
    } else if (this.$route.query.status == 3) {
      this.title = "项目方拒接签约";
    }
    this.projectid = this.$route.query.projectid;
    this.$axios({
      method: "post",
      url: `${this.$baseurl}/bsl_admin_web/project/getProjectDetails?projectId=${this.projectid}&signStatus=${this.$route.query.status}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(res => {
      console.log(res);
      this.loading = false;
      if (res.data.resultCode == 10000) {
        this.datalist = res.data.data;
        if (res.data.data.createTime) {
          this.projectStartTime = this.$global.timestampToTime(
            res.data.data.createTime
          );
        }

        this.projectname = res.data.data.projectName;
        for (var key in this.details_lists) {
          this.details_lists[key].content = res.data.data[key];
          if (key == "publicCompany" && this.details_lists[key].content) {
            this.details_lists[key].content =
              res.data.data[key] == 0 ? "否" : "是";
          }
        }
      }

      // console.log();

      // this.picurl = this.$baseurl + res.data.data.picList[0].projectPic;
      // console.log(this.picurl);
      // this.tableData = [...res.data.data.lists];
      // this.pagetotal = res.data.data.pageTotal;
      // var rescode = res.data.resultCode;
    });
  },
  methods: {
    handleClick() {
      let data = JSON.stringify(this.datalist.userRespList);
      this.$router.push({
        name: "investor_infor",
        query: {
          userRespList: data
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#project_check {
  width: 100%;
  height: 100%;
  position: absolute;
  header {
    margin: 30px auto;
    padding-bottom: 30px;
    font-size: 36px;
    width: 800px;
    text-align: center;
    font-weight: 500;
    border-bottom: 1px solid black;
  }
  nav {
    margin: 0 auto;
    height: 86px;
    background: #f6f6f6;
    width: 800px;
    border-radius: 5px;
    border: 1px solid #ababab;
    text-align: center;
    line-height: 36px;
    box-sizing: border-box;
    padding: 10px 0;
  }
  main {
    margin: 16px auto 0 auto;
    width: 800px;
    display: flex;
    justify-content: space-between;
    article {
      width: 100%;

      ul {
        margin: 0 auto;
        display: flex;
        width: 500px;
        flex-direction: column;
        // align-items: center;
        // justify-content: center;
      }
      li {
        margin: 20px 0;
        width: 800px;
        display: flex;

        > p:nth-child(1) {
          // margin-right: 50px;
          width: 250px;
          font-weight: 600;
        }
        > p:nth-child(2) {
          // text-indent: 30px;
          text-align: left;
          font-size: 14px;
          flex: 1;
          word-wrap:break-word ;
          // text-align: center;
          width: 550px;

          line-height: 24px;
        }
      }
    }
    aside {
      width: 320px;
      height: 400px;
      // background: red;
      overflow: hidden;
      border-radius: 5px;
      box-sizing: border-box;
      border: 1px solid #ababab;
      img {
        width: 320px;
        height: 400px;
      }
    }
  }
  footer {
    width: 800px;
    display: flex;
    height: 100px;
    justify-content: space-around;
    margin: 0 auto;
    align-items: center;
    button {
      background: #00adef;
      width: 200px;
      height: 40px;
      line-height: 40px;
      color: white;
      border-radius: 2px;
    }
  }
}
</style>