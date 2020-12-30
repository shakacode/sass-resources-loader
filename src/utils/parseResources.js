import glob from 'glob';

import logger from './logger';
import isArrayOfStrings from './isArrayOfStrings';
import flattenArray from './flattenArray';

const getGlobPaths = (path) => {
  const files = glob.sync(path);

  if (files.length === 0) {
    throw new Error(`
      Couldn't find any files with the glob ${path}.
      Did you forget to resolve this to an absolute path with path.resolve?
    `);
  }

  return files;
};

export default locations => {
  if (typeof locations === 'string') {
    logger.debug('options.resources is String:', true);
    return getGlobPaths(locations);
  }

  if (isArrayOfStrings(locations)) {
    logger.debug('options.resources is Array of Strings:', true);
    const paths = locations.map(path => getGlobPaths(path));
    return flattenArray(paths);
  }

  return [];
};
