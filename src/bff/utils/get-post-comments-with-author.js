import { getComments, readUsers } from '../api';

export const getPostCommentsWithAuthor = async (postId) => {
	const comments = await getComments(postId);

	const users = await readUsers();

	return comments.map((comment) => {
		const user = users.find(({ id }) => id === comment.authorId);

		return {
			...comment,
			author: user?.login,
		};
	});
};
