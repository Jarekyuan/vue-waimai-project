
<template>
  <div class="footer_guide">
    <div @click="goto('/msite')"  class="guide_item" :class="{on: '/msite'===$route.path}">
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>外卖</span>
    </div>
    <div @click="goto('/search')"  class="guide_item" :class="{on: '/search'===$route.path}">
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </div>
    <div @click="goto('/order')" class="guide_item" :class="{on: '/order'===$route.path}">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </div>
    <div @click="goto('/profile')" class="guide_item" :class="{on: '/profile'===$route.path}">
      <span class="item_icon">
        <i class="iconfont icon-geren"></i>
      </span>
      <span>我的</span>
    </div>
  </div>
</template>
<script>
// -----------非路由组件（底侧tab切换栏）-------------
// 1. 实现html结构和css样式的编写
// 2. 为tab图标加一个on的类，如果切换到这个路由，就显示这个图标高亮：:class="{on: '/地址'===$route.path}"
// 3. 编程式导航，添加函数 goto(path),点击跳转到对应路由

export default {
  data() {
    return {};
  },
  methods: {
    goto(path) {
      this.$router.replace(path)
    }
  },
  created() {},
};
</script>

<style lang="stylus">
// 改为自己样式
  @import "../../assets/stylus/mixins.styl"
  .footer_guide  //footer
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #FFC300
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-size 22px
</style>
