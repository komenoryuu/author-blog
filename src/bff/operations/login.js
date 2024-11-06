import { getUser } from '../api';
import { sessions } from '../sessions';

export const login = async (authLogin, authPassword) => {
	const user = await getUser(authLogin);

	if (!user) {
		return {
			error: 'Такого пользователя не существует',
			response: null,
		};
	}

	const { id, login, password, roleId } = user;

	if (password !== authPassword) {
		return {
			error: 'Неверный логин или пароль',
			response: null,
		};
	}

	if (user) {
		return {
			error: null,
			response: {
				id,
				login,
				roleId,
				session: sessions.create(user),
			},
		};
	}
};
