const webpack = require('webpack');
const path = require('path');

var production = process.env.NODE_ENV === 'production';
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")

module.exports = {
  mode: production ? "production" : "development",

  entry: [
    'webpack-hot-middleware/client',
    './app/startup/App',
  ],

  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: 'app.js',
    publicPath: '/assets/',
  },

  devtool: '#cheap-module-eval-source-map',

  resolve: { extensions: ['.js', '.jsx'] },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractCssChunks(
        {
          filename: "[name].css",
          chunkfilename: "[name].css",
        }
    ),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          {
            loader: ExtractCssChunks.loader,
            options: {
              hot: production ? false : true,
              modules: false,
              reloadAll: true
            }
          }, {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'postcss-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(__dirname, './app/assets/styles/variables/*.scss'),
                path.resolve(__dirname, './app/assets/styles/mixins.scss'),
              ],
            },
          },
        ],
      },
    ],
  },
};
