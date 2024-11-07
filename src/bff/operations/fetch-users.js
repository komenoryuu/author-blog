import { readUsers } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const fetchUsers = async (userSession) => {
	const ACCESS_ROLES = [ROLE.ADMIN];

	if (!sessions.access(userSession, ACCESS_ROLES)) {
		return {
			error: 'Доступ запрещён',
			response: null,
		};
	}

	const user = await readUsers();

	return {
		error: null,
		response: user,
	};
};
