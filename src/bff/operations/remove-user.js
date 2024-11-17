import { deleteUser } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const removeUser = async (hash, userId) => {
	const ACCESS_ROLES = [ROLE.ADMIN];

	const access = await sessions.access(hash, ACCESS_ROLES);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			response: null,
		};
	}

	deleteUser(userId);

	return {
		error: null,
		response: true,
	};
};
