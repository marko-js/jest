import { create, getDefaultConfig } from "enhanced-resolve-jest";

export = create(jestConfig => {
  const baseConfig = getDefaultConfig(jestConfig);
  baseConfig.aliasFields = ["browser"];
  baseConfig.mainFields = ["browser", "main"];
  return baseConfig;
});
