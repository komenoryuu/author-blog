import { createComment, getPost, getComments } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const addComment = async (hash, postId, userId, content) => {
	const ACCESS_ROLES = [ROLE.ADMIN, ROLE.MODER, ROLE.READER];

	const access = await sessions.access(hash, ACCESS_ROLES);

	if (!access) {
		return {
			error: 'Оставлять комментарии могут только авторизованные пользователи',
			response: null,
		};
	}

	await createComment(postId, userId, content);

	const post = await getPost(postId);

	const comments = await getComments(postId);

	return {
		error: null,
		response: {
			...post,
			comments,
		},
	};
};
