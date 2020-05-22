<template>
  <div id="confirm_dialog">
    <el-dialog
      :visible="remindervisible1"
      width="30%"
      :modal="false"
      :before-close="handleClose"
      center>
      <span slot="title" class="dialog-footer">Reminder</span>
      <p class="thick">{{msg}}</p>
      <span slot="footer" class="dialog-footer">
        <button  @click="handleClose">Cancel</button>
        <button @click="handledele">Yes</button>
    </span>
    </el-dialog>
  </div>

</template>
<script>
  export default {
    props:['remindervisible1','msg'],
    data() {
      return {
        // message:'kjsjlkdsjkldsjfkldsjfklsdjfskljf',
      };
    },
    created() {
    },
    methods: {
      handleClose(done) {
        this.$emit("update:remindervisible1", false)
        // this.$emit("tell_delete", false)

      },
      handledele(){
        this.$emit("todad");
        this.$emit("update:remindervisible1", false);
      }
    },
  };
</script>
<style lang="scss">
  #confirm_dialog{
    .el-dialog--center {
      margin-top: 35vh !important;
      width: 25% !important;
    }
    .el-dialog__header{
      background: #EDF1F4;
      font-size: 16px;
      line-height: 30px;
      text-align: left;
      height: 50px;
      box-sizing: border-box;
      padding: 10px 20px;
      position: relative;
    }
    .el-dialog--center .el-dialog__footer {
      padding-top:0;
      .dialog-footer{
        display: flex;
        width: 100%;
        justify-content: space-between;
        button{
          cursor: pointer;
          width: 45%;
          line-height: 40px;
          font-size: 16px;
          height: 40px;
          box-sizing: border-box;
          background: #EDF1F4;
          border: 1px solid #B7B7B7;
          border-radius: 5px;
          color:#515153;
          text-align: center;
          /*margin-right: 20px;*/
        }
        button:nth-of-type(2){
             background: #2ABEE2;
             border: 1px solid #2ABEE2;
             color:white;
        }

      }
    }
  }


</style>
