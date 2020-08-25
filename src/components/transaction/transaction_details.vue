<template>
  <div class="transcation_details">
    <header>
      <h2>
        <span>{{$t('Transactions.Transactions')}}</span>
        <i class="el-icon-arrow-right"></i>
        <span>{{$t('auditLog.Details')}}</span>
      </h2>
    </header>
    <el-main>
      <article>
        <table class="mailTable">
          <tr v-for="(item,keyword) in tabledata" :key="item.key">
            <td class="column">{{item.key}}</td>
            <td
              class="column"
              v-if="keyword=='money' || keyword=='price' || keyword=='trade_price'"
            >{{item.value+tabledata['currency_name'].value}}</td>
            <td
              class="column"
              v-else-if="keyword=='miner_fee'"
            >{{'$'+tabledata['miner_fee'].miner_money+'/ ฿'+tabledata['miner_fee'].value}}</td>
            <td class="column" v-else-if="keyword=='fee'">{{item.value+'%'}}</td>
            <td class="column" v-else-if="keyword=='coupon_code_list'">
              <p v-if="tabledata.coupon_code_list.value.length<1">-</p>
              <p v-else v-for="(item) in tabledata.coupon_code_list.value" :key="item">{{item}},</p>
              <span v-if="tabledata.coupon_code_list.value.length>0">({{coupon_money}})</span>
            </td>
            <td class="column" v-else-if="keyword=='certificate_url'">
              <el-popover placement="right" width="400" trigger="click">
                <img :src="tabledata.certificate_url.value" alt />
                <span v-if="tabledata.certificate_url.value" class="edit" slot="reference">View</span>
                <span v-else slot="reference">-</span>
              </el-popover>
            </td>
            <td class="column" v-else-if="keyword=='fingerprint_url'">
              <span
                v-if="tabledata.fingerprint_url.value"
                class="edit"
                @click="downloadFingerprint(tabledata.fingerprint_url.value)"
              >{{$t('common.Download')}}</span>
              <span v-else>-</span>
            </td>
            <td class="column" v-else-if="keyword=='picture_url'">
              <el-popover placement="right" width="400" trigger="click">
                <img :src="tabledata.picture_url.value" alt />
                <span
                  v-if="tabledata.picture_url.value"
                  class="edit"
                  slot="reference"
                >{{$t('common.View')}}</span>
                <span v-else slot="reference">-</span>
              </el-popover>
            </td>
            <td class="column" v-else-if="keyword=='redeem_code'">
              <span>{{item.value}}</span>
              <!-- <span v-if="tabledata.trade_type.value==='Buy'"  class="edit blank" @click="sendtocustomers">Send to customer</span> -->
            </td>
            <td class="column" v-else>{{item.value}}</td>
          </tr>
        </table>
        <aside>
          <div>
            <img :src="trade_picture1" alt />
            <h3>{{$t('Transactions.CustomerImages')}}</h3>
          </div>
          <div>
            <img :src="trade_picture2" alt />
            <h3>{{$t('Transactions.CustomerImages')}}</h3>
          </div>
        </aside>
      </article>
      <div id="map"></div>
    </el-main>
    <dialogReminder :msg="msg" :remindervisible.sync="remindervisible"></dialogReminder>
  </div>
</template>
 
