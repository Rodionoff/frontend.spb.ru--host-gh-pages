const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const zlib = require('zlib')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './CNAME',
          to: './'
        }
      ]
    }),
    new​ ​CompressionPlugin​(​{​
      ​filename​: ​'[path][base].br'​,​
      ​algorithm​: ​'brotliCompress'​,​
      ​test​: ​/​\.​(​js​|​css​|​html​|​svg​)​$​/​,​
      ​compressionOptions​: ​{​
        ​params​: ​{​
          ​[​zlib​.​constants​.​BROTLI_PARAM_QUALITY​]​: ​11​,​
        ​}​,​
      ​}​,​
      ​threshold​: ​10240​,​
      ​minRatio​: ​0.8​,​
      ​deleteOriginalAssets​: ​false​,​
    ​}​)​,​
  ]
})
