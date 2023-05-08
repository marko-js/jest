import common from "../common";

export = {
  ...common,
  testEnvironment: "jsdom",
  // uses a webpack style resolver, the default one has many issues.
  resolver:
    (() => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const parts = require("@marko/compiler/package.json").version.split(
          "."
        );
        const major = parseInt(parts[0], 10);
        const minor = parseInt(parts[1], 10);
        const patch = parseInt(parts[2], 10);
        // Checks if the version is less than 5.25.12
        return major === 5
          ? minor === 25
            ? patch < 12
            : minor < 25
          : major < 5;
      } catch {
        return false;
      }
    })() && require.resolve("../resolver"),
  // preprocesses Marko files.
  transform: {
    "\\.marko$": require.resolve("../../transform/browser"),
    ...common.transform,
  },
};
