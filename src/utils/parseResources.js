import glob from 'glob';

import logger from './logger';
import isArrayOfStrings from './isArrayOfStrings';
import flattenArray from './flattenArray';

export default locations => {
  if (typeof locations === 'string') {
    logger.debug('sassResources is String:', true);
    return glob.sync(locations);
  }

  if (isArrayOfStrings(locations)) {
    logger.debug('sassResources is Array of Strings:', true);
    const paths = locations.map(file => glob.sync(file));
    return flattenArray(paths);
  }

  return [];
};
