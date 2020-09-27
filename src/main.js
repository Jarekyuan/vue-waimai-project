// 入口js

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入mock数据接口
import './mock/mockServer'


// 引入 vant-ui
import { Button, Loading } from 'vant';
Vue.use(Button);
Vue.use(Loading);

// 引入懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
    loading: './assets/img/1.gif' // 替换需要的图片
})

// 引入过滤器
import './fiters/index'

// 导入全局样式
import './assets/css/reset.css'


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')