const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
const SqipWebpackPlugin = require('./sqip-webpack-plugin')

const templates = [
  {
    template: './src/hbs/pages/index.hbs',
    filename: './index.html'
  },
  {
    template: './src/hbs/pages/index.hbs',
    filename: './articles/index.html'
  },
  {
    template: './src/hbs/pages/articles/pwa-basics/index.hbs',
    filename: './articles/pwa-basics/index.html'
  },
  {
    template: './src/hbs/pages/articles/serviceWorker-2.0/index.hbs',
    filename: './articles/serviceWorker-2.0/index.html'
  },
  {
    template: './src/hbs/pages/articles/thoughts/index.hbs',
    filename: './articles/thoughts/index.html'
  },
  {
    template: './src/hbs/pages/works/index.hbs',
    filename: './works/index.html'
  },
  {
    template: './src/hbs/pages/about/index.hbs',
    filename: './about/index.html'
  },
  {
    template: './src/hbs/pages/krooshkin/index.hbs',
    filename: './krooshkin/index.html'
  },
]

module.exports = {
  entry: {
    bundle: [
      path.resolve(__dirname, 'src/scripts/index.js')
    ],
    serviceWorker: './serviceWorker.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].bundle.js'
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.(woff2|png|svg|jpg|jpeg|gif)$/,
        loader: 'file-loader',
        options: {
          esModule: false
        }
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          partialDirs: path.join(__dirname, 'src/hbs'),
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer'),
              ],
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/media'),
            to: 'media'
          },
          {
            from: path.resolve(__dirname, 'manifest.json'),
            to: 'manifest.json'
          },
          {
            from: path.resolve(__dirname, 'src/hbs/pages/works'),
            to: 'works',
            globOptions: {
              ignore: [path.resolve(__dirname, 'src/hbs/pages/works/index.hbs')]
            },
          }
        ]
      }
    ),
    ...templates.map(template => new HtmlWebpackPlugin(template)),
    new SqipWebpackPlugin()
// new HtmlWebpackPlugin({
//   // filename is the name of the output file
//   // template is the name of the source file
//   filename: 'index.hbs',
//   template: 'index.hbs',
//   excludeChunks: ['serviceWorker']
// })
  ]
}

