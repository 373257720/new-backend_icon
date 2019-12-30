<template>
  <div class="transcation_lists">
    <header><h2>
<!--      <span @click="$routerto('audit_log')">Audit Logs</span>-->
<!--      <i class="el-icon-arrow-right"></i>-->
      <span>Transactions</span>
    </h2>
    </header>
    <nav>
        <div>
          <section>
            <span class="keyword">Keyword:</span>
            <el-input
              placeholder="Machine Name"
              v-model="formdata.keyword"
              clearable>
            </el-input>
          </section>
          <section>
            <span class="keyword">Status:</span>
            <template>
              <el-select v-model="formdata.Statu" placeholder="">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </section>
        </div>
      <div>
        <section>
          <span class="keyword">Transaction ID:</span>
          <el-input
            placeholder=""
            v-model="formdata.TransactionID"
            clearable>
          </el-input>
        </section>
        <section>
          <span class="keyword">Type:</span>
          <template>
            <el-select v-model="formdata.Type" placeholder="">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </section>
      </div>
      <div>
        <section>
          <span class="keyword">Location:</span>
          <el-select v-model="formdata.Location" placeholder="">
            <el-option
              v-for="item in Locationlist"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
<!--          <el-input-->
<!--            placeholder="Machine"-->
<!--            v-model="formdata.Location"-->
<!--            clearable>-->
<!--          </el-input>-->
        </section>
        <section>
          <span class="keyword" >Time:</span>
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
        <p class="button" @click="searcher">Search</p>
        <p class="button" @click="reset">Reset</p>
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
          label="Transaction ID"
          align="center"
          width="200"
        >
          <template slot-scope="scope">{{ scope.row.trade_id}}</template>
        </el-table-column>
        <el-table-column
          label="Machine"
          align="center"
          class-name="edit"
        >
          <template  slot-scope="scope">
            <span  @click="handleDelete(scope.$index, scope.row)">{{ scope.row.machine_name}}</span>
          </template>
        </el-table-column>
<!--        <el-table-column-->
<!--          align="center"-->
<!--          label="Photo"-->
<!--          prop="in_money_change"-->
<!--          show-overflow-tooltip>-->
<!--        </el-table-column>-->
        <el-table-column
          align="center"
          label="Photo"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover
              placement="right"
              width="400"
              trigger="click">
              <img class="bigpic" v-if="scope.row.machine_picture==null?false:true" :src="$baseurl+scope.row.machine_picture.original" alt="">
              <img slot="reference" class="imgsize" v-if="scope.row.machine_picture==null?false:true" :src="$baseurl+scope.row.machine_picture.original" alt="">
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="coin_status"
          align="center"
          label="Status"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="trade_type"
          align="center"
          label="Type"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          label="Cash"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.money}}{{scope.row.currency_name}}</template>
        </el-table-column>
        <el-table-column
          prop="coin_number"
          align="center"
          label="BTC"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="create_time"
          align="center"
          label="Transaction Date"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="country_name"
          align="center"
          label="Location"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </el-main>

    <pagevue
      v-on:passtoparent="export_excel"
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
        formdata:{
          TransactionID:'',
          keyword:'',
          Statu:'',
          Type:'',
          Location:'',
          timerange:null,
        },
        currentpage: 1,
        pagesize: 10,
        pagetotal: null,
        tableData: [],
        multipleSelection: [],
        options: [{
          value: '2',
          label: 'Paid',
        }, {
          value: '1',
          label: 'Unpaid'
        },
          {
          value: '4',
          label: 'Cancelled'
        }
        ],
        options1: [{
          value: '1',
          label: 'Buy',
        }, {
          value: '2',
          label: 'Sell'
        },
        ],
        Statulist:{
          "1":'Unpaid',
          "2":'Paid',
          "3":"Part Payment",
          "4":"Canceled",
          "5":"Transastioning"
        },
        // 1未支付2已支付3部分支付4取消交易5正在交
        Locationlist:[],
      };
    },
    created() {
      this.$global.get_encapsulation(`${this.$baseurl}/admin_api/content.country/getCountryList`,{
        token:this.$store.state.token
      }).then(res=>{
          if(res.data.ret==0){
            console.log(res.data.data.data)
            res.data.data.data.forEach(item=>{
              this.Locationlist.push(
              {
                value: item.country_id,
                  label: item.name
              }
              )
            })

          }
      })
      this.searcher();
      // this.changepage(this.currentpage, this.pagesize,this.keyword,this.timerange[0],this.timerange[1]);
    },
    methods: {
      export_excel(){
        let start_time = this.formdata.timerange==null?0:this.formdata.timerange[0];
        let end_time = this.formdata.timerange==null?0:this.formdata.timerange[1];
        window.location.href = `${this.$baseurl}/admin_api/machine.order/exportOrder?token=${this.$store.state.token}&keyword=${this.formdata.keyword}&start_time=${start_time}&end_time=${end_time}&keyword=${this.formdata.keyword}&trade_type=${this.formdata.Type}&country_id=${this.formdata.Location}&coin_status=${this.formdata.Statu}`;

      },

      reset(){
          for(let key in this.formdata){
            this.formdata[key]='';
          }
      },
      searcher(){
        this.currentpage=1;
        if(this.formdata.timerange==null){
          this.changepage(this.currentpage, this.pagesize,this.formdata.keyword,'','');
        }else{
          this.changepage(this.currentpage, this.pagesize,this.formdata.keyword,this.formdata.timerange[0],this.formdata.timerange[1]);
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
      changepage(currentpage, pagesize,keyword,starttime,endtime) {
        this.$global.get_encapsulation(`${this.$baseurl}/admin_api/machine.order/getOrderList`,{
          token: this.$store.state.token,
          page: currentpage,
          size:pagesize,
          // Type:this.formdata.Type,
          keyword:this.formdata.keyword,
          start_time:starttime,
          end_time:endtime,
          machine_id:this.formdata.keyword,
          country_id:this.formdata.Location,
          coin_status:this.formdata.Statu,
        })
          .then(res => {
            if(res.data.ret==0){
              // console.log(res)
              this.pagetotal=res.data.data.total;
              this.tableData=[...res.data.data.data];
              this.tableData.forEach(item=>{
                item.create_time=this.$global.timestampToTime(item.create_time);
                item.trade_type=  item.trade_type==1?'Buy':'Sell';
                item.coin_status=this.Statulist[item.coin_status];

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
  .transcation_lists{
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
      height: 100px;
      /*justify-content: space-between;*/
      margin: 20px 0 0 0 ;
      justify-content: space-between;
      padding: 0 50px 0 20px;
      >div{
        /*flex:1;*/
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        section{
          /*display: flex;*/
          display: flex;
          span{
            display: inline-block;
            width: 120px;
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
            /*margin-bottom:10px;*/
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
