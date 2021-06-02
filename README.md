<h1 align="center">
  <!-- Logo -->
  <img width="300" src="https://user-images.githubusercontent.com/1958812/60372848-03980180-99b3-11e9-87c2-0fa76c8b6ff4.png"/>
  <br/>
  @marko/jest
	<br/>

  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-stable-brightgreen.svg" alt="API Stability"/>
  </a>
  <!-- Language -->
  <a href="http://typescriptlang.org">
    <img src="https://img.shields.io/badge/%3C%2F%3E-typescript-blue.svg" alt="TypeScript"/>
  </a>
  <!-- Format -->
  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" alt="Styled with prettier"/>
  </a>
  <!-- CI -->
  <a href="https://travis-ci.org/marko-js/jest">
  <img src="https://img.shields.io/travis/marko-js/jest.svg" alt="Build status"/>
  </a>
  <!-- Coverage -->
  <a href="https://codecov.io/gh/marko-js/jest">
    <img src="https://codecov.io/gh/marko-js/jest/branch/master/graph/badge.svg?token=0WMSNt10pv" alt="Test Coverage"/>
  </a>
  <!-- NPM Version -->
  <a href="https://npmjs.org/package/@marko/jest">
    <img src="https://img.shields.io/npm/v/@marko/jest.svg" alt="NPM Version"/>
  </a>
  <!-- Downloads -->
  <a href="https://npmjs.org/package/@marko/jest">
    <img src="https://img.shields.io/npm/dm/@marko/jest.svg" alt="Downloads"/>
  </a>
</h1>

A preprocessor and preset to use Marko with Jest.
Templates are automatically compiled for the correct environment based on your Jest config. Browser tests are compiled to the dom api, and server tests to the html streaming api.

# Installation

```console
npm install @marko/jest -D
```

or

```console
yarn add @marko/jest -D
```

# Examples

**jest.config.js**

```javascript
module.exports = {
  preset: "@marko/jest/preset/browser",
};
```

The above is roughly equivalent to:

```javascript
const { defaults } = require("jest-config");

module.exports = {
  // uses a webpack style resolver
  resolver: "...",
  // allows for stuff like file watching of `.marko` files
  moduleFileExtensions: defaults.moduleFileExtensions.concat("marko"),
  // preprocesses Marko files.
  transform: { "\\.marko$": "@marko/jest/transform/browser" },
  // transforms `.marko` files in node_modules as well
  transformIgnorePatterns: ["node_modules/.*(?<!\\.marko)$"
};
```

## Customizing the preset

Jest presets are extensible by default, meaning you should be able to continue to use your existing config with the Marko preset. For example, if you want typescript support you could have a config like:

**jest.config.js**

```javascript
module.exports = {
  preset: "@marko/jest/preset/browser",
  transform: {
    "\\.ts$": "ts-jest",
  },
};
```

You can also get access to the preset configuration manually by importing `@marko/jest/preset/browser/jest-preset` and use it like so:

```javascript
const markoJest = require("@marko/jest/preset/browser/jest-preset");
module.exports = {
  resolver: markoJest.resolver,
  transform: markoJest.transform,
  testEnvironment: markoJest.testEnvironment,
  moduleFileExtensions: markoJest.moduleFileExtensions,
  transformIgnorePatterns: markoJest.transformIgnorePatterns,
};
```

## Test both server & browser

For many Marko projects you may have a mix of server and browser components. You can test all of these with Jest by using the [projects configuration](https://jestjs.io/docs/en/configuration#projects-array-string-projectconfig) [like this project does](./blob/master/jest.config.js)! Simply make sure to use `@marko/jest/preset/node` and `@marko/jest/preset/browser` according to the test environment.

**jest.config.js**

```javascript
module.exports = {
  projects: [
    {
      displayName: "browser",
      preset: "@marko/jest/preset/browser",
      testMatch: ["**/__tests__/**/*.browser.js"],
    },
    {
      displayName: "server",
      preset: "@marko/jest/preset/node",
      testMatch: ["**/__tests__/**/*.server.js"],
    },
  ],
};
```

In the above example config, any tests with `*.browser.js` will run in a JSDOM context with browser path resolution and Marko's DOM API, those with `*.server.js` will instead be run in a node context with the Marko HTML streaming API.

## Using tags from npm

By default Jest will not transform any `.marko` files within your `node_modules` folder. Marko recommends publishing the original source Marko files when publishing to npm. To get around this you can use the [`transformIgnorePatterns`](https://jestjs.io/docs/en/tutorial-react-native#transformignorepatterns-customization) option in Jest and whitelist `.marko` files.

The `@marko/jest/preset/*` helpers set the ignore pattern for you. If you are using the `@marko/jest/transform/*` directly then you will have to do this yourself, like so:

**jest.config.js**

```javascript
module.exports = {
  ...,
  transformIgnorePatterns: ["node_modules/.*(?<!\\.marko)$"]
};
```

## Including `style` files

Since jest is uses JSDOM, which has limited support for stylesheets, including styles in the page often does not add a ton of value. However in some cases it can be useful to include these styles, for example with [visual-html](https://github.com/ebay/visual-html) or [jsdom-screenshot](https://github.com/dferber90/jsdom-screenshot).

This plugin will automatically include any Marko dependencies, including style files, if an appropriate jest transform is available.
To have Marko include a `style.css` file you could add [jest-transform-css](https://github.com/dferber90/jest-transform-css) to your `jest.config.js`.

## Why override the resolver (enhanced-resolve-jest)?

The default jest resolver does actually work fine with Marko when running server side tests, however in the browser they rely on [browser-resolve](https://github.com/shtylman/node-browser-resolve#readme). The browser resolver then relies on a version of [resolve](https://github.com/browserify/resolve) which is over three years old and has had many fixes since.

On top of the issues from using this outdated module, there are a number of limitations. Below i've outlined some issues and limitations you might come across because of this dependency used by jest, one of which completely stops Marko's browser modules from being resolved correctly, hence the recommendation here.

https://github.com/facebook/jest/issues/7840
https://github.com/facebook/jest/issues/5356
https://github.com/facebook/jest/issues/5356
https://github.com/facebook/jest/issues/4756
https://github.com/facebook/jest/issues/2702

## Code of Conduct

This project adheres to the [eBay Code of Conduct](./.github/CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.
