<template>
  <!--订单-->
  <div>
    <section class="order">
      <!-- <header class="header">
        <a class="header_title">
          <span class="header_title_text">订单列表</span>
        </a>
      </header>-->

      <!--首页头部 使用组件进行插槽渲染-->
      <HeaderTop title="订单列表"></HeaderTop>

      <section class="order_no_login">
        <img src="./images/person.png" />
        <h3>登录后查看外卖订单</h3>
        <button @click="$router.push('/login')">立即登陆</button>
      </section>
    </section>
  </div>
</template>
<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";

export default {
  components: {
    HeaderTop,
  },
};
</script>

<style lang="stylus">
&.order { // 订单
  width: 100%;

  .header {
    background-color: #FFC300;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 45px;

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

  .order_no_login {
    padding-top: 140px;
    width: 60%;
    margin: 0 auto;
    text-align: center;

    >img {
      display: block;
      width: 100%;
      height: 30%;
    }

    >h3 {
      padding: 10px 0;
      font-size: 17px;
      color: #6a6a6a;
    }

    >button {
      display: inline-block;
      background: #FFC300;
      font-size: 14px;
      color: #333;
      border: 0;
      outline: none;
      border-radius: 5px;
      padding: 10px 20px;
    }
  }
}
</style>
