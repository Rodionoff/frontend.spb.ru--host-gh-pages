const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = merge(common, {
  mode: 'development',
  // devtool: 'inline-source-map',
  devServer: {
    writeToDisk: true,
    contentBase: './dist'
  }
  // plugins: [
  //   new BundleAnalyzerPlugin()
  // ]
})