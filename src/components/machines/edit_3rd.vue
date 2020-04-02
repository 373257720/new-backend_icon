<template>
  <div class="add_fifth">
    <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="Need to register:" prop="name">
        <el-radio-group v-model="ruleForm.needtoregister">
          <el-radio :label="1">Yes</el-radio>
          <el-radio :label="2">No</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Currency range:">
        <div class="Currencyrange">
          <div class="additem" v-for="item in arr" :key="item.key">
              <el-input   v-model="item.collectMoneyMin"></el-input>
              <el-input  v-model="item.collectMoneyMax"></el-input>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-delete"></el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="Whether to support redemption coins:" prop="name">
        <el-radio-group v-model="ruleForm.supportcoins">
          <el-radio :label="1">Yes</el-radio>
          <el-radio :label="2">No</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Whether to support redemption of money:" prop="name">
        <el-radio-group v-model="ruleForm.supportmoney">
          <el-radio :label="1">Yes</el-radio>
          <el-radio :label="2">No</el-radio>
        </el-radio-group>
    </el-form-item>
      <el-form-item label="Whether to support the use of coupons:" prop="name">
        <el-radio-group v-model="ruleForm.supportcoupons">
          <el-radio :label="1">Yes</el-radio>
          <el-radio :label="2">No</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Language configuration:" prop="name">
        <el-radio-group v-model="ruleForm.Languageconfiguration">
          <el-radio :label="1">Buy</el-radio>
          <el-radio :label="2">Sell</el-radio>
          <el-radio :label="3">Both</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <section>
      <button @click="$global.previous">BACK</button>
      <button  @click="submitForm('ruleForm')">NEXT</button>
    </section>
    <!--    <dialog_reminder :msg="msg" :remindervisible.sync="remindervisible"></dialog_reminder>-->
  </div>
</template>
<script>
  export default {
    props:['tochind'],
    data(){
      var validatePass2 = (rule, value, callback) => {
        let min=  this.ruleForm.collectMoneyMin.replace(/,/g,'')*1;
        let max= value.replace(/,/g,'')*1;
        if (max == '') {
          callback(new Error('请输入'))
        } else if (max <= min) {
          callback(new Error('金额需要大于最小值'))
        } else {
          callback()
        }
      }
      var validatePass= (rule, value, callback) => {
        let min=  value.replace(/,/g,'')*1;
        if (min === '') {
          callback(new Error('请输入'))
        } else if (min <= 0) {
          callback(new Error('金额需要大于0'))
        } else {
          callback()
        }
      }
      return{
        arr:[
          {
            key:1,
            collectMoneyMin:'',
            collectMoneyMax:'',
            money_range_identify1:'',
            money_range_identify2:'',
            money_range_identify3:'',
          },
          {
            key:2,
            collectMoneyMin:'',
            collectMoneyMax:'',
            money_range_identify1:'',
            money_range_identify2:'',
            money_range_identify3:'',
          },
        ],
        ruleForm:{
          needtoregister:"",
          Currencyrange:'',
          collectMoneyMin:'',
          collectMoneyMax:'',
          supportcoins:'',
          supportmoney:'',
          supportcoupons:'',
          Languageconfiguration:'',
        },
        rules: {
          collectMoneyMax:[   { required: true,validator: validatePass2,  trigger: "blur" }
          ],
          collectMoneyMin:[   { required: true, validator: validatePass, trigger: "blur" }],
        },
      }
    },
    mounted() {
      if(this.$route.query.type==2){
        // console.log(this.tochind)
        for(let i in this.ruleForm){
          if(this.tochind.hasOwnProperty(i)){
            this.ruleForm[i]=this.tochind[i]
            // console.log(this.tochind)
          }
        }
      }
    },
    created() {
    },
    watch:{
      ruleForm: {
        handler(newValue, oldValue) {
          // console.log(newValue)
          // this.$emit('getchildren',this.ruleForm)
        },
        deep: true
      },
      "ruleForm.collectMoneyMin": {
        handler(newvalue, oldvalue) {
          let self=this;
          let newvalue_ =newvalue;
          if( (isNaN(parseFloat(newvalue_.replace(/,/ig,'')))) ){ //如果当前输入的不是数字就停止执行
            self.ruleForm.collectMoneyMin='';  //防止不是数字是input出现NaN提示
            return false;
          }
          if(parseFloat(newvalue_.replace(/,/ig,''))>1000000000000){
            self.ruleForm.collectMoneyMin=oldvalue;
            return
          }
        },
        deep: true,
        immediate: true
      },
      "ruleForm.collectMoneyMax": {
        handler(newvalue, oldvalue) {
          let newvalue_ =newvalue;
          console.log(newvalue_)
          if( (isNaN(parseFloat(newvalue_.replace(/,/ig,'')))) ){ //如果当前输入的不是数字就停止执行
            this.ruleForm.collectMoneyMax='';  //防止不是数字是input出现NaN提示
            return false;
          }
          if(parseFloat(newvalue_.replace(/,/ig,''))>1000000000000){
            this.ruleForm.collectMoneyMax=oldvalue;
            return
          }
        },
        deep: true,
        immediate: true
      }
    },
    methods:{
      add_xiaoshudian(newvalue,num){
        let self=this;
        var value  = parseInt(newvalue.replace(/,/ig,''));
        if(num==1){
          self.ruleForm.collectMoneyMin= value.toLocaleString()
        }else if(num ==2){
          self.ruleForm.collectMoneyMax= value.toLocaleString()
        }
      },
      submitForm(){
        // console.log(this.ruleForm);
        this.$emit('getchildren','','second');
        // this.ruleForm.token=this.$store.state.token;
        // this.$global.post_encapsulation(`${this.$baseurl}/admin_api/machine.machine/editMachine`,this.ruleForm)
        //   .then(res=>{
        //     if(res.data.ret==0){
        //       this.$emit('getchildren');
        //       this.$routerto('edit_2nd',{machine_id:this.$route.query.machine_id});
        //     }
        //   })
      },
    }
  }
