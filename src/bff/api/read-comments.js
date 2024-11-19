import { transformComments } from '../transformers';

const ALL_COMMENTS_URL = 'http://localhost:5000/comments';
const POST_COMMENTS_URL = 'http://localhost:5000/comments?post_id=';

export const readComments = async (postId) => {
	const url =
		postId === undefined ? ALL_COMMENTS_URL : POST_COMMENTS_URL + postId;

	return fetch(url)
		.then((comments) => comments.json())
		.then((comment) => comment.map(transformComments));
};
