import type { Post } from '../types/Post'

export const fromWPPost = (wpPost: any): Post => {
	const post: Post = {
		title: wpPost?.title?.rendered || '',
		description: wpPost?.excerpt?.rendered || '',
		pubDate: wpPost?.date || '',
		updatedDate: wpPost?.modified || '',
		tags: wpPost?.tags || [],
		slug: wpPost?.slug || '',
		heroImage: wpPost?._embedded?.['wp:featuredmedia']?.['0'].source_url || '',
		content: wpPost?.content?.rendered || '',
		url: `/blog/wordpress/${wpPost.slug}`,
	}
	return post
}
