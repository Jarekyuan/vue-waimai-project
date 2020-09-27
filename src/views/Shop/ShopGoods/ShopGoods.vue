<template>
  <div>

    <div class="goods">

      <!-- -------------1.左侧菜单------------- -->
      <div class="menu-wrapper">
        <ul>
          <!--***current为当前选中的类名，让 :class="{current: index===currentIndex}"   -->
          <li class="menu-item" v-for="(good, index) in goods" :key="index" 
              :class="{current:index===currentIndex}"  @click="clickMenuItem(index)">
            <span class="text bottom-border-1px">
              <!-- v-if="good.icon" 有值显示，没值不显示  v-show -->
              <!-- v-if显示隐藏是将dom元素整个添加或删除，而v-show为该元素添加css--display:none，dom元素还在。 -->
              <!-- v-if适合运营条件不大可能改变；v-show适合频繁切换。 -->
              <img class="icon" :src="good.icon" v-if="good.icon" />
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>

      <!-----------------2.食物li---------------- -->
      <div class="foods-wrapper">

        <ul ref="foodsUl">

          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <!-- 当前菜单名字 -->
            <h1 class="title">{{good.name}}</h1>
            <!-- 当前菜单下的食物内容 -->
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index"
                @click="showFood(food)">
                <!-- 左侧图片 -->
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <!-- 右侧食物内容 -->
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <!-- 加入购物车+1按钮组件 -->
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>

        </ul>
      </div>

      <!-- ----3.购物车组件------->
      <FooterCart></FooterCart>
    </div>


    <!-- 食物详细组件  -->
    <!-- **（每个项的详细页的显示与隐藏用子组件做，数据分类好， 使用父组件调用子组件方法 $refs） -->
    <!-- **（大项的详细页显示参考shopHeader，直接在自身组件用v-show显示与隐藏） -->
    <Food :food="food" ref="food"></Food>

  </div>
</template>



<script>
// 1.用数据渲染静态模板
// 2.当前分类：设计一个计算属性currentIndex，等于index则为true，加current类名
// 3.滑动右侧时候，更新左侧当前分类
// 4.BScroll库的使用
// 5. CartCount组件
// 6. Food组件
// 7. ShopCart组件

import {mapState} from 'vuex'

// 引入BS滑动库
import BScroll from 'better-scroll'

import CartControl from '../../../components/CartControl/CartControl.vue'
import Food from '../../../components/Food/Food.vue'
import FooterCart from '../../../components/FooterCart/FooterCart.vue'

export default {
  data() {
    return {
      scrollY: 0, // 收集右侧滑动的Y轴坐标
      tops: [], // 收集右侧分类li的top组成的数组 
      food: {}, // 子组件需要显示的food 
    };
  },


  computed: {
    // 读取数据
    ...mapState(['goods']),
    
    // ***计算得到当前分类的 下标值 index
    currentIndex() {
      const {scrollY, tops} = this
      // 根据条件计算产生一个结果
      const index = tops.findIndex((top, index) => {
        // scrollY>=当前top && scrollY<下一个top
        return scrollY >= top && scrollY < tops[index + 1]
      });
      // 返回结果
      return index
    }
  },

  mounted() {

    // 异步获取数据，(ajax)加回调函数，可以实现创建BS对象(或者用watch)
    this.$store.dispatch('getShopGoods', ()=> {

      // 数据更新后执行创建划动功能对象：
      this.$nextTick(()=>{

        // 1.初始化划动
        new BScroll('.menu-wrapper',{
          click: true
        })
        this.bs2 = new BScroll('.foods-wrapper',{
          probeType: 2,  // 惯性滑动触发的实时效果
          click: true
        })

        // 2.给右侧绑定scroll监听
        this.bs2.on("scroll", ({x,y})=>{
          // console.log(y);
          // 收集右侧滑动的Y的值
          this.scrollY = Math.abs(y)
        })
        // 给右侧列表绑定scroll结束的监听
        this.bs2.on('scrollEnd', ({x, y}) => {
          this.scrollY = Math.abs(y)
        });

        // 3.收集tops
        this._initTops()
      })
    })
  },

  methods: {

    // 收集每个li最上面一行的Y位置 tops:[0,751,1062...]
    _initTops() {
       // 3.1 初始化tops
        const tops = []
        let top = 0
        tops.push(top)

        // 3.2 收集
        // 找到所有分类的li
        const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
        Array.prototype.slice.call(lis).forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })

        // 3.3 更新数据
        this.tops = tops
    },
    // 点击左侧分类，跳转到右侧目标位置
    clickMenuItem(index) {
      this.scrollY = this.tops[index]
      this.bs2.scrollTo(0, -this.tops[index], 300)
    }, 
    
    
    // 显示点击的food
    showFood(food) {
      // 设置data里面food的对应的food详细内容
      this.food = food
      // 显示food子组件 （父组件调用子组件的方法toggleShow）
      this.$refs.food.toggleShow()
    }


  },

  components: {
    CartControl,
    Food,
    FooterCart
  },
};
</script>



<style lang="stylus">
@import '../../../assets/stylus/mixins.styl';

.goods {
  display: flex;
  position: absolute;
  top: 195px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: #00CC66;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>