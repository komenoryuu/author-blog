import { transformUser } from '../transformers';
import { generateDate } from '../utils';

export const createUser = (login, password) =>
	fetch('http://localhost:5000/users', {
		method: 'POST',
		headers: { 'Content-type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			login,
			password,
			registered_date: generateDate(),
			role_id: 2,
		}),
	})
		.then((createdUser) => createdUser.json())
		.then((user) => transformUser(user));
