import { transformComments } from '../transformers';

export const getComments = (postId) =>
	fetch(`http://localhost:5000/comments?post_id=${postId}`)
		.then((comments) => comments.json())
		.then((comment) => comment.map(transformComments));
