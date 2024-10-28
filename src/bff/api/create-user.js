const generateDate = () => new Intl.DateTimeFormat('ru').format(Date.now());

export const createUser = (login, password) =>
	fetch('http://localhost:5000/users', {
		method: 'POST',
		headers: { 'Content-type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			login,
			password,
			registed_at: generateDate(),
			role_id: 2,
		}),
	});
