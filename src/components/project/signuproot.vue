<template>
  <div>
    <el-main>
      <el-table :data="tableData.slice(6*(bobo-1),6*bobo)" border style="width:80%;">
        <el-table-column fixed prop="date" label="注册时间" width="150"></el-table-column>
        <el-table-column prop="name" label="用户名称" width="120"></el-table-column>
        <el-table-column prop="province" label="国籍" width="120"></el-table-column>
        <el-table-column prop="city" label="公司名称" min-width></el-table-column>
        <el-table-column prop="address" label="验证时间" width="200"></el-table-column>
        <el-table-column prop="zip" label="验证状态" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <pagevue :pagenum="tableData.length" v-on:fromchildren="fromchildren1"></pagevue>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row);
      this.$router.push("/home/project/signedup/signedup_check");
    },
    fromchildren1(data) {
      this.bobo = data;
      // console.log(data);
    }
  },
  data() {
    return {
      bobo: 1,
      ischeck: false,
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
      ]
    };
  },
  watch: {
    $route(to, from) {
      if (to.name == "signedup_check") {
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
