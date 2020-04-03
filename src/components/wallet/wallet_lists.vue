<template>
  <div class="wallet">
    <header><h2>Wallet</h2></header>
    <nav>
    </nav>
    <el-main v-loading="pictLoading">
      <el-table
        :row-class-name="tabRowClassName"
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          label="Crypto Currency"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.coin_type}}</template>
        </el-table-column>
        <el-table-column
          label="Wallet Address"
          align="center">
          <template slot-scope="scope">{{ scope.row.address}}</template>
        </el-table-column>
        <el-table-column
          prop="balance"
          align="center"
          label="Account Balance"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="platform"
          label="Hedge Platform"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="coin_number"
          align="center"
          label="Hedge Balance"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="interval_time"
          align="center"
          label="Hedge Interval(mins)"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          align="center"
          label="API Parameter"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.api_parameter?JSON.parse(scope.row.api_parameter).key+','+JSON.parse(scope.row.api_parameter).secret:'-'}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="Operation"  class-name="edit" width="200">
          <template slot-scope="scope">
            <span  @click="handleedit(scope.$index, scope.row)">Edit</span>
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
    data() {
      return {
        pictLoading:false,
        ischeck: false,
        keyword:'',
        currentpage: 1,
        pagesize: 10,
        pagetotal: null,
        tableData: [
        ],
        multipleSelection: []
      };
    },
    created() {
      this.changepage(this.currentpage, this.pagesize);


    },
    methods: {
      handleedit(index, row) {
        console.log(index, row);
        this.$routerto('wallet_edit',{coin_type:row.coin_type})

      },
      tabRowClassName({row,rowIndex}){
        let index = rowIndex;
        if(index %2 == 0){
          return 'warning-row'
        }
      },
      changepage(currentpage, pagesize) {
        this.pictLoading=true;
        this.$global.get_encapsulation( `${this.$baseurl}/admin_api/content.hedge_config/getHedgeConfigList`,{

                  page: currentpage,
                  size:pagesize,
        })
          .then(res => {
            if(res.data.ret==0){
              this.pagetotal=res.data.data.total;
              this.tableData=[...res.data.data.data];
              console.log(this.tableData)
            }
            this.pictLoading=false
          })
          .catch(error => {});
      },
      fromchildren1(data) {
        // console.log(data)
        this.currentpage=data.currentpage;
        this.changepage(data.currentpage, data.pagesize);
      }
    },
  };
</script>

<style lang="scss">
  .wallet{
    margin :0 0 0 50px;
    width: 90%;
    header{
      position: relative;
      height: 136px;
      border-bottom: 1px solid #d3d3d3;
      h2{
        font-size: 20px;
        position: absolute;
        bottom:20px;
        /*font-weight: 550;*/
      }

    }
    .el-table{
      color:#7A7A7A;
    }
    .el-checkbox__inner{
      border-radius: 50%;
      /*background: ;*/
      /*background: red;*/
      /*border-color: red;*/
    }

    .el-table .warning-row{
      background:#EDF1F4;
    }
    .el-table_1_column_8  .el-button{
      color: #2ABEE2;
    }
    .edit{
      span{
        color: #2ABEE2;
        text-decoration:underline;
        cursor: pointer;
      }
      span.left{
        margin-right: 20px;
      }

    }

    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
      /*border-color:white;*/
      background: #2ABEE2;
      border-color: #2ABEE2;
    }
    .el-checkbox__input.is-focus .el-checkbox__inner{
      border-color:#DCDFE6;
    }
    .el-table td, .el-table th.is-leaf{
      border: 0;
    }
    nav{
      display: flex;
      margin: 20px 0 0 0 ;
      justify-content: space-between;
      padding: 0 50px 0 20px;
      >div{
        display: flex;
        /*width: 300px;*/
        /*justify-content: space-between;*/
        section{
          cursor: pointer;
          width: 120px;
          line-height: 40px;
          height: 40px;
          background:url(../../../static/add-disable.png) no-repeat;
          border-radius: 5px;
          color:white;
          text-align: center;
          box-sizing: border-box;
          /*border: 1px solid #d3d3d3;*/
          /*background: red;*/
          margin-right: 20px;
        }
        span.keyword{
          line-height: 40px;
          /*height: 40px;*/
          color: #777777;
          text-align: center;
          margin-right: 20px;
        }
        i{
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
    main{
      padding:20px 20px 20px 0;
      .el-table thead{
        color:black;
      }
      /*margin-top: 60px;*/
      /*width: 100%;*/
      /*  padding: 0;*/
      /*  border: 1px solid #EBEEF5;*/

    }
  }
</style>
