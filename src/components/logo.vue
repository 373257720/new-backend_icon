<template>
  <div @click="$routerto('home')" id="logo">
    <div class="logo con">
        <header><img src="static/logo.png" alt=""></header>
        <nav>CRYPTOGO</nav>
        <p>{{$t("home.WELCOME")}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "logo",

  data() {
    return {
      timer:null,
    };
  },
  created() {

   this.timer= setTimeout(()=>{
      this.$routerto('home');
    },3000)
  },
  beforeDestroy(){
    clearTimeout(this.timer);
  },
  methods: {

  }
};
</script>
<style lang='scss'>
  @keyframes LogoRotate
  {
    /*1% {*/
    /*  -webkit-transform: rotateY(1deg);*/
    /*  -ms-transform: rotateY(1deg);*/
    /*  transform: rotateY(1deg);*/
    /*}*/

    25%{

      -webkit-transform: rotateY( 0deg);
      -ms-transform:rotateY( 0deg);
      transform: rotateY(0deg);
    }
    100%{
      -webkit-transform: rotateY( -360deg);
      -ms-transform:rotateY( -360deg);
      transform: rotateY(360deg);
    }
  }
#logo {
  .logo {
    text-align: center;
    .el-input--suffix {
      width: 492px;
    }
    .el-input__inner {
      background: #ffffff;
      height: 68px;
      padding-left: 70px;
      border: 1px solid #b6b6b6;
    }
    .el-input__inner::placeholder {
      color: #b6b6b6;
    }
  }
}
</style>
<style lang='scss' scoped>
#logo {
  position: relative;
  height: 100%;
  width: 100%;
  /*top: 50px;*/
  /*cursor: pointer;*/
  /*height: calc(100% - 50px);*/
}
.logo {
  width: 830px;
//   height: 345px;
//   background:  #f36d6c;
  text-align: center;
  position: absolute;
  left: 50%;
  top:50%;
  /*top: 188px;*/
  transform: translate(-50%, -50%);
  overflow: hidden;
  img{
    width: 245px;
    height: 245px;
  }
  nav{
    color: #919191;
    // line-height: 40px;
    font-size: 46px;
    font-weight: 600;
    margin-bottom: 36px;

    font-family: Facto,Facto-Regular,Facto-Light,Microsoft YaHei,'微软雅黑',Hiragino Sans GB,'冬青黑体简体中文',WenQuanYi Micro Hei,sans-serif;
  }
  header{
    img{
      cursor: pointer;
      -webkit-animation-name: LogoRotate;
      animation-name: LogoRotate;
      animation-delay:1s;
      -webkit-animation-delay:1s;









      
      -webkit-animation-duration: 1.8s;
      animation-duration:1.8s;
      transition: transform 1.8s;
      -webkit-animation-timing-function:ease;
      animation-timing-function: ease;
      -webkit-animation-iteration-count: infinite;
      animation-iteration-count: infinite;
      -webkit-animation-fill-mode:forwards;
      animation-fill-mode: forwards;
    }
  }
  p {
    color: #919191;
    // line-height: 40px;
    font-size: 30px;
    // height: 40px;
  }

}
@media (max-width: 768px){
  .logo {
    width: 830px;
    //   height: 345px;
    //   background:  #f36d6c;
    text-align: center;
    position: absolute;
    left: 50%;
    top:50%;
    /*top: 188px;*/
    transform: translate(-50%, -50%);
    overflow: hidden;
    img{
      width: 245px;
      height: 245px;
    }
    nav{
      color: #919191;
      // line-height: 40px;
      font-size: 40px;
      font-weight: 600;
      margin-bottom: 36px;

      font-family: Facto,Facto-Regular,Facto-Light,Microsoft YaHei,'微软雅黑',Hiragino Sans GB,'冬青黑体简体中文',WenQuanYi Micro Hei,sans-serif;
    }
    header{
      img{
        -webkit-animation-name: LogoRotate;
        animation-name: LogoRotate;
        -webkit-animation-duration: 1.8s;
        animation-duration:1.8s;
        transition: transform 1.8s;
        -webkit-animation-timing-function:ease;
        animation-timing-function: ease;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        -webkit-animation-fill-mode:forwards;
        animation-fill-mode: forwards;
      }
    }
    p {
      color: #919191;
      // line-height: 40px;
      font-size: 26px;
      // height: 40px;
    }

  }
}
</style>
