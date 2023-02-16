import queryString from 'query-string'

type GetPostParams = { fields?: string[]; categories?: string[] }

interface CreateCommentData {
	name?: string
	content: string
	email?: string
	parentId?: number
	website?: string
}

export type CreateCommentRes = {
	status?: 'success' | 'spam'
	code?: string
	message?: string
	data?: {
		status: number
	}
}
export class WpClient {
	apiUrl: string

	constructor(wpUrl: string) {
		this.apiUrl = wpUrl + '/wp-json'
	}

	async getPosts(params?: GetPostParams) {
		const qsObj = {
			_fields: params?.fields,
			categories: params?.categories,
		}
		const q = queryString.stringify(qsObj, { arrayFormat: 'comma' })
		const result = await fetch(this.apiUrl + `/wp/v2/posts?` + q)
		return result.json()
	}
	async createComment(postId: number, commentData: CreateCommentData): Promise<CreateCommentRes> {
		const body = {
			post: postId,
			author_name: commentData?.name || '',
			author_email: commentData?.email || '',
			author_url: commentData?.website || '',
			parent: commentData?.parentId || 0,
			content: commentData?.content,
		}

		const result = await fetch(this.apiUrl + '/wp/v2/comments', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})
		return result.json()
	}
	getPostBySlug(arg0: string) {
		throw new Error('Method not implemented.')
	}

	async getCommentsByPostId(postId: number) {
		const result = await fetch(this.apiUrl + `/wp/v2/comments?post=${postId}`)
		return result.json()
	}
}
