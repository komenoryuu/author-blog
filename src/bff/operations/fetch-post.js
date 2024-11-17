import { readPost } from '../api';
import { getPostCommentsWithAuthor } from '../utils';

export const fetchPost = async (postId) => {
	let post;
	let error;

	try {
		post = await readPost(postId);
	} catch (postError) {
		error = postError;
	}

	if (error) {
		return {
			error,
			response: null,
		};
	}

	const commentsWithAuthor = await getPostCommentsWithAuthor(postId);

	return {
		error: null,
		response: {
			...post,
			comments: commentsWithAuthor,
		},
	};
};
