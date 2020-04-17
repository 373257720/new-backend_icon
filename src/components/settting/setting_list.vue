<template>
  <div class="Setting">
    <header><h2>Setting</h2></header>
    <nav>
    </nav>
    <el-main>
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
            <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">Edit</el-button>
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
        input:'',
        tableData: [
          {
            productType: "General",
            productName: 'Cash Outbox',
          },{
            productType: "General",
            productName: 'Cash Inbox',
          },{
            productType: "Transaction",
            productName: 'Transaction Time',
          },
          // {
          //   productType: "Coin & Price",
          //   productName: 'Transaction Price & Fee',
          // },
          {
            productType: "Receipts",
            productName: 'Website , E-mail , Contact Number',
          },
          // {
          //   productType: "Receipts",
          //   productName: 'E-mail',
          // },{
          //   productType: "Receipts",
          //   productName: 'Contact Number',
          // },
          {
            productType: "Advanced Setting",
            productName: 'Ethereum',
          },
          {
            productType: "Advanced Setting",
            productName: 'Bitgo',
          },
          // {
          //   productType:"Advanced Setting",
          //   productName: 'Machine Configuration',
          // },
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
      handleDelete(index, row) {
        console.log(row)
        this.$routerto('setting_edit',{rowindex:row.rowIndex})
      },
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

        if (columnIndex === 0) {
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
        // if (columnIndex === 2) {
        //     let element = this.OrderIndexArr[2]
        //     let item = element[2]
        //     if(rowIndex==4){
        //     return {
        //             rowspan: 3,
        //             colspan: 1
        //           }
        //   }
        // }
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
        // this.$axios({
        //   method: "get",
        //   url: `${this.$baseurl}/bsl_admin_web/user/getUserAuthList?optStatus=1&pageIndex=${currentpage}&pageSize=${pagesize}`,
        //   headers: {
        //     "Content-Type": "application/x-www-form-urlencoded"
        //   }
        // })

        this.$global.get_encapsulation(`${this.$baseurl}/bsl_admin_web/user/getUserAuthList`,{
          optStatus:1,
          pageIndex:currentpage,
          pageSize:pagesize
        })
          .then(res => {
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
    width: 90%;
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
    .el-button{
      border: 0;
      color: #2ABEE2;
      text-decoration:underline;

    }
    .el-button:focus, .el-button:hover{
      background: none;
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
