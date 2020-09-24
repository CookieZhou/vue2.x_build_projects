module.exports = {
    plugins: {
        'postcss-pxtorem': {
            // 设计稿 375: 37.5
            // 设计稿：750: 75
            // Vant 是基于 375
            rootValue: 18.75,
            viewportUnit: 'rem',
            // 要忽略的选择器并保留为px。
            selectorBlackList: ['.ignore', '.hairlines', '.van-', /^(.van)/, /^(.igno)/],
            minPixelValue: .5,
            propList: ['*']
        }
    }
}
