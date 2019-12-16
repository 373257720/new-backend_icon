<template>
  <div class="transcation_lists">
    <header><h2>
      <span>Transactions</span>
      <i class="el-icon-arrow-right"></i>
      <span>Test Machine</span>
    </h2>
    </header>
    <el-main>
      <article>
        <table class="mailTable" style="width:60%;" >
          <tr v-for="(item) in tabledata">
            <td class="column">{{item.key}}</td>
            <td class="column">{{item.value}}</td>
          </tr>
        </table>
        <aside>
          <h3>Customers Images</h3>
          <div><img :src="trade_picture1" alt=""></div>
          <div><img :src="trade_picture2" alt=""></div>
        </aside>
      </article>
      <div class="map">
      </div>
    </el-main>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        trade_picture1:'',
        trade_picture2:'',
        tabledata:{
          trade_id:{key: 'Transaction ID', value: '篮球'},
          currency_id: {key: 'Currency', value: '2017-03-01'},
          coin_status: {key: 'Status',value:""},
          trade_type: {key: 'Type', value: '120.00'},
          price:{key: 'Purchase Price', value: '在线支付'},
          money:  {key: 'Cash', value: '北京市海淀区西北旺镇'},
          coin_number:  {key: 'BTC', value: '120.00'},
          user_coin_address: {key: 'Buyer Wallet Address', value: '在线支付'},
          miner_fee: {key: 'Miner Fee', value: '北京市海淀区西北旺镇'},
        },
        // tableData: [
          // {key: 'ATM Wallet Address', value: '2017-03-01'},
          // {key: 'Fee Rate', value: '2017-03-01'},
          // {key: 'Original Price', value: '在线支付'},
          // {key: 'Order redemption code', value: '北京市海淀区西北旺镇'},
        // ],
      };
    },
    computed: {
    },
    created() {
        this.$global.get_encapsulation(`${this.$baseurl}/admin_api/machine.order/getOrderInfo`,{
          token:this.$store.state.token,
          order_id: this.$route.query.order_id,
        }).then(res => {
          console.log(res);

          if(res.data.ret==0){
            this.trade_picture1=this.$baseurl+res.data.data.trade_picture1;
            this.trade_picture2=this.$baseurl+res.data.data.trade_picture2;
            for(var i in res.data.data){
              if(this.tabledata.hasOwnProperty(i)){
                    this.tabledata[i].value=res.data.data[i];
              }
            }

          }
        });
    },
    methods: {



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

          /*flex-direction: column;*/
        }
        .button{
          /*width: 30px;*/
          height: 40px;
          /*background: red;*/
        }
        section:nth-child(1){
          margin-bottom:10px;
        }
      }

    }
    main{
      padding:20px 20px 20px 0;
      article{
        display: flex;
        margin-bottom: 50px;
        .mailTable{
          margin-right: 50px;
        }
        　.mailTable, .mailTable tr, .mailTable tr td{
          border:1px solid #E6EAEE;
          padding: 5px 10px;
        }
        aside{
          width: 25%;
          div{
            /*width: 100%;*/
            height: 30%;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
      }


      div.map{
        width: 100%;
        height: 200px;
        border: 1px solid red;
      }
    }

  }
</style>

