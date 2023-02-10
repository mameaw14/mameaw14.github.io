import type { Comment } from './Comment'

export type Post = {
	id: number
	title: string
	description: string
	content: string
	pubDate: string
	updatedDate: string
	heroImage: string
	tags: string[]
	slug: string
	url: string
	commentUrl: string
	comments: Comment[]
}
