const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    writeToDisk: true,
    contentBase: './dist',
    useLocalIp: true,
    host: '0.0.0.0'
  }
  // plugins: [
  //   new BundleAnalyzerPlugin()
  // ]
})