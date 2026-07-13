import rss from '@astrojs/rss'
import { SITE_DESCRIPTION, SITE_TITLE } from '../config.js'

export const GET = async () => {
	const postFiles = import.meta.glob('./blog/*.md', { eager: true })

	const posts = Object.entries(postFiles)
		.map(([path, post]: [string, any]) => ({
			title: post.frontmatter?.title || '',
			url: `/blog/${path.replace('./blog/', '').replace('.md', '')}`,
			pubDate: new Date(post.frontmatter?.date || ''),
			description: post.frontmatter?.description || '',
		}))
		.filter((post: any) => post.title)
		.sort((a: any, b: any) => (a.pubDate > b.pubDate ? -1 : 1))

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: import.meta.env.SITE,
		items: posts,
	})
}
