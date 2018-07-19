const base = {
  preset: "./jest-preset",
  transform: {
    "\\.ts$": "ts-jest"
  }
};

module.exports = {
  projects: [
    {
      ...base,
      displayName: "server",
      testEnvironment: "node",
      testMatch: ["<rootDir>/test/server.test.ts"]
    },
    {
      ...base,
      displayName: "browser",
      browser: true,
      testMatch: ["<rootDir>/test/browser.test.ts"]
    }
  ]
};
