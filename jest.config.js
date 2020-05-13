const base = {
  transform: {
    "\\.ts$": "ts-jest",
    "\\.css$": "jest-transform-css"
  }
};

module.exports = {
  projects: [
    {
      ...base,
      preset: "./preset/node/jest-preset.js",
      displayName: "node",
      testEnvironment: "node",
      testMatch: ["<rootDir>/test/server.test.ts"]
    },
    {
      ...base,
      preset: "./preset/browser/jest-preset.js",
      displayName: "browser",
      testMatch: ["<rootDir>/test/browser.test.ts"]
    }
  ]
};
