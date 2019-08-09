const fs = require("fs");
const path = require("path");
const { defaults } = require("jest-config");
const escapeRegexp = require("escape-string-regexp");
const { package, path: packagePath } = require("read-pkg-up").sync({
  normalize: false
});
const nodeModulesPath = path.join(packagePath, "../node_modules");

module.exports = {
  // uses a webpack style resolver, the default one has many issues.
  resolver: "enhanced-resolve-jest",
  // allows for stuff like file watching of `.marko` files
  moduleFileExtensions: defaults.moduleFileExtensions.concat("marko"),
  // preprocesses Marko files.
  transform: {
    "\\.marko$": require.resolve("."),
    "\\.[tj]s$": "babel-jest"
  },
  // Jest ignores node_module transforms by default.
  // Here we whitelist all node_modules that contain a `marko.json`.
  // Only checks for node_modules listed in package.json, same as Marko taglib scanning.
  transformIgnorePatterns: [
    `node_modules/(?!(${Object.keys(package.dependencies || {})
      .concat(Object.keys(package.devDependencies || {}))
      .concat(Object.keys(package.peerDependencies || {}))
      .filter((name, i, all) => all.indexOf(name) === i)
      .filter(name =>
        fs.existsSync(path.join(nodeModulesPath, name, "marko.json"))
      )
      .map(escapeRegexp)
      .concat("marko")
      .join("|")})/)`
  ]
};
