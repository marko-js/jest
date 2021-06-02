# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [4.0.0](https://github.com/marko-js/jest/compare/v3.2.3...v4.0.0) (2021-06-02)


### ⚠ BREAKING CHANGES

* drop support for using @marko/jest as a preset which was deprecated (use @marko/preset/browser or @marko/preset/node)
* drop support node 12
* drop support for using @marko/jest as a preset which was deprecated (use @marko/preset/browser or @marko/preset/node)
* drop support node 12

### Features

* add support for jest 27 ([44f1213](https://github.com/marko-js/jest/commit/44f12136c17705cc8966b6ad70f986821d204582))


* Merge pull request #13 from marko-js/modernize ([24130fe](https://github.com/marko-js/jest/commit/24130fe3e553e6c7d63960c14ece6695c1f4989b)), closes [#13](https://github.com/marko-js/jest/issues/13)

### [3.2.3](https://github.com/marko-js/jest/compare/v3.2.2...v3.2.3) (2021-01-21)


### Bug Fixes

* issue with unhandled marko deps ([1bb9a42](https://github.com/marko-js/jest/commit/1bb9a42))

### [3.2.2](https://github.com/marko-js/jest/compare/v3.2.1...v3.2.2) (2020-12-16)


### Bug Fixes

* issue with resolving marko files in tag defs ([fa59cb1](https://github.com/marko-js/jest/commit/fa59cb1))

### [3.2.1](https://github.com/marko-js/jest/compare/v3.2.0...v3.2.1) (2020-08-18)


### Bug Fixes

* prefer cjs output in Marko 5 ([44cd2fd](https://github.com/marko-js/jest/commit/44cd2fd))

## [3.2.0](https://github.com/marko-js/jest/compare/v3.1.1...v3.2.0) (2020-07-30)


### Features

* add Marko 5 as supported peerDependency ([0471e88](https://github.com/marko-js/jest/commit/0471e88))

### [3.1.1](https://github.com/marko-js/jest/compare/v3.1.0...v3.1.1) (2020-06-04)


### Bug Fixes

* update deps regexp to exclude lasso style deps ([55b6786](https://github.com/marko-js/jest/commit/55b6786))

## [3.1.0](https://github.com/marko-js/jest/compare/v3.0.0...v3.1.0) (2020-05-13)


### Features

* add support for jest 26, log warnings with legacy configs ([46ef443](https://github.com/marko-js/jest/commit/46ef443))

## [3.0.0](https://github.com/marko-js/jest/compare/v2.2.1...v3.0.0) (2020-05-12)


### ⚠ BREAKING CHANGES

* Previously this plugin would never include browser dependencies including  files.

### Features

* includes browser deps if supported transform enabled ([01db282](https://github.com/marko-js/jest/commit/01db282))

### [2.2.1](https://github.com/marko-js/jest/compare/v2.2.0...v2.2.1) (2020-04-10)


### Bug Fixes

* simplify transformIgnorePatterns & ensure .marko files get transformed ([#4](https://github.com/marko-js/jest/issues/4)) ([993b466](https://github.com/marko-js/jest/commit/993b466))

## [2.2.0](https://github.com/marko-js/jest/compare/v2.1.0...v2.2.0) (2020-03-11)


### Features

* add Marko 5 support ([2c3fe61](https://github.com/marko-js/jest/commit/2c3fe61))

## [2.1.0](https://github.com/marko-js/jest/compare/v2.0.1...v2.1.0) (2019-10-24)


### Features

* add support for Marko 3 ([8c7f5e6](https://github.com/marko-js/jest/commit/8c7f5e6))

### [2.0.1](https://github.com/marko-js/jest/compare/v2.0.0...v2.0.1) (2019-08-12)


### Bug Fixes

* add prepbulish script ([a331156](https://github.com/marko-js/jest/commit/a331156))

## [2.0.0](https://github.com/marko-js/jest/compare/v1.0.3...v2.0.0) (2019-08-09)


### ⚠ BREAKING CHANGES

* Preset now contains more options.
* Preset contains babel-jest by default (same as vanilla jest).

### Features

* automatically whitelist Marko dependencies in transforms ([5cd263e](https://github.com/marko-js/jest/commit/5cd263e))

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.
