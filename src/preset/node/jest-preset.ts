import common from "../common";

export = {
  ...common,
  testEnvironment: "node",
  // preprocesses Marko files.
  transform: {
    "\\.marko$": require.resolve("../../transform/node"),
    ...common.transform,
  },
};
