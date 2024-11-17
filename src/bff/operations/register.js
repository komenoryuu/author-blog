import { sessions } from '../sessions';
import { readUser, createUser } from '../api';

export const register = async (regLogin, regPassword) => {
	const existedUser = await readUser(regLogin);

	if (existedUser) {
		return {
			error: 'Такой логин уже занят',
			response: null,
		};
	}

	const user = await createUser(regLogin, regPassword);

	return {
		error: null,
		response: {
			id: user.id,
			login: user.login,
			roleId: user.roleId,
			session: sessions.create(user),
		},
	};
};
