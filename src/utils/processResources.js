import logger from './logger';

export default function(error, resources, source, module, callback) {
  if (error) {
    logger.debug('Resources: **not found**');
    return callback(error);
  }

  const stringifiedResources = (
    Array.isArray(resources) ? resources.join('\n') : resources
  ) + '\n';

  const output = stringifiedResources + source;

  logger.debug('Resources: \n', `/* ${module} */ \n`, output);

  return callback(null, output);
}
