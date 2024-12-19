import styled from 'styled-components';

const StyledSpan = styled.span`
	padding-left: 50px;
	font-size: 1.1rem;
`;

const DescriptionContainer = ({ className }) => {
	return (
		<em className={className}>
			<span>От основ до продвинутых технологий:</span>
			<StyledSpan>Советы, инструменты, разбор ошибок</StyledSpan>
		</em>
	);
};

export const Description = styled(DescriptionContainer)`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;
