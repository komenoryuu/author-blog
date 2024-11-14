export const deletePost = (postId) =>
	fetch(`http://localhost:5000/posts/${postId}`, {
		method: 'DELETE',
	});
