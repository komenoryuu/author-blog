import { setUserRole } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const updateUserRole = async (hash, userId, newSelectedRoleId) => {
	const ACCESS_ROLES = [ROLE.ADMIN];

	const access = await sessions.access(hash, ACCESS_ROLES);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			response: null,
		};
	}

	setUserRole(userId, newSelectedRoleId);

	return {
		error: null,
		response: true,
	};
};
