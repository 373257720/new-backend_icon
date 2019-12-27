<template>
  <div class="error_log">
    <!--    <header><h2>CUSTOMERS DATAS</h2></header>-->
    <header><h2>
      <span>Audit Logs</span>
      <i class="el-icon-arrow-right"></i>
      <span>Error Logs</span>
    </h2>
    </header>
    <nav>
      <div class="nav_left">
        <section @click="alldelete">Delete</section>
<!--        <section @click="alledit(2)">Export</section>-->
      </div>
      <div class="nav_right">
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
        <span class="keyword">keyword:</span>
        <el-input
          placeholder="Machine Name"
          v-model="keyword"
          clearable>
        </el-input>
        <i @click="searcher"  class="el-icon-search"></i>
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
          <template slot-scope="scope">{{ scope.row.user_machine_error_id}}</template>
        </el-table-column>
        <el-table-column
          label="Machine Name"
          align="center">
          <template slot-scope="scope">{{ scope.row.machine_name}}</template>
        </el-table-column>
        <el-table-column
          prop="level"
          align="center"
          label="Error Level"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          label="Error Type"
          prop="category_name"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="content"
          align="center"
          label="Details"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="create_time"
          align="center"
          label="Date"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column  align="center" label="OPERATION"  class-name="edit" width="150">
          <template slot-scope="scope">
            <span  @click="handleDelete(scope.$index, scope.row)">Delete</span>
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
      alldelete(){
        console.log(this.multipleSelection)
        let userid_arr=[];
        this.multipleSelection.forEach(item=>{
          userid_arr.push(item.user_machine_error_id)
        })
        this.beforedelete(userid_arr);
      },
      handleDelete(index, row) {
        this.beforedelete(row.user_machine_error_id);
      },
      beforedelete(param){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$global.post_encapsulation(`${this.$baseurl}/admin_api/machine.user_machine_error/deleteUserMachineError`,{
            token:this.$store.state.token,
            user_machine_error_id: param,
          })
            .then(res => {
              console.log(res);
              if(res.data.ret==0){
                if(this.timerange==null){
                  this.changepage(this.currentpage, this.pagesize,this.keyword,'','');
                }else{
                  this.changepage(this.currentpage, this.pagesize,this.keyword,this.timerange[0],this.timerange[1]);
                }
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }
            });
        }).catch(() => {
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
        this.$global.get_encapsulation(`${this.$baseurl}/admin_api/machine.user_machine_error/getUserMachineErrorList`,{
          token: this.$store.state.token,
          page: currentpage,
          size:pagesize,
          keyword:keyword,
          start_time:starttime,
          end_time:endtime,
        })
          .then(res => {
            if(res.data.ret==0){
              // console.log(res)
              this.pagetotal=res.data.data.total;
              this.tableData=[...res.data.data.data];
              this.tableData.forEach(item=>{
                item.create_time=this.$global.timestampToTime(item.create_time);
              })
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
  .error_log{
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
