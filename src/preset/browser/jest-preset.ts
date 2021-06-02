import common from "../common";

export = {
  ...common,
  testEnvironment: "jsdom",
  // uses a webpack style resolver, the default one has many issues.
  resolver: require.resolve("../resolver"),
  // preprocesses Marko files.
  transform: {
    "\\.marko$": require.resolve("../../transform/browser"),
    ...common.transform,
  },
};
