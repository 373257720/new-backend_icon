<template>
  <div class="edit_group_edit">
    <header>
      <h2>
        <span>{{$t('machines.Machines')}}</span>
        <i class="el-icon-arrow-right"></i>
        <span>{{$t('machines.EditGroup')}}</span>
      </h2>
    </header>
    <main>
      <el-tabs v-if="status" v-model="activeName" :stretch="true" @tab-click="handleClick">
        <el-tab-pane :label="$t('machines.GroupPattern')" name="first">
          <add1st :tochind="MachineInfo" v-on:getchildren="fromchildren"></add1st>
        </el-tab-pane>
        <el-tab-pane :label="$t('machines.PriceFee')" name="second">
          <add2nd :tochind="MachineInfo" v-on:getchildren="fromchildren" v-on:back="back_fromson"></add2nd>
        </el-tab-pane>
        <el-tab-pane :label="$t('machines.Operator')" name="third">
          <add3rd
            :tochind="MachineInfo"
            :submitfordata="submitfordata"
            v-on:back="back_fromson"
            v-on:getchildren="fromchildren"
          ></add3rd>
        </el-tab-pane>
        <el-tab-pane :label="$t('machines.Advertisement')" name="fourth">
          <add4th
            :tochind="MachineInfo"
            :submitfordata="submitfordata"
            v-on:back="back_fromson"
            v-on:getchildren="fromchildren"
          ></add4th>
        </el-tab-pane>
      </el-tabs>
    </main>
  </div>
</template>

<script>
import add1st from "@/components/machines/add_1st";
import add2nd from "@/components/machines/add_2nd";
import add3rd from "@/components/machines/add_3rd";
import add4th from "@/components/machines/add_4th";
export default {
  data() {
    return {
      activeName: "first",
      title: "",
      MachineInfo: {},
      submitfordata: {
        machine_group_id: this.$route.query.machine_group_id,
        name: "",
        currency_id: "",
        alert_mobile: "",
        alert_email: "",
        country_id: "",
        address: "",
        longitude: "",
        latitude: "",
        zip_code: "",
        company_name_simplify: "",
        company_name_traditional: "",
        company_name_english: "",
        company_name_japanese: "",
        company_name_korean: "",
        company_name_malaysian: "",
        company_name_thai: "",
        customer_service_mobile: "",
        customer_service_email: "",
        is_support_buy: "",
        is_support_sell: "",
        minimum_bitcoin_buy: "",
        maximum_bitcoin_buy: "",
        buy_bitcoin_fee: "",
        sell_bitcoin_fee: "",
        is_support_bitcoin: "",
        minimum_ethereum_buy: "",
        maximum_ethereum_buy: "",
        buy_ethereum_fee: "",
        sell_ethereum_fee: "",
        is_support_ethereum: "",
        is_register: "",
        shortcut_money: "",
        in_support_money: "",
        out_support_money: "",
        background_picture_id: "",
        logo_picture_id: "",
        logo2_picture_id: "",
        advertisement_picture_id: "",
        advertisement_language: "",
        machine_picture_id: ""
      },
      status: false
    };
  },
  components: {
    add1st,
    add2nd,
    add3rd,
    add4th
  },

  watch: {
    // $route(to,from){
    //   switch(to.name) {
    //     case 'add_1st':
    //       this.activeName='first';
    //       break;
    //     case 'add_2nd':
    //       this.activeName='second';
    //       break;
    //     case  'add_3rd':
    //       this.activeName='third';
    //       break;
    //     case  'add_4th':
    //       this.activeName='fourth';
    //       break;
    //   }
    // }
  },
  created() {
    this.$global
      .get_encapsulation(
        `${this.$axios.defaults.baseURL}/admin_api/machine.machine_group/getMachineGroupInfo`,
        {
          machine_group_id: this.$route.query.machine_group_id
        }
      )
      .then(res => {
        this.MachineInfo = res.data.data;
        // console.log(this.MachineInfo);
        Object.keys(this.MachineInfo.company_name).forEach(key => {
          let newkey = "company_name_" + key;
          this.MachineInfo[newkey] = this.MachineInfo.company_name[key];
        });

        // this.MachineInfo["is_buy_sell"] = parseInt(
        //   this.MachineInfo["is_buy_sell"]
        // );
        // this.MachineInfo["is_register"] = parseInt(
        //   this.MachineInfo["is_register"]
        // );
        // this.MachineInfo["is_support_bitcoin"] = parseInt(
        //   this.MachineInfo["is_support_bitcoin"]
        // );
        // this.MachineInfo["is_support_buy"] = parseInt(
        //   this.MachineInfo["is_support_buy"]
        // );
        // this.MachineInfo["is_support_ethereum"] = parseInt(
        //   this.MachineInfo["is_support_ethereum"]
        // );
        // this.MachineInfo["is_support_sell"] = parseInt(
        //   this.MachineInfo["is_support_sell"]
        // );
        // this.MachineInfo["currency_id"] = parseInt(
        //   this.MachineInfo["currency_id"]
        // );
        // ({} = node);
        [
          "is_buy_sell",
          "is_register",
          "is_support_bitcoin",
          "is_support_buy",
          "is_support_ethereum",
          "is_support_sell",
          "currency_id"
        ].forEach(item => {
          this.MachineInfo[item] = parseInt(this.MachineInfo[item]);
        });
        //  console.log(this.MachineInfo['machine_group_id']);
        // console.log(this.MachineInfo);

        this.status = true;
      });
  },
  methods: {
    back_fromson(num) {
      // console.log(num)
      this.activeName = num;
    },
    fromchildren(a, b) {
      if (a) {
        this.submitfordata = Object.assign(this.submitfordata, a);
      }
      if (b) {
        this.activeName = b;
      }
      console.log(this.activeName);
      // console.log(this.MachineInfo);
    },
    handleClick(tab, event) {}
  }
};
</script>

<style lang='scss'>
.edit_group_edit {
  margin: 0 0 0 50px;
  width: 90%;

  header {
    position: relative;
    height: 80px;
    border-bottom: 1px solid #d3d3d3;

    h2 {
      font-size: 20px;
      position: absolute;
      bottom: 20px;
      /*font-weight: 550;*/
    }
  }

  /*.el-tabs__nav-wrap::after{*/
  /*  background: none;*/
  /*}*/
  .el-tabs__item {
    font-weight: 600;
    color: #c0c4cc;
  }

  .el-tabs__item.is-active {
    color: #2abee2;
  }

  .el-tabs__active-bar {
    background: #2abee2;
  }

  .el-tabs__item:hover {
    color: #2abee2;
  }

  .el-tabs__nav {
    /*width: 100%;*/
    /*display: flex;*/
    /*justify-content: space-between;*/
  }

  .el-form--label-top .el-form-item__label {
    padding: 0;
  }

  main {
    margin: 30px auto 60px;
    width: 640px;

    .el-steps--simple {
      padding: 0;
      background: none;
    }

    .el-steps--simple {
      margin-bottom: 20px;
    }

    section {
      display: flex;
      margin-top: 50px;
      justify-content: space-between;

      button {
        width: 40%;
        height: 40px;
        cursor: pointer;
        color: white;
        font-size: 16px;
        background: #ddd;
        line-height: 40px;
        border-radius: 5px;
      }

      button:nth-of-type(2) {
        background: url("../../../static/savechange.png") no-repeat;
        background-size: cover;
      }
    }
  }
}
</style>
