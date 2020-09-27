// 对state数据进行包装计算的对象

export default {
    // 计算总数： 求和数组.reduce(函数（），累加到最右端为0)
    totalCount(state) {
        // return state.list.filter(item => item > 5) ：找出list中大于5的数
        return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0)
    },
    // 计算总价格
    totalPrice(state) {
        return state.cartFoods.reduce((preTotal, food) => preTotal + food.count * food.price, 0)
    },

    // 计算评论里满意的数量 
    satisfiedNum(state) {
        return state.ratings.filter((rating) => rating.rateType === 0).length
    }
}