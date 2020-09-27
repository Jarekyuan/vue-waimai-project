// 使用mockjs 提供mock数据接口

import Mock from 'mockjs'
import apiData from './data.json'

// 提供 goods 的接口
Mock.mock('/goods', { code: 0, data: apiData.goods });
// 提供 ratings 的接口
Mock.mock('/ratings', { code: 0, data: apiData.ratings });
// 提供 info 的接口
Mock.mock('/info', { code: 0, data: apiData.info });




// export default ???     不需要暴露，只需要执行代码