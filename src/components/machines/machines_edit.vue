<template>
  <div id="machines_edit">
    <header>
      <h2>
        <span>{{$t('machines.Machines')}}</span>
        <i class="el-icon-arrow-right"></i>
        <span>{{$t('common.Edit')}}</span>
      </h2>
    </header>
    <main>
      <el-tabs v-model="activeName" :stretch="true" @tab-click="handleClick">
        <el-tab-pane :label="$t('machines.CryptoGo')" name="edit_1st"></el-tab-pane>
        <el-tab-pane  :label="$t('machines.PriceFee')"  name="edit_2nd"></el-tab-pane>
        <el-tab-pane :label="$t('machines.Flow')" name="edit_3rd"></el-tab-pane>
        <el-tab-pane :label="$t('machines.Operator')" name="edit_4th"></el-tab-pane>
        <el-tab-pane  :label="$t('machines.Advertisement')" name="edit_5th"></el-tab-pane>
      </el-tabs>
      <keep-alive>
        <router-view v-if="status" v-on:getchildren="fromchildren" :MachineInfo="MachineInfo"></router-view>
      </keep-alive>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "",
      // title: "",
      MachineInfo: {},
      status: false,
      // isupdated: false,
      machineId: this.$route.query.machine_id
    };
  },
  watch: {
    $route(to, from) {
      this.activeName = to.name;
    }
  },
  created() {
    if (this.$route.name) {
      this.activeName = this.$route.name;
    }
    this.getInfor();
  },
  methods: {
    fromchildren() {
      // this.isupdated=true;
    },
    getInfor() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/admin_api/machine.machine/getMachineInfo`,
          { machine_id: this.machineId }
        )
        .then(res => {
          // console.log(res)
          this.MachineInfo = res.data.data;
          [
            "is_register",
            "is_support_ethereum",
            "is_support_bitcoin",
            "machine_group_id",
            "country_id",
            "currency_id",
            "is_redeem_coin",
            "is_redeem_money",
            "is_coupon"
          ].forEach(item => {
            this.MachineInfo[item] = parseInt(this.MachineInfo[item]);
          });
          // console.log();

          // is_redeem_money
          this.status = true;
        });
    },
    handleClick(tab, event) {
      this.$routerto(tab.name, { machine_id: this.$route.query.machine_id });
    }
  }
};
</script>

<style lang='scss'>
#machines_edit {
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
    color: #777777;
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
      justify-content: space-between;
      button {
        width: 40%;
        height: 40px;
        cursor: pointer;
        background: #ddd;
        color: white;
        font-size: 16px;
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
