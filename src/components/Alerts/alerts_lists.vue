<template>
  <div class="alerts_lists">
    <!--    <header><h2>CUSTOMERS DATAS</h2></header>-->
    <header>
      <h2>
        <span>{{$t('alerts.Alerts')}}</span>
        <!--      <i class="el-icon-arrow-right"></i>-->
        <!--      <span>Machine Connect Status</span>-->
      </h2>
    </header>
    <div>
      <nav>
        <div class="nav_right">
          <span class="keyword">{{$t('common.Time')}}:</span>
          <el-date-picker
            @change="searcher"
            v-model="timerange"
            type="daterange"
            :range-separator="$t('machines.to')"
            value-format="yyyy-MM-dd"
           :start-placeholder="$t('machines.Start')"
            :end-placeholder="$t('machines.End')"
          ></el-date-picker>
  
        </div>
      </nav>
      <el-main>
        <div v-if="tableData.length<1" class="nonedata">{{$t('common.NoMore')}}</div>
        <ul>
          <li v-for="(item) in tableData" :key="item.notice_id">
            <div>
              <p>
                <img src="../../../static/ba8ba44db0bb05354954e18c91a4170.png" alt />
                <span v-if="item.notice_category_name">[{{item.notice_category_name}}]</span>
                <span>{{item.title}}</span>
              </p>
              <p
                @click="$routerto('alerts_details',{'notice_id':item.notice_id,'currentpages':currentpage})"
              >
                <i class="el-icon-d-arrow-right"></i>
                {{item.is_read=='1'?$t('alerts.read'):$t('alerts.unread')}}
              </p>
            </div>
            <article v-html="item.content"></article>
            <footer>{{item.create_time}}</footer>
          </li>
        </ul>
      </el-main>
      <pagevue
        class="alerts_lists2"
        :pagenum="pagetotal"
        :currentpages="currentpage"
        :pagesizes="pagesize"
        v-on:fromchildren="fromchildren1"
      ></pagevue>
    </div>
  </div>
</template>

<script>
export default {
  name: "alert_lists",
  data() {
    return {
      pictLoading: false,
      timerange: null,
      ischeck: false,
      keyword: "",
      currentpage: 1,
      pagesize: 5,
      pagetotal: null,
      tableData: [],
      multipleSelection: []
    };
  },
  created() {
    // this.getlists();
  },
  activated() {
    this.getlists();
  },
  methods: {
    getlists() {
      // if(this.$route.query.currentpages){
      //   this.currentpage=this.$route.query.currentpages*1;
      // }else{
      //   this.currentpage=1;
      // }
      if (this.timerange == null) {
        this.changepage(this.currentpage, this.pagesize, this.keyword, "", "");
      } else {
        this.changepage(
          this.currentpage,
          this.pagesize,
          this.keyword,
          this.timerange[0],
          this.timerange[1]
        );
      }
    },
    searcher() {
      this.currentpage = 1;
      if (this.timerange == null) {
        this.changepage(this.currentpage, this.pagesize, this.keyword, "", "");
      } else {
        this.changepage(
          this.currentpage,
          this.pagesize,
          this.keyword,
          this.timerange[0],
          this.timerange[1]
        );
      }
    },
    changepage(currentpage, pagesize, keyword, starttime, endtime) {
      this.pictLoading = true;
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/admin_api/content.notice/getNoticeList`,
          {
            page: currentpage,
            size: pagesize,
            start_time: starttime,
            end_time: endtime
          }
        )
        .then(res => {
          if (res.data.ret == 0) {
            this.pagetotal = res.data.data.total;
            this.tableData = [...res.data.data.data];

            this.tableData.forEach(item => {
              item.create_time = this.$global.timestampToTime(item.create_time);
            });
            this.pictLoading = false;
            // console.log(this.tableData)
          }
        })
        .catch(error => {});
    },
    handleClick(row) {
      this.$router.push({
        name: "usercheck",
        query: { idx: row.userId, userIdentityType: row.userIdentityType }
      });
      // this.$router.push("/home/userlist/verified_user/usercheck");
    },
    fromchildren1(data) {
      // console.log(data)
      this.currentpage = data.currentpage;
      if (this.timerange == null) {
        this.changepage(this.currentpage, this.pagesize, this.keyword, "", "");
      } else {
        this.changepage(
          this.currentpage,
          this.pagesize,
          this.keyword,
          this.timerange[0],
          this.timerange[1]
        );
      }
    }
  },
  watch: {}
};
</script>

<style lang="scss">
.alerts_lists {
  /*width: 100%;*/
  .nonedata {
    color: #777777;
    text-align: center;
  }
  div.alerts_lists2 {
    justify-content: left;
  }
  font-size: 14px;
  padding: 0 50px 50px 50px;
  box-sizing: border-box;
  width: 100%;
  header {
    position: relative;
    height: 80px;
    border-bottom: 1px solid #d3d3d3;
    h2 {
      font-size: 20px;
      position: absolute;
      bottom: 20px;
      /*font-weight: 550;*/
    }
  }
  .el-table {
    color: #7a7a7a;
  }
  .el-checkbox__inner {
    border-radius: 50%;
    /*background: ;*/
    /*background: red;*/
    /*border-color: red;*/
  }

  .el-table .warning-row {
    background: #edf1f4;
  }
  .el-table_1_column_8 .el-button {
    color: #2abee2;
  }
  .edit {
    span {
      color: #2abee2;
      text-decoration: underline;
      cursor: pointer;
    }
    span.left {
      margin-right: 20px;
    }
  }

  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    /*border-color:white;*/
    background: #2abee2;
    border-color: #2abee2;
  }
  .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #dcdfe6;
  }
  .el-table td,
  .el-table th.is-leaf {
    border: 0;
  }
  nav {
    display: flex;
    margin: 20px 0 0 0;
    /*justify-content: space-between;*/
    /*padding: 0 50px 0 20px;*/
    div.nav_right {
      color: #777777;
      /*display: flex;*/
      div {
        /*flex:1;*/
      }
    }
  }
  main {
    width: 70%;
    // box-sizing:border-box;
    /*min-width: 560px;*/
    padding: 20px 0;
    ul {
      li {
        height: 130px;
        padding: 12px 20px;
        box-sizing: border-box;
        border: 1px solid #d4d4d4;
        margin-bottom: 7px;
        border-radius: 3px;
        div {
          display: flex;
          justify-content: space-between;
          /*height: 25px;*/
          height: 24px;
          margin-bottom: 10px;
          p:nth-of-type(1) {
            display: flex;
            align-items: center;
            img {
              height: 22px;
              width: 22px;
              margin-right: 10px;
              /*vertical-align: middle;*/
            }
            span {
              /*line-height: 22px;*/
              /*vertical-align: middle;*/
            }
          }
          p:nth-of-type(2) {
            color: #2ab4e5;
            cursor: pointer;
          }
        }
        article {
          height: 50px;
          line-height: 16px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          color: #a2a2a2;
          margin-bottom: 10px;
        }
        footer {
          display: flex;
          /*display: flex;*/
          color: #a2a2a2;
          justify-content: flex-end;
        }
      }
    }
    /*margin-top: 60px;*/
    /*width: 100%;*/
    /*  padding: 0;*/
    /*  border: 1px solid #EBEEF5;*/
  }
  @media (max-width: 1024px) {
    main {
      width: 80%;
      padding: 20px 0;
    }
  }

  .alerts_lists2 {
    .pagevue {
      left: 0;
      transform: none;
    }
  }
}
@media (max-width: 768px) {
  .alerts_lists {
    padding: 0 30px 30px 30px;
  }
}
</style>
