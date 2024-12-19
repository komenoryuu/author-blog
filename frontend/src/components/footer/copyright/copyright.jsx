import styled from 'styled-components';

const StyledSpan = styled.span`
	font-size: 1.2rem;
	font-weight: 600;
`;

const CopyrightContainer = ({ className }) => {
	const date = new Date();
	const currentYear = date.getFullYear();

	return (
		<div className={className}>
			<StyledSpan>Блог о веб-разработке</StyledSpan>
			<span>© React Template {currentYear}. All Rights Reserved.</span>
		</div>
	);
};

export const Copyright = styled(CopyrightContainer)`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;
