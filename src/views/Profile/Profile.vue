<template>
  <!--我的-->
  <div>
    <section class="profile">
      <!--首页头部 使用组件进行插槽渲染-->
      <HeaderTop title="个人"></HeaderTop>

      <section class="profile-number">
        <!-- ***如果没登录跳转到兄弟路由login，如果登录跳转到用户个人信息路由 -->
        <router-link :to="userInfo._id ? '/userinfo' : '/login'" class="profile-link">
          <div class="profile_image">
            <i class="iconfont icon-person"></i>
          </div>
          <div class="user-info">
            <!-- 1.显示用户名登录的账号 -->
            <p class="user-info-top" v-if="!userInfo.phone">{{userInfo.name || '登录 || 注册'}}</p>
            <!-- 2.显示手机号登录的手机号 -->
            <p>
              <span class="user-icon">
                <i class="iconfont icon-shouji icon-mobile"></i>
              </span>
              <span class="icon-mobile-number">{{userInfo.phone || ' 暂无绑定手机号'}}</span>
            </p>
          </div>
          <span class="arrow">
            <i class="iconfont icon-jiantou1"></i>
          </span>
        </router-link>
      </section>

      <section class="profile_info_data border-1px">
        <ul class="info_data_list">
          <a href="javascript:" class="info_data_link">
            <span class="info_data_top">
              <span>0.00</span>元
            </span>
            <span class="info_data_bottom">我的余额</span>
          </a>
          <a href="javascript:" class="info_data_link">
            <span class="info_data_top">
              <span>0</span>个
            </span>
            <span class="info_data_bottom">我的优惠</span>
          </a>
          <a href="javascript:" class="info_data_link">
            <span class="info_data_top">
              <span>0</span>分
            </span>
            <span class="info_data_bottom">我的积分</span>
          </a>
        </ul>
      </section>

      <section class="profile_my_order border-1px">
        <!-- 我的订单 -->
        <a href="javascript:" class="my_order">
          <span>
            <i class="iconfont icon-order-s"></i>
          </span>
          <div class="my_order_div">
            <span>我的订单</span>
            <span class="my_order_icon">
              <i class="iconfont icon-jiantou1"></i>
            </span>
          </div>
        </a>
        <!-- 积分商城 -->
        <a href="javascript:" class="my_order">
          <span>
            <i class="iconfont icon-jifen"></i>
          </span>
          <div class="my_order_div">
            <span>积分商城</span>
            <span class="my_order_icon">
              <i class="iconfont icon-jiantou1"></i>
            </span>
          </div>
        </a>
        <!-- 外卖会员卡 -->
        <a href="javascript:" class="my_order">
          <span>
            <i class="iconfont icon-vip"></i>
          </span>
          <div class="my_order_div">
            <span>会员卡</span>
            <span class="my_order_icon">
              <i class="iconfont icon-jiantou1"></i>
            </span>
          </div>
        </a>
      </section>

      <section class="profile_my_order border-1px">
        <!-- 服务中心 -->
        <a href="javascript:" class="my_order">
          <span>
            <i class="iconfont icon-fuwu"></i>
          </span>
          <div class="my_order_div">
            <span>服务中心</span>
            <span class="my_order_icon">
              <i class="iconfont icon-jiantou1"></i>
            </span>
          </div>
        </a>
      </section>

      <!-- 添加的退出登录按钮 -->
      <div class="profile_my_order border-1px" v-if="userInfo._id">
        <van-button type="danger" style="width: 100%" @click="logout">退出登录</van-button>
      </div>
    </section>
  </div>
</template>


<script>
import { mapState } from "vuex";
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";

import Vue from 'vue'
import { Dialog, Toast} from 'vant';
Vue.use(Dialog);
Vue.use(Toast);


