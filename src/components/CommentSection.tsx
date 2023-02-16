import { useCallback, useEffect, useState } from 'react'
import { CommentReader } from '../utils/comment.js'
import type { Post } from '../types/Post.js'
import { CommentForm } from './CommentForm.js'
import { WpClient } from '../apis/WpClient.js'

const commentReader = new CommentReader()
const wpClient = new WpClient(import.meta.env.PUBLIC_WP_URL)

export const CommentSection = ({ post }: { post: Post }) => {
	const [comments, setComments] = useState([])

	const fetchComments = useCallback(() => {
		wpClient.getCommentsByPostId(post.id).then((data) => {
			setComments(data?.map(commentReader.fromWPComment))
		})
	}, [])

	useEffect(fetchComments, [])

	const getName = useCallback((name: string, url?: string) => {
		const displayName = name || '🌻 anonymous'
		if (url) {
			return (
				<a href={url} className="underline">
					{displayName}
				</a>
			)
		}
		return displayName
	}, [])

	return (
		<div className="not-prose">
			<h2 className="text-2xl text-neutral-800 mb-4 mt-8">comments</h2>
			<CommentForm post={post} commentCallback={fetchComments} />

			<hr className="border-t-border my-4" />

			{comments.map(({ content, name, date, avatarUrl, website }) => (
				<div>
					<div className="grid grid-cols-1 md:grid-cols-[50px_auto]">
						<img src={avatarUrl} alt={name + 'avatar'} className={'rounded-full w-8 h-8 self-center hidden md:block'} />
						<div>
							<div className="font-bold font-serif">{getName(name, website)}</div>
							<div className="text-xs">{date}</div>
						</div>
						<div></div>
						<div className="mt-2" dangerouslySetInnerHTML={{ __html: content }} />
					</div>
					<hr className="border-t-border my-4" />
				</div>
			))}
		</div>
	)
}
