<template>
  <div class="machine_connect">
<!--    <header><h2>CUSTOMERS DATAS</h2></header>-->
    <header><h2>
      <span>Audit Logs</span>
      <i class="el-icon-arrow-right"></i>
      <span>Machine Connect Status</span>
    </h2>
    </header>
    <nav>
<!--      <div class="nav_left">-->
<!--        <section @click="alledit(1)">Delete</section>-->
<!--        <section @click="alledit(2)">Export</section>-->
<!--      </div>-->
      <div class="nav_right">
        <div>
          <span class="keyword" >Time:</span>
          <el-date-picker
            v-model="timerange"
            type="daterange"
            range-separator="to"
            value-format="yyyy-MM-dd"
            start-placeholder="Start"
            end-placeholder="End"
          >
          </el-date-picker>
        </div>
        <div>
          <span class="keyword">Keyword:</span>
          <el-input
            placeholder="Machine Name"
            v-model="keyword"
            clearable>
          </el-input>
          <i @click="searcher"  class="el-icon-search"></i>
        </div>
      </div>
    </nav>
    <el-main v-loading="pictLoading">
      <el-table
        :row-class-name="tabRowClassName"
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          label="Machine Name"
          align="center">
          <template slot-scope="scope">{{ scope.row.machine_name}}</template>
        </el-table-column>
        <el-table-column
          prop="serial_number"
          align="center"
          label="Serial Number"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="create_time"
          align="center"
          label="Date"
          show-overflow-tooltip>
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
        // centerDialogVisible: false,
        timerange:null,
        ischeck: false,
        keyword:'',
        currentpage: 1,
        pagesize: 10,
        pagetotal: null,
        tableData: [],
        multipleSelection: []
      };
    },
    created() {
      this.searcher();
      // this.changepage(this.currentpage, this.pagesize,this.keyword,this.timerange[0],this.timerange[1]);
    },
    methods: {
      searcher(){
        this.currentpage=1;
        if(this.timerange==null){
          this.changepage(this.currentpage, this.pagesize,this.keyword,'','');
        }else{
          this.changepage(this.currentpage, this.pagesize,this.keyword,this.timerange[0],this.timerange[1]);
        }
      },
      open() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$axios
          //   .post(
          //     `${this.$baseurl}/admin_api/user.front_user/editUserStatus`,
          //     { params:{
          //         token: this.$store.state.token,
          //         user_id: currentpage,
          //         status:2
          //       }
          //     },
          //     {
          //       headers: {
          //         "Content-Type": "application/x-www-form-urlencoded"
          //       }
          //     }
          //   )

          this.$global.post_encapsulation(`${this.$baseurl}/admin_api/user.front_user/editUserStatus`,
            {
              user_id: currentpage,
              status:2
            })
            .then(res => {
            console.log(res);
            // if(res.data.ret==0){
            //   this.pagetotal=res.data.data.total;
            //   this.tableData=[...res.data.data.data];
            //   // console.log(this.tableData)
            // }
          });
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        }).catch(() => {

        });
      },
      alledit(num){
        console.log(this.multipleSelection)
        let userid_arr=[];
        this.multipleSelection.forEach(item=>{
          userid_arr.push(item.user_id)
        })
        // this.$axios({
        //   method: 'post',
        //   url: `${this.$baseurl}/admin_api/user.front_user/editUserStatus`,
        //   data: {
        //     token:this.$store.state.token,
        //     user_id: userid_arr,
        //     status:num,
        //   }
        // })

        this.$global.post_encapsulation(`${this.$baseurl}/admin_api/user.front_user/editUserStatus`,
          {
            user_id: userid_arr,
            status:num,
          })
          .then(res => {
          console.log(res);
          if(res.data.ret==0){
            this.changepage(this.currentpage, this.pagesize);
          }
        });
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
      changepage(currentpage, pagesize,keyword,starttime,endtime) {
        this.pictLoading=true;
        this.$global.get_encapsulation(`${this.$baseurl}/admin_api/machine.communication/getCommunicationList`,{
          page: currentpage,
          size:pagesize,
          keyword:keyword,
          start_time:starttime,
          end_time:endtime,
        })
          .then(res => {
            if(res.data.ret==0){
              console.log(res)
              this.pagetotal=res.data.data.total;
              this.tableData=[...res.data.data.data];
              this.tableData.forEach(item=>{
                item.create_time=this.$global.timestampToTime(item.create_time);
              })
              this.pictLoading=false
              // console.log(this.tableData)
            }
          })
          .catch(error => {});
      },
      handleClick(row) {
        this.$router.push({
          name: "usercheck",
          query: { idx: row.userId, userIdentityType: row.userIdentityType }
        });
        // this.$router.push("/home/userlist/verified_user/usercheck");
      },
      fromchildren1(data) {
        // console.log(data)
        this.currentpage=data.currentpage;
        if(this.timerange==null){
          this.changepage(this.currentpage, this.pagesize,this.keyword,'','');
        }else{
          this.changepage(this.currentpage, this.pagesize,this.keyword,this.timerange[0],this.timerange[1]);
        }
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
  .machine_connect{
    padding :0 50px 50px 50px;
    header{
      position: relative;
      height: 80px;
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
      div.nav_left{
        display: flex;
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
          margin-right: 20px;
        }
      }
      div.nav_right{
        display: flex;
        >div{
          display: flex;
        }
        i.el-icon-search{
          height: 40px;
          /*width: 40px;*/
          cursor: pointer;
          margin-left: 20px;
          font-size: 22px;
          line-height: 40px;
          text-align: center;
        }
        span.keyword{
          line-height: 40px;
          color: #777777;
          text-align: center;
          margin: 0 20px;
        }
        div{
          flex:1;
        }
      }

    }
    @media (max-width: 1024px){
      nav{
        display: flex;
        margin: 20px 0 0 0 ;
        justify-content: space-between;
        padding: 0;
        div.nav_right{
          display: flex;
          flex-wrap: wrap;
          div.el-date-editor--daterange{
            width: 250px;
            flex: initial;
          }
          div.el-input--suffix{
            width: 150px;
            flex: initial;
          }
          div:nth-of-type(2){
            margin-top: 10px;
          }
        }


      }
    }
    @media (max-width: 768px){
      nav{
      }
    }
    main{
      padding:20px 20px 20px 0;
      .el-table thead{
        /*color:black;*/
      }
      /*margin-top: 60px;*/
      /*width: 100%;*/
      /*  padding: 0;*/
      /*  border: 1px solid #EBEEF5;*/

    }
  }
</style>
