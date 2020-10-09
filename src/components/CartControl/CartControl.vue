<template>
  <div class="cartcontrol">
    <!-- 减号(有food.count值时候显示) -->
    <transition name="move">
      <div class="iconfont icon-remove_circle_outline" v-if="food.count" @click.stop="updataCount(false)"></div>
    </transition>
    <!-- 数量 -->
    <div class="cart-count" v-if="food.count">{{food.count}}</div>
    <!-- 加号 -->
    <div class="iconfont icon-add_circle" @click.stop="updataCount(true)"></div>
  </div>
</template>



<script>
/* 
  1. 子传父 @click 事件让count变化
  2. json数据里面的food里面没用 count，需要新增这个属性
  3. 则需要更新数据到store中，并且调用Vue.set() 方法创建这个属性并且赋值
  4. 阻止点击事件冒泡 @click.stop
*/

export default {
  props: {
    food: Object
  },
  
  methods: {
    // 增加或者减少, 把数据更新到store里（传：isAdd/else，food）
    updataCount(isAdd) {
      this.$store.dispatch('updataCount', {isAdd, food: this.food})
    }
  },
};
</script>



<style lang="stylus">
@import '../../assets/stylus/mixins.styl';

.cartcontrol {
  font-size: 0;

  .cart-decrease {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }

  .icon-remove_circle_outline {
    display: inline-block;
    padding: 6px;
    line-height: 22px;
    font-size: 22px;
    color: #FFCC00;


    // 加消失的动画效果
    &.move-enter-active, &.move-leave-active {
      transition: all 0.3s;
    }
    &.move-enter, &.move-leave-to {
      opacity: 0;
      transform: translateX(15px) rotate(180deg);
    }
  }

  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .icon-add_circle {
    display: inline-block;
    padding: 6px;
    line-height: 22px;
    font-size: 22px;
    color: #FFCC00;
  }
}
</style>
