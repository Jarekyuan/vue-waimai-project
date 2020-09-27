// 修改state数据的对象
import Vue from 'vue'

import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO,
    ADDFOOD_COUNT,
    SUBFOOD_COUNT,
    CLEAR_CART,
    RECEIVE_SEARCH_SHOPS
} from './mutation-types'


export default {
    [RECEIVE_ADDRESS](state, { address }) {
        state.address = address
    },
    [RECEIVE_CATEGORYS](state, { categorys }) {
        state.categorys = categorys
    },
    [RECEIVE_SHOPS](state, { shops }) {
        state.shops = shops
    },
    // 搜索商家信息
    [RECEIVE_SEARCH_SHOPS](state, { searchShops }) {
        state.searchShops = searchShops
    },

    // 用户登录，保存用户信息
    [RECEIVE_USER_INFO](state, { userInfo }) {
        state.userInfo = userInfo
    },
    // 用户退出
    [RESET_USER_INFO](state) {
        state.userInfo = {}
    },

    [RECEIVE_INFO](state, { info }) {
        state.info = info
    },
    [RECEIVE_RATINGS](state, { ratings }) {
        state.ratings = ratings
    },
    [RECEIVE_GOODS](state, { goods }) {
        state.goods = goods
    },

    // 购物车
    [ADDFOOD_COUNT](state, { food }) {
        // 第一次count有值则++，没有值则变为1
        if (!food.count) {
            // 1.让food中新增的属性count值为1: food.count = 1
            Vue.set(food, 'count', 1);
            // 2.然后将该food添加到购物车cartFoods数据中
            state.cartFoods.push(food)
        } else {
            food.count++

        }
    },
    [SUBFOOD_COUNT](state, { food }) {
        // 有值才可以减减
        if (food.count) {
            food.count--
                // 3.当该food数量为0时，将该food从cartFoods中清除
                if (food.count == 0) {
                    state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
                }
        }
    },

    // 清除购物车
    [CLEAR_CART](state) {
        state.cartFoods.forEach((food) => food.count = 0);
        state.cartFoods = []
    },


}