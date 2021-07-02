const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { getOutput } = require('../src/utils/processResources');

const pathToLoader = require.resolve('../lib/loader.js');

/**
 * See: https://github.com/facebook/jest/issues/1909
 * @jest-environment node
 */

function runWebpack(baseConfig, done) {
  const webpackConfig = merge({
    output: {
      path: path.join(__dirname, 'output'),
      libraryTarget: 'commonjs2',
    },
    mode: 'production',
  }, baseConfig);

  webpack(webpackConfig, (webpackErr, stats) => {
    const err = webpackErr
      || (stats.hasErrors() && stats.compilation.errors[0])
      || (stats.hasWarnings() && stats.compilation.warnings[0]);

    done(err || null);
  });
}

function execTest(testId, options) {
  return new Promise((resolve, reject) => {
    const baseConfig = merge({
      entry: path.resolve(__dirname, 'scss', `${testId}.scss`),
      output: {
        filename: `${testId}.js`,
      },
      module: {
        rules: [{
          test: /\.scss$/,
          use: [
            { loader: 'raw-loader' },
            {
              loader: pathToLoader,
              options,
            },
          ],
        }],
      },
    });

    runWebpack(baseConfig, (err) => (err ? reject(err) : resolve()));
  });
}

describe('sass-resources-loader', () => {
  describe('resources', () => {
    it('should parse resource', () => execTest('empty', {
      resources: path.resolve(__dirname, './scss/shared/_variables.scss'),
    }).then(() => {
      // eslint-disable-next-line global-require
      const output = require('./output/empty').default;
      expect(output).toMatchSnapshot();
    }));

    it('should parse array resources', () => execTest('empty2', {
      resources: [
        path.resolve(__dirname, './scss/shared/*.scss'),
      ],
    }).then(() => {
      // eslint-disable-next-line global-require
      const output = require('./output/empty2').default;
      expect(output).toMatchSnapshot();
    }));

    it('should include resources', () => execTest('imports', {
      resources: [
        path.resolve(__dirname, './scss/shared/_imports.scss'),
      ],
    }).then(() => {
      // eslint-disable-next-line global-require
      const output = require('./output/imports').default;
      expect(output).toMatchSnapshot();
    }));

    it('should throw error when no resources provided', (done) => {
      runWebpack({
        entry: path.resolve(__dirname, 'scss', 'empty.scss'),
        module: {
          rules: [{
            test: /\.scss$/,
            use: [
              { loader: 'raw-loader' },
              {
                loader: pathToLoader,
              },
            ],
          }],
        },
      }, (err) => {
        expect(err.message).toMatch(/Can't find sass resources in your config. Make sure loader.options.resources exists/);
        done();
      });
    });

    it('should throw error when resources are empty', (done) => {
      runWebpack({
        entry: path.resolve(__dirname, 'scss', 'empty.scss'),
        module: {
          rules: [{
            test: /\.scss$/,
            use: [
              { loader: 'raw-loader' },
              {
                loader: pathToLoader,
                options: {
                  resources: [],
                },
              },
            ],
          }],
        },
      }, (err) => {
        expect(err.message).toMatch(/Something wrong with provided resources/);
        expect(err.message).toMatch(/Make sure 'options.resources' is String or Array of Strings/);
        done();
      });
    });

    it('should throw error when resources glob did not resolve any files', (done) => {
      const resource = path.resolve(__dirname, 'scss/does-not-exist/*.scss');

      runWebpack({
        entry: path.resolve(__dirname, 'scss', 'empty.scss'),
        module: {
          rules: [{
            test: /\.scss$/,
            use: [
              { loader: 'raw-loader' },
              {
                loader: pathToLoader,
                options: {
                  resources: resource,
                },
              },
            ],
          }],
        },
      }, (err) => {
        expect(err.message).toMatch(`Couldn't find any files with the glob ${resource}.`);
        done();
      });
    });

    it('should throw error when no files were resolved from any resource globs', (done) => {
      const validResource = path.resolve(__dirname, 'scss', 'empty.scss');
      const invalidResource = path.resolve(__dirname, 'scss/does-not-exist/*.scss');

      runWebpack({
        entry: path.resolve(__dirname, 'scss', 'empty.scss'),
        module: {
          rules: [{
            test: /\.scss$/,
            use: [
              { loader: 'raw-loader' },
              {
                loader: pathToLoader,
                options: {
                  resources: [validResource, invalidResource],
                },
              },
            ],
          }],
        },
      }, (err) => {
        expect(err.message).not.toMatch(validResource);
        expect(err.message).toMatch(`Couldn't find any files with the glob ${invalidResource}.`);
        done();
      });
    });
  });

  describe('hoisting', () => {
    it('should hoist entry @use imports when option hoistUseStatements is true', () => execTest('hoist', {
      resources: [
        path.resolve(__dirname, './scss/shared/_variables.scss'),
      ],
      hoistUseStatements: true,
    }).then(() => {
      // eslint-disable-next-line global-require
      const output = require('./output/hoist').default;
      expect(output).toMatchSnapshot();
    }));

    it('should not hoist entry @use imports when option hoistUseStatements is false', () => execTest('hoist2', {
      resources: [
        path.resolve(__dirname, './scss/shared/_variables.scss'),
      ],
      hoistUseStatements: false,
    }).then(() => {
      // eslint-disable-next-line global-require
      const output = require('./output/hoist2').default;
      expect(output).toMatchSnapshot();
    }));

    it('should not hoist entry @use imports when option hoistUseStatements is not passed', () => execTest('hoist3', {
      resources: [
        path.resolve(__dirname, './scss/shared/_variables.scss'),
      ],
    }).then(() => {
      // eslint-disable-next-line global-require
      const output = require('./output/hoist3').default;
      expect(output).toMatchSnapshot();
    }));

    it('should work with multiline @use statements', () => execTest('hoist-multiline', {
      resources: [
        path.resolve(__dirname, './scss/shared/_variables.scss'),
      ],
      hoistUseStatements: true,
    }).then(() => {
      // eslint-disable-next-line global-require
      const output = require('./output/hoist-multiline').default;
      expect(output).toMatchSnapshot();
    }));
  });

  describe('imports', () => {
    it('should not rewrite path for imports with ~', () => {
      // eslint-disable-next-line global-require
      const getNewUsePath = require('../lib/utils/rewritePaths').getRelativeUsePath;
      expect(getNewUsePath('~/bootstrap', '', '')).toMatch('~/bootstrap');
    });

    it('should preserve import method', () => execTest('imports2', {
      resources: [
        path.resolve(__dirname, './scss/shared/_imports.scss'),
      ],
    }).then(() => {
      // eslint-disable-next-line global-require
      const output = require('./output/imports2').default;
      expect(output).toMatchSnapshot();
    }));

    it('should not rewrite the path for built-ins with @use', () => execTest('use-builtin', {
      hoistUseStatements: true,
      resources: [
        path.resolve(__dirname, './scss/shared/_math.scss'),
      ],
    }).then(() => {
      // eslint-disable-next-line global-require
      const output = require('./output/use-builtin').default;
      expect(output).toMatchSnapshot();
    }));

    it('should not rewrite the path for built-ins with @use and double quotes', () => execTest('use-builtin', {
      hoistUseStatements: true,
      resources: [
        path.resolve(__dirname, './scss/shared/_math-double-quotes.scss'),
      ],
    }).then(() => {
      // eslint-disable-next-line global-require
      const output = require('./output/use-builtin').default;
      expect(output).toMatchSnapshot();
    }));
  });

  describe('getOutput', () => {
    it('de-duplicates imports from the source when they\'re present in a resource and `hoiseUseStatements` is enabled', () => {
      const result = getOutput(
        "@use 'sass:math';\n@use 'sass:list';\n@use 'sass:map';\ndiv { padding: $padding; }",
        "@use 'sass:math';\n$padding: 10px;",
        { hoistUseStatements: true },
      );
      expect(result).toBe(
        "@use 'sass:math';\n@use 'sass:list';\n@use 'sass:map';\n\n$padding: 10px;\ndiv { padding: $padding; }",
      );
    });
  });
});
