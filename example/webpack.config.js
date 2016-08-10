const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {

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

  resolve: { extensions: ['', '.js', '.jsx'] },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?modules&importLoaders=3&localIdentName=[name]__[local]__[hash:base64:5]',
          'postcss',
          'sass',
          'sass-resources',
        ],
      },
    ],
  },

  postcss: [autoprefixer],

  sassResources: './app/assets/styles/**/*.scss',

};
