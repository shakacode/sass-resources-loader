/* eslint no-console: 0 */

const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const path = require('path');

const devBuildConfig = require('./webpack.config');

const PORT = 4000;

process.env.WEBPACK_DEV_SERVER = true;

const server = express();
const compiler = webpack(devBuildConfig);

server.use(webpackDevMiddleware(compiler, {
  publicPath: devBuildConfig.output.publicPath,
  hot: true,
  inline: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    hash: false,
    version: false,
    chunks: false,
    children: false,
  },
}));

server.use(webpackHotMiddleware(compiler));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/', ({ res }) => (
  res.sendFile(path.join(__dirname, 'app', 'markup', 'index.html'))
));

server.listen(PORT, 'localhost', err => {
  if (err) console.log(`=> OMG!!! 🙀 ${err}`);
  console.log(`=> 🔥  Webpack dev server is running on port ${PORT}`);
});
