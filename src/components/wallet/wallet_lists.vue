<template>
  <div class="wallet">
    <header>
      <h2>{{$t("WalletSetting.Wallet")}}</h2>
    </header>
    <nav></nav>
    <!--    v-loading="pictLoading"-->
    <el-main>
      <el-table
        :row-class-name="tabRowClassName"
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
      >
        <el-table-column label="Crypto Currency" align="center" width="150">
          <template slot-scope="scope">{{ scope.row.coin_type}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('promotion.Walletaddress')"
          width="200"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.address}}</template>
        </el-table-column>
        <el-table-column
          prop="balance"
          align="center"
          width="200"
          :label="$t('WalletSetting.AccountBalance')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="platform"
          width="200"
          :label="$t('WalletSetting.HedgePlatform')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="coin_number"
          align="center"
          :label="$t('WalletSetting.HedgeBalance')"
          width="200"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="interval_time"
          align="center"
          width="200"
          :label="$t('WalletSetting.HedgeInterval')"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          align="center"
          :label="$t('WalletSetting.APIParameter')"
          width="200"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row.api_parameter?JSON.parse(scope.row.api_parameter).key+','+JSON.parse(scope.row.api_parameter).secret:'-'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          align="center"
            :label="$t('common.Operation')"
          class-name="edit"
          min-width="200"
        >
          <template slot-scope="scope">
            <span @click="handleedit(scope.$index, scope.row)">{{$t('common.Edit')}}</span>
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
  </div>
</template>

<script>
export default {
  name: "wallet_lists",
  data() {
    return {
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
    handleedit(index, row) {
      // console.log(index, row);
      this.$routerto("wallet_edit", { coin_type: row.coin_type });
    },
    tabRowClassName({ row, rowIndex }) {
      let index = rowIndex;
      if (index % 2 == 0) {
        return "warning-row";
      }
    },
    changepage(currentpage, pagesize) {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/admin_api/content.hedge_config/getHedgeConfigList`,
          {
            page: currentpage,
            size: pagesize
          }
        )
        .then(res => {
          if (res.data.ret == 0) {
            this.pagetotal = res.data.data.total;
            this.tableData = [...res.data.data.data];
            // console.log(this.tableData);
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
.wallet {
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
    > div {
      display: flex;
      /*width: 300px;*/
      /*justify-content: space-between;*/
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
  main {
    padding: 20px 20px 20px 0;
    /*height: 100%;*/
    /*width: 100%;*/
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
