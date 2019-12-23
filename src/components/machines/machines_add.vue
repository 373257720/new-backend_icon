<template>
  <div class="setting_edit">
    <header><h2>
      <span>Machines</span>
      <i class="el-icon-arrow-right"></i>
      <span>Add</span>
    </h2>
    </header>
    <main>
<!--        <el-tabs v-model="activeName" :stretch="true" @tab-click="handleClick">-->
<!--          <el-tab-pane label="Group Pattern" name="first"></el-tab-pane>-->
<!--          <el-tab-pane label="CryptoGo" name="first"></el-tab-pane>-->
<!--          <el-tab-pane label="Price & Fee" name="second"></el-tab-pane>-->
<!--          <el-tab-pane label="Operator" name="third"></el-tab-pane>-->
<!--          <el-tab-pane label="Advertisement" name="fourth"></el-tab-pane>-->
<!--        </el-tabs>-->
      <el-tabs v-model="activeName" :stretch="true" @tab-click="handleClick">
        <el-tab-pane label="Group Pattern" name="first"></el-tab-pane>
        <el-tab-pane label="Price & Fee" name="second"></el-tab-pane>
        <el-tab-pane label="Operator" name="third"></el-tab-pane>
        <el-tab-pane label="Advertisement" name="fourth"></el-tab-pane>
      </el-tabs>
<!--      <el-steps :active="0" finish-status="wait" simple >-->
<!--        <el-step title="CryptoGo"  icon="el-icon-info" ><i slot="icon">1</i></el-step>-->
<!--        <el-step title="Price & Fee" icon="el-icon-info" ><i slot="icon">2</i></el-step>-->
<!--        <el-step title="Operator" icon="el-icon-info"><i slot="icon">3</i></el-step>-->
<!--        <el-step title="Advertisement" icon="el-icon-info"><i slot="icon">4</i></el-step>-->
<!--      </el-steps>-->
      <router-view v-if='status'  v-on:getchildren="fromchildren"  :MachineInfo="MachineInfo"></router-view>
    </main>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName:'',
        title:'',
        MachineInfo: {},
        status:false,
      };
    },

    watch:{
      $route(to,from){
        switch(to.name) {
          case 'add_1st':
            this.activeName='first';
            break;
          case 'add_2nd':
            this.activeName='second';
            break;
          case  'add_3rd':
            this.activeName='third';
            break;
          case  'add_4th':
            this.activeName='fourth';
            break;
        }
      }
    },
    created() {
      if(this.$route.name){
        switch(this.$route.name) {
          case 'add_1st':
            this.activeName='first';
            break;
          case 'add_2nd':
            this.activeName='second';
            break;
          case  'add_3rd':
            this.activeName='third';
            break;
          case  'add_4th':
            this.activeName='fourth';
            break;
        }
      }
      this.fromchildren();
    },
    methods: {
      fromchildren(){
        this.$global.get_encapsulation(`${this.$baseurl}/admin_api/machine.machine/getMachineInfo`,{token:this.$store.state.token,machine_id:this.$route.query.machine_id}
        ).then(res=>{
          console.log(res)
          this.MachineInfo=res.data.data;
          this.MachineInfo['is_register']=parseInt(this.MachineInfo['is_register']);
          this.MachineInfo['is_support_ethereum']=parseInt(this.MachineInfo['is_support_ethereum']);
          this.MachineInfo['is_support_bitcoin']=parseInt(this.MachineInfo['is_support_bitcoin']);
          this.status = true;
        })
      },
      handleClick(tab, event) {
        // console.log(tab, event);
        if(tab.name=='first'){
          this.$routerto('add_1st',{machine_id:this.$route.query.machine_id});
        }
        if(tab.name=='second'){
          this.$routerto('add_2nd',{machine_id:this.$route.query.machine_id});
        };
        if(tab.name=='third'){
          this.$routerto('add_3rd',{machine_id:this.$route.query.machine_id});
        }
        if(tab.name=='fourth'){
          this.$routerto('add_4th',{machine_id:this.$route.query.machine_id});
        }
      }
      // fromchildren(data) {
      //   this.$global.get_encapsulation(`${this.$baseurl}/admin_api/machine.machine/getMachineInfo`,{token:this.$store.state.token,machine_id:this.$route.query.machine_id}
      //   ).then(res=>{
      //     console.log(res )
      //     this.MachineInfo=res.data.data;
      //   })
      //
      // },
    },
  };
</script>

<style lang='scss'>
  .setting_edit{
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
