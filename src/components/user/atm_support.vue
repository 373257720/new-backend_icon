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
        <span>keyword:</span>
        <el-input
          placeholder="请输入内容"
          v-model="input"
          clearable>
        </el-input>
      </div>

    </nav>
    <el-main>
      <el-table
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
          width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          label="Account"
          align="center"
          width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          label="Email"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          label="Phone"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
        prop="address"
        align="center"
        label="State"
        show-overflow-tooltip>
      </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          label="Creation time"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column  align="center" label="operation">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">Disable</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Edit</el-button>
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
      multipleSelection: []
    };
  },
  created() {
    // this.changepage(this.currentpage, this.pagesize);
  },
  methods: {
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
    margin :0 0 0 60px;
  header{
    position: relative;
    height: 136px;
    border-bottom: 1px solid #d3d3d3;
  h2{
    font-size: 18px;
    position: absolute;
    bottom:0;
  }
  }
    nav{
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      div{
        display: flex;
        width: 300px;
        /*justify-content: space-between;*/
        section{
          width: 100px;
          background: red;
          margin-right: 20px;
        }
      }
    }
  main{
    /*margin-top: 60px;*/
    width: 100%;

  }
  }
</style>
