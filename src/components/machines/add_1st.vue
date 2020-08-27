<template>
  <div class="add_first">
    <el-form
      :model="ruleForm"
      label-position="top"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item :label="$t('machines.Group')+':'">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('machines.WarningEmailAddress')+':'" prop="alert_email">
        <el-input v-model="ruleForm.alert_email"></el-input>
      </el-form-item>
      <el-form-item :label="$t('machines.EmergentContactNumber')+':'">
        <el-input v-model="ruleForm.alert_mobile"></el-input>
      </el-form-item>
    </el-form>
    <section>
      <button @click="$global.previous">{{$t('common.BACK')}}</button>
      <button @click="submitForm('ruleForm')">{{$t('common.NEXT')}}</button>
    </section>
    <!--    <dialogReminder :msg="msg" :remindervisible.sync="remindervisible"></dialogReminder>-->
  </div>
</template>
<script>
export default {
  props: ["tochind"],
  data() {
    return {
      CountryList: [],
      groupList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
      machine_picture: "",
      ruleForm: {
        name: "",
        alert_email: "",
        alert_mobile: ""
      },
      rules: {
        alert_email: [
          {
            message: this.$t("machines.PleaseInputEmailAddress"),
            trigger: "blur"
          },
          {
            type: "email",
            message: this.$t("machines.PleaseInputCorrectEmailAddress"),
            trigger: ["blur", "change"]
          }
        ],
      }
    };
  },
  mounted() {
    if (this.$route.query.type == 2) {
      for (let i in this.ruleForm) {
        if (this.tochind.hasOwnProperty(i)) {
          this.ruleForm[i] = this.tochind[i];
        }
      }
    }
  },
  created() {
    let axiosList = [
      this.$axios.get(
        `${this.$axios.defaults.baseURL}/admin_api/content.country/getCountryList`,
        {
          params: { token: this.$store.state.token, lang:localStorage.getItem("lan") || "en-us"}
        }
      ),
      this.$axios.get(
        `${this.$axios.defaults.baseURL}/admin_api/machine.machine_group/getMachineGroupList`,
        {
          params: {
            token: this.$store.state.token,
            page: 1,
            size: 10000,
            keyword: ""
          }
        }
      )
    ];
    this.$axios.all(axiosList).then(
      this.$axios.spread((res1, res2) => {
        if (res1) {
          console.log(res1);
          for (let i = 0; i < res1.data.data.data.length; i++) {
            this.CountryList.push({
              value: res1.data.data.data[i].country_id,
              label: res1.data.data.data[i].name
            });
          }
        }
        if (res2) {
          this.groupList.push({ value: "0", label: "-" });
          for (let i = 0; i < res2.data.data.data.length; i++) {
            this.groupList.push({
              value: res2.data.data.data[i].machine_group_id,
              label: res2.data.data.data[i].name
            });
          }
        }
      })
    );
  },
  watch: {
    ruleForm: {
      handler(newValue, oldValue) {
        this.$emit("getchildren", this.ruleForm);
      },
      deep: true
    }
  },
  methods: {
    submitForm() {
      this.$emit("getchildren", "", "second");
    }
  }
};
</script>

<style lang='scss'>
.add_first {
  .el-select {
    width: 100%;
  }
  .project_pic {
    position: relative;
    height: 200px;
    .el-upload-list--picture-card .el-upload-list__item {
      margin: 0;
      transform: none;
      bottom: 0;
      width: 100%;
      height: 200px;
      position: absolute;
      /*box-sizing: border-box;*/
    }
    .el-upload-list__item.is-success .el-upload-list__item-status-label {
      display: none;
    }
    .el-upload--picture-card {
      /*display: none;*/
      bottom: 0;
      width: 100%;
      /*box-sizing: border-box;*/
      height: 200px;
      border: 1px solid #c0ccda;
      background: white;
      position: absolute;
    }
    .el-icon-plus {
      line-height: 200px;
    }
  }
}
</style>

