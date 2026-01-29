import fs from 'fs';
import path from 'path';

import cssnano from 'cssnano';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';

export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./static/**/*");

  eleventyConfig.on('eleventy.after', async () => {
    const tailwindInputPath = path.resolve('./static/css/main.css');

    const tailwindOutputPath = '../static/css/main.css';

    const cssContent = fs.readFileSync(tailwindInputPath, 'utf8');

    const outputDir = path.dirname(tailwindOutputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const result = await processor.process(cssContent, {
      from: tailwindInputPath,
      to: tailwindOutputPath,
    });

    fs.writeFileSync(tailwindOutputPath, result.css);
  });

  const processor = postcss([
    //compile tailwind
    tailwindcss(),

    //minify tailwind css
    cssnano({
      preset: 'default',
    }),
  ]);


  return {
    dir: {
      input: "./template",
      output: "../"
    }
  }
}