<script>
// import google from 'google'
export default {
  data() {
    return {
      msg: "",
      remindervisible: false,
      trade_picture1: "",
      trade_picture2: "",
      address: "",
      coupon_money: "",
      tabledata: {
        trade_id: { key: this.$t("Transactions.TransactionID"), value: "" },
        coin_status: { key: this.$t("Transactions.Status"), value: "" },
        trade_type: { key: this.$t("Transactions.Type"), value: "" },
        currency_name: { key: this.$t("Transactions.Currency"), value: "" },
        trade_price: { key: this.$t("Transactions.PurchasePrice"), value: "" },
        money: { key: this.$t("Transactions.Cash"), value: "" },
        coin_number: { key: "", value: "" },
        customer_coin_address: {
          key: this.$t("Transactions.CryptoGoAddress"),
          value: ""
        },
        user_coin_address: {
          key: this.$t("Transactions.BuyerAddress"),
          value: ""
        },
        miner_fee: { key: this.$t("Transactions.MinerFee"), value: "" },
        fee: { key: this.$t("Transactions.FeeRate"), value: "" },
        price: { key: this.$t("Transactions.OriginalPrice"), value: "" },
        redeem_code: {
          key: this.$t("Transactions.Orderredemption"),
          value: ""
        },
        coupon_code_list: { key: this.$t("Transactions.Coupon"), value: "" },
        certificate_url: {
          key: this.$t("Transactions.Certificate"),
          value: ""
        },
        fingerprint_url: {
          key: this.$t("Transactions.Fingerprint"),
          value: ""
        },
        picture_url: { key: this.$t("Transactions.Picture"), value: "" }
      }
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.$global
      .get_encapsulation(
        `${this.$axios.defaults.baseURL}/admin_api/machine.order/getOrderInfo`,
        {
          order_id: this.$route.query.order_id
        }
      )
      .then(res => {
        if (res.data.ret == 0) {
          this.address = res.data.data.address;
          this.coupon_money = res.data.data.coupon_money;
          this.trade_picture1 =
            this.$axios.defaults.baseURL + res.data.data.trade_picture1;
          this.trade_picture2 =
            this.$axios.defaults.baseURL + res.data.data.trade_picture2;
          let name =
            res.data.data.coin_type.slice(0, 1).toUpperCase() +
            res.data.data.coin_type.slice(1);
          this.tabledata.coin_number.key = name;
          this.tabledata.certificate_url.value = res.data.data.identify
            ? res.data.data.identify.certificate_url
            : "";
          this.tabledata.fingerprint_url.value = res.data.data.identify
            ? res.data.data.identify.fingerprint_url
            : "";
          this.tabledata.picture_url.value = res.data.data.identify
            ? res.data.data.identify.picture_url
            : "";
          for (var i in res.data.data) {
            if (this.tabledata.hasOwnProperty(i)) {
              if (i == "miner_fee") {
                this.tabledata[i].miner_money = res.data.data[i] || "-";
              } else if (i == "trade_type") {
                console.log(res.data.data.trade_type);
                this.tabledata[i].value =
                  res.data.data[i] == 1
                    ? "Buy"
                    : res.data.data[i] == 2
                    ? "Sell"
                    : "-";
              } else if (i == "coupon_code_list") {
                res.data.data["coupon_code_list"] &&
                res.data.data["coupon_code_list"].split(",").length > 0
                  ? (this.tabledata["coupon_code_list"].value = res.data.data[
                      "coupon_code_list"
                    ].split(","))
                  : (this.tabledata["coupon_code_list"].value = []);
              } else {
                this.tabledata[i].value = res.data.data[i]
                  ? res.data.data[i]
                  : "-";
              }
            }
          }
          this.initMaps();
        }
      });
  },

  methods: {
    downloadFingerprint(a) {
      window.location.href = a;
    },
    sendtocustomers() {
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/admin_api/machine.order/sendRedeemCode`,
          {
            order_id: this.$route.query.order_id
          }
        )
        .then(res => {
          this.msg = res.data.msg;
          this.remindervisible = true;
        });
    },
    initMaps() {
      // console.log(google)
      this.maps = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        //设置地图中心点
        center: { lng: 107.3951, lat: 34.491 },
        //为了关闭默认控件集,设置地图的disableDefaultUI的属性为true
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        // 启用缩放和平移
        // gestureHandling: "greedy",
        // hybrid包含卫星和地名
        // mapTypeId: "hybrid",
        //语言可选值：en，zh_en, zh_cn
      });
      var geocoder = new google.maps.Geocoder();
      this.geocodeAddress(geocoder, this.maps);
    },
    // addMarkers() {
    //   this.clearMarkers();
    //   this.markers.forEach(item => {
    //     let marker = new google.maps.Marker({
    //       position: item.position,
    //       map: this.map,
    //       label: {
    //         text: item.ame
    //       }
    //     });
    //     let contentString = ` ${item.content} `;
    //     var infowindow = new google.maps.InfoWindow({
    //       content: contentString
    //     });
    //     //鼠标覆盖时显示弹框，鼠标移开隐藏弹框
    //     marker.addListener("mouseover", () => {
    //       infowindow.open(this.maps, marker);
    //     });
    //     marker.addListener("mouseout", () => {
    //       infowindow.close(this.maps, marker);
    //     });
    //     this.markers.push(marker);
    //   });
    // },
    geocodeAddress(geocoder, resultsMap) {
      if (!this.address) {
        this.address = "hongkong";
      }
      geocoder.geocode({ address: this.address }, function(results, status) {
        if (status === "OK") {
          resultsMap.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
            map: resultsMap,
            position: results[0].geometry.location
          });
        } else {
          // alert(
          //   "Geocode was not successful for the following reason: " + status
          // );
        }
      });
    }
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

<style lang="scss" scoped>
.transcation_details {
  padding: 0 50px 50px 50px;
  width: 90%;
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
  .edit {
    color: #2abee2;
    text-decoration: underline;
    cursor: pointer;
  }
  .blank {
    margin-left: 15px;
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
    height: 100px;
    /*justify-content: space-between;*/
    margin: 20px 0 0 0;
    justify-content: space-between;
    padding: 0 50px 0 20px;
    > div {
      /*flex:1;*/
      section {
        /*display: flex;*/
        display: flex;

        span {
          display: inline-block;
          width: 120px;
          margin-right: 5px;
          text-align: right;
          line-height: 40px;
        }
        div {
          flex: 1;
        }

        /*flex-direction: column;*/
      }
      .button {
        /*width: 30px;*/
        height: 40px;
        /*background: red;*/
      }
      section:nth-child(1) {
        margin-bottom: 10px;
      }
    }
  }
  main {
    padding: 20px 20px 20px 0;
    article {
      display: flex;
      /*width: 90%;*/
      /*height: 450px;*/
      margin-bottom: 50px;
      .mailTable {
        width: 80%;
        margin-right: 50px;
      }
      @media (max-width: 1024px) {
        .mailTable {
          width: 100%;
          margin-right: 0;
        }
      }

      　.mailTable,
      .mailTable tr {
        border: 1px solid #d4d4d4;
        color: #7a7a7a;
      }
      .mailTable tr td {
        border: none;
        padding: 10px 10px;
      }

      aside {
        width: 25%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        h3 {
          text-align: center;
          color: #7a7a7a;
        }
        div {
          /*width: 100%;*/

          /*height: 30%;*/
          img {
            display: block;
            font-size: 0;
            width: 100%;
            height: 220px;
            margin-bottom: 5px;
            border: 1px solid #d4d4d4;
          }
        }
      }
      @media (max-width: 1024px) {
        aside {
          flex-direction: initial;
          width: 100%;
          margin-top: 20px;
          h3 {
            text-align: center;
            color: #7a7a7a;
          }
          div {
            /*width: 100%;*/
            width: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            /*height: 30%;*/
            img {
              display: block;
              font-size: 0;
              width: 80%;
              height: 220px;
              margin-bottom: 5px;
              border: 1px solid #d4d4d4;
            }
          }
        }
      }
    }
    @media (max-width: 1024px) {
      article {
        flex-wrap: wrap;
      }
    }

    #map {
      /*width: 90%;*/
      height: 400px;
      box-sizing: border-box;
      border: 1px solid #d4d4d4;
    }
  }
}
</style>

