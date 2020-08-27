<template>
  <div class="edit_third">
    <el-form
      :model="ruleForm"
      label-position="top"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <div class="Operator">{{$t('machines.Operator')}}:</div>
      <div class="companyName" :label="$t('machines.Operator')+':'">
        <el-form-item prop="name">
          <p>简体:</p>
          <el-input clearable v-model="ruleForm.company_name_simplify"></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <p>繁體:</p>
          <el-input clearable v-model="ruleForm.company_name_traditional"></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <p>English:</p>
          <el-input clearable v-model="ruleForm.company_name_english"></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <p>日本語:</p>
          <el-input clearable v-model="ruleForm.company_name_japanese"></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <p>한국어:</p>
          <el-input clearable v-model="ruleForm.company_name_korean"></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <p>Melayu:</p>
          <el-input clearable v-model="ruleForm.company_name_malaysian"></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <p>ไทย:</p>
          <el-input clearable v-model="ruleForm.company_name_thai"></el-input>
        </el-form-item>
      </div>
      <el-form-item :label="$t('machines.Tel')+':'" prop="name">
        <el-input clearable v-model="ruleForm.customer_service_mobile"></el-input>
      </el-form-item>
      <el-form-item :label="$t('machines.Email')+':'" prop="customer_service_email">
        <el-input clearable v-model="ruleForm.customer_service_email"></el-input>
      </el-form-item>
      <el-form-item :label="$t('machines.SafeModePassword')+':'" prop="safe_password">
        <el-input
          clearable
          show-password
          oninput="value=value.replace(/[^\d]/g,'')"
          v-model="ruleForm.safe_password"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('machines.WithdrawlPassword')+':'" prop="withdraw_password">
        <el-input
          clearable
          show-password
          oninput="value=value.replace(/[^\d]/g,'')"
          v-model="ruleForm.withdraw_password"
        ></el-input>
      </el-form-item>
    </el-form>
    <section>
      <button @click="$global.previous">{{$t('common.BACK')}}</button>
      <button @click="submitForm('ruleForm')">{{$t('common.SUBMIT')}}</button>
    </section>
    <dialogReminder :msg="msg" :remindervisible.sync="remindervisible"></dialogReminder>
  </div>
</template>
<script>
export default {
  props: ["MachineInfo"],
  data() {
    var validatePass = (rule, value, callback) => {
      // if
      // (value === '') {
      //   callback(new Error('请输入密码'));
      // } else {
      if (value !== "") {
        this.$refs.ruleForm.validateField("checkPass");
      }
      callback();
      // }
    };
    return {
      msg: "",
      remindervisible: false,
      ruleForm: {
        machine_id: "",
        company_name_simplify: "",
        company_name_traditional: "",
        company_name_english: "",
        company_name_japanese: "",
        company_name_korean: "",
        company_name_malaysian: "",
        company_name_thai: "",
        customer_service_mobile: "",
        customer_service_email: "",
        safe_password: "",
        withdraw_password: ""
      },
      rules: {
        safe_password: [
          {
            validator: validatePass,
            trigger: "blur"
          },
          {
            min: 5,
            max: 16,
            message: this.$t("machines.Length5to16"),
            trigger: "blur"
          }
        ],
        withdraw_password: [
          {
            validator: validatePass,
            trigger: "blur"
          },
          {
            min: 5,
            max: 16,
            message: this.$t("machines.Length5to16"),
            trigger: "blur"
          }
        ],
        customer_service_email: [
          {
            message: this.$t("machines.PleaseInputEmailAddress"),
            trigger: "blur"
          },
          {
            type: "email",
            message: this.$t("machines.PleaseInputCorrectEmailAddress"),
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  mounted() {
    Object.keys(this.MachineInfo.company_name).forEach(key => {
      let newkey = "company_name_" + key;
      this.MachineInfo[newkey] = this.MachineInfo.company_name[key];
    });
    for (var i in this.ruleForm) {
      if (this.MachineInfo.hasOwnProperty(i))
        this.ruleForm[i] = this.MachineInfo[i];
    }
  },
  methods: {
    submitForm() {
      console.log(this.ruleForm);
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/admin_api/machine.machine/editMachine`,
          this.ruleForm
        )
        .then(res => {
          if (res.data.ret == 0) {
            // this.$emit('getchildren');
            this.$routerto("edit_5th", {
              machine_id: this.$route.query.machine_id
            });
          } else {
            this.msg = res.data.msg;
            this.remindervisible = true;
          }
        });
    }
  }
};
</script>

<style lang='scss'>
.edit_third {
  .el-select {
    width: 100%;
  }
  .Operator {
    font-size: 14px;
    color: #606266;
    line-height: 40px;
  }
  .companyName {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 14px;
    color: #777777;
    .el-form-item {
      /* flex:1; */
      width: 45%;
      margin-bottom: 10px;
    }
    .el-form-item__content {
      display: flex;
      p {
        width: 80px;
      }
    }
  }

  .project_pic {
    position: relative;
    height: 200px;

    .el-upload--picture-card {
      bottom: 0;
      width: 100%;
      height: 200px;
      border: 1px solid #c0ccda;
      background: white;
      position: absolute;
    }

    .el-icon-plus {
      line-height: 200px;
    }

    .el-upload-list__item {
      bottom: 0;
      width: 100%;
      height: 200px;
      position: absolute;
    }
  }
}
</style>
