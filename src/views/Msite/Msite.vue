<template>
  <!------------------------首页外卖------------------------>
  <section class="msite">
    <!--首页头部 使用组件进行插槽渲染-->
    <HeaderTop :title="address.name">
      <router-link to="/search" class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </router-link>

      <!-- 如果登录跳转用户个人，未登录则跳转登录页面 -->
      <router-link :to="userInfo._id ? '/userinfo' : '/login'" class="header_login" slot="right">
        <span class="header_login_text" v-if="!userInfo._id">
          登录 | 注册
        </span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-person"></i>
        </span>
      </router-link>
    </HeaderTop>

    <!--首页导航-->
    <nav class="msite_nav">
      <!-- 加载显示svg提示 -->
      <div class="swiper-container" v-if="categorys.length>0">
        <div class="swiper-wrapper">
          <!-- 显示内容区域 ***categorys为一维数组，不能显示出轮播图效果，=》变为二维数组-->
          <div class="swiper-slide" :key="index" v-for="(categorys, index) in categorysArr">
            <a
              href="javascript:"
              class="link_to_food"
              :key="index"
              v-for="(category, index) in categorys"
            >
              <div class="food_container">
                <img :src="baseImgUrl + category.image_url" />
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      
      <!-- 或者没显示之前的图片样式 -->
      <img src="./images/msite_back.svg" v-else />
    </nav>



    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>

      <!-- 具体商铺子路由 -->
      <keep-alive> 
        <ShopList></ShopList>
      </keep-alive> 
    </div>
  </section>
</template>
<script>
// 引入轮播
import Swiper from "swiper";
import "../../assets/css/swiper.min.css";

import { mapState } from "vuex";
// 引入顶部组件
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
// 引入商品信息
import ShopList from "../../components/ShopList/ShopList.vue";

export default {
  data() {
    return {
      baseImgUrl: "http://fuss10.elemecdn.com",
    };
  },

  computed: {
    ...mapState(["address", "categorys", "userInfo"]),

    // ***根据categorys一维数组生成二维数组arr2d, 小数组minArr中的元素个数最大为8个
    categorysArr() {
      const { categorys } = this;
      const arr2d = [];
      let minArr = []; // 最大长度为8
      categorys.forEach((c) => {
        // 如果当前小数组长度为8个，则创建一个新的
        if (minArr.length == 8) {
          minArr = [];
        }
        // 如果小数组是空的，把小数组保存到二维数组里
        if (minArr.length == 0) {
          arr2d.push(minArr);
        }
        minArr.push(c);
      });
      return arr2d;
    },
  },

  mounted() {
    // 异步获取数据
    this.$store.dispatch("getAddress");
    this.$store.dispatch("getCategorys");
    this.$store.dispatch("getShops");
  },

  watch: {
    // 监听 categorys数组中有了数据，页面更新就立即调用$nextTick 来创建swiper对象
    categorys(value) {
      this.$nextTick(() => {
        // 创建swiper对象
        new Swiper(".swiper-container", {
          loop: true, // 循环
          pagination: {
            el: ".swiper-pagination",
          },
        });
      });
    },
  },

  components: {
    HeaderTop,
    ShopList,
  },
};
</script>

<style lang="stylus">
// 改样式，图片内容
@import '../../assets/stylus/mixins.styl';

