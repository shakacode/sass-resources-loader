import path from 'path';

import logger from './logger';

const useRegexp = /@(import|use)\s+(?:'([^']+)'|"([^"]+)"|([^\s;]+))/g;

export const getRelativeUsePath = (oldUsePath, absoluteUsePath, moduleContext) => {
  // from node_modules
  if ((/^~/).test(oldUsePath)) {
    return oldUsePath;
  }
  return path.relative(moduleContext, absoluteUsePath);
};

export default function rewritePaths(error, file, contents, moduleContext, callback) {
  if (error) {
    logger.debug('Resources: **not found**');
    return callback(error);
  }

  if (!/\.s[ac]ss$/i.test(file)) {
    return callback(null, contents);
  }

  const rewritten = contents.replace(useRegexp, (entire, importer, single, double, unquoted) => {
    // Don't rewrite imports from built-ins
    if ([single, double].some(match => match && match.indexOf('sass:') === 0)) {
      return entire;
    }

    const oldUsePath = single || double || unquoted;

    const absoluteUsePath = path.join(path.dirname(file), oldUsePath);
    const relUsePath = getRelativeUsePath(oldUsePath, absoluteUsePath, moduleContext);
    const newUsePath = relUsePath.split(path.sep).join('/');
    logger.debug(`Resources: @${importer} of ${oldUsePath} changed to ${newUsePath}`);

    const lastCharacter = entire[entire.length - 1];
    const quote = lastCharacter === "'" || lastCharacter === '"' ? lastCharacter : '';

    return `@${importer} ${quote}${newUsePath}${quote}`;
  });

  callback(null, rewritten);

  return undefined;
}
