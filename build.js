const fs = require("fs");
const glob = require("tiny-glob");
const { build } = require("esbuild");

(async () => {
  await fs.promises.rmdir("dist", { recursive: true }).catch(() => {});

  // Ideally we'd use the same bundling / codesplitting as esm for cjs,
  // but thats not yet possible with esbuild, so we manually build each file.
  // https://github.com/evanw/esbuild/issues/1341
  await build({
    format: "cjs",
    outdir: "dist",
    platform: "node",
    target: ["node14"],
    entryPoints: await glob("src/{preset,transform}/**/*.ts"),
  });
})().catch((err) => {
  if (!err.errors) {
    console.error(err);
  }

  process.exit(1);
});
