import { getUser } from './get-user';
import { createUser } from './api';
import { sessions } from './sessions';

export const server = {
	async authorize(authLogin, authPassword) {
		const user = await getUser(authLogin);
		const { id, login, roleId } = user;

		if (!user) {
			return {
				error: 'Такого пользователя не существует',
				response: null,
			};
		}

		if (user.password !== authPassword) {
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
	},
	async register(regLogin, regPassword) {
		const user = await getUser(regLogin);
		const { id, login, roleId } = user;

		if (user) {
			return {
				error: 'Такой логин уже занят',
				response: null,
			};
		}

		await createUser(regLogin, regPassword);

		return {
			error: null,
			response: {
				id,
				login,
				roleId,
				session: sessions.create(user),
			},
		};
	},
	async logout(session) {
		sessions.remove(session);
	},
};
