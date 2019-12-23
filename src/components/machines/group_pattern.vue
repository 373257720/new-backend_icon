<template>
  <div class="remote_control_records">
    <!--    <header><h2>CUSTOMERS DATAS</h2></header>-->
    <header><h2>
      <span>Machines</span>
      <i class="el-icon-arrow-right"></i>
      <span>Group Pattern</span>
    </h2>
    </header>
    <nav>
      <div class="nav_left">
        <section @click="alldelete">Add</section>
        <section @click="alldelete">Delete</section>
        <!--        <section @click="alledit(2)">Export</section>-->
      </div>
      <div class="nav_right">
        <span class="keyword">keyword:</span>
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
          align="right"
          label=""
          width="100">
        </el-table-column>
        <el-table-column
          label="Group"
          align="left"

        >
          <template slot-scope="scope">{{ scope.row.name}}</template>
        </el-table-column>
        <el-table-column
          label="Applied Machine"
          align="left">
          <template slot-scope="scope">{{ scope.row.type}}</template>
        </el-table-column>
        <el-table-column  align="left" label="Operation"  class-name="edit">
          <template slot-scope="scope">
            <span  @click="handleDelete(scope.$index, scope.row)">View & Edit</span>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

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
        currentpage: 1,
        pagesize: 10,
        pagetotal: null,
        tableData: [],
        multipleSelection: []
      };
    },
    created() {
      this.searcher();
      // this.changepage(this.currentpage, this.pagesize,this.keyword,this.timerange[0],this.timerange[1]);
    },
    methods: {
      searcher(){
        this.currentpage=1;
        this.changepage(this.currentpage, this.pagesize,this.keyword);
      },
      alldelete(){
        console.log(this.multipleSelection)
        let userid_arr=[];
        this.multipleSelection.forEach(item=>{
          userid_arr.push(item.machine_operate_id)
        })
        this.beforedelete(userid_arr);
      },
      handleDelete(index, row) {
        console.log(row)
        this.$routerto('machines_add',{type:'ADD',machine_group_id:row.machine_group_id})
        // this.beforedelete(row.machine_operate_id);
      },
      beforedelete(param){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$global.post_encapsulation(`${this.$baseurl}/admin_api/machine.machine_operate/deleteMachineOperate`,{
            token:this.$store.state.token,
            machine_operate_id: param,
          })
            .then(res => {
              if(res.data.ret==0){
                this.changepage(this.currentpage, this.pagesize,this.keyword);
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }
            });
        }).catch(() => {
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
        this.$global.get_encapsulation(`${this.$baseurl}/admin_api/machine.machine_group/getMachineGroupList`,{
          token: this.$store.state.token,
          page: currentpage,
          size:pagesize,
          keyword:keyword,
        })
          .then(res => {
            if(res.data.ret==0){
              console.log(res.data.data.data)
              this.pagetotal=res.data.data.total;
              this.tableData=[...res.data.data.data];
              this.tableData.forEach(item=>{
                // item.is_finish=this.successful[item.is_finish];
                // item.is_tell=this.client[item.is_tell]
                // item.type=this.type[item.type];
                // item.create_time=this.$global.timestampToTime(item.create_time);
                // item.finish_time=this.$global.timestampToTime(item.finish_time);
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
      span{
        color: #2ABEE2;
        text-decoration:underline;
        cursor: pointer;
      }
      span.left{
        margin-right: 20px;
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
