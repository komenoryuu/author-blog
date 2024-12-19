import styled from 'styled-components';

const ContactsContainer = ({ className }) => (
	<ul className={className}>
		<a href='mailto:info@reacttemplate.ru'>
			<span>Почта: </span>info@reacttemplate.ru
		</a>
		<a href='tel:880123456789'>
			<span>Телефон: </span>880 123 456 789
		</a>
	</ul>
);

export const Contacts = styled(ContactsContainer)`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 5px;
	a {
		transition: all 0.3s;
		&:hover {
			color: #7f56d9;
		}
		span {
			font-weight: 600;
		}
	}
`;
