import { useEffect, useState } from 'react'
import { CommentReader } from '../utils/comment'
import type { Post } from '../types/Post'

const commentReader = new CommentReader()
export const Comments = ({ post }: { post: Post }) => {
	const [comments, setComments] = useState(post.comments)

	useEffect(() => {
		fetch(post.commentUrl)
			.then((response) => response.json())
			.then((data) => {
				setComments(data?.map(commentReader.fromWPComment))
			})
	}, [])

	return (
		<div>
			<h2>comments</h2>
			{comments.map(({ content, name, date }) => (
				<div>
					<div className="font-bold font-serif">{name}</div>
					<div className="text-xs">{date}</div>
					<div dangerouslySetInnerHTML={{ __html: content }} />
					<div className="text-right">
						{' '}
						<a>Reply</a>
					</div>

					<hr className="border-t-border my-4" />
				</div>
			))}
		</div>
	)
}
