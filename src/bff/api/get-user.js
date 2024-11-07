import { transformUser } from '../transformers';

export const getUser = async (loginToFind) =>
	fetch(`http://localhost:5000/users?login=${loginToFind}`)
		.then((user) => user.json())
		.then(([user]) => user && transformUser(user));
