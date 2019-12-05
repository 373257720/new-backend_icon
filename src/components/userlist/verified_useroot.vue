<template>
  <div>
    <el-main>
      <el-table
        :data="tableData.slice(pagesize*(currentpage-1),pagesize*currentpage)"
        border
        style="width:100%;"
      >
        <el-table-column prop="optTime" label="验证时间"  align="center"></el-table-column>
        <el-table-column prop="bslEmail" label="注册邮箱" align="center"></el-table-column>
        <el-table-column prop="userCountryCh" label="国籍" align="center"></el-table-column>
        <el-table-column prop="newname" label="名称" min-width align="center">
        
        </el-table-column>
        <el-table-column prop="createTime" label="注册时间" align="center"></el-table-column>
        <el-table-column prop="projectstatus" label="验证状态" align="center"></el-table-column>
        <el-table-column  label="操作"  align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <!-- <el-button type="text" size="small">删除</el-button> -->
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
      currentpage: 1,
      pagesize: 6,
      pagetotal: null,
      tableData: []
    };
  },
  created() {
    this.changepage(this.currentpage, this.pagesize);
  },
  methods: {
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

<style>
</style>