<template>
  <div id="machines_edit">
    <header><h2>
      <span>Machines</span>id
      <i class="el-icon-arrow-right"></i>
      <span>Edit</span>
    </h2>
    </header>
    <main>
        <el-tabs v-model="activeName" :stretch="true" @tab-click="handleClick">
          <el-tab-pane label="CryptoGo" name="edit_1st"></el-tab-pane>
          <el-tab-pane label="Price & Fee" name="edit_2nd"></el-tab-pane>
          <el-tab-pane label="Flow" name="edit_3rd"></el-tab-pane>
          <el-tab-pane label="Operator" name="edit_4th"></el-tab-pane>
          <el-tab-pane label="Advertisement" name="edit_5th"></el-tab-pane>
        </el-tabs>
        <keep-alive >
           <router-view v-if='status'   v-on:getchildren="fromchildren"  :MachineInfo="MachineInfo"></router-view>
        </keep-alive>
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
        isupdated:false,
        machineId:this.$route.query.machine_id
      };
    },
    watch:{
      $route(to,from){
        this.activeName=to.name;
      }
    },
    created() {
      if(this.$route.name){
        this.activeName=this.$route.name;
      }
      this.getInfor();
    },
    methods: {
      fromchildren(){
          // this.isupdated=true;
      },
      getInfor(){
        this.$global.get_encapsulation(`${this.$baseurl}/admin_api/machine.machine/getMachineInfo`,
        {machine_id:this.machineId}
        ).then(res=>{
          // console.log(res)
          this.MachineInfo=res.data.data;
          this.MachineInfo['is_register']=parseInt(this.MachineInfo['is_register']);
          this.MachineInfo['is_support_ethereum']=parseInt(this.MachineInfo['is_support_ethereum']);
          this.MachineInfo['is_support_bitcoin']=parseInt(this.MachineInfo['is_support_bitcoin']);
          this.status = true;
        })
      },
      handleClick(tab, event) {
         this.$routerto(tab.name,{machine_id:this.$route.query.machine_id});
      }
    },
  };
</script>

<style lang='scss'>
  #machines_edit{
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
    /*.el-tabs__nav-wrap::after{*/
    /*  background: none;*/
    /*}*/
    .el-tabs__item{
      font-weight: 600;
      color: #777777;
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
          background: #ddd;
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
