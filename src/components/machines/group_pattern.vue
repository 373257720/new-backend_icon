<template>
  <div class="remote_control_records">
    <!--    <header><h2>CUSTOMERS DATAS</h2></header>-->
    <header>
      <h2>
        <span>{{$t('machines.Machines')}}</span>
        <i class="el-icon-arrow-right"></i>
        <span>{{$t('machines.GroupPattern')}}</span>
      </h2>
    </header>
    <nav>
      <div class="nav_left">
        <section @click="add">{{$t('common.Add')}}</section>
        <section @click="alldelete">{{$t('common.Delete')}}</section>
        <!--        <section @click="alledit(2)">Export</section>-->
      </div>
      <div class="nav_right">
        <span class="keyword">{{$t('common.Keyword')}}:</span>
        <el-input :placeholder="$t('common.MachineName')" v-model="keyword" clearable></el-input>
        <i @click="searcher" class="el-icon-search"></i>
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
        <el-table-column type="selection" align="center" label width="100"></el-table-column>
        <el-table-column :label="$t('machines.Group')" align="center" width="200">
          <template slot-scope="scope">{{ scope.row.name}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('machines.AppliedMachine')"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">{{scope.row.machinelist}}</template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('common.Operation')"
          fixed="right"
          width="250"
          class-name="edit"
        >
          <template slot-scope="scope">
            <span @click="handleDelete(scope.$index, scope.row)">{{$t('machines.ViewEdit')}}</span>
            <span @click="handleapply(scope.$index, scope.row)">{{$t('machines.ApplyAttributes')}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-dialog
      class="remote_control"
      :visible.sync="centerDialogVisible"
      width="30%"
      :modal="false"
      center
    >
      <span slot="title" class="dialog-footer">{{$t('machines.ApplyAttributes')}}</span>
      <div>
        <p class="thick">{{$t('machines.GroupName')}}:</p>
        <el-input :disabled="true" placeholder="Please input" v-model="Group_Name"></el-input>
      </div>
      <div>
        <p>{{$t('machines.Machinelistingroups')}}:</p>
        <p class="thick">({{$t('machines.TheSelectedMachine')}})</p>
        <template>
          <el-select v-model="machine_id" multiple placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
      </div>
      <span slot="footer" class="dialog-footer">
        <button @click="centerDialogVisible = false">{{$t('common.Cancel')}}</button>
        <button @click="apply">{{$t('machines.Apply')}}</button>
      </span>
    </el-dialog>
    <confirmDialog :msg="msg" v-on:todad="beforedelete" :remindervisible1.sync="remindervisible1"></confirmDialog>
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
  name: "group_pattern",
  data() {
    return {
      msg: "",
      remindervisible: false,
      remindervisible1: false,
      centerDialogVisible: false,
      type: {
        "1": "Restart CyptoGo",
        "2": "Reboot System",
        "3": "Lock Screen",
        "4": "Unlock Screen"
      },
      client: {
        "1": "Yes",
        "2": "No"
      },
      successful: {
        "1": "Yes",
        "2": "No"
      },
      keyword: "",
      Group_Name: "",
      machine_group_id: "",
      currentpage: 1,
      pagesize: 10,
      pagetotal: null,
      tableData: [],
      multipleSelection: [],
      options: [],
      machine_id: []
    };
  },
  created() {},
  activated() {
    this.changepage(this.currentpage, this.pagesize, this.keyword);
    this.$nextTick(() => {
      this.$refs.multipleTable.doLayout();
    });
  },
  methods: {
    apply() {
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/admin_api/machine.machine_group/attribute`,
          {
            machine_group_id: this.machine_group_id,
            machine_id: this.machine_id
          }
        )
        .then(res => {
          if (res.data.ret == 0) {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "success"
            });
            this.centerDialogVisible = false;
          } else {
            this.$message({
              showClose: true,
              message: res.data.msg
            });
          }
        });
    },
    searcher() {
      this.currentpage = 1;
      this.changepage(this.currentpage, this.pagesize, this.keyword);
    },
    alldelete() {
      if (this.multipleSelection.length > 0) {
        this.msg = this.$t("common.DeleteWarning");
        this.remindervisible1 = true;
      } else {
        this.msg = this.$t("common.PleaseSelect");
        // this.remindervisible=true;
        this.$message({
          message: this.$t("common.PleaseSelect"),
          type: "warning"
        });
      }
    },
    add() {
      this.$routerto("add_Group_Pattern");
    },
    handleapply(index, row) {
      // console.log(row)
      this.options = [];
      this.centerDialogVisible = true;
      this.Group_Name = row.name;
      this.machine_group_id = row.machine_group_id;
      let arr = row.machine_list;
      if (Array.isArray(arr)) {
        this.options = arr.map(item => {
          return {
            value: item.machine_id,
            label: item.name
          };
        });
      }
    },
    handleDelete(index, row) {
      console.log(row);
      this.$routerto("edit_Group_Pattern", {
        type: 2,
        machine_group_id: row.machine_group_id
      });
      // this.beforedelete(row.machine_operate_id);
    },
    beforedelete(param) {
      let userid_arr = [];
      this.multipleSelection.forEach(item => {
        userid_arr.push(item.machine_group_id);
      });
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/admin_api/machine.machine_group/deleteMachineGroup`,
          {
            machine_group_id: userid_arr
          }
        )
        .then(res => {
          this.msg = res.data.msg;
          this.remindervisible = true;
          console.log(this.msg);
          if (res.data.ret == 0) {
            this.changepage(this.currentpage, this.pagesize, this.keyword);
          }
        });
    },
    tabRowClassName({ row, rowIndex }) {
      let index = rowIndex;
      if (index % 2 == 0) {
        return "warning-row";
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    changepage(currentpage, pagesize, keyword) {
      // this.loading=true;
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/admin_api/machine.machine_group/getMachineGroupList`,
          {
            page: currentpage,
            size: pagesize,
            keyword: keyword
          }
        )
        .then(res => {
          // this.loading=false;
          if (res.data.ret == 0) {
            this.pagetotal = res.data.data.total;
            this.tableData = [...res.data.data.data];
            this.tableData.forEach(item => {
              if (Array.isArray(item.machine_list)) {
                item.machinelist = item.machine_list.map(item => {
                  return item.name;
                });
                item.machinelist = item.machinelist.toString();
                // item.machinelist=item.machine_list.join('');
              }
            });
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
  }
};
</script>

<style lang="scss">
.remote_control_records {
  padding: 0 50px 50px 50px;
  .el-dialog {
    p.thick {
      margin-bottom: 10px;
    }
    .el-dialog__header {
      background: #edf1f4;
    }
    .el-dialog__body {
      > div:nth-of-type(1) {
        margin-bottom: 15px;
      }
    }
    .el-select {
      width: 100%;
    }
    .el-input__inner {
      /*height: 30px !important;*/
      /*margin-bottom: 10px;*/
    }
    .el-input__icon {
      line-height: 30px;
    }
    .el-dialog__footer {
      padding-top: 0;
      .dialog-footer {
        display: flex;
        width: 100%;
        justify-content: space-between;
        button {
          cursor: pointer;
          width: 45%;
          line-height: 40px;
          font-size: 16px;
          height: 40px;
          box-sizing: border-box;
          background: #edf1f4;
          border: 1px solid #b7b7b7;
          border-radius: 5px;
          color: #515153;
          text-align: center;
          /*margin-right: 20px;*/
        }
        button:nth-of-type(2) {
          border: 0;
          color: white;
          background: url(../../../static/add-disable.png) no-repeat;
          background-size: cover;
          /*;*/
        }
      }
    }
  }

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
  .el-checkbox__inner::after {
    /*height: 14px;*/
    /*width: 14px;*/
  }
  .el-table-column--selection .cell {
    padding-right: 10px;
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
    .cell {
      /*display: flex;*/
      /*justify-content: space-around;*/
    }
    span {
      color: #2abee2;
      text-decoration: underline;
      cursor: pointer;
    }
    span:nth-of-type(1) {
      margin-right: 20px;
    }
  }

  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    /*border-color:white;*/
    background: #2abee2;
    border-color: #2abee2;
  }

  /*.is-checked .el-checkbox__inner::after{*/
  /*  box-sizing: content-box;*/
  /*  content: "";*/
  /*  border: 1px solid #FFF;*/
  /*  border-left: 0;*/
  /*  border-top: 0;*/
  /*  height: 7px;*/
  /*  left: 4px;*/
  /*  position: absolute;*/
  /*  top: 1px;*/
  /*}*/

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
      @media (max-width: 1024px) {
        section {
          width: 100px;
          margin-right: 10px;
        }
      }
    }
    div.nav_right {
      display: flex;
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
      div {
        flex: 1;
      }
    }
  }
  main {
    padding: 20px 20px 20px 0;
    .el-table thead {
      /*color:black;*/
    }
    /*margin-top: 60px;*/
    /*width: 100%;*/
    /*  padding: 0;*/
    /*  border: 1px solid #EBEEF5;*/
  }
}
</style>
