import logger from './logger';

const useRegex = '^@use .*\n?$';
const useRegexTest = new RegExp(useRegex, 'm');
const useRegexReplace = new RegExp(`${useRegex}(?![sS]*${useRegex})`, 'gm');

const getOutput = (source, resources, { hoistUseStatements }) => {
  if (hoistUseStatements && useRegexTest.test(source)) {
    return source.replace(
      useRegexReplace,
      imports => `${imports}\n${resources}`,
    );
  }

  return `${resources}\n${source}`;
};

export default function (error, resources, source, options, module, callback) {
  if (error) {
    logger.debug('Resources: **not found**');
    return callback(error);
  }

  const stringifiedResources = Array.isArray(resources) ? resources.join('\n') : resources;
  const output = getOutput(source, stringifiedResources, options);

  logger.debug('Resources: \n', `/* ${module} */ \n`, output);

  return callback(null, output);
}
