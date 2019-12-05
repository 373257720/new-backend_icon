<template>
  <div id="project_check">
    <header>待签约项目详情</header>
    <nav>
      <p>
        项目名称:
        <span>sdfsdfdsfsdf</span>
      </p>
      <p>
        计划时间:
        <span>fsdfsdfds</span>
      </p>
    </nav>
    <main>
      <article>
        <ul>
          <li v-for="(item) in details_lists" :key="item.title">
            <p>{{item.title}}</p>
            <p>{{item.content}}</p>
          </li>
        </ul>
      </article>
      <aside></aside>
    </main>
      <footer>
      <router-link to="/home/project/signedup/signedup_user">
        <button>签约客户信息</button>
      </router-link>
      <router-link to="/home/project/signedup">
        <button>返回</button>
      </router-link>
    </footer>
   
  </div>
</template>
<script>
export default {
  data() {
    return {
      details_lists: [
        {
          title: "公司名称:",
          content: "分个梵蒂冈梵蒂冈刚的鬼地方"
        },
        {
          title: "是否上市公司:",
          content: "水电费"
        },
        {
          title: "项目介绍:",
          content: "辅导费第三方水电费辅导费第三方水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费时段方便vbvbvbvc非官方的鬼地方个飞凤飞飞飞凤飞飞飞凤飞飞飞凤飞飞飞凤飞飞凤飞飞凤飞飞iiiiiiiiiiiiiiiiiiiii发送到剪短发公司进度刚刚加空格键放大镜儿童尔特让他玩儿托付给ioduuiodfsgfdter尔特瑞特让他"
        },
        {
          title: "集资金额:",
          content: "456456456"
        },
        {
          title: "联系电话",
          content: "121231545645"
        },
        {
          title: "电邮",
          content: "74567865645646"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
#project_check {
  width: 100%;
  height: 100%;
  position: absolute;
  header {
    margin: 30px auto;
    font-size: 36px;
    width: 800px;
    text-align: center;
    font-weight: 500;
    border-bottom: 1px solid black;
  }
  nav {
    margin: 0 auto;
    height: 86px;
    background: #f6f6f6;
    width: 800px;
    border-radius: 5px;
    border: 1px solid #ababab;
    text-align: center;
    line-height: 36px;
    box-sizing: border-box;
    padding: 10px 0;
  }
  main {
    margin: 16px auto 0 auto;
    width: 800px;
    display: flex;
    justify-content: space-between;
    article {
      width: 400px;
      li {
        margin-bottom: 30px;
       
        >p:nth-child(1){
          margin:10px 0;
           font-weight: 600;
        }
        >p:nth-child(2){
          // text-indent: 30px;
          font-size: 14px;
          line-height: 24px;
        }
      }
     
    }
    aside {
      width: 320px;
      height: 400px;
      // background: red;
      border-radius: 5px;
      box-sizing: border-box;
      border: 1px solid #ababab;
    }
  }
  footer {
    width: 800px;
    display: flex;
    height: 100px;
    justify-content: space-around;
    margin: 0 auto;
    button {
      background: #00adef;
      width: 200px;
      height: 40px;
      line-height: 40px;
      color: white;
      border-radius: 2px;
    }
  }
}
</style>