</script>

<style lang='scss'>
  .add_fifth{
    .Currencyrange{
      margin-bottom: 22px;
      .el-input--suffix .el-input__inner{

      }
      div.additem{

      }
      .el-button{
        padding: 0;
        background: #2ABEE2;
      }
      .el-input{
        width: 100px;
      }
      .el-input__inner{
        /*width: 100px;*/
        padding: 0 10px;
      }
      >div{
        display: flex;
        /*justify-content: space-between;*/
        align-items: center;
        .el-form-item{
          /*width: 20%;*/
          margin-bottom: 0;
        }
        i{
          /*width: 20%;*/
          font-size: 20px;
          color: #606266;
          text-align: center;
        }
      }
    }
    .radioo{
      display: flex;
    }
    .el-select{
      /*width: 100%;*/
    }
    .el-radio__input.is-checked .el-radio__inner{
      border-color:#2ABEE2;
      background: #2ABEE2;
    }
    .el-radio__inner:hover{
      border-color:#2ABEE2;
    }
    .el-radio__input.is-checked+.el-radio__label{
      color:#2ABEE2;
    }
    .el-radio__input.is-checked .el-radio__inner::after{
      transform: rotate(45deg) scaleY(1);
    }
    .el-radio__inner::after{
      box-sizing: content-box;
      content: "";
      background: none;
      border: 2px solid #FFF;
      border-left: 0;
      border-top: 0;
      height: 7px;
      left: 4px;
      position: absolute;
      top: 1px;
      border-radius: 0;
      /*!*-webkit-transform: rotate(45deg) scaleY(0);*!*/
      /*!*transform: rotate(45deg) scaleY(0);*!*/
      width: 3px;
      /*-webkit-transition: -webkit-transform .15s ease-in .05s;*/
      /*transition: -webkit-transform .15s ease-in .05s;*/
      /*transition: transform .15s ease-in .05s;*/
      /*transition: transform .15s ease-in .05s, -webkit-transform .15s ease-in .05s;*/
      /*transition: transform .15s ease-in .05s,-webkit-transform .15s ease-in .05s;*/
      /*-webkit-transform-origin: center;*/
      /*transform-origin: center;*/
    }

  }


</style>
