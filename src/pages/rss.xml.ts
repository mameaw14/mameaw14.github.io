import rss from '@astrojs/rss'
import { SITE_DESCRIPTION, SITE_TITLE } from '../config.js'
import { WpClient } from '../apis/WpClient.js'
import { PostReader } from '../utils/post.js'
import type { Post } from '../types/Post.js'
import { CommentReader } from '../utils/comment.js'

export const get = async () => {
	const wpClient = new WpClient(import.meta.env.WP_URL)
	let data = await wpClient.getPosts({
		fields: ['author', 'id', 'excerpt', 'title', 'link', 'date', 'slug'],
		categories: ['21'],
	})
	let posts: Post[] = data.map(new PostReader(new CommentReader()).fromWPPost)

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: import.meta.env.SITE,
		items: posts.map((post) => ({
			title: post.title,
			link: post.url,
			pubDate: new Date(post.pubDate),
			description: post.description,
		})),
	})
}
