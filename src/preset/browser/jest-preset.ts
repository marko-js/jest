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
  const jestVersion = getVersion("jest");

  // Jest 29+ has a built in resolver that works fine with newer
  // versions of Marko. Older versions of jest always require a custom resolver.
  if (
    jestVersion &&
    parseInt(jestVersion.slice(0, jestVersion.indexOf(".")), 10) < 29
  ) {
    return true;
  }

  const markoVersion = getVersion("@marko/compiler") || getVersion("marko");
  if (!markoVersion) return false;

  const parts = markoVersion.split(".");
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
