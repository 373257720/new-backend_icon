<template>
  <div class="report_lists">
    <header>
      <h2>
        <span @click="$routerto('audit_log')">{{$t('Report.Report')}}</span>
        <!--    <i class="el-icon-arrow-right"></i>-->
        <!--      <span>Cry</span>-->
      </h2>
    </header>
    <nav>
      <div>
        <section>
          <span class="keyword">{{$t('machines.Machine')}}:</span>
          <template>
            <el-select clearable v-model="formdata.machine_id" placeholder>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </section>
        <section>
          <span class="keyword">{{$t('Report.TransactionDate')}}:</span>
           <el-date-picker
            v-model="formdata.timerange"
            type="daterange"
            :range-separator="$t('machines.to')"
            value-format="yyyy-MM-dd"
            :start-placeholder="$t('machines.Start')"
            :end-placeholder="$t('machines.End')"
          ></el-date-picker>
        </section>
      </div>
      <div>
        <p class="button" @click="drawLineChart">{{$t('common.Search')}}</p>
        <p class="button" @click="export_excel">{{$t('common.Export')}}</p>
      </div>
    </nav>
    <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
    <el-main>
      <el-table
        :row-class-name="tabRowClassName"
        border
        ref="multipleTable"
        :data="tableData"
        :summary-method="getSummaries"
        show-summary
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column :label="$t('Report.TransactionDate')" align="center" width="200">
          <template slot-scope="scope">{{ scope.row.day}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('Report.PurchaseAmount')"
          prop="buy_money"
          align="center"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="sell_money"
          align="center"
          :label="$t('Report.SellAmount')"
          width="200"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="fee"
          align="center"
          width="300"
          :label="$t('Report.CumulativeRevenve')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="system_fee"
          align="center"
          width="300"
          :label="$t('Report.CryptoGoCommision')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="profit"
          align="center"
          :label="$t('Report.Netprofit')"
          min-width="200"
          show-overflow-tooltip
        ></el-table-column>
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
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/toolbox");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  name: "report_lists",
  data() {
    return {
      loading: false,
      bar_data: [],
      dataAxis: [],
      yMax: 500,
      myChart: "",
      dataShadow: [],
      formdata: {
        machine_id: "",
        timerange: null
      },
      currency_name: "",
      currentpage: 1,
      pagesize: 15,
      pagetotal: null,
      tableData: [],
      options: [],
      option: {
        title: {
          // text: '30 Days Cumulative Revenue',
          right: 20,
          subtext: "",
          subtextStyle: {
            //副标题的属性
            fontSize: 14,
            color: "#000",
            fontWeight: 600
            // 同主标题
          }
        },
        toolbox: {
          // id:'right_tool',
          // feature: {
          //   myTool2: {
          //     show: true,
          //     title: 'custom extension method',
          //     icon: 'image://../../static/e0ca77fe8b0e7e1c5d2ace3893d4b87.png',
          //     onclick: function (){
          //       console.log(newvue.$router.push({
          //         name: 'report',
          //       }))
          //     }
          //   },
          // }
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          data: [],
          axisLabel: {
            // inside: true,
            textStyle: {
              color: "#999"
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
              color: "#999"
            }
          }
        },
        // dataZoom: [
        //   {
        //     type: 'inside'
        //   }
        // ],
        series: [
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#f7a050" },
                  { offset: 0.5, color: "#f7a050" },
                  { offset: 1, color: "#f82637" }
                ])
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
            data: []
          }
        ]
      }
    };
  },
  created() {
    if (this.$route.query.machine_id) {
      this.formdata.machine_id = this.$route.query.machine_id;
    }

    // this.changepage(this.currentpage, this.pagesize,this.keyword,this.timerange[0],this.timerange[1]);
  },
  mounted() {
    this.getmachineid();
    window.addEventListener("resize", () => {
      this.myChart.resize();
    });
  },
  methods: {
    export_excel() {
      let start_time =
        this.formdata.timerange == null ? 0 : this.formdata.timerange[0];
      let end_time =
        this.formdata.timerange == null ? 0 : this.formdata.timerange[1];
      window.location.href = `${this.$axios.defaults.baseURL}/admin_api/machine.order/exportStatisticsMachineOrder?token=${this.$store.state.token}&start_time=${start_time}&end_time=${end_time}&machine_id=${this.formdata.machine_id}&lang=${localStorage.getItem("lan")?localStorage.getItem("lan"):'en-us'}`;

      // window.location.href = `${this.$axios.defaults.baseURL}/admin_api/machine.order/exportStatisticsMachineOrder?token=${this.$store.state.token}&start_time=${start_time}&end_time=${end_time}&machine_id=${this.formdata.machine_id}`;
    },
    getmachineid() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/admin_api/machine.machine/getMachineList`,
          {
            page: 1,
            size: 10000,
            keyword: ""
          }
        )
        .then(res => {
          if (res.data.ret == 0) {
            if (!this.formdata.machine_id) {
              if (res.data.data.data.length > 0) {
                this.formdata.machine_id = res.data.data.data[0].machine_id;
                res.data.data.data.forEach(item => {
                  this.options.push({
                    value: item.machine_id,
                    label: item.name
                  });
                });
              }
            }
            this.drawLineChart();
          }
        });
    },
    drawLineChart() {
      this.loading = true;
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.getElementById("myChart"));
      // 绘制基本图表
      this.myChart.setOption(this.option);
      //显示加载动画
      this.myChart.showLoading({
        text: "loading",
        color: "#2ABEE2",
        textColor: "#000",
        maskColor: "rgba(255, 255, 255, 0.8)",
        zlevel: 0,
        // 字体大小。从 `v4.8.0` 开始支持。
        fontSize: 12,
        // 是否显示旋转动画（spinner）。从 `v4.8.0` 开始支持。
        showSpinner: true,
        // 旋转动画（spinner）的半径。从 `v4.8.0` 开始支持。
        spinnerRadius: 10,
        // 旋转动画（spinner）的线宽。从 `v4.8.0` 开始支持。
        lineWidth: 3
      });
      //获取数据
      this.searcher();
    },
    getSummaries(param) {
      const { columns, data } = param;
      // console.log(columns)
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "Sum";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        // console.log(values )
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            // console.log(value)
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          if (index != 1 && index != 2) {
            sums[index] = sums[index].toFixed(2);
          }
        } else {
          sums[index] = "";
        }
      });

      return sums;
    },
    reset() {
      for (let key in this.formdata) {
        this.formdata[key] = "";
      }
    },
    searcher() {
      this.currentpage = 1;
      if (this.formdata.timerange == null) {
        this.changepage(
          this.currentpage,
          this.pagesize,
          this.formdata.machine_id,
          "",
          ""
        );
      } else {
        this.changepage(
          this.currentpage,
          this.pagesize,
          this.formdata.machine_id,
          this.formdata.timerange[0],
          this.formdata.timerange[1]
        );
      }
    },
    tabRowClassName({ row, rowIndex }) {
      let index = rowIndex;
      if (index % 2 == 0) {
        return "warning-row";
      }
    },
    changepage(currentpage, pagesize, machine_id, starttime, endtime) {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/admin_api/machine.order/statisticsMachineOrder`,
          {
            page: currentpage,
            size: pagesize,
            start_time: starttime,
            end_time: endtime,
            machine_id: machine_id
          }
        )
        .then(res => {
          this.loading = false;
          if (res.data.ret == 0) {
            this.dataAxis = [];
            this.bar_data = [];
            this.pagetotal = res.data.data.total;
            this.tableData = [...res.data.data.data];
            this.currency_name = res.data.data.currency_name
              ? res.data.data.currency_name
              : "";
            this.tableData.forEach(item => {
              this.dataAxis.unshift(item.day);
              if (!item.buy_money) {
                item.buy_money = 0;
              }
              if (!item.sell_money) {
                item.sell_money = 0;
              }
              this.bar_data.unshift(item.buy_money + item.sell_money);
              item.create_time = this.$global.timestampToTime(item.create_time);
            });
          }
          setTimeout(() => {
            //为了让加载动画效果明显,这里加入了setTimeout,实现300ms延时
            this.myChart.hideLoading(); //隐藏加载动画
            this.myChart.setOption({
              xAxis: {
                data: this.dataAxis
              },
              series: [
                {
                  data: this.bar_data
                }
              ],
              title: {
            subtext: this.$t('common.Price') +":" + this.currency_name
              }
            });
          }, 300);
        })
        .catch(error => {});
    },
    fromchildren1(data) {
      this.currentpage = data.currentpage;
      if (this.formdata.timerange == null) {
        this.changepage(
          this.currentpage,
          this.pagesize,
          this.formdata.machine_id,
          "",
          ""
        );
      } else {
        this.changepage(
          this.currentpage,
          this.pagesize,
          this.formdata.machine_id,
          this.formdata.timerange[0],
          this.formdata.timerange[1]
        );
      }
    }
  },
  watch: {}
};
</script>

