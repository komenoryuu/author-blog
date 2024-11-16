import { deleteComment, getPost } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';
import { getPostCommentsWithAuthor } from '../utils';

export const removeComment = async (hash, postId, commentId) => {
	const ACCESS_ROLES = [ROLE.ADMIN, ROLE.MODER];

	const access = await sessions.access(hash, ACCESS_ROLES);

	if (!access) {
		return {
			error: 'Оставлять комментарии могут только авторизованные пользователи',
			response: null,
		};
	}

	await deleteComment(commentId);

	const post = await getPost(postId);

	const commentsWithAuthor = await getPostCommentsWithAuthor(postId);

	return {
		error: null,
		response: {
			...post,
			comments: commentsWithAuthor(postId),
		},
	};
};
