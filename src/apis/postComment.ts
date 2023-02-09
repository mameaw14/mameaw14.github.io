export const postComment = async (formData: any) => {
	await fetch(import.meta.env.PUBLIC_WP_URL + '/wp/v2/comments', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		body: formData,
	})
		.then((response) => {
			if (response.ok === true) {
				// Submitted successfully!
				console.log('submit successfully!')
			}

			return response.json()
		})
		.then((object) => {
			// Comment submission failed.
			// Output `object.message` to see the error message.
		})
		.catch((error) => console.error('Error:', error))
}
