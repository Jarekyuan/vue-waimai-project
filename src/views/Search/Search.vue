<template>
  <!--搜索-->
  <div>
    <section class="search">
      <!--首页头部 使用组件进行插槽渲染-->
      <HeaderTop title="搜索"></HeaderTop>

      <!-- 输入搜索框 -->
      <form class="search_form" @submit.prevent="search">
        <input type="search" placeholder="请输入商家名称" class="search_input" v-model="keyword" />
        <input type="submit" class="search_submit" />
      </form>

      <!-- 遍历搜索到的结果 -->
      <!-- 如果：默认搜索结果为true，则显示内容 -->
      <section class="list" v-if="SearchData">
        <ul class="list_container">
          <!-- 点击跳转的地址  :to="'/shop?id='+item.id"-->
          <router-link
            :to="{path:'/shop', query:{id:item.id}}"
            tag="li"
            v-for="item in searchShops"
            :key="item.id"
            class="list_li"
          >
            <section class="item_left">
              <img :src="imgBaseUrl + item.image_path" class="restaurant_img" />
            </section>
            <section class="item_right">
              <div class="item_right_text">
                <p>
                  <span>{{item.name}}</span>
                </p>
                <p>月售 {{item.month_sales||item.recent_order_num}} 单</p>
                <p>{{item.delivery_fee||item.float_minimum_order_amount}} 元起送 / 距离{{item.distance}}</p>
              </div>
            </section>
          </router-link>
        </ul>
      </section>
      <!-- 未找到的结果 图片样式-->
      <!-- 如果：默认搜索结果为false，则显示 没有搜索到数据  -->
      <div class="search_none" v-else>很抱歉！无搜索结果</div>
    </section>
  </div>
</template>


<script>
import {mapState} from 'vuex'
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";

export default {
  data() {
    return {
      keyword: '',
      imgBaseUrl: 'http://cangdu.org:8001/img/', 
      // 默认搜索到结果为 true
      SearchData: true
    }
  },

  computed: {
    ...mapState(['searchShops'])
  },

  methods: {
    // 用关键字搜索商铺
    search() {
      const keyword = this.keyword.trim()
      if (keyword) {
        // 再搜索数据
        this.$store.dispatch('getSearchShops', keyword)
      }
    }
  },

   watch: {
    //  当进行了搜索时候，默认搜索结果
      searchShops (value) {
        if(!value.length) { // 没有搜索到数据
          this.SearchData = false
        } else { // 有搜到数据
          this.SearchData = true
        }
      }
    },

  components: {
    HeaderTop,
  },
};
</script>

<style lang="stylus">
@import '../../assets/stylus/mixins.styl';

.search {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .search_form {
    clearFix();
    margin-top: 45px;
    background-color: #fff;
    padding: 12px 8px;

    input {
      height: 35px;
      padding: 0 4px;
      border-radius: 2px;
      font-weight: bold;
      outline: none;

      &.search_input {
        float: left;
        width: 79%;
        border: 4px solid #f2f2f2;
        font-size: 14px;
        color: #333;
        background-color: #f2f2f2;
      }

      &.search_submit {
        float: right;
        width: 18%;
        border: 4px solid #FFC300;
        font-size: 16px;
        color: #333;
        background-color: #FFC300;
      }
    }
  }

  .list {
    .list_container {
      background-color: #fff;

      .list_li {
        display: flex;
        justify-content: center;
        padding: 10px;
        border-bottom: 1px solid $bc;

        .item_left {
          margin-right: 10px;

          .restaurant_img {
            width: 50px;
            height: 50px;
            display: block;
          }
        }

        .item_right {
          font-size: 12px;
          flex: 1;

          .item_right_text {
            p {
              line-height: 12px;
              margin-bottom: 6px;

              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }

  .search_none {
    margin: 0 auto;
    color: #333;
    background-color: #fff;
    text-align: center;
    margin-top: 0.125rem;
  }
}
</style>
