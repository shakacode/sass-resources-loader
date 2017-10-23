
# sass-resources-loader
[![Build Status](https://travis-ci.org/shakacode/react_on_rails.svg?branch=master)](https://travis-ci.org/shakacode/sass-resources-loader)
[![npm version](https://img.shields.io/npm/v/sass-resources-loader.svg?style=flat-square)](https://www.npmjs.com/package/sass-resources-loader)
[![dependencies status](https://img.shields.io/gemnasium/shakacode/sass-resources-loader.svg?style=flat-square)](https://gemnasium.com/shakacode/sass-resources-loader)
[![license](https://img.shields.io/npm/l/sass-resources-loader.svg?style=flat-square)](https://www.npmjs.com/package/sass-resources-loader)

This loader will `@import` your SASS resources into every `required` SASS module. So you can use your shared variables & mixins across all SASS styles without manually importing them in each file. Made to work with CSS Modules!

Note, this loader is not limited to SASS resources. It supposedly works with less, post-css, etc. per [issue 31](https://github.com/shakacode/sass-resources-loader/issues/31).

-------

If you're using this project and you like it, please give us a star! Thanks!

## Thank you from Justin Gordon and [ShakaCode](http://www.shakacode.com)

* **Video:** [Front-End Sadness to Happiness: The React on Rails Story](https://www.youtube.com/watch?v=SGkTvKRPYrk): History, motivations, philosophy, and overview.
* *[Click here for talk slides](http://www.shakacode.com/talks).*

We at [ShakaCode](http://www.shakacode.com) are a small, boutique, remote-first application development company. We fund this project by:

* Providing priority support and training for anything related to React + Webpack + Rails in our [Coaching Program](http://www.shakacode.com/work/shakacode-coaching-plan.pdf).
* Building custom web and mobile (React Native) applications. We typically work with a technical founder or CTO and instantly provide a full development team including designers.
* Migrating **Angular** + Rails to React + Rails. You can see an example of React on Rails and our work converting Angular to React on Rails at [egghead.io](https://egghead.io/browse/frameworks).
* Augmenting your team to get your product completed more efficiently and quickly.

My article "[Why Hire ShakaCode?](https://blog.shakacode.com/can-shakacode-help-you-4a5b1e5a8a63#.jex6tg9w9)" provides additional details about our projects.

If any of this resonates with you, please email me, [justin@shakacode.com](mailto:justin@shakacode.com). I offer a free half-hour project consultation, on anything from React on Rails to any aspect of web or mobile application development for both consumer and enterprise products.

We are **[currently looking to hire](http://www.shakacode.com/about/#work-with-us)** like-minded developers that wish to work on our projects, including [Friends and Guests](https://www.friendsandguests.com).

I appreciate your attention and sharing of these offerings with anybody that we can help. Your support allows me to bring you and your team [front-end happiness in the Rails world](https://www.youtube.com/watch?v=SGkTvKRPYrk).

Aloha and best wishes from the ShakaCode team!

# ShakaCode Community
Please [Subscribe](https://app.mailerlite.com/webforms/landing/l1d9x5) to keep in touch with Justin Gordon and [ShakaCode](http://www.shakacode.com/). I intend to send a monthly summary including announcements of new releases of bootstrap-loader and React on Rails and of our latest [blog articles](https://blog.shakacode.com) and tutorials. Subscribers will also have access to **exclusive content**, including tips and examples.

[![2017-01-31_14-16-56](https://cloud.githubusercontent.com/assets/1118459/22490211/f7a70418-e7bf-11e6-9bef-b3ccd715dbf8.png)](https://app.mailerlite.com/webforms/landing/l1d9x5)

* **Slack Room**: [Contact us](mailto:contact@shakacode.com) for an invite to the ShakaCode Slack room!
* **[forum.shakacode.com](https://forum.shakacode.com)**: Post your questions
* **[@ShakaCode on Twitter](https://twitter.com/shakacode)**

## React on Rails Info
**[React on Rails](https://github.com/shakacode/react_on_rails)** is ShakaCode's flagship product. We want to make sure you're aware of it!

### Testimonials
From Joel Hooks, Co-Founder, Chief Nerd at [egghead.io](https://egghead.io/), January 30, 2017:
![2017-01-30_11-33-59](https://cloud.githubusercontent.com/assets/1118459/22443635/b3549fb4-e6e3-11e6-8ea2-6f589dc93ed3.png)

For more testimonials, see [Live Projects](https://github.com/shakacode/react_on_rails/blob/master/PROJECTS.md) and [Kudos](https://github.com/shakacode/react_on_rails/blob/master/KUDOS.md).

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

**NB!**
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

## Contributing
This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](CODE_OF_CONDUCT.md).

See [Contributing](CONTRIBUTING.md) to get started.

## License
MIT.

## Example and Related Libraries

* [react-webpack-rails-tutorial](https://github.com/shakacode/react-webpack-rails-tutorial/), live example at [www.reactrails.com](http://www.reactrails.com/).
* [bootstrap-loader](https://github.com/shakacode/bootstrap-loader/)

*Identical to top of page*

## Thank you from Justin Gordon and [ShakaCode](http://www.shakacode.com)

* **Video:** [Front-End Sadness to Happiness: The React on Rails Story](https://www.youtube.com/watch?v=SGkTvKRPYrk): History, motivations, philosophy, and overview.
* *[Click here for talk slides](http://www.shakacode.com/talks).*

We at [ShakaCode](http://www.shakacode.com) are a small, boutique, remote-first application development company. We fund this project by:

* Providing priority support and training for anything related to React + Webpack + Rails in our [Coaching Program](http://www.shakacode.com/work/shakacode-coaching-plan.pdf).
* Building custom web and mobile (React Native) applications. We typically work with a technical founder or CTO and instantly provide a full development team including designers.
* Migrating **Angular** + Rails to React + Rails. You can see an example of React on Rails and our work converting Angular to React on Rails at [egghead.io](https://egghead.io/browse/frameworks).
* Augmenting your team to get your product completed more efficiently and quickly.

My article "[Why Hire ShakaCode?](https://blog.shakacode.com/can-shakacode-help-you-4a5b1e5a8a63#.jex6tg9w9)" provides additional details about our projects.

If any of this resonates with you, please email me, [justin@shakacode.com](mailto:justin@shakacode.com). I offer a free half-hour project consultation, on anything from React on Rails to any aspect of web or mobile application development for both consumer and enterprise products.

We are **[currently looking to hire](http://www.shakacode.com/about/#work-with-us)** like-minded developers that wish to work on our projects, including [Friends and Guests](https://www.friendsandguests.com).

I appreciate your attention and sharing of these offerings with anybody that we can help. Your support allows me to bring you and your team [front-end happiness in the Rails world](https://www.youtube.com/watch?v=SGkTvKRPYrk).

Aloha and best wishes from the ShakaCode team!
