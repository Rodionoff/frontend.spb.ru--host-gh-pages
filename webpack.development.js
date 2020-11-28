const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    writeToDisk: true,
    contentBase: './dist',
    // open: true,
    // useLocalIp: true,
    // host: '0.0.0.0'
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        loader: 'file-loader',
        exclude: /sqip/,
        options: {
          esModule: false,
          outputPath: 'images',
          name: '[name].[ext]',
        }
      },
    ]
  }
})