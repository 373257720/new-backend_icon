<!--<template>-->
<!--  <div class="compliance">-->
<!--    <img src="../../../static/coming soon.png" alt="">-->
<!--  </div>-->
<!--</template>-->
<!--<style lang='scss'>-->
<!--  .compliance{-->
<!--    width: 100%;-->
<!--    height: 100%;-->
<!--    position: relative;-->
<!--    img{-->
<!--      position: absolute;-->
<!--      top: 50%;-->
<!--      left: 50%;-->
<!--      transform: translate(-50%,-50%);-->
<!--    }-->
<!--  }-->
<!--</style>-->
<template>
  <div class="compliance">
    <header><h2>
      <span>Compliance</span>
<!--      <i class="el-icon-arrow-right"></i>-->
<!--      <span>{{title}}</span>-->
    </h2>
    </header>
    <main>
      <img src="../../../static/coming soon.png" alt="">
    </main>


  </div>
</template>
<style lang='scss'>
  .compliance{
    margin :0 0 0 50px;
    width: 90%;
    height: 100%;
    header{
      position: relative;
      height: 80px;
      border-bottom: 1px solid #d3d3d3;
      h2{
        font-size: 20px;
        position: absolute;
        bottom:20px;
        /*font-weight: 550;*/
      }
    }
    main{
      height:500px;
      position: relative;
      img{
        position: absolute;
          top: 50%;
           left: 50%;
       transform: translate(-50%,-50%);
      }
    }
  }
</style>
