<template>
  <div class="audit_log">
    <header>
      <h2>{{$t("auditLog.AuditLogs")}}</h2>
    </header>
    <el-main>
      <el-table
        ref="multipleTable"
        border
        :show-header="status"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column align="center" class-name="pic">
          <template slot-scope="scope">
            <img :src="scope.row.pic" alt />
          </template>
        </el-table-column>
        <el-table-column prop="address" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" class-name="edit">
          <template slot-scope="scope">
            <!--            <span>{{}}</span>-->
            <span @click="view(scope.$index, scope.row)">{{$t("common.View")}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script >
export default {
  data() {
    return {
      status: false,
      input: "",
      currentpage: 1,
      pagesize: 6,
      pagetotal: null,
      tableData: [
        {
          address: this.$t("auditLog.CashboxLogs"),
          pic: "./static/Cashbox Logs.png"
        },
        {
          address: this.$t("auditLog.MachineConnectStatus"),
          pic: "./static/Machine Connect Status.png"
        },

        {
          address: this.$t("auditLog.ErrorLogs"),
          pic: "./static/Error Logs.png"
        }
      ]
    };
  },
  created() {
    // this.changepage(this.currentpage, this.pagesize);
  },
  methods: {
    view(index, row) {
      switch (index) {
        case 0: {
          this.$routerto("cashbox_log");
          break;
        }
        case 1: {
          this.$routerto("machine_connect_status");
          break;
        }
        case 2: {
          this.$routerto("error_log");
          break;
        }
      }
    }
  }
};
</script>

<style lang="scss">
.audit_log {
  margin: 0 0 0 50px;
  width: 90%;
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
  .el-table td,
  .el-table th {
    padding: 35px 0;
  }
  .el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 160px;
  }
  .pic {
    img {
      /*width: 100px;*/
      width: 80px;

      /*height: 50px;*/
      /*width: auto;*/
      /*height: auto;*/
      /*max-width: 80%;*/
      /*max-height: 80%;*/
    }
  }
  .edit {
    span {
      color: #2abee2;
      text-decoration: underline;
      cursor: pointer;
    }
    span:nth-of-type(1) {
      margin-right: 20px;
    }
  }
  nav {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    div {
      display: flex;
      width: 300px;
      /*justify-content: space-between;*/
      section {
        width: 100px;
        background: red;
        margin-right: 20px;
      }
    }
  }
  main {
    padding: 70px 20px 20px 0;
    /*margin-top: 60px;*/
    width: 100%;
  }
}
</style>
