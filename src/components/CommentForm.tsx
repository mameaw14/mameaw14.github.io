import { postComment } from '../apis/postComment'

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
export const CommentForm = ({ commentCallback }: { commentCallback: () => void }) => {
	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		const { name, website, email, content } = e.target as any
		const formData = {
			name,
			website,
			email,
			content,
		}
		await postComment(formData)
		commentCallback()
	}
	return (
		<form onSubmit={handleSubmit}>
			<Textarea id="content" name="content" rows={7} />

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
		</form>
	)
}
