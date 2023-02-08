import { fromWPPost } from './post'

describe('post', () => {
	const mockWpPost = {
		id: 1,
		date: '2023-02-05T17:00:00',
		date_gmt: '2023-02-05T17:00:00',
		guid: { rendered: 'http://127.0.0.1/?p=1' },
		modified: '2023-02-05T17:00:00',
		modified_gmt: '2023-02-05T17:00:00',
		slug: 'hello-world',
		status: 'publish',
		type: 'post',
		link: 'http://wp.local',
		title: { rendered: 'Hello world!' },
		content: {
			rendered: '\n<p>Welcome. Hello, World.</p>\n',
			protected: false,
		},
		excerpt: {
			rendered: '<p>Welcome. Hello, World.</p>\n',
			protected: false,
		},
		author: 1,
		featured_media: 0,
		comment_status: 'open',
		ping_status: 'open',
		sticky: false,
		template: '',
		format: 'standard',
		meta: [],
		categories: [1],
		tags: [],
		jetpack_featured_media_url: 'http://wp.local/wp-content/uploads/2023/02/feature-image.png',
		_links: {
			self: [{ href: 'http://wp.local/wp-json/wp/v2/posts/1' }],
			collection: [{ href: 'http://wp.local/wp-json/wp/v2/posts' }],
			about: [{ href: 'http://wp.local/wp-json/wp/v2/types/post' }],
			author: [{ embeddable: true, href: 'http://wp.local/wp-json/wp/v2/users/1' }],
			replies: [{ embeddable: true, href: 'http://wp.local/wp-json/wp/v2/comments?post=1' }],
			'version-history': [{ count: 0, href: 'http://wp.local/wp-json/wp/v2/posts/1/revisions' }],
			'wp:attachment': [{ href: 'http://wp.local/wp-json/wp/v2/media?parent=1' }],
			'wp:term': [
				{ taxonomy: 'category', embeddable: true, href: 'http://wp.local/wp-json/wp/v2/categories?post=1' },
				{ taxonomy: 'post_tag', embeddable: true, href: 'http://wp.local/wp-json/wp/v2/tags?post=1' },
			],
			curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }],
		},
		_embedded: {
			author: [
				{
					id: 1,
					name: 'user',
					url: 'http://127.0.0.1',
					description: '',
					link: 'http://wp.local/author/user/',
					slug: 'user',
					avatar_urls: {
						'24': 'http://gravatar.com?s=24&d=mm&r=g',
						'48': 'http://gravatar.com?s=48&d=mm&r=g',
						'96': 'http://gravatar.com?s=96&d=mm&r=g',
					},
					_links: {
						self: [{ href: 'http://wp.local/wp-json/wp/v2/users/1' }],
						collection: [{ href: 'http://wp.local/wp-json/wp/v2/users' }],
					},
				},
			],
			replies: [
				[
					{
						id: 1,
						parent: 0,
						author: 0,
						author_name: 'A WordPress Commenter',
						author_url: 'https://wordpress.org/',
						date: '2023-02-05T17:00:00',
						content: {
							rendered: '<p>Hi, this is a comment.</p>',
						},
						link: 'http://wp.local/2023/02/05/hello-world/#comment-1',
						type: 'comment',
						author_avatar_urls: {
							'24': 'http://gravatar.com?s=24&d=mm&r=g',
							'48': 'http://gravatar.com?s=48&d=mm&r=g',
							'96': 'http://gravatar.com?s=96&d=mm&r=g',
						},
						_links: {
							self: [{ href: 'http://wp.local/wp-json/wp/v2/comments/1' }],
							collection: [{ href: 'http://wp.local/wp-json/wp/v2/comments' }],
							up: [{ embeddable: true, post_type: 'post', href: 'http://wp.local/wp-json/wp/v2/posts/1' }],
						},
					},
				],
			],
			'wp:featuredmedia': [
				{
					id: 1,
					date: '2023-02-08T10:00:00',
					slug: 'feature-image',
					type: 'attachment',
					link: 'http://wp.local/2023/02/05/hello-world/feature-image/',
					title: { rendered: 'feature-image' },
					author: 1,
					caption: { rendered: '' },
					alt_text: '',
					media_type: 'image',
					mime_type: 'image/png',
					media_details: {
						width: 1012,
						height: 506,
						file: '2023/02/feature-image.png',
						filesize: 9546,
						sizes: {
							medium: {
								file: 'feature-image-300x150.png',
								width: 300,
								height: 150,
								filesize: 4124,
								mime_type: 'image/png',
								source_url: 'http://wp.local/wp-content/uploads/2023/02/feature-image-300x150.png',
							},
							thumbnail: {
								file: 'feature-image-150x150.png',
								width: 150,
								height: 150,
								filesize: 3898,
								mime_type: 'image/png',
								source_url: 'http://wp.local/wp-content/uploads/2023/02/feature-image-150x150.png',
							},
							medium_large: {
								file: 'feature-image-768x384.png',
								width: 768,
								height: 384,
								filesize: 13023,
								mime_type: 'image/png',
								source_url: 'http://wp.local/wp-content/uploads/2023/02/feature-image-768x384.png',
							},
							full: {
								file: 'feature-image.png',
								width: 1012,
								height: 506,
								mime_type: 'image/png',
								source_url: 'http://wp.local/wp-content/uploads/2023/02/feature-image.png',
							},
						},
						image_meta: {
							aperture: '0',
							credit: '',
							camera: '',
							caption: '',
							created_timestamp: '0',
							copyright: '',
							focal_length: '0',
							iso: '0',
							shutter_speed: '0',
							title: '',
							orientation: '0',
							keywords: [],
						},
					},
					source_url: 'http://wp.local/wp-content/uploads/2023/02/feature-image.png',
					_links: {
						self: [{ href: 'http://wp.local/wp-json/wp/v2/media/6' }],
						collection: [{ href: 'http://wp.local/wp-json/wp/v2/media' }],
						about: [{ href: 'http://wp.local/wp-json/wp/v2/types/attachment' }],
						author: [{ embeddable: true, href: 'http://wp.local/wp-json/wp/v2/users/1' }],
						replies: [{ embeddable: true, href: 'http://wp.local/wp-json/wp/v2/comments?post=6' }],
					},
				},
			],
			'wp:term': [
				[
					{
						id: 1,
						link: 'http://wp.local/category/uncategorized/',
						name: 'Uncategorized',
						slug: 'uncategorized',
						taxonomy: 'category',
						_links: {
							self: [{ href: 'http://wp.local/wp-json/wp/v2/categories/1' }],
							collection: [{ href: 'http://wp.local/wp-json/wp/v2/categories' }],
							about: [{ href: 'http://wp.local/wp-json/wp/v2/taxonomies/category' }],
							'wp:post_type': [{ href: 'http://wp.local/wp-json/wp/v2/posts?categories=1' }],
							curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }],
						},
					},
				],
				[],
			],
		},
	}

	it('should convert wordpress post to post', () => {
		const post = fromWPPost(mockWpPost)

		expect(post).toEqual({
			title: 'Hello world!',
			description: '<p>Welcome. Hello, World.</p>\n',
			content: '\n<p>Welcome. Hello, World.</p>\n',
			pubDate: '2023-02-05T17:00:00',
			updatedDate: '2023-02-05T17:00:00',
			tags: [],
			slug: 'hello-world',
			heroImage: 'http://wp.local/wp-content/uploads/2023/02/feature-image.png',
			url: '/blog/wordpress/hello-world',
		})
	})

	it('should tolerate empty data', () => {
		const post = fromWPPost({})

		expect(post).toEqual({
			title: '',
			description: '',
			content: '',
			pubDate: '',
			updatedDate: '',
			tags: [],
			slug: '',
			heroImage: '',
			url: '/blog/wordpress/undefined',
		})
	})
})
