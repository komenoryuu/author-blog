import { transformUser } from '../transformers';

export const readUsers = () =>
	fetch('http://localhost:5000/users')
		.then((usersData) => usersData.json())
		.then((users) => users && users.map(transformUser));
