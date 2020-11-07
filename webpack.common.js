const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    bundle: [
      './src/scripts/index.js'
    ],
    serviceWorker: './serviceWorker.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].bundle.scripts'
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
        loader: "file-loader",
        options: {
          esModule: false
        }
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
        options: {
          rootRelative: path.resolve(__dirname, 'src/hbs/'),
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer'),
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
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
      filename: "style.css"
    }),
    new CopyWebpackPlugin([
      {
        from: './src/assets',
        to: './assets'
      },
      {
        from: './manifest.json',
        to: './manifest.json'
      },
      {
        from: './src/hbs/works',
        to: './works',
        globOptions: {
          ignore: ['./src/works/index.hbs']
        }
      },
    ]),
    new HtmlWebpackPlugin({
      template: './src/hbs/pages/index.hbs',
      filename: './index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/hbs/pages/index.hbs',
      filename: './articles/index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/hbs/pages/articles/pwa-basics/index.hbs',
      filename: './articles/pwa-basics/index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/hbs/pages/articles/serviceWorker-2.0/index.hbs',
      filename: './articles/serviceWorker-2.0/index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/hbs/pages/articles/thoughts/index.hbs',
      filename: './articles/thoughts/index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/hbs/pages/works/index.hbs',
      filename: './works/index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/hbs/pages/about/index.hbs',
      filename: './about/index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/hbs/pages/krooshkin/index.hbs',
      filename: './krooshkin/index.html'
    }),
    // new HtmlWebpackPlugin({
    //   // filename is the name of the output file
    //   // template is the name of the source file
    //   filename: 'index.hbs',
    //   template: 'index.hbs',
    //   excludeChunks: ['serviceWorker']
    // })
  ]
};
