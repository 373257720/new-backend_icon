<template>
  <div class="pagemodel">
    <div class="pagevue">
      <el-pagination v-if="pagenum!=0"
        @current-change="handleCurrentChange"
        :current-page="currentpages"
        :page-size="pagesizes"
        layout="total,prev, pager, next, jumper"
        :total="pagenum" :pager-count="5"
      ></el-pagination>
    </div>
    <div class="export" @click="childtodad" v-if="isexport">export </div>
  </div>
</template>
<script>
export default {
  props: ["pagenum", "currentpages", "pagesizes"],
  name: "pagevue",
  data() {
    return {
      isexport:false,
      // currentPage: 1,
      // pagesize: 1,
    };
  },
  created() {
    console.log()
    if(this.$route.name=='transaction_lists' || this.$route.name=='report_lists' || this.$route.name=='report_crytocurrency'){
      this.isexport=true;
    }
  },

  // watch: {
  //   $route: {
  //     handler: function(val, oldVal){
  //       console.log(val);
  //       // if(val)
  //     },
  //     // 深度观察监听
  //     deep: true
  //   }
  //   //  pagenum:function(addd,oldd){
  //   //    console.log(addd,oldd);
  //   //  }
  // },
  methods: {
    childtodad(data){
      this.$emit("passtoparent");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPag = val;
      var obj = {};
      obj.pagesize = this.pagesizes;
      obj.currentpage = val;
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
  margin-bottom: 100px;
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
