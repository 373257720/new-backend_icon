<template>
  <div class="pagemodel">
    <div class="pagevue">
      <el-pagination v-if="pagenum>0"
        @current-change="handleCurrentChange"
        :current-page="currentpages"
        :page-size="pagesizes"
        layout="total,prev, pager, next, jumper"
        :total="pagenum" :pager-count="5"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: ["pagenum", "currentpages", "pagesizes"],
  name: "pagevue",
  data() {
    return {
      // isexport:false,
    };
  },
  created() {
  },
  methods: {
    childtodad(data){
      // this.$emit("passtoparent");
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // this.currentpages = val;
      var obj = {};
      obj.pagesize = this.pagesizes;
      obj.currentpage = val;
      // let query=Object.assign({},this.$route.query,obj)
      // this.$router.push({query})
      // console.log(query1)
      this.$emit("fromchildren", obj);
    }
  }
};
</script>

<style lang='scss' scoped>
.pagemodel{
  width:100%;
  height:50px;
  display: flex;
  /*position: relative;*/
  justify-content: center;
  align-items: center;
  /*margin-bottom: 100px;*/
  .pagevue {
    margin-right: 20px;
  }
  .export{
    color: #2ab4e5;
    /*justify-self:flex-end;*/
    /*justify-items:end;*/
    text-decoration: underline;
    cursor: pointer;
    justify-items: flex-end;
    /*align-items: end;*/
    /*position: absolute;*/
    /*right:50px;*/
  }
}

</style>
