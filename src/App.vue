<template>
  <div id="app">
    <router-view></router-view>
    <!-- 只有四个路由显示 -->
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>


<script>
// 底部tab组件
import FooterGuide from "./components/FooterGuide/FooterGuide.vue";
// 获取数据
import {mapActions} from 'vuex'

export default {

  // 获取用户信息
  mounted() {
    this.getUserInfo()
  },
  methods: {
    ...mapActions(['getUserInfo'])
  },


  components: {
    FooterGuide,
  },
};
</script>


<style lang="stylus">
body {
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
</style>
