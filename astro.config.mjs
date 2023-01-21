import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'


const tailwindConfig = {
}
// https://astro.build/config
export default defineConfig({
	site: 'https://mameaw14.xyz',
	integrations: [mdx(), sitemap(), tailwind(tailwindConfig)],
	markdown: {
		shikiConfig: {
			theme: 'dracula-soft',
		},
	},
})
