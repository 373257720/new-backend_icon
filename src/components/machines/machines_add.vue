<template>
  <div class="setting_edit">
    <header><h2>
      <span>Machines</span>
      <i class="el-icon-arrow-right"></i>
      <span>Add</span>
    </h2>
    </header>
    <main>
      <el-steps :active="0" finish-status="wait" simple >
        <el-step title="CryptoGo"  icon="el-icon-info" ><i slot="icon">1</i></el-step>
        <el-step title="Price & Fee" icon="el-icon-info" ><i slot="icon">2</i></el-step>
        <el-step title="Operator" icon="el-icon-info"><i slot="icon">3</i></el-step>
        <el-step title="Advertisement" icon="el-icon-info"><i slot="icon">4</i></el-step>
      </el-steps>
      <router-view v-if='status'  :MachineInfo="MachineInfo"></router-view>
    </main>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        title:'',
        MachineInfo: {},
        status:false,
      };
    },
    watch:{
      // ruleform:{},
  },
    created() {
      this.$global.get_encapsulation(`${this.$baseurl}/admin_api/machine.machine/getMachineInfo`,{token:this.$store.state.token,machine_id:this.$route.query.machine_id}
      ).then(res=>{
        this.MachineInfo=res.data.data;
        this.status = true

      })
    },
    methods: {
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
