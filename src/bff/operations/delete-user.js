import { deleteUserRequest } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const deleteUser = async (hash, userId) => {
	const ACCESS_ROLES = [ROLE.ADMIN];

	const access = await sessions.access(hash, ACCESS_ROLES);

	if (!access) {
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
