import type { Comment } from './Comment'

export type Post = {
	title: string
	description: string
	content: string
	pubDate: string
	updatedDate: string
	heroImage: string
	tags: string[]
	slug: string
	url: string
	comments: Comment[]
}
