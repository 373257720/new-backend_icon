<template>
  <div class="edit_group_edit">
    <header><h2>
      <span>Machines</span>
      <i class="el-icon-arrow-right"></i>
      <span>Edit Group</span>
    </h2>
    </header>
    <main >
      <el-tabs v-if="status" v-model="activeName" :stretch="true" @tab-click="handleClick">
        <el-tab-pane label="Group Pattern" name="first">
          <add_1st  :tochind="MachineInfo" v-on:getchildren="fromchildren" ></add_1st>
        </el-tab-pane>
        <el-tab-pane label="Price & Fee" name="second">
          <add_2nd :tochind="MachineInfo" v-on:getchildren="fromchildren"  v-on:back="back_fromson"></add_2nd>
        </el-tab-pane>
        <el-tab-pane label="Operator" name="fourth">
          <add_3rd  :tochind="MachineInfo" :submitfordata="submitfordata"  v-on:back="back_fromson" v-on:getchildren="fromchildren"></add_3rd>
        </el-tab-pane>
        <el-tab-pane label="Advertisement" name="fifth">
          <add_4th  :tochind="MachineInfo" :submitfordata="submitfordata"  v-on:back="back_fromson" v-on:getchildren="fromchildren"></add_4th>
        </el-tab-pane>
      </el-tabs>
    </main>
  </div>
</template>

<script>
  import add_1st from '@/components/machines/add_1st';
  import add_2nd from '@/components/machines/add_2nd';
  import add_3rd from '@/components/machines/add_3rd';
  import add_4th from '@/components/machines/add_4th';
  export default {
    data() {
      return {
        activeName:'first',
        title:'',
        MachineInfo: {
        },
        submitfordata:{
          machine_group_id:this.$route.query.machine_group_id,
          name:'',
          currency_id:'',
          alert_mobile:'',
          alert_email:'',
          country_id:'',
          address:'',
          longitude:'',
          latitude:'',
          zip_code:'',
          company_name:'',
          customer_service_mobile:'',
          customer_service_email:'',
          is_support_buy:'',
          is_support_sell:'',
          minimum_bitcoin_buy:'',
          maximum_bitcoin_buy:'',
          buy_bitcoin_fee:'',
          sell_bitcoin_fee:'',
          is_support_bitcoin:'',
          minimum_ethereum_buy:'',
          maximum_ethereum_buy:'',
          buy_ethereum_fee:'',
          sell_ethereum_fee:'',
          is_support_ethereum:'',
          is_register:'',
          shortcut_money:'',
          in_support_money:'',
          out_support_money:'',
          background_picture_id:'',
          logo_picture_id:'',
          logo2_picture_id:'',
          advertisement_picture_id:'',
          advertisement_language:'',
          machine_picture_id:'',
        },
        status:false,
      };
    },
    components:{
      add_1st,
      add_2nd,
      add_3rd,
      add_4th,
    },

    watch:{
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
      this.$global.get_encapsulation(`${this.$baseurl}/admin_api/machine.machine_group/getMachineGroupInfo`,{machine_group_id:this.$route.query.machine_group_id}
      ).then(res=>{
        this.MachineInfo=res.data.data;
        console.log(this.MachineInfo);

        this.MachineInfo['is_buy_sell']=parseInt(this.MachineInfo['is_buy_sell']);
        this.MachineInfo['is_register']=parseInt(this.MachineInfo['is_register']);
        this.MachineInfo['is_support_bitcoin']=parseInt(this.MachineInfo['is_support_bitcoin']);
        this.MachineInfo['is_support_buy']=parseInt(this.MachineInfo['is_support_buy']);
        this.MachineInfo['is_support_ethereum']=parseInt(this.MachineInfo['is_support_ethereum']);
        this.MachineInfo['is_support_sell']=parseInt(this.MachineInfo['is_support_sell']);
        this.status = true;
      })
    },
    methods: {
      back_fromson(num){
        // console.log(num)
        this.activeName=num;
      },
      fromchildren(a,b){
        if(a){
          this.submitfordata=Object.assign(this.submitfordata,a)
        }
        if(b){
          this.activeName=b;
        }
        console.log(this.MachineInfo);

      },
      handleClick(tab, event) {
      }
    },
  };
</script>

<style lang='scss'>
  .edit_group_edit{
    margin :0 0 0 50px;
    width: 90%;
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
    /*.el-tabs__nav-wrap::after{*/
    /*  background: none;*/
    /*}*/
    .el-tabs__item{
      font-weight: 600;
      color: #C0C4CC;
    }

    .el-tabs__item.is-active{
      color: #2ABEE2;

    }
    .el-tabs__active-bar{
      background:#2ABEE2;
    }
    .el-tabs__item:hover{
      color: #2ABEE2;
    }
    .el-tabs__nav{
      /*width: 100%;*/
      /*display: flex;*/
      /*justify-content: space-between;*/

    }
    .el-form--label-top .el-form-item__label{
      padding: 0;
    }
    main{
      margin:30px  auto 60px;
      width: 640px;
      .el-steps--simple{
        padding: 0;
        background: none;
      }
      .el-steps--simple {
        margin-bottom: 20px;
      }
      section{
        display: flex;
        justify-content: space-between;
        button{
          width: 40%;
          height: 40px;
          cursor: pointer;
          color: white;
          font-size: 16px;
          background: #ddd;
          line-height: 40px;
          border-radius: 5px;
        }
        button:nth-of-type(2){
          background:url("../../../static/savechange.png") no-repeat;
          background-size: cover;
        }
      }
    }
  }
</style>
