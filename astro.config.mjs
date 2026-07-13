import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'

export default defineConfig({
	site: 'https://mameaw14.xyz',
	integrations: [mdx(), sitemap(), react()],
	markdown: {
		shikiConfig: {
			theme: 'dracula-soft',
		},
	},
})
