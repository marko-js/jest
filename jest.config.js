const common = {
  transform: {
    "\\.ts$": "esbuild-jest",
    "\\.css$": "jest-transform-css",
  },
};

module.exports = {
  projects: [
    {
      ...common,
      preset: "./src/preset/node/jest-preset.ts",
      testMatch: ["<rootDir>/test/server.test.ts"],
    },
    {
      ...common,
      preset: "./src/preset/browser/jest-preset.ts",
      testMatch: ["<rootDir>/test/browser.test.ts"],
    },
  ],
};
