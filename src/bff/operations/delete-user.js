import { deleteUserRequest } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const deleteUser = async (userSession, userId) => {
	const ACCESS_ROLES = [ROLE.ADMIN];

	if (!sessions.access(userSession, ACCESS_ROLES)) {
		return {
			error: 'Доступ запрещён',
			response: null,
		};
	}

	deleteUserRequest(userId);

	return {
		error: null,
		response: true,
	};
};
