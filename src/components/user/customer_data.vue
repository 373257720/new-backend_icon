<template>
  <div class="customer_data">
    <header><h2>Customers Datas</h2></header>
    <nav>
      <div>
        <section @click="alledit(1)">Enable</section>
        <section @click="alledit(2)">Disable</section>
      </div>
      <div>
        <span class="keyword">Keyword:</span>
        <el-input
          placeholder="ID,Account numbers"
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
          width="55">
        </el-table-column>
        <el-table-column
          label="ID"
          align="center"
          width="100"
        >
          <template slot-scope="scope">{{ scope.row.user_id}}</template>
        </el-table-column>
        <el-table-column
          label="Country"
          width="100"
          align="center">

          <template slot-scope="scope">{{ scope.row.country_name}}</template>
        </el-table-column>
        <el-table-column
          prop="username"
          align="center"
          label="Account numbers"
          width="200"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          class-name="edit"
          align="center"
          label="User Icon"
          width="100"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover
              placement="right"
              width="400"
              trigger="click">
              <img :src="$baseurl+scope.row.avatar_picture" alt="">
              <span slot="reference"  >Picture</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="status_lable"
          align="center"
          label="State"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="create_time"
          align="center"
          label="Creation Time"
          width="200"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column  align="center" label="Operation"  class-name="edit" width="200">
          <template slot-scope="scope">
            <span class="left"  @click="handleEdit(scope.$index, scope.row)">{{scope.row.status==1?'Disable':scope.row.status==2?'Enable':'Disable'}}</span>
            <span  @click="handleDelete(scope.$index, scope.row)">Delete</span>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
<!--    <dialog_reminder :msg="msg" :remindervisible.sync="remindervisible"></dialog_reminder>-->
<!--    <pagevue-->
<!--      :pagenum="pagetotal"-->
<!--      :currentpages="currentpage"-->
<!--      :pagesizes="pagesize"-->
<!--      v-on:fromchildren="fromchildren1"-->
<!--    ></pagevue>-->
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
        ischeck: false,
        keyword:'',
        currentpage: 1,
        pagesize: 10,
        pagetotal: null,
        tableData: [
        ],
        multipleSelection: []
      };
    },
    created() {
      this.changepage(this.currentpage, this.pagesize);
    },
    methods: {
      searcher(){
        this.changepage(this.currentpage, this.pagesize,this.keyword);
      },
      alledit(num){
        // console.log(this.multipleSelection)
        let userid_arr=[];
        if(this.multipleSelection.length>0){
          this.multipleSelection.forEach(item=>{
            userid_arr.push(item.user_id)
          })
          // this.$global.post_encapsulation(`${this.$baseurl}/admin_api/user.front_user/editUserStatus`,{
          //   token:this.$store.state.token,
          //   user_id: userid_arr,
          //   status:num,
          // })
          this.$global.get_encapsulation(`${this.$baseurl}/admin_api/user.front_user/editUserStatus`,
            { user_id: userid_arr,
              status:num,}
          )
            .then(res => {
            if(res.data.ret==0){
              // this.msg=res.data.msg;
              // this.remindervisible=true;
              this.$message(res.data.msg);
              this.changepage(this.currentpage, this.pagesize);
            }
          });
        }else{
          // this.msg="Please select"
          this.$message("Please select");
        }

      },
      handleEdit(index, row) {
        console.log(index, row);
        let tostatus;
        if(row.status==1){
          tostatus=2;
        }else if(row.status==2){
          tostatus=1;
        }
          // this.$axios({
          //   method: 'post',
          //   url: `${this.$baseurl}/admin_api/user.front_user/editUserStatus`,
          //   data: {
          //     token:this.$store.state.token,
          //     user_id: row.user_id,
          //     status: tostatus,
          //   }
          // })
        this.$global.post_encapsulation(`${this.$baseurl}/admin_api/user.front_user/editUserStatus`,
          {  user_id: row.user_id,
            status: tostatus,}
        )
            .then(res => {
            this.msg=res.data.msg;
            this.remindervisible=true;
            if(res.data.ret==0){
              if(row.status==1){
                this.tableData[index].status=2;
                this.tableData[index].status_lable='Banned';
              }else if(row.status==2){
                this.tableData[index].status=1;
                this.tableData[index].status_lable='Normal';
              }

            }
          });


      },
      handleDelete(index, row) {
        // console.log(index, row);
        // console.log(this.currentpage, this.pagesize)
        this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          // this.$axios({
          //   method: 'post',
          //   url: `${this.$baseurl}/admin_api/user.front_user/deleteUser`,
          //   data: {
          //     token:this.$store.state.token,
          //     user_id: row.user_id,
          //   }
          // })
          this.$global.post_encapsulation(`${this.$baseurl}/admin_api/user.front_user/deleteUser`,
            {user_id: row.user_id,}
          )
            .then(res => {
            // console.log(res);
            // this.msg=res.data.msg;
            // this.remindervisible=true;
              this.$message(res.data.msg);
            if(res.data.ret==0){
              this.changepage(this.currentpage, this.pagesize);
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
        // this.$axios
        //   .get(
        //     `${this.$baseurl}/admin_api/user.front_user/getUserList`,
        //     { params:{
        //         token: this.$store.state.token,
        //         page: currentpage,
        //         size:pagesize,
        //         keyword:keyword,
        //         lang:'en-us'
        //       }
        //     },
        //     {
        //       headers: {
        //         "Content-Type": "application/x-www-form-urlencoded"
        //       }
        //     }
        //   )
        this.$global.get_encapsulation(`${this.$baseurl}/admin_api/user.front_user/getUserList`,
          {  page: currentpage,
            size:pagesize,
            keyword:keyword,
            lang:'en-us'}
        )
          .then(res => {

            if(res.data.ret==0){
              this.pagetotal=res.data.data.total;
              this.tableData=[...res.data.data.data];
              this.tableData.forEach(item=>{
                item.status_lable=item.status==1?'Normal':"Banned"
                item.create_time=this.$global.timestampToTime(item.create_time)
              })
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
      $route(to, from) {
        if (to.name == "usercheck") {
          this.ischeck = !this.ischeck;
        } else {
          this.ischeck = false;
        }
      }
    }
  };
</script>

<style lang="scss">
  .customer_data{
    padding :0 50px 50px 50px;
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
          width: 120px;
          line-height: 40px;
          height: 40px;
          background:url(../../../static/add-disable.png) no-repeat;
          border-radius: 5px;
          color:white;
          text-align: center;
          box-sizing: border-box;
          /*border: 1px solid #d3d3d3;*/
          /*background: red;*/
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
      /*margin-top: 60px;*/
      /*width: 100%;*/
      /*  padding: 0;*/
      /*  border: 1px solid #EBEEF5;*/

    }
  }
</style>
