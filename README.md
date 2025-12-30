# sass-resources-loader
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/shakacode/sass-resources-loader/Node.js%20CI)
[![npm version](https://img.shields.io/npm/v/sass-resources-loader.svg?style=flat-square)](https://www.npmjs.com/package/sass-resources-loader)
[![license](https://img.shields.io/npm/l/sass-resources-loader.svg?style=flat-square)](https://www.npmjs.com/package/sass-resources-loader)

This loader will load your Sass resources into every `required` Sass module. So you can use your shared variables, mixins and functions across all Sass styles without manually loading them in each file.

This project is sponsored by the software consulting firm [ShakaCode](https://www.shakacode.com), creator of the [React on Rails Gem](https://github.com/shakacode/react_on_rails). 

### ShakaCode Support

[ShakaCode](https://www.shakacode.com) focuses on helping Ruby on Rails teams use React and Webpack better. We can upgrade your project and improve your development and customer experiences, allowing you to focus on building new features or fixing bugs instead. 

For an overview of working with us, see our [Client Engagement Model](https://www.shakacode.com/blog/client-engagement-model/) article and [how we bill for time](https://www.shakacode.com/blog/shortcut-jira-trello-github-toggl-time-and-task-tracking/).

We also specialize in helping development teams lower infrastructure and CI costs. Check out our project [Control Plane Flow](https://github.com/shakacode/control-plane-flow/), which can allow you to get the ease of Heroku with the power of Kubernetes and big cost savings.

If you think ShakaCode can help your project, [click here](https://meetings.hubspot.com/justingordon/30-minute-consultation) to book a call with [Justin Gordon](mailto:justin@shakacode.com), the creator of React on Rails and Shakapacker.

Here's a testimonial of how ShakaCode can help from [Florian Gößler](https://github.com/FGoessler) of [Blinkist](https://www.blinkist.com/), January 2, 2023:
> Hey Justin 👋
>
> I just wanted to let you know that we today shipped the webpacker to shakapacker upgrades and it all seems to be running smoothly! Thanks again for all your support and your teams work! 😍
>
> On top of your work, it was now also very easy for me to upgrade Tailwind and include our external node_module based web component library which we were using for our other (more modern) apps already. That work is going to be shipped later this week though as we are polishing the last bits of it. 😉
>
> Have a great 2023 and maybe we get to work together again later in the year! 🙌

Read the [full review here](https://clutch.co/profile/shakacode#reviews?sort_by=date_DESC#review-2118154).

---

# Features
* Made to work with CSS Modules!
* This loader is not limited to Sass resources. It supposedly works with less, post-css, etc. per [issue 31](https://github.com/shakacode/sass-resources-loader/issues/31).
* Supports **Webpack 5**
* Supports Sass `@use` syntax. You must use Dart Sass (`sass`, not `node-sass` npm package). See the `hoistUseStatements` option.

---------------

## Installation

Get it via npm:

```bash
npm install sass-resources-loader
```

## Usage

Create your file (or files) with resources, which are snippets of Sass that you want available to places like CSS modules Sass:

```scss
/* resources.scss */

$section-width: 700px;

@mixin section-mixin {
  margin: 0 auto;
  width: $section-width;
}
```

## Options

| Name                 | Type                 | Default     | Description                                                                                                                  |
|----------------------|----------------------|-------------|------------------------------------------------------------------------------------------------------------------------------|
| `resources`          | `{String\|String[]}` | `undefined` | Resources to include in files                                                                                                |
| `hoistUseStatements` | `{Boolean}`          | `false`     | If `true`, entry file `@use` imports will be hoisted. This means that `@use` statements will go above the inclusion of resources. |

### Option Examples

#### `resources`
Specify resources, contents of which will be prepended to each file.

For example, if variable `$my-variable: #fff` is in file `example/a.scss`, specify this file as a resource in your `webpack.config.js`
```js
{
    loader: 'sass-resources-loader',
    options: {
        resources: 'example/a.scss'
    }
}
````

to prepend this variable
```scss
// Entry file

$my-variable: #fff;

// Entry file's content go here
```

#### `hoistUseStatements`
Tells the compiler if an existing `@use` statement is found in entry file, it should be hoisted to the top.
The reason is that `@use` must go before most other declarations, except variable declarations, per the [docs](https://sass-lang.com/documentation/at-rules/use).

If our entry file has the following content
```scss
// Entry file
@use 'my/definitions/file';
@use 'my/other/definitions/file';

// Entry file's contents go here
```
and our resource file contains this
```scss
$my-variable: #fff;

@mixin some-mixin {
    color: #000;
}
```
then the output, with `hoistUseStatements` set to `true`, would be the following.
Note that the `@use` statements are above the inclusion of resources.
```scss
// Entry file
@use 'my/definitions/file';
@use 'my/other/definitions/file';

// Resources
$my-variable: #fff;

@mixin some-mixin {
    color: #000;
}

// Rest of entry file's content goes here
```

You can also use this multi-line syntax:
```scss
@use 'config' with (
    $text-color: #FAFAFA
);
```

See [./test/scss/hoist-multiline.scss](./test/scss/hoist-multiline.scss) for an example.

As mentioned in the [docs for Sass @use](https://sass-lang.com/documentation/at-rules/use), you don't need to hoist if your "resources" _only_ contains variable definitions.

If you get the error:
```
SassError: @use rules must be written before any other rules.
```

then you need to use the `hoistUseStatements: true` option.

## Tips
* Do not include anything that will be actually rendered in CSS, because it will be added to every imported Sass file.
* Avoid using Sass import rules inside resources files as it slows down incremental builds. Add imported files directly in `sassResources` array in webpack config instead. If you concerned about location of your resources index, you might want to check out the solution outlined in [this comment](https://github.com/shakacode/sass-resources-loader/issues/46#issuecomment-335211284).
* If you still want to use Sass import rules make sure your paths are relative to the file they defined in (basically, your file with resources), except the ones started with `~` (`~` is resolved to `node_modules` folder).

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
            resources: [
              './path/to/vars.scss',
              './path/to/mixins.scss',
              './path/to/functions.scss'
            ]
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

Now you can use these resources without manually loading them:

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
You can specify glob patterns to match all of your files in the same directory.
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

If you are using vue-cli@3, you need to create a `vue.config.js` file in your project root (next to `package.json`). Then, add the following code:

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
          resources: ['./path/to/vars.scss', './path/to/mixins.scss', './path/to/functions.scss']
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

## Supporters

<a href="https://jb.gg/OpenSource" style="margin-right: 20px;">
  <img src="https://resources.jetbrains.com/storage/products/company/brand/logos/jetbrains.png" alt="JetBrains" height="120px">
</a>
<a href="https://scoutapp.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/4244251/184881147-0d077438-3978-40da-ace9-4f650d2efe2e.png">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/4244251/184881152-9f2d8fba-88ac-4ba6-873b-22387f8711c5.png">
    <img alt="ScoutAPM" src="https://user-images.githubusercontent.com/4244251/184881152-9f2d8fba-88ac-4ba6-873b-22387f8711c5.png" height="120px">
  </picture>
</a>
<a href="https://shakacode.controlplane.com">
  <picture>
    <img alt="Control Plane" src="https://github.com/shakacode/.github/assets/20628911/90babd87-62c4-4de3-baa4-3d78ef4bec25" height="120px">
  </picture>
</a>
<br />
<a href="https://www.browserstack.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/4244251/184881122-407dcc29-df78-4b20-a9ad-f597b56f6cdb.png">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/4244251/184881129-e1edf4b7-3ae1-4ea8-9e6d-3595cf01609e.png">
    <img alt="BrowserStack" src="https://user-images.githubusercontent.com/4244251/184881129-e1edf4b7-3ae1-4ea8-9e6d-3595cf01609e.png" height="55px">
  </picture>
</a>
<a href="https://www.honeybadger.io">
  <img src="https://user-images.githubusercontent.com/4244251/184881133-79ee9c3c-8165-4852-958e-31687b9536f4.png" alt="Honeybadger" height="55px">
</a>
<a href="https://reviewable.io">
  <img src="https://user-images.githubusercontent.com/20628911/230848305-c94510a4-82d7-468f-bf9f-eeb81d3f2ce0.png" alt="Reviewable" height="55px">
</a>

<br />
<br />

The following companies support our open source projects, and ShakaCode uses their products!
