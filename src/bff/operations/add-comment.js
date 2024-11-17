import { createComment, readPost } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';
import { getPostCommentsWithAuthor } from '../utils';

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

	const post = await readPost(postId);

	const commentsWithAuthor = await getPostCommentsWithAuthor(postId);

	return {
		error: null,
		response: {
			...post,
			comments: commentsWithAuthor,
		},
	};
};
