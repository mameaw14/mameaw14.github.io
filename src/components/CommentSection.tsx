import { useCallback, useEffect, useState } from 'react'
import { CommentReader } from '../utils/comment'
import type { Post } from '../types/Post'
import { CommentForm } from './CommentForm'
import { WpClient } from '../apis/WpClient'

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

	return (
		<div>
			<h2>comments</h2>
			<div className="not-prose">
				<CommentForm post={post} commentCallback={fetchComments} />
			</div>
			<hr className="border-t-border my-4" />

			{comments.map(({ content, name, date }) => (
				<div>
					<div className="font-bold font-serif">{name || '🌻 anonymous'}</div>
					<div className="text-xs">{date}</div>
					<div dangerouslySetInnerHTML={{ __html: content }} />

					<hr className="border-t-border my-4" />
				</div>
			))}
		</div>
	)
}
