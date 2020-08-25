<template>
  <div class="error_log">
    <!--    <header><h2>CUSTOMERS DATAS</h2></header>-->
    <header>
      <h2>
        <span>{{$t('auditLog.AuditLogs')}}</span>
        <i class="el-icon-arrow-right"></i>
        <span>{{$t('auditLog.MachineConnectStatus')}}</span>
      </h2>
    </header>
    <nav>
      <div class="nav_left">
        <section @click="alldelete">{{$t('common.Delete')}}</section>
        <!--        <section @click="alledit(2)">Export</section>-->
      </div>
      <div class="nav_right">
        <div>
          <span class="keyword">{{$t('common.Time')}}:</span>
          <el-date-picker
            v-model="timerange"
            type="daterange"
            range-separator="to"
            value-format="yyyy-MM-dd"
            start-placeholder="Start"
            end-placeholder="End"
          ></el-date-picker>
        </div>
        <div>
          <span class="keyword">{{$t('common.Keyword')}}:</span>
          <el-input :placeholder="$t('common.MachineName')" v-model="keyword" clearable></el-input>
          <i @click="searcher" class="el-icon-search"></i>
        </div>
      </div>
    </nav>
    <el-main>
      <el-table
        :row-class-name="tabRowClassName"
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" width="55"></el-table-column>
        <el-table-column label="ID" align="center">
          <template slot-scope="scope">{{ scope.row.user_machine_error_id}}</template>
        </el-table-column>
        <el-table-column :label="$t('common.MachineName')" width="150" align="center">
          <template slot-scope="scope">{{ scope.row.machine_name}}</template>
        </el-table-column>
        <el-table-column prop="level" align="center" :label="$t('auditLog.ErrorLevel')" show-overflow-tooltip></el-table-column>
        <el-table-column
          align="center"
          :label="$t('auditLog.ErrorType')"
          prop="category_name"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="content" align="center" :label="$t('auditLog.Details')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="create_time" align="center" :label="$t('common.Date')" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" :label="$t('common.Operation')" class-name="edit" width="150">
          <template slot-scope="scope">
            <span @click="handleDelete(scope.$index, scope.row)">{{$t('common.Delete')}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <dialogReminder :msg="msg" :remindervisible.sync="remindervisible"></dialogReminder>
    <pagevue
      :pagenum="pagetotal"
      :currentpages="currentpage"
      :pagesizes="pagesize"
      v-on:fromchildren="fromchildren1"
    ></pagevue>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
      remindervisible: false,
      // centerDialogVisible: false,
      timerange: null,
      ischeck: false,
      keyword: "",
      currentpage: 1,
      pagesize: 10,
      pagetotal: null,
      tableData: [],
      multipleSelection: []
    };
  },
  created() {
    this.searcher();
    // this.changepage(this.currentpage, this.pagesize,this.keyword,this.timerange[0],this.timerange[1]);
  },
  methods: {
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
    alldelete() {
      console.log(this.multipleSelection);
      let userid_arr = [];
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach(item => {
          userid_arr.push(item.user_machine_error_id);
        });
        this.$confirm(
          this.$t("common.DeleteWarning"),
          this.$t("common.Warning"),
          {
            confirmButtonText: this.$t("common.OK"),
            cancelButtonText: this.$t("common.Cancel"),
            type: "warning"
          }
        )
          .then(() => {
            this.beforedelete(userid_arr);
          })
          .catch(() => {});
      } else {
        this.$message({
          message: this.$t("common.PleaseSelect"),
          type: "warning"
        });
        // this.msg="Please select"
        // this.remindervisible=true;
      }
    },
    handleDelete(index, row) {
        this.$confirm(
          this.$t("common.DeleteWarning"),
          this.$t("common.Warning"),
          {
            confirmButtonText: this.$t("common.OK"),
            cancelButtonText: this.$t("common.Cancel"),
            type: "warning"
          }
        )
        .then(() => {
          this.beforedelete(row.user_machine_error_id);
        })
        .catch(() => {});
    },
    beforedelete(param) {
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/admin_api/machine.user_machine_error/deleteUserMachineError`,
          {
            user_machine_error_id: param
          }
        )
        .then(res => {
          this.msg = res.data.msg;
          this.remindervisible = true;
          if (res.data.ret == 0) {
            if (this.timerange == null) {
              this.changepage(
                this.currentpage,
                this.pagesize,
                this.keyword,
                "",
                ""
              );
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
        });
    },
    tabRowClassName({ row, rowIndex }) {
      let index = rowIndex;
      if (index % 2 == 0) {
        return "warning-row";
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    changepage(currentpage, pagesize, keyword, starttime, endtime) {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/admin_api/machine.user_machine_error/getUserMachineErrorList`,
          {
            token: this.$store.state.token,
            page: currentpage,
            size: pagesize,
            keyword: keyword,
            start_time: starttime,
            end_time: endtime
          }
        )
        .then(res => {
          if (res.data.ret == 0) {
            // console.log(res)
            this.pagetotal = res.data.data.total;
            this.tableData = [...res.data.data.data];
            this.tableData.forEach(item => {
              item.create_time = this.$global.timestampToTime(item.create_time);
            });
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
  watch: {
    $route(to, from) {
      if (to.name == "usercheck") {
        this.ischeck = !this.ischeck;
      } else {
        this.ischeck = false;
      }
    }
  }
};
</script>

<style lang="scss">
.error_log {
  padding: 0 50px 50px 50px;
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
    justify-content: space-between;
    padding: 0 50px 0 20px;
    div.nav_left {
      display: flex;
      section {
        cursor: pointer;
        width: 120px;
        line-height: 40px;
        height: 40px;
        background: url(../../../static/add-disable.png) no-repeat;
        border-radius: 5px;
        color: white;
        text-align: center;
        box-sizing: border-box;
        margin-right: 20px;
      }
    }
    div.nav_right {
      display: flex;
      > div {
        display: flex;
      }
      i.el-icon-search {
        height: 40px;
        /*width: 40px;*/
        cursor: pointer;
        margin-left: 20px;
        font-size: 22px;
        line-height: 40px;
        text-align: center;
      }
      span.keyword {
        line-height: 40px;
        color: #777777;
        text-align: center;
        margin: 0 20px;
      }
      /*div{*/
      /*  flex:1;*/
      /*}*/
    }
  }
  @media (max-width: 1024px) {
    nav {
      padding: 0;
      div.nav_right {
        flex-wrap: wrap;
        div.el-date-editor--daterange {
          width: 250px;
          flex: initial;
        }
        div.el-input--suffix {
          width: 150px;
          flex: initial;
        }
        div:nth-of-type(2) {
          margin-top: 10px;
        }
      }
    }
  }
  @media (max-width: 768px) {
  }
  main {
    padding: 20px 20px 20px 0;
    .el-table thead {
      /*color:black;*/
    }
  }
}
</style>
