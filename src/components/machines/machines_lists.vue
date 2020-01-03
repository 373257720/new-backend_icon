<template>
  <div class="machines">
    <header><h2>Machines</h2></header>
    <nav>
      <div>
        <section @click="alledit" >Apply Group Pattern</section>
      </div>
      <div>
        <span class="keyword">keyword:</span>
        <el-input
          placeholder=""
          v-model="keyword"
          clearable>
        </el-input>
        <i @click="searcher"  class="el-icon-search"></i>
      </div>
    </nav>
    <el-main>
      <el-table
        :row-class-name="tabRowClassName"
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          align="center"
          label="ID"
          width="55">
        </el-table-column>
        <el-table-column
          label="Machine"
          align="center"
        >
<!--          show-overflow-tooltip="true"-->
         <template slot-scope="scope">{{ scope.row.name}}</template>
        </el-table-column>
        <el-table-column
          prop="serial_number"
          align="center"
          label="Serial Number"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="machine_group_name"
          align="center"
          label="Group"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          label="Photo"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover
              placement="right"
              width="400"
              trigger="click">
              <img class="bigpic" v-if="scope.row.machine_picture==null?false:true" :src="$baseurl+scope.row.machine_picture.original" alt="">
              <img slot="reference" class="imgsize" v-if="scope.row.machine_picture==null?false:true" :src="$baseurl+scope.row.machine_picture.original" alt="">
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="country_name"
          align="center"
          label="Location"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          label="Address"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column  align="center" label="Operation"  class-name="edit" width="200">
          <template slot-scope="scope">
            <span class="left"  @click="handleEdit(scope.$index, scope.row)">View & Edit</span>
            <span  @click="handleDelete(scope.$index, scope.row)">
              Remote Control
            </span>
          </template>
        </el-table-column>
      </el-table>

    </el-main>
    <el-dialog
      class="remote_control"
      :visible.sync="DialogVisible"
      width="30%"
      :modal="false"
      :show-close="false"
      center>
      <span slot="title" class="dialog">
        <span>{{machine_name}}</span>
        <span @click="$routerto('remote_control_records')">View more Details</span>
      </span>
      <p class="thick">Do you want to?</p>
      <el-radio-group  v-model="remote_control_type">
        <div>
          <el-radio :label="2">Restart CyptoGo</el-radio>
        </div>
        <div>
          <el-radio :label="1">Reboot System</el-radio>
        </div>
        <div>
          <el-radio :label="3">Lock Screen</el-radio>
        </div>
        <div>
          <el-radio :label="4">Unlock Screen</el-radio>
        </div>

      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <button  @click="DialogVisible = false">Cancel</button>
        <button @click="creat">Create</button>
        </span>
    </el-dialog>
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="30%"
      :modal="false"
      center>
      <span slot="title" class="dialog-footer">Group</span>
      <p class="thick">Select:</p>
      <p class="select" v-html="machine_name"></p>
      <p class="thick">Please Choose ONE Group:</p>
      <template>
        <el-select v-model="machine_group_id" placeholder="">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <span slot="footer" class="dialog-footer">
        <button  @click="centerDialogVisible = false">Cancel</button>
        <button @click="apply">Apply</button>
        </span>
    </el-dialog>
    <dialog_reminder :msg="msg" :remindervisible.sync="remindervisible"></dialog_reminder>
    <pagevue
      :pagenum="pagetotal"
      :currentpages="currentpage"
      :pagesizes="pagesize"
      v-on:fromchildren="fromchildren1"
    ></pagevue>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        choose:'',
        msg:"Please select",
        remindervisible:false,
        machine_name:'',
        DialogVisible:false,
        centerDialogVisible: false,
        keyword:'',
        machine_group_id:[],
        remote_control_type:'',
        machine_id:[],
        currentpage: 1,
        pagesize: 10,
        pagetotal: null,
        tableData: [
        ],
        machine_idx:'',
        multipleSelection: [],
        options: [],
        machine_group_id: ''
      };
    },

    created() {
      this.changepage(this.currentpage, this.pagesize);

      this.$global.get_encapsulation(`${this.$baseurl}/admin_api/machine.machine_group/getMachineGroupList`,{
        token:this.$store.state.token,
        page:this.currentpage,
        size:this.pagesize,
        keyword:'',
      }).then(res=>{
        console.log(res)
        if(res.data.ret==0){
          console.log(res.data.data.data)

       this.options=   res.data.data.data.map((item,idx)=>{
                  return{
                       value: item.machine_group_id,
                       label: item.name
                     }
          })
          // this.options.push({
          //   value: '选项1',
          //   label: '黄金糕'
          // })

        }
      })
    },
    methods: {
      getTemplateRow(index,row){
        // console.log(row)//获取选中数据
        this.machine_name=row.name;
        // this.templateSelection = row;
      },
      creat(){
          this.$global.post_encapsulation(`${this.$baseurl}/admin_api/machine.machine_operate/addMachineOperate`,{
            token:this.$store.state.token,
            type:this.remote_control_type,
            machine_id:this.machine_idx
          }).then(res=>{
            if(res.data.ret==0){
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
            this.DialogVisible = false;
            }
          })
      },
      apply(){
        this.$global.post_encapsulation(`${this.$baseurl}/admin_api/machine.machine/editGroup`,{
          token:this.$store.state.token,
          machine_id:this.machine_id,
          machine_group_id:this.machine_group_id,
        }).then(res=>{
          console.log(res)
          if(res.data.ret==0){
            this.$message({
              message: res.data.msg,
              type: 'success'
            });

          }else{
            this.$message({
              message: res.data.msg,
              type: 'warn'
            });
          }
          this.centerDialogVisible=false;
        })

      },
      searcher(){
        this.changepage(this.currentpage, this.pagesize,this.keyword);
      },
      alledit(num){
        if(this.multipleSelection.length>0){
          var a=[];
          this.multipleSelection.forEach(item=>{
            a.push(`${item.name}</br>`)
            this.machine_id.push(item.machine_id);
          })
          this.machine_name=a.join('') ;
          this.centerDialogVisible=true;
        }else{
            this.remindervisible=true;
        }


      },
      handleEdit(index, row) {
        // console.log(index, row);
        this.$routerto('machines_edit',{machine_id:row.machine_id})
      },
      handleDelete(index, row) {
        console.log(row)
        this.machine_idx=row.machine_id;
        this.machine_name = row.name;
        this.DialogVisible=true;
        // console.log(this.currentpage, this.pagesize)
        // this.$routerto('account_setting',{type:2,atm_user_id:row.atm_user_id})

      },
      tabRowClassName({row,rowIndex}){
        let index = rowIndex;
        if(index %2 == 0){
          return 'warning-row'
        }
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      changepage(currentpage, pagesize,keyword) {
        this.$axios
          .get(
            `${this.$baseurl}/admin_api/machine.machine/getMachineList`,
            { params:{
                token: this.$store.state.token,
                page: currentpage,
                size:pagesize,
                keyword:keyword,
              }
            },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }
          )
          .then(res => {
            // console.log(res)
            if(res.data.ret==0){

              this.pagetotal=res.data.data.total;
              this.tableData=[...res.data.data.data];
              // console.log(this.tableData)
            }
          })
          .catch(error => {});
      },
      handleClick(row) {
        this.$router.push({
          name: "usercheck",
          query: { idx: row.userId, userIdentityType: row.userIdentityType }
        });
        // this.$router.push("/home/userlist/verified_user/usercheck");
      },
      fromchildren1(data) {
        // console.log(data)
        this.currentpage=data.currentpage;
        this.changepage(data.currentpage, data.pagesize);
      }
    },
    watch: {


    }
  };
