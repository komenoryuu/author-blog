export const createSession = (hash, user) => {
	fetch('http://localhost:5000/sessions', {
		method: 'POST',
		headers: { 'Content-type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			hash,
			user,
		}),
	});
};
