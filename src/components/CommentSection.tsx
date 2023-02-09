import { useCallback, useEffect, useState } from 'react'
import { CommentReader } from '../utils/comment'
import type { Post } from '../types/Post'
import { CommentForm } from './CommentForm'

const commentReader = new CommentReader()

export const CommentSection = ({ post }: { post: Post }) => {
	const [comments, setComments] = useState(post.comments)

	const refetchComments = useCallback(() => {
		fetch(post.commentUrl)
			.then((response) => response.json())
			.then((data) => {
				setComments(data?.map(commentReader.fromWPComment))
			})
	}, [])

	return (
		<div>
			<h2>comments</h2>
			<div className="not-prose">
				<CommentForm commentCallback={refetchComments} />
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
