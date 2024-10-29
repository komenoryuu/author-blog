import { Link } from 'react-router-dom';
import { Icon } from '../../shared';
import styled from 'styled-components';

const LogoHeader = styled.div`
	font-size: 2rem;
	font-weight: 600;
`;

const LogoContainer = ({ className }) => (
	<Link className={className} to='/'>
		<Icon id='fa-terminal' size='3rem' />
		<LogoHeader>Блог о веб-разработке</LogoHeader>
	</Link>
);

export const Logo = styled(LogoContainer)`
	display: flex;
	align-items: center;
	gap: 5px;
	transition: all 0.3s;
	&:hover {
		color: #7f56d9;
	}
`;
