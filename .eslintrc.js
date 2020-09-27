// 使用插件来突破语法限制
module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        // '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

        // // -----添加自定义规则------
        // 'prettier/prettier': [
        //     // eslint校验不成功后，error或2则报错，warn或1则警告，off或0则⽆提示
        //     'error',
        //     {
        //         // singleQuote: true,
        //         semi: true, //结束是否加分号
        //         // printWidth: 160 //每行最长字符 
        //     }
        // ]
    }
}