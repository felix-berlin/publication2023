import { defineConfig } from 'astro/config';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'url';
import sitemap from '@astrojs/sitemap';
import prefetch from '@astrojs/prefetch';
import critters from "astro-critters";
import serviceWorker from "astrojs-service-worker";
import { astroImageTools } from "astro-imagetools";
import vue from "@astrojs/vue";
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// https://astro.build/config
export default defineConfig({
  site: 'https://publication2023.bits-und-baeume.org',
  compressHTML: true,
  markdown: {
    rehypePlugins: [[rehypeSlug, { prefix: 'h-' }], [rehypeAutolinkHeadings, { behavior: 'append' }]], // We need this to prevent IDs starting with a number
  },
  integrations: [
    sitemap({
      lastmod: new Date()
    }),
    prefetch(),
    critters({
      critters: !import.meta.env.DEV,
    }),
    serviceWorker(),
    astroImageTools,
    vue()
  ],
  vite: {
    plugins: [],
    css: {
      devSourcemap: true,
    },
    resolve: {
      alias: {
        '@sass-butler/': `${path.resolve(__dirname, 'node_modules/@felix_berlin/sass-butler/')}/`,
        '@styles/': `${path.resolve(__dirname, 'src/styles/')}/`
      }
    }
  }
});
