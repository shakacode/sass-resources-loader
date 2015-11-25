/* eslint no-console: 0 */

import chalk from 'chalk';

export default {

  log(...output) {
    const pettyOutput = (
      [chalk.yellow('[sass-resources-loader]: ')].concat(output, '\n')
    );
    console.log(...pettyOutput);
  },

  debug(...output) {
    if (__DEBUG__) this.log(...output);
  },

  error(...output) {
    const errorOutput = (
      [chalk.red('[sass-resources-loader]: ')].concat(output, '\n')
    );
    console.log(...errorOutput);
  },

};
