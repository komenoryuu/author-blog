import { setUserRole } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const updateUserRole = async (
	userSession,
	userId,
	newSelectedRoleId,
) => {
	const ACCESS_ROLES = [ROLE.ADMIN];

	if (!sessions.access(userSession, ACCESS_ROLES)) {
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
