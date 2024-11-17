import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectRole } from '../../state/selectors';
import { ErrorPage } from '../error-page/error-page';
import { checkAccess } from '../../utils';
import { ERROR, PROP_TYPE } from '../../constants';

export const AccessDeniedPage = ({ access, serverError = null, children }) => {
	const userRole = useSelector(selectRole);

	const accessError = checkAccess(access, userRole)
		? null
		: ERROR.ACCESS_DENIED;
	const error = serverError || accessError;

	return error ? <ErrorPage error={error} /> : children;
};

AccessDeniedPage.propTypes = {
	access: PropTypes.arrayOf(PROP_TYPE.ROLE_ID).isRequired,
	serverError: PROP_TYPE.ERROR,
	children: PropTypes.node.isRequired,
};
