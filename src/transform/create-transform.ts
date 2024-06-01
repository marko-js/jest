import fs from "fs";
import path from "path";
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
const cache = new Map();
let configuredGlobals = false;

// Allows for resolving `.marko` files during compilation.
if (!(".marko" in require.extensions)) {
  (require.extensions as any)[".marko"] = undefined;
}

export default ({ browser }: { browser: boolean }) => {
  const transformer: Transformer = {
    process(src, filename, transformOptions) {
      const config = transformOptions.config || transformOptions;
      const globalMarkoConfig = config.globals.marko as any;
      const output = browser ? domOutput : htmlOutput;
      const markoConfig: Record<string, any> = isMarko4
        ? {
            requireTemplates: true,
            writeToDisk: false,
            sourceOnly: false,
            browser,
            output,
          }
        : {
            fileSystem: createVirtualFS(transformOptions.cacheFS),
            writeVersionComment: false,
            sourceMaps: true,
            modules: "cjs",
            output,
            cache,
            babelConfig: {
              compact: false,
              comments: false,
              babelrc: false,
              configFile: false,
              browserslistConfigFile: false,
              caller: {
                name: "@marko/jest",
                supportsStaticESM: true,
                supportsDynamicImport: true,
                supportsTopLevelAwait: true,
              }
            }
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

            const register = taglibConfig.register;
            if (register) {
              for (const name of register) {
                if (typeof name === "string") {
                  taglib.register(name);
                } else if (Array.isArray(name) && name.length === 2) {
                  taglib.register(name[0], name[1]);
                }
              }
            }
          }
        }
      }

      const result = compileSync(src, filename, markoConfig);
      const deps = browser && result.meta && result.meta.deps;
      let { code, map } = result;

      if (deps && deps.length) {
        const concatMap = new ConcatMap(true, filename, ";");
        const acceptPathReg = new RegExp(
          `^(?:[./]*[^:.]*|[^:]+(?:${config.transform
            .map(([reg], i) => `(?<_${i}>${reg})`)
            .join("|")}|\\.(?:${config.moduleFileExtensions.join("|")})))$`
        );

        concatMap.add(filename, code, map);

        for (let dep of deps) {
          if (typeof dep !== "string") {
            if (dep.virtualPath) {
              const resolvedVirtualPath = path.resolve(
                filename,
                dep.virtualPath
              );
              const acceptedMatch = acceptPathReg.exec(resolvedVirtualPath);
              let depCode = dep.code;
              let depMap = dep.map;

              if (!acceptedMatch) {
                continue;
              }

              for (const key in acceptedMatch.groups) {
                if (acceptedMatch.groups[key] !== undefined) {
                  const [, nestedTransformerPath, nestedTransformerOpts] =
                    config.transform[parseInt(key.slice(1), 10)];
                  // eslint-disable-next-line @typescript-eslint/no-var-requires
                  const nestedTransformerModule = require(nestedTransformerPath);
                  const nestedTransformer =
                    nestedTransformerModule.createTransformer
                      ? nestedTransformerModule.createTransformer(
                          nestedTransformerOpts
                        )
                      : nestedTransformerModule;
                  const transformResult = nestedTransformer.process
                    ? nestedTransformer.process(depCode, resolvedVirtualPath, {
                        ...transformOptions,
                        ...nestedTransformerOpts,
                      })
                    : dep.code;

                  if (typeof transformResult === "object") {
                    depCode = transformResult.code;
                    depMap = depMap && transformResult.map
                      ? mergeMaps(depMap, transformResult.map)
                      : undefined;
                  } else {
                    depCode = transformResult;
                    depMap = undefined;
                  }
                }
              }

              concatMap.add(null, `\n;((module, exports) => {`);
              concatMap.add(resolvedVirtualPath, depCode, depMap);
              concatMap.add(null, `\n})({ exports: {} })`);
              continue;
            } else {
              dep = dep.path;
            }
          }

          if (acceptPathReg.test(dep)) {
            concatMap.add(null, `\n;require(${JSON.stringify(dep)})`);
          }
        }

        code = concatMap.content.toString("utf-8");
        map = (concatMap as any)._sourceMap?.toJSON?.() || JSON.parse(concatMap.sourceMap || "null");
      }

      return { code, map };
    },
  };

  return transformer;
};

function createVirtualFS(map: Map<string, string> | undefined) {
  if (!map) return fs;

  return {
    ...fs,
    readFileSync(...args: Parameters<typeof fs["readFileSync"]>) {
      const path = args[0] as any;
      const source = map.get(path);
      if (source !== undefined) {
        return source;
      }

      return fs.readFileSync(...args);
    },
  };
}
