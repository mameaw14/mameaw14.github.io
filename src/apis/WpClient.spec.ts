import { WpClient } from './WpClient.js'
import { expect, jest } from '@jest/globals'

const mockFetchRes = (res: any) => {
	return {
		json: () => res,
	}
}

describe('Wordpress client', () => {
	const client = new WpClient('https://wp.local')
	const mockFetch = jest.fn<() => Promise<any>>()
	global.fetch = mockFetch

	beforeEach(() => {
		jest.clearAllMocks()
	})

	describe('posts', () => {
		it('should get all posts', async () => {
			mockFetch.mockResolvedValueOnce(mockFetchRes({ posts: ['post1', 'post2'] }))

			const result = await client.getPosts()

			expect(mockFetch).toBeCalled()
			expect(mockFetch).toBeCalledWith(expect.not.stringContaining('?_fields'))
			expect(mockFetch).toBeCalledWith(expect.stringContaining('?per_page=100'))
			expect(result).toEqual({ posts: ['post1', 'post2'] })
		})

		it('should get all posts with fields', async () => {
			mockFetch.mockResolvedValueOnce(mockFetchRes(['post1', 'post2']))

			const result = await client.getPosts({
				fields: ['author', 'id'],
			})

			expect(mockFetch).toBeCalledWith(expect.stringContaining('_fields=author,id'))
			expect(result).toEqual(['post1', 'post2'])
		})

		it('should get posts by category', async () => {
			mockFetch.mockResolvedValueOnce(mockFetchRes(['cooking1', 'cooking2']))

			const result = await client.getPosts({
				categories: ['cooking'],
			})
			expect(mockFetch).toBeCalledWith(expect.stringContaining('categories=cooking'))
			expect(result).toEqual(['cooking1', 'cooking2'])
		})

		it.skip('should get post by slug', () => {
			const result = client.getPostBySlug('hello-world')
		})
	})

	describe('comments', () => {
		it(`should get all a post's comments`, async () => {
			mockFetch.mockResolvedValueOnce(mockFetchRes({ comments: ['comment1', 'comment2'] }))

			const result = await client.getCommentsByPostId(1)

			expect(mockFetch).toBeCalledWith('https://wp.local/wp-json/wp/v2/comments?post=1')
			expect(result).toEqual({ comments: ['comment1', 'comment2'] })
		})

		it('should post comment to a post', async () => {
			const postId = 1
			const commentData = {
				name: 'user',
				content: 'thank you',
				email: 'email@email.com',
				parentId: 0,
				website: 'http://wp.com',
			}
			mockFetch.mockResolvedValueOnce(mockFetchRes({ status: 'success' }))

			const result = await client.createComment(postId, commentData)
			expect(mockFetch).toBeCalled()
			expect(result).toEqual({ status: 'success' })
		})
	})
})
