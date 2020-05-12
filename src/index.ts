import fs from "fs";
import path from "path";
import crypto from "crypto";
import compiler from "marko/compiler";
import ConcatMap from "concat-with-sourcemaps";
import { Transformer } from "@jest/transform";
const THIS_FILE = fs.readFileSync(__filename);

export = {
  getCacheKey(fileData, filename, configString, { instrument, rootDir }) {
    return crypto
      .createHash("md5")
      .update(THIS_FILE)
      .update("\0", "utf8")
      .update(configString)
      .update("\0", "utf8")
      .update(fileData)
      .update("\0", "utf8")
      .update(path.relative(rootDir, filename))
      .update("\0", "utf8")
      .update(instrument ? "instrument" : "")
      .update("\0", "utf8")
      .update(process.env.NODE_ENV || "")
      .digest("hex");
  },
  process(src, filename, config) {
    const result = compiler[
      config.browser &&
      compiler.compileForBrowser /** Only Marko 4 supports compileForBrowser, otherwise use compile */
        ? "compileForBrowser"
        : "compile"
    ](src, filename, {
      writeVersionComment: false,
      requireTemplates: true,
      writeToDisk: false,
      sourceOnly: false,
      sourceMaps: true
    });

    let code = typeof result === "string" ? result : result.code; // Marko 3 does not support sourceOnly: false
    let map = result.map;
    const deps = result.meta && result.meta.deps;

    if (deps) {
      const concatMap = new ConcatMap(true, "", ";");
      const acceptPathReg = new RegExp(
        `^[^.]+$|${config.transform
          .map(([reg], i) => `(?<_${i}>${reg})`)
          .join("|")}|\\.(?:${config.moduleFileExtensions.join("|")})$`
      );

      for (let dep of deps) {
        if (typeof dep !== "string") {
          if (dep.virtualPath) {
            const acceptedMatch = acceptPathReg.exec(dep.virtualPath);
            let depCode = dep.code;

            if (!acceptedMatch) {
              return;
            }

            for (const key in acceptedMatch.groups) {
              if (acceptedMatch.groups[key] !== undefined) {
                const transformResult = require(config.transform[
                  key.slice(1)
                ][1]).process(depCode, dep.virtualPath, config);
                depCode = transformResult.code || transformResult; // TODO: support sourcemaps for this.
              }
            }

            concatMap.add(
              dep.virtualPath,
              `((module, exports) => {${depCode}})({ exports: {} })`
            );
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

    if (!map) {
      return code;
    }

    return {
      code,
      map
    };
  },
  canInstrument: false
} as Transformer;
