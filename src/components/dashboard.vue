<template>
  <div id="dashboard">
    <div class="dashboard">
      <div class="top">
        <aside >
          <div class="myChart_top" >
            <h2>Machines Overview</h2>
              <div class="myChart_top_right">
                <span>30 Days Volume</span>
                <span>Sell<span class="num">{{chart_sell}}</span></span>
                <span>Buy<span class="num">{{chart_buy}}</span></span>
              </div>
          </div>
          <div id="myChart" >
          </div>
          <div class="myChart_top_button">
            <span>30 Days Cumulative Revenue</span>
            <span @click="$routerto('report')">SEE ALL</span>
          </div>
        </aside>

        <article >
           <header ><span>Recent Transactions</span><span @click="$routerto('transaction')">SEE ALL</span></header>
          <el-main>
            <el-table  max-height="100%" :row-class-name="tableRowClassName"   :data="order_infors" border style="width:100%;">
              <el-table-column  class-name="edit" show-overflow-tooltip   label="Transation ID" align="center">
                <template slot-scope="scope"  class="edit">
                  <span  @click="$routerto('transaction_details',{order_id:scope.row.order_id})"> {{ scope.row.trade_id}}</span>
                </template>
              </el-table-column>
              <el-table-column show-overflow-tooltip prop="coin_status" label="Type" align="center"></el-table-column>
              <el-table-column  show-overflow-tooltip prop="create_time" label="Days" align="center"></el-table-column>
            </el-table>
          </el-main>
        </article>
      </div>
        <div class="bottom">
          <header>Machine Information</header>
          <main>
            <el-main>
              <el-table
                :row-class-name="tabRowClassName"
                border
                ref="multipleTable"
                :data="machine_infor"
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                  label="Machine"
                  align="center"
                  class-name="edit"
                >
                  <template slot-scope="scope"  class="edit">
                    <span  @click="handleEdit(scope.$index, scope.row)"> {{ scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="address"
                  align="center"
                  label="ATM Address"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="incashbox_money"
                  align="center"
                  label="Cash Inbox"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="outcashbox_money"
                  align="center"
                  label="Cash Outbox"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column  align="center" label="Operation"  class-name="edit" width="200">
                  <template slot-scope="scope">
                    <span  @click="handleDelete(scope.$index, scope.row)">Transactions</span>
                    <span class="left"  @click="handleEdit(scope.$index, scope.row)">Setting</span>

                  </template>
                </el-table-column>
              </el-table>
            </el-main>
          </main>
        </div>

<!--    <pagevue-->
<!--      :pagenum="pagetotal"-->
<!--      :currentpages="currentpage"-->
<!--      :pagesizes="pagesize"-->
<!--      v-on:fromchildren="fromchildren1"-->
<!--    ></pagevue>-->
<!--    <el-dialog title="提示" v-model="fafa" width="30%" height="50%">-->
<!--      <span>{{this.$store.state.commondialog}}</span>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
<!--      </span>-->
<!--      </el-dialog>-->
    </div>
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
  // let newvue =  new Vue();
  let newvue;
  // console.log(this)
export default {

  data() {
    return {
      fafa: this.$store.state.commondialog,
      value1: [], //日期选择
      value: "", //项目状态
      chart_sell:'',
      chart_buy:'',
      bar_data:[],
      dataAxis:[],
      yMax:500,
      myChart:'',
      dataShadow:[],
      // searchkey: "",
      currentpage: 1,
      pagesize: 10,
      pagetotal: null,
      machine_infor: [],
      order_infors: [],
      option : {
        title: {
          // text: '30 Days Cumulative Revenue',
          // right:20,
          // subtext: '30 Days Cumulative Revenue',
          // subtextStyle: {//副标题的属性
          //   fontSize:14,
          //   color:'#000',
          //   fontWeight:600,
          //   // 同主标题
          // },
        },
        toolbox: {
          id:'right_tool',
          feature: {
            // myTool2: {
            //   show: true,
            //   title: 'custom extension method',
            //   icon: 'image://../../static/e0ca77fe8b0e7e1c5d2ace3893d4b87.png',
            //   onclick: function (){
            //     console.log(newvue.$router.push({
            //       name: 'report',
            //     }))
            //   }
            // },
          }
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis:
          {
            type: 'category',
            data: this.dataAxis,
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
        yAxis: {
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
        // dataZoom: [
        //   {
        //     type: 'inside'
        //   }
        // ],
        series: [
          // { // For shadow
          //   type: 'bar',
          //   itemStyle: {
          //     normal: {color: 'rgba(0,0,0,0.05)'}
          //   },
          //   barGap:'-100%',
          //   barCategoryGap:'40%',
          //   data: this.dataShadow,
          //   animation: false
          // },

          {
            type: 'bar',
            itemStyle: {
              normal: {

                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#f7a050'},
                    {offset: 0.5, color: '#f7a050'},
                    {offset: 1, color: '#f82637'}
                  ]
                )
              },
              emphasis: {
                // color: new echarts.graphic.LinearGradient(
                //   0, 0, 0, 1,
                //   [
                //     {offset: 0, color: '#2378f7'},
                //     {offset: 0.7, color: '#2378f7'},
                //     {offset: 1, color: '#83bff6'}
                //   ]
                // )
              }
            },
            // barWidth:20,
            data: this.bar_data,
          }
        ],

      },
      // 打币状态1未支付2已支付3部分支付4取消交易5正在交易',
      coin_status:{
        '1':'Unpaid',
        '2':'Paid',
        '3':'',
        '4':'Canceled',
        '5':'Pending',
      }
    }
  },
  created() {
    newvue=this;
    this.order_infor();
    this.MACHINE_INFORMATION();
    // this.search(this.value, null, null, this.currentpage, this.pagesize);
  },
  mounted() {
    this.drawLineChart()
    window.addEventListener('resize', () => {
      this.myChart.resize()
    })
  },
  methods: {
    handleDelete(a,row){;
      // console.log( row.machine_id)
      this.$routerto('report',{machine_id:row.machine_id})
    },
    drawLineChart() {
      // 基于准备好的dom，初始化echarts实例
     this.myChart = echarts.init(document.getElementById('myChart'))
      // myChart = this.$echarts.init(document.getElementById('myChart'));
      // 绘制基本图表
      this.myChart.setOption(this.option);
      //显示加载动画
      this.myChart.showLoading();
      //获取数据
      this.$global.get_encapsulation(`${this.$baseurl}/admin_api/machine.order/statisticsDayOrder`,{
        page:1,
        size:10,
      }).then(res => {
        if(res.data.ret==0){
          this.chart_sell=res.data.data.sell_order_number;
          this.chart_buy=res.data.data.buy_order_number;
          res.data.data.data.forEach(item=>{
            this.dataAxis.push(item.day);
            this.bar_data.push(item.money);
          })
          for (var i = 0; i < this.bar_data.length; i++) {
            this.dataShadow.push(this.yMax);
          }
        }
        // console.log(this.dataAxis)
        setTimeout(()=>{  //为了让加载动画效果明显,这里加入了setTimeout,实现300ms延时
          this.myChart.hideLoading(); //隐藏加载动画
          // myChart.setOption(this.option);
          this.myChart.setOption({
            xAxis: {
              data: this.dataAxis
            },
            series: [{
              data: this.bar_data
            }]
          })
        }, 300 )
      })
    },
    handleEdit(index, row) {
    this.$routerto('machines_edit',{machine_id:row.machine_id})
    },
    order_infor(){
      this.$global.get_encapsulation(`${this.$baseurl}/admin_api/machine.order/getOrderList`,{
        page:1,
        size:7,
      }).then(res=>{
        if(res.data.ret==0){
          this.order_infors=[...res.data.data.data];
          this.order_infors.forEach(item=>{
            item.coin_status= this.coin_status[item.coin_status]
            item.create_time=this.$global.timestampToTime(item.create_time);
          })
        }
      })
    },
    MACHINE_INFORMATION(){
      this.$global.get_encapsulation(`${this.$baseurl}/admin_api/machine.machine/getMachineList`,{
        page:this.currentpage,
        size:this.pagesize,
        keyword:"",
      }).then(res=>{
            if(res.data.ret==0){
              // console.log(res.data.data)
              this.pagetotal=res.data.data.total;
             this.machine_infor=[...res.data.data.data];
              // console.log(this.machine_infor)
            }
      })
    },

    tabRowClassName({row,rowIndex}){
      let index = rowIndex;
      if(index %2 == 0){
        return 'warning-row'
      }
    },

    tableRowClassName({row, rowIndex}) {
      // console.dir(rowIndex)
      if (rowIndex %2 == 0) {

        return 'success-row';
      }
      // return '';
    },

    fromchildren1(data) {
      this.currentpage = data.currentpage;
      this.pagesize = data.pagesize;
      this.search(
        this.value,
        this.value1[0] / 1000,
        this.value1[1] / 1000,
        this.currentpage,
        this.pagesize
      );
    },
    search(status, start, end, pageindex, size) {
      if (!start || !end) {
        start = "";
        end = "";
      }
      if (pageindex == 1) {
        this.currentpage = 1;
      }
      // this.$axios({
      //   method: "post",
      //   url: `${this.$baseurl}/bsl_admin_web/project/getProject`,
      //   data: this.$qs.stringify({
      //     signStatus: status,
      //     searchKey: this.searchkey,
      //     startCreateTime: start,
      //     endCreateTime: end,
      //     pageIndex: pageindex,
      //     pageSize: size
      //   }),
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   }
      // })

       this.$global.post_encapsulation( `${this.$baseurl}/bsl_admin_web/project/getProject`,{
         signStatus: status,
         searchKey: this.searchkey,
         startCreateTime: start,
         endCreateTime: end,
         pageIndex: pageindex,
         pageSize: size
       })
        .then(res => {
        console.log(res);
        if (res.data.resultCode == 10090) {
          this.$store.dispatch("commondialogfunctionaysn", true);
          // console.log( this.$store.state.commondialog);
        } else if (res.data.resultCode == 10000) {
          // if (res.data.data.lists.length > 0) {
          this.tableData = [...res.data.data.lists];
          console.log(this.tableData);

          this.tableData.forEach(item => {
            item.createTime = this.$global.timestampToTime(item.createTime);
            if (item.signStatus === 0) {
              item.signstatus = "待签约";
            } else if (item.signStatus === 1) {
              item.signstatus = "中介已意向签约";
            } else if (item.signStatus === 2) {
              item.signstatus = "项目方同意签约";
            } else if (item.signStatus === 3) {
              item.signstatus = "项目方拒接签约";
            } else if (item.signStatus === 3) {
              item.signstatus = "项目方拒接签约";
            } else if (item.signStatus === 3) {
              item.signstatus = "项目方拒接签约";
            }
            // 待审核项目->1 待签约项目->2  已签约待发送->4    待确认项目->5  成功签约项目->6   拒绝签约项目->3，7
            if (item.projectLifeCycle === 0) {
              item.projectstatus = "正常";
            } else if (item.projectLifeCycle === -1) {
              item.projectstatus = "已删除";
            }
          });
          this.pagetotal = res.data.data.pageTotal;
          // var rescode = res.data.resultCode;
          // }
        }
      });
    }
  }
};
</script>

<style lang='scss'>
#dashboard {
  /*padding-top: 60px;*/
  .dashboard {
    /*height: 780px;*/

    padding: 60px;
    .el-main {
      padding: 0;
      overflow: hidden;
      .el-table--border td,
      .el-table--border th,
      .el-table__body-wrapper
        .el-table--border.is-scrolling-left
        ~ .el-table__fixed {
        border-right: 0;
        border-bottom: 0;
      }
    }
    div.top {
      /*height: 486px;*/
      /*width: 100%;*/
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      aside {
        padding:0 20px;
        height: 486px;
        flex: 0 0 100%;
        max-width: 100%;
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: column;
        -webkit-align-items: stretch;
        justify-content: stretch;
        margin-bottom: 76px;
        .myChart_top{
          h2{
            font-weight: bold;
          }
          height: 50px;
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          align-items: center;
          .myChart_top_right{
            font-size: 14px;
            margin-right: 3%;
            >span{
              margin-left: 20px;
              .num{
                margin-left: 5px;
                text-decoration: underline;
                /*margin-left: 10px;*/
              }
            }
          }
        }
        #myChart{
          flex: 1;
          border: 1px solid #d3d3d3;
        }
        .myChart_top_button{
          position: absolute;
          top:50px;
          height: 50px;
          display: -webkit-flex;
          align-items: center;
          right:40px;
          span:nth-of-type(1){
              font-size: 14px;
          }
          span:nth-of-type(2){
            display: inline-block;
            width: 130px;
            height: 30px;
            margin-left: 10px;
            line-height: 30px;
            text-align: center;
            border-radius: 5px;
            color: white;
            background:url(../../static/add-disable.png) no-repeat;
            cursor: pointer;
            background-size: cover;
          }

        }

      }
      article {
        .edit{
          >div{
            display: flex;
            flex-direction: column;

          }
          span{
            color: #2ABEE2;
            text-decoration:underline;
            cursor: pointer;
          }
          span.left{
          }


        }
        /*width: 50%;*/
        height: 486px;
        /*height: 100%;*/
        padding:0 20px;
        box-sizing: border-box;
        margin-bottom: 76px;
        flex: 0 0 100%;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        header{
          display: flex;
          justify-content: flex-end;
          align-items: center;
          height: 50px;
          span:nth-of-type(1){
            margin-right: 15px;
            font-weight: bold;
          }
          span:nth-of-type(2){
            display: inline-block;
            width: 130px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-radius: 5px;
            color: white;
            background:url(../../static/add-disable.png) no-repeat;
            cursor: pointer;
            background-size: cover;
          }
        }
        .el-main{
          flex:1;
        }
        .success-row {
          background:#EDF1F4;
          overflow: hidden;

        }
        .el-table__row{
        }
        span{

        }

      }
     @media (min-width: 1200px){
       aside  {
         flex: 0 0 50%;
         max-width: 50%;
       }
       article  {
         flex: 0 0 45%;
         max-width: 45%;
       }
     }

    }

    div.bottom {
      height:600px;
      width: 100%;
      header {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 20px;
      }
      main {
        width: 100%;
      }
      .edit{
      >div{
        display: flex;
        flex-direction: column;

      }
        span{
          color: #2ABEE2;
          text-decoration:underline;
          cursor: pointer;
        }
        span.left{
        }


      }
       .warning-row{
        background:#EDF1F4;
      }
      .success-row {
        background: #f0f9eb;
      }

    }
  }
  @media (max-width: 768px){
    .dashboard {
 padding: 30px;

    }
  }
}
</style>
<style>
   .hover-row{
         /*background-color: #c6cfdf !important;*/
        }
   .success-row{
    /*background: red !important;*/
  }
  .el-table__body tr.hover-row:hover>td{
    /*background-color: none !important;*/
}
</style>
