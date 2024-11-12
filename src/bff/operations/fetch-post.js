import { getComments, getPost, readUsers } from '../api';

export const fetchPost = async (postId) => {
	const post = await getPost(postId);

	const comments = await getComments(postId);

	const users = await readUsers();

	const commentsWithAuthor = comments.map((comment) => {
		const user = users.find(({ id }) => id === comment.authorId);

		return {
			...comment,
			author: user?.login,
		};
	});

	return {
		error: null,
		response: {
			...post,
			comments: commentsWithAuthor,
		},
	};
};
