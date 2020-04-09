<template>
  <div class="report_crytocurrency" v-loading="loading">
    <header><h2>
      <span @click="$routerto('audit_log')">Reports</span>
          <i class="el-icon-arrow-right"></i>
            <span>Crytocurrency</span>
    </h2>
    </header>
    <nav>
        <section>
          <span class="keyword" >Machine:</span>
          <template>
            <el-select clearable v-model="formdata.machine_id" placeholder="">
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
          <span class="keyword">Crytocurrency:</span>
          <template>
            <el-select v-model="formdata.coin_type" clearable placeholder="">
              <el-option
                v-for="item in coin_type"
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
      <div>
        <p class="button" @click="searcher" >Search</p>
        <p class="button" @click="reset">Reset</p>
      </div>
    </nav>
    <el-main >
      <div id="myChart" :style="{width: '100%',height: '700px'}"></div>
<!--      <div style="width: 60%;height: 600px;background: grey;"></div>-->
      <div id="list" style="width: 40%;margin-top:60px;height: 700px">
              <el-table
                :row-class-name="tabRowClassName"
                border
                ref="multipleTable"
                :data="tableData"
                :summary-method="getSummaries"
                show-summary
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                  label="Transaction Date"
                  align="center"
                >
                  <template slot-scope="scope">{{ scope.row.day}}</template>
                </el-table-column>
                <el-table-column
                  prop="buy_money"
                  align="center"
                  label="Buy"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="sell_money"
                  align="center"
                  label="Sell"
                  show-overflow-tooltip>
                </el-table-column>
              </el-table>
            <pagevue
              v-on:passtoparent="export_excel"
              :pagenum="pagetotal"
              :currentpages="currentpage"
              :pagesizes="pagesize"
              v-on:fromchildren="fromchildren1"
            ></pagevue>
      </div>

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
  let echarts = require('echarts/lib/echarts');
  // 引入柱状图组件
  require('echarts/lib/chart/bar');
  // 引入提示框和title组件
  require('echarts/lib/component/toolbox');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');
  export default {
    data() {
      return {
        loading:false,
        // centerDialogVisible: false,
        dataAxis:[],
       buy_money:[],
        sell_money:[],
        yMax:500,
        myChart:'',
        dataShadow:[],
        formdata:{
          machine_id:'',
          timerange:null,
          coin_type:'',
        },
        currentpage: 1,
        pagesize: 10,
        pagetotal: null,
        tableData: [],
        options: [
        ],
        option :{
          color: ['#003366', '#006699', '#4cabce', '#e5323e'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['Buy', 'Sell',]
          },
          // calculable: true,
          xAxis:
            {
              type: 'category',
              data:[],
              axisLabel: {
                // inside: true,
                textStyle: {
                  color: '#999'
                }
              },
              axisTick: {
                show: false
              },
              axisLine: {
                show: false
              },
              z: 10
            },
          yAxis:
            {
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  color: '#999'
                }
              }
            },
          series: [
            {
              name: 'Buy',
              type: 'bar',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#2bd9cf'},
                      {offset: 0.5, color: '#2bd9cf'},
                      {offset: 1, color: '#2ab1e8'}
                    ]
                  )
                },
              },
              data: [],
            },
            {
              name: 'Sell',
              type: 'bar',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#ecdf4e'},
                      {offset: 0.5, color: '#ecdf4e'},
                      {offset: 1, color: '#f2ba24'}
                    ]
                  )
                },
              },
              data: [],
            },

          ]
        },

        coin_type:[
          {
            value:'bitcoin',
            label:'bitcoin',
          },
          {
            value:'ethereum',
            label:'ethereum',
          }
        ],
      };
    },
    created() {
    },
    mounted() {
      this.getmachineid();
      window.addEventListener('resize', () => {
        this.myChart.resize()
      })
    },
    methods: {
      export_excel(){
        let start_time = this.formdata.timerange==null?0:this.formdata.timerange[0];
        let end_time = this.formdata.timerange==null?0:this.formdata.timerange[1];
        window.location.href = `${this.$baseurl}/admin_api/machine.order/exportStatisticsCoinOrder?
        token=${this.$store.state.token}&start_time=${start_time}&end_time=${end_time}&
        machine_id=${this.formdata.machine_id}&coin_type=${this.formdata.coin_type}`;
      },
      resizeHandler() {
        this.chart.resize()
      },
      getmachineid(){
        this.$global.get_encapsulation(`${this.$baseurl}/admin_api/machine.machine/getMachineList`,{
          page:1,
          size:10000,
          keyword:'',
        }).then(res=>{
          if(res.data.ret==0){
            // console.log(res)
            this.formdata.machine_id=res.data.data.data[0].machine_id
            res.data.data.data.forEach(item=>{
              this.options.push({
                value:item.machine_id,
                label:item.name,
              })
            })
            this.drawLineChart();
          }
        })
      },
      drawLineChart() {
        this.loading=true;
        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(document.getElementById('myChart'))
        // 绘制基本图表
        this.myChart.setOption(this.option);
        //显示加载动画
        // this.myChart.showLoading();
        //获取数据
        this.searcher()

      },
      getSummaries(param) {
        const { columns, data } = param;
        // console.log(columns)
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = 'Sum';
            return;
          }
          const values = data.map(item =>
            Number(item[column.property])
          );

          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            // sums[index] += ' 元';
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
      reset(){
        for(let key in this.formdata){
          this.formdata[key]='';
        }
      },
      searcher(){
        this.currentpage=1;
        if(this.formdata.timerange==null){
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
        this.$global.get_encapsulation(`${this.$baseurl}/admin_api/machine.order/statisticsCoinOrder`,{
          page: currentpage,
          size:pagesize,
          start_time:starttime,
          end_time:endtime,
          machine_id:machine_id,
          coin_type:this.formdata.coin_type,
        })
          .then(res => {
            this.loading=false;
            if(res.data.ret==0){
              this.buy_money=[];
              this.sell_money=[];
              this.dataAxis=[];
              this.pagetotal=res.data.data.total;
              this.tableData=[...res.data.data.data];
              this.tableData.forEach(item=>{
                this.dataAxis.unshift(item.day);
                if(item.buy_money){
                  this.buy_money.unshift(item.buy_money);
                }else{
                  item.buy_money=0;
                  this.buy_money.unshift(0);
                }
                if(item.sell_money){
                  this.sell_money.unshift(item.sell_money);
                }else{
                  item.sell_money=0;
                  this.sell_money.unshift(0);
                }
                // item.create_time=this.$global.timestampToTime(item.create_time);
              })
            }
            setTimeout(()=>{  //为了让加载动画效果明显,这里加入了setTimeout,实现300ms延时
              this.myChart.hideLoading(); //隐藏加载动画
              this.myChart.setOption({
                xAxis: {
                  data: this.dataAxis
                },
                series: [
                      {
                      data: this.buy_money
                    },
                  {
                    data: this.sell_money
                  },
                ],
                // title:{
                //   subtext:'Price:'+this.currency_name,
                // }
              })

            }, 300 )
          })
          .catch(error => {});
      },
      fromchildren1(data) {
        this.currentpage=data.currentpage;
        if(this.formdata.timerange==null){
          this.changepage(this.currentpage, this.pagesize,this.formdata.machine_id,'','');
        }else{
          this.changepage(this.currentpage, this.pagesize,this.formdata.machine_id,this.formdata.timerange[0],this.formdata.timerange[1]);
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
  .report_crytocurrency{
    padding :0 50px 50px 50px;
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
      flex-wrap: wrap;
      /*height: 60px;*/
      /*justify-content: space-between;*/
      margin: 20px 0 20px 0 ;
      justify-content: space-between;
      /*padding: 0 20px 0 20px;*/
      section{
        margin-right: 20px;
        margin-bottom: 20px;
      }
      >div{
        /*flex:1;*/
        display: flex;
        font-size: 14px;
        section{
          display: flex;
          span{
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
    .el-main{
      /*overflow: visible;*/
      display: flex;
      flex-wrap: wrap;
      #myChart{
        flex: 0 0 100%;
        max-width: 100%;
      }
      #list{
        flex: 0 0 100%;
        max-width: 100%;
      }
      @media (min-width: 1200px){
        #myChart {
          flex: 0 0 50%;
          max-width: 50%;
        }
        #list {
          flex: 0 0 50%;
          max-width: 50%;
        }
      }
    }

    main{
      /*padding:20px 20px 20px 0;*/
      display: flex;
      /*justify-content: space-between;*/

      .el-table thead{
        color:black;
      }
      .pagemodel {
        display: flex;
        flex-wrap: wrap;
        .pagevue{
          /*flex:1;*/
          margin: 0;
          .el-pagination__total{
            margin-right: 0;
          }
          .el-pagination__jump{
            margin: 0;
          }
          /* width: 10rem;*/
        }
      }

    }
  }
</style>
