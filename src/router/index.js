 import Vue from 'vue'
 import VueRouter from 'vue-router'


 //  路由懒加载
 const Msite = () =>
     import ('../views/Msite/Msite.vue')
 const Search = () =>
     import ('../views/Search/Search.vue')
 const Order = () =>
     import ('../views/Order/Order.vue')
 const Profile = () =>
     import ('../views/Profile/Profile.vue')
 const Login = () =>
     import ('../views/Login/Login.vue')
     //  import Msite from '../views/Msite/Msite.vue'
     //  import Search from '../views/Search/Search.vue'
     //  import Order from '../views/Order/Order.vue'
     //  import Profile from '../views/Profile/Profile.vue'
     //  import Login from '../views/Login/Login.vue'

 import Shop from '../views/Shop/Shop.vue'
 import ShopGoods from '../views/Shop/ShopGoods/ShopGoods.vue'
 import ShopRatings from '../views/Shop/ShopRatings/ShopRatings.vue'
 import ShopInfo from '../views/Shop/ShopInfo/ShopInfo.vue'


 Vue.use(VueRouter)

 export default new VueRouter({
     routes: [{ path: '/', redirect: '/msite' },
         {
             path: '/msite',
             component: Msite,
             meta: { showFooter: true }
         },
         {
             path: '/search',
             component: Search,
             meta: { showFooter: true }
         },
         {
             path: '/order',
             component: Order,
             meta: { showFooter: true }
         },
         {
             path: '/profile',
             component: Profile,
             meta: { showFooter: true }
         },
         {
             path: '/login',
             component: Login,
             meta: { showFooter: false }
         },
         {
             path: '/shop',
             component: Shop,
             children: [{
                 path: '',
                 redirect: '/shop/goods',
             }, {
                 path: '/shop/goods',
                 component: ShopGoods,
             }, {
                 path: '/shop/ratings',
                 component: ShopRatings,
             }, {
                 path: '/shop/info',
                 component: ShopInfo,
             }, ]
         },
     ]
 })