&.msite { // 首页
  width: 100%;

  .header {
    background-color: #02a774;
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
        color: #fff;
      }
    }

    .header_title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50%;
      color: #fff;
      text-align: center;

      .header_title_text {
        font-size: 20px;
        color: #fff;
        display: block;
      }
    }

    .header_login {
      font-size: 14px;
      color: #fff;
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);

      .header_login_text {
        color: #fff;
      }
    }
  }

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;

    .swiper-container {
      width: 100%;
      height: 100%;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;

          .link_to_food {
            width: 25%;

            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }

      .swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }

  .msite_shop_list {
    top-border-1px(#e4e4e4);
    margin-top: 10px;
    background: #fff;

    .shop_header {
      padding: 10px 10px 0;

      .shop_icon {
        margin-left: 5px;
        color: #999;
      }

      .shop_header_title {
        color: #999;
        font-size: 14px;
        line-height: 20px;
      }
    }

    .shop_container {
      margin-bottom: 50px;

      .shop_list {
        .shop_li {
          bottom-border-1px(#f1f1f1);
          width: 100%;

          >a {
            clearFix();
            display: block;
            box-sizing: border-box;
            padding: 15px 8px;
            width: 100%;

            .shop_left {
              float: left;
              box-sizing: border-box;
              width: 23%;
              height: 75px;
              padding-right: 10px;

              .shop_img {
                display: block;
                width: 100%;
                height: 100%;
              }
            }

            .shop_right {
              float: right;
              width: 77%;

              .shop_detail_header {
                clearFix();
                width: 100%;

                .shop_title {
                  float: left;
                  width: 200px;
                  color: #333;
                  font-size: 16px;
                  line-height: 16px;
                  font-weight: 700;

                  &::before {
                    content: '品牌';
                    display: inline-block;
                    font-size: 11px;
                    line-height: 11px;
                    color: #333;
                    background-color: #ffd930;
                    padding: 2px 2px;
                    border-radius: 2px;
                    margin-right: 5px;
                  }
                }

                .shop_detail_ul {
                  float: right;
                  margin-top: 3px;

                  .supports {
                    float: left;
                    font-size: 10px;
                    color: #999;
                    border: 1px solid #f1f1f1;
                    padding: 0 2px;
                    border-radius: 2px;
                  }
                }
              }

              .shop_rating_order {
                clearFix();
                width: 100%;
                margin-top: 18px;
                margin-bottom: 8px;

                .shop_rating_order_left {
                  float: left;
                  color: #ff9a0d;

                  .star { // 2x图 3x图
                    float: left;
                    font-size: 0;

                    .star-item {
                      display: inline-block;
                      background-repeat: no-repeat;
                    }

                    &.star-48 {
                      .star-item {
                        width: 20px;
                        height: 20px;
                        margin-right: 22px;
                        background-size: 20px 20px;

                        &:last-child {
                          margin-right: 0;
                        }

                        &.on {
                          bg-image('./images/stars/star48_on');
                        }

                        &.half {
                          bg-image('./images/stars/star48_half');
                        }

                        &.off {
                          bg-image('./images/stars/star48_off');
                        }
                      }
                    }

                    &.star-36 {
                      .star-item {
                        width: 15px;
                        height: 15px;
                        margin-right: 6px;
                        background-size: 15px 15px;

                        &:last-child {
                          margin-right: 0;
                        }

                        &.on {
                          bg-image('./images/stars/star36_on');
                        }

                        &.half {
                          bg-image('./images/stars/star36_half');
                        }

                        &.off {
                          bg-image('./images/stars/star36_off');
                        }
                      }
                    }

                    &.star-24 {
                      .star-item {
                        width: 10px;
                        height: 10px;
                        margin-right: 3px;
                        background-size: 10px 10px;

                        &:last-child {
                          margin-right: 0;
                        }

                        &.on {
                          bg-image('./images/stars/star24_on');
                        }

                        &.half {
                          bg-image('./images/stars/star24_half');
                        }

                        &.off {
                          bg-image('./images/stars/star24_off');
                        }
                      }
                    }
                  }

                  .rating_section {
                    float: left;
                    font-size: 10px;
                    color: #ff6000;
                    margin-left: 4px;
                  }

                  .order_section {
                    float: left;
                    font-size: 10px;
                    color: #666;
                    transform: scale(0.8);
                  }
                }

                .shop_rating_order_right {
                  float: right;
                  font-size: 0;

                  .delivery_style {
                    transform-origin: 35px 0;
                    transform: scale(0.7);
                    display: inline-block;
                    font-size: 12px;
                    padding: 1px;
                    border-radius: 2px;
                  }

                  .delivery_left {
                    color: #fff;
                    margin-right: -10px;
                    background-color: #02a774;
                    border: 1px solid #02a774;
                  }

                  .delivery_right {
                    color: #02a774;
                    border: 1px solid #02a774;
                  }
                }
              }

              .shop_distance {
                clearFix();
                width: 100%;
                font-size: 12px;

                .shop_delivery_msg {
                  float: left;
                  transform-origin: 0;
                  transform: scale(0.9);
                  color: #666;
                }

                .segmentation {
                  color: #ccc;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
