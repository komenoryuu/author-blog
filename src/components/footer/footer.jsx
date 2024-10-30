import { Contacts } from './contacts/contacts';
import { Copyright } from './copyright';
import styled from 'styled-components';
import { Weather } from './weather/weather';

const FooterConainer = ({ className }) => (
	<footer className={className}>
		<Copyright />
		<Weather />
		<Contacts />
	</footer>
);

export const Footer = styled(FooterConainer)`
	height: 100px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;