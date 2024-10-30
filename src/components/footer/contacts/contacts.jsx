import styled from 'styled-components';

const StyledSpan = styled.span`
	font-weight: 600;
`;

const StyledA = styled.a`
	transition: all 0.3s;
	&:hover {
		color: #7f56d9;
	}
`;

const ContactsContainer = ({ className }) => (
	<ul className={className}>
		<StyledA href='mailto:info@reacttemplate.ru'>
			<StyledSpan>Почта: </StyledSpan>info@reacttemplate.ru
		</StyledA>
		<StyledA href='tel:880123456789'>
			<StyledSpan>Телефон: </StyledSpan>880 123 456 789
		</StyledA>
	</ul>
);

export const Contacts = styled(ContactsContainer)`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 5px;
`;
