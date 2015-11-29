import chalk from 'chalk';

import logger from './logger';

export default function(configFile, resolvedFile) {
  const error = [
    'Could not find file with sass resources in following path:',
    'Config path: ' + chalk.red(configFile),
    'Resolved path: ' + chalk.red(resolvedFile),
    'Make sure this path is correct.',
  ];

  logger.error(...error.map(err => err + '\n'));

  throw new Error('Could not find file with sass resources');
}
