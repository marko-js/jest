import fs from "fs";
import path from "path";
import crypto from "crypto";
import { Buffer } from "buffer";
import compiler from "marko/compiler";
import mergeMaps from "merge-source-map";
import ConcatMap from "concat-with-sourcemaps";
import type { Transformer } from "@jest/transform";
const THIS_FILE = fs.readFileSync(__filename);
const MARKO_OPTIONS: Record<string, any> = {
  writeVersionComment: false,
  requireTemplates: true,
  writeToDisk: false,
  sourceOnly: false,
  sourceMaps: true,
  modules: "cjs",
};
let configuredGlobals = false;

// Allows for resolving `.marko` files during compilation.
if (!(".marko" in require.extensions)) {
  (require.extensions as any)[".marko"] = undefined;
}

export default ({ browser }: { browser: boolean }) => {
  const transformer: Transformer = {
    getCacheKey(
      sourceText,
      sourcePath,
      transformOptions,
      config = transformOptions.config
    ) {
      return crypto
        .createHash("md5")
        .setEncoding("utf-8")
        .update(THIS_FILE)
        .update("\0")
        .update(sourceText)
        .update("\0")
        .update(path.relative(config.rootDir, sourcePath))
        .update("\0")
        .update(
          transformOptions.instrument || (config as any).instrument
            ? "instrument"
            : ""
        )
        .update("\0")
        .update(process.env.NODE_ENV || "")
        .update("\0")
        .update(process.env.MARKO_DEBUG || "")
        .digest("hex");
    },
    process(src, filename, transformOptions) {
      const config = transformOptions.config || transformOptions;
      const markoConfig = config.globals.marko as any;

      if (!configuredGlobals && markoConfig) {
        configuredGlobals = true;

        for (const key in markoConfig) {
          if (key !== "taglib") {
            MARKO_OPTIONS[key] = markoConfig[key];
          }
        }

        const taglibConfig = markoConfig.taglib;
        if (taglibConfig) {
          const excludeDirs = taglibConfig.excludeDirs;
          if (excludeDirs) {
            for (const name of excludeDirs) {
              compiler.taglibFinder.excludeDir(name);
            }
          }

          const excludePackages = taglibConfig.excludePackages;
          if (excludePackages) {
            for (const name of excludePackages) {
              compiler.taglibFinder.excludePackage(name);
            }
          }
        }
      }

      const result = compiler[
        (browser || (config as any).browser) &&
        compiler.compileForBrowser /** Only Marko 4 supports compileForBrowser, otherwise use compile */
          ? "compileForBrowser"
          : "compile"
      ](src, filename, MARKO_OPTIONS);

      let code = typeof result === "string" ? result : result.code; // Marko 3 does not support sourceOnly: false
      let map = result.map;
      const deps = browser && result.meta && result.meta.deps;

      if (deps && deps.length) {
        const concatMap = new ConcatMap(true, "", ";");
        const acceptPathReg = new RegExp(
          `^(?:[./]*[^:.]*|[^:]+(?:${config.transform
            .map(([reg], i) => `(?<_${i}>${reg})`)
            .join("|")}|\\.(?:${config.moduleFileExtensions.join("|")})))$`
        );

        for (let dep of deps) {
          if (typeof dep !== "string") {
            if (dep.virtualPath) {
              const acceptedMatch = acceptPathReg.exec(dep.virtualPath);
              let depCode = dep.code;
              let depMap = dep.map;

              if (!acceptedMatch) {
                continue;
              }

              for (const key in acceptedMatch.groups) {
                if (acceptedMatch.groups[key] !== undefined) {
                  // eslint-disable-next-line @typescript-eslint/no-var-requires
                  const transformResult = require(config.transform[
                    parseInt(key.slice(1), 10)
                  ][1]).process(depCode, dep.virtualPath, transformOptions);

                  if (typeof transformResult === "object") {
                    depCode = transformResult.code;
                    depMap = depMap
                      ? mergeMaps(depMap, transformResult.map)
                      : undefined;
                  } else {
                    depCode = transformResult;
                    depMap = undefined;
                  }
                }
              }

              concatMap.add(null, `((module, exports) => {`);
              concatMap.add(dep.virtualPath, depCode, depMap);
              concatMap.add(null, `})({ exports: {} })`);
              continue;
            } else {
              dep = dep.path;
            }
          }

          if (acceptPathReg.test(dep)) {
            concatMap.add(null, `require(${JSON.stringify(dep)})`);
          }
        }

        concatMap.add(filename, code, map);
        code = concatMap.content.toString("utf-8");
        map = concatMap.sourceMap;
      }

      if (map) {
        code += `\n//# sourceMappingURL=data:application/json;base64,${Buffer.from(
          typeof map === "string" ? map : JSON.stringify(map)
        ).toString("base64")}`;
      }

      return code;
    },
  };

  return transformer;
};
