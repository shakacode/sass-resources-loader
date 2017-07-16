const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {

  entry: './app/startup/App',

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'app.js',
  },

  devtool: 'none',

  resolve: { extensions: ['.js', '.jsx'] },

  plugins: [
    new ExtractTextPlugin({ filename: 'app.css', allChunks: true }),
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
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            {
              loader: 'css-loader',
              query: {
                minimize: true,
                modules: true,
                importLoaders: 2,
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
            'postcss-loader',
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              query: {
                resources: [
                  './app/assets/styles/variables/*.scss',
                  './app/assets/styles/mixins.scss',
                ],
              },
            },
          ],
        }),
      },
    ],
  },
};