</script>

<style lang="scss">
  .bigpic{
    width: 100%;
    height:100%;
  }
  .machines{
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
    .el-table{
      color:#7A7A7A;
    }
    .dialog{
      display: flex;
      justify-content: space-between;
      span:nth-of-type(1){
          font-weight: 600;
      }
      span:nth-of-type(2){
        font-size: 12px;
        cursor: pointer;
        text-decoration:underline;
        color: #2ABEE2;
      }
    }
    .remote_control{
      .el-dialog--center .el-dialog__body{
        padding: 20px;
      }
      p.thick{
        color:black;
        font-size: 16px;
        margin-bottom: 30px;
      }
      .el-radio-group{
        >div{
          margin-bottom: 10px;

        }
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
    .el-checkbox__inner{
      border-radius: 50%;
      /*background: ;*/
      /*background: red;*/
      /*border-color: red;*/
    }
    .el-select .el-input.is-focus .el-input__inner{
     /*border-color: #2ABEE2*/
    }
    .el-table .warning-row{
      background:#EDF1F4;
    }
    .el-table_1_column_8  .el-button{
      color: #2ABEE2;
    }
    .edit{
      .cell{
        text-align: center;
        display: flex;
        flex-direction: column;
      }
      span{
        color: #2ABEE2;
        text-decoration:underline;
        cursor: pointer;
      }

    }
    .el-dialog--center{
      margin-top: 35vh !important;
      width: 25% !important;
      .thick{
        color: black;
        font-size: 14px;
        margin-bottom: 2px;
        /*font-weight: 600;*/
      }
      .select{
          color: #797979;
          margin-bottom: 20px;
      }
      .el-select{
        width: 100%;
      }
      .el-input__inner{
        height: 30px;

      }
      .el-input__prefix, .el-input__suffix{
        top:50%;
        transform: translateY(-50%);
      }
      .el-input__icon{
        line-height: 30px;
      }
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
    .el-dialog__headerbtn{
      top:50%;
      transform: translateY(-50%);
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
          border:0;
          color: white;
          background:url(../../../static/add-disable.png) no-repeat;
          background-size: cover;
          /*;*/
        }
      }
    }

    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
      /*border-color:white;*/
      background: #2ABEE2;
      border-color: #2ABEE2;
    }
    .el-checkbox__input.is-focus .el-checkbox__inner{
      border-color:#DCDFE6;
    }
    .el-table td, .el-table th.is-leaf{
      border: 0;
    }
    nav{
      display: flex;
      margin: 20px 0 0 0 ;
      justify-content: space-between;
      padding: 0 50px 0 20px;
      >div{
        display: flex;
        /*width: 300px;*/
        /*justify-content: space-between;*/
        section{
          cursor: pointer;
          width: 200px;
          line-height: 40px;
          height: 40px;
          background:url(../../../static/add-disable.png) no-repeat;
          background-size: cover;
          border-radius: 5px;
          color:white;
          text-align: center;
          box-sizing: border-box;
          margin-right: 20px;
        }
        span.keyword{
          line-height: 40px;
          /*height: 40px;*/
          color: #777777;
          text-align: center;
          margin-right: 20px;
        }
        i{
          height: 40px;
          /*width: 40px;*/
          cursor: pointer;
          margin-left: 20px;
          font-size: 22px;
          line-height: 40px;

          /*height: 40px;*/
          text-align: center;
        }
      }
    }
    main{
      padding:20px 20px 20px 0;
      .el-table thead{
        color:black;
      }
      .imgsize{
        width: 50px;
        height: 60px;
      }


      /*margin-top: 60px;*/
      /*width: 100%;*/
      /*  padding: 0;*/
      /*  border: 1px solid #EBEEF5;*/

    }

  }
</style>
