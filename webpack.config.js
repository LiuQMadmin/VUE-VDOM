const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
    entry: './src/js/index.js',
    output:{
        path: resolve(__dirname,'dist'),
        filename: 'bundle.js'
    },
    devtool: 'source-map', // 显示的是原始源代码
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(__dirname, 'src/index.html') // index.html中会默认引入bundle.js
        })
    ],
    devServer: {
        contentBase: './',
        open: true
    }
}