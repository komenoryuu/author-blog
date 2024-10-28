import { readUsers } from './api';

export const getUser = async (loginToFind) => {
	const users = await readUsers();

	return users.find(({ login }) => login === loginToFind);
};
