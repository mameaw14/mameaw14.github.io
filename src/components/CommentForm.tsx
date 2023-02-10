import { CreateCommentRes, WpClient } from '../apis/WpClient'
import type { Post } from '../types/Post'
import type React from 'react'
import { useCallback, useState } from 'react'

const wpClient = new WpClient(import.meta.env.PUBLIC_WP_URL)

const Input = (props: any) => {
	return (
		<input
			className="block border-2 border-border px-2 py-1"
			style={{ boxShadow: 'inset 5px 4px 11px rgba(0, 0, 0, 0.05)' }}
			{...props}
		/>
	)
}

const Textarea = (props: any) => {
	return (
		<textarea
			className="block border-2 border-border px-2 py-1"
			style={{ boxShadow: 'inset 5px 4px 11px rgba(0, 0, 0, 0.05)' }}
			{...props}
		/>
	)
}

export const CommentForm = ({
	post,
	commentCallback,
}: {
	post: Post
	commentCallback: (result: CreateCommentRes) => void
}) => {
	const [message, setMessage] = useState('')

	const setErrorMessage = useCallback((res: CreateCommentRes) => {
		if (res.hasOwnProperty('status')) {
			if (res.status !== 'success') {
				setMessage('Comment is pending approval')
			} else {
				setMessage('')
			}
		} else {
			setMessage(res?.message || 'Cannot post comment')
		}
	}, [])

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		const { name, website, email, content } = e.target as any
		const formData = {
			name: name.value,
			website: website.value,
			email: email.value,
			content: content.value,
		}
		const result = await wpClient.createComment(post.id, formData)
		setErrorMessage(result)
		commentCallback(result)
	}
	return (
		<form onSubmit={handleSubmit}>
			<Textarea id="content" name="content" rows={4} required />

			<label htmlFor="name" className="block mt-4">
				Name
			</label>
			<Input id="name" name="name" type="text" />

			<label htmlFor="website" className="block mt-4">
				Website
			</label>
			<Input id="website" name="website" type="text" />

			<label htmlFor="email" className="block mt-4">
				Email (will be hidden)
			</label>
			<Input id="email" name="email" type="email" />

			<button type="submit" className="block mt-4 border-2 border-border bg-secondary-200 py-2 px-4">
				Post Comment
			</button>

			{message && <div className="text-red-800">{message}</div>}
		</form>
	)
}
