import { deleteComment, deletePost, getComments } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const removePost = async (hash, postId) => {
	const ACCESS_ROLES = [ROLE.ADMIN];

	const access = await sessions.access(hash, ACCESS_ROLES);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			response: null,
		};
	}

	await deletePost(postId);

	const comments = await getComments(postId);

	await Promise.all(
		comments.map(({ id: commentId }) => deleteComment(commentId)),
	);

	return {
		error: null,
		response: true,
	};
};
