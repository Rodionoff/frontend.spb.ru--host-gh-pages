const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const MiniCssEx tractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      // {
      //   test: /\.(sass|scss)$/i,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     {
      //       loader: 'css-loader',
      //     },
      //     {
      //       loader: 'postcss-loader',
      //       options: {
      //         ident: 'postcss',
      //         plugins: [
      //           require('autoprefixer'),
      //         ]
      //       }
      //     },
      //     {
      //       loader: 'sass-loader',
      //       options: {
      //         implementation: require('sass')
      //       }
      //     }
      //   ]
      // },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './CNAME',
          to: './'
        }
      ]
    }),
    // new MiniCssExtractPlugin({
    //   filename: 'style.css'
    // }),
  ]
})