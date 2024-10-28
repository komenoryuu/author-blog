import { getUser } from './get-user';
import { createUser } from './api';
import { createSession } from './create-session';

export const server = {
	async authorize(authLogin, authPassword) {
		const user = await getUser(authLogin);

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
				response: createSession(user.role_id),
			};
		}
	},
	async register(regLogin, regPassword) {
		const user = await getUser(regLogin);

		if (user) {
			return {
				error: 'Такой логин уже занят',
				response: null,
			};
		}

		await createUser(regLogin, regPassword);

		return {
			error: null,
			response: createSession(user.role_id),
		};
	},
};
