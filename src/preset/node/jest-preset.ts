import sharedPreset from "../shared-preset";

export = {
  ...sharedPreset,
  // avoid loading jsdom.
  testEnvironment: "node",
  // preprocesses Marko files.
  transform: {
    "\\.marko$": require.resolve("../../transform/node"),
    ...sharedPreset.transform
  }
};
