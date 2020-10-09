<template>
  <div>
    <!-- 商铺顶部 -->
    <ShopHeader></ShopHeader>

    <!-- 导航部分(样式) -->
    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/goods">点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info">商家</router-link>
      </div>
    </div>

    <!-- 子路由站位 ---------------------- -->
    <!--    <keep-alive> 可以缓存之前路由的数据，如加入购物车的数据 -->
    <keep-alive> 
      <router-view></router-view>
    </keep-alive> 

  </div>
</template>

<script>

import ShopHeader from "../../components/ShopHeader/ShopHeader.vue";

export default {
  data() {
    return {};
  },
  computed: {},
  mounted() {
      this.$store.dispatch('getShopInfo')
  },

  components: {
    ShopHeader,
  },
};
</script>



<style lang="stylus">
@import "../../assets/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #FF9900
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #FF9900
</style>
