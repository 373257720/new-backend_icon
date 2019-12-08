<template>
  <div id="tosignuproot">
    <div class="tosignuproot">
      <div class="top">
        <aside ></aside>
        <article >
           <header >MACHINE INFORMATION<span>SEE ALL</span></header>
          <el-main>
            <el-table     :row-class-name="tableRowClassName"  max-height="500" :data="tableData" border style="width:100%;">
              <el-table-column fixed prop="date" label="Transa tion ID" align="center"></el-table-column>
              <el-table-column prop="name" label="Type" align="center"></el-table-column>
              <el-table-column prop="city" label="Days" align="center"></el-table-column>
            </el-table>
          </el-main>
        </article>
      </div>
        <div class="bottom">
          <header>MACHINE INFORMATION</header>
          <main>
            <el-main>
              <el-table :row-style="rowClass"  stripe  :data="tableData" border style="width:100%;">
                <el-table-column fixed prop="date" label="Machine Information" align="center"></el-table-column>
                <el-table-column prop="name" label="ATM Address" align="center"></el-table-column>
                <el-table-column prop="projectCompany" label="Dispenser" align="center"></el-table-column>
                <el-table-column prop="signstatus" label="Cashbox" align="center"></el-table-column>
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
      </el-dialog>
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
      // searchkey: "",
      currentpage: 1,
      pagesize: 6,
      pagetotal: null,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        }
      ],
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
      // tableData: []
    };
  },
  created() {
    // this.search(this.value, null, null, this.currentpage, this.pagesize);
  },
  methods: {
    
    rowClass (row, index) {
      console.log(woshijinsinsianj)
      return { "background-color": "red" }
    },

    tableRowClassName({row, rowIndex}) {
      // console.dir(rowIndex)
      if (rowIndex %2 == 0) {

        return 'success-row';
      }
      // return '';
    },

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
  margin-top: 60px;
  .tosignuproot {
    height: 780px;
    // background: yellow;
    margin-left: 60px;
    margin-right: 60px;
    .el-main {
      padding: 0;
      overflow: hidden;
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
      display: flex;
      justify-content: space-between;
      margin-bottom: 76px;
      aside {
        width: 50%;
        height: 100%;
        border: 1px solid blue;
        /*background: blue;*/
      }
      article {
        width: 40%;
        height: 100%;

        /*background: green;*/

        /*.warning-row {*/
        /*  background: rgb(236, 145, 145);*/
        /*}*/
        .success-row {
          background: #f0f9eb;
        }

        /*.el-table__body tr:hover>td{*/
        /*  background-color: #c6cfdf!important;*/
        /*}*/

        /*.el-table__body tr.current-row>td{*/
        /*  background-color: #c6cfdf!important;*/
        /*}*/

        /*.el-table--enable-row-hover .el-table__body tr:hover>td{*/
        /*  background-color: #212e3e !important;*/
        /*}*/
        span{

        }

      }
    }

    div.bottom {
      height:600px;
      width: 100%;
      /*background: yellow;*/
      header {
        font-size: 16px;
        margin-bottom: 20px;
      }
      main {
        height: 180px;
        width: 100%;
        // background: green;
      }
      .warning-row {
        background: rgb(236, 145, 145);
      }
      .success-row {
        background: #f0f9eb;
      }

    }
  }
}
</style>
<style>
   .hover-row{
         background-color: #c6cfdf !important;
        } 
   .success-row{
    background: red !important;
  }
  .el-table__body tr.hover-row:hover>td{
    background-color: none !important;
}
</style>
