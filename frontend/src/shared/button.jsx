import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonContainer = ({ className, children, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	width: ${({ width = '100%' }) => width};
	height: ${({ height = '48px' }) => height};
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #7f56d9;
	border: 3px solid #7f56d9;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
	border-radius: 8px;
	color: #fff;
	font-size: 1.2rem;
	transition: all 0.3s;
	cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	&:hover {
		background-color: #6027db;
		border-color: #6027db;
	}
	&:disabled {
		background-color: #acacac;
		border-color: #acacac;
	}
`;

Button.propTypes = {
	children: PropTypes.node.isRequired,
};
