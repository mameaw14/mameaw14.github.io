import { CommentReader } from './comment.js'

const mockComment = {
	id: 2,
	parent: 0,
	author: 1,
	author_name: 'user',
	author_url: 'http://127.0.0.1',
	date: '2023-02-08T17:03:43',
	content: { rendered: '<p>comment 1</p>\n' },
	link: 'http://wp.local/2023/02/02/entry-name/#comment-2',
	type: 'comment',
	author_avatar_urls: {
		'24': 'http://gravatar.com?s=24&d=mm&r=g',
		'48': 'http://gravatar.com?s=48&d=mm&r=g',
		'96': 'http://gravatar.com?s=96&d=mm&r=g',
	},
	_links: {
		self: [{ href: 'http://wp.local/wp-json/wp/v2/comments/2' }],
		collection: [{ href: 'http://wp.local/wp-json/wp/v2/comments' }],
		author: [{ embeddable: true, href: 'http://wp.local/wp-json/wp/v2/users/1' }],
		up: [{ embeddable: true, post_type: 'post', href: 'http://wp.local/wp-json/wp/v2/posts/13' }],
		children: [{ embeddable: true, href: 'http://wp.local/wp-json/wp/v2/comments?parent=2' }],
	},
}

describe('comment', () => {
	const commentReader = new CommentReader()
	it('should read comment', () => {
		expect(commentReader.fromWPComment(mockComment)).toEqual({
			name: 'user',
			website: 'http://127.0.0.1',
			date: '2023-02-08T17:03:43',
			content: '<p>comment 1</p>\n',
			avatarUrl: 'http://gravatar.com?s=96&d=mm&r=g',
		})
	})

	it('should tolerate empty date', () => {
		expect(commentReader.fromWPComment({})).toEqual({
			name: '',
			website: '',
			date: '',
			content: '',
			avatarUrl: '',
		})
	})
})
