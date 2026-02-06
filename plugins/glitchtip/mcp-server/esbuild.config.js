import { build } from "esbuild";

await build({
  entryPoints: ["build/index.js"],
  bundle: true,
  platform: "node",
  target: "node18",
  format: "esm",
  outfile: "../bundle.mjs",
});
