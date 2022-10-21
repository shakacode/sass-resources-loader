const webpack = require('webpack');
const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const production = process.env.NODE_ENV === 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: production ? 'production' : 'development',

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
    new MiniCssExtractPlugin(),
    !production && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),

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
          production && MiniCssExtractPlugin.loader,
          !production && { loader: 'style-loader' },
          {
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
              // Must be true b/c of mixins
              hoistUseStatements: false,
              resources: [
                path.resolve(__dirname, './app/assets/styles/variables/*.scss'),
                path.resolve(__dirname, './app/assets/styles/mixins.scss'),
              ],
            },
          },
        ].filter(Boolean),
      },
    ],
  },
};
