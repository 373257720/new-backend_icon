<template>
  <div id="tosignuproot">
    <div class="tosignuproot">
      <div class="top">
        <aside class="fl"></aside>
        <article class="fr">
           <header >MACHINE INFORMATION</header>
          <el-main>
            <el-table stripe :data="tableData" border style="width:100%;">
              <el-table-column fixed prop="createTime" label="注册时间" align="center"></el-table-column>
              <el-table-column prop="projectName" label="项目名称" align="center"></el-table-column>
              <el-table-column prop="projectCompany" label="公司名称" align="center"></el-table-column>
            </el-table>
          </el-main>
        </article>
      </div>
      <div class="bottom">
        <header>MACHINE INFORMATION</header>
        <main>
          <el-main>
            <el-table stripe :data="tableData" border style="width:100%;">
              <el-table-column fixed prop="createTime" label="注册时间" align="center"></el-table-column>
              <el-table-column prop="projectName" label="项目名称" align="center"></el-table-column>
              <el-table-column prop="projectCompany" label="公司名称" align="center"></el-table-column>
              <el-table-column prop="signstatus" label="验证状态" align="center"></el-table-column>
              <el-table-column prop="projectstatus" label="项目状态" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                  <el-button
                    @click="deleterow(scope.row)"
                    type="text"
                    prop="projectLifeCycle"
                    v-if="scope.row.projectLifeCycle===0"
                    size="small"
                  >删除</el-button>
                  <el-button type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
        </main>
      </div>
      <!-- <header class="tosignup_header"> -->
      <!-- <div class="block">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          value-format="timestamp"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
        ></el-date-picker>
      </div>-->
      <!-- <el-select v-model="value" placeholder="请选择" class="block">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>-->
      <!-- <el-input placeholder="项目名称" v-model="searchkey" clearable></el-input> -->
      <!-- <el-button
        type="primary"
        icon="el-icon-search"
        class="block"
        @click="search(value,value1[0]/1000, value1[1]/1000, 1, pagesize)"
      >搜索</el-button>-->
      <!-- <router-link to="/home/project/tosignup/addproject_ch/">
        <el-button type="primary" icon="el-icon-circle-plus-outline" class="addbtn">添加项目</el-button>
      </router-link>
    </header>
    <el-main>
      <el-table :data="tableData" border style="width:100%;">
        <el-table-column fixed prop="createTime" label="注册时间" align="center"></el-table-column>
        <el-table-column prop="projectName" label="项目名称" align="center"></el-table-column>
        <el-table-column prop="projectCompany" label="公司名称" align="center"></el-table-column>
        <el-table-column prop="signstatus" label="验证状态" align="center"></el-table-column>
        <el-table-column prop="projectstatus" label="项目状态" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button
              @click="deleterow(scope.row)"
              type="text"
              prop="projectLifeCycle"
              v-if="scope.row.projectLifeCycle===0"
              size="small"
            >删除</el-button>
            <el-button  type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <pagevue
      :pagenum="pagetotal"
      :currentpages="currentpage"
      :pagesizes="pagesize"
      v-on:fromchildren="fromchildren1"
    ></pagevue>
    <el-dialog title="提示" v-model="fafa" width="30%" height="50%">
      <span>{{this.$store.state.commondialog}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
      </el-dialog>-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fafa: this.$store.state.commondialog,
      value1: [], //日期选择
      value: "", //项目状态
      searchkey: "",
      currentpage: 1,
      pagesize: 6,
      pagetotal: null,
      options: [
        {
          value: -1,
          label: "默认"
        },
        {
          value: 0,
          label: "待签约"
        },
        {
          value: 1,
          label: "中介已意向签约"
        },
        {
          value: 2,
          label: "项目方同意签约"
        },
        {
          value: 3,
          label: "项目方拒绝签约"
        }
      ],
      tableData: []
    };
  },
  created() {
    this.search(this.value, null, null, this.currentpage, this.pagesize);
  },
  methods: {
    deleterow(row) {
      console.log(row);
      this.$confirm("确定删除？", "提示", {
        confirmButtonText: "确定",
        // cancelButtonText: "取消",
        type: "warning",
        center: true,
        showCancelButton: false
      }).then(() => {
        this.$axios({
          method: "get",
          url: `${this.$baseurl}/bsl_admin_web/project/updateLifeCycle?projectId=${row.projectId}`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(res => {
          console.log(res);
          this.search(this.value, null, null, this.currentpage, this.pagesize);
        });
      });
    },

    handleClick(row) {
      console.log(row.userRespList);
      // let testStr = JSON.stringify(row.userRespList);
      this.$router.push({
        name: "tosignup_check",
        query: {
          projectid: row.projectId,
          status: row.signStatus
          // userRespList:testStr
        }
      });
    },
    fromchildren1(data) {
      // console.log(this.value1[0]);
      // console.log(data);
      this.currentpage = data.currentpage;
      this.pagesize = data.pagesize;
      this.search(
        this.value,
        this.value1[0] / 1000,
        this.value1[1] / 1000,
        this.currentpage,
        this.pagesize
      );
    },
    search(status, start, end, pageindex, size) {
      if (!start || !end) {
        start = "";
        end = "";
      }
      if (pageindex == 1) {
        this.currentpage = 1;
      }
      this.$axios({
        method: "post",
        url: `${this.$baseurl}/bsl_admin_web/project/getProject`,
        data: this.$qs.stringify({
          signStatus: status,
          searchKey: this.searchkey,
          startCreateTime: start,
          endCreateTime: end,
          pageIndex: pageindex,
          pageSize: size
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        console.log(res);
        if (res.data.resultCode == 10090) {
          this.$store.dispatch("commondialogfunctionaysn", true);
          // console.log( this.$store.state.commondialog);
        } else if (res.data.resultCode == 10000) {
          // if (res.data.data.lists.length > 0) {
          this.tableData = [...res.data.data.lists];
          console.log(this.tableData);

          this.tableData.forEach(item => {
            item.createTime = this.$global.timestampToTime(item.createTime);
            if (item.signStatus === 0) {
              item.signstatus = "待签约";
            } else if (item.signStatus === 1) {
              item.signstatus = "中介已意向签约";
            } else if (item.signStatus === 2) {
              item.signstatus = "项目方同意签约";
            } else if (item.signStatus === 3) {
              item.signstatus = "项目方拒接签约";
            } else if (item.signStatus === 3) {
              item.signstatus = "项目方拒接签约";
            } else if (item.signStatus === 3) {
              item.signstatus = "项目方拒接签约";
            }
            // 待审核项目->1 待签约项目->2  已签约待发送->4    待确认项目->5  成功签约项目->6   拒绝签约项目->3，7
            if (item.projectLifeCycle === 0) {
              item.projectstatus = "正常";
            } else if (item.projectLifeCycle === -1) {
              item.projectstatus = "已删除";
            }
          });
          this.pagetotal = res.data.data.pageTotal;
          // var rescode = res.data.resultCode;
          // }
        }
      });
    }
  }
};
</script>

<style lang='scss'>
#tosignuproot {
  .tosignuproot {
    width: 1505px;
    height: 780px;
    // background: yellow;
    margin-left: 60px;
    .el-main {
      padding: 0;
      .el-table--border td,
      .el-table--border th,
      .el-table__body-wrapper
        .el-table--border.is-scrolling-left
        ~ .el-table__fixed {
        border-right: 0;
        border-bottom: 0;
      }
    }
    div.top {
      height: 486px;
      width: 100%;

      margin-bottom: 76px;
      aside {
        width: 876px;
        height: 100%;
        background: blue;
      }
      article {
        width: 548px;
        height: 100%;
        background: green;
      }
    }

    div.bottom {
      height:600px;
      width: 100%;
      background: yellow;
      header {
        font-size: 16px;
        margin-bottom: 20px;
      }
      main {
        height: 180px;
        width: 100%;
        // background: green;
      }
    }
  }
}
</style>
