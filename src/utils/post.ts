import type { Post } from '../types/Post'
import type { CommentReader } from './comment'

export class PostReader {
	commentReader: CommentReader

	constructor(commentReader: CommentReader) {
		this.commentReader = commentReader
	}

	fromWPPost = (wpPost: any): Post => {
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
			commentUrl: wpPost?._links?.replies?.[0]?.href || '',
			comments: wpPost?._embedded?.replies?.[0]?.map(this.commentReader.fromWPComment) || [],
		}
		return post
	}
}
