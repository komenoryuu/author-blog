import { forwardRef } from 'react';
import styled from 'styled-components';

const InputContainer = forwardRef(({ className, width, ...props }, ref) => {
	return <input className={className} ref={ref} {...props} />;
});

export const Input = styled(InputContainer)`
	width: ${({ width = '100%' }) => width};
	height: 48px;
	border: 1px solid;
	border-radius: 8px;
	padding-left: 10px;
	font-size: 1.2rem;
	outline: none;
	&:focus {
		outline: 2px solid #7f56d9;
		border-color: #fff;
	}
`;
