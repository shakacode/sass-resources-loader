# sass-resources-loader
[![Build Status](https://travis-ci.org/shakacode/react_on_rails.svg?branch=master)](https://travis-ci.org/shakacode/sass-resources-loader)
[![npm version](https://img.shields.io/npm/v/sass-resources-loader.svg?style=flat-square)](https://www.npmjs.com/package/sass-resources-loader)
[![dependencies status](https://img.shields.io/gemnasium/shakacode/sass-resources-loader.svg?style=flat-square)](https://gemnasium.com/shakacode/sass-resources-loader)
[![license](https://img.shields.io/npm/l/sass-resources-loader.svg?style=flat-square)](https://www.npmjs.com/package/sass-resources-loader)

This loader will `@import` your SASS resources into every `required` SASS module. So you can use your shared variables & mixins across all SASS styles without manually importing them in each file. Made to work with CSS Modules!

Note, this loader is not limited to SASS resources. It supposedly works with less, post-css, etc. per [issue 31](https://github.com/shakacode/sass-resources-loader/issues/31).

### Supports **Webpack 4**.

# ShakaCode Community
* Please [Subscribe](https://app.mailerlite.com/webforms/landing/l1d9x5) to keep in touch with Justin Gordon and [ShakaCode](http://www.shakacode.com/). Subscribers will also have access to **exclusive content**, including tips and examples.
* **Slack Room**: [Contact us](mailto:contact@shakacode.com) for an invite to the ShakaCode Slack room!
* **[forum.shakacode.com](https://forum.shakacode.com)**: Post your questions

---------------

## Installation

Get it via npm:

```bash
npm install sass-resources-loader
```

## Usage

Create your file (or files) with resources:

```scss
/* resources.scss */

$section-width: 700px;

@mixin section-mixin {
  margin: 0 auto;
  width: $section-width;
}
```

## Tips
* Do not include anything that will be actually rendered in CSS, because it will be added to every imported SASS file.
* Avoid using SASS `@import` rules inside resources files as it slows down incremental builds. Add imported files directly in `sassResources` array in webpack config instead. If you concerned about location of your resources index, you might want to check out the solution outlined in [this comment](https://github.com/shakacode/sass-resources-loader/issues/46#issuecomment-335211284).
* If you still want to use SASS `@imports` make sure your paths are relative to the file they defined in (basically, your file with resources), except the ones started with `~` (`~` is resolved to `node_modules` folder).

Apply loader in webpack config (`v1.x.x` & `v2.x.x` are supported) and provide path to the file with resources:

```js
/* Webpack@2: webpack.config.js */

module: {
  rules: [
    // Apply loader
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        'sass-loader',
        {
          loader: 'sass-resources-loader',
          options: {
            // Provide path to the file with resources
            resources: './path/to/resources.scss',

            // Or array of paths
            resources: ['./path/to/vars.scss', './path/to/mixins.scss']
          },
        },
      ],
    },
  ],
},

/* Webpack@1: webpack.config.js */

module: {
  loaders: [
    // Apply loader
    { test: /\.scss$/, loader: 'style!css!sass!sass-resources' },
  ],
},

// Provide path to the file with resources
sassResources: './path/to/resources.scss',

// Or array of paths
sassResources: ['./path/to/vars.scss', './path/to/mixins.scss'],
```

> NOTE: If `webpackConfig.context` is not defined, `process.cwd()` will be used to resolve files with resource.

Now you can use these resources without manually importing them:

```scss
/* component.scss */

.section {
  @include section-mixin; // <--- `section-mixin` is defined here
}
```

```js
import React from 'react';
import css from './component.scss';

// ...

render() {
  return (
    <div className={css.section} />
  );
}
```

### Glob pattern matching
You can specify glob patterns to match your all of your files in the same directory.
```js
// Specify a single path
resources: './path/to/resources/**/*.scss', // will match all files in folder and subdirectories
// or an array of paths
resources: [ './path/to/resources/**/*.scss', './path/to/another/**/*.scss' ]
```

Note that `sass-resources-loader` will resolve your files in order. If you want your variables to be accessed across all of your mixins you should specify them in first place.
```js
resources: [ './path/to/variables/vars.scss', './path/to/mixins/**/*.scss' ]
```

## Examples and Related Libraries

* [react-webpack-rails-tutorial](https://github.com/shakacode/react-webpack-rails-tutorial/), live example at [www.reactrails.com](http://www.reactrails.com/).
* [bootstrap-loader](https://github.com/shakacode/bootstrap-loader/)

### Example of Webpack 4 Config for Vue

```
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'vue-style-loader' },
          { loader: 'css-loader', options: { sourceMap: true } },
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'vue-style-loader' },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
          { loader: 'sass-resources-loader',
            options: {
              sourceMap: true,
              resources: [
                resolveFromRootDir('src/styles/variables.scss'),
              ]
            }
          }
        ]
      }
    ]
  }
  ```


### VueJS webpack template(vue-cli@2)

If you wish to use this loader in the [VueJS Webpack template](https://github.com/vuejs-templates/webpack) you need to add the following code in ````build/utils.js```` after line 42 :

```js
if (loader === 'sass') {
  loaders.push({
    loader: 'sass-resources-loader',
    options: {
      resources: 'path/to/your/file.scss',
    },
  });
}
```

### VueJS webpack template(vue-cli@3)

If you are using vue-cli@3, you need create a `vue.config.js` file in your project root(next to package.json). Then, add the following code :

```js
// vue.config.js
module.exports = {
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Provide path to the file with resources
          resources: './path/to/resources.scss',

          // Or array of paths
          resources: ['./path/to/vars.scss', './path/to/mixins.scss']
        })
        .end()
    })
  }
}
```

## Contributing
This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](CODE_OF_CONDUCT.md).

See [Contributing](CONTRIBUTING.md) to get started.

## License
_sass-resources-loader_ is available under MIT. See [LICENSE](LICENSE) for more details.
