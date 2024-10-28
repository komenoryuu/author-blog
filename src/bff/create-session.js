import { ROLE } from '../constants';
import { deleteComment } from './role-actions';

export const createSession = (roleId) => {
	const session = {
		logout() {
			Object.keys(session).forEach((method) => {
				delete session[method];
			});
		},
	};

	switch (roleId) {
		case ROLE.ADMIN: {
			session.deleteComment = deleteComment;
			break;
		}
		case ROLE.MODER: {
			session.deleteComment = deleteComment;
			break;
		}
		case ROLE.READER: {
			break;
		}
		default: // nothing
	}

	return session;
};
