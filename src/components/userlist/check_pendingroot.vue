<template>
  <div>
    <el-main>
      <el-table
        :data="tableData.slice(pagesize*(currentpage-1),pagesize*currentpage)"
        border
        style="width:100%;"
      >
        <el-table-column fixed prop="createTime" label="注册时间" align="center"></el-table-column>
        <el-table-column prop="userType" label="类型"  align="center"></el-table-column>
        <el-table-column prop="bslEmail" label="注册邮箱" min-width align="center"></el-table-column>
        <el-table-column prop="screateTime" label="提交时间" align="center"></el-table-column>
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
        url: `${this.$baseurl}/bsl_admin_web/user/getUserAuthList?optStatus=0&pageIndex=${currentpage}&pageSize=${pagesize}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.tableData = [...res.data.data.lists];
        console.log(this.tableData);
        this.tableData.forEach(item => {
          item.createTime = item.createTime
            ? this.$global.timestampToTime(item.createTime)
            : "";
          item.screateTime = item.screateTime
            ? this.$global.timestampToTime(item.screateTime)
            : "-";
          if (item.userType) {
            if (item.userType == 1) {
              item.userType = "项目方";
            } else if (item.userType == 4) {
              item.userType = "投资方中介";
            } else if (item.userType == 3) {
              item.userType = "投资方";
            }
          }
        });

        var rescode = res.data.resultCode;
        this.pagetotal = res.data.data.pageTotal;
      });
    },
    handleClick(row) {
      this.$router.push({
        name: "check",
        query: { idx: row.userId, userIdentityType: row.userIdentityType }
      });
      // this.$router.push("usercheck");
    },
    fromchildren1(data) {
      this.changepage(data.currentpage, data.pagesize);
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == "check") {
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
