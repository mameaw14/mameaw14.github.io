import type { Comment } from '../types/Comment'

export const fromWPComment = (wpComment: any) => {
	return {
		name: wpComment?.author_name || '',
		website: wpComment?.author_url || '',
		date: wpComment?.date || '',
		content: wpComment?.content?.rendered || '',
	} as Comment
}
