<template>
  <div class="alerts_details">
    <!--    <header><h2>CUSTOMERS DATAS</h2></header>-->
    <header><h2>
      <span>Alerts</span>
            <i class="el-icon-arrow-right"></i>
      <span>Details</span>
    </h2>
    </header>
    <nav>
      <div class="nav_right">
        <span class="keyword" @click="$routerto('alerts_lists')" ><i class="el-icon-d-arrow-left"></i>Return</span>
      </div>
    </nav>
    <el-main>
      <div>
        <p><i></i>{{title}}</p>
        <footer>{{create_time}}</footer>
      </div>
      <article v-html="content">

      </article>

    </el-main>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        pictLoading:false,
        title:'',
        content:'',
        create_time:''
      };
    },
    created() {

      this.changepage();
    },
    methods: {

      changepage() {
        // this.pictLoading=true;
        this.$global.get_encapsulation(`${this.$baseurl}/admin_api/content.notice/getNoticeInfo`,{
          token: this.$store.state.token,
          notice_id:this.$route.query.notice_id,
        })
          .then(res => {
            if(res.data.ret==0){
              console.log(res)
              this.title=res.data.data.title;
              this.create_time=this.$global.timestampToTime(res.data.data.create_time);
              this.content=res.data.data.content;
              // this.pictLoading=false
              // console.log(this.tableData)
            }
          })
          .catch(error => {});
      },


    },
    watch: {

    }
  };
</script>

<style lang="scss">
  .alerts_details{
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
    nav{
      display: flex;
      margin: 20px 0 0 0 ;
      div.nav_right{
        cursor: pointer;
        color:#2AB4E5;
        .el-icon-d-arrow-left{
            margin-right: 5px;
        }
      }

    }
    main{
      width: 80%;
      padding:20px 20px 20px 20px;
      font-size: 14px;
      color: #787878;
      p{
        color: black;
        font-size: 16px;
        margin-bottom: 18px;
        font-weight: 600;
      }
      footer{
        margin-bottom: 18px;
      }
    }
  }
</style>
