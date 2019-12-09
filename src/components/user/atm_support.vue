<template>
  <div class="ATM_Technical_Support">
    <header><h2>ATM Technical Support</h2></header>
    <nav>
      <div>
          <section>Add</section>
        <section>Enable</section>
        <section>Disable</section>
      </div>
      <div>
        <span class="keyword">keyword:</span>
        <el-input
          placeholder="请输入内容"
          v-model="input"
          clearable>
        </el-input>
        <i class="el-icon-search"></i>
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
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          align="center"
          label="ID"
          width="55">
        </el-table-column>
        <el-table-column
          label="ID"
          align="center"
         >
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column
          label="Account"
          align="center">
          <template slot-scope="scope">{{ scope.row.account}}</template>
        </el-table-column>
        <el-table-column
          prop="email"
          align="center"
          label="Email"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="phone"
          align="center"
          label="Phone"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
        prop="state"
        align="center"
        label="State"
        show-overflow-tooltip>
      </el-table-column>
        <el-table-column
          prop="creationtime"
          align="center"
          label="Creation time"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column  align="center" label="operation"  class-name="edit" width="200">
          <template slot-scope="scope">
            <span   @click="handleEdit(scope.$index, scope.row)">Disable</span>
            <span  @click="handleDelete(scope.$index, scope.row)">Edit</span>
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
      ischeck: false,
      input:'',
      currentpage: 1,
      pagesize: 6,
      pagetotal: null,
      tableData: [
        {
          id: "2016-05-02",
          account: "王小虎",
         email: "上海",
          phone: "普陀区",
          state: "上海市普陀区金沙江路 1518 弄",
          creationtime:'1111',
        },
        {
          id: "2016-05-02",
          account: "王小虎",
          email: "上海",
          phone: "普陀区",
          state: "上海市普陀区金沙江路 1518 弄",
        },     {
          id: "2016-05-02",
          account: "王小虎",
          email: "上海",
          phone: "普陀区",
          state: "上海市普陀区金沙江路 1518 弄",
        },     {
          id: "2016-05-02",
          account: "王小虎",
          email: "上海",
          phone: "普陀区",
          state: "上海市普陀区金沙江路 1518 弄",
        },     {
          id: "2016-05-02",
          account: "王小虎",
          email: "上海",
          phone: "普陀区",
          state: "上海市普陀区金沙江路 1518 弄",
        },     {
          id: "2016-05-02",
          account: "王小虎",
          email: "上海",
          phone: "普陀区",
          state: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      multipleSelection: []
    };
  },
  created() {
    // this.changepage(this.currentpage, this.pagesize);
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    tabRowClassName({row,rowIndex}){
      let index = rowIndex;
      if(index %2 == 0){
        return 'warning-row'
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
    changepage(currentpage, pagesize) {
      this.$axios({
        method: "get",
        url: `${this.$baseurl}/bsl_admin_web/user/getUserAuthList?optStatus=1&pageIndex=${currentpage}&pageSize=${pagesize}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.tableData = [...res.data.data.lists];
        console.log(this.tableData);

        this.tableData.forEach(item => {

          if(item.userIdentityType==1){
              item.newname=item.userName;
          }else if(item.userIdentityType==2){
            item.newname=item.userCompanyCh;
          }
          item.createTime = item.createTime
            ? this.$global.timestampToTime(item.createTime)
            : "-";
          item.optTime = item.optTime
            ? this.$global.timestampToTime(item.optTime)
            : "-";
          if (item.optStatus === 1) {
            item.projectstatus = "审核通过";
          } else if (item.optStatus === 2) {
            item.projectstatus = "审核不通过";
          }
        });

        var rescode = res.data.resultCode;
        this.pagetotal = res.data.data.pageTotal;
      });
    },
    handleClick(row) {
      this.$router.push({
        name: "usercheck",
        query: { idx: row.userId, userIdentityType: row.userIdentityType }
      });
      // this.$router.push("/home/userlist/verified_user/usercheck");
    },
    fromchildren1(data) {
      this.changepage(data.currentpage, data.pagesize);
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
  .ATM_Technical_Support{
    margin :0 0 0 50px;
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
      span:nth-of-type(1){
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
          border-radius: 5px;
          text-align: center;
          box-sizing: border-box;
          border: 1px solid #d3d3d3;
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
