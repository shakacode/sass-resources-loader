# Change Log
## [Unreleased]
_For commits on master, but not yet pushed to NPM._
* Update dependencies [#163](https://github.com/shakacode/sass-resources-loader/pull/163) by [Eugene Mikhaylov](https://github.com/LewWadoo):
  - async to v3.2.4;
  - glob to v8.0.3.

* Update README.md [#169](https://github.com/shakacode/sass-resources-loader/commit/167a90660e473da0b1dc8ab5f783dc8780f1cd49) by [Eugene Mikhaylov](https://github.com/LewWadoo).
* Update CONTRIBUTING.md [#170](https://github.com/shakacode/sass-resources-loader/commit/363d6ec3261fe8cbdf8a2ac3e1213c0088e1bcf9) by [Eugene Mikhaylov](https://github.com/LewWadoo).

## [2.2.5] - 2022-04-14
* Update async to v3.2.3. [#154](https://github.com/shakacode/sass-resources-loader/pull/154) by [Ian Hutchinson](https://github.com/ian-hutchinson).

## [2.2.4] - 2021-08-05
* Support double quoted imports of built-ins. [#145](https://github.com/shakacode/sass-resources-loader/pull/147) by [Jan Amann](https://github.com/amannn).

## [2.2.3] - 2021-06-21
* Fix regression introduced in 2.2.2 for "causes TypeError: Cannot read property 'indexOf' of undefined". [#145](https://github.com/shakacode/sass-resources-loader/pull/145) by [Juan Antonio Gómez](https://github.com/shokmaster).

## [2.2.2] - 2021-06-16
* De-duplicate hoisted imports and avoid rewriting imports of built-ins. [#142](https://github.com/shakacode/sass-resources-loader/pull/142) by [Jan Amann](https://github.com/amannn).

## [2.2.1] - 2021-04-14
* Support multi-line imports with @use syntax. Fixes: [#135](https://github.com/shakacode/sass-resources-loader/issues/135). [#140](https://github.com/shakacode/sass-resources-loader/pull/140) by [Toms Burgmanis](https://github.com/tomburgs).

## [2.2.0] - 2020-09-19
* Add verbose error message when any of the specified resource globs don't return any files. Fixes: [#38](https://github.com/shakacode/sass-resources-loader/issues/38). [#134](https://github.com/shakacode/sass-resources-loader/pull/134) by [Toms Burgmanis](https://github.com/tomburgs).

## [2.1.1] - 2020-09-19
* Package cleanup: reduce published files and dependencies (#126, #127) [#128](https://github.com/shakacode/sass-resources-loader/pull/128) by [Thibaud Colas](https://github.com/thibaudcolas).

## [2.1.0] - 2020-07-22
* Supports the new Sass module system released with Dart Sass 1.23.0. The use of @use is recommended instead of @import. [#117](https://github.com/shakacode/sass-resources-loader/pull/117) by [Toms Burgmanis](https://github.com/tomburgs).

## [2.0.3] - 2020-04-13
* Dependency updates

## [2.0.2] - 2020-04-12
* Dependency updates

## [2.0.1] - 2019-05-25
* Dependency updates

## [2.0.0] - 2018-11-06
* Puts back in reverted changes from 1.3.4, support for Webpack v4 and no support for Webpack v1. [#66](https://github.com/shakacode/sass-resources-loader/pull/66) by [david-ogalego](https://github.com/david-ogalego).

## [1.3.5] - 2018-11-05
* Reverts commit for 1.3.4 to avoid breaking change users of webpack v1. [#81](https://github.com/shakacode/sass-resources-loader/pull/81) by [justin808](https://github.com/justin808).

## [1.3.4] - 2018-10-14
* Supports Webpack 4 and removed support for Webpack v1.

## [1.3.3] - 2017-07-15
* Added support for `@import` rules in resource files [#34](https://github.com/shakacode/sass-resources-loader/pull/34) by [coditect](https://github.com/coditect)

## [1.3.0]

## [1.2.0]

## [1.1.0]
#### Added
* Added glob pattern matching for resources files [#10](https://github.com/shakacode/sass-resources-loader/issues/10) by [rtivital](https://github.com/rtivital).

For other releases see [GitHub Releases section](https://github.com/shakacode/sass-resources-loader/releases).

[Unreleased]: https://github.com/shakacode/sass-resources-loader/compare/v2.2.5...master
[2.2.5]: https://github.com/shakacode/sass-resources-loader/compare/v2.2.4...v2.2.5
[2.2.4]: https://github.com/shakacode/sass-resources-loader/compare/v2.2.3...v2.2.4
[2.2.3]: https://github.com/shakacode/sass-resources-loader/compare/v2.2.2...v2.2.3
[2.2.2]: https://github.com/shakacode/sass-resources-loader/compare/v2.2.1...v2.2.2
[2.2.1]: https://github.com/shakacode/sass-resources-loader/compare/v2.2.0...v2.2.1
[2.2.0]: https://github.com/shakacode/sass-resources-loader/compare/v2.1.1...v2.2.0
[2.1.1]: https://github.com/shakacode/sass-resources-loader/compare/v2.0.3...v2.1.1
[2.1.0]: https://github.com/shakacode/sass-resources-loader/compare/v2.0.3...v2.1.0
[2.0.3]: https://github.com/shakacode/sass-resources-loader/compare/v2.0.2...v2.0.3
[2.0.2]: https://github.com/shakacode/sass-resources-loader/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/shakacode/sass-resources-loader/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/shakacode/sass-resources-loader/compare/v1.3.5...v2.0.0
[1.3.5]: https://github.com/shakacode/sass-resources-loader/compare/v1.3.4...v1.3.5
[1.3.4]: https://github.com/shakacode/sass-resources-loader/compare/v1.3.3...v1.3.4
[1.3.3]: https://github.com/shakacode/sass-resources-loader/compare/v1.3.0...v1.3.3
[1.3.0]: https://github.com/shakacode/sass-resources-loader/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/shakacode/sass-resources-loader/compare/1.1.0...v1.2.0
[1.1.0]: https://github.com/shakacode/sass-resources-loader/compare/1.0.2...1.1.0
