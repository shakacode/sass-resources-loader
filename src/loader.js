/* eslint func-names: 0 */

import fs from 'fs';
import path from 'path';
import async from 'async';

import processResources from './utils/processResources';
import logger from './utils/logger';
import parseResources from './utils/parseResources';

module.exports = function(source) {
  const webpack = this;

  if (webpack.cacheable) webpack.cacheable();

  const callback = webpack.async();

  global.__DEBUG__ = (
    process.env.DEBUG === 'sass-resources-loader' || process.env.DEBUG === '*'
  );

  logger.debug(`Hey, we're in DEBUG mode! Yabba dabba doo!`);

  const resourcesLocation = parseResources(webpack.options.sassResources);
  const moduleContext = webpack.context;
  const webpackConfigContext = webpack.options.context;

  logger.debug('Module context:', moduleContext);
  logger.debug('Webpack config context:', webpackConfigContext);

  if (!resourcesLocation) {
    const error = new Error(`
      Could not find sassResources property.
      Make sure it's defined in your webpack config.
    `);

    return callback(error);
  }

  logger.debug('sassResources:', resourcesLocation);

  if (!resourcesLocation.length) {
    const error = new Error(`
      Looks like sassResources property has wrong type.
      Make sure it's String or Array of Strings.
    `);

    return callback(error);
  }

  const files = resourcesLocation.map(resource => {
    const file = path.resolve(webpackConfigContext, resource);
    webpack.addDependency(file);
    return file;
  });

  async.map(
    files,
    (file, cb) => fs.readFile(file, 'utf8', cb),
    (error, resources) => {
      processResources(error, resources, source, moduleContext, callback);
    }
  );
};
