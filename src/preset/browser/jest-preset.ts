import sharedPreset from "../shared-preset";

export = {
  ...sharedPreset,
  // uses a webpack style resolver, the default one has many issues.
  resolver: require.resolve("./resolver"),
  // preprocesses Marko files.
  transform: {
    "\\.marko$": require.resolve("../../transform/browser"),
    ...sharedPreset.transform
  }
};
