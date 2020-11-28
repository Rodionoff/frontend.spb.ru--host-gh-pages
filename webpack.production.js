const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /sqip/,
        use: [
          {
            loader: 'file-loader', // Or `url-loader` or your other loader
            options: {
              esModule: false,
            }
          },
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              severityError: 'warning', // Ignore errors on corrupted images
              minimizerOptions: {
                plugins: [
                  'imagemin-svgo',
                  'imagemin-webp',
                  'imagemin-gifsicle',
                  ['imagemin-mozjpeg', {quality:80}],
                  ['imagemin-pngquant', {quality: [0.75, 0.85]}]
                ],
              },
            },
          },
        ],
      }
    ]
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
    // new ImageMinimizerPlugin({
    //   test: /\.(png|jpe?g|webp|gif|svg)$/i,
    //   deleteOriginalAssets: true,
    //   filename: '[path][name].webp',
    //   minimizerOptions: {
    //     plugins: [
    //       'imagemin-svgo',
    //       'imagemin-webp',
    //       'imagemin-gifsicle',
    //       ['imagemin-mozjpeg', {quality:80}],
    //       ['imagemin-pngquant', {quality: [0.75, 0.85]}]
    //     ],
    //   },
    // }),
    // new ImageMinimizerPlugin({
    //   deleteOriginalAssets: true,
    //   filter: (source, sourcePath) => {
    //     return sourcePath.startsWith('works/') === false
    //
    //   },
    //   filename: '[path][name].webp',
    //   minimizerOptions: {
    //     plugins: ['imagemin-webp'],
    //   },
    // })
  ]
})