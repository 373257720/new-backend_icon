<template>
  <div id="check_pendingcheck">
    <h3>签约客户信息</h3>
    <header>
      <ul class="pending_left">
        <li v-for="item in pending_ch" :key="item">
          <p>{{item}}</p>
          <el-input placeholder="请输入内容" v-model="input" :disabled="true"></el-input>
        </li>
      </ul>
    </header>
    <main>
      <aside>
        <nav></nav>
      </aside>
      <section>
        <nav></nav>
      </section>
    </main>
    <footer>
      <router-link to="/home/project/signedup/signedup_check">
        <button>返回</button>
      </router-link>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pending_ch: [
        "注册时间",
        "用户名称",
        "国籍",
        "公司名称",
        "身份证号",
        "验证时间"
      ],
      pending_ch: [
        "注册时间",
        "用户名称",
        "国籍",
        "公司名称",
        "身份证号",
        "验证时间"
      ]
    };
  }
};
</script>

<style lang='scss' scoped>
#check_pendingcheck {
  h3 {
    width: 900px;
    text-align: center;
    margin: 0 auto;
    font-size: 30px;
    padding: 30px 0;
  }
  header {
    display: flex;
    width: 900px;
    justify-content: space-between;
    margin: 0 auto;
    .pending_left {
      display: flex;
      width: 900px;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        width: 400px;
        margin-bottom: 30px;
        p {
          margin-bottom: 10px;
        }
      }
    }
  }
  main {
    display: flex;
    width: 900px;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 20px;
    justify-content: space-between;

    nav {
      height: 200px;
      width: 400px;
      // background: #58bc58;
      border:1px solid #E4E7ED;
      border-radius: 5px; 
      margin-bottom: 20px;
    }
  }
  footer {
    width: 900px;
    height: 100px;
    margin: 0 auto;
    text-align: center;
    button {
      width: 200px;
      height: 50px;
          border-radius: 5px; 
      // background: red;
    }
  }
}
</style>