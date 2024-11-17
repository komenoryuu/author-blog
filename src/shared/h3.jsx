import PropTypes from 'prop-types';
import styled from 'styled-components';

const H3Container = ({ className, children }) => (
	<h3 className={className}>{children}</h3>
);

export const H3 = styled(H3Container)`
	margin-bottom: ${({ margin = '8px' }) => margin};
	font-size: 1.8rem;
`;

H3.propTypes = {
	children: PropTypes.node.isRequired,
};
