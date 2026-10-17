// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://pi-tribute.dev',
  compressHTML: true,
  devToolbar: {
    enabled: false,
  },
});
