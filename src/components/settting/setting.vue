<template>
  <div class="Setting">
    <header><h2>Setting</h2></header>
    <nav>
      <div>
        <span class="keyword">keyword:</span>
        <el-input
          placeholder="请输入内容"
          v-model="input"
          clearable>
        </el-input>
        <i class="el-icon-search"></i>
      </div>

    </nav>
    <el-main>
<!--      <el-table-->
<!--        ref="multipleTable"-->
<!--        :data="tableData"-->
<!--        tooltip-effect="dark"-->
<!--        style="width: 100%"-->
<!--        @selection-change="handleSelectionChange">-->

<!--        <el-table-column-->
<!--          label="Type"-->
<!--          align="center"-->
<!--         >-->
<!--          <template slot-scope="scope">{{ scope.row.date }}</template>-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="address"-->
<!--          align="center"-->
<!--          label="Content"-->
<!--          show-overflow-tooltip>-->
<!--        </el-table-column>-->
<!--        <el-table-column  align="center" label="Operation">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button-->
<!--              size="mini"-->
<!--              type="danger"-->
<!--              @click="handleDelete(scope.$index, scope.row)">Edit</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->


      <el-table ref="multipleTable" border :span-method="objectSpanMethod" :cell-class-name="tableRowClassName"
                @cell-mouse-leave="cellMouseLeave"  @cell-mouse-enter="cellMouseEnter" :data="tableData" style="width:100%;margin:0 auto;">
        <el-table-column label="Type" align="center">
          <template slot-scope="scope" width="160">
            <div>{{scope.row.productType}}</div>
          </template>
        </el-table-column>
        <el-table-column label="Content" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.productName}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="Operation" align="center">
          <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row)">Edit</el-button>
                      </template>
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
        tableData: [
          {
            productType: "General",
            price: 123,
            productName: 'Dispener',
            amount: 20,
            operate_number: "20180831142020",
            price: "36.00",
            updateTime: "2018-08-31",
            operator: "小吴"
          },{
            productType: "General",
            price: 123,
            productName: 'Cashbox',
            amount: 20,
            operate_number: "20180831142020",
            price: "36.00",
            updateTime: "2018-08-31",
            operator: "小吴"
          },{
            productType: "Coin & Price",
            price: 123,
            productName: 'Transaction Time',
            amount: 20,
            operate_number: "20180823142020",
            price: "36.00",
            updateTime: "2018-08-31",
            operator: "小吴"
          },{
            productType: "Coin & Price",
            price: 223,
            productName: 'Transaction Price & Fee',
            amount: 10,
            operate_number: "20180821142020",
            price: "36.00",
            updateTime: "2018-08-31",
            operator: "小王"
          },{
            productType: "Receipts",
            price: 888,
            productName: 'Website',
            amount: 200,
            operate_number: "20180821142020",
            price: "36.00",
            updateTime: "2018-08-31",
            operator: "小吴"
          },{
            productType: "Receipts",
            price: 123,
            productName: 'E-mail',
            amount: 20,
            operate_number: "20180821142020",
            price: "36.00",
            updateTime: "2018-08-31",
            operator: "小吴"
          },{
            productType: "Receipts",
            price: 123,
            productName: 'Contact Number',
            amount: 20,
            operate_number: "20180821142020",
            price: "36.00",
            updateTime: "2018-08-31",
            operator: "小吴"
          },{
            productType: "Advanced Setting",
            price: 888,
            productName: 'Ethereum',
            amount: 200,
            operate_number: "20180821142020",
            price: "36.00",
            updateTime: "2018-08-31",
            operator: "小吴"
          },
          {
            productType: "Advanced Setting",
            price: 123,
            productName: 'Bitgo',
            amount: 20,
            operate_number: "20180821142020",
            price: "36.00",
            updateTime: "2018-08-31",
            operator: "小吴"
          },{
            productType:"Advanced Setting",
            price: 123,
            productName: 'Machine Configuration',
            amount: 20,
            operate_number: "20180821142020",
            price: "36.00",
            updateTime: "2018-08-31",
            operator: "小吴"
          },
        ],
        rowIndex: '-1',
        OrderIndexArr: [],
        hoverOrderArr: []
      };
    },
    created() {
      // this.changepage(this.currentpage, this.pagesize);
      this.getOrderNumber();
    },
    methods: {
      // 获取相同编号的数组
      getOrderNumber() {
        let OrderObj = {}
        this.tableData.forEach((element, index) => {
          element.rowIndex = index
          if (OrderObj[element.productType]) {
            OrderObj[element.productType].push(index)
          } else {
            OrderObj[element.productType] = []
            OrderObj[element.productType].push(index)
          }
        })
        console.log(OrderObj)
        // 将数组长度大于1的值 存储到this.OrderIndexArr（也就是需要合并的项）
        for (let k in OrderObj) {
          if (OrderObj[k].length > 1) {
            this.OrderIndexArr.push(OrderObj[k])
          }
        }
      },


      // 合并单元格
      objectSpanMethod({row,column,rowIndex,columnIndex}) {
        if (columnIndex === 0 || columnIndex === 3 || columnIndex === 4) {
          for (let i = 0; i < this.OrderIndexArr.length; i++) {
            let element = this.OrderIndexArr[i]
            for (let j = 0; j < element.length; j++) {
              let item = element[j]
              if (rowIndex == item) {
                if (j == 0) {
                  return {
                    rowspan: element.length,
                    colspan: 1
                  }
                } else if (j != 0) {
                  return {
                    rowspan: 0,
                    colspan: 0
                  }
                }
              }
            }
          }
        }
      },


      tableRowClassName({row,rowIndex}) {
        let arr = this.hoverOrderArr
        for (let i = 0; i < arr.length; i++) {
          if (rowIndex == arr[i]) {
            return 'hovered-row'
          }
        }
      },


      cellMouseEnter(row, column, cell, event) {
        this.rowIndex = row.rowIndex;
        this.hoverOrderArr = [];
        this.OrderIndexArr.forEach(element => {
          if (element.indexOf(this.rowIndex) >= 0) {
            this.hoverOrderArr = element
          }
        })
      },

      cellMouseLeave(row, column, cell, event) {
        this.rowIndex = '-1'
        this.hoverOrderArr = [];
      },
      changepage(currentpage, pagesize) {
        this.$axios({
          method: "get",
          url: `${this.$baseurl}/bsl_admin_web/user/getUserAuthList?optStatus=1&pageIndex=${currentpage}&pageSize=${pagesize}`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(res => {
          this.tableData = [...res.data.data.lists];
          console.log(this.tableData);

          this.tableData.forEach(item => {

            if(item.userIdentityType==1){
              item.newname=item.userName;
            }else if(item.userIdentityType==2){
              item.newname=item.userCompanyCh;
            }
            item.createTime = item.createTime
              ? this.$global.timestampToTime(item.createTime)
              : "-";
            item.optTime = item.optTime
              ? this.$global.timestampToTime(item.optTime)
              : "-";
            if (item.optStatus === 1) {
              item.projectstatus = "审核通过";
            } else if (item.optStatus === 2) {
              item.projectstatus = "审核不通过";
            }
          });

          var rescode = res.data.resultCode;
          this.pagetotal = res.data.data.pageTotal;
        });
      },
      handleClick(row) {
        this.$router.push({
          name: "usercheck",
          query: { idx: row.userId, userIdentityType: row.userIdentityType }
        });
        // this.$router.push("/home/userlist/verified_user/usercheck");
      },
      fromchildren1(data) {
        this.changepage(data.currentpage, data.pagesize);
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
  .Setting{
    margin :0 0 0 50px;
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
      justify-content:flex-end;
      padding: 20px 20px;
      >div{
        display: flex;
        width: 300px;
        /*justify-content: space-between;*/
        section{
          width: 100px;
          background: red;
          margin-right: 20px;
        }
      }
      span.keyword{
        line-height: 40px;
        /*height: 40px;*/
        color: #777777;
        text-align: center;
        margin-right: 20px;
      }
      i{
        height: 40px;
        /*width: 40px;*/
        cursor: pointer;
        margin-left: 20px;
        font-size: 22px;
        line-height: 40px;

        /*height: 40px;*/
        text-align: center;
      }
    }
    main{
      padding: 0 20px 20px 0;
      width: 100%;

    }
  }
</style>
