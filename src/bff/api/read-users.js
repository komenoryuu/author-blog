export const readUsers = () =>
	fetch('http://localhost:5000/users').then(
		(usersData) => usersData.json(),
	);
