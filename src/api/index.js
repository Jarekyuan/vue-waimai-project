import ajax from './ajax'

// 跨域代理拦截
const B_URL = '/api'

// 获取地址信息(根据经纬度串)
export const reqAddress = geohash => ajax(B_URL + '/position/' + geohash);
// 获取食品分类列表
export const reqCategorys = () => ajax(B_URL + '/index_category');
// 根据经纬度获取商铺列表
export const reqShops = ({ latitude, longitude }) => ajax(B_URL + '/shops', { latitude, longitude });
// 根据经纬度和关键字搜索商铺列表
export const reqSearchShop = ({ geohash, keyword }) => ajax(B_URL + '/search_shops', { geohash, keyword });


// 账号密码登录
export const reqPwdLogin = ({ name, pwd, captcha }) => ajax(B_URL + '/login_pwd', { name, pwd, captcha }, 'POST');
// 发送短信验证码
export const reqSendCode = phone => ajax(B_URL + '/sendcode', { phone });
// 手机号验证码登陆
export const reqSmsLogin = (phone, code) => ajax(B_URL + '/login_sms', { phone, code }, 'POST');

// 根据会话获取用户信息
export const reqUser = () => ajax(B_URL + '/userinfo');
// 用户登出
export const reqLogout = () => ajax(B_URL + '/logout');


// ------------mockjs 数据请求拦截------------------ 
// 获取商家信息
export const reqShopInfo = () => ajax('/info');
// 获取商家评价
export const reqShopRatings = () => ajax('/ratings');
// 获取商家商品
export const reqShopGoods = () => ajax('/goods');