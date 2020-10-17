const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
  entry: {
    bundle: [
      './src/app.js',
      './src/sass/style.sass',
    ],
    serviceWorker: './serviceWorker.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{
        test: /\.(png|jpg|woff2)$/,
        loader: "url-loader",
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
                require('autoprefixer')({
                  'browsers': ['> 1%', 'last 2 versions', 'IE > 7']
                }),
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
        from: './src/works',
        to: './works'
      },
      {
        from: './src/about',
        to: './about'
      },
      {
        from: './src/krooshkin',
        to: './krooshkin'
      },
      {
        from: './src/articles',
        to: './articles'
      },
      {
        from: './CNAME',
        to: 'CNAME'
      }
    ]),
    new HtmlWebpackPlugin({
      // filename is the name of the output file
      // template is the name of the source file
      filename: 'index.html',
      template: 'index.html',
      excludeChunks: ['serviceWorker']
    }),
    new MiniCssExtractPlugin({
      filename: "style.css"
    }),
  ]
};
