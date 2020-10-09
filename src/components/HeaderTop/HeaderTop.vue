<template>

  <!--首页头部-->
  <header class="header">
    <!-- 左插槽 -->
    <slot name="left"></slot>
    <!-- 主页显示的地址信息 -->
    <span class="header_title">
      <span class="header_title_text ellipsis">{{title}}</span>
    </span>
    <!-- 右插槽 -->
    <slot name="right"></slot>
  </header>

</template>


<script>


export default {

  props: {
    title: String,
  },
}
</script>


<style lang="stylus">
.header {
  background-color: #FFC300;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 45px;
  z-index: 100

  .header_search {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 10%;
    height: 50%;

    .icon-sousuo {
      font-size: 25px;
      color: #333;
    }
  }

  .header_title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    color: #333;
    text-align: center;

    .header_title_text {
      font-size: 20px;
      color: #333;
      display: block;
    }
  }

  .header_login {
    font-size: 14px;
    color: #333;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);

    .header_login_text {
      color: #333;
    }
  }
}
</style>
