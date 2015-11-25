/* eslint func-names: 0 */

import isArrayOfStrings from './utils/isArrayOfStrings';
import resolveResources from './utils/resolveResources';
import logger from './utils/logger';

module.exports = function(source) {
  if (this.cacheable) this.cacheable();

  global.__DEBUG__ = (
    process.env.DEBUG === 'sass-resources-loader' || process.env.DEBUG === '*'
  );

  logger.debug(`Hey, we're in DEBUG mode! Yabba dabba doo!`);

  logger.debug('Context:', this.context);

  const resources = this.options.sassResources;

  if (!resources) {
    throw new Error(`
      Could not find sassResources property.
      Make sure it's defined in your webpack config.
    `);
  }

  logger.debug('sassResources:', resources);

  const resourcesIsString = typeof resources === 'string';
  const resourcesIsArrayOfStrings = isArrayOfStrings(resources);

  logger.debug('sassResources is String:', resourcesIsString);
  logger.debug('sassResources is Array of Strings:', resourcesIsArrayOfStrings);

  if (!resourcesIsString && !resourcesIsArrayOfStrings) {
    throw new Error(`
      Looks like sassResources property has wrong type.
      Make sure it's String or Array of Strings.
    `);
  }

  const result = [];

  if (resourcesIsString) {
    const resourcesImport = resolveResources(resources, this);
    logger.debug('Resources:', resourcesImport || '**not found**');

    result.push(resourcesImport);
  } else {
    resources.forEach(resource => {
      const resourcesImport = resolveResources(resource, this);
      logger.debug('Resources:', resourcesImport || '**not found**');

      result.push(resourcesImport);
    });
  }

  result.push(source);

  const resultOutput = (
    result
      .map(fragment => fragment + '\n')
      .join('')
  );

  logger.debug('Output:', '\n', resultOutput);

  return resultOutput;
};
