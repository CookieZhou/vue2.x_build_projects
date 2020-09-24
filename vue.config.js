module.exports = {
    // 基本路径
    publicPath: './',
    // 输出文件目录
    outputDir: 'orderfood',
    // webpack-dev-server 相关配置
    devServer: {
        port: 1235
    },
    productionSourceMap: false, // 生产打包时不输出map文件，增加打包速度
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/styles/var.scss";`
            }
        }
    }
}
