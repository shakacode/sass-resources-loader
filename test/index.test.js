const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const pathToLoader = require.resolve('../lib/loader.js');

function runWebpack(baseConfig, done) {
  const webpackConfig = merge({
    output: {
      path: path.join(__dirname, 'output'),
      libraryTarget: 'commonjs2',
    },
  }, baseConfig);

  webpack(webpackConfig, (webpackErr, stats) => {
    const err = webpackErr ||
    (stats.hasErrors() && stats.compilation.errors[0]) ||
    (stats.hasWarnings() && stats.compilation.warnings[0]);

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

    runWebpack(baseConfig, (err) => err ? reject(err) : resolve());
  });
}

describe(`sass-resources-loader`, () => {
  describe('resources', () => {
    it('should parse resource', () => execTest('empty', {
      resources: path.resolve(__dirname, './scss/*.scss'),
    }).then(() => {
      const output = require('./output/empty');
      expect(output).toMatchSnapshot();
    }));

    it('should parse array resources', () => execTest('empty2', {
      resources: [
        path.resolve(__dirname, './scss/*.scss'),
      ],
    }).then(() => {
      const output = require('./output/empty2');
      expect(output).toMatchSnapshot();
    }));

    it('should include resources', () => execTest('imports', {
      resources: [
        path.resolve(__dirname, './scss/variables/*.scss'),
      ],
    }).then(() => {
      const output = require('./output/imports');
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
        expect(err.message).toMatch(/Can\'t find sass resources in your config. Make sure loader.options.resources/);
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
        expect(err.message).toMatch(/Make sure \'options.resources\' is String or Array of Strings/);
        done();
      });
    });
  });

  describe('imports', () => {
    it('should not rewrite path for imports with ~', () => {
      const getNewImportPath = require('../lib/utils/rewriteImports').getRelativeImportPath;
      expect(getNewImportPath('~/bootstrap', '', '')).toMatch('~/bootstrap');
    });
  });
});
