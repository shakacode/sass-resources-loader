import path from 'path';

import logger from './logger';

const importRegexp = /@import\s+(?:'([^']+)'|"([^"]+)"|([^\s;]+))/g;

export const getNewImportPath = (oldImportPath, absoluteImportPath, moduleContext) => {
  // from node_modules
  if ((/^\~/).test(oldImportPath)) {
    return oldImportPath;
  }
  return path.relative(moduleContext, absoluteImportPath);
};

export default (error, file, contents, moduleContext, callback) => {
  if (error) {
    logger.debug('Resources: **not found**');
    return callback(error);
  }

  if (!/\.s[ac]ss$/i.test(file)) {
    return callback(null, contents);
  }


  const rewritten = contents.replace(importRegexp, (entire, single, double, unquoted) => {
    const oldImportPath = single || double || unquoted;

    const absoluteImportPath = path.join(path.dirname(file), oldImportPath);
    const newImportPath = getNewImportPath(oldImportPath, absoluteImportPath, moduleContext);
    logger.debug(`Resources: @import of ${oldImportPath} changed to ${newImportPath}`);

    const lastCharacter = entire[entire.length - 1];
    const quote = lastCharacter === "'" || lastCharacter === '"' ? lastCharacter : '';

    return `@import ${quote}${newImportPath}${quote}`;
  });

  callback(null, rewritten);
};
