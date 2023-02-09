import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'

const tailwindConfig = {}

export default defineConfig({
	site: 'https://mameaw14.xyz',
	integrations: [mdx(), sitemap(), tailwind(tailwindConfig), react()],
	markdown: {
		shikiConfig: {
			theme: 'dracula-soft',
		},
	},
})
