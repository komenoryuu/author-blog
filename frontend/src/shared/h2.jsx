import PropTypes from 'prop-types';
import styled from 'styled-components';

const H2Container = ({ className, children }) => (
	<h2 className={className}>{children}</h2>
);

export const H2 = styled(H2Container)`
	font-size: ${({ size = '2.3rem' }) => size};
	margin-bottom: ${({ margin = '30px' }) => margin};
	font-weight: 600;
`;

H2.propTypes = {
	children: PropTypes.node.isRequired,
};
