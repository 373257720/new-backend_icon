<template>
  <div class="atm_supportlist">
    <header>
      <h2>{{$t('user.AtmTechnicalSupport')}}</h2>
    </header>
    <nav>
      <div>
        <section @click="$routerto('account_setting',{type:1})">{{$t('common.Add')}}</section>
        <section @click="alledit(1)">{{$t('promotion.Enable')}}</section>
        <section @click="alledit(2)">{{$t('promotion.Disable')}}</section>
      </div>
      <div>
        <span class="keyword">{{$t('common.Keyword')}}:</span>
        <el-input :placeholder="$t('common.IDAccountNickname')" v-model="keyword" clearable></el-input>
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" width="55"></el-table-column>
        <el-table-column label="ID" align="center" width="100">
          <template slot-scope="scope">{{ scope.row.atm_user_id}}</template>
        </el-table-column>
        <el-table-column
          prop="username"
          align="center"
          :label="$t('user.Account')"
          width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="nickname"
          align="center"
          :label="$t('user.Nickname')"
          width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="status_lable"
          align="center"
          :label="$t('user.State')"
          width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="email"
          align="center"
          :label="$t('user.Email')"
          width="250"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="mobile"
          align="center"
          :label="$t('user.Phone')"
          width="200"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="create_time"
          align="center"
          :label="$t('user.CreationTime')"
          width="200"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          width="200"
          fixed="right"
          align="center"
          :label="$t('common.Operation')"
          class-name="edit"
        >
          <template slot-scope="scope">
            <span
              class="left"
              @click="handleEdit(scope.$index, scope.row)"
            >{{scope.row.status==1?$t('promotion.Disable'):scope.row.status==2?$t('promotion.Enable'):$t('promotion.Disable')}}</span>
            <span @click="handleDelete(scope.$index, scope.row)">{{$t('common.Edit')}}</span>
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
  name: "atm_supportlist",
  data() {
    return {
      msg: "",
      remindervisible: false,
      // centerDialogVisible: false,
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
    this.changepage(this.currentpage, this.pagesize);
  },
  activated() {
    if (this.$route.params.editSuccess) {
      this.changepage(this.currentpage, this.pagesize);
    }
  },
  methods: {
    searcher() {
      this.changepage(this.currentpage, this.pagesize, this.keyword);
    },
    alledit(num) {
      let userid_arr = [];
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach(item => {
          userid_arr.push(item.atm_user_id);
        });
        this.$global
          .post_encapsulation(
            `${this.$axios.defaults.baseURL}/admin_api/user.atm_user/editAtmUserStatus`,
            {
              atm_user_id: userid_arr,
              status: num
            }
          )
          .then(res => {
            // this.msg=res.data.msg;
            // this.remindervisible=true;
            this.$message(res.data.msg);
            if (res.data.ret == 0) {
              this.changepage(this.currentpage, this.pagesize);
            }
          });
      } else {
        this.$message({
          message: this.$t("common.PleaseSelect"),
          type: "warning"
        });
      }
    },
    handleEdit(index, row) {
      // console.log(index, row);
      let tostatus;
      if (row.status == 1) {
        tostatus = 2;
      } else if (row.status == 2) {
        tostatus = 1;
      }
      // console.log(row.status);
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/admin_api/user.atm_user/editAtmUserStatus`,
          {
            atm_user_id: row.atm_user_id,
            status: tostatus
          }
        )
        .then(res => {
          // console.log(res)
          if (res.data.ret == 0) {
            if (row.status == 1) {
              this.tableData[index].status = 2;
              this.tableData[index].status_lable = this.$t("user.Ban");
            } else if (row.status == 2) {
              this.tableData[index].status = 1;
              this.tableData[index].status_lable = this.$t("user.Normal");
            }
            // this.msg=res.data.msg;
            // this.remindervisible=true;
            this.$message(res.data.msg);
          }
        });
    },
    handleDelete(index, row) {
      this.$routerto("account_setting", {
        type: 2,
        atm_user_id: row.atm_user_id
      });
    },
    tabRowClassName({ row, rowIndex }) {
      let index = rowIndex;
      if (row.status == 2) {
        return "ban-row";
      } else if (index % 2 == 0) {
        return "warning-row";
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    changepage(currentpage, pagesize, keyword) {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/admin_api/user.atm_user/getAtmUserList`,
          { page: currentpage, size: pagesize, keyword: keyword, lang: "en-us" }
        )
        .then(res => {
          if (res.data.ret == 0) {
            this.pagetotal = res.data.data.total;
            this.tableData = [...res.data.data.data];
            this.tableData.forEach(item => {
              item.status_lable =
                item.status == 1 ? this.$t("user.Normal") : this.$t("user.Ban");
              item.create_time = this.$global.timestampToTime(item.create_time);
            });
          }
        })
        .catch(error => {});
    },
    fromchildren1(data) {
      // console.log(data)
      this.currentpage = data.currentpage;
      this.changepage(data.currentpage, data.pagesize);
    }
  }
};
</script>

<style lang="scss">
/*.el-icon-info:before{*/
/*  content: "\e79c";*/
/*}*/
.atm_supportlist {
  padding: 0 50px 50px 50px;
  .el-table__body tr.hover-row > td {
    background-color: #dcdfe6;
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
  .el-table {
    color: #7a7a7a;
  }
  .el-checkbox__inner {
    border-radius: 50%;
    /*background: ;*/
    /*background: red;*/
    /*border-color: red;*/
  }
  .el-table .ban-row {
    /*background:#EDF1F4;*/
    /*opacity: 0.5;*/
    background: #dcdfe6;
  }
  .el-table .warning-row {
    /*background:#EDF1F4;*/
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
    > div {
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
        /*border: 1px solid #d3d3d3;*/
        /*background: red;*/
        margin-right: 20px;
      }
      span.keyword {
        line-height: 40px;
        display: block;
        width: 120px;
        color: #777777;
        text-align: center;
        margin-right: 10px;
      }
      i {
        height: 40px;
        /*width: 40px;*/
        cursor: pointer;
        margin-left: 20px;
        font-size: 22px;
        line-height: 40px;

        /*height: 40px;*/
        text-align: center;
      }
    }
  }
  @media (max-width: 1024px) {
    nav {
      padding: 0px;
      > div {
        section {
          width: 80px;
          margin-right: 10px;
        }
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
@media (max-width: 768px) {
  .atm_supportlist {
    padding: 0 30px 30px 30px;
    nav {
      flex-wrap: wrap;
      margin: 20px 0 0 0;
      padding: 0;
      div:nth-of-type(2) {
        margin-top: 10px;
      }
    }
  }
}
</style>
