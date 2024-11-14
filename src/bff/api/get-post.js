import { transformPost } from '../transformers';

export const getPost = async (postId) =>
	fetch(`http://localhost:5000/posts/${postId}`)
		.then((post) => post.json())
		.then((post) => post && transformPost(post));
