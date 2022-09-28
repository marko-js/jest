import fs from "fs";
import path from "path";
import crypto from "crypto";
import { Buffer } from "buffer";
import mergeMaps from "merge-source-map";
import ConcatMap from "concat-with-sourcemaps";
import type { Transformer } from "@jest/transform";
import { version as markoVersion } from "marko/package.json";

const isMarko4 = /^4\./.test(markoVersion);
const htmlOutput = "html";
const domOutput = isMarko4 ? "vdom" : "dom";
const compiler = isMarko4
  ? require("marko/compiler")
  : require("@marko/compiler");
const taglib = isMarko4 ? compiler.taglibFinder : compiler.taglib;
const compileSync = isMarko4 ? compiler.compile : compiler.compileSync;
const THIS_FILE = fs.readFileSync(__filename);
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
      const globalMarkoConfig = config.globals.marko as any;
      const output = browser ? domOutput : htmlOutput;
      const markoConfig: Record<string, any> = isMarko4
        ? {
            requireTemplates: true,
            writeToDisk: false,
            sourceOnly: false,
            output,
          }
        : {
            sourceMaps: true,
            modules: "cjs",
            output,
          };

      if (globalMarkoConfig) {
        const { taglib: taglibConfig, ...compilerConfig } = globalMarkoConfig;
        Object.assign(markoConfig, compilerConfig);

        if (!configuredGlobals) {
          configuredGlobals = true;

          if (taglibConfig) {
            const excludeDirs = taglibConfig.excludeDirs;
            if (excludeDirs) {
              for (const name of excludeDirs) {
                taglib.excludeDir(name);
              }
            }

            const excludePackages = taglibConfig.excludePackages;
            if (excludePackages) {
              for (const name of excludePackages) {
                taglib.excludePackage(name);
              }
            }
          }
        }
      }

      const result = compileSync(src, filename, markoConfig);
      const deps = browser && result.meta && result.meta.deps;
      let { code, map } = result;

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

      return { code };
    },
  };

  return transformer;
};
