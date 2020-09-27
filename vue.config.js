const path = require('path')
module.exports = {

    devServer: {
        proxy: {
            // 匹配所有以 '/api'开头的请求路径
            '/api': {
                target: 'http://localhost:4000',
                changeOrigin: true, // 支持跨域
                // 重写路径: 去掉路径中开头的'/api'
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    },


    chainWebpack: config => {

        //----发布模式
        config.when(process.env.NODE_ENV === 'production', config => {
            //entry找到默认的打包入口，调用clear则是删除默认的打包入口
            //add添加新的打包入口
            // config.entry('app').clear().add('./src/main.prod.js')



            /* //使用externals设置排除项 (减小体积)
            config.set('externals', {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                axios: 'axios',
                lodash: '_',
                echarts: 'echarts',
                nprogress: 'NProgress',
                'vue-quill-editor': 'VueQuillEditor'
            });

            //使用插件 (定制首页内容)
            config.plugin('html').tap(args => {
                //添加参数isProd
                args[0].isProd = true
                return args
            }) */
        });


        //----开发模式
        config.when(process.env.NODE_ENV === 'development', config => {
            // config.entry('app').clear().add('./src/main.js')

            /*  //使用插件
             config.plugin('html').tap(args => {
                 //添加参数isProd
                 args[0].isProd = false
                 return args
             }) */
        });
    }
}