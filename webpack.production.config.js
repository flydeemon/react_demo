
var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: __dirname + '/src',
    entry: {
      app: './main.js', // 入口文件，单入口 app.jsx 文件
      vendors: ['antd','react', 'react-dom']
    }, 
    output: {
        path: __dirname + '/assets/',
        filename: 'bundle.js',
        publicPath: '/assets/'
    }, 
    devtool: false, // 调试 es6 代码 source-map
    module: {
        loaders: [ // 使用特定的加载器 loader 处理特定的文件
            {
                test: /\.js?$/, // 文件过滤规则
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                query: {
                    presets: ['es2015', 'react'] // es2015 处理 ES6 语法，react 处理 jsx 语法
                }
            }, {
                test: /\.css?$/, // css
                loader: 'style-loader!css-loader'
            }
        ]
    },
    plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'vendors.js' }),
    new webpack.optimize.UglifyJsPlugin({
       // 最紧凑的输出
        beautify: false,
        // 删除所有的注释
        comments: false,
        compress: {
          // 在UglifyJs删除没有用到的代码时不输出警告  
          warnings: false,
          // 删除所有的 `console` 语句
          // 还可以兼容ie浏览器
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true
        }
    })
  ]
};