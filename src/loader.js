/* eslint func-names: 0 */

import fs from 'fs';
import path from 'path';
import async from 'async';
import loaderUtils from 'loader-utils';

import processResources from './utils/processResources';
import parseResources from './utils/parseResources';
import rewriteImports from './utils/rewriteImports';
import logger from './utils/logger';

module.exports = function(source) {
  const webpack = this;

  if (webpack.cacheable) webpack.cacheable();

  const callback = webpack.async();

  global.__DEBUG__ = process.env.DEBUG === 'sass-resources-loader' || process.env.DEBUG === '*';

  logger.debug(`Hey, we're in DEBUG mode! Yabba dabba doo!`);

  // TODO: Remove `webpack.options.sassResources` support after first stable webpack@2 release
  const isWebpack2 = webpack.version === 2;
  const resourcesFromConfig =
    isWebpack2
    ? (loaderUtils.getOptions(this) || {}).resources
    : webpack.options.sassResources;

  if (!resourcesFromConfig) {
    const error = new Error(`
      Can't find sass resources in your config.
      Make sure ${isWebpack2 ? 'loader.options.resources' : 'webpackConfig.sassResources'} exists.
    `);

    return callback(error);
  }

  const resourcesLocations = parseResources(resourcesFromConfig);
  const moduleContext = webpack.context;
  const webpackConfigContext = webpack.options.context || process.cwd();

  if (!webpack.options || !webpack.options.context) {
    logger.log(
      '`options.context` is missing. Using current working directory as a root instead:',
      process.cwd(),
    );
  }

  const rootContext = webpack.options.context || process.cwd();

  logger.debug('Module context:', moduleContext);
  logger.debug('Webpack config context:', webpackConfigContext);
  logger.debug('Resources:', resourcesLocations);

  if (!resourcesLocations.length) {
    const error = new Error(`
      Something wrong with provided resources.
      Make sure 'options.resources' is String or Array of Strings.
    `);

    return callback(error);
  }

  const files = resourcesLocations.map(resource => {
    const file = path.resolve(webpackConfigContext, resource);
    webpack.addDependency(file);
    return file;
  });

  async.map(
    files,
    (file, cb) => {
      fs.readFile(file, 'utf8', (error, contents) => {
        rewriteImports(error, file, contents, moduleContext, rootContext, cb);
      });
    },
    (error, resources) => {
      processResources(error, resources, source, moduleContext, callback);
    }
  );
};
