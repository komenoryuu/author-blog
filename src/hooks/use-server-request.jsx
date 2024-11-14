import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectSession } from '../selectors';
import { server } from '../bff';

export const useServerRequest = () => {
	const session = useSelector(selectSession);

	return useCallback(
		(operation, ...params) => {
			const request = ['register', 'login', 'fetchPost'].includes(operation)
				? params
				: [session, ...params];

			return server[operation](...request);
		},
		[session],
	);
};
