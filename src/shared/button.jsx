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
	border-radius: 8px;
	color: #fff;
	font-size: 1.2rem;
	transition: all 0.3s;
	cursor: pointer;
	&:hover {
		background-color: #6027db;
		border-color: #6027db;
	}
	&:disabled {
		background-color: #acacac;
		border-color: #acacac;
	}
`;
