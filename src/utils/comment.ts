import type { Comment } from '../types/Comment'

export class CommentReader {
	fromWPComment = (wpComment: any) => {
		const comment: Comment = {
			name: wpComment?.author_name || '',
			website: wpComment?.author_url || '',
			date: wpComment?.date || '',
			content: wpComment?.content?.rendered || '',
			avatarUrl: wpComment?.author_avatar_urls?.[96] || '',
		}
		return comment
	}
}
