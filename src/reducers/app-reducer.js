import { ACTION_TYPE } from '../action';

const initialAppState = {
	wasLogout: false,
	modal: {
		text: '',
		isOpen: false,
		onConfirm: () => {},
		onCancel: () => {},
	},
};

export const appReducer = (state = initialAppState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.LOGOUT: {
			return {
				...state,
				wasLogout: !state.wasLogout,
			};
		}
		default:
			return state;
	}
};
