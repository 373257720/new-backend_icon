<template>
  <div class="cashbox_log">
    <header><h2>
      <span @click="$routerto('audit_log')">Audit Logs</span>
      <i class="el-icon-arrow-right"></i>
      <span>Cashbox Logs</span>
    </h2>
    </header>
    <nav>
      <div class="nav_left">
        <section @click="alldelete">Delete</section>
        <section @click="export_excel">Export</section>
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
        <span class="keyword">Keyword:</span>
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
          label="Order ID"
          align="center"
          width="100"
        >
          <template slot-scope="scope">{{ scope.row.order_id}}</template>
        </el-table-column>
        <el-table-column
          label="Machine Name"
          width="200"
          align="center">
          <template slot-scope="scope">{{ scope.row.machine_name}}</template>
        </el-table-column>
        <el-table-column label="CashInbox" align="center">
        <el-table-column
          prop="in_money_before"
          align="center"
          label="ACCOUNT NUMBERS"
          width="100"
          show-overflow-tooltip>
          <template slot="header" slot-scope="scope">
            <div>before</div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="200"
          label="CashInbox Changes"
          prop="in_money_change"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="in_money_after"
          align="center"
          label="STATE"
          width="100"

          show-overflow-tooltip>
          <template slot="header" slot-scope="scope">
            <div>after</div>
          </template>
        </el-table-column>
          </el-table-column>
        <el-table-column label="CashOutbox" align="center">
        <el-table-column
          prop="out_money_before"
          align="center"
          width="100"
          label="CREATION TIME"
          show-overflow-tooltip>
          <template slot="header" slot-scope="scope">
            <div>before</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="out_money_change"
          align="center"
          width="200"
          label="CashOutbox Changes"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="out_money_after"
          align="center"
          label="STATE"
          width="100"
          show-overflow-tooltip>
          <template slot="header" slot-scope="scope">
            <div>after</div>
          </template>
        </el-table-column>
        </el-table-column>
        <el-table-column
          prop="create_time"
          align="center"
          label="Date"
          width="200"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column  align="center" label="Operation"  class-name="edit" width="150">
          <template slot-scope="scope">
            <span  @click="handleDelete(scope.$index, scope.row)">Delete</span>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <dialog_reminder :msg="msg" :remindervisible.sync="remindervisible"></dialog_reminder>
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
    name:'cashbox_log',
    data() {
      return {
        msg:'',
        remindervisible:false,
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
      export_excel(){
        let start_time = this.timerange==null?0:this.timerange[0];
        let end_time = this.timerange==null?0:this.timerange[1];
        window.location.href = `${this.$baseurl}/admin_api/machine.machine_money_log/exportMachineMoneyLog?token=${this.$store.state.token}&keyword=${this.keyword}&start_time=${start_time}&end_time=${end_time}&keyword=${this.keyword}`;

      },
      searcher(){
        this.currentpage=1;
        if(this.timerange==null){
          this.changepage(this.currentpage, this.pagesize,this.keyword,'','');
        }else{
          this.changepage(this.currentpage, this.pagesize,this.keyword,this.timerange[0],this.timerange[1]);
        }
      },
      alldelete(){
        // console.log(this.multipleSelection)
        let userid_arr=[];
        if(this.multipleSelection.length>0){
          this.multipleSelection.forEach(item=>{
            userid_arr.push(item.machine_money_log_id)
          })
          this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            this.beforedelete(userid_arr);
          }).catch(() => {
          });
        }else{
          this.msg="Please select"
          this.remindervisible=true;
        }
      },
      handleDelete(index, row) {
        this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.beforedelete(row.machine_money_log_id);
        }).catch(() => {
        });

      },
      beforedelete(params){
        // console.log(params)
        this.$global.post_encapsulation(`${this.$baseurl}/admin_api/machine.machine_money_log/deleteMachineMoneyLog`,{
          machine_money_log_id: params,
        }).then(res => {
          this.msg=res.data.msg;
          this.remindervisible=true;
          if(res.data.ret==0){
            if(this.timerange==null){
              this.changepage(this.currentpage, this.pagesize,this.keyword,'','');
            }else{
              this.changepage(this.currentpage, this.pagesize,this.keyword,this.timerange[0],this.timerange[1]);
            }
          }
        });
      },
      tabRowClassName({row,rowIndex}){
        let index = rowIndex;
        if(index %2 == 0){
          return 'warning-row'
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      changepage(currentpage, pagesize,keyword,starttime,endtime) {
        this.$global.get_encapsulation(`${this.$baseurl}/admin_api/machine.machine_money_log/getMachineMoneyLogList`,{
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
      fromchildren1(data) {
        this.currentpage=data.currentpage;
        if(this.timerange==null){
          this.changepage(this.currentpage, this.pagesize,this.keyword,'','');
        }else{
          this.changepage(this.currentpage, this.pagesize,this.keyword,this.timerange[0],this.timerange[1]);
        }
      },

    },
    watch: {
      // $route(to, from) {
      //   if (to.name == "usercheck") {
      //     this.ischeck = !this.ischeck;
      //   } else {
      //     this.ischeck = false;
      //   }
      // }
    }
  };
</script>

<style lang="scss">
  .cashbox_log{
    padding :0 50px 50px 50px;
    header{
      position: relative;
      height: 80px;
      border-bottom: 1px solid #d3d3d3;
      h2{
        font-size: 20px;
        position: absolute;
        bottom:20px;
        span{
          cursor: pointer;
        }

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
