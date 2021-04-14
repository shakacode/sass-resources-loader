import logger from './logger';

// Matches opening and closing parenthesis across multiple lines
const multilineParenthesisRegex = '\\([\\s\\S]*?\\);?';
// Finds any @use statement
const useRegex = `^@use \\S*(?: with ${multilineParenthesisRegex}|.*)?\n?$`;
// Same as above, but adds the m (multiline) flag
const useRegexTest = new RegExp(useRegex, 'm');
// Makes sure that only the last instance of `useRegex` variable is found
const useRegexReplace = new RegExp(`${useRegex}(?![\\s\\S]*${useRegex})`, 'gm');

const getOutput = (source, resources, { hoistUseStatements }) => {
  if (hoistUseStatements && useRegexTest.test(source)) {
    return source.replace(
      useRegexReplace,
      useStatements => `${useStatements}\n${resources}`,
    );
  }

  return `${resources}\n${source}`;
};

export default function processResources(error, resources, source, options, module, callback) {
  if (error) {
    logger.debug('Resources: **not found**');
    return callback(error);
  }

  const stringifiedResources = Array.isArray(resources) ? resources.join('\n') : resources;
  const output = getOutput(source, stringifiedResources, options);

  logger.debug('Resources: \n', `/* ${module} */ \n`, output);

  return callback(null, output);
}
