import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'

import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://mameaw14.xyz',
  integrations: [mdx(), sitemap()],
  markdown:{
    shikiConfig:{
      theme: 'dracula-soft',
    }
  }
})
