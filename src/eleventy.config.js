import fs from 'fs';
import path from 'path';

import cssnano from 'cssnano';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';

import * as esbuild from 'esbuild';

export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./static/**/*");

  eleventyConfig.on("eleventy.after", async () => {
    await bundleTailwind();
    await bundleJS();
  });

  return {
    dir: {
      input: "./template",
      output: "../"
    }
  }
}

async function bundleTailwind() {
  const tailwindInputPath = path.resolve("./static/css/main.css");
  const tailwindOutputPath = "../static/css/main.css";
  const cssContent = fs.readFileSync(tailwindInputPath, 'utf8');
  const outputDir = path.dirname(tailwindOutputPath);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Compile and minify Tailwind
  const processor = postcss([
    tailwindcss(),
    cssnano({
      preset: "default",
    }),
  ]);

  const result = await processor.process(cssContent, {
    from: tailwindInputPath,
    to: tailwindOutputPath,
  });

  fs.writeFileSync(tailwindOutputPath, result.css);
}

async function bundleJS() {
  await esbuild.build({
    entryPoints: ["./static/js/main.js"],
    bundle: true,
    outfile: "../static/js/main.js",
  });
}
