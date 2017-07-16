const webpack = require('webpack');
const path = require('path');

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

  resolve: { extensions: ['.js', '.jsx'] },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: '[path]__[local]__[hash:base64:5]',
            },
          },
          'postcss-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                './app/assets/styles/variables/*.scss',
                './app/assets/styles/mixins.scss',
              ],
            },
          },
        ],
      },
    ],
  },
};
