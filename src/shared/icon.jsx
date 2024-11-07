import styled from 'styled-components';

const IconContainer = ({ className, id }) => (
	<div className={className}>
		<i className={`fa ${id}`} aria-hidden='true'></i>
	</div>
);

export const Icon = styled(IconContainer)`
	display: flex;
	align-items: end;
	font-size: ${({ size = '1.1rem' }) => size};
`;
