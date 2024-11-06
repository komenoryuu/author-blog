export const getUser = async (loginToFind) =>
	fetch(`http://localhost:5000/users?login=${loginToFind}`)
		.then((user) => user.json())
		.then(
			([user]) =>
				user && {
					id: user.id,
					login: user.login,
					password: user.password,
					registeredDate: user.registered_date,
					roleId: user.role_id,
				},
		);
