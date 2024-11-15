import { useSelector } from 'react-redux';
import { ErrorPage } from '../error-page/error-page';
import { selectRole } from '../../selectors';
import { checkAccess } from '../../utils';
import { ERROR } from '../../constants';

export const AccessDeniedPage = ({ access, serverError = null, children }) => {
	const userRole = useSelector(selectRole);

	const accessError = checkAccess(access, userRole)
		? null
		: ERROR.ACCESS_DENIED;
	const error = serverError || accessError;

	return error ? <ErrorPage error={error} /> : children;
};