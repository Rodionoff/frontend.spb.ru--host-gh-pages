const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { InjectManifest } = require('workbox-webpack-plugin');
const path = require('path')

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
    // serviceWorker: './serviceWorker.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].bundle.js',
    publicPath: '/'
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    alias: {
      'media': path.resolve(__dirname, 'src/media/'),
    }
  },
  module: {
    rules: [
      {
        test: /(convert-to-base64.(png|jpe?g|webp)$)|(\.woff2$)/i,
        use: 'url-loader',
        exclude: /sqip/
      },
      {
        test: /sqip\.(png|jpe?g|webp|gif)$/i,
        loader: 'sqip-loader'
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        exclude: /sqip/,
        options: {
          inlineRequires: /\.(png|svg|jpe?g|webp|gif)$/i,
          rootRelative: path.join(__dirname, 'src/hbs/'),
          precompileOptions: {
            knownHelpersOnly: false
          },
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(s[ac]ss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                  ],
                ],
              },
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
            from: path.resolve(__dirname, 'src/hbs/pages/works/'),
            to: 'works',
            globOptions: {
              ignore: [path.resolve(__dirname, 'src/hbs/pages/works/index.hbs')]
            },
          },
          {
            from: path.resolve(__dirname, 'manifest.json'),
            to: 'manifest.json'
          },
          {
            from: path.resolve(__dirname, 'src/media/icons/'),
            to: 'icons'
          }
        ]
      }
    ),
    ...templates.map(template => new HtmlWebpackPlugin(template)),
    new InjectManifest({
      swSrc: path.resolve(__dirname, 'serviceWorker.js'),
      swDest: './serviceWorker.js',
      exclude: [
        /\.(png|svg|jpe?g|webp|gif)$/,
        /^[\/]*?works\/.*?\//
      ]
    })
  ]
}

