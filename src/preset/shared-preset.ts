import { defaults } from "jest-config";

export = {
  // allows for stuff like file watching of `.marko` files
  moduleFileExtensions: defaults.moduleFileExtensions.concat("marko"),
  transform: { "\\.[tj]s$": "babel-jest" },
  // Jest ignores node_module transforms by default.
  // Here we whitelist all `.marko` files.
  transformIgnorePatterns: ["node_modules/.*(?<!\\.marko)$"]
};
