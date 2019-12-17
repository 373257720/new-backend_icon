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
          <tr v-for="(item,keyword) in tabledata">
            <td class="column">{{item.key}}</td>
            <td class="column" v-if="keyword=='money' || keyword=='price' || keyword=='trade_price'">{{item.value+tabledata['currency_name'].value}}</td>
            <td class="column" v-else-if="keyword=='miner_fee'">{{'$'+tabledata['miner_fee'].miner_money+'/ ฿'+tabledata['miner_fee'].value}}</td>
            <td class="column" v-else-if="keyword=='fee'">{{item.value+'%'}}</td>
            <td class="column" v-else>{{item.value}}</td>

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
          trade_id:{key: 'Transaction ID', value: ''},
          coin_status: {key: 'Status',value:""},
          trade_type: {key: 'Type', value: ''},
          currency_name: {key: 'Currency', value: ''},
          trade_price:{key: 'Purchase Price', value: ''},
          money:  {key: 'Cash', value: ''},
          coin_number:  {key: 'BTC', value: ''},
          user_coin_address: {key: 'Buyer Wallet Address', value: ''},
          miner_fee: {key: 'Miner Fee', value: ''},
          fee:{key: 'Fee Rate', value: ''},
          price:{key: 'Original Price', value: ''},
          redeem_code:{key: 'Order redemption code', value: ''},
        },
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
                if(i=='miner_fee'){
                  this.tabledata[i].miner_money=res.data.data['miner_money'];
                }
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
        /*height: 450px;*/
        margin-bottom: 50px;
        .mailTable{
          margin-right: 50px;
        }
        　.mailTable, .mailTable tr, .mailTable tr td{
          border:1px solid #E6EAEE;
          padding:10px 10px;
        }
        aside{
          width: 25%;
          h3{
            text-align: center;
          }
          div{
            /*width: 100%;*/
            /*height: 30%;*/
            img{
              width: 100%;
              height: 180px;
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

