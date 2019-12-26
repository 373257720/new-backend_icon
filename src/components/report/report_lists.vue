<template>
  <div class="report_lists">
    <header><h2>
    <span @click="$routerto('audit_log')">Reports</span>
<!--    <i class="el-icon-arrow-right"></i>-->
<!--      <span>Cry</span>-->
    </h2>
    </header>
    <nav>
      <div>
        <section>
          <span class="keyword">Machine:</span>
          <template>
            <el-select v-model="formdata.machine_id" placeholder="">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </section>
        <section>
          <span class="keyword" >Transaction Date:</span>
          <el-date-picker
            v-model="formdata.timerange"
            type="daterange"
            range-separator="to"
            value-format="yyyy-MM-dd"
            start-placeholder="Start"
            end-placeholder="End"
          >
          </el-date-picker>
        </section>
      </div>
      <div>

      </div>
      <div>
        <p class="button">Search</p>
        <p class="button" @click="reset">Reset</p>
      </div>
    </nav>
    <div style="width: 100%;height:300px;background: green"></div>
    <el-main >
      <el-table
        :row-class-name="tabRowClassName"
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          label="Transaction Date"
          align="center"
          width="200"
        >
          <template slot-scope="scope">{{ scope.row.day}}</template>
        </el-table-column>
        <el-table-column
          label="Cash Inbox"
          align="center"
        >
          <template  slot-scope="scope">
            <span  @click="handleDelete(scope.$index, scope.row)">{{ scope.row.buy_money}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="Cash Outbox"
          align="center"
          label="Cash Outbox"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="fee"
          align="center"
          label="Cumulative Revenve"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="system_fee"
          align="center"
          label="CrytoGo Commision"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="profit"
          align="center"
          label="Net profit"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </el-main>

<!--    <pagevue-->
<!--      :pagenum="pagetotal"-->
<!--      :currentpages="currentpage"-->
<!--      :pagesizes="pagesize"-->
<!--      v-on:fromchildren="fromchildren1"-->
<!--    ></pagevue>-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // centerDialogVisible: false,
        formdata:{
          machine_id:'',
          timerange:null,
        },
        currentpage: 1,
        pagesize: 5,
        pagetotal: null,
        tableData: [],
        options: [
        ],
      };
    },
    created() {

      this.$global.get_encapsulation(`${this.$baseurl}/admin_api/machine.machine/getMachineList`,{
        token:this.$store.state.token,
        page:1,
        size:10000,
        keyword:'',
      }).then(res=>{
        if(res.data.ret==0){
          this.formdata.machine_id=res.data.data.data[0].machine_id
          res.data.data.data.forEach(item=>{
            this.options.push({
                value:item.machine_id,
                label:item.name,
            })
          })
          this.searcher();

        }
      })

      // this.changepage(this.currentpage, this.pagesize,this.keyword,this.timerange[0],this.timerange[1]);
    },
    methods: {
      reset(){
        for(let key in this.formdata){
          this.formdata[key]='';
        }
      },
      searcher(){
        this.currentpage=1;
        if(this.timerange==null){
          this.changepage(this.currentpage, this.pagesize,this.formdata.machine_id,'','');
        }else{
          this.changepage(this.currentpage, this.pagesize,this.formdata.machine_id,this.formdata.timerange[0],this.formdata.timerange[1]);
        }
      },

      handleDelete(index, row) {
        console.log(index, row);
        this.$routerto('transaction_details',{order_id:row.order_id})
        // this.beforedelete(row.machine_money_log_id);
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
      changepage(currentpage, pagesize,machine_id,starttime,endtime) {
        this.$global.get_encapsulation(`${this.$baseurl}/admin_api/machine.order/statisticsMachineOrder`,{
          token: this.$store.state.token,
          page: currentpage,
          size:pagesize,
          start_time:starttime,
          end_time:endtime,
          machine_id:machine_id,
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
  .report_lists{
    margin :0 0 0 50px;
    width: 90%;
    .imgsize{
      width: 50px;
      height: 60px;
    }
    header{
      position: relative;
      height: 136px;
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
      /*height: 60px;*/
      /*justify-content: space-between;*/
      margin: 20px 0 20px 0 ;
      justify-content: space-between;
      padding: 0 50px 0 20px;
      >div{
        /*flex:1;*/
        display: flex;
        /*flex-direction: column;*/
        /*justify-content: space-between;*/
        section{
          /*display: flex;*/
          display: flex;
          span{
            display: inline-block;
            /*width: 120px;*/
            margin-right: 5px;
            text-align: right;
            line-height: 40px;
          }
          div{
            flex:1;
          }
        }
        p.button{
          /*width: 100%;*/
          cursor: pointer;
          height: 40px;
          line-height: 40px;
          width: 120px;
          color: white;
          text-align: center;
          background: #EDF1F4;
          color: #515151;
          background-size: cover;
          box-sizing: border-box;
          border-radius: 5px;
        }
        p:nth-child(1){
          color:white;
          background:url(../../../static/add-disable.png) no-repeat;
          margin-right:20px;
        }
        p:nth-child(2){
          border: 1px solid #D1D1D1 ;
          /*margin-bottom:10px;*/

        }
      }
    }
    main{
      padding:20px 20px 20px 0;
      .el-table thead{
        color:black;
      }

    }
  }
</style>
