import { createSession, readSession, deleteSession } from './api';

export const sessions = {
	create(user) {
		const hash = Math.random().toFixed(50);

		createSession(hash, user);

		return hash;
	},
	async remove(hash) {
		const session = await readSession(hash);

		if (!session) return;

		deleteSession(session.id);
	},
	async access(hash, ACCESS_ROLES) {
		const dbSession = await readSession(hash);

		return !!dbSession?.user && ACCESS_ROLES.includes(dbSession.user.roleId);
	},
};
