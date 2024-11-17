import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectSession } from '../state/selectors';
import { server } from '../bff';

export const useServerRequest = () => {
	const session = useSelector(selectSession);

	return useCallback(
		(operation, ...params) => {
			const request = [
				'register',
				'login',
				'fetchPost',
				'fetchPosts',
			].includes(operation)
				? params
				: [session, ...params];

			return server[operation](...request);
		},
		[session],
	);
};
