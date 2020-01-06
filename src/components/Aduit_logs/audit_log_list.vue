<template>
  <div class="audit_log">
    <header><h2>Audit Logs</h2></header>
    <el-main>
      <el-table
        ref="multipleTable"
        border
        :show-header="status"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          align="center"
          width="350"
          class-name="pic"
        >
          <template slot-scope="scope">
            <img :src="scope.row.pic" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column  align="center"  class-name="edit" width="350">
          <template slot-scope="scope">
<!--            <span>{{}}</span>-->
            <span   @click="view(scope.$index, scope.row)">View</span>
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
        status:false,
        ischeck: false,
        input:'',
        currentpage: 1,
        pagesize: 6,
        pagetotal: null,
        tableData: [
          {
            address: "Cashbox Logs",
            pic:'./static/Cashbox Logs.png'
          },
          {
            address: "Machine Connect Status",
            pic:'./static/Machine Connect Status.png'
          },

          {
            address: "Error Logs",
            pic:'./static/Error Logs.png'
          },
        ],
        multipleSelection: []
      };
    },
    created() {
      // this.changepage(this.currentpage, this.pagesize);
    },
    methods: {
      view(index, row) {
        if(index==0){
          this.$routerto('cashbox_log')
        }else if(index==1){
          this.$routerto('machine_connect_status')
        }else if(index==2){
          this.$routerto('error_log')
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
  .audit_log{
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
    .el-table td, .el-table th{
      padding: 35px 0;
    }
    .el-table__body tr,
    .el-table__body td {
      padding: 0;
      height: 160px;
    }
    .pic{
      img{
        width: 100px;

      }
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
      padding:70px 20px 20px 0;
      /*margin-top: 60px;*/
      width: 100%;

    }
  }
</style>
