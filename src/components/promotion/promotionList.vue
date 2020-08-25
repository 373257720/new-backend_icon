<template>
  <div class="promotion_list">
    <header>
      <h2>{{$t('promotion.Promotion')}}</h2>
    </header>
    <nav>
      <div>
        <section @click="$routerto('promotionAdd',{type:1})">{{$t('promotion.Add')}}</section>
        <section @click="alledit(1)">{{$t('promotion.Enable')}}</section>
        <section @click="alledit(2)">{{$t('promotion.Disable')}}</section>
        <section @click="beforeDelect">{{$t('common.Delete')}}</section>
      </div>
      <div>
        <span class="keyword">{{$t('common.Keyword')}}:</span>
        <el-input placeholder="ID,coin wallet address" v-model="keyword" clearable></el-input>
        <i @click="search" class="el-icon-search"></i>
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
          <template slot-scope="scope">{{scope.row.coin_address_fee_id}}</template>
        </el-table-column>
        <el-table-column
          prop="coin_type"
          align="center"
          :label="$t('promotion.Cointype')"
          width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="coin_address"
          align="center"
          :label="$t('promotion.Walletaddress')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          :label="$t('promotion.Newcommissionrate')"
          width="150"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{scope.row.discount_fee}}%</template>
        </el-table-column>
        <el-table-column
          prop="machine_name_list"
          align="center"
          :label="$t('promotion.MachineList')"
          width="200"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="status_lable"
          align="center"
          :label="$t('promotion.Status')"
          width="250"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="system_fee"
          align="center"
          :label="$t('promotion.Systemfee')"
          width="150"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{scope.row.system_fee+"%"}}</template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          align="center"
          :label="$t('promotion.Creattime')"
          width="200"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          width="300"
          fixed="right"
          align="center"
          :label="$t('common.Operation')"
          class-name="edit"
        >
          <template slot-scope="scope">
            <span
              @click="handleStatus(scope.$index, scope.row)"
            >{{scope.row.status==1?$t('promotion.Disable'):scope.row.status==2?$t('promotion.Enable'):$t('promotion.Disable')}}</span>
            <span @click="handleEdit(scope.$index, scope.row)">{{$t('common.Edit')}}</span>
            <span @click="handleDelete(scope.$index, scope.row)">{{$t('common.Delete')}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <dialogReminder :msg="msg" :remindervisible.sync="remindervisible"></dialogReminder>
    <!-- <confirmDialog :msg="msg" v-on:todad="allDelect" :remindervisible1.sync="remindervisible1"></confirmDialog> -->
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
  name: "PromotionList",
  data() {
    return {
      msg: "",
      remindervisible: false,
      remindervisible1: false,
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
    search() {
      this.changepage(this.currentpage, this.pagesize, this.keyword);
    },
    alldelete(param) {
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/admin_api/user.coin_address_fee/deleteCoinAddressFee`,
          {
            coin_address_fee_id: param
          }
        )
        .then(res => {
          this.$message(res.data.msg);
          if (res.data.ret == 0) {
            this.changepage(this.currentpage, this.pagesize);
          }
        });
    },
    beforeDelect() {
      let coin_address_fee_idArr = [];
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach(item => {
          coin_address_fee_idArr.push(item.coin_address_fee_id);
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
            this.alldelete(coin_address_fee_idArr);
          })
          .catch(() => {});
      } else {
        this.msg = this.$t("common.PleaseSelect");
        this.$message({
          message: this.$t("common.PleaseSelect"),
          type: "warning"
        });
      }
    },
    alledit(num) {
      let coin_address_fee_idArr = [];
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach(item => {
          coin_address_fee_idArr.push(item.coin_address_fee_id);
        });
        this.$global
          .post_encapsulation(
            `${this.$axios.defaults.baseURL}/admin_api/user.coin_address_fee/editCoinAddressFeeStatus`,
            {
              coin_address_fee_id: coin_address_fee_idArr,
              status: num
            }
          )
          .then(res => {
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
    handleStatus(index, row) {
      let tostatus;
      switch (row.status) {
        case 1:
          tostatus = 2;
          break;
        case 2:
          tostatus = 1;
          break;
      }
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/admin_api/user.coin_address_fee/editCoinAddressFeeStatus`,
          {
            coin_address_fee_id: row.coin_address_fee_id,
            status: tostatus
          }
        )
        .then(res => {
          if (res.data.ret == 0) {
            if (row.status == 1) {
              this.tableData[index].status = 2;
              this.tableData[index].status_lable = "Ban";
            } else if (row.status == 2) {
              this.tableData[index].status = 1;
              this.tableData[index].status_lable = "Normal";
            }
            this.$message(res.data.msg);
          }
        });
    },
    handleEdit(index, row) {
      // console.log(this.currentpage, this.pagesize)
      this.$routerto("promotionAdd", {
        type: 2,
        coin_address_fee_id: row.coin_address_fee_id
      });
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
          this.alldelete(row.coin_address_fee_id);
        })
        .catch(() => {});
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
          `${this.$axios.defaults.baseURL}/admin_api/user.coin_address_fee/getCoinAddressFeeList`,
          { page: currentpage, size: pagesize, keyword: keyword }
        )
        .then(res => {
          if (res.data.ret == 0) {
            this.pagetotal = res.data.data.total;
            this.tableData = [...res.data.data.data];
            console.log(this.tableData);
            this.tableData.forEach(item => {
              item.status_lable = item.status == 1 ? "Normal" : "Ban";
              item.create_time = this.$global.timestampToTime(item.create_time);
            });
            // console.log(this.tableData);
          }
        });
    },
    fromchildren1(data) {
      this.currentpage = data.currentpage;
      this.changepage(data.currentpage, data.pagesize);
    }
  }
};
</script>

<style lang="scss">
.promotion_list {
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
  }
  .el-table .ban-row {
    background: #dcdfe6;
  }
  .el-table .warning-row {
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
        /*height: 40px;*/
        color: #777777;
        text-align: center;
        margin-right: 20px;
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
  }
}
@media (max-width: 768px) {
  .promotion_list {
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