export default {
  computed: {
    ...mapState(["userInfo"]),
  },

  methods: {

    // 退出功能实现
    logout() {
      Dialog.confirm({
        title: "提示",
        message: "确认要退出吗",
      })
        .then(() => {
          // 点击了确认，则请求退出ajax
          this.$store.dispatch('tologout')
          Toast('退出成功');
        })
        .catch(() => {
          console.log("点击了取消")
        });
    },
  },
  components: {
    HeaderTop,
    [Dialog.Component.name]: Dialog.Component,
  },
};
</script>

<style lang="stylus">
@import '../../assets/stylus/mixins.styl';

&.profile { // 我的
  width: 100%;
  overflow: hidden; // 页面不滑动

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

  .profile-number {
    margin-top: 45px;

    .profile-link {
      clearFix();
      position: relative;
      display: block;
      background: #FFC300;
      padding: 20px 10px;

      .profile_image {
        float: left;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        vertical-align: top;

        .icon-person {
          background: #e4e4e4;
          font-size: 62px;
        }
      }

      .user-info {
        float: left;
        margin-top: 8px;
        margin-left: 15px;

        p {
          font-weight: 700;
          font-size: 18px;
          color: #333;

          &.user-info-top {
            padding-bottom: 8px;
          }

          .user-icon {
            display: inline-block;
            margin-left: -15px;
            margin-right: 20px;
            width: 10px;
            height: 8px;

            .icon-mobile {
              font-size: 28px;
              vertical-align: text-top;
            }
          }

          .icon-mobile-number {
            font-size: 14px;
            color: #333;
          }
        }
      }

      .arrow {
        width: 12px;
        height: 12px;
        position: absolute;
        right: 15px;
        top: 40%;

        .icon-jiantou1 {
          color: #333;
          font-size: 5px;
          font-weight : 700
        }
      }
    }
  }

  .profile_info_data {
    bottom-border-1px(#e4e4e4);
    width: 100%;
    background: #fff;
    overflow: hidden;

    .info_data_list {
      clearFix();

      .info_data_link {
        float: left;
        width: 33%;
        text-align: center;
        border-right: 1px solid #f1f1f1;

        .info_data_top {
          display: block;
          width: 100%;
          font-size: 14px;
          color: #333;
          padding: 15px 5px 10px;

          span {
            display: inline-block;
            font-size: 25px;
            color: #FFC300;
            font-weight: 700;
            line-height: 30px;
            margin-right : 2px
          }
        }

        .info_data_bottom {
          display: inline-block;
          font-size: 14px;
          color: #333;
          font-weight: 400;
          padding-bottom: 20px;
        }
      }

      .info_data_link:nth-of-type(2) {
        .info_data_top {
          span {
            color: #FFC300;
          }
        }
      }

      .info_data_link:nth-of-type(3) {
        border: 0;

        .info_data_top {
          span {
            color: #FFC300;
          }
        }
      }
    }
  }

  .profile_my_order {
    top-border-1px(#e4e4e4);
    margin-top: 10px;
    background: #fff;

    .my_order {
      display: flex;
      align-items: center;
      padding-left: 15px;

      >span {
        display: flex;
        align-items: center;
        width: 20px;
        height: 20px;
        margin-right 3px


        >.iconfont {
          margin-left: -10px;
          font-size: 30px;
        }

        .icon-order-s {
          color: #02a774;
        }

        .icon-jifen {
          color: #ff5f3e;
        }

        .icon-vip {
          color: #f90;
        }

        .icon-fuwu {
          color: #02a774;
        }
      }

      .my_order_div {
        width: 100%;
        border-bottom: 1px solid #f1f1f1;
        padding: 18px 10px 18px 0;
        font-size: 16px;
        color: #333;
        display: flex;
        justify-content: space-between;

        span {
          display: block;
        }

        .my_order_icon {
          width: 10px;
          height: 10px;

          .icon-jiantou1 {
            color: #bbb;
            font-size: 10px;
          }
        }
      }
    }
  }
}
</style>
