import PropTypes from 'prop-types';
import { ROLE } from './role';

const ROLE_ID = PropTypes.oneOf(Object.values(ROLE).map(String));

export const PROP_TYPE = {
	ROLE: PropTypes.shape({
		id: ROLE_ID,
		name: PropTypes.string.isRequired,
	}),
	ROLE_ID: PropTypes.oneOf(Object.values(ROLE)),
	ERROR: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(null)]),
	COMMENTS: PropTypes.shape({
		author: PropTypes.string.isRequired,
		authorId: PropTypes.number.isRequired,
		content: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		publishedDate: PropTypes.string.isRequired,
	}),
	POST: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		imageUrl: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		publishedDate: PropTypes.string.isRequired,
	}),
};
