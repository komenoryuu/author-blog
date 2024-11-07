import { getRoles } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const fetchRoles = async (userSession) => {
	const ACCESS_ROLES = [ROLE.ADMIN];

	if (!sessions.access(userSession, ACCESS_ROLES)) {
		return {
			error: 'Доступ запрещён',
			response: null,
		};
	}

	const roles = await getRoles();

	return {
		error: null,
		response: roles,
	};
};
