<template>
  <div id="dialogReminder">
    <el-dialog
      :visible="remindervisible"
      width="30%"
      :modal="false"
      :before-close="handleClose"
      center
    >
      <span slot="title" class="dialog-footer">{{$t('common.Reminder')}}</span>
      <p class="thick">{{msg}}</p>
      <span slot="footer" class="dialog-footer">
        <button @click="handleClose">{{$t('common.Confirm')}}</button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ["remindervisible", "msg", "successto"],
  data() {
    return {};
  },
  created() {},
  methods: {
    handleClose(done) {
      this.$emit("update:remindervisible", false);
      if (this.successto === 555) {
        this.$router.back(-1);
      } else if (this.successto) {
        this.$router.push({
          name: this.successto,
          params: { editSuccess: "1" }
        });
      }
    }
  }
};
</script>
<style lang="scss">
#dialogReminder {
  .el-dialog--center {
    margin-top: 35vh !important;
    width: 25% !important;
  }
  .el-dialog__header {
    background: #edf1f4;
    font-size: 16px;
    line-height: 30px;
    text-align: left;
    height: 50px;
    box-sizing: border-box;
    padding: 10px 20px;
    position: relative;
  }
  .el-dialog--center .el-dialog__footer {
    padding-top: 0;
    .dialog-footer {
      display: flex;
      width: 100%;
      justify-content: flex-end;
      button {
        cursor: pointer;
        width: 45%;
        line-height: 40px;
        font-size: 16px;
        height: 40px;
        box-sizing: border-box;
        background: #edf1f4;
        border: 1px solid #b7b7b7;
        border-radius: 5px;
        color: #515153;
        text-align: center;
        /*margin-right: 20px;*/
      }
    }
  }
}
</style>
