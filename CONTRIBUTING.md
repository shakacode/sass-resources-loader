# Contributing
This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](CODE_OF_CONDUCT.md).

## Reporting Issues and Asking Questions
Before opening an issue, please search the [issue tracker](https://github.com/shakacode/sass-resources-loader/issues) to make sure your issue hasn't already been reported.

## Development
Fork, then clone the repo:

```
git clone https://github.com/your-username/sass-resources-loader.git
```

To start development simply run:

```
npm start
```

It will run linters, clear directory with previous build, create new build and run watchers to re-build on every change.

To develop your local version of module and use it in local test project use `npm-link`:

```
cd path/to/local/sass-resources-loader
npm link

cd path/to/test-project
npm link sass-resources-loader
```

It will create symlinks to your local `sass-resources-loader`, thus you don't have to reinstall it on every change.

### Build
To create a build run:

```
npm run prerelease
```

It will do the same things as `npm start`, but without activating watchers.

### Linting and Testing
To lint your code run:

```
npm run lint
```

Shame on us, but we don't have any tests here yet. We will be happy, if you can give us a hand with it.

## Example
`sass-resources-loader` comes with [example](example) to demonstrate how to implement it.

## New Features
Please open an issue with a proposal for a new feature or refactoring before starting on the work. We don't want you to waste your efforts on a pull request that we won't want to accept.

## Style
[Shakacode](https://github.com/shakacode) is trying to keep a standard style across its various projects, which can be found over in [eslint-config-shakacode](https://github.com/shakacode/style-guide-javascript). If you have a style change proposal, it should first be proposed there. If accepted, we will be happy to accept a PR to implement it here.

## Submitting Changes
* Open a new issue in the [issue tracker](https://github.com/shakacode/sass-resources-loader/issues).
* Fork the repo.
* Create a new feature branch based off the master branch.
* Make sure there are no linting errors and all tests pass (if any).
* Submit a pull request, referencing any issues it addresses.

Please try to keep your pull request focused in scope and avoid including unrelated commits.

After you have submitted your pull request, we'll try to get back to you as soon as possible. We may suggest some changes or improvements.

Thank you for contributing!
