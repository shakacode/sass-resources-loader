import glob from 'glob';

import logger from './logger';
import isArrayOfStrings from './isArrayOfStrings';
import flattenArray from './flattenArray';

const getGlobPaths = (pattern) => {
  const files = glob.sync(pattern);

  if (files.length === 0) {
    throw new Error(`
      Couldn't find any files with the glob ${pattern}.
      Did you forget to resolve this to an absolute path with path.resolve?
    `);
  }

  return files;
};

export default patterns => {
  if (typeof patterns === 'string') {
    logger.debug('options.resources is String:', true);
    return getGlobPaths(patterns);
  }

  if (isArrayOfStrings(patterns)) {
    logger.debug('options.resources is Array of Strings:', true);
    const paths = patterns.map(pattern => getGlobPaths(pattern));
    return flattenArray(paths);
  }

  return [];
};
