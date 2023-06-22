import common from "../common";

export = {
  ...common,
  testEnvironment: "jsdom",
  // uses a webpack style resolver, the default one has many issues.
  resolver: needsResolver() && require.resolve("../resolver"),
  // preprocesses Marko files.
  transform: {
    "\\.marko$": require.resolve("../../transform/browser"),
    ...common.transform,
  },
};

function needsResolver() {
  const version = getVersion("@marko/compiler") || getVersion("marko");
  if (!version) return false;

  const parts = version.split(".");
  const major = parseInt(parts[0], 10);
  const minor = parseInt(parts[1], 10);
  const patch = parseInt(parts[2], 10);

  // Checks if the version is less than 5.25.12 || 4.26.0
  switch (major) {
    case 5:
      return minor === 25 ? patch < 12 : minor < 25;
    case 4:
      return minor < 26;
    default:
      return false;
  }
}

function getVersion(name: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require(`${name}/package.json`).version;
  } catch {
    return undefined;
  }
}
