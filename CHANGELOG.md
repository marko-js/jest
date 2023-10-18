# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [5.2.3](https://github.com/marko-js/jest/compare/v5.2.2...v5.2.3) (2023-10-18)


### Bug Fixes

* ensure jest is always passed a sourceMap object ([2f7c08f](https://github.com/marko-js/jest/commit/2f7c08f1dde9fd73eba50ce49755fb54c0f2ef90))

### [5.2.2](https://github.com/marko-js/jest/compare/v5.2.1...v5.2.2) (2023-10-09)


### Bug Fixes

* ensure virtual file paths are resolved ([417708e](https://github.com/marko-js/jest/commit/417708ef800dcba81c2a55e847198d2719fb0f4b))

### [5.2.1](https://github.com/marko-js/jest/compare/v5.2.0...v5.2.1) (2023-10-09)


### Bug Fixes

* ensure custom resolver used for older versions of jest ([b7471e9](https://github.com/marko-js/jest/commit/b7471e90900794c5b5bb01cfe269056fb079b209))

## [5.2.0](https://github.com/marko-js/jest/compare/v5.1.2...v5.2.0) (2023-08-11)


### Features

* support registering global taglibs from jest config ([bfdda6c](https://github.com/marko-js/jest/commit/bfdda6c51f1fc44a573ba487b54f3b777f85ede3))

### [5.1.2](https://github.com/marko-js/jest/compare/v5.1.1...v5.1.2) (2023-08-11)


### Bug Fixes

* better support js viritual modules ([297d053](https://github.com/marko-js/jest/commit/297d053d59bd7e304f742bf2909852c3dd4c3eb6))

### [5.1.1](https://github.com/marko-js/jest/compare/v5.1.0...v5.1.1) (2023-08-10)


### Bug Fixes

* forward browser option to Marko 4 compiler ([0d21393](https://github.com/marko-js/jest/commit/0d21393fb1d6fff71c8618df468dfebfe4bffc0a))

## [5.1.0](https://github.com/marko-js/jest/compare/v5.0.0...v5.1.0) (2023-06-22)


### Features

* avoid custom resolver for newer Marko 4 versions ([7fd3fb8](https://github.com/marko-js/jest/commit/7fd3fb8e560c40d15c86f5f0ab2b43492648067e))


### Bug Fixes

* avoid overriding jest resolver when possible ([3018c43](https://github.com/marko-js/jest/commit/3018c4302d1b29533e7c8d79f3bc673a44f43935))

## [5.0.0](https://github.com/marko-js/jest/compare/v4.1.2...v5.0.0) (2022-09-28)


### ⚠ BREAKING CHANGES

* drops support for Marko 3

### Features

* use Marko 5 compiler apis if available ([566112d](https://github.com/marko-js/jest/commit/566112db49405c985c0b87abc114270d56ff2936))
* use Marko's internal caching ([758bf9a](https://github.com/marko-js/jest/commit/758bf9a9c63ee11dcbc80618c2dc4bcce88e4dec))


* Merge pull request #22 from marko-js/improve-marko-5-support ([6b66e4d](https://github.com/marko-js/jest/commit/6b66e4d6f85777b611428200a176bc6f128af2e4)), closes [#22](https://github.com/marko-js/jest/issues/22)

### [4.1.2](https://github.com/marko-js/jest/compare/v4.1.1...v4.1.2) (2022-05-23)

### [4.1.1](https://github.com/marko-js/jest/compare/v4.1.0...v4.1.1) (2021-12-10)


### Bug Fixes

* move jest-config to a peer dep ([e974ea7](https://github.com/marko-js/jest/commit/e974ea76280bfa86921dcd60501298feccd0a599))

## [4.1.0](https://github.com/marko-js/jest/compare/v4.0.2...v4.1.0) (2021-10-25)


### Features

* expose a way to ignore tags and customize Marko config ([616674c](https://github.com/marko-js/jest/commit/616674cb862d991d9d7d70e1e46589eb4c0d427d))

### [4.0.2](https://github.com/marko-js/jest/compare/v4.0.1...v4.0.2) (2021-06-03)


### Bug Fixes

* prefer inline sourcemaps which better support debugging ([c51aff7](https://github.com/marko-js/jest/commit/c51aff71705c170cbbb1373483df4cea7f9b40d3))

### [4.0.1](https://github.com/marko-js/jest/compare/v4.0.0...v4.0.1) (2021-06-02)


### Bug Fixes

* issue with .d.ts missing ([fb5e258](https://github.com/marko-js/jest/commit/fb5e2586360bf691eee57499bb66be9974742aff))

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
