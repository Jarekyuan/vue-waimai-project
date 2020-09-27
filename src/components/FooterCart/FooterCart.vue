<template>
  <!-- *** 底部购物车功能 -->
  <div>
    <div class="shopcart">
      <!--------------------- 1.底部购物车 ------------------>
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <!-- 高亮绿色显示购物车logo ： 总数量totalCount有值时-->
            <div class="logo" :class="{highlight: totalCount}">
              <i class="iconfont icon-shopping_cart" :class="{highlight: totalCount}"></i>
            </div>
            <!-- 有totalCount总数量时候，显示总数的红点数量-->
            <div class="num" v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight: totalCount}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{info.deliveryPrice}}元</div>
        </div>

        <!-- ***差价： -->
        <div class="content-right">
          <div class="pay" :class="payClass">{{payText}}</div>
        </div>
      </div>

      <!-- --------------2.购物车商品列表------------------ -->
      <transition name="move">
        <!--## ***购物车商品列表显示需要两个条件：listShow（点击底部）并且 totalCount有值时 -->
        <!--  如果要手动的设置计算属性的get 和 set值 需要将计算属性写成对象 listShow:{} 监听isShow -->
        <div class="shopcart-list" v-show="isShow">
          <!-- 标题 -->
          <div class="list-header">
            <h1 class="title">购物车 已选商品</h1>
            <span class="empty" @click="clearCart">清空</span>
          </div>
          <!-- ul li 列表 -->
          <div class="list-content">
            <ul>
              <li class="food" v-for="(food, index) in cartFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price}}</span>
                </div>
                <!-- CartControl组件 -->
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food"></CartControl>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>

    <!-- 遮盖层默认隐藏，点击底部购物车显示遮盖层，再点击遮盖层隐藏购物车列表-->
    <div class="list-mask" v-show="isShow" @click="toggleShow"></div>
  </div>
</template>



<script>
// 1.静态模板
// 2.不需要父组件传值（计算属性太多），使用mapGeeters读取数据
// 3.计算差价显示配送费,返回类名 enough/not-enough
// 4.当点击添加一个food，修改mutations中的数据 state.cartFoods.push(food)

import { mapState, mapGetters } from "vuex";
import CartControl from "../CartControl/CartControl.vue";
import BScroll from "better-scroll";

import Vue from "vue";
import { Dialog } from "vant";
Vue.use(Dialog);

export default {
  data() {
    return {
      // 初始隐藏购物车列表
      isShow: false,
    };
  },

  computed: {
    // 需要读取的数据
    ...mapState(["cartFoods", "info"]),
    // cartFoods 推出 totalCount(该food总数)  totalPrice(该food总价)
    ...mapGetters(["totalCount", "totalPrice"]),

    // ***计算差价显示配送费
    payClass() {
      // 总价
      const { totalPrice } = this;
      // 最低配送费
      const { minPrice } = this.info;
      // 返回类名 enough/not-enough
      return totalPrice >= minPrice ? "enough" : "not-enough";
    },
    payText() {
      const { totalPrice } = this;
      const { minPrice } = this.info;
      // 总价为0显示20元起送； 总价小于配送价，还剩差价起送； 总价大于配送价，结算。
      if (totalPrice === 0) {
        return `￥${minPrice}起送`;
      } else if (totalPrice < minPrice) {
        return `还差￥${minPrice - totalPrice}起送`;
      } else {
        return "结算";
      }
    },
  },

  watch: {
    // 观察totalCount变化
    totalCount: function () {
      // 如果购物车没有数量 return false 并且隐藏把 isShow变为 false
      if (!this.totalCount) {
        this.isShow = false;
        return false;
      }
    },
    // 观察isShow 显示时
    isShow: function (totalCount) {
      let show = this.isShow;

      // 如果显示购物车列表时候，才调用$nextTick，new一个BScroll
      // *** 问题：显示一下列表，创建一个BScroll对象，显示一个创建一个。
      if (show) {
        this.$nextTick(() => {
          // 保证创建只有一个BScroll对象
          if (!this.scroll) {
            this.scroll = new BScroll(".list-content", {
              click: true,
            });
          } else {
            this.scroll.refresh(); // 让滚动条刷新一下
          }
        });
      }

      return show;
    },
  },

  methods: {
    // 显示隐藏购物车列表切换
    toggleShow() {
      // 只有当总数量大于0时才能切换
      if (this.totalCount > 0) {
        this.isShow = !this.isShow;
      }
    },

    // 清空购物车
    clearCart() {
      Dialog.confirm({
        title: "确定清空购物车吗？"
      })
        .then(() => {
          this.$store.dispatch('clearCart')
        })
        .catch(() => {
        });
    },
  },

  components: {
    CartControl,
  },
};
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/mixins.styl';

.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;

  .content {
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);

    .content-left {
      flex: 1;

      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;

        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #2b343c;

          &.highlight {
            background: #009933;
          }

          .icon-shopping_cart {
            line-height: 44px;
            font-size: 24px;
            color: #80858a;

            &.highlight {
              color: #fff;
            }
          }
        }

        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #ffffff;
          background: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }

      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 5px;
        line-height: 24px;
        padding-right: 12px;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: 700;
        color: #fff;

        &.highlight {
          color: #fff;
        }
      }

      .desc {
        display: inline-block;
        vertical-align: bottom;
        margin-bottom: 15px;
        margin-left: -45px;
        font-size: 10px;
      }
    }

    .content-right {
      flex: 0 0 105px;
      width: 105px;

      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        color: #fff;

        &.not-enough {
          background: #2b333b;
        }

        &.enough {
          background: #00b43c;
          color: #fff;
        }
      }
    }
  }

  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);

      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #009933;
        transition: all 0.4s linear;
      }
    }
  }

  .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    // 动画，从下往上走
    transform: translateY(-100%);

    &.move-enter-active, &.move-leave-active {
      transition: transform 0.3s;
    }

    &.move-enter, &.move-leave-to {
      transform: translateY(0);
    }

    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);

      .title {
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }

      .empty {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
      }
    }

    .list-content {
      padding: 0 18px;
      max-height: 217px;
      overflow: hidden;
      background: #fff;

      .food {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        bottom-border-1px(rgba(7, 17, 27, 0.1));

        .name {
          line-height: 24px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .price {
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 6px;
        }
      }
    }
  }
}

.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  backdrop-filter: blur(10px);
  opacity: 1;
  background: rgba(7, 17, 27, 0.6);

  &.fade-enter-active, &.fade-leave-active {
    transition: all 0.5s;
  }

  &.fade-enter, &.fade-leave-to {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
}
</style>
