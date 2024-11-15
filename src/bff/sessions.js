import { createSession, getSession, deleteSession } from './api';

export const sessions = {
	create(user) {
		const hash = Math.random().toFixed(50);

		createSession(hash, user);

		return hash;
	},
	async remove(hash) {
		const session = await getSession(hash);

		if (!session) return;

		deleteSession(session.id);
	},
	async access(hash, ACCESS_ROLES) {
		const dbSession = await getSession(hash);

		return !!dbSession?.user && ACCESS_ROLES.includes(dbSession.user.roleId);
	},
};
