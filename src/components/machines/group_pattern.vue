<template>
  <div class="remote_control_records" v-loading="loading">
    <!--    <header><h2>CUSTOMERS DATAS</h2></header>-->
    <header><h2>
      <span>Machines</span>
      <i class="el-icon-arrow-right"></i>
      <span>Group Pattern</span>
    </h2>
    </header>
    <nav>
      <div class="nav_left">
        <section @click="add">Add</section>
        <section @click="alldelete">Delete</section>
        <!--        <section @click="alledit(2)">Export</section>-->
      </div>
      <div class="nav_right">
        <span class="keyword">Keyword:</span>
        <el-input
          placeholder="Machine Name"
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
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          align="center"
          label=""
          width="100">
        </el-table-column>
        <el-table-column
          label="Group"
          align="center"
          width="200"

        >
          <template slot-scope="scope">{{ scope.row.name}}</template>
        </el-table-column>
        <el-table-column
          label="Applied Machine"
          show-overflow-tooltip
          align="center">
          <template slot-scope="scope">{{scope.row.machinelist}}</template>
        </el-table-column>
        <el-table-column  align="center" label="Operation"  width="300" class-name="edit">
          <template slot-scope="scope">
            <span  @click="handleDelete(scope.$index, scope.row)">View & Edit</span>
            <span  @click="handleapply(scope.$index, scope.row)">Apply Attributes</span>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-dialog
      class="remote_control"
      :visible.sync="centerDialogVisible"
      width="30%"
      :modal="false"
      center>
      <span slot="title" class="dialog-footer">Apply Attributes</span>
      <div>
        <p class="thick">Group Name:</p>
        <el-input  :disabled="true" placeholder="Please input" v-model="Group_Name"></el-input>
      </div>
      <div>
        <p >Machine list in groups:</p>
        <p class="thick">(The selected machine applies this grouping property)</p>
        <template>
          <el-select v-model="machine_id"  multiple placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </div>

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
        msg:'',
        remindervisible:false,
        // centerDialogVisible: false,
        type:{
          '1':'Restart CyptoGo',
          '2':'Reboot System',
          '3':'Lock Screen',
          '4':'Unlock Screen'
        },
        client:{
          '1':'Yes',
          '2':'No'
        },
        successful:{
          '1':'Yes',
          '2':'No'
        },
        keyword:'',
        Group_Name:'',
        machine_group_id:'',
        centerDialogVisible:false,
        currentpage: 1,
        pagesize: 10,
        pagetotal: null,
        tableData: [],
        multipleSelection: [],
        options: [
        ],
        loading:false,
        machine_id: [],
      };
    },
    created() {

      this.searcher();
      // this.changepage(this.currentpage, this.pagesize,this.keyword,this.timerange[0],this.timerange[1]);
    },
    methods: {
      apply(){
        this.$global.post_encapsulation(`${this.$baseurl}/admin_api/machine.machine_group/attribute`,{
          machine_group_id:this.machine_group_id,
          machine_id:this.machine_id,
        }).then(res=>{
          if(res.data.ret==0){
            this.$message({
              showClose: true,
              message: 'Congrats, this is a success message.',
              type: 'success'
            });
            this.centerDialogVisible=false;
          }
        })

      },
      searcher(){
        this.currentpage=1;
        this.changepage(this.currentpage, this.pagesize,this.keyword);
      },
      alldelete(){
        let userid_arr=[];
        if(this.multipleSelection.length>0){
          this.multipleSelection.forEach(item=>{
            userid_arr.push(item.machine_group_id)
          })
          this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            this.beforedelete(userid_arr);
          }).catch(() => {
          });
        }else{
          this.msg="Please select"
          this.remindervisible=true;
        }
      },
      add(){
        this.$routerto('add_Group_Pattern')
      },
      handleapply(index, row) {
        this.centerDialogVisible=true;
        this.Group_Name =row.name;
        this.machine_group_id=row.machine_group_id
        console.log()
        let arr=  row.machine_list;
        if(  Array.isArray(arr)){
          this.options= arr.map(item=>{
            return {
              value: item.machine_id,
              label:item.name,
            }

          })
        }

        console.log(this.options)
        // this.options=machine_list
        // this.$routerto('edit_Group_Pattern',{type:2,machine_group_id:row.machine_group_id})
        // this.beforedelete(row.machine_operate_id);
      },
      handleDelete(index, row) {
        console.log(row)
        this.$routerto('edit_Group_Pattern',{type:2,machine_group_id:row.machine_group_id})
        // this.beforedelete(row.machine_operate_id);
      },
      beforedelete(param){
          this.$global.post_encapsulation(`${this.$baseurl}/admin_api/machine.machine_group/deleteMachineGroup`,{
            machine_group_id: param,
          })
            .then(res => {
              this.msg=res.data.msg;
              this.remindervisible=true;
              console.log(this.msg)
              if(res.data.ret==0){
                this.changepage(this.currentpage, this.pagesize,this.keyword);
              }
            });
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
        this.loading=true;
        this.$global.get_encapsulation(`${this.$baseurl}/admin_api/machine.machine_group/getMachineGroupList`,{
          page: currentpage,
          size:pagesize,
          keyword:keyword,
        })
          .then(res => {
            this.loading=false;
            if(res.data.ret==0){
              this.pagetotal=res.data.data.total;
              this.tableData=[...res.data.data.data];
              this.tableData.forEach(item=>{
                if( Array.isArray(item.machine_list)){
                  item.machinelist=item.machine_list.map(item=>{
                    return item.name
                  })
                  item.machinelist=   item.machinelist.toString()
                  // item.machinelist=item.machine_list.join('');
                }
              })

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
        if(this.timerange==null){
          this.changepage(this.currentpage, this.pagesize,this.keyword,'','');
        }else{
          this.changepage(this.currentpage, this.pagesize,this.keyword,this.timerange[0],this.timerange[1]);
        }
      }
    },

  };
</script>

<style lang="scss">
  .remote_control_records{
    padding :0 50px 50px 50px;
    .el-dialog{
      p.thick{
        margin-bottom: 10px;
      }
      .el-dialog__header{
        background:#EDF1F4;
      }
      .el-dialog__body{
        >div:nth-of-type(1){
          margin-bottom: 15px;
        }
      }
      .el-select{
        width: 100%;
      }
      .el-input__inner{
        /*height: 30px !important;*/
        /*margin-bottom: 10px;*/
      }
      .el-input__icon{
        line-height: 30px;
      }
       .el-dialog__footer {
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

    }

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
    .el-checkbox__inner::after{
      /*height: 14px;*/
      /*width: 14px;*/
    }
    .el-table-column--selection .cell{
      padding-right: 10px;
    }
    .el-table{
      color:#7A7A7A;
    }
    .el-checkbox__inner{
      border-radius: 50%;
      /*background: ;*/
      /*background: red;*/
      /*border-color: red;*/
    }

    .el-table .warning-row{
      background:#EDF1F4;
    }
    .el-table_1_column_8  .el-button{
      color: #2ABEE2;
    }
    .edit{
      .cell{
        /*display: flex;*/
        /*justify-content: space-around;*/
      }
      span{
        color: #2ABEE2;
        text-decoration:underline;
        cursor: pointer;
      }
      span:nth-of-type(1){
        margin-right: 40px;
      }

    }

    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
      /*border-color:white;*/
      background: #2ABEE2;
      border-color: #2ABEE2;
    }
    /*.is-checked .el-checkbox__inner::after{*/
    /*  box-sizing: content-box;*/
    /*  content: "";*/
    /*  border: 1px solid #FFF;*/
    /*  border-left: 0;*/
    /*  border-top: 0;*/
    /*  height: 7px;*/
    /*  left: 4px;*/
    /*  position: absolute;*/
    /*  top: 1px;*/
    /*}*/

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
      div.nav_left{
        display: flex;
        section{
          cursor: pointer;
          width: 120px;
          line-height: 40px;
          height: 40px;
          background:url(../../../static/add-disable.png) no-repeat;
          border-radius: 5px;
          color:white;
          text-align: center;
          box-sizing: border-box;
          margin-right: 20px;
        }
      }
      div.nav_right{
        display: flex;
        i.el-icon-search{
          height: 40px;
          /*width: 40px;*/
          cursor: pointer;
          margin-left: 20px;
          font-size: 22px;
          line-height: 40px;
          text-align: center;
        }
        span.keyword{
          line-height: 40px;
          color: #777777;
          text-align: center;
          margin: 0 20px;
        }
        div{
          flex:1;
        }
      }

    }
    main{
      padding:20px 20px 20px 0;
      .el-table thead{
        color:black;
      }
      /*margin-top: 60px;*/
      /*width: 100%;*/
      /*  padding: 0;*/
      /*  border: 1px solid #EBEEF5;*/

    }
  }
</style>
