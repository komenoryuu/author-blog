import { updatePost } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const savePost = async (hash, newPostData) => {
	const ACCESS_ROLES = [ROLE.ADMIN];

	const access = await sessions.access(hash, ACCESS_ROLES);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			response: null,
		};
	}

	const updatedPost = await updatePost(newPostData);

	return {
		error: null,
		response: updatedPost,
	};
};
