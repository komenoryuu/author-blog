export const updatePost = ({ id, imageUrl, title, content }) =>
	fetch(`http://localhost:5000/posts/${id}`, {
		method: 'PATCH',
		headers: { 'Content-type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			image_url: imageUrl,
			title,
			content,
		}),
	}).then((post) => post.json());
