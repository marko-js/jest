import fs from "fs";
import path from "path";
import crypto from "crypto";
import compiler from "marko/compiler";
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

    const code = typeof result === "string" ? result : result.code; // Marko 3 does not support sourceOnly: false
    const map = result.map;

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