<style lang="scss">
.report_lists {
  padding: 0 50px 50px 50px;
  .imgsize {
    width: 50px;
    height: 60px;
  }
  .el-date-editor--daterange.el-input__inner {
    width: 250px;
  }
  header {
    position: relative;
    height: 80px;
    border-bottom: 1px solid #d3d3d3;
    h2 {
      font-size: 20px;
      position: absolute;
      bottom: 20px;
      span {
        cursor: pointer;
      }
    }
  }
  .el-table {
    color: #7a7a7a;
  }
  .el-checkbox__inner {
    border-radius: 50%;
    /*background: ;*/
    /*background: red;*/
    /*border-color: red;*/
  }
  .el-table .warning-row {
    background: #edf1f4;
  }
  .el-table_1_column_8 .el-button {
    color: #2abee2;
  }
  .edit {
    span {
      color: #2abee2;
      text-decoration: underline;
      cursor: pointer;
    }
    span.left {
      margin-right: 20px;
    }
  }

  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    /*border-color:white;*/
    background: #2abee2;
    border-color: #2abee2;
  }
  .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #dcdfe6;
  }
  .el-table td,
  .el-table th.is-leaf {
    border: 0;
  }
  nav {
    display: flex;
    margin: 20px 0 20px 0;
    /*padding: 0 50px 0 20px;*/
    > div {
      display: flex;
      section {
        /*display: flex;*/
        span {
          display: inline-block;
          /*width: 120px;*/
          color: #777777;
          margin-right: 5px;
          text-align: right;
          line-height: 40px;
        }
        div {
          flex: 1;
        }
      }
      section:nth-of-type(1) {
        margin-right: 20px;
      }
      p.button {
        /*width: 100%;*/
        cursor: pointer;
        height: 40px;
        line-height: 40px;
        width: 120px;
        color: white;
        text-align: center;
        background: #edf1f4;
        color: #515151;
        background-size: cover;
        box-sizing: border-box;
        border-radius: 5px;
      }
      p:nth-child(1) {
        color: white;
        background: url(../../../static/add-disable.png) no-repeat;
        margin-right: 20px;
      }
      p:nth-child(2) {
        border: 1px solid #d1d1d1;
        /*margin-bottom:10px;*/
      }
      @media (max-width: 1024px) {
        p:nth-child(1) {
          width: 80px;
          color: white;
          background: url(../../../static/add-disable.png) no-repeat;
          margin-right: 10px;
        }
        p:nth-child(2) {
          width: 80px;
          border: 1px solid #d1d1d1;
          /*margin-bottom:10px;*/
        }
      }
    }
    div:nth-of-type(2) {
      margin-left: 20px;
      align-self: flex-end;
    }
    @media (max-width: 1024px) {
      div:nth-of-type(2) {
        margin-left: 10px;
      }
    }
  }
  @media (max-width: 768px) {
    nav {
      flex-wrap: wrap;
      div:nth-of-type(2) {
        margin-top: 10px;
        margin-left: 0;
      }
    }
  }

  main {
    padding: 20px 20px 20px 0;
    .el-table thead {
      /*color:black;*/
    }
  }
}
</style>
