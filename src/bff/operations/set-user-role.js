import { updateUserRole } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const setUserRole = async (hash, userId, newSelectedRoleId) => {
	const ACCESS_ROLES = [ROLE.ADMIN];

	const access = await sessions.access(hash, ACCESS_ROLES);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			response: null,
		};
	}

	updateUserRole(userId, newSelectedRoleId);

	return {
		error: null,
		response: true,
	};
};
