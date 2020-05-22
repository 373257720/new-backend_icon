<template>
  <div id="dialog_reminder">
    <el-dialog
      :visible="remindervisible"
      width="30%"
      :modal="false"
      :before-close="handleClose"
      center>
      <span slot="title" class="dialog-footer">Reminder</span>
      <p class="thick">{{msg}}</p>
      <span slot="footer" class="dialog-footer">

        <button @click="handleClose">Confirm</button>
    </span>
    </el-dialog>
  </div>

</template>
<script>
  export default {
    props:['remindervisible','msg','successto'],
    data() {
      return {
        // message:'kjsjlkdsjkldsjfkldsjfklsdjfskljf',
      };
    },
    created() {
    },
    methods: {
      handleClose(done) {
        this.$emit("update:remindervisible", false)
        // console.log(this.successto)
        if(this.successto===555){
          this.$router.back(-1);
        }else if(this.successto){
          // this.$routerto(this.successto)
          this.$router.push({ name: this.successto, params: { editSuccess: '1' } })
        }
      }
    },
  };
</script>
<style lang="scss">
    #dialog_reminder{
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
          justify-content: flex-end;
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

        }
      }
    }


</style>
