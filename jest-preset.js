const { defaults } = require("jest-config");

module.exports = {
  // uses a webpack style resolver, the default one has many issues.
  resolver: "enhanced-resolve-jest",
  // allows for stuff like file watching of `.marko` files
  moduleFileExtensions: defaults.moduleFileExtensions.concat("marko"),
  // preprocesses Marko files.
  transform: {
    "\\.marko$": require.resolve(".")
  },
  // transforms top level `.marko` files in the Marko package.
  transformIgnorePatterns: ["node_modules/(?!(marko)/)"]
